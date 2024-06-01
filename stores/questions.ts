import { defineStore } from "pinia";
import { answers, studentAssignments } from "~/interfaces/interfaces";
import { userState } from "./users";

export const useQuestions = defineStore("questions", () => {
  const classCode = ref<string>("");
  const id = ref<number>(0);
  const name = ref<string>("");
  const datetime_assigned = ref<string>("");
  const datetime_due = ref<string>("");
  const question_number = ref<number>(0);
  const questions_completed = ref<number>(0);
  const qLeft = ref<number>(0)
  const timer_style = ref<string>("");
  const time_allotted = ref<number>(0);
  const attempts_allowed = ref<number>(0);
  const assignmentInstance = ref<number>();
  const question_instance_id = ref<number>();
  const qText = ref<string>("");
  const answers = ref<Array<answers>>([]);

  const router = useRouter();
  const attempts_remaining = ref<number>(2)

  function $reset() {
    classCode.value = "";
    id.value = 0;
    name.value = "";
    datetime_assigned.value = "";
    datetime_due.value = "";
    question_number.value = 0;
    questions_completed.value = 0;
    qLeft.value = 0;
    timer_style.value = "";
    time_allotted.value = 0;
    attempts_allowed.value = 0;
    assignmentInstance.value = 0;
    question_instance_id.value = 0;
    qText.value = "";
    answers.value = [];
  }

  async function $updateState(item: studentAssignments, code: string) {
    const userStore = userState();
    //takes assignment object, assignmentDetails as input
    router.push({
      path: `/user-${userStore.username}/class-${classCode}/assignment-${item.name}`,
    });
    (classCode.value = code),
      (name.value = item.name),
      (datetime_due.value = item.datetime_due);
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
          console.log(data)
          assignmentInstance.value = data.id;
          attempts_allowed.value = data.max_attempts
          questions_completed.value = data.questions_correct
          question_number.value = data.total_questions
          if (data.timer_style == "Unlimited time") {       //sorts by timer style
            timer_style.value = "unlimited"
          }
          else if (data.timer_style == "Time per question") {
            timer_style.value = "per question"
            time_allotted.value = data.time_alloted
          }
          console.log(timer_style.value)
          //console.log(assignmentInstance.value);
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
          if (data.detail == 'Reached maximum number of questions allowed by the assignment') { //if assignment done, bring to completed page
            router.push({
              path: `/user-${userStore.username}/class-${classCode.value}/assignment-${name.value}-completed`,
            })
            await $getResults()
            return
          }
          console.log(data)
          qText.value = data.question.text
          question_instance_id.value = data.question_instance_id
          answers.value = data.question.answers
          attempts_remaining.value = data.remaining_attempts
          qLeft.value = data.questions_remaining
        });
    } catch (error) {
      console.log(error);
    }
  };

  const $submitAnswer = async (answerId: number
  ) => {
    console.log(question_instance_id.value)
    if (answerId === -1) {
      throw new Error("Please select an answer!"); //checks if an answer is chosen
    }
    const userStore = userState();
    try {
      const response = await fetch(
        `http://192.168.192.122:8000/api/courses/student/submit-answer/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userStore.access_token}`,
          },
          body: JSON.stringify({
            question_instance_id: question_instance_id.value,
            answer_id: answerId
          }),
        }
      )
        .then((res) => res.json())
        .then(async (data) => {
          console.log(data)
          if (data.answer_correct === true) { //checks if correct, and if not, checks attempts remaining to cycle questions
            await $getQuestion()
            return
          }
          else if (data.remaining_attempts == 0) {
            console.log("you got it wrong!")
            await $getQuestion()
            return
          }
          else {
            attempts_remaining.value = data.remaining_attempts
            console.log(`you have ${attempts_remaining.value} attempts remaining`)
            return
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  const $getResults = async () => {
    console.log("hi")
    const userStore = userState()
    try {
      const response = await fetch(
        `http://192.168.192.122:8000/api/courses/student/assignment-results/${assignmentInstance.value}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userStore.access_token}`,
          },
        }
      )
        .then((res) => res.json())
        .then(async (data) => {
          console.log(data)
          question_number.value = data.questions_completed
          questions_completed.value = data.question_correct
        });
    } catch (error) {
      console.log(error);
    }
  };


  return {
    classCode,
    id,
    name,
    datetime_assigned,
    datetime_due,
    question_number,
    questions_completed,
    qLeft,
    timer_style,
    time_allotted,
    attempts_allowed,
    assignmentInstance,
    question_instance_id,
    qText,
    answers,
    attempts_remaining,
    $reset,
    $updateState,
    $getQuestion,
    $getAssignmentInstance,
    $submitAnswer,
    $getResults
  };

  //The necessary properties are returned, and the state is in the questionStateInterface, as typescript Pinia is utilized.

  async function fill() {
    //const {data} = await api.from('api').select()
    //this.question = data.question
    //this.question = data.answer
    //This code (and likely the entire file) will be changed when the api is developed.
  }
});
