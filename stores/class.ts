import { defineStore } from "pinia";
import { assignmentDetails } from "~/interfaces/interfaces";

export const userClass = defineStore("class", () => {
  const className = ref<string>("");
  const classCode = ref<string>("");
  const assignments = ref<Array<assignmentDetails>>([]);
  const currentAssignments = ref<Array<assignmentDetails>>([]);
  const pastAssignments = ref<Array<assignmentDetails>>([]);

  function $reset() {
    (className.value = "");
    (classCode.value = "");
    (assignments.value = []);
    (currentAssignments.value = []);
    (pastAssignments.value = []);
  }

  return {
    className,
    classCode,
    assignments,
    currentAssignments,
    pastAssignments,
    $reset,
  };
});
