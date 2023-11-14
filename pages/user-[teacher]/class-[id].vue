<script setup lang="ts">
// request from api is made
//All of the students for this particular class are recieved.
</script>

<template>
  <!--Navigation bar will go here.-->
  <div id="mainPage">
    <div id="students" class="m-1">
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
      <div id="assignClassHomework">
        <SubmitButton>Assign Class Homework</SubmitButton>
      </div>
    </div>
    <div id="studentDashboard">
      <div id="studentDashboardHeader">
        <h3>Student Dashboard</h3>
      </div>
      <div id="studentNavigation">
        <!--<h2>{{ student.lastname }}, {{ student.firstName }}</h2>-->
        <SubmitButton>View Statistics</SubmitButton>
      </div>
      <div id="currentAssigments">
        <div id="currentAssignmentsHeader">
          <h3>Current Assignments</h3>
        </div>
        <!--<TeacherComponentsAssignment />
        TeacherComponentsAssignment with v-for for the 5 current assignments for the current student will go here.
        -->
      </div>
      <div id="pastAssigments">
        <div id="pastAssignmentsHeader">
          <h3>Past Assignments</h3>
        </div>
        <!--<TeacherComponentsAssignment />
        TeacherComponentsAssignment with v-for for the 5 past assignments for the current student will go here.
        -->
      </div>
      <div>
        <submitButton>Assign Student Homework</submitButton>
      </div>
    </div>
  </div>
</template>

<style lang="css" scoped></style>
