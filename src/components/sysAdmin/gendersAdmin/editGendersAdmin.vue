<script setup>
import { onMounted, ref, reactive } from "vue";
import { catalogueGendersAdminApi } from "src/api/catalogue/CatalogueGendersAdmin";
import { alertService } from "src/libs/alert";

const { getGenders, postGender, putGenders } = catalogueGendersAdminApi();
const { ShowAlert, ShowAlertConfirm } = alertService();

onMounted(async () => {
  let responsGenders = await getGenders();
  catalogueGenders.value = responsGenders;
});

let catalogueGenders = ref([]);
const showModal = ref(false);
let idGender = ref(0);

const addGenderApi = ref({
  name: "",
  active: true,
});

// agregando
const uploadGenderApi = async () => {
  let response = await postGender(addGenderApi.value);
  catalogueGenders.value.push(response);
  if (response != null) addGenderApi.value.name = "";
  ShowAlert("good!", "Gender added successfully", "success");
};

// modificar
const selectedGender = ref({
  name: "",
  active: true,
});

// editar
const editSelectedGender = (gender) => {
  idGender.value = gender.id;
  selectedGender.value = {
    name: gender.name,
    active: gender.active,
  };
  showModal.value = true;
};

const updateGender = async () => {
  // cargar datos actualizados sin actualizar la pagina
  let response = await getGenders();
  catalogueGenders.value = response;
};

// actualizar
const saveEditedGender = async () => {
  let response = await putGenders(idGender.value, selectedGender.value);
  showModal.value = false;
  await updateGender();
  ShowAlert("good!", "Gender updated successfully", "success");
};
</script>

<template lang="pug">
section
  .sys-Admin-Container
    .sys-Admin-Container__elements
      .sys-Admin-Container__elements--element(
        v-for="catalogueGender in catalogueGenders",
        :key="catalogueGender.id"
      )
        .center-container 
          q-icon(name="female", size="25px")
          p.sys-Admin-Container__elements--element-item {{ catalogueGender.name }}
        .sys-Admin-Container__elements--element-buttons
          q-btn.sys-Admin-Container__elements--element-buttons-button(
            @click="editSelectedGender(catalogueGender)"
          ) edit
          q-btn.sys-Admin-Container__elements--element-buttons-button Delet
      q-dialog.popup-container__dialog(v-model="showModal")
        q-card.popup-container__dialog--card
          q-card-section.popup-container__dialog--card-section
            q-form.popup-container__dialog--card-section-form(
              @submit.prevent="saveEditedGender"
            )
              q-input.popup-container__dialog--card-section-form-input(
                v-model="selectedGender.name",
                label="Name",
                filled,
                lazy-rules,
                :rules="[(val) => (val && val.length > 0) || 'Please type Name']"
              )
              q-checkbox.popup-container__dialog--card-section-form-checkbox(
                v-model="selectedGender.active",
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
        @submit.prevent="uploadGenderApi()"
      )
        q-input.sys-Admin-Container__Add--form-input(
          type="text",
          label="New gender name",
          v-model="addGenderApi.name",
          filled,
          lazy-rules,
          :rules="[(val) => (val && val.length > 0) || 'Please type New gender name']"
        )
        q-btn.sys-Admin-Container__Add--form-button(
          type="submit",
          label="Add Gender"
        ) 
</template>

