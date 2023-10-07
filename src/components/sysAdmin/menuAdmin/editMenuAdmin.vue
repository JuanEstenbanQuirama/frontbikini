<script setup>
import { onMounted, ref } from "vue";
import { catalogueMenuAdminApi } from "src/api/catalogue/CatalogueMenuAdmin";
import { alertService } from "src/libs/alert";

const { getMenus, postMenu, putMenu, getMenuSubs, postMenuSubs, putMenuSubs } =
  catalogueMenuAdminApi();
const { ShowAlert, ShowAlertConfirm } = alertService();

onMounted(async () => {
  let responseMenu = await getMenus();
  catalogueMenus.value = responseMenu;

  let responseMenuSubs = await getMenuSubs();
  catalogueMenuSubs.value = responseMenuSubs;
});

let catalogueMenus = ref([]);
let catalogueMenuSubs = ref([]);
const showModal = ref(false);
const showModals = ref(false);
const idMenuReference = ref(0);

const addMenuApi = ref({
  name: "",
  active: true,
  goTo: "",
});

const addMenuSubApi = ref({
  idMenu: 0,
  name: "",
  active: true,
  maintenance: true,
  goTo: "",
});

const uploadMenuApi = async () => {
  let response = await postMenu(addMenuApi.value);
  catalogueMenus.value.push(response);
  if (response != null) addMenuApi.value.name = "";
  addMenuApi.value.goTo = "";
  ShowAlert("good!", "Menu added successfully", "success");
};

const uploadMenuSubApi = async () => {
  let response = await postMenuSubs(addMenuSubApi.value);
  catalogueMenuSubs.value.push(response);
  if (response != null) addMenuSubApi.value.name = "";
  addMenuSubApi.value.goTo = "";
  addMenuSubApi.value.idMenu = 0;
  ShowAlert("good!", "Menu sub added successfully", "success");
};

// modificar menu
const selectedMenu = ref({
  name: "",
  active: true,
  goTo: "",
});

const editSelectedMenu = (menu) => {
  idMenuReference.value = menu.id;
  selectedMenu.value = {
    name: menu.name,
    active: menu.active,
    goTo: menu.goTo,
  };
  showModals.value = true;
};

const updateMenu = async () => {
  // cargar datos actualizados sin actualizar la pagina
  let response = await getMenus();
  catalogueMenus.value = response;
};

const saveEditedMenu = async () => {
  let response = await putMenu(idMenuReference.value, selectedMenu.value);
  showModals.value = false;
  await updateMenu();
  ShowAlert("good!", "Menu updated successfully", "success");
};

// modificar sub menu
const selectedMenuSub = ref({
  idMenu: 0,
  name: "",
  active: true,
  maintenance: true,
  goTo: "",
  id: 0,
});

const editSelectedMenuSub = (menuSub) => {
  selectedMenuSub.value = {
    idMenu: menuSub.idMenu,
    name: menuSub.name,
    active: menuSub.active,
    maintenance: menuSub.maintenance,
    goTo: menuSub.goTo,
    id: menuSub.id,
  };
  showModal.value = true;
};

const updateMenuSubs = async () => {
  // cargar datos actualizados sin actualizar la pagina
  let response = await getMenuSubs();
  catalogueMenuSubs.value = response;
};

const saveEditedMenuSub = async () => {
  let response = await putMenuSubs(selectedMenuSub.value);
  showModal.value = false;
  await updateMenuSubs();
  ShowAlert("good!", "Menu sub updated successfully", "success");
};
</script>

