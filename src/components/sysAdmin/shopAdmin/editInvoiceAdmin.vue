<script setup>
import { onMounted, ref } from "vue";
import { cataloguInvoiceAdminApi } from "src/api/catalogue/CatalogueInvoiceAdmin";
import { alertService } from "src/libs/alert";

const { getInvoiceStatuses, putInvoiceStatuses, postInvoiceStatuses } =
  cataloguInvoiceAdminApi();
const { ShowAlert, ShowAlertConfirm } = alertService();

onMounted(async () => {
  let responseInvoiceStatuses = await getInvoiceStatuses();
  catalogueInvoiceStatuses.value = responseInvoiceStatuses;
});

let catalogueInvoiceStatuses = ref("");
const showModal = ref(false);
let idInvoiceStatus = ref(0);

const addInvoiceStatusApi = ref({
  name: "",
  active: true,
});

// agregando
const uploadInvoiceStatusApi = async () => {
  let response = await postInvoiceStatuses(addInvoiceStatusApi.value);
  catalogueInvoiceStatuses.value.push(response);
  if (response != null) addInvoiceStatusApi.value.name = "";
  ShowAlert("good!", "Invoice Status added successfully", "success");
};

// modificar
const selectedInvoiceStatus = ref({
  name: "",
  active: true,
});

// editar
const editSelectedInvoiceStatus = (invoiceStatus) => {
  idInvoiceStatus.value = invoiceStatus.id;
  selectedInvoiceStatus.value = {
    name: invoiceStatus.name,
    active: invoiceStatus.active,
  };
  showModal.value = true;
};

const updateInvoiceStatus = async () => {
  // cargar datos actualizados sin actualizar la pagina
  let response = await getInvoiceStatuses();
  catalogueInvoiceStatuses.value = response;
};

// actualizar
const saveEditedInvoiceStatus = async () => {
  let response = await putInvoiceStatuses(
    idInvoiceStatus.value,
    selectedInvoiceStatus.value
  );
  showModal.value = false;
  await updateInvoiceStatus();
  ShowAlert("good!", "Invoice Status updated successfully", "success");
};
</script>

<template lang="pug">
section
  .sys-Admin-Container
    .sys-Admin-Container__elements
      .sys-Admin-Container__elements--element(
        v-for="catalogueInvoiceStatus in catalogueInvoiceStatuses",
        :key="catalogueInvoiceStatus.id"
      )
        .center-container 
          q-icon(name="attach_money", size="25px")
          p.sys-Admin-Container__elements--element-item {{ catalogueInvoiceStatus.name }}
        .sys-Admin-Container__elements--element-buttons
          q-btn.sys-Admin-Container__elements--element-buttons-button(
            @click="editSelectedInvoiceStatus(catalogueInvoiceStatus)"
          ) edit
          q-btn.sys-Admin-Container__elements--element-buttons-button Delet
      q-dialog.popup-container__dialog(v-model="showModal")
        q-card.popup-container__dialog--card
          q-card-section.popup-container__dialog--card-section
            q-form.popup-container__dialog--card-section-form(
              @submit.prevent="saveEditedInvoiceStatus"
            )
              q-input.popup-container__dialog--card-section-form-input(
                v-model="selectedInvoiceStatus.name",
                label="Name",
                filled,
                lazy-rules,
                :rules="[(val) => (val && val.length > 0) || 'Please type Name']"
              )
              q-checkbox.popup-container__dialog--card-section-form-checkbox(
                v-model="selectedInvoiceStatus.active",
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
        @submit.prevent="uploadInvoiceStatusApi()"
      )
        q-input.sys-Admin-Container__Add--form-input(
          type="text",
          label="name",
          v-model="addInvoiceStatusApi.name",
          filled,
          lazy-rules,
          :rules="[(val) => (val && val.length > 0) || 'Please type Name']"
        )

        q-btn.sys-Admin-Container__Add--form-button(
          type="submit",
          label="Add Status"
        ) 
</template>
