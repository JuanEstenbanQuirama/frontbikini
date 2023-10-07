<script setup>
import { ref, onMounted } from "vue";
import { usersAdminApi } from "../../../api/user/UsersEditAdmin";
import { useUserStore } from "src/stores/user";
import {catalogueCentersAdminApi} from "src/api/catalogue/CatalogueCentersAdmin"
import {getCatalogueUserApi} from "src/api/catalogue/CatalogueUser"
import { alertService } from "src/libs/alert";

const {getCenter} = catalogueCentersAdminApi()
const { getUsers, putUsers } = usersAdminApi();
const {getPronouns, getProfiles,} = getCatalogueUserApi()
const { ShowAlert, ShowAlertConfirm } = alertService();

const allUsers = ref([]);
const showModal = ref(false);
const useUser = useUserStore();
let catalogueCenters = ref([]);
let profiles = ref([]);
let pronouns = ref([]);

onMounted(async () => {
  let responseUsers = await getUsers();
  allUsers.value = responseUsers;

  // obteniendo datos de la store
  let responseIdUser = await useUser.getUser();
  selectedUser.value.idUserCreate = responseIdUser.id;
  selectedUser.value.idUserUpdate = responseIdUser.id;

  let responseCenters = await getCenter(); // editar user
  catalogueCenters.value = responseCenters;

  let responsePronouns = await getPronouns(); // obtener los pronombres
  pronouns.value = responsePronouns;

  let responseProfiles = await getProfiles();
  profiles.value = responseProfiles;
});

// modificar
const selectedUser = ref({
  id:0,
  idProfile: 0,
  idPronoun: 0,
  idCenter: 0,
  idGender:0,
  idUserCreate: 0,
  idUserUpdate: 0,
  idMembership: 1,
  userName: "",
  password: "",
  name: "",
  lastName: "",
  address: "",
  phone: "",
  movile: "",
  email: "",
  active: "",
  lastIp: "",
  isOn: true,
  latitude: 0,
  longitude: 0,
  nameToShow: "",
  profileImg: "",
  createDate: ""
});

// editar
const editSelectedUser = (user) => {
  selectedUser.value = {
    id: user.id,
    idProfile: user.idProfile,
    idPronoun: user.idPronoun,
    idCenter: user.idCenter,
    idGender: user.idGender,
    idUserCreate: user.idUserCreate,
    idUserUpdate: user.idUserUpdate,
    idMembership: user.idMembership,
    userName: user.userName,
    password: user.password,
    name: user.name,
    lastName: user.lastName,
    address: user.address,
    phone: user.phone,
    movile: user.movile,
    email: user.email,
    active: user.active,
    lastIp: user.lastIp,
    isOn: true,
    latitude: user.latitude,
    longitude: user.longitude,
    nameToShow: user.nameToShow,
    profileImg: user.profileImg,
    createDate: user.createDate
  };
  showModal.value = true;
};

const updateUser = async () => { // cargar datos actualizados sin actualizar la pagina
  let response = await getUsers();
  allUsers.value = response;
};

// actualizar
const saveEditedUser = async () => {
  let response = await putUsers(selectedUser.value);
  showModal.value = false;
  await updateUser();
  ShowAlert("good!", "User updated successfully", "success");
};
</script>

