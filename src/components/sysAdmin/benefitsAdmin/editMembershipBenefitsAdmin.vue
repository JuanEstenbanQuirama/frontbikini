<script setup>
import { onMounted, ref } from "vue";
import { alertService } from "src/libs/alert";
import { membershipBenefitsAdminApi } from "src/api/membershipBenefits/MembershipBenefitsAdmin";
import { catalogueBenefitsAdminApi } from "src/api/catalogue/CatalogueBenefitsAdmin";

const {
  getMembershipBenefits,
  postMembershipBenefits,
  putMembershipBenefits,
  getMemberships,
} = membershipBenefitsAdminApi();
const { getBenefits } = catalogueBenefitsAdminApi();
const { ShowAlert, ShowAlertConfirm } = alertService();

const pruebaxd = ref(0);

onMounted(async () => {
  let response = await getMembershipBenefits();
  membershipBenefitsApi.value = response;

  let responseBenefits = await getBenefits();
  benefitsApi.value = responseBenefits;

  let responseMemberships = await getMemberships();
  membershipsApi.value = responseMemberships;
});

let membershipsApi = ref([]);
let membershipBenefitsApi = ref([]);
let benefitsApi = ref([]);

const showModal = ref(false);

const addMembershipBenefitApi = ref({
  idMembership: 0,
  idBebefit: 0,
});

// agregando
const uploadMembershipBenefitApi = async () => {
  let response = await postMembershipBenefits(addMembershipBenefitApi.value);
  membershipBenefitsApi.value.push(response);
  if (response != null)
    ShowAlert("good!", "Benefit added successfully", "success");
};

const selectedMembershipBenefit = ref({
  idMembership: 0,
  idBebefit: 0,
});

// editar
const editSelectedMembershipBenefit = (membershipBenefit) => {
  selectedMembershipBenefit.value = {
    idMembership: membershipBenefit.idMembership,
    idBebefit: membershipBenefit.idBebefit,
  };
  showModal.value = true;
};

const updateMembershipBenefit = async () => {
  // cargar datos actualizados sin actualizar la pagina
  let response = await getMembershipBenefits();
  membershipBenefitsApi.value = response;
};

// actualizar --este metodo ahora elimina el beneficio no lo deja actualizar
const saveEditedMembershipBenefit = async () => {
  let response = await putMembershipBenefits(selectedMembershipBenefit.value);
  showModal.value = false;
  await updateMembershipBenefit();
  ShowAlert("good!", "Membership Benefit remove successfully", "success");
};
</script>

<template lang="pug">
section
  .sys-Admin-Container
    .sys-Admin-Container__elements
      .sys-Admin-Container__elements--element(
        v-for="membershipBenefit in membershipBenefitsApi",
        :key="membershipBenefit.id"
      )
        .center-container 
          q-icon(name="verified", size="25px")
          p.sys-Admin-Container__elements--element-item {{ membershipBenefit.benefit }}
        P {{ membershipBenefit.product }}
        .sys-Admin-Container__elements--element-buttons
          q-btn.sys-Admin-Container__elements--element-buttons-button(
            @click="editSelectedMembershipBenefit(membershipBenefit)"
          ) edit
          q-btn.sys-Admin-Container__elements--element-buttons-button Delet
      q-dialog.popup-container__dialog(v-model="showModal")
        q-card.popup-container__dialog--card
          q-card-section.popup-container__dialog--card-section
            q-form.popup-container__dialog--card-section-form(
              @submit.prevent="saveEditedMembershipBenefit"
            )
              select.popup-container__dialog--card-section-form-select(
                v-model="selectedMembershipBenefit.idBebefit",
              )
                option(:value="0", disabled)
                option(
                  v-for="benefit in benefitsApi",
                  :value="benefit.id",
                  :key="benefit.id"
                ) {{ benefit.name }}
              select.popup-container__dialog--card-section-form-select(
                v-model="selectedMembershipBenefit.idMembership"
              )
                option(:value="0", disabled) Select a Membership
                option(
                  v-for="membership in membershipsApi",
                  :value="membership.id",
                  :key="membership.id"
                ) {{ membership.name }}
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
      q-form.sys-Admin-Container__Add--form(@submit.prevent="uploadMembershipBenefitApi()")
        select.sys-Admin-Container__Add--form-select(
          v-model="addMembershipBenefitApi.idBebefit"
        )
          option(:value="0", disabled) Select a Benefit
          option(
            v-for="benefit in benefitsApi",
            :value="benefit.id",
            :key="benefit.id"
          ) {{ benefit.name }}
        select.sys-Admin-Container__Add--form-select(
          v-model="addMembershipBenefitApi.idMembership"
        )
          option(:value="0", disabled) Select a Membership
          option(
            v-for="membership in membershipsApi",
            :value="membership.id",
            :key="membership.id"
          ) {{ membership.name }}
        q-btn.sys-Admin-Container__Add--form-button(
          type="submit",
          label="Add benefit"
        ) 
</template>