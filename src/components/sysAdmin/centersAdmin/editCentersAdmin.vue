<script setup>
import { onMounted, ref } from "vue";
import { useUserStore } from "src/stores/user";
import { catalogueCentersAdminApi } from "src/api/catalogue/CatalogueCentersAdmin";
import { alertService } from "src/libs/alert";

const {
  getCenter,
  postCenter,
  putCenter,
  getColors,
  getStates,
  getCenterTypes,
  postCenterTypes,
  putCenterTypes,
} = catalogueCentersAdminApi();
const { ShowAlert, ShowAlertConfirm } = alertService();

const useUser = useUserStore();
const showModalCenter = ref(false);
const showModalType = ref(false);
const idCenterType = ref(0);
let catalogueCenters = ref("");
let colors = ref("");
let states = ref("");
let catalogueCenterTypes = ref("");

onMounted(async () => {
  let responseCenters = await getCenter();
  catalogueCenters.value = responseCenters;

  let responseColors = await getColors();
  colors.value = responseColors;

  let responseStates = await getStates();
  states.value = responseStates;

  let responseCenterTypes = await getCenterTypes();
  catalogueCenterTypes.value = responseCenterTypes;

  // obteniendo datos de la store
  let responseIdUser = await useUser.getUser();
  addCenterApi.value.idUserCreate = responseIdUser.id;
  addCenterApi.value.idUserUpdate = responseIdUser.id;
});

//------ centros
const addCenterApi = ref({
  id: 0,
  idType: 0,
  idUserCreate: 0,
  idUserUpdate: 0,
  idColor: 0,
  idState: 0,
  name: "",
  address: "",
  postalCode: "",
  contactPhone: "",
  contactMovile: "",
  contactEmail: "",
  active: true,
  creationDate: new Date(),
  updateDate: new Date(),
  latitude: 6.21455556,
  longitude: -75.541,
  img: "centerDefatult.png",
});

// agregando
const uploadCenterApi = async () => {
  let response = await postCenter(addCenterApi.value);
  catalogueCenters.value.push(response);
  if (response != null) addCenterApi.value.name = "";
  addCenterApi.value.address = "";
  addCenterApi.value.postalCode = "";
  addCenterApi.value.contactPhone = "";
  addCenterApi.value.contactMovile = "";
  addCenterApi.value.contactEmail = "";
  addCenterApi.value.idState = "";
  addCenterApi.value.idColor = "";
  addCenterApi.value.idType = "";
  ShowAlert("good!", "Center added successfully", "success");
};

// modificar centro
const selectedCenter = ref({
  id: 0,
  idType: 0,
  idUserCreate: 0,
  idUserUpdate: 0,
  idColor: 0,
  idState: 0,
  name: "",
  address: "",
  postalCode: "",
  contactPhone: "",
  contactMovile: "",
  contactEmail: "",
  active: true,
  creationDate: "",
  updateDate: "",
  latitude: 0,
  longitude: 0,
  img: "",
});

// editar
const editSelectedCenter = (center) => {
  selectedCenter.value = {
    id: center.id,
    idType: center.idType,
    idUserCreate: center.idUserCreate,
    idUserUpdate: center.idUserUpdate,
    idColor: center.idColor,
    idState: center.idState,
    name: center.name,
    address: center.address,
    postalCode: center.postalCode,
    contactPhone: center.contactPhone,
    contactMovile: center.contactMovile,
    contactEmail: center.contactEmail,
    active: center.active,
    img: center.img,
    latitude: 0,
    longitude: 0,
    creationDate: center.creationDate,
    updateDate: center.updateDate,
  };
  showModalCenter.value = true;
};

const updateCenters = async () => {
  // cargar datos actualizados sin actualizar la pagina
  let response = await getCenter();
  catalogueCenters.value = response;
};

const saveEditedCenter = async () => {
  let response = await putCenter(selectedCenter.value);
  showModalCenter.value = false;
  await updateCenters();
  ShowAlert("good!", "Center updated successfully", "success");
};

// tipos de centro
const addCenterTypeApi = ref({
  name: "",
  active: true,
  public: true,
});

//  agregando
const uploadCenterTypeApi = async () => {
  let response = await postCenterTypes(addCenterTypeApi.value);
  catalogueCenterTypes.value.push(response);
  if (response != null) addCenterTypeApi.value.name = "";
  ShowAlert("good!", "Center type added successfully", "success");
};

// modificar tipo de centro
const selectedCenterType = ref({
  name: "",
  active: true,
  public: true,
});

const selectedId = (CenterTypeId) => {
  idCenterType.value = CenterTypeId.id;
};

