<script setup>
import { onMounted, ref, watch } from "vue";
import { spinnerService } from "src/libs/spinner";
import { catalogueProfilesAdminApi } from "src/api/catalogue/CatalogueProfilesAdmin";
import { cataloguePermissionsAdminApi } from "src/api/catalogue/CataloguePermissionsAdmin";
import { catalogueMenuAdminApi } from "src/api/catalogue/CatalogueMenuAdmin";
import { alertService } from "src/libs/alert";

const { ShowAlert, ShowAlertConfirm } = alertService();
const { getMenuSubs } = catalogueMenuAdminApi();
const { getPermissions } = cataloguePermissionsAdminApi();
const {
  getProfiles,
  postProfile,
  putProfile,
  getProfilePermission,
  postProfilePermission,
  deleteProfilePermission,
  getProfileSubMenus,
  postProfileSubMenus,
  deleteProfileSubMenu,
} = catalogueProfilesAdminApi();

onMounted(async () => {
  let responsProfiles = await getProfiles();
  catalogueProfiles.value = responsProfiles;

  let responsePermissions = await getPermissions(); // permisos
  cataloguePermissions.value = responsePermissions;

  let responseMenuSubs = await getMenuSubs(); // sub menus
  catalogueMenuSubs.value = responseMenuSubs;
});

let cataloguePermissions = ref([]);
let catalogueProfilePermissions = ref([]);
let catalogueProfileSubMenus = ref([]);
let catalogueMenuSubs = ref([]);
let nameProfile = ref("");

// -----------profile
let catalogueProfiles = ref([]);
const showModal = ref(false);
const showModalProfilePermisions = ref(false);
let idProfile = ref(0);
const idProfilForPermissions = ref(0);

const addProfileApi = ref({
  name: "",
  active: true,
});

// agregando
const uploadProfileApi = async () => {
  let response = await postProfile(addProfileApi.value);
  catalogueProfiles.value.push(response);
  if (response != null) addProfileApi.value.name = "";
  ShowAlert("good!", "Profile added successfully", "success");
};

// modificar
const selectedProfile = ref({
  name: "",
  active: true,
});

// editar
const editSelectedProfile = (profile) => {
  idProfile.value = profile.id;
  selectedProfile.value = {
    name: profile.name,
    active: profile.active,
  };
  showModal.value = true;
};

const updateProfile = async () => {
  // cargar datos actualizados sin actualizar la pagina
  let response = await getProfiles();
  catalogueProfiles.value = response;
};

// actualizar
const saveEditedProfile = async () => {
  let response = await putProfile(idProfile.value, selectedProfile.value);
  showModal.value = false;
  await updateProfile();
  ShowAlert("good!", "Profile updated successfully", "success");
};

//----mandar id en el get
const getPermissionProfileApi = async (catalogueProfile) => {
  idProfilForPermissions.value = catalogueProfile.id;
  nameProfile.value = catalogueProfile.name;

  deleteProfilePermissionApi.value.idProfile = catalogueProfile.id;
  deleteProfileSubMenuApi.value.idProfile = catalogueProfile.id;

  addProfilePermissionApi.value.idProfile = catalogueProfile.id;
  addProfileSubMenuApi.value.idProfile = catalogueProfile.id;

  let responsePermissions = await getProfilePermission(
    idProfilForPermissions.value
  );
  catalogueProfilePermissions.value = responsePermissions; // permisos de ese perfil

  let responseSubMenu = await getProfileSubMenus(idProfilForPermissions.value);
  catalogueProfileSubMenus.value = responseSubMenu;

  showModalProfilePermisions.value = true;
};

//----profile permisions-------------
let addProfilePermissionApi = ref({
  idProfile: 0,
  idPermission: 0,
});

// eliminando
let deleteProfilePermissionApi = ref({
  idProfile: 0,
  idPermission: 0,
});

//----profile sub menu-------------
let addProfileSubMenuApi = ref({
  idProfile: 0,
  idSubMenu: 0,
});

// eliminando
let deleteProfileSubMenuApi = ref({
  idProfile: 0,
  idSubMenu: 0,
});

