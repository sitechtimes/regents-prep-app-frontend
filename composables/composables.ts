import { currentA } from "~/constants/tempArray.js";
import { pastA } from "~/constants/tempArray.js";

export function dateFetch(
  props: Readonly<{ name: string; detail: string | number }> & {}
) {
  const parentDate = getCurrentInstance()?.parent?.exposed?.props.date;
  const show = ref<boolean>(false);

  const currentFilter = currentA.filter(
    (assignment) => assignment.date === parentDate
  );
  const pastFilter = pastA.filter(
    (assignment) => assignment.date === parentDate
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
}
