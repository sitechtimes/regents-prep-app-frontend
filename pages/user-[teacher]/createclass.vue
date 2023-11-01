<script setup lang="ts">
import { userState } from "~/stores/users";

const userStore = userState();

const className = ref();
const courseName = ref();
const courses = ref([]);
const courseColor = ref();
</script>

<template>
  <form>
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
            <option v-for="course in courses">{{ course.name }}</option>
          </select>
        </div>
        <div>
          <h2>Choose Color</h2>
          <label for="courseColor"></label>
          <select id="courseColor" name="color" v-model="courseColor">
            <option v-for="color in courses">{{ color.color }}</option>
          </select>
        </div>
        <submitButton>Test submit button</submitButton>
      </div>
    </div>
  </form>
</template>