<template lang="pug">
section
  .sys-Admin-Container
    .sys-Admin-Container-contenedor
      .sys-Admin-Container-contenedor-title
        h4 Item menus
      .sys-Admin-Container__elements
        .sys-Admin-Container__elements--element(
          v-for="catalogueMenu in catalogueMenus",
          :key="catalogueMenu.id"
        )
          .center-container 
            q-icon(name="summarize", size="25px")
            p.sys-Admin-Container__elements--element-item {{ catalogueMenu.name }}
          .sys-Admin-Container__elements--element-buttons
            q-btn.sys-Admin-Container__elements--element-buttons-button(
              @click="editSelectedMenu(catalogueMenu)"
            ) edit
            q-btn.sys-Admin-Container__elements--element-buttons-button Delet
        q-dialog.popup-container__dialog(v-model="showModals")
          q-card.popup-container__dialog--card
            q-card-section.popup-container__dialog--card-section
              q-form.popup-container__dialog--card-section-form(
                @submit.prevent="saveEditedMenu"
              )
                q-input.popup-container__dialog--card-section-form-input(
                  v-model="selectedMenu.name",
                  label="Name",
                  filled,
                  lazy-rules,
                  :rules="[(val) => (val && val.length > 0) || 'Please type Name']"
                )
                q-input.popup-container__dialog--card-section-form-input(
                  v-model="selectedMenu.goTo",
                  label="/goTo",
                  filled,
                  lazy-rules,
                  :rules="[(val) => (val && val.length > 0) || 'Please type rute']"
                ) 
                q-checkbox.popup-container__dialog--card-section-form-checkbox(
                  v-model="selectedMenu.active",
                  label="Active"
                ) 
                q-card-actions.popup-container__dialog--card-actions(
                  align="center"
                )
                  q-btn.popup-container__dialog--card-actions-botton(
                    label="Cancel",
                    @click="showModals = false"
                  )
                  q-btn.popup-container__dialog--card-actions-botton(
                    label="Save",
                    type="submit"
                  )
      .sys-Admin-Container__Add
        q-form.sys-Admin-Container__Add--form(
          @submit.prevent="uploadMenuApi()"
        )
          q-input.sys-Admin-Container__Add--form-input(
            type="text",
            label="name new menu",
            v-model="addMenuApi.name",
            filled,
            lazy-rules,
            :rules="[(val) => (val && val.length > 0) || 'Please type Name menu']"
          )
          q-input.sys-Admin-Container__Add--form-input(
            type="text",
            label="new route",
            v-model="addMenuApi.goTo",
            filled,
            lazy-rules,
            :rules="[(val) => (val && val.length > 0) || 'Please type route']"
          )
          q-btn.sys-Admin-Container__Add--form-button(
            type="submit",
            label="Add menu"
          ) 
    .sys-Admin-Container-contenedor
      .sys-Admin-Container-contenedor-title
        h4 Item sub menus
      .sys-Admin-Container__elements
        .sys-Admin-Container__elements--element(
          v-for="catalogueMenuSub in catalogueMenuSubs",
          :key="catalogueMenuSub.id"
        )
          .center-container 
            q-icon(name="widgets", size="25px")
            p.sys-Admin-Container__elements--element-item {{ catalogueMenuSub.name }}
          .sys-Admin-Container__elements--element-buttons
            q-btn.sys-Admin-Container__elements--element-buttons-button(
              @click="editSelectedMenuSub(catalogueMenuSub)"
            ) edit
            q-btn.sys-Admin-Container__elements--element-buttons-button Delet
        q-dialog.popup-container__dialog(v-model="showModal")
          q-card.popup-container__dialog--card
            q-card-section.popup-container__dialog--card-section
              q-form.popup-container__dialog--card-section-form(@submit.prevent="saveEditedMenuSub")
                q-input.popup-container__dialog--card-section-form-input(
                  v-model="selectedMenuSub.name",
                  label="Name"
                  filled,
                  lazy-rules,
                  :rules="[(val) => (val && val.length > 0) || 'Please type Name']"
                )
                q-input.popup-container__dialog--card-section-form-input(
                  v-model="selectedMenuSub.goTo",
                  label="goTo"
                  filled,
                  lazy-rules,
                  :rules="[(val) => (val && val.length > 0) || 'Please type route']"
                )
                select.popup-container__dialog--card-section-form-select(
                  v-model="selectedMenuSub.idMenu"
                )
                  option(:value="0", disabled) Select menu reference
                  option(
                    v-for="catalogueMenu in catalogueMenus",
                    :value="catalogueMenu.id",
                    :key="catalogueMenu.id"
                  ) {{ catalogueMenu.name }}
                q-checkbox.popup-container__dialog--card-section-form-checkbox(
                  v-model="selectedMenuSub.maintenance",
                  label="Maintenance"
                ) 
                q-checkbox.popup-container__dialog--card-section-form-checkbox(
                  v-model="selectedMenuSub.active",
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
        q-form.sys-Admin-Container__Add--form(@submit.prevent="uploadMenuSubApi()")
          q-input.sys-Admin-Container__Add--form-input(
            type="text",
            label="name new menuSub",
            v-model="addMenuSubApi.name"
            filled,
                lazy-rules,
                :rules="[(val) => (val && val.length > 0) || 'Please type Name menu sub']"
          )
          q-input.sys-Admin-Container__Add--form-input(
            type="text",
            label="new sub route",
            v-model="addMenuSubApi.goTo"
            filled,
                lazy-rules,
                :rules="[(val) => (val && val.length > 0) || 'Please type route']"
          )
          select.sys-Admin-Container__Add--form-select(
            v-model="addMenuSubApi.idMenu"
          )
            option(:value="0", disabled) Select menu reference
            option(
              v-for="catalogueMenu in catalogueMenus",
              :value="catalogueMenu.id",
              :key="catalogueMenu.id"
            ) {{ catalogueMenu.name }}
          q-btn.sys-Admin-Container__Add--form-button(
            type="submit",
            label="Add submenu"
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
</style>
