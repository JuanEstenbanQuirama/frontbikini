<script setup>
import { onMounted, ref } from "vue";
import { cataloguePermissionsAdminApi } from "src/api/catalogue/CataloguePermissionsAdmin";
import { alertService } from "src/libs/alert";

const { getPermissions, postPermissions, putPermissions } =
  cataloguePermissionsAdminApi();
const { ShowAlert, ShowAlertConfirm } = alertService();

let cataloguePermissions = ref([]);
const showModal = ref(false);
let idPermissions = ref(0);

onMounted(async () => {
  let responsePermissions = await getPermissions();
  cataloguePermissions.value = responsePermissions;
});

const addPermissionApi = ref({
  name: "",
  active: true,
  hastag: "",
});

// agregando
const uploadPermissionApi = async () => {
  let response = await postPermissions(addPermissionApi.value);
  cataloguePermissions.value.push(response);
  if (response != null) addPermissionApi.value.name = "";
  addPermissionApi.value.hastag = "";
  ShowAlert("good!", "Permission added successfully", "success");
};

// modificar
const selectedPermissions = ref({
  name: "",
  active: true,
  hastag: "",
});

// editar
const editSelectedPermissions = (Permissions) => {
  idPermissions.value = Permissions.id;
  selectedPermissions.value = {
    name: Permissions.name,
    active: Permissions.active,
    hastag: Permissions.hastag,
  };
  showModal.value = true;
};

const updatePermissions = async () => {
  // cargar datos actualizados sin actualizar la pagina
  let response = await getPermissions();
  cataloguePermissions.value = response;
};

// actualizar
const saveEditedPermissions = async () => {
  let response = await putPermissions(
    idPermissions.value,
    selectedPermissions.value
  );
  showModal.value = false;
  await updatePermissions();
  ShowAlert("good!", "Permission updated successfully", "success");
};
</script>

<template lang="pug">
section
  .sys-Admin-Container
    .sys-Admin-Container__elements
      .sys-Admin-Container__elements--element(
        v-for="cataloguePermission in cataloguePermissions",
        :key="cataloguePermission.id"
      )
        .center-container 
          q-icon(name="workspace_premium", size="25px")
          p.sys-Admin-Container__elements--element-item {{ cataloguePermission.name }}
        .sys-Admin-Container__elements--element-buttons
          q-btn.sys-Admin-Container__elements--element-buttons-button(
            @click="editSelectedPermissions(cataloguePermission)"
          ) edit
          q-btn.sys-Admin-Container__elements--element-buttons-button Delet
      q-dialog.popup-container__dialog(v-model="showModal")
        q-card.popup-container__dialog--card
          q-card-section.popup-container__dialog--card-section
            q-form.popup-container__dialog--card-section-form(
              @submit.prevent="saveEditedPermissions"
            )
              q-input.popup-container__dialog--card-section-form-input(
                v-model="selectedPermissions.name",
                label="Name",
                filled,
                lazy-rules,
                :rules="[(val) => (val && val.length > 0) || 'Please type Name']"
              )
              q-input.popup-container__dialog--card-section-form-input(
                v-model="selectedPermissions.hastag",
                label="# Hastag",
                filled,
                lazy-rules,
                :rules="[(val) => (val && val.length > 0) || 'Please type Hastag']"
              )
              q-checkbox.popup-container__dialog--card-section-form-checkbox(
                v-model="selectedPermissions.active",
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
        @submit.prevent="uploadPermissionApi()"
      )
        q-input.sys-Admin-Container__Add--form-input(
          type="text",
          label="Name ",
          v-model="addPermissionApi.name",
          filled,
          lazy-rules,
          :rules="[(val) => (val && val.length > 0) || 'Please type Name']"
        )
        q-input.sys-Admin-Container__Add--form-input(
          type="text",
          label=" # Hastag",
          v-model="addPermissionApi.hastag",
          filled,
          lazy-rules,
          :rules="[(val) => (val && val.length > 0) || 'Please type Hastag']"
        )
        q-btn.sys-Admin-Container__Add--form-button(
          type="submit",
          label="Add Permission"
        ) 
</template>