<script setup lang="ts">
// request from api is made
//All of the students for this particular class are recieved.
</script>

<template>
  <!--Navigation bar will go here.-->
  <div id="students">
    <div>
      <h2>Students</h2>
      <SubmitButton> View Class Statistics</SubmitButton>
    </div>
    <div id="student-container">
      <div id="student">
        <!--v-for="student in students" goes into div-->
        <!-- <h2> {{ student.lastName }}, {{ student.firstName }} </h2>-->
      </div>
    </div>
    <div id="assignClassHomework"></div>
  </div>
</template>

<style lang="css" scoped></style>
