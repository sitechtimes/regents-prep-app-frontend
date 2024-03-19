import { ref, watchEffect, toValue } from "vue";
import { currentA } from "~/constants/tempArray.js";

export function currentFetch(currentA) {
  const date = ref<string>("");
  const show = ref<boolean>(false);
  const error = ref<string>("");

  const fetchData = () => {
    // reset state before fetching..
    date.value = "";
    show.value = false;
    error.value = "";

    fetch(toValue(currentA))
      .then((res) => res.json())
      .then((json) => (date.value = json))
      .catch((err) => (error.value = err));
  };

  watchEffect(() => {
    fetchData();
  });

  return { date, show, error };
}

export function pastFetch() {}
