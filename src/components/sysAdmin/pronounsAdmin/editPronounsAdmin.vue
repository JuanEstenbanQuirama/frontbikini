<script setup>
import { onMounted, ref } from "vue";
import { cataloguePronounsAdminApi } from "src/api/catalogue/CataloguePronounsAdmin";
import { alertService } from "src/libs/alert";

const { getPronouns, postPronoun, putPronouns } = cataloguePronounsAdminApi();
const { ShowAlert, ShowAlertConfirm } = alertService();

onMounted(async () => {
  let responsPronouns = await getPronouns();
  cataloguePronouns.value = responsPronouns;
});

const showModal = ref(false);
let cataloguePronouns = ref("");
let idPronoun = ref(0);

const addPronounApi = ref({
  name: "",
  active: true,
});

// agregando
const uploadPronounApi = async () => {
  let response = await postPronoun(addPronounApi.value);
  cataloguePronouns.value.push(response);
  if (response != null) addPronounApi.value.name = "";
  ShowAlert("good!", "Pronoun added successfully", "success");
};

// modificar
const selectedPronoun = ref({
  name: "",
  active: true,
});

// editar
const editSelectedPronoun = (pronoun) => {
  idPronoun.value = pronoun.id;
  selectedPronoun.value = {
    name: pronoun.name,
    active: pronoun.active,
  };
  showModal.value = true;
};

const updatePronoun = async () => {
  // cargar datos actualizados sin actualizar la pagina
  let response = await getPronouns();
  cataloguePronouns.value = response;
};

// actualizar
const saveEditedPronoun = async () => {
  let response = await putPronouns(idPronoun.value, selectedPronoun.value);
  showModal.value = false;
  await updatePronoun();
  ShowAlert("good!", "Pronoun updated successfully", "success");
};
</script>

<template lang="pug">
section
  .sys-Admin-Container
    .sys-Admin-Container__elements
      .sys-Admin-Container__elements--element(
        v-for="cataloguePronoun in cataloguePronouns",
        :key="cataloguePronoun.id"
      )
        .center-container 
          q-icon(name="stars", size="25px")
          p.sys-Admin-Container__elements--element-item {{ cataloguePronoun.name }}
        .sys-Admin-Container__elements--element-buttons
          q-btn.sys-Admin-Container__elements--element-buttons-button(
            @click="editSelectedPronoun(cataloguePronoun)"
          ) edit
          q-btn.sys-Admin-Container__elements--element-buttons-button Delet
      q-dialog.popup-container__dialog(v-model="showModal")
        q-card.popup-container__dialog--card
          q-card-section.popup-container__dialog--card-section
            q-form.popup-container__dialog--card-section-form(
              @submit.prevent="saveEditedPronoun"
            )
              q-input.popup-container__dialog--card-section-form-input(
                v-model="selectedPronoun.name",
                label="Name",
                filled,
                lazy-rules,
                :rules="[(val) => (val && val.length > 0) || 'Please type Name']"
              )
              q-checkbox.popup-container__dialog--card-section-form-checkbox(
                v-model="selectedPronoun.active",
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
        @submit.prevent="uploadPronounApi()"
      )
        q-input.sys-Admin-Container__Add--form-input(
          type="text",
          label="name new Gender",
          v-model="addPronounApi.name",
          filled,
          lazy-rules,
          :rules="[(val) => (val && val.length > 0) || 'Please type Name']"
        )
        q-btn.sys-Admin-Container__Add--form-button(
          type="submit",
          label="Add Pronoun"
        ) 
</template>

<style lang="scss">
.botonColor {
  color: black;
}
</style>