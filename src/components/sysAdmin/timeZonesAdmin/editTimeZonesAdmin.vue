<script setup>
import { onMounted, ref } from "vue";
import { catalogueTimeZonesAdminApi } from "src/api/catalogue/CatalogueTimeZonesAdmin";
import { alertService } from "src/libs/alert";

const { getTimeZones, postTimeZones } = catalogueTimeZonesAdminApi();
const { ShowAlert, ShowAlertConfirm } = alertService();
let timeZonesSelect = ref(0);
let catalogueTimeZones = ref([]);

onMounted(async () => {
  let responseTimeZones = await getTimeZones();
  catalogueTimeZones.value = responseTimeZones;
});

const addTimeZoneApi = ref({
  name: "",
  description: "",
  offset: 0,
  active: true,
});

// agregando
const uploadTimeZoneApi = async () => {
  let response = await postTimeZones(addTimeZoneApi.value);
  catalogueTimeZones.value.push(response);
  if (response != null) addTimeZoneApi.value.name = "";
  addTimeZoneApi.value.description = "";
  addTimeZoneApi.value.offset = 0;
  ShowAlert("good!", "Time zone added successfully", "success");
};
</script>

<template lang="pug">
section
  .sys-Admin-Container
    .sys-Admin-Container__elements
      select.sys-Admin-Container__Add--form-select(v-model="timeZonesSelect")
        option(:value="0", disabled) View timeZones
        option(
          v-for="catalogueTimeZone in catalogueTimeZones",
          :value="catalogueTimeZone.id",
          :key="catalogueTimeZone.id"
        ) {{ catalogueTimeZone.name }}
    .sys-Admin-Container__Add
      q-form.sys-Admin-Container__Add--form(
        @submit.prevent="uploadTimeZoneApi()"
      )
        q-input.sys-Admin-Container__Add--form-input(
          type="text",
          label="Name",
          v-model="addTimeZoneApi.name",
          filled,
          lazy-rules,
          :rules="[(val) => (val && val.length > 0) || 'Please type Name']"
        )
        q-input.sys-Admin-Container__Add--form-input(
          type="text",
          label="Description",
          v-model="addTimeZoneApi.description",
          filled,
          lazy-rules,
          :rules="[(val) => (val && val.length > 0) || 'Please type Description']"
        )
        q-input.sys-Admin-Container__Add--form-input(
          type="number",
          label="offset",
          v-model="addTimeZoneApi.offset",
          filled,
          lazy-rules,
          :rules="[(val) => (val && val.length > 0) || 'Please type offset']"
        )
        q-btn.sys-Admin-Container__Add--form-button(
          type="submit",
          label="Add time zone"
        ) 
</template>

