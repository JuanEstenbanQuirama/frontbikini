<script setup>
import { onMounted, ref } from "vue";
import { classesAdminApi } from "../../../api/classes/ClassesAdmin";
import { alertService } from "src/libs/alert";
import { useUserStore } from "src/stores/user";
import { catalogueClassAdminApi } from "src/api/catalogue/CatalogueClassAdmin";

const { getClassExcercises, postClassExcercises, putClassExcercises } =
  classesAdminApi();
const { getClassTypes } = catalogueClassAdminApi();

const { ShowAlert, ShowAlertConfirm } = alertService();
const useUser = useUserStore();

onMounted(async () => {
  let response = await getClassExcercises();
  classExcercisesApi.value = response;

  let responseClassType = await getClassTypes();
  classTypesApi.value = responseClassType;

  let responseUserStore = await useUser.getUser();
  addClassExcerciseApi.value.idUserCreate = responseUserStore.id;
  addClassExcerciseApi.value.idUserUpdate = responseUserStore.id;
});

let classTypesApi = ref([]);
let classExcercisesApi = ref([]);
const showModal = ref(false);

const addClassExcerciseApi = ref({
  id: 0,
  idType: 0,
  idUserCreate: 0,
  idUserUpdate: 0,
  creationDate: new Date(),
  updateDate: new Date(),
  active: true,
  url: "",
  description: "",
  duration: 0,
  img: "exerciseDefault.png",
  name: "",
});

// agregando
const uploadClassExcerciseApi = async () => {
  let response = await postClassExcercises(addClassExcerciseApi.value);
  classExcercisesApi.value.push(response);
  if (response != null) addClassExcerciseApi.value.idType = 0;
  addClassExcerciseApi.value.url = "";
  addClassExcerciseApi.value.description = "";
  addClassExcerciseApi.value.duration = 0;
  addClassExcerciseApi.value.name = "";
  ShowAlert("good!", "Class model added successfully", "success");
};

// modificar
const selectedClassExcercise = ref({
  id: 0,
  idType: 0,
  idUserCreate: 0,
  idUserUpdate: 0,
  creationDate: "",
  updateDate: new Date(),
  active: true,
  url: "",
  description: "",
  duration: 0,
  img: "exerciseDefault.png",
  name: "",
});

// editar
const editSelectedClassExcercise = (ClassExcercise) => {
  selectedClassExcercise.value = {
    id: ClassExcercise.id,
    idType: ClassExcercise.idType,
    idUserCreate: ClassExcercise.idUserCreate,
    idUserUpdate: ClassExcercise.idUserUpdate,
    creationDate: ClassExcercise.creationDate,
    updateDate: new Date(),
    active: ClassExcercise.active,
    url: ClassExcercise.url,
    description: ClassExcercise.description,
    duration: ClassExcercise.duration,
    img: ClassExcercise.img,
    name: ClassExcercise.name,
  };
  showModal.value = true;
};

const updateClassExcercise = async () => {
  // cargar datos actualizados sin actualizar la pagina
  let response = await getClassExcercises();
  classExcercisesApi.value = response;
};

// actualizar
const saveEditedExcercise = async () => {
  let response = await putClassExcercises(selectedClassExcercise.value);
  showModal.value = false;
  await updateClassExcercise();
  ShowAlert("good!", "Class model updated successfully", "success");
};

const imgUrl = ref("");

const onFileSelected = (event) => {
  const selectedFile = event.target.files[0];
  const reader = new FileReader();
  reader.onload = () => {
    imgUrl.value = reader.result;
  };
  reader.readAsDataURL(selectedFile);
  addClassExcerciseApi.value.img = selectedFile.name;
};
</script>

