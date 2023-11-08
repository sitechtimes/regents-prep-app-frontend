<script setup lang="ts">
import { userState } from "~/stores/users";

const userStore = userState();

//The properties below are placeholder refs in order to adhere to typescript declaration.
const className = ref();
const courseName = ref();
const courses = ref([]);
const courseColor = ref();

function createClass() {
  console.log("Class Created");
  console.log(className.value);
  className.value = "";
}
</script>

<template>
  <form @submit.prevent="createClass">
    <div>
      <h2>Create new Class</h2>
      <div>
        <div>
          <h2>Class name</h2>
          <label for="classInput"></label>
          <input
            type="text"
            name="classname"
            id="classInput"
            v-model="className"
          />
        </div>
        <div>
          <h2>Choose Course Type</h2>
          <label for="courseType"></label>
          <select id="courseType" name="type" v-model="courseName">
            <option v-for="course in courses">{{ course }}</option>
          </select>
        </div>
        <div>
          <h2>Choose Color</h2>
          <label for="courseColor"></label>
          <select id="courseColor" name="color" v-model="courseColor">
            <option v-for="color in courses">{{ color }}</option>
          </select>
        </div>
        <submitButton>
          <button
            class="font-bold py-2 px-4 rounded bg-blue-500 text-white self-center"
          >
            Create
          </button></submitButton
        >
      </div>
    </div>
  </form>
</template>
