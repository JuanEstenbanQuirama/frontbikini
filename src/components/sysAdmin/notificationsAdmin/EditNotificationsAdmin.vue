<script setup>
import { onMounted, ref } from "vue";
import { catalogueNotificationsAdminApi } from "../../../api/catalogue/CatalogueNotificationsAdmin";
import { alertService } from "src/libs/alert";

const {
  getNotificationStatuses,
  getNotificationTypes,
  postNotificationStatuses,
  putNotificationStatuses,
  putNotificationTypes,
  postNotificationTypes,
} = catalogueNotificationsAdminApi();
const { ShowAlert, ShowAlertConfirm } = alertService();
let catalogueNotificationStatuses = ref([]);
let catalogueNotificationTypes = ref([]);
const showModal = ref(false);
const showModalTypes = ref(false);
let idNotificationStatus = ref(0);
let idNotificationType = ref(0);

onMounted(async () => {
  let responseNotificationStatuses = await getNotificationStatuses();
  catalogueNotificationStatuses.value = responseNotificationStatuses;

  let responseNotificationTypes = await getNotificationTypes();
  catalogueNotificationTypes.value = responseNotificationTypes;
});

//--------Statuses
const addNotificationStatusApi = ref({
  name: "",
  active: true,
});

// agregando
const uploadNotificationStatusApi = async () => {
  let response = await postNotificationStatuses(addNotificationStatusApi.value);
  catalogueNotificationStatuses.value.push(response);
  if (response != null) addNotificationStatusApi.value.name = "";
  ShowAlert("good!", "Status added successfully", "success");
};

// modificar
const selectedNotificationStatus = ref({
  name: "",
  active: true,
});

// editar
const editSelectedNotificationStatus = (notificationStatus) => {
  idNotificationStatus.value = notificationStatus.id;
  selectedNotificationStatus.value = {
    name: notificationStatus.name,
    active: notificationStatus.active,
  };
  showModal.value = true;
};

const updateNotificationStatus = async () => {
  // cargar datos actualizados sin actualizar la pagina
  let response = await getNotificationStatuses();
  catalogueNotificationStatuses.value = response;
};

// actualizar
const saveEditedNotificationStatus = async () => {
  let response = await putNotificationStatuses(
    idNotificationStatus.value,
    selectedNotificationStatus.value
  );
  showModal.value = false;
  await updateNotificationStatus();
  ShowAlert("good!", "Status updated successfully", "success");
};

//--------Types
const addNotificationTypesApi = ref({
  name: "",
  message: "",
  active: true,
});

// agregando
const uploadNotificationTypeApi = async () => {
  let response = await postNotificationTypes(addNotificationTypesApi.value);
  catalogueNotificationTypes.value.push(response);
  if (response != null) addNotificationTypesApi.value.name = "";
  addNotificationTypesApi.value.message = "";
  ShowAlert("good!", "Type added successfully", "success");
};

// modificar
const selectedNotificationType = ref({
  name: "",
  message: "",
  active: true,
});

// editar
const editSelectedNotificationType = (notificationType) => {
  idNotificationType.value = notificationType.id;
  selectedNotificationType.value = {
    name: notificationType.name,
    message: notificationType.message,
    active: notificationType.active,
  };
  showModalTypes.value = true;
};

const updateNotificationType = async () => {
  // cargar datos actualizados sin actualizar la pagina
  let response = await getNotificationTypes();
  catalogueNotificationTypes.value = response;
};

// actualizar
const saveEditedNotificationType = async () => {
  let response = await putNotificationTypes(
    idNotificationType.value,
    selectedNotificationType.value
  );
  showModalTypes.value = false;
  await updateNotificationType();
  ShowAlert("good!", "Type updated successfully", "success");
};
</script>

