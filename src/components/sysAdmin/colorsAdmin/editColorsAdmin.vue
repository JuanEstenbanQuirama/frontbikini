<script setup>
import { onMounted, ref } from "vue";
import { catalogueColorsAdminApi } from "src/api/catalogue/CatalogueColorsAdmin";
import { alertService } from "src/libs/alert";

const { getColors, postColors, putColors } = catalogueColorsAdminApi();
const { ShowAlert, ShowAlertConfirm } = alertService();

onMounted(async () => {
  let responseColors = await getColors();
  catalogueColors.value = responseColors;
});

const catalogueColors = ref([]);
const showModal = ref(false);
const idColor = ref(0);

const addColorApi = ref({
  name: "",
  htmlColor: "",
  active: true,
});

const uploadColorApi = async () => {
  let response = await postColors(addColorApi.value);
  catalogueColors.value.push(response); // cargar dato creado sin actualizar la pagina
  if (response != null) addColorApi.value.name = "";
  addColorApi.value.htmlColor = "";
  ShowAlert("good!", "Color added successfully", "success");
};

const selectedColor = ref({
  name: "",
  htmlColor: "",
  active: true,
});

const editSelectedColor = (color) => {
  idColor.value = color.id;
  selectedColor.value = {
    name: color.name,
    htmlColor: color.htmlColor,
    active: color.active,
  };
  showModal.value = true;
};

const updateColors = async () => {
  // cargar datos actualizados sin actualizar la pagina
  let response = await getColors();
  catalogueColors.value = response;
};

const saveEditedColor = async () => {
  let response = await putColors(idColor.value, selectedColor.value);
  showModal.value = false;
  await updateColors(); // cargar datos nuevo actualizados
  ShowAlert("good!", "Color updated successfully", "success");
};
</script>

<template lang="pug">
section
  .sys-Admin-Container
    .sys-Admin-Container__elements
      .sys-Admin-Container__elements--element(
        v-for="catalogueColor in catalogueColors",
        :key="catalogueColor.id"
      )
        .center-container 
          q-icon(name="format_paint", size="25px")
          p.sys-Admin-Container__elements--element-item {{ catalogueColor.name }}
        .sys-Admin-Container__elements--element-buttons
          q-btn.sys-Admin-Container__elements--element-buttons-button(
            @click="editSelectedColor(catalogueColor)"
          ) edit
          q-btn.sys-Admin-Container__elements--element-buttons-button Delet
      q-dialog.popup-container__dialog(v-model="showModal")
        q-card.popup-container__dialog--card
          q-card-section.popup-container__dialog--card-section
            q-form.popup-container__dialog--card-section-form(
              @submit.prevent="saveEditedColor"
            )
              q-input.popup-container__dialog--card-section-form-input(
                v-model="selectedColor.name",
                label="Name",
                filled,
                lazy-rules,
                :rules="[(val) => (val && val.length > 0) || 'Please type Name']"
              )
              q-input.popup-container__dialog--card-section-form-input(
                v-model="selectedColor.htmlColor",
                label="Html color",
                filled,
                lazy-rules,
                :rules="[(val) => (val && val.length > 0) || 'Please type Html color']"
              )
              q-checkbox.popup-container__dialog--card-section-form-checkbox(
                v-model="selectedColor.active",
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
      q-form.sys-Admin-Container__Add--form(@submit.prevent="uploadColorApi()")
        q-input.sys-Admin-Container__Add--form-input(
          type="text",
          label="name ",
          v-model="addColorApi.name",
          filled,
          lazy-rules,
          :rules="[(val) => (val && val.length > 0) || 'Please type Name']"
        )
        q-input.sys-Admin-Container__Add--form-input(
          type="text",
          label="html color",
          v-model="addColorApi.htmlColor",
          filled,
          lazy-rules,
          :rules="[(val) => (val && val.length > 0) || 'Please type Html color']"
        )
        q-btn.sys-Admin-Container__Add--form-button(
          type="submit",
          label="Add color"
        ) 
</template>