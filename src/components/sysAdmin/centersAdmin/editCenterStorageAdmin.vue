<script setup>
import { onMounted, ref } from "vue";
import { useUserStore } from "src/stores/user";
import { centerAdminApi } from "src/api/center/CenterAdmin";
import { alertService } from "src/libs/alert";
import { catalogueColorsAdminApi } from "src/api/catalogue/CatalogueColorsAdmin";
import { catalogueCentersAdminApi } from "src/api/catalogue/CatalogueCentersAdmin";
const {
  getALLCentersStorage,
  postCenterStorages,
  getALLCenters,
  putCenterStorages,
} = centerAdminApi();
const { ShowAlert } = alertService();
const { getColors } = catalogueColorsAdminApi();
const { getStates } = catalogueCentersAdminApi();

onMounted(async () => {
  // obteniendo datos de la store
  const responseUserStore = await useUser.getUser();

  let response = await getALLCentersStorage();
  centersStorageApi.value = response;

  let responseCenters = await getALLCenters();
  centersApi.value = responseCenters;

  let responseColors = await getColors();
  colorsApi.value = responseColors;

  let responseStates = await getStates();
  statesApi.value = responseStates;

  addCenterStorageApi.value.idUserCreate = responseUserStore.id;
  addCenterStorageApi.value.idUserUpdate = responseUserStore.id;
});

const useUser = useUserStore();
const showModal = ref(false);
let centersStorageApi = ref([]);
let centersApi = ref([]);
let colorsApi = ref([]);
let statesApi = ref([]);

const addCenterStorageApi = ref({
  id: 0,
  idCenter: 0,
  idColor: 0,
  idState: 0,
  idUserCreate: 0,
  idUserUpdate: 0,
  name: "",
  address: "",
  contactPhone: "",
  contactMovile: "",
  contactEmail: "",
  active: true,
  creationDate: new Date(),
  updateDate: new Date(),
  img: "productDefault.png",
});

// agregando
const uploadCenterStorageApi = async () => {
  let response = await postCenterStorages(addCenterStorageApi.value);
  centersStorageApi.value.push(response);
  if (response != null)
    ShowAlert("good!", "Product added successfully", "success");
};

// modificar centro
const selectedCenterStorage = ref({
  id: 0,
  idCenter: 0,
  idColor: 0,
  idState: 0,
  idUserCreate: 0,
  idUserUpdate: 0,
  name: "",
  address: "",
  contactPhone: "",
  contactMovile: "",
  contactEmail: "",
  active: true,
  creationDate: "",
  updateDate: new Date(),
  img: "",
});

// editar
const editSelectedCenterStorage = (storage) => {
  selectedCenterStorage.value = {
    id: storage.id,
    idCenter: storage.idCenter,
    idColor: storage.idColor,
    idState: storage.idState,
    idUserCreate: storage.idUserCreate,
    idUserUpdate: storage.idUserUpdate,
    name: storage.name,
    address: storage.address,
    contactPhone: storage.contactPhone,
    contactMovile: storage.contactMovile,
    contactEmail: storage.contactEmail,
    active: storage.active,
    creationDate: storage.creationDate,
    updateDate: new Date(),
    img: storage.img,
  };
  showModal.value = true;
};

const updateCenterStorage = async () => {
  // cargar datos actualizados sin actualizar la pagina
  let response = await getALLCentersStorage();
  centersStorageApi.value = response;
};

const saveEditedCenterStorage = async () => {
  let response = await putCenterStorages(selectedCenterStorage.value);
  showModal.value = false;
  await updateCenterStorage();
  ShowAlert("good!", "storage updated successfully", "success");
};
</script>