<template lang="pug">
section
  .sys-Admin-Container
    .sys-Admin-Container__elements
      .sys-Admin-Container__elements--element(
        v-for="classExcercise in classExcercisesApi",
        :key="classExcercise.id"
      ) 
        .center-container 
          q-icon(name="fitness_center", size="25px")
          p.sys-Admin-Container__elements--element-item {{  classExcercise.name}}
        .sys-Admin-Container__elements--element-buttons
          q-btn.sys-Admin-Container__elements--element-buttons-button(
            @click="editSelectedClassExcercise(classExcercise)"
          ) edit
          q-btn.sys-Admin-Container__elements--element-buttons-button Delet
      q-dialog.popup-container__dialog(v-model="showModal")
        q-card.popup-container__dialog--card
          q-card-section.popup-container__dialog--card-section
            q-form.popup-container__dialog--card-section-form(
              @submit.prevent="saveEditedExcercise"
            )
              //- .popup-container__dialog--card-section-form-image
              //-   img.popup-container__dialog--card-section-form-image-img(
              //-     src="../../../../public/resources/userDefault.png"
              //-   )
              //-   input(type="file", @change="onFileSelected")
              select.popup-container__dialog--card-section-form-select(
                v-model="selectedClassExcercise.idType"
              )
                option(:value="0", disabled) Select a type
                option(
                  v-for="classType in classTypesApi",
                  :value="classType.id",
                  :key="classType.id"
                ) {{ classType.name }}
              q-input.popup-container__dialog--card-section-form-input(
                v-model="selectedClassExcercise.url",
                label="Url",
                type="text"
                filled,
                lazy-rules,
                :rules="[(val) => (val && val.length > 0) || 'Please type Url']"
              )
              q-input.popup-container__dialog--card-section-form-input(
                v-model="selectedClassExcercise.name",
                label="Name",
                type="text",
                filled,
                lazy-rules,
                :rules="[(val) => (val && val.length > 0) || 'Please type Name']"
              )
              q-input.popup-container__dialog--card-section-form-input(
                v-model="selectedClassExcercise.description",
                label="Description",
                type="text",
                filled,
                lazy-rules,
                :rules="[(val) => (val && val.length > 0) || 'Please type Description']"
              )
              q-input.popup-container__dialog--card-section-form-input(
                v-model="selectedClassExcercise.duration",
                label="Duration",
                type="number",
                filled,
                lazy-rules,
                :rules="[(val) => (val && val.length > 0) || 'Please type Duration']"
              )
              q-checkbox.popup-container__dialog--card-section-form-checkbox(
                v-model="selectedClassExcercise.active",
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
          @submit.prevent="uploadClassExcerciseApi()"
        )
          select.sys-Admin-Container__Add--form-select(
            v-model="addClassExcerciseApi.idType"
          )
            option(:value="0", disabled) Select a type
            option(
              v-for="classType in classTypesApi",
              :value="classType.id",
              :key="classType.id"
            ) {{ classType.name }}
          q-input.sys-Admin-Container__Add--form-input(
            type="text",
            label="Url",
            v-model="addClassExcerciseApi.url",
            filled,
            lazy-rules,
            :rules="[(val) => (val && val.length > 0) || 'Please type Url']"
          )
          q-input.sys-Admin-Container__Add--form-input(
            type="text",
            label="Name",
            v-model="addClassExcerciseApi.name",
            filled,
            lazy-rules,
            :rules="[(val) => (val && val.length > 0) || 'Please type Name']"
          )
          q-input.sys-Admin-Container__Add--form-input(
            type="text",
            label="Description",
            v-model="addClassExcerciseApi.description"
            filled,
                lazy-rules,
                :rules="[(val) => (val && val.length > 0) || 'Please type Description']"
          )
          q-input.sys-Admin-Container__Add--form-input(
            type="number",
            label="Duration",
            v-model="addClassExcerciseApi.duration"
            filled,
                lazy-rules,
                :rules="[(val) => (val && val.length > 0) || 'Please type Duration']"
          )
          //- div
          //-   img.sys-Admin-Container__Add--form-image(:src="imgUrl")
          //-   input(type="file", @change="onFileSelected")
          q-btn.sys-Admin-Container__Add--form-button(
            type="submit",
            label="Add ClassExcercise"
          ) 
</template>
