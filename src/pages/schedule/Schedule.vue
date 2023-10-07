<script setup>
import { classesAdminApi } from 'src/api/classes/ClassesAdmin';
import { onMounted, ref } from 'vue';

const {getActivePersonalClassScheduler, getActiveGroupClassScheduler} = classesAdminApi();
const personalClassSchedulerApi = ref([])
const groupClassSchedulerApi = ref([])

onMounted(async ()=>{
    const responsePersonal = await getActivePersonalClassScheduler()
    personalClassSchedulerApi.value = responsePersonal

    const responseGroup = await getActiveGroupClassScheduler()
    groupClassSchedulerApi.value = responseGroup


})
</script>

<template lang="pug">
section
  div
    h4 hi from schedule
    h3 Personal class
    div(v-for="personalClassSchedule in personalClassSchedulerApi" :key="personalClassSchedule.id")
        p Class: {{ personalClassSchedule.class }}
        //- p Comments: {{ personalClassSchedule.coments }}
        //- p Instructor:{{ personalClassSchedule.instructor }}
    h3 Group class
    div(v-for="groupClassSchedule in groupClassSchedulerApi" :key="groupClassSchedule.id")
        p Class {{ groupClassSchedule.class }}
        //- p Comments:{{ groupClassSchedule.coments }}
        //- p Instructor:{{ groupClassSchedule.instructor }}
</template>