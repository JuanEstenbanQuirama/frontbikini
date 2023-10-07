<script setup>
import { onMounted, ref } from "vue";
import { catalogueCountriesAdminApi } from "src/api/catalogue/CatalogueCountriesAdmin";
import { alertService } from "src/libs/alert";
import { catalogueTimeZonesAdminApi } from "src/api/catalogue/CatalogueTimeZonesAdmin";

const { getStates, putStates, postStates, getCountries } =
  catalogueCountriesAdminApi();
const { ShowAlert, ShowAlertConfirm } = alertService();
const { getTimeZones } = catalogueTimeZonesAdminApi();

onMounted(async () => {
  let responseStates = await getStates();
  catalogueStates.value = responseStates;

  let responseCountries = await getCountries();
  catalogueCountries.value = responseCountries;

  let responseTimezones = await getTimeZones();
  catalogueTimeZones.value = responseTimezones;
});

const catalogueTimeZones = ref([]);
const catalogueCountries = ref([]);
const catalogueStates = ref([]);
const showModal = ref(false);
let idState = ref(0);

const addStateApi = ref({
  idCountry: 0,
  idUtc: 0,
  name: "",
  active: true,
});

// agregando
const uploadStateApi = async () => {
  let response = await postStates(addStateApi.value);
  catalogueStates.value.push(response);
  if (response != null) addStateApi.value.idCountry = 0;
  addStateApi.value.idUtc = 0;
  addStateApi.value.name = "";
  ShowAlert("good!", "State added successfully", "success");
};

// modificar
const selectedState = ref({
  idCountry: 0,
  idUtc: 0,
  name: "",
  active: true,
});

// editar
const editSelectedState = (state) => {
  idState.value = state.id;
  selectedState.value = {
    idCountry: state.idCountry,
    idUtc: state.idUtc,
    name: state.name,
    active: state.active,
  };
  showModal.value = true;
};

const updateState = async () => {
  // cargar datos actualizados sin actualizar la pagina
  let response = await getStates();
  catalogueStates.value = response;
};

// actualizar
const saveEditedState = async () => {
  let response = await putStates(idState.value, selectedState.value);
  showModal.value = false;
  await updateState();
  ShowAlert("good!", "State updated successfully", "success");
};
</script>

<template lang="pug">
section
  .sys-Admin-Container
    .sys-Admin-Container__elements
      .sys-Admin-Container__elements--element(
        v-for="catalogueState in catalogueStates",
        :key="catalogueState.id"
      )
        .center-container 
          q-icon(name="outlined_flag", size="25px")
          p.sys-Admin-Container__elements--element-item {{ catalogueState.name }}
        .sys-Admin-Container__elements--element-buttons
          q-btn.sys-Admin-Container__elements--element-buttons-button(
            @click="editSelectedState(catalogueState)"
          ) edit
          q-btn.sys-Admin-Container__elements--element-buttons-button Delet
      q-dialog.popup-container__dialog(v-model="showModal")
        q-card.popup-container__dialog--card
          q-card-section.popup-container__dialog--card-section
            q-form.popup-container__dialog--card-section-form(
              @submit.prevent="saveEditedState"
            )
              select.popup-container__dialog--card-section-form-select(
                v-model="selectedState.idCountry"
              )
                option(:value="0", disabled) Select Country reference
                option(
                  v-for="catalogueCountry in catalogueCountries",
                  :value="catalogueCountry.id",
                  :key="catalogueCountry.id"
                ) {{ catalogueCountry.name }}
              select.popup-container__dialog--card-section-form-select(
                v-model="selectedState.idUtc"
              )
                option(:value="0", disabled) Select TimeZone reference
                option(
                  v-for="catalogueTime in catalogueTimeZones",
                  :value="catalogueTime.id",
                  :key="catalogueTime.id"
                ) {{ catalogueTime.name }}
              q-input.popup-container__dialog--card-section-form-input(
                v-model="selectedState.name",
                label="Name",
                filled,
                lazy-rules,
                :rules="[(val) => (val && val.length > 0) || 'Please type Name']"
              )
              q-checkbox.popup-container__dialog--card-section-form-checkbox(
                v-model="selectedState.active",
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
      q-form.sys-Admin-Container__Add--form(@submit.prevent="uploadStateApi()")
        select.sys-Admin-Container__Add--form-select(
          v-model="addStateApi.idCountry"
        )
          option(:value="0", disabled) Select Country reference
          option(
            v-for="catalogueCountry in catalogueCountries",
            :value="catalogueCountry.id",
            :key="catalogueCountry.id"
          ) {{ catalogueCountry.name }}
        select.sys-Admin-Container__Add--form-select(
          v-model="addStateApi.idUtc"
        )
          option(:value="0", disabled) Select TimeZone reference
          option(
            v-for="catalogueTime in catalogueTimeZones",
            :value="catalogueTime.id",
            :key="catalogueTime.id"
          ) {{ catalogueTime.name }}
        q-input.sys-Admin-Container__Add--form-input(
          type="text",
          label="Name ",
          v-model="addStateApi.name",
          filled,
          lazy-rules,
          :rules="[(val) => (val && val.length > 0) || 'Please type Name']"
        )
        q-btn.sys-Admin-Container__Add--form-button(
          type="submit",
          label="Add Country"
        ) 
</template>