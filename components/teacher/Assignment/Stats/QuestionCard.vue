<template>
  <tr class="cursor-pointer hover:bg-neutral-100 dark:hover:bg-neutral-800" @click="emit('select')">
    <th class="w-10 text-lg">{{ index + 1 }}</th>

    <td class="w-96 overflow-hidden text-ellipsis text-lg *:line-clamp-4" v-html="removeImage(question.text)"></td>

    <td class="w-32 text-lg">{{ questionStat.totalTimeSpent / questionStat.totalInstances || "—" }} sec</td>

    <td>
      <ol class="flex list-outside flex-col gap-y-1 text-lg">
        <li v-for="answer in question.answers" :key="answer.id" class="list list-item" :class="{ 'marker:font-bold marker:text-green-700': answer.isCorrect }">
          <div class="flex items-center justify-center gap-2">
            <span class="w-12 shrink-0 text-nowrap" :class="{ 'font-bold text-green-700': answer.isCorrect }">{{ questionStat.studentChoices.filter((choice) => choice === answer.id).length }}</span>

            <div class="flex h-4 w-full min-w-40 overflow-hidden rounded-full border border-neutral-400 bg-neutral-300">
              <div
                :class="answer.isCorrect ? 'bg-green-500' : 'bg-red-500'"
                :style="{ width: (questionStat.studentChoices.reduce((total, choice) => total + (choice === answer.id ? 1 : 0), 0) / questionStat.studentChoices.length) * 100 + '%' }"
              ></div>
            </div>
          </div>
        </li>
      </ol>
    </td>
  </tr>
</template>

<script setup lang="ts">
defineProps<{
  questionStat: QuestionStat;
  question: TopicQuestionInterface;
  index: number;
}>();
const emit = defineEmits<{ select: [void] }>();

function removeImage(html: string): string {
  return html.replace(/<img[^>]*>/gi, "");
}
</script>

<style scoped>
.list {
  list-style-type: upper-alpha;
}
</style>