const editSelectedCenterType = (centerType) => {
  selectedCenterType.value = {
    name: centerType.name,
    active: centerType.active,
    public: centerType.public,
  };
  showModalType.value = true;
};

const updateCenterType = async () => {
  // cargar datos actualizados sin actualizar la pagina
  let response = await getCenterTypes();
  catalogueCenterTypes.value = response;
};

const saveEditedCenterType = async () => {
  let response = await putCenterTypes(
    idCenterType.value,
    selectedCenterType.value
  );
  showModalType.value = false;
  await updateCenterType();
  ShowAlert("good!", "Center type updated successfully", "success");
};
</script>

<template lang="pug">
section
  .sys-Admin-Container
    .sys-Admin-Container-contenedor
      .sys-Admin-Container__elements
        .sys-Admin-Container__elements--element(
          v-for="catalogueCenter in catalogueCenters",
          :key="catalogueCenter.id"
        )
          .center-container
            img(src="resources/CenterIcon.svg")
            p.sys-Admin-Container__elements--element-item {{ catalogueCenter.name }}
          .sys-Admin-Container__elements--element-buttons
            q-btn.sys-Admin-Container__elements--element-buttons-button(
              @click="editSelectedCenter(catalogueCenter)"
            ) edit
            q-btn.sys-Admin-Container__elements--element-buttons-button Delete
        q-dialog.popup-container__dialog(v-model="showModalCenter")
          q-card.popup-container__dialog--card
            q-card-section.popup-container__dialog--card-section
              q-form.popup-container__dialog--card-section-form(@submit.prevent="saveEditedCenter")
                select.popup-container__dialog--card-section-form-select(
                  v-model="selectedCenter.idState"
                )
                  option(:value="0", disabled) Select a State
                  option(
                    v-for="state in states",
                    :value="state.id",
                    :key="state.id"
                  ) {{ state.name }}
                select.popup-container__dialog--card-section-form-select(
                  v-model="selectedCenter.idColor"
                )
                  option(:value="0", disabled) Select a Color
                  option(
                    v-for="color in colors",
                    :value="color.id",
                    :key="color.id"
                  ) {{ color.name }}
                select.popup-container__dialog--card-section-form-select(
                  v-model="selectedCenter.idType"
                )
                  option(:value="0", disabled) Select a CenterType
                  option(
                    v-for="centerType in catalogueCenterTypes",
                    :value="centerType.id",
                    :key="centerType.id"
                  ) {{ centerType.name }}
                q-input.popup-container__dialog--card-section-form-input(
                  v-model="selectedCenter.name",
                  label="Name",
                  filled,
                  lazy-rules,
                  :rules="[(val) => (val && val.length > 0) || 'Please type Name']"
                )
                q-input.popup-container__dialog--card-section-form-input(
                  v-model="selectedCenter.address",
                  label="Address",
                  filled,
                  lazy-rules,
                  :rules="[(val) => (val && val.length > 0) || 'Please type Address']"
                )
                q-input.popup-container__dialog--card-section-form-input(
                  v-model="selectedCenter.postalCode",
                  label="PostalCode",
                  filled,
                  lazy-rules,
                  :rules="[(val) => (val && val.length > 0) || 'Please type PostalCode']"
                )
                q-input.popup-container__dialog--card-section-form-input(
                  v-model="selectedCenter.contactPhone",
                  label="Contact phone",
                  filled,
                  lazy-rules,
                  :rules="[(val) => (val && val.length > 0) || 'Please type Contact phone']"
                )
                q-input.popup-container__dialog--card-section-form-input(
                  v-model="selectedCenter.contactMovile",
                  label="Contact movile",
                  filled,
                  lazy-rules,
                  :rules="[(val) => (val && val.length > 0) || 'Please type Contact movile']"
                )
                q-input.popup-container__dialog--card-section-form-input(
                  v-model="selectedCenter.contactEmail",
                  label="Contact email",
                  filled,
                  lazy-rules,
                  :rules="[(val) => (val && val.length > 0) || 'Please type Contact email']"
                )
                q-checkbox.popup-container__dialog--card-section-form-checkbox(
                  v-model="selectedCenter.active",
                  label="Active"
                )
                q-card-actions.popup-container__dialog--card-actions(
                align="center"
              )
                  q-btn.popup-container__dialog--card-actions-botton(
                  label="Cancel",
                  @click="showModalCenter = false"
                )
                  q-btn.popup-container__dialog--card-actions-botton(
                  label="Save",
                  type="submit"
                )
      .sys-Admin-Container__Add
        q-form.sys-Admin-Container__Add--form(@submit.prevent="uploadCenterApi()")
          select.sys-Admin-Container__Add--form-select(
            v-model="addCenterApi.idState"
          )
            option(:value="0", disabled) Select a State
            option(v-for="state in states", :value="state.id", :key="state.id") {{ state.name }}
          select.sys-Admin-Container__Add--form-select(
            v-model="addCenterApi.idColor"
          )
            option(:value="0", disabled) Select a Color
            option(v-for="color in colors", :value="color.id", :key="color.id") {{ color.name }}
          select.sys-Admin-Container__Add--form-select(
            v-model="addCenterApi.idType"
          )
            option(:value="0", disabled) Select a CenterType
            option(
              v-for="centerType in catalogueCenterTypes",
              :value="centerType.id",
              :key="centerType.id"
            ) {{ centerType.name }}
          q-input.sys-Admin-Container__Add--form-input(
            type="text",
            label="Name",
            v-model="addCenterApi.name"
            filled,
            lazy-rules,
            :rules="[(val) => (val && val.length > 0) || 'Please type Name']"
          )
          q-input.sys-Admin-Container__Add--form-input(
            type="text",
            label ="Address",
            v-model="addCenterApi.address"
            filled,
            lazy-rules,
            :rules="[(val) => (val && val.length > 0) || 'Please type Address']"
          )
          q-input.sys-Admin-Container__Add--form-input(
            type="text",
            label="Postal code",
            v-model="addCenterApi.postalCode"
            filled,
            lazy-rules,
            :rules="[(val) => (val && val.length > 0) || 'Please type Postal code']"
          )
          q-input.sys-Admin-Container__Add--form-input(
            type="text",
            label="Contact phone",
            v-model="addCenterApi.contactPhone"
            filled,
            lazy-rules,
            :rules="[(val) => (val && val.length > 0) || 'Please type Contact phone']"
          )
          q-input.sys-Admin-Container__Add--form-input(
            type="text",
            label="Contact movile",
            v-model="addCenterApi.contactMovile"
            filled,
            lazy-rules,
            :rules="[(val) => (val && val.length > 0) || 'Please type Contact movile']"
          )
          q-input.sys-Admin-Container__Add--form-input(
            type="text",
            label="Contact email",
            v-model="addCenterApi.contactEmail"
            filled,
            lazy-rules,
            :rules="[(val) => (val && val.length > 0) || 'Please type Contact email']"
          )
          q-btn.sys-Admin-Container__Add--form-button(
            type="submit",
            label="Add center"
          )
    .sys-Admin-Container-contenedor
      h5 Types
      .sys-Admin-Container__elements
        .sys-Admin-Container__elements--element(
          v-for="catalogueCenterType in catalogueCenterTypes",
          :key="catalogueCenterType.id"
        )
          .center-container
            img(src="resources/CenterIcon.svg")
            p.sys-Admin-Container__elements--element-item {{ catalogueCenterType.name }}
          .sys-Admin-Container__elements--element-buttons
            q-btn.sys-Admin-Container__elements--element-buttons-button(
              @click="editSelectedCenterType(catalogueCenterType); selectedId(catalogueCenterType)"
            ) edit
            q-btn.sys-Admin-Container__elements--element-buttons-button Delete
        q-dialog.popup-container__dialog(v-model="showModalType")
          q-card.popup-container__dialog--card
            q-card-section.popup-container__dialog--card-section
              q-form.popup-container__dialog--card-section-form(@submit.prevent="saveEditedCenterType")
                q-input.popup-container__dialog--card-section-form-input(
                  v-model="selectedCenterType.name",
                  label="Name"
                  filled,
                  lazy-rules,
                  :rules="[(val) => (val && val.length > 0) || 'Please type Name']"
                )

                q-checkbox.popup-container__dialog--card-section-form-checkbox(
                  v-model="selectedCenterType.public",
                  label="Public"
                )
                q-checkbox.popup-container__dialog--card-section-form-checkbox(
                  v-model="selectedCenterType.active",
                  label="Active"
                )
                q-card-actions.popup-container__dialog--card-actions(
                align="center"
              )
                  q-btn.popup-container__dialog--card-actions-botton(
                  label="Cancel",
                  @click="showModalType = false"
                )
                  q-btn.popup-container__dialog--card-actions-botton(
                  label="Save",
                  type="submit"
                )
      .sys-Admin-Container__Add
        q-form.sys-Admin-Container__Add--form(@submit="uploadCenterTypeApi()")
          q-input.sys-Admin-Container__Add--form-input(
            type="text",
            label="Name",
            v-model="addCenterTypeApi.name"
            filled,
            lazy-rules,
            :rules="[(val) => (val && val.length > 0) || 'Please type Name']"
          )
          q-btn.sys-Admin-Container__Add--form-button(
            type="submit",
            label="Add type"
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