<template lang="pug">
section
  .sys-Admin-Container
    .sys-Admin-Container-contenedor
      .sys-Admin-Container-contenedor-title
      .sys-Admin-Container__elements
        .sys-Admin-Container__elements--element(
          v-for="centerStorage in centersStorageApi",
          :key="centerStorage.id"
        )
          p.sys-Admin-Container__elements--element-item {{ centerStorage.name }}
          .sys-Admin-Container__elements--element-buttons
            q-btn.sys-Admin-Container__elements--element-buttons-button(
              @click="editSelectedCenterStorage(centerStorage)"
            ) edit
            q-btn.sys-Admin-Container__elements--element-buttons-button Delet
        q-dialog.popup-container__dialog(v-model="showModal")
          q-card.popup-container__dialog--card
            q-card-section.popup-container__dialog--card-section
              q-form.popup-container__dialog--card-section-form(@submit.prevent="saveEditedCenterStorage")
                select.popup-container__dialog--card-section-form-select(
                  v-model="selectedCenterStorage.idCenter"
                )
                  option(:value="0", disabled) Select a center
                  option(
                    v-for="center in centersApi",
                    :value="center.id",
                    :key="center.id"
                  ) {{ center.name }} 
                select.popup-container__dialog--card-section-form-select(
                  v-model="selectedCenterStorage.idColor"
                )
                  option(:value="0", disabled) Select a color
                  option(
                    v-for="color in colorsApi",
                    :value="color.id",
                    :key="color.id"
                  ) {{ color.name }}
                select.popup-container__dialog--card-section-form-select(
                  v-model="selectedCenterStorage.idState"
                )
                  option(:value="0", disabled) Select a State
                  option(
                    v-for="state in statesApi",
                    :value="state.id",
                    :key="state.id"
                  ) {{ state.name }}
                q-input.popup-container__dialog--card-section-form-input(
                  v-model="selectedCenterStorage.name",
                  label="Name",
                  filled,
                  lazy-rules,
                  :rules="[(val) => (val && val.length > 0) || 'Please type Name']"
                )
                q-input.popup-container__dialog--card-section-form-input(
                  v-model="selectedCenterStorage.address",
                  label="Address",
                  filled,
                lazy-rules,
                :rules="[(val) => (val && val.length > 0) || 'Please type Address']"
                )
                q-input.popup-container__dialog--card-section-form-input(
                  v-model="selectedCenterStorage.contactPhone",
                  label="Contact phone"
                  filled,
                lazy-rules,
                :rules="[(val) => (val && val.length > 0) || 'Please type Contact phone']"
                )
                q-input.popup-container__dialog--card-section-form-input(
                  v-model="selectedCenterStorage.contactMovile",
                  label="Contact movile",
                  filled,
                  lazy-rules,
                  :rules="[(val) => (val && val.length > 0) || 'Please type Contact movile']"
                )
                q-input.popup-container__dialog--card-section-form-input(
                  v-model="selectedCenterStorage.contactEmail",
                  label="Contact email",
                  filled,
                lazy-rules,
                :rules="[(val) => (val && val.length > 0) || 'Please type Contact email']"
                )
                q-checkbox.popup-container__dialog--card-section-form-checkbox(
                  v-model="selectedCenterStorage.active",
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
        q-form.sys-Admin-Container__Add--form(@submit.prevent="uploadCenterStorageApi()")
          select.sys-Admin-Container__Add--form-select(
            v-model="addCenterStorageApi.idCenter"
          )
            option(:value="0", disabled) Select a center
            option(
              v-for="center in centersApi",
              :value="center.id",
              :key="center.id"
            ) {{ center.name }}
          select.sys-Admin-Container__Add--form-select(
            v-model="addCenterStorageApi.idColor"
          )
            option(:value="0", disabled) Select a color
            option(
              v-for="color in colorsApi",
              :value="color.id",
              :key="color.id"
            ) {{ color.name }}
          select.sys-Admin-Container__Add--form-select(
            v-model="addCenterStorageApi.idState"
          )
            option(:value="0", disabled) Select a state
            option(
              v-for="state in statesApi",
              :value="state.id",
              :key="state.id"
            ) {{ state.name }}
          q-input.sys-Admin-Container__Add--form-input(
            type="text",
            label="Name",
            v-model="addCenterStorageApi.name"
            filled,
          lazy-rules,
          :rules="[(val) => (val && val.length > 0) || 'Please type Name']"
          )
          q-input.sys-Admin-Container__Add--form-input(
            type="text",
            label="Address",
            v-model="addCenterStorageApi.address"
            filled,
          lazy-rules,
          :rules="[(val) => (val && val.length > 0) || 'Please type Address']"
          )
          q-input.sys-Admin-Container__Add--form-input(
            type="text",
            label="Contact phone",
            v-model="addCenterStorageApi.contactPhone"
            filled,
          lazy-rules,
          :rules="[(val) => (val && val.length > 0) || 'Please type Contact phone']"
          )
          q-input.sys-Admin-Container__Add--form-input(
            type="text",
            label="Contact movile",
            v-model="addCenterStorageApi.contactMovile"
            filled,
          lazy-rules,
          :rules="[(val) => (val && val.length > 0) || 'Please type Contact movile']"
          )
          q-input.sys-Admin-Container__Add--form-input(
            type="text",
            label="Contact email",
            v-model="addCenterStorageApi.contactEmail"
            filled,
          lazy-rules,
          :rules="[(val) => (val && val.length > 0) || 'Please type Contact email']"
          )
          q-btn.sys-Admin-Container__Add--form-button(
            type="submit",
            label="Add center Storage"
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

.sys-Admin-Container__Add--form-image {
  width: 100px;
  height: 100px;
}
</style>