<template  lang="pug">
.edit-user-admin
  .edit-user-admin__container
    table.edit-user-admin__container--table
      thead.edit-user-admin__container--table-thead
        tr.edit-user-admin__container--table-thead-tr
          th.edit-user-admin__container--table-thead-tr-th
          th.edit-user-admin__container--table-thead-tr-th User name
          th.edit-user-admin__container--table-thead-tr-th Name
          th.edit-user-admin__container--table-thead-tr-th ID
          th.edit-user-admin__container--table-thead-tr-th Id Center
          th.edit-user-admin__container--table-thead-tr-th User type
          th.edit-user-admin__container--table-thead-tr-th Membership
          th.edit-user-admin__container--table-thead-tr-th Email
          th.edit-user-admin__container--table-thead-tr-th Active
          th.edit-user-admin__container--table-thead-tr-th Edit
          th.edit-user-admin__container--table-thead-tr-th Delet
      tbody.edit-user-admin__container--table-tbody
        tr.edit-user-admin__container--table-tbody-tr(
          v-for="user in allUsers",
          :key="user.id"
        )
          td.edit-user-admin__container--table-tbody-tr-td
            .edit-user-admin__container--table-tbody-tr-td-img
              img(:src="'resources/' + user.profileImg")
          td.edit-user-admin__container--table-tbody-tr-td
            p {{ user.userName }}
          td.edit-user-admin__container--table-tbody-tr-td
            p {{ user.name }}
          td.edit-user-admin__container--table-tbody-tr-td
            p {{ user.id }}
          td.edit-user-admin__container--table-tbody-tr-td
            p {{ user.center }}
          td.edit-user-admin__container--table-tbody-tr-td
            p {{ user.profile }}
          td.edit-user-admin__container--table-tbody-tr-td
            p {{ user.membership }}
          td.edit-user-admin__container--table-tbody-tr-td
            p {{ user.email }}
          td.edit-user-admin__container--table-tbody-tr-td
            p {{ user.active }}
          td.edit-user-admin__container--table-tbody-tr-td

            q-icon.edit-user-admin__container--table-tbody-tr-td-icon(
              name="eva-edit-outline",
              size="25px",
              @click="editSelectedUser(user)"
            )
          td.edit-user-admin__container--table-tbody-tr-td

            q-icon.edit-user-admin__container--table-tbody-tr-td-icon(
              name="eva-trash-2-outline",
              size="22px"
            )
      q-dialog.popup-container__dialog(v-model="showModal")
        q-card.popup-container__dialog--card
          q-card-section.popup-container__dialog--card-section
            q-form.popup-container__dialog--card-section-form(@submit.prevent="saveEditedUser")
              //- q-input.popup-container__dialog--card-section-input(v-model="selectedUser.idProfile", label="IdProfile")
              select.popup-container__dialog--card-section-form-select(v-model="selectedUser.idProfile")
                option(:value="0", disabled) Select profile reference
                option(v-for="profile in profiles", :value="profile.id", :key="profile.id") {{ profile.name }}
              //- q-input.popup-container__dialog--card-section-input(v-model="selectedUser.idPronoun", label="IdPronoun")
              select.popup-container__dialog--card-section-form-select(v-model="selectedUser.idPronoun")
                option(:value="0", disabled) Select pronoun reference
                option(v-for="pronoun in pronouns", :value="pronoun.id", :key="pronoun.id") {{ pronoun.name }}
              //- q-input.popup-container__dialog--card-section-input(v-model="selectedUser.idCenter", label="IdCenter")
              select.popup-container__dialog--card-section-form-select(v-model="selectedUser.idCenter")
                option(:value="0", disabled) Select center reference
                option(v-for="catalogueCenter in catalogueCenters", :value="catalogueCenter.id", :key="catalogueCenter.id") {{ catalogueCenter.name }}
              q-input.popup-container__dialog--card-section-form-input(v-model="selectedUser.idMembership", label="idMembership"
                filled,
                lazy-rules,
                :rules="[(val) => (val && val.length > 0) || 'Please type idMembership']")
              q-input.popup-container__dialog--card-section-form-input(v-model="selectedUser.address", label="address"
              filled,
                lazy-rules,
                :rules="[(val) => (val && val.length > 0) || 'Please type Address']")
              q-input.popup-container__dialog--card-section-form-input(v-model="selectedUser.phone", label="phone"
              filled,
                lazy-rules,
                :rules="[(val) => (val && val.length > 0) || 'Please type Phone']")
              q-input.popup-container__dialog--card-section-form-input(v-model="selectedUser.movile", label="movile"
              filled,
                lazy-rules,
                :rules="[(val) => (val && val.length > 0) || 'Please type Movile']")
              q-input.popup-container__dialog--card-section-form-input(v-model="selectedUser.email", label="email"
              filled,
                lazy-rules,
                :rules="[(val) => (val && val.length > 0) || 'Please type Email']")
              q-checkbox.popup-container__dialog--card-section-form-checkbox(
                v-model="selectedUser.active",
                label="Active"
              )
              q-card-actions.popup-container__dialog--card-actions(align="center")
                q-btn.popup-container__dialog--card-actions-botton(label="Cancel", @click="showModal = false")
                q-btn.popup-container__dialog--card-actions-botton(label="Save", type="submit")
  </template>
