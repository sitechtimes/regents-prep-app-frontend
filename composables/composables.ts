import { userClass } from "~/stores/class";

export const dateFetch = (
  props: Readonly<{ name: string; detail: number }>
) => {
  const classStore = userClass();
  const parentDate = getCurrentInstance()?.parent?.exposed?.props.date;
  const show = ref<boolean>(false);

  const currentFilter = classStore.currentAssignments.filter(
    (assignment) => assignment.datetime_due === parentDate
  );
  const pastFilter = classStore.pastAssignments.filter(
    (assignment) => assignment.datetime_due === parentDate
  );
  currentFilter.forEach((assignment) => {
    if (assignment.name.includes(props.name)) {
      show.value = true;
    }
  });
  pastFilter.forEach((assignment) => {
    if (assignment.name.includes(props.name)) {
      show.value = true;
    }
  });

  return { show };
};

export function compareDates(dueDate: string) {
  let date1 = new Date(dueDate).getTime(); //converts date to milliseconds since midnight at the beginning of January 1, 1970, UTC.
  let date2 = new Date().getTime(); // gets today's time

  if (date1 < date2) {
    // if the assignment is before today, return -1
    return -1;
  } else if (date1 > date2) {
    // if the assigmment is after today, return 1
    return 1;
  } else {
    return 0; // if the assignment is due today, return 0
  }
}