<template lang="pug">
section
  .sys-Admin-Container
    .sys-Admin-Container-contenedor
      .sys-Admin-Container-contenedor-title
        h4 Notification Status
      .sys-Admin-Container__elements
        .sys-Admin-Container__elements--element(
          v-for="catalogueNotificationStatus in catalogueNotificationStatuses",
          :key="catalogueNotificationStatus.id"
        )
          .center-container 
            q-icon(name="notifications_active", size="25px")
            p.sys-Admin-Container__elements--element-item {{ catalogueNotificationStatus.name }}
          .sys-Admin-Container__elements--element-buttons
            q-btn.sys-Admin-Container__elements--element-buttons-button(
              @click="editSelectedNotificationStatus(catalogueNotificationStatus)"
            ) edit
            q-btn.sys-Admin-Container__elements--element-buttons-button Delet
        q-dialog.popup-container__dialog(v-model="showModal")
          q-card.popup-container__dialog--card
            q-card-section.popup-container__dialog--card-section
              q-form.popup-container__dialog--card-section-form(
                @submit.prevent="saveEditedNotificationStatus"
              )
                q-input.popup-container__dialog--card-section-form-input(
                  v-model="selectedNotificationStatus.name",
                  label="Name",
                  filled,
                  lazy-rules,
                  :rules="[(val) => (val && val.length > 0) || 'Please type Name']"
                )
                q-checkbox.popup-container__dialog--card-section-form-checkbox(
                  v-model="selectedNotificationStatus.active",
                  label="Active"
                ) 
                q-card-actions.popup-container__dialog--card-actions(
                  align="center"
                )
                  q-btn.popup-container__dialog--card-actions-botton(
                    label="Cancel",
                    @click="showModal = false"
                  )
                  q-btn.popup-container__dialog--card-actions-botton(
                    label="Save",
                    type="submit"
                  )
      .sys-Admin-Container__Add
        q-form.sys-Admin-Container__Add--form(
          @submit.prevent="uploadNotificationStatusApi()"
        )
          q-input.sys-Admin-Container__Add--form-input(
            type="text",
            label="Name",
            v-model="addNotificationStatusApi.name",
            filled,
            lazy-rules,
            :rules="[(val) => (val && val.length > 0) || 'Please type Name']"
          )
          q-btn.sys-Admin-Container__Add--form-button(
            type="submit",
            label="Add status"
          ) 
    .sys-Admin-Container-contenedor
      .sys-Admin-Container-contenedor-title
        h4 Notification Types
      .sys-Admin-Container__elements
        .sys-Admin-Container__elements--element(
          v-for="catalogueNotificationType in catalogueNotificationTypes",
          :key="catalogueNotificationType.id"
        )
          .center-container 
            q-icon(name="notifications", size="25px")
            p.sys-Admin-Container__elements--element-item {{ catalogueNotificationType.name }}
          .sys-Admin-Container__elements--element-buttons
            q-btn.sys-Admin-Container__elements--element-buttons-button(
              @click="editSelectedNotificationType(catalogueNotificationType)"
            ) edit
            q-btn.sys-Admin-Container__elements--element-buttons-button Delet
        q-dialog.popup-container__dialog(v-model="showModalTypes")
          q-card.popup-container__dialog--card
            q-card-section.popup-container__dialog--card-section(
              @submit.prevent="saveEditedNotificationType"
            )
              q-form.popup-container__dialog--card-section-form
                q-input.popup-container__dialog--card-section-form-input(
                  v-model="selectedNotificationType.name",
                  label="Name",
                  filled,
                  lazy-rules,
                  :rules="[(val) => (val && val.length > 0) || 'Please type Name']"
                )
                q-input.popup-container__dialog--card-section-form-input(
                  v-model="selectedNotificationType.message",
                  label="Message",
                  filled,
                  lazy-rules,
                  :rules="[(val) => (val && val.length > 0) || 'Please type Message']"
                )
                q-checkbox.popup-container__dialog--card-section-form-checkbox(
                  v-model="selectedNotificationType.active",
                  label="Active"
                ) 
                q-card-actions.popup-container__dialog--card-actions(
                  align="center"
                )
                  q-btn.popup-container__dialog--card-actions-botton(
                    label="Cancel",
                    @click="showModalTypes = false"
                  )
                  q-btn.popup-container__dialog--card-actions-botton(
                    label="Save",
                    type="submit"
                  )
      .sys-Admin-Container__Add
        q-form.sys-Admin-Container__Add--form(
          @submit.prevent="uploadNotificationTypeApi()"
        )
          q-input.sys-Admin-Container__Add--form-input(
            type="text",
            label="name",
            v-model="addNotificationTypesApi.name",
            filled,
            lazy-rules,
            :rules="[(val) => (val && val.length > 0) || 'Please type Name']"
          )
          q-input.sys-Admin-Container__Add--form-input(
            type="text",
            label="Message",
            v-model="addNotificationTypesApi.message",
            filled,
            lazy-rules,
            :rules="[(val) => (val && val.length > 0) || 'Please type Message']"
          )
          q-btn.sys-Admin-Container__Add--form-button(
            type="submit",
            label="Add type"
          ) 
</template>

<style lang="scss">
.sys-Admin-Container-contenedor {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  &-title {
    text-align: center;
    font-family: Montserrat;
    margin-top: 1.5rem;
    line-height: 1.1em;
  }
}
</style>