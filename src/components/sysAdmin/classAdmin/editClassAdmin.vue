<script setup>
import { onMounted, ref } from "vue";
import { catalogueClassAdminApi } from "../../../api/catalogue/CatalogueClassAdmin";
import { alertService } from "src/libs/alert";

const {
  getClassModels,
  putClassModels,
  postClassModels,
  getClassTypes,
  putClassTypes,
  postClassTypes,
} = catalogueClassAdminApi();
const { ShowAlert, ShowAlertConfirm } = alertService();

onMounted(async () => {
  let responseClassModels = await getClassModels();
  catalogueClassModels.value = responseClassModels;

  let responseClassTypes = await getClassTypes();
  catalogueClassTypes.value = responseClassTypes;
});

// Models
let catalogueClassModels = ref("");
const showModal = ref(false);
let idClassModel = ref(0);

const addClassModelApi = ref({
  name: "",
  active: true,
});

// agregando
const uploadClassModelApi = async () => {
  let response = await postClassModels(addClassModelApi.value);
  catalogueClassModels.value.push(response)
  if(response != null) addClassModelApi.value.name = ""
  ShowAlert("good!", "Class model added successfully", "success");
};

// modificar
const selectedClassModel = ref({
  name: "",
  active: true,
});


// editar
const editSelectedClassModel = (classModel) => {
  idClassModel.value = classModel.id
  selectedClassModel.value = {
    name: classModel.name,
    active: classModel.active,
  };
  showModal.value = true;
};

const updateClassModels = async () => { // cargar datos actualizados sin actualizar la pagina
  let response = await getClassModels();
  catalogueClassModels.value = response;
};

// actualizar
const saveEditedClassModel = async () => {
  let response = await putClassModels(idClassModel.value, selectedClassModel.value);
  showModal.value = false;
  await updateClassModels();
  ShowAlert("good!", "Class model updated successfully", "success");
};

// types
let catalogueClassTypes = ref("");
const showModalTypes = ref(false);
let idClassType = ref(0);

const addClassTypeApi = ref({
  name: "",
  active: true,
});

// agregando
const uploadClassTypeApi = async () => {
  let response = await postClassTypes(addClassTypeApi.value);
  catalogueClassTypes.value.push(response)
  if(response != null) addClassTypeApi.value.name = ""
  ShowAlert("good!", "Class type added successfully", "success");
};

// modificar
const selectedClassType = ref({
  name: "",
  active: true,
});

// editar
const editSelectedClassType = (classType) => {
  idClassType.value = classType.id
  selectedClassType.value = {
    name: classType.name,
    active: classType.active,
  };
  showModalTypes.value = true;
};

const updateClassTypes = async () => { // cargar datos actualizados sin actualizar la pagina
  let response = await getClassTypes();
  catalogueClassTypes.value = response;
};

// actualizar
const saveEditedClassType = async () => {
  let response = await putClassTypes(
    idClassType.value,
    selectedClassType.value
  );
  showModalTypes.value = false;
  await updateClassTypes();
  ShowAlert("good!", "Clas type updated successfully", "success");
};
</script>

<template lang="pug">
section
  .sys-Admin-Container
    .sys-Admin-Container-contenedor
      .sys-Admin-Container-contenedor-title
        h4 models
      .sys-Admin-Container__elements
        .sys-Admin-Container__elements--element(
          v-for="catalogueClassModel in catalogueClassModels",
          :key="catalogueClassModel.id"
        )
          .center-container 
            q-icon(name="fitness_center", size="25px")
            p.sys-Admin-Container__elements--element-item {{ catalogueClassModel.name }}
          .sys-Admin-Container__elements--element-buttons
            q-btn.sys-Admin-Container__elements--element-buttons-button(
              @click="editSelectedClassModel(catalogueClassModel)"
            ) edit
            q-btn.sys-Admin-Container__elements--element-buttons-button Delet
        q-dialog.popup-container__dialog(v-model="showModal")
          q-card.popup-container__dialog--card
            q-card-section.popup-container__dialog--card-section
              q-form.popup-container__dialog--card-section-form(@submit.prevent="saveEditedClassModel")
                q-input.popup-container__dialog--card-section-form-input(
                  v-model="selectedClassModel.name",
                  label="Name",
                  filled,
                lazy-rules,
                :rules="[(val) => (val && val.length > 0) || 'Please type Name']"
                )
                q-checkbox.popup-container__dialog--card-section-form-checkbox(
                  v-model="selectedClassModel.active",
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
        q-form.sys-Admin-Container__Add--form(@submit.prevent="uploadClassModelApi()")
          q-input.sys-Admin-Container__Add--form-input(
            type="text",
            label="Name",
            v-model="addClassModelApi.name"
            filled,
            lazy-rules,
            :rules="[(val) => (val && val.length > 0) || 'Please type Name']"
          )
          q-btn.sys-Admin-Container__Add--form-button(
            type="submit",
            label="Add models"
          ) 
    .sys-Admin-Container-contenedor
      .sys-Admin-Container-contenedor-title
        h4 types
      .sys-Admin-Container__elements
        .sys-Admin-Container__elements--element(
          v-for="catalogueClassType in catalogueClassTypes",
          :key="catalogueClassType.id"
        )
          .center-container 
            q-icon(name="fitness_center", size="25px")
            p.sys-Admin-Container__elements--element-item {{ catalogueClassType.name }}
          .sys-Admin-Container__elements--element-buttons
            q-btn.sys-Admin-Container__elements--element-buttons-button(
              @click="editSelectedClassType(catalogueClassType)"
            ) edit
            q-btn.sys-Admin-Container__elements--element-buttons-button Delet
        q-dialog.popup-container__dialog(v-model="showModalTypes")
          q-card.popup-container__dialog--card
            q-card-section.popup-container__dialog--card-section
              q-form.popup-container__dialog--card-section-form(@submit.prevent="saveEditedClassType")
                q-input.popup-container__dialog--card-section-form-input(
                  v-model="selectedClassType.name",
                  label="Name",
                  filled,
                lazy-rules,
                :rules="[(val) => (val && val.length > 0) || 'Please type Name']"
                )
                q-checkbox.popup-container__dialog--card-section-form-checkbox(
                  v-model="selectedClassType.active",
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
        q-form.sys-Admin-Container__Add--form(@submit.prevent="uploadClassTypeApi()")
          q-input.sys-Admin-Container__Add--form-input(
            type="text",
            label="Name",
            v-model="addClassTypeApi.name"
            filled,
            lazy-rules,
            :rules="[(val) => (val && val.length > 0) || 'Please type Name']"
          )
          q-btn.sys-Admin-Container__Add--form-button(
            type="submit",
            label="Add type"
          ) 
</template>