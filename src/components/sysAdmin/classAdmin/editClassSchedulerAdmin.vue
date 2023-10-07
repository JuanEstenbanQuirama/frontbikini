<script setup>
import { onMounted, ref, computed, watch } from "vue";
import { classesAdminApi } from "../../../api/classes/ClassesAdmin";
import { alertService } from "src/libs/alert";
import { centerAdminApi } from "src/api/center/CenterAdmin";
import { usersAdminApi } from "src/api/user/UsersEditAdmin";

const { getUsers } = usersAdminApi();
const {
  getActivePersonalClassScheduler,
  getActiveGroupClassScheduler,
  postClassScheduler,
  getClasses,
} = classesAdminApi();
const { getALLCenters } = centerAdminApi();
const { ShowAlert, ShowAlertConfirm } = alertService();

let usersApi = ref([]);
let classesApi = ref([]);
let allCentersApi = ref([]);
let activePersonalClassSchedulerApi = ref([]);
let activeGroupClassSchedulerApi = ref([]);

onMounted(async () => {
  let responsePersonalClass = await getActivePersonalClassScheduler();
  activePersonalClassSchedulerApi.value = responsePersonalClass;

  let responseGroupClass = await getActiveGroupClassScheduler();
  activeGroupClassSchedulerApi.value = responseGroupClass;

  let responseCenters = await getALLCenters();
  allCentersApi.value = responseCenters;

  let responseClasses = await getClasses();
  classesApi.value = responseClasses;

  let responseUsers = await getUsers();
  usersApi.value = responseUsers;
});

// enviar fecha formato isosString
let date1 = ref(new Date().toLocaleString());
let date2 = ref(new Date().toLocaleString());

watch([() => date1, () => date2], ([newDate1, newDate2]) => {
  if (newDate1) {
    date1 = new Date(newDate1).toISOString();
  }
  if (newDate2) {
    date2 = new Date(newDate2).toISOString();
  }
});

//  solo si profile es instructor
const filteredUsers = computed(() => {
  return usersApi.value.filter((user) => user.profile === "instructor");
});

//  solo  center es gym
const filteredCenter = computed(() => {
  return allCentersApi.value.filter((classe) => classe.type === "Gym");
});

const addClassScheduleApi = ref({
  id: 0,
  idClass: 0,
  idCenter: 0,
  idInstructor: 0,
  userLimit: 0,
  dateIni: date1,
  dateEnd: date2,
  comments: "",
  dateInitiated: date1,
  dateEnded: date2,
});
// obteniedno clases
const updateClass = async () => {
  // cargar datos actualizados sin actualizar la pagina
  let responsePersonal = await getActivePersonalClassScheduler();
  activePersonalClassSchedulerApi.value = responsePersonal;
  let responseGroup = await getActiveGroupClassScheduler();
  activeGroupClassSchedulerApi.value = responseGroup;
};

// agregando clase 
const uploadClassScheduleApi = async () => {
  let response = await postClassScheduler(addClassScheduleApi.value);

  // addClassSchedulerApi.value.push(response);
  if (response != null) await updateClass();
  addClassScheduleApi.value.idCenter = 0;
  addClassScheduleApi.value.idClass = 0;
  addClassScheduleApi.value.idInstructor = 0;
  addClassScheduleApi.value.comments = "";
  addClassScheduleApi.value.userLimit = 0;
  addClassScheduleApi.value.dateIni = date1;
  addClassScheduleApi.value.dateInitiated = date1;
  addClassScheduleApi.value.dateEnd = date2;
  addClassScheduleApi.value.dateEnded = date2;
  ShowAlert("good!", "Class Scheduler added successfully", "success");
};
</script>

