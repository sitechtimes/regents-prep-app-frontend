<template>
    <div class="flex flex-wrap items-start justify-start align-top gap-8" v-if="courses.length > 0">
        <div @click="router.push(`/student/course/${course.id}`)" v-for="course in courses"
            class="cursor-pointer border-2 border-gray rounded-lg overflow-hidden w-80 flex flex-col items-center justify-center transition-all duration-300 ease-in-out hover:shadow-[0_35px_25px_-15px_rgba(0,0,0,0.2)] hover:border-gray-200">
            <div class="w-full h-24 flex flex-col items-start justify-end p-2 "
                :style="{ backgroundColor: subjectColors[course.subject] }">
                <h3 class="text-2xl font-semibold">{{ course.name }}</h3>
                <p class="text-sm">Period {{ course.period }}</p>
                <p>{{ course.teacher }}</p>
            </div>
            <div class="flex flex-col items-start justify-start w-full min-h-64 p-2">
                <h2 class="font-bold text-xl pt-1 pb-2">Assignments</h2>
                <div class="flex flex-col items-start justify-center" v-if="course.assignments.length > 0">
                    <div v-for="assignment in course.assignments">
                        <p class="font-medium underline underline-offset-2" :title="assignment.due.toLocaleString()">Due
                            {{
                                formatDate(assignment.due,
                                    currentTime) }}</p>
                        <NuxtLink class="assignment" :to="`/student/course/${course.id}/${assignment.id}`"
                            @click="$event.stopPropagation()">
                            <span>{{ assignment.name }}</span>
                            <span v-if="assignment.type === 'student'"> ({{ assignment.questionsCompleted }}/{{
                                assignment.questionsLength }})</span>
                        </NuxtLink>
                    </div>
                </div>
                <p v-else>No assignments</p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const store = useUserStore();
const router = useRouter();

const { courses } = storeToRefs(store);
const currentTime = ref(new Date());

const subjectColors = {
    "Math": "#B4CBDB", //blue
    "English": "#D1ACA4", //pink
    "Science": "#C2D2B5", //green
    "History": "#ECDDBF", //yellow
    "Russian": "#BDAFD1" //purple
}
</script>

<style scoped></style>