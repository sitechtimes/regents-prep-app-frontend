<template>
  <div id="app">
    <div class="header">
      <img src="logo.png" alt="REGENTS Prep App Logo" class="logo" />
      <h1>REGENTS Prep App</h1>
    </div>
    <div class="content">
      <p>
        Welcome to the REGENTS Prep App, where you can find practice questions and track your
        progress for the New York State Regents Exams.
      </p>
      <div class="container">
        <div class="card teacher">
          <h2>For Teachers</h2>
          <p>
            If you are a teacher, you can sign up or log in to assign practice questions to your
            students and monitor their performance.
          </p>
          <button @click="goToTeacher">Sign Up / Log In</button>
        </div>
        <div class="card student">
          <h2>For Students</h2>
          <p>
            If you are a student, you can access the practice questions assigned by your teacher and
            get instant feedback on your answers.
          </p>
          <button @click="goToStudent">Start Practice</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineComponent } from 'vue'

// functions that mutate state and trigger updates
function goToTeacher() {
  // go to the teacher page
}

function goToStudent() {
  // go to the student page
}
</script>

<style>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

#app {
  font-family: Roboto, sans-serif;
}

.header {
  display: flex;
  align-items: center;
  background-color: #ffffff;
  border-bottom: 1px solid #e0e0e0;
}

.logo {
  width: 40px;
  height: 40px;
  margin: 10px;
}

h1 {
  color: #3c4043;
}

.content {
  max-width: 800px;
  margin: auto;
  padding: 20px;
}

.container {
  display: flex;
  justify-content: space-between;
}

.card {
  width: 300px;
  height: 300px;
  border-radius: 8px;
}

.teacher {
  background-color: #f1f3f4;
}

.student {
  background-color: #e8eaed;
}

h2 {
  color: #3c4043;
}

p {
  color: #5f6368;
}

button {
  width: 200px;
  height: 40px;
  color: #ffffff;
  border-radius: 4px;
}

.teacher button {
  background-color: #1a73e8;
}

.student button {
  background-color: #34a853;
}
</style>
