<script setup>
import { onMounted, ref } from "vue";
import { cataloguePaymentAdminApi } from "src/api/catalogue/CataloguePaymentAdmin";
import { alertService } from "src/libs/alert";

const { getPaymentTypes, postPaymentTypes, putPaymentTypes } =
  cataloguePaymentAdminApi();
const { ShowAlert, ShowAlertConfirm } = alertService();

onMounted(async () => {
  let responsPaymentTypes = await getPaymentTypes();
  cataloguePaymentTypes.value = responsPaymentTypes;
});

let cataloguePaymentTypes = ref("");
const showModal = ref(false);
let idPaymentType = ref(0);

const addPaymentTypeApi = ref({
  name: "",
  urlOut: "",
  ursCorrect: "",
  urlFail: "",
  active: true,
});

// agregando 
const uploadPaymentTypeApi = async () => {
  let response = await postPaymentTypes(addPaymentTypeApi.value);
  cataloguePaymentTypes.value.push(response)
  if(response != null) 
  addPaymentTypeApi.value.name = ""
  addPaymentTypeApi.value.urlOut = ""
  addPaymentTypeApi.value.ursCorrect = ""
  addPaymentTypeApi.value.urlFail = ""
  ShowAlert("good!", "Payment added successfully", "success");
};

// modificar 
const selectedPaymentType = ref({
  name: "",
  urlOut: "",
  urlCorrect: "",
  urlFail: "",
  active: true,
});

// editar genero
const editSelectedPaymentType = (paymentType) => {
  idPaymentType.value = paymentType.id
  selectedPaymentType.value = {
    name: paymentType.name,
    urlOut: paymentType.urlOut,
    urlCorrect: paymentType.urlCorrect,
    urlFail: paymentType.urlFail,
    active: paymentType.active,
  };
  showModal.value = true;
};

const updatePaymentType = async () => { // cargar datos actualizados sin actualizar la pagina
  let response = await getPaymentTypes();
  cataloguePaymentTypes.value = response;
};

// actualizar 
const saveEditedPaymentType = async () => {
  let response = await putPaymentTypes(idPaymentType.value, selectedPaymentType.value);
  showModal.value = false;
  await updatePaymentType();
  ShowAlert("good!", "Payment updated successfully", "success");
};
</script>

<template lang="pug">
section
  .sys-Admin-Container
    .sys-Admin-Container__elements
      .sys-Admin-Container__elements--element(
        v-for="cataloguePaymentType in cataloguePaymentTypes",
        :key="cataloguePaymentType.id"
      )
        .center-container 
          q-icon(name="attach_money", size="25px")
          p.sys-Admin-Container__elements--element-item {{ cataloguePaymentType.name }}
        .sys-Admin-Container__elements--element-buttons
          q-btn.sys-Admin-Container__elements--element-buttons-button(
            @click="editSelectedPaymentType(cataloguePaymentType)"
          ) edit
          q-btn.sys-Admin-Container__elements--element-buttons-button Delet
      q-dialog.popup-container__dialog(v-model="showModal")
        q-card.popup-container__dialog--card
          q-card-section.popup-container__dialog--card-section
            q-form.popup-container__dialog--card-section-form(@submit.prevent="saveEditedPaymentType")
              q-input.popup-container__dialog--card-section-form-input(
                v-model="selectedPaymentType.name",
                label="Name"
                filled,
                lazy-rules,
                :rules="[(val) => (val && val.length > 0) || 'Please type Name']"
              )
              q-input.popup-container__dialog--card-section-form-input(
                v-model="selectedPaymentType.urlOut",
                label="UrlOut"
                filled,
                lazy-rules,
                :rules="[(val) => (val && val.length > 0) || 'Please type UrlOut']"
              )
              q-input.popup-container__dialog--card-section-form-input(
                v-model="selectedPaymentType.urlCorrect",
                label="UrlCorrect"
                filled,
                lazy-rules,
                :rules="[(val) => (val && val.length > 0) || 'Please type UrlCorrect']"
              )
              q-input.popup-container__dialog--card-section-form-input(
                v-model="selectedPaymentType.urlFail",
                label="UrlFail"
                filled,
                lazy-rules,
                :rules="[(val) => (val && val.length > 0) || 'Please type UrlFail']"
              )
              q-checkbox.popup-container__dialog--card-section-form-checkbox(
                v-model="selectedPaymentType.active",
                label="Active"
              ) 
              q-card-actions.popup-container__dialog--card-actions(align="center")
                q-btn.popup-container__dialog--card-actions-botton(
                label="Cancel",
                @click="showModal = false"
              )
                q-btn.popup-container__dialog--card-actions-botton(
                label="Save",
                type="submit"
              )
    .sys-Admin-Container__Add
      q-form.sys-Admin-Container__Add--form(@submit.prevent="uploadPaymentTypeApi()")
        q-input.sys-Admin-Container__Add--form-input(
          type="text",
          label="name",
          v-model="addPaymentTypeApi.name"
          filled,
                lazy-rules,
                :rules="[(val) => (val && val.length > 0) || 'Please type Name']"
        )
        q-input.sys-Admin-Container__Add--form-input(
          type="text",
          label="urlOut",
          v-model="addPaymentTypeApi.urlOut"
          filled,
                lazy-rules,
                :rules="[(val) => (val && val.length > 0) || 'Please type urlOut']"
        )
        q-input.sys-Admin-Container__Add--form-input(
          type="text",
          label="urlCorrect",
          v-model="addPaymentTypeApi.urlCorrect"
          filled,
                lazy-rules,
                :rules="[(val) => (val && val.length > 0) || 'Please type urlCorrect']"
        )
        q-input.sys-Admin-Container__Add--form-input(
          type="text",
          label="urlFail",
          v-model="addPaymentTypeApi.urlFail"
          filled,
                lazy-rules,
                :rules="[(val) => (val && val.length > 0) || 'Please type urlFail']"
        )
        q-btn.sys-Admin-Container__Add--form-button(
          type="submit",
          label="Add"
        ) 
</template>