<template lang="pug">
section
  .sys-Admin-Container
    .sys-Admin-Container__elements
      H4 Personal Classes
      .sys-Admin-Container__elements--element(
        v-for="activePersonalClassSchedule in activePersonalClassSchedulerApi",
        :key="activePersonalClassSchedule.id"
      )
        .center-container 
          q-icon(name="group", size="25px")
          p.sys-Admin-Container__elements--element-item Class:{{ activePersonalClassSchedule.class }}
        .center-container 
          q-icon(name="emoji_people", size="25px")
          p.sys-Admin-Container__elements--element-item {{ activePersonalClassSchedule.instructor }}
        .center-container 
          q-icon(name="calendar_month", size="25px")
          p.sys-Admin-Container__elements--element-item Date:{{ new Date(activePersonalClassSchedule.dateIni).toLocaleString() }}

      H4 Group Classes
      .sys-Admin-Container__elements--element(
        v-for="activeGroupClassSchedule in activeGroupClassSchedulerApi",
        :key="activeGroupClassSchedule.id"
      )
        .center-container 
          q-icon(name="groups", size="25px")
          p.sys-Admin-Container__elements--element-item Class: {{ activeGroupClassSchedule.class }}
        .center-container 
          q-icon(name="emoji_people", size="25px")
          p.sys-Admin-Container__elements--element-item {{ activeGroupClassSchedule.instructor }}
        .center-container 
          q-icon(name="calendar_month", size="25px")
          p.sys-Admin-Container__elements--element-item date initial: {{ new Date(activeGroupClassSchedule.dateIni).toLocaleString() }}
     
    .sys-Admin-Container__Add
      h4 Create Class
      q-form.sys-Admin-Container__Add--form(@submit="uploadClassScheduleApi()")
        select.sys-Admin-Container__Add--form-select(
          v-model="addClassScheduleApi.idCenter"
        )
          option(:value="0", disabled) Select a Center
          option(
            v-for="center in filteredCenter",
            :value="center.id",
            :key="center.id"
          ) {{ center.name }}
        select.sys-Admin-Container__Add--form-select(
          v-model="addClassScheduleApi.idClass"
        )
          option(:value="0", disabled) Select a Class
          option(
            v-for="classe in classesApi",
            :value="classe.id",
            :key="classe.id"
          ) {{ classe.name }}
        select.sys-Admin-Container__Add--form-select(
          v-model="addClassScheduleApi.idInstructor"
        )
          option(:value="0", disabled) Select a Instructor
          option(
            v-for="user in filteredUsers",
            :value="user.id",
            :key="user.id"
          ) {{ user.name }}
        q-input.sys-Admin-Container__Add--form-input(
          type="number",
          label="User Limit",
          v-model="addClassScheduleApi.userLimit",
          filled,
          lazy-rules,
          :rules="[(val) => (val && val.length > 0) || 'Please type Limit']"
        )
        div
          q-input.sys-Admin-Container__Add--form-input(
            filled,
            v-model="date1",
            label="date initial"
          )
            template(v-slot:prepend)
              q-icon.cursor-pointer(name="event")
                q-popup-proxy(
                  cover,
                  transition-show="scale",
                  transition-hide="scale"
                )
                  q-date(v-model="date1", mask="YYYY-MM-DD HH:mm")
                    .row.items-center.justify-end
                      q-btn(
                        v-close-popup,
                        label="Close",
                        color="primary",
                        flat
                      )
            template(v-slot:append)
              q-icon.cursor-pointer(name="access_time")
                q-popup-proxy(
                  cover,
                  transition-show="scale",
                  transition-hide="scale"
                )
                  q-time(v-model="date1", mask="YYYY-MM-DD HH:mm", format24h)
                    .row.items-center.justify-end
                      q-btn(
                        v-close-popup,
                        label="Close",
                        color="primary",
                        flat
                      )
        div
          q-input.sys-Admin-Container__Add--form-input(
            filled,
            v-model="date2",
            label="date end"
          )
            template(v-slot:prepend)
              q-icon.cursor-pointer(name="event")
                q-popup-proxy(
                  cover,
                  transition-show="scale",
                  transition-hide="scale"
                )
                  q-date(v-model="date2", mask="YYYY-MM-DD HH:mm")
                    .row.items-center.justify-end
                      q-btn(
                        v-close-popup,
                        label="Close",
                        color="primary",
                        flat
                      )
            template(v-slot:append)
              q-icon.cursor-pointer(name="access_time")
                q-popup-proxy(
                  cover,
                  transition-show="scale",
                  transition-hide="scale"
                )
                  q-time(v-model="date2", mask="YYYY-MM-DD HH:mm", format24h)
                    .row.items-center.justify-end
                      q-btn(
                        v-close-popup,
                        label="Close",
                        color="primary",
                        flat
                      ) 
        q-input.sys-Admin-Container__Add--form-input(
          type="textarea",
          label="Comments",
          v-model="addClassScheduleApi.comments",
          filled,
          lazy-rules,
          :rules="[(val) => (val && val.length > 0) || 'Please type Comments']"
        )
        q-btn.sys-Admin-Container__Add--form-button(
          type="submit",
          label="Add Class schedule"
        )
</template>

<style lang="scss">
.q-field__prepend.q-field__marginal.row.no-wrap.items-center {
  color: $primary;
}
.q-field__append.q-field__marginal.row.no-wrap.items-center {
  color: $primary;
}
.q-date__view.q-date__calendar {
  color: black;
}

.q-time__container-parent.absolute-full {
  color: black;
}
.q-date__main.col.column {
  color: black;
}
</style>