//------------------------
function permisionsisActive(cataloguePermission) {
  const profilePermisions = catalogueProfilePermissions.value.filter(
    (pPermision) => pPermision.id === cataloguePermission.id
  );
  if (profilePermisions.length === 0) {
    return false;
  }
  if (cataloguePermission.active) {
    return true;
  } else {
    return false;
  }
}

const permissionsIp = (cataloguePermission) => {
  addProfilePermissionApi.value.idPermission = cataloguePermission.id;
  deleteProfilePermissionApi.value.idPermission = cataloguePermission.id;
};
const menuSubIp = (catalogueMenuSub) => {
  addProfileSubMenuApi.value.idSubMenu = catalogueMenuSub.id;
  deleteProfileSubMenuApi.value.idSubMenu = catalogueMenuSub.id;
};

function subMenusisActive(catalogueMenuSub) {
  const profileSubMenus = catalogueProfileSubMenus.value.filter(
    (pSubMenus) => pSubMenus.id === catalogueMenuSub.id
  );
  if (profileSubMenus.length === 0) {
    return false;
  }
  if (catalogueMenuSub.active) {
    return true;
  } else {
    return false;
  }
}

const handleCheckboxChangeMenuSub = async (event) => {
  if (event.target.checked) {
    let responseAdd = await postProfileSubMenus(addProfileSubMenuApi.value);
    catalogueProfileSubMenus.value.push(responseAdd);
    showModalProfilePermisions.value = false;
    if (responseAdd != null) addProfileSubMenuApi.value.idSubMenu = 0;
    ShowAlert("good!", "Menu sub added successfully", "success");
  } else {
    let response = await deleteProfileSubMenu(deleteProfileSubMenuApi.value);
    catalogueProfileSubMenus.value.push(response);
    showModalProfilePermisions.value = false;
    if (response != null) deleteProfilePermissionApi.value.idPermission = 0;
    ShowAlert("good!", "Menu sub deleted successfully", "success");
  }
};

const handleCheckboxChangePermission = async (event) => {
  if (event.target.checked) {
    let responseAdd = await postProfilePermission(
      addProfilePermissionApi.value
    );
    catalogueProfilePermissions.value.push(responseAdd);
    showModalProfilePermisions.value = false;
    if (responseAdd != null) addProfilePermissionApi.value.idPermission = 0;
    ShowAlert("good!", "Permission added successfully", "success");
  } else {
    let response = await deleteProfilePermission(
      deleteProfilePermissionApi.value
    );
    catalogueProfilePermissions.value.push(response);
    showModalProfilePermisions.value = false;
    if (response != null) deleteProfilePermissionApi.value.idPermission = 0;
    ShowAlert("good!", "Permission deleted successfully", "success");
  }
};
</script>

