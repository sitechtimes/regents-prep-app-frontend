import { defineStore } from "pinia";
import type {
  questionInterface,
  assignmentDetails,
} from "~/interfaces/interfaces";
import { userState } from "./users";

export const useQuestions = defineStore(
  "questions",
  () => {
    const assignmentInstance = ref<number>();
    const question_instance_id = ref<number>();
    const classCode = ref<number>(0);
    const assignmentName = ref<string>("");
    const qText = ref<string>("");
    const timeLeft = ref<number>(0);
    const qLeft = ref<number>(0);
    const answers = ref<Array<string>>([]);
    const dueDate = ref<string>("");
    const router = useRouter();

    function $resetQuestion() {
      (classCode.value = 0),
        (assignmentName.value = ""),
        (qText.value = ""),
        (timeLeft.value = 0),
        (qLeft.value = 0),
        (answers.value = []),
        (dueDate.value = "");
    }

    async function $updateState(item: assignmentDetails, code: number) {
      const userStore = userState();
      //takes assignment object, assignmentDetails as input
      router.push({
        path: `/user-${userStore.username}/class-${classCode}/assignment-${item.name}`,
      });
      (classCode.value = code),
        (assignmentName.value = item.name),
        (dueDate.value = item.datetime_due);
      await $getAssignmentInstance(item.id);
      await $getQuestion();
    }

    const $getAssignmentInstance = async (assignmentId: number) => {
      const userStore = userState();
      try {
        const response = await fetch(
          `http://192.168.192.122:8000/api/courses/student/assignment-instance/`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${userStore.access_token}`,
            },
            body: JSON.stringify({
              id: assignmentId,
            }),
          }
        )
          .then((res) => res.json())
          .then(async (data) => {
            assignmentInstance.value = data.id;
            console.log(assignmentInstance.value);
          });
      } catch (error) {
        console.log(error);
      }
    };

    const $getQuestion = async () => {
      const userStore = userState();
      try {
        const response = await fetch(
          `http://192.168.192.122:8000/api/courses/student/get-next-question/`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${userStore.access_token}`,
            },
            body: JSON.stringify({
              id: assignmentInstance.value,
            }),
          }
        )
          .then((res) => res.json())
          .then(async (data) => {
            qText.value = data.question.text;
            question_instance_id.value = data.question.question_instance_id;
            answers.value = data.question.answers;
          });
      } catch (error) {
        console.log(error);
      }
    };

    return {
      assignmentInstance,
      question_instance_id,
      classCode,
      assignmentName,
      qText,
      timeLeft,
      qLeft,
      answers,
      dueDate,
      $resetQuestion,
      $updateState,
      $getQuestion,
      $getAssignmentInstance,
    };

    //The necessary properties are returned, and the state is in the questionStateInterface, as typescript Pinia is utilized.

    async function fill() {
      //const {data} = await api.from('api').select()
      //this.question = data.question
      //this.question = data.answer
      //This code (and likely the entire file) will be changed when the api is developed.
    }
  },
  { persist: true }
);
