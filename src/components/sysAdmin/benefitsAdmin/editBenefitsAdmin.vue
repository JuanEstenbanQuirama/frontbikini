<script setup>
import { onMounted, ref } from "vue";
import { catalogueBenefitsAdminApi } from "src/api/catalogue/CatalogueBenefitsAdmin";
import { alertService } from "src/libs/alert";

const { getBenefits, postBenefits, putBenefits } = catalogueBenefitsAdminApi();
const { ShowAlert, ShowAlertConfirm } = alertService();

onMounted(async () => {
  let responseBenefits = await getBenefits();
  catalogueBenefits.value = responseBenefits;
});

let catalogueBenefits = ref("");
const showModal = ref(false);
let idBenefit = ref(0);

const addBenefitsApi = ref({
  name: "",
  active: true,
  img: "default",
  description: "",
});
// agregando
const uploadBenefitApi = async () => {
  let response = await postBenefits(addBenefitsApi.value);
  catalogueBenefits.value.push(response)
  if(response != null) 
  addBenefitsApi.value.name = ""
  addBenefitsApi.value.description = ""
  ShowAlert("good!", "Benefit added successfully", "success");
};

// modificar genero
const selectedBenefit = ref({
  name: "",
  active: true,
  img: "",
  description: "",
});


// editar
const editSelectedBenefit = (benefit) => {
  idBenefit.value = benefit.id
  selectedBenefit.value = {
    name: benefit.name,
    active: benefit.active,
    img: benefit.img,
    description: benefit.description,
  };
  showModal.value = true;
};

const updateBenefit = async () => { // cargar datos actualizados sin actualizar la pagina
  let response = await getBenefits();
  catalogueBenefits.value = response;
};
// actualizar
const saveEditedBenefit = async () => {
  let response = await putBenefits(idBenefit.value, selectedBenefit.value);
  showModal.value = false;
  await updateBenefit();
  ShowAlert("good!", "Benefit updated successfully", "success");
};
</script>

<template lang="pug">
section
  .sys-Admin-Container
    .sys-Admin-Container__elements
      .sys-Admin-Container__elements--element(
        v-for="catalogueBenefit in catalogueBenefits",
        :key="catalogueBenefit.id"
      )
        .center-container 
          q-icon(name="done", size="25px")
          p.sys-Admin-Container__elements--element-item {{ catalogueBenefit.name }}
        .sys-Admin-Container__elements--element-buttons
          q-btn.sys-Admin-Container__elements--element-buttons-button(
            @click="editSelectedBenefit(catalogueBenefit)"
          ) edit
          q-btn.sys-Admin-Container__elements--element-buttons-button Delet
      q-dialog.popup-container__dialog(v-model="showModal")
        q-card.popup-container__dialog--card
          q-card-section.popup-container__dialog--card-section
            q-form.popup-container__dialog--card-section-form(@submit.prevent="saveEditedBenefit")
              q-input.popup-container__dialog--card-section-form-input(
                v-model="selectedBenefit.name",
                label="Name"
                filled,
                lazy-rules,
                :rules="[(val) => (val && val.length > 0) || 'Please type Name']"
              )
              q-input.popup-container__dialog--card-section-form-input(
                v-model="selectedBenefit.description",
                label="Description"
                filled,
                lazy-rules,
                :rules="[(val) => (val && val.length > 0) || 'Please type Description']"
              )
              q-checkbox.popup-container__dialog--card-section-form-checkbox(
                v-model="selectedBenefit.active",
                label="Active"
              ) 
              q-card-actions.popup-container__dialog--card-actions(align="center")
                q-btn.popup-container__dialog--card-actions-botton(
                label="Cancel",
                @click="showModal = false"
              )
                q-btn.popup-container__dialog--card-actions-botton(
                label="Save",
                type="submit"                              
              )
    .sys-Admin-Container__Add
      q-form.sys-Admin-Container__Add--form(@submit.prevent="uploadBenefitApi()")
        q-input.sys-Admin-Container__Add--form-input(
          type="text",
          label="Name",
          v-model="addBenefitsApi.name"
          filled,
          lazy-rules,
          :rules="[(val) => (val && val.length > 0) || 'Please type Name']"
        )
        q-input.sys-Admin-Container__Add--form-input(
          type="text",
          label="Description",
          v-model="addBenefitsApi.description"
          filled,
          lazy-rules,
          :rules="[(val) => (val && val.length > 0) || 'Please type Description']"
        )
        q-btn.sys-Admin-Container__Add--form-button(
          type="submit",
          label="Add Benefit"
        ) 
</template>
<style lang="scss">
// .q-field__label.no-pointer-events.absolute.ellipsis {
//   color: #848484;
// }
// .q-field__native.q-placeholder {
//   color: white;
// }
  
</style>
