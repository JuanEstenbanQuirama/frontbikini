<script setup>
import { onMounted, ref } from "vue";
import { cataloguePartnerTypesAdminApi } from "src/api/catalogue/CataloguePartnerTypesAdmin";
import { alertService } from "src/libs/alert";

const {
  getPartnerTypes,
  postPartnerTypes,
  putPartnerTypes,
  getPartners,
  putPartners,
  postPartners,
} = cataloguePartnerTypesAdminApi();
const { ShowAlert, ShowAlertConfirm } = alertService();

onMounted(async () => {
  let responsePartnerTypes = await getPartnerTypes();
  cataloguePartnerTypes.value = responsePartnerTypes;

  let responsePartners = await getPartners();
  cataloguePartners.value = responsePartners;
});

let cataloguePartners = ref([]);
let cataloguePartnerTypes = ref([]);
const showModal = ref(false);
const showModalPartner = ref(false);
let idPartnerType = ref(0);
let idPartner = ref(0);

const addPartnerTypeApi = ref({
  name: "",
  active: true,
});

// agregando
const uploadPartnerTypeApi = async () => {
  let response = await postPartnerTypes(addPartnerTypeApi.value);
  cataloguePartnerTypes.value.push(response);
  if (response != null) addPartnerTypeApi.value.name = "";
  ShowAlert("good!", "Partner type added successfully", "success");
};

// modificar
const selectedPartnerType = ref({
  name: "",
  active: true,
});

// editar
const editSelectedPartnerType = (PartnerType) => {
  idPartnerType.value = PartnerType.id;
  selectedPartnerType.value = {
    name: PartnerType.name,
    active: PartnerType.active,
  };
  showModal.value = true;
};

const updatePartnerType = async () => {
  // cargar datos actualizados sin actualizar la pagina
  let response = await getPartnerTypes();
  cataloguePartnerTypes.value = response;
};

// actualizar
const saveEditedPartnerType = async () => {
  let response = await putPartnerTypes(
    idPartnerType.value,
    selectedPartnerType.value
  );
  showModal.value = false;
  await updatePartnerType();
  ShowAlert("good!", "Partner type updated successfully", "success");
};

// tipos de partners
const addPartnerApi = ref({
  idType: 0,
  name: "",
  phone: "",
  mail: "",
  active: true,
});

//  agregando
const uploadPartnerApi = async () => {
  let response = await postPartners(addPartnerApi.value);
  cataloguePartners.value.push(response);
  if (response != null) addPartnerApi.value.name = "";
  addPartnerApi.value.mail = "";
  addPartnerApi.value.phone = "";
  addPartnerApi.value.idType = 0;
  ShowAlert("good!", "Partner added successfully", "success");
};

// modificar tipo de centro
const selectedPartner = ref({
  idType: 0,
  name: "",
  phone: "",
  mail: "",
  active: true,
});

const editSelectedPartner = (partner) => {
  idPartner.value = partner.id;
  selectedPartner.value = {
    idType: partner.idType,
    name: partner.name,
    phone: partner.phone,
    mail: partner.mail,
    active: partner.active,
  };
  showModalPartner.value = true;
};

const updatePartner = async () => {
  // cargar datos actualizados sin actualizar la pagina
  let response = await getPartners();
  cataloguePartners.value = response;
};

const saveEditedPartner = async () => {
  let response = await putPartners(idPartner.value, selectedPartner.value);
  showModalPartner.value = false;
  await updatePartner();
  ShowAlert("good!", "Partner updated successfully", "success");
};
</script>

