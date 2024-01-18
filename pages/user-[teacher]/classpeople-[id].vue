<script setup lang="ts">
// request from api is made
//All of the students for this particular class are recieved.
</script>

<template>
  <!--Navigation bar will go here.-->
  <div id="mainPage">
    <div id="students" class="m-1">
      <div>
        <input />
        <h2>Search for student</h2>
      </div>
      <div id="student-container">
        <div id="student">
          <!--v-for="student in students" goes into div-->
          <!-- <h2> {{ student.lastName }}, {{ student.firstName }} </h2>-->
          <h2>For every student in students</h2>
        </div>
      </div>
    </div>
    <div id="view.assign">
      <SubmitButton>View Class Statistics</SubmitButton>
      <SubmitButton>Assign Class Homework</SubmitButton>
    </div>
  </div>
</template>

<style lang="css" scoped></style>