<template lang="pug">
section
  .sys-Admin-Container
    .sys-Admin-Container-contenedor
      .sys-Admin-Container__elements
        .sys-Admin-Container__elements--element(
          v-for="catalogueProfile in catalogueProfiles",
          :key="catalogueProfile.id"
        )
          .center-container 
            q-icon(name="manage_accounts", size="25px")
            p.sys-Admin-Container__elements--element-item {{ catalogueProfile.name }}

          .sys-Admin-Container__elements--element-buttons
            q-btn.sys-Admin-Container__elements--element-buttons-button(
              @click="getPermissionProfileApi(catalogueProfile)"
            ) permisions
            q-btn.sys-Admin-Container__elements--element-buttons-button(
              @click="editSelectedProfile(catalogueProfile)"
            ) edit
            q-btn.sys-Admin-Container__elements--element-buttons-button Delet
        q-dialog.popup-container__dialog(v-model="showModal")
          q-card.popup-container__dialog--card
            q-card-section.popup-container__dialog--card-section
              q-form.popup-container__dialog--card-section-form(
                @submit.prevent="saveEditedProfile"
              )
                q-input.popup-container__dialog--card-section-form-input(
                  v-model="selectedProfile.name",
                  label="Name",
                  filled,
                  lazy-rules,
                  :rules="[(val) => (val && val.length > 0) || 'Please type Name']"
                )
                q-checkbox.popup-container__dialog--card-section-form-checkbox(
                  v-model="selectedProfile.active",
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
          @submit.prevent="uploadProfileApi()"
        )
          q-input.sys-Admin-Container__Add--form-input(
            type="text",
            label="Name  profile",
            v-model="addProfileApi.name",
            filled,
            lazy-rules,
            :rules="[(val) => (val && val.length > 0) || 'Please type Name profile']"
          )
          q-btn.sys-Admin-Container__Add--form-button(
            type="submit",
            label="Add Profile"
          ) 
    .sys-Admin-Container-contenedor
      q-dialog.popup-container__dialog(v-model="showModalProfilePermisions")
        q-card.popup-container__dialog--card
          q-card-section.popup__section
            .popup__section--container
              .popup__section--container-elements
                p.popup__section--container-elements-title Menu
                p.popup__section--container-elements-item(
                  v-for="cataloguePermission in cataloguePermissions",
                  :key="cataloguePermission.id"
                ) {{ cataloguePermission.name }}
                  input.popup__section--container-elements-item-input(
                    type="checkbox",
                    :checked="permisionsisActive(cataloguePermission)",
                    @click="permissionsIp(cataloguePermission)",
                    @change="handleCheckboxChangePermission",
                    :id="'toggle-' + cataloguePermission.id"
                  )
                  label(:for="'toggle-' + cataloguePermission.id")
                    q-icon.colorbiki(
                      name="eva-toggle-right",
                      size="45px",
                      v-if="permisionsisActive(cataloguePermission)"
                    )
                    q-icon.colorblack(
                      name="eva-toggle-left",
                      size="45px",
                      v-else
                    )
              .popup__section--container-elements
                p.popup__section--container-elements-title Sub menu
                p.popup__section--container-elements-item(
                  v-for="catalogueMenuSub in catalogueMenuSubs",
                  :key="catalogueMenuSub.id"
                ) {{ catalogueMenuSub.name }}
                  input.popup__section--container-elements-item-input(
                    type="checkbox",
                    @click="menuSubIp(catalogueMenuSub)",
                    :checked="subMenusisActive(catalogueMenuSub)",
                    @change="handleCheckboxChangeMenuSub",
                    :id="'switch-' + catalogueMenuSub.id"
                  )
                  label(:for="'switch-' + catalogueMenuSub.id")
                    q-icon.colorbiki(
                      name="eva-toggle-right",
                      size="45px",
                      v-if="subMenusisActive(catalogueMenuSub)"
                    )
                    q-icon.colorblack(
                      name="eva-toggle-left",
                      size="45px",
                      v-else
                    )
            q-card-actions.popup-container__dialog--card-actions(
              align="center"
            )
              q-btn.popup-boton-cancel(
                label="Cancel",
                @click="showModalProfilePermisions = false"
              )
</template>
<style lang="scss">
.sys-Admin-Container-contenedor {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  &-title {
    text-align: center;
    font-family: Montserrat;
    margin-top: 1.5rem;
    line-height: 1.1em;
  }
}

.popup__section {
  display: flex;
  flex-direction: column;
  &--container {
    color: black;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    font-family: Montserrat;
    line-height: 1.1em;

    &-title {
      font-weight: 500;
      margin-bottom: 10px;
    }
    &-elements {
      color: white;
      &-title {
        text-align: center;
        font-size: 20px;
        font-weight: 900;
      }
      &-item {
        font-size: 20px;
        margin: 0;
        &-input {
          margin-left: 20px;
        }
      }
    }
  }
  &-item {
    font-family: Montserrat;
    line-height: 1.1em;
    color: black;
    font-size: 17px;
    margin: 0;
  }
  &-select {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    &-items {
      display: flex;
      justify-content: space-between;
    }
  }
}
.popup-boton-cancel {
  background: $grey;
  min-width: 75px;
  margin: 2%;
}

.colornegro {
  color: black;
}

.colorblack {
  cursor: pointer;
  margin-left: 15px;
  color: $grey;
}
.colorbiki {
  margin-left: 15px;
  color: $primary;
  cursor: pointer;
}

.popup__section--container-elements-item-input {
  display: none;
}
</style>
