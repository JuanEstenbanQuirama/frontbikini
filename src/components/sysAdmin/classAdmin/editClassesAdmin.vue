<script setup>
import { onMounted, ref } from "vue";
import { classesAdminApi } from "../../../api/classes/ClassesAdmin";
import { alertService } from "src/libs/alert";
import { useUserStore } from "src/stores/user";
import { catalogueClassAdminApi } from "src/api/catalogue/CatalogueClassAdmin";

const { getClasses, postClasses, putClasses } = classesAdminApi();
const { getClassTypes, getClassModels } = catalogueClassAdminApi();

const { ShowAlert, ShowAlertConfirm } = alertService();
const useUser = useUserStore();

onMounted(async () => {
  let response = await getClasses();
  classesApi.value = response;

  let responseClassType = await getClassTypes();
  classTypesApi.value = responseClassType;

  let responseClassModelsApi = await getClassModels();
  classModelsApi.value = responseClassModelsApi;

  let responseUserStore = await useUser.getUser();
  addClassApi.value.idUserCreate = responseUserStore.id;
  addClassApi.value.idUserUpdate = responseUserStore.id;
});
let classModelsApi = ref([]);
let classTypesApi = ref([]);
let classesApi = ref([]); // esta vacio
const showModal = ref(false);

const addClassApi = ref({
  id: 0, // ok
  idModel: 0, // ok
  idType: 0, // ok
  idUserCreate: 0, // ok
  idUserUpdate: 0, // ok
  name: "",
  creationDate: new Date(), // ok
  updateDate: new Date(), // ok
  active: true,
  description: "",
});

// agregando
const uploadClassApi = async () => {
  let response = await postClasses(addClassApi.value);
  classesApi.value.push(response);
  if (response != null) 
  addClassApi.value.idModel = 0;
  addClassApi.value.idType = 0;
  addClassApi.value.name = "";
  addClassApi.value.description = "";
  ShowAlert("good!", "Class added successfully", "success");
};

const selectedClass = ref({
  id: 0, 
  idModel: 0, 
  idType: 0, 
  idUserCreate: 0, 
  idUserUpdate: 0, 
  name: "",
  creationDate: "", 
  updateDate: new Date(), 
  active: true,
  description: "",
});

// editar
const editSelectedClass = (classe) => {
  selectedClass.value = {
    id: classe.id,
    idModel: classe.idModel,
    idType: classe.idType,
    idUserCreate: classe.idUserCreate,
    idUserUpdate: classe.idUserUpdate,
    name: classe.name,
    creationDate: classe.creationDate,
    updateDate: new Date(),
    active: classe.active,
    description: classe.description,
  };
  showModal.value = true;
};

const updateClass = async () => {
  // cargar datos actualizados sin actualizar la pagina
  let response = await getClasses();
  classesApi.value = response;
};

// actualizar
const saveEditedClassModel = async () => {
  let response = await putClasses(selectedClass.value);
  showModal.value = false;
  await updateClass();
  ShowAlert("good!", "Class  updated successfully", "success");
};
</script>

<template lang="pug">
section
  .sys-Admin-Container
    .sys-Admin-Container__elements
      .sys-Admin-Container__elements--element(
        v-for="classe in classesApi",
        :key="classe.id"
      )
        .center-container 
          q-icon(name="done_outline", size="25px")
          p.sys-Admin-Container__elements--element-item {{ classe.name }}
        .sys-Admin-Container__elements--element-buttons
          q-btn.sys-Admin-Container__elements--element-buttons-button(
            @click="editSelectedClass(classe)"
          ) edit
          q-btn.sys-Admin-Container__elements--element-buttons-button Delet
      q-dialog.popup-container__dialog(v-model="showModal")
        q-card.popup-container__dialog--card
          q-card-section.popup-container__dialog--card-section
            q-form.popup-container__dialog--card-section-form(@submit.prevent="saveEditedClassModel")

              select.popup-container__dialog--card-section-form-select(
                v-model="selectedClass.idType"
              )
                option(:value="0", disabled) Select a type
                option(
                  v-for="classType in classTypesApi",
                  :value="classType.id",
                  :key="classType.id"
                ) {{ classType.name }}
              select.popup-container__dialog--card-section-form-select(
                v-model="selectedClass.idModel"
              )
                option(:value="0", disabled) Select a model
                option(
                  v-for="classModel in classModelsApi",
                  :value="classModel.id",
                  :key="classModel.id"
                ) {{ classModel.name }}
              q-input.popup-container__dialog--card-section-form-input(
                v-model="selectedClass.name",
                label="Name"
                filled,
                lazy-rules,
                :rules="[(val) => (val && val.length > 0) || 'Please type Name']"
              )
              q-input.popup-container__dialog--card-section-form-input(
                v-model="selectedClass.description",
                label="Description"
                filled,
                lazy-rules,
                :rules="[(val) => (val && val.length > 0) || 'Please type Description']"
              )
              q-checkbox.popup-container__dialog--card-section-form-checkbox(
                v-model="selectedClass.active",
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
      q-form.sys-Admin-Container__Add--form(@submit.prevent="uploadClassApi()")
        select.sys-Admin-Container__Add--form-select(
          v-model="addClassApi.idType"
        )
          option(:value="0", disabled) Select a type
          option(
            v-for="classType in classTypesApi",
            :value="classType.id",
            :key="classType.id"
          ) {{ classType.name }}
        select.sys-Admin-Container__Add--form-select(
          v-model="addClassApi.idModel"
        )
          option(:value="0", disabled) Select a model
          option(
            v-for="classModel in classModelsApi",
            :value="classModel.id",
            :key="classModel.id"
          ) {{ classModel.name }}
        q-input.sys-Admin-Container__Add--form-input(
          type="text",
          label="Name",
          v-model="addClassApi.name"
          filled,
          lazy-rules,
          :rules="[(val) => (val && val.length > 0) || 'Please type Name']"
        )
        q-input.sys-Admin-Container__Add--form-input(
          type="textarea",
          label="Description",
          v-model="addClassApi.description"
          filled,
          lazy-rules,
          :rules="[(val) => (val && val.length > 0) || 'Please type Description']"
        )
        q-btn.sys-Admin-Container__Add--form-button(
          type="submit",
          label="Add ClassExcercise"
        ) 
</template>