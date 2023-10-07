<script setup>
import { onMounted, ref } from "vue";
import { catalogueShippingStatusesAdminApi } from "src/api/catalogue/CatalogueShippingStatusesAdmin";
import { alertService } from "src/libs/alert";

const { getShippingStatuses, postShippingStatuses, putShippingStatuses } =
  catalogueShippingStatusesAdminApi();
const { ShowAlert, ShowAlertConfirm } = alertService();

onMounted(async () => {
  let responsShippingStatuses = await getShippingStatuses();
  catalogueShippingStatuses.value = responsShippingStatuses;
});

let catalogueShippingStatuses = ref("");
const showModal = ref(false);
let idShippingStatus = ref(0);

const addShippingStatusApi = ref({
  name: "",
  active: true,
});

// agregando
const uploadShippingStatusApi = async () => {
  let response = await postShippingStatuses(addShippingStatusApi.value);
  catalogueShippingStatuses.value.push(response);
  if (response != null) addShippingStatusApi.value.name = "";
  ShowAlert("good!", "Shipping Status added successfully", "success");
};

// modificar
const selectedShippingStatus = ref({
  name: "",
  active: true,
});

// editar
const editSelectedShippingStatus = (shippingStatus) => {
  idShippingStatus.value = shippingStatus.id;
  selectedShippingStatus.value = {
    name: shippingStatus.name,
    active: shippingStatus.active,
  };
  showModal.value = true;
};

const updateShippingStatus = async () => {
  // cargar datos actualizados sin actualizar la pagina
  let response = await getShippingStatuses();
  catalogueShippingStatuses.value = response;
};

// actualizar
const saveEditedShippingStatus = async () => {
  let response = await putShippingStatuses(
    idShippingStatus.value,
    selectedShippingStatus.value
  );
  showModal.value = false;
  await updateShippingStatus();
  ShowAlert("good!", "Shipping Status updated successfully", "success");
};
</script>

<template lang="pug">
section
  .sys-Admin-Container
    .sys-Admin-Container__elements
      .sys-Admin-Container__elements--element(
        v-for="catalogueShippingStatus in catalogueShippingStatuses",
        :key="catalogueShippingStatus.id"
      )
        .center-container 
          q-icon(name="attach_money", size="25px")
          p.sys-Admin-Container__elements--element-item {{ catalogueShippingStatus.name }}
        .sys-Admin-Container__elements--element-buttons
          q-btn.sys-Admin-Container__elements--element-buttons-button(
            @click="editSelectedShippingStatus(catalogueShippingStatus)"
          ) edit
          q-btn.sys-Admin-Container__elements--element-buttons-button Delet
      q-dialog.popup-container__dialog(v-model="showModal")
        q-card.popup-container__dialog--card
          q-card-section.popup-container__dialog--card-section
            q-form.popup-container__dialog--card-section-form(
              @submit.prevent="saveEditedShippingStatus"
            )
              q-input.popup-container__dialog--card-section-form-input(
                v-model="selectedShippingStatus.name",
                label="Name",
                filled,
                lazy-rules,
                :rules="[(val) => (val && val.length > 0) || 'Please type Name']"
              )
              q-checkbox.popup-container__dialog--card-section-form-checkbox(
                v-model="selectedShippingStatus.active",
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
        @submit.prevent="uploadShippingStatusApi()"
      )
        q-input.sys-Admin-Container__Add--form-input(
          type="text",
          label="name",
          v-model="addShippingStatusApi.name",
          filled,
          lazy-rules,
          :rules="[(val) => (val && val.length > 0) || 'Please type Name']"
        )
        q-btn.sys-Admin-Container__Add--form-button(
          type="submit",
          label="Add status"
        ) 
</template>
