import { defineStore } from "pinia";
import {
  questionInterface,
  assignmentDetails,
} from "~/interfaces/interfaces";
import { userState } from "./users";
const router = useRouter();
const config = useRuntimeConfig();

export const useQuestions = defineStore("questions", () => {
  const assignmentInstance = ref<number>()
  const classCode = ref<number>(0);
  const assignmentName = ref<string>("");
  const qText = ref<string>("");
  const timeLeft = ref<number>(0);
  const qLeft = ref<number>(0);
  const answers = ref<Array<string>>([]);
  const dueDate = ref<string>("");

  function $resetQuestion() {
    (classCode.value = 0),
      (assignmentName.value = ""),
      (qText.value = ""),
      (timeLeft.value = 0),
      (qLeft.value = 0),
      (answers.value = []),
      (dueDate.value = "");
  }

  function $updateState(
    item: assignmentDetails,
    code: number
  ) {
    const userStore = userState();
    //takes assignment object, assignmentDetails as input
    router.push({
      path: `/user-${userStore.username}/class-${classCode}/assignment-${item.name}`,
    });
    (classCode.value = code),
      (assignmentName.value = item.name),
      (dueDate.value = item.due_date);
      $getAssignmentInstance(item.id)
  }

  const $getAssignmentInstance = async (
    assignmentId: number
  ) => {
    try {
      const response = await fetch(
        `http://192.168.192.122:8000/api/courses/student/assignment-instance/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userStore.access_token}`
          },
          body: JSON.stringify({
            id: assignmentId,
          }),
        }
      )
        .then((res) => res.json())
        .then(async (data) => {
          assignmentInstance.value = data.id
          console.log(assignmentInstance.value);
        });
    } catch (error) {
      console.log(error);
    }
  };

  return {
    classCode,
    assignmentName,
    qText,
    timeLeft,
    qLeft,
    answers,
    dueDate,
    $resetQuestion,
    $updateState,
    $getAssignmentInstance,
  };

  //The necessary properties are returned, and the state is in the questionStateInterface, as typescript Pinia is utilized.

  async function fill() {
    //const {data} = await api.from('api').select()
    //this.question = data.question
    //this.question = data.answer
    //This code (and likely the entire file) will be changed when the api is developed.
  }
});