<template lang="pug">
section
  .sys-Admin-Container
    .sys-Admin-Container-contenedor
      .sys-Admin-Container-contenedor-title
        H4 Partners Type
      .sys-Admin-Container__elements
        .sys-Admin-Container__elements--element(
          v-for="cataloguePartnerType in cataloguePartnerTypes",
          :key="cataloguePartnerType.id"
        )
          .center-container 
            q-icon(name="handshake", size="25px")
            p.sys-Admin-Container__elements--element-item {{ cataloguePartnerType.name }}
          .sys-Admin-Container__elements--element-buttons
            q-btn.sys-Admin-Container__elements--element-buttons-button(
              @click="editSelectedPartnerType(cataloguePartnerType)"
            ) edit
            q-btn.sys-Admin-Container__elements--element-buttons-button Delet
        q-dialog.popup-container__dialog(v-model="showModal")
          q-card.popup-container__dialog--card
            q-card-section.popup-container__dialog--card-section
              q-form.popup-container__dialog--card-section-form(
                @submit.prevent="saveEditedPartnerType"
              )
                q-input.popup-container__dialog--card-section-form-input(
                  v-model="selectedPartnerType.name",
                  label="Name",
                  filled,
                  lazy-rules,
                  :rules="[(val) => (val && val.length > 0) || 'Please type Name']"
                )
                q-checkbox.popup-container__dialog--card-section-form-checkbox(
                  v-model="selectedPartnerType.active",
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
          @submit.prevent="uploadPartnerTypeApi()"
        )
          q-input.sys-Admin-Container__Add--form-input(
            type="text",
            label="Name",
            v-model="addPartnerTypeApi.name",
            filled,
            lazy-rules,
            :rules="[(val) => (val && val.length > 0) || 'Please type Name']"
          )
          q-btn.sys-Admin-Container__Add--form-button(
            type="submit",
            label="Add Partner Type"
          ) 
    .sys-Admin-Container-contenedor
      .sys-Admin-Container-contenedor-title
        H4 Partners
      .sys-Admin-Container__elements
        .sys-Admin-Container__elements--element(
          v-for="cataloguePartner in cataloguePartners",
          :key="cataloguePartner.id"
        )
          .center-container 
            q-icon(name="handshake", size="25px")
            p.sys-Admin-Container__elements--element-item {{ cataloguePartner.name }}
          .sys-Admin-Container__elements--element-buttons
            q-btn.sys-Admin-Container__elements--element-buttons-button(
              @click="editSelectedPartner(cataloguePartner)"
            ) edit
            q-btn.sys-Admin-Container__elements--element-buttons-button Delet
        q-dialog.popup-container__dialog(v-model="showModalPartner")
          q-card.popup-container__dialog--card
            q-card-section.popup-container__dialog--card-section
              q-form.popup-container__dialog--card-section-form(
                @submit.prevent="saveEditedPartner"
              )
                q-input.popup-container__dialog--card-section-form-input(
                  v-model="selectedPartner.name",
                  label="Name",
                  filled,
                  lazy-rules,
                  :rules="[(val) => (val && val.length > 0) || 'Please type Name']"
                )
                q-input.popup-container__dialog--card-section-form-input(
                  v-model="selectedPartner.mail",
                  label="Email",
                  filled,
                  lazy-rules,
                  :rules="[(val) => (val && val.length > 0) || 'Please type Emial']"
                )
                q-input.popup-container__dialog--card-section-form-input(
                  v-model="selectedPartner.phone",
                  label="Phone",
                  filled,
                  lazy-rules,
                  :rules="[(val) => (val && val.length > 0) || 'Please type Phone']"
                )
                select.popup-container__dialog--card-section-form-select(
                  v-model="selectedPartner.idType"
                )
                  option(:value="0", disabled) Select a type
                  option(
                    v-for="cataloguePartnerType in cataloguePartnerTypes",
                    :value="cataloguePartnerType.id",
                    :key="cataloguePartnerType.id"
                  ) {{ cataloguePartnerType.name }}
                q-checkbox.popup-container__dialog--card-section-form-checkbox(
                  v-model="selectedPartner.active",
                  label="Active"
                ) 
                q-card-actions.popup-container__dialog--card-actions(
                  align="center"
                )
                  q-btn.popup-container__dialog--card-actions-botton(
                    label="Cancel",
                    @click="showModalPartner = false"
                  )
                  q-btn.popup-container__dialog--card-actions-botton(
                    label="Save",
                    type="submit"
                  )
      .sys-Admin-Container__Add
        q-form.sys-Admin-Container__Add--form(
          @submit.prevent="uploadPartnerApi()"
        )
          q-input.sys-Admin-Container__Add--form-input(
            type="text",
            label="name ",
            v-model="addPartnerApi.name",
            filled,
            lazy-rules,
            :rules="[(val) => (val && val.length > 0) || 'Please type Name']"
          )
          q-input.sys-Admin-Container__Add--form-input(
            type="text",
            label="Email ",
            v-model="addPartnerApi.mail",
            filled,
            lazy-rules,
            :rules="[(val) => (val && val.length > 0) || 'Please type Email']"
          )
          q-input.sys-Admin-Container__Add--form-input(
            type="text",
            label="Phone ",
            v-model="addPartnerApi.phone",
            filled,
            lazy-rules,
            :rules="[(val) => (val && val.length > 0) || 'Please type Phone']"
          )
          select.sys-Admin-Container__Add--form-select(
            v-model="addPartnerApi.idType"
          )
            option(:value="0", disabled) Select a type
            option(
              v-for="cataloguePartnerType in cataloguePartnerTypes",
              :value="cataloguePartnerType.id",
              :key="cataloguePartnerType.id"
            ) {{ cataloguePartnerType.name }}
          q-btn.sys-Admin-Container__Add--form-button(
            type="submit",
            label="Add partner"
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