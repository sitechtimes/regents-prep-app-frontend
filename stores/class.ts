import { defineStore } from "pinia";
import type { assignmentDetails } from "~/interfaces/interfaces";

export const userClass = defineStore(
  "class",
  () => {
    const classCode = ref<number>(0);
    const assignments = ref<Array<assignmentDetails>>([]);
    const currentAssignments = ref<Array<assignmentDetails>>([]);
    const pastAssignments = ref<Array<assignmentDetails>>([]);

    function $reset() {
      classCode.value = 0;
      assignments.value = [];
      currentAssignments.value = [];
      pastAssignments.value = [];
    }

    return {
      classCode,
      assignments,
      currentAssignments,
      pastAssignments,
      $reset,
    };
  },
  { persist: true }
);
