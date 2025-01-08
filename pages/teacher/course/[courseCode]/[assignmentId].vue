<template>
  <div class="flex h-[90vw] flex-row justify-evenly p-2">
    <div class="h-full w-[50%] bg-red-300">Div Left</div>
    <div class="h-full w-[50%] align-middle">
      <!--Here is the student dropdown-->
      <div :style="{ width: `${computedDropdownWidth}px` }" class="relative flex h-[40px] items-center justify-center rounded-[20px] border-[1px] border-[#D9D9D9] border-opacity-100">
        <div class="h-full w-full overflow-hidden text-ellipsis whitespace-nowrap pb-2 pl-3 pr-3 pt-2 text-black" @click="toggleDropdown">{{ selectedName || "Student Name" }}</div>
        <button class="pr-2" @click="toggleDropdown">
          <img class="pr-3" src="/public/ui/dropdownicn.svg" alt="" />
        </button>
        <transition name="fade">
          <div
            v-if="showDropdown"
            :style="{ width: `${longestNameWidth}px` }"
            class="absolute left-0 top-[50px] z-10 max-h-[300px] overflow-y-auto rounded-[10px] border border-gray-200 bg-white shadow-lg"
          >
            <div class="flex border-b border-gray-200 p-2">
              <div class="mr-[9px] flex w-[85%] rounded-[5px] border border-gray-300 bg-white">
                <input
                  type="text"
                  placeholder="Search Students..."
                  v-model="searchQuery"
                  class="w-[85%] rounded-[6px] bg-white px-2 py-1 text-black focus:outline-none focus:ring focus:ring-gray-200"
                />
                <div class="flex align-middle">
                  <img class="pl-3 pr-2" src="/public/ui/eraser2.svg" alt="" @click="clearSearch" />
                </div>
              </div>
              <div class="flex h-[35px] w-[35px] rounded-[5px] border border-gray-300 bg-white align-middle">
                <img class="p-[5px]" src="/public/ui/close.svg" alt="" @click="toggleDropdown" />
              </div>
            </div>
            <!-- Here is where the students are populated for the dropdown -->
            <ul>
              <li v-for="(option, index) in filteredOptions" :key="index" class="cursor-pointer px-4 py-2 hover:bg-gray-100" @click="selectOption(option)">
                {{ option }}
              </li>
              <!-- If the filtered doesn't match any name, this is what happens -->
              <li v-if="filteredOptions.length === 0" class="px-4 py-2 text-gray-500">No results found</li>
            </ul>
          </div>
        </transition>
      </div>
      <!--Here is the submission time, to be adjusted-->
      <div class="p-4"><span class="font-bold">Time Submitted:</span> Tuesday December 03, 2024 11:58:09 PM</div>
      <!--Here is supposed to be the table thing-->
      <div class="flex h-[480px] w-[800px] flex-col rounded-[20px] bg-[#D9D9D9] bg-opacity-[20%] ">
        <div class="flex justify-around rounded-t-[20px] bg-gray-300 p-2 text-black ">
          <div class="w-1/5 text-center">Question</div>
          <div class="w-1/5 text-center">Student's Answer</div>
          <div class="w-1/5 text-center">Correct Answer</div>
          <div class="w-1/5 text-center">Grade</div>
        </div>
        <div class="flex flex-col overflow-y-auto  p-2 text-black ">
          <div class="flex justify-around border-b-2 border-gray-300 py-2">
            <div class="w-1/5 text-center">1</div>
            <div class="w-1/5 text-center">A</div>
            <div class="w-1/5 text-center">A</div>
            <div class="w-1/5 text-center">A</div>
          </div>
          <div class="flex justify-around border-b-2 border-gray-300 py-2">
            <div class="w-1/5 text-center">2</div>
            <div class="w-1/5 text-center">B</div>
            <div class="w-1/5 text-center">A</div>
            <div class="w-1/5 text-center">B</div>
          </div>
          <div class="flex justify-around border-b-2 border-gray-300 py-2">
            <div class="w-1/5 text-center">3</div>
            <div class="w-1/5 text-center">B</div>
            <div class="w-1/5 text-center">A</div>
            <div class="w-1/5 text-center">B</div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div>
    <h1>teacher assignment view</h1>
    <p>{{ route.params.assignmentId }}</p>
  </div>
</template>

<script setup lang="ts">

import { ref, computed } from "vue";

definePageMeta({
  layout: "teacher",
  middleware: "auth",
  requiresAuth: true
});

const route = useRoute();
const showDropdown = ref(false);
const dropdownOptions = ref(["John Doe", "Jane Smith", "Alice Johnson", "Bob Brown", "Charlie Davis", "David Wilson", "Emily Garcia", "Frank Harris", "John Doe John Doevich Doevov"]);
const searchQuery = ref("");
const selectedName = ref("");

// Here is the search filter
const filteredOptions = computed(() => {
  if (!searchQuery.value) {
    return dropdownOptions.value;
  }
  return dropdownOptions.value.filter((option) => option.toLowerCase().includes(searchQuery.value.toLowerCase()));
});

// Here is the width for the button when the dropdown is closed
const computedDropdownWidth = computed(() => {
  if (selectedName.value) {
    return Math.max(selectedName.value.length * 10, 250); //max width
  }
  return 200; // default width of the button
});

// Here is the width for the open dropdown
const longestNameWidth = computed(() => {
  const longestName = dropdownOptions.value.reduce((max, option) => (option.length > max.length ? option : max), "");
  return longestName.length * 9;
});

function toggleDropdown() {
  showDropdown.value = !showDropdown.value;
}

function selectOption(option: string) {
  selectedName.value = option;
  showDropdown.value = false; // this closes the dropdown
  searchQuery.value = ""; // this thing clears the search
}
function clearSearch() {
  searchQuery.value = ""; // Clear search input when close icon is clicked
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
