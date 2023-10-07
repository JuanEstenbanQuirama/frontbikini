<script setup>
import { onMounted, ref } from "vue";
import { catalogueCountriesAdminApi } from "src/api/catalogue/CatalogueCountriesAdmin";
import { alertService } from "src/libs/alert";

const { getCountries, postCountries, putCountries } =
  catalogueCountriesAdminApi();
const { ShowAlert, ShowAlertConfirm } = alertService();

onMounted(async () => {
  let responsCountries = await getCountries();
  catalogueCountries.value = responsCountries;
});

let catalogueCountries = ref([]);
const showModal = ref(false);
let idCountry = ref(0);

const addCountriesApi = ref({
  name: "",
  active: true,
});

// agregando
const uploadCountryApi = async () => {
  let response = await postCountries(addCountriesApi.value);
  catalogueCountries.value.push(response);
  if (response != null) addCountriesApi.value.name = "";
  ShowAlert("good!", "Country added successfully", "success");
};

// modificar
const selectedCountry = ref({
  name: "",
  active: true,
});

// editar
const editSelectedCountry = (country) => {
  idCountry.value = country.id;
  selectedCountry.value = {
    name: country.name,
    active: country.active,
  };
  showModal.value = true;
};

const updateCountry = async () => {
  // cargar datos actualizados sin actualizar la pagina
  let response = await getCountries();
  catalogueCountries.value = response;
};

// actualizar
const saveEditedCountry = async () => {
  let response = await putCountries(idCountry.value, selectedCountry.value);
  showModal.value = false;
  await updateCountry();
  ShowAlert("good!", "Country updated successfully", "success");
};
</script>

<template lang="pug">
section
  .sys-Admin-Container
    .sys-Admin-Container__elements
      .sys-Admin-Container__elements--element(
        v-for="catalogueCountry in catalogueCountries",
        :key="catalogueCountry.id"
      )
        .center-container 
          q-icon(name="flag_circle", size="25px")
          p.sys-Admin-Container__elements--element-item {{ catalogueCountry.name }}
        .sys-Admin-Container__elements--element-buttons
          q-btn.sys-Admin-Container__elements--element-buttons-button(
            @click="editSelectedCountry(catalogueCountry)"
          ) edit
          q-btn.sys-Admin-Container__elements--element-buttons-button Delet
      q-dialog.popup-container__dialog(v-model="showModal")
        q-card.popup-container__dialog--card
          q-card-section.popup-container__dialog--card-section
            q-form.popup-container__dialog--card-section-form(
              @submit.prevent="saveEditedCountry"
            )
              q-input.popup-container__dialog--card-section-form-input(
                v-model="selectedCountry.name",
                label="Name",
                filled,
                lazy-rules,
                :rules="[(val) => (val && val.length > 0) || 'Please type Name']"
              )
              q-checkbox.popup-container__dialog--card-section-form-checkbox(
                v-model="selectedCountry.active",
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
        @submit.prevent="uploadCountryApi()"
      )
        q-input.sys-Admin-Container__Add--form-input(
          type="text",
          label="Name ",
          v-model="addCountriesApi.name",
          filled,
          lazy-rules,
          :rules="[(val) => (val && val.length > 0) || 'Please type Name']"
        )
        q-btn.sys-Admin-Container__Add--form-button(
          type="submit",
          label="Add Country"
        ) 
</template>