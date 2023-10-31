<script setup>
import { userState } from "~/stores/users";

const userStore = userState();
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
            v-model="classname"
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
      </div>
    </div>
  </form>
</template>
