<script setup>
import { ref, onMounted } from "vue";
import { useUserStore } from "src/stores/user";
import { usersAdminApi } from "src/api/user/UsersEditAdmin";
import { alertService } from "src/libs/alert";
import Datepicker from "vue3-datepicker";
import measurements from "./measurements.vue";
import { authRegisterApi } from "src/api/auth/AuthRegister";
import { EMAIL_REGEX } from "src/libs/regex";

const { availableEmail, availableNameToShow } = authRegisterApi();
const { getUserProfilePage, postSetUserProfileInfo, postSetProfilePhoto } =
  usersAdminApi();
const { ShowAlert, ShowAlertConfirm } = alertService();

const userStore = useUserStore();
// const urlBaseImg = import.meta.env.BASE_URL + "resources/";
const nameToShowInitial = ref("");
const emailInitial = ref("");
const birthDate = ref("yyyy-mm-dd");
// actualizar datos del usuario
const addUserProfilePageApi = ref({
  id: 0,
  idPronoun: 0,
  name: "",
  lastName: "",
  address: "",
  phone: "",
  movile: "",
  email: "",
  nameToShow: "",
  latitude: 0,
  longitude: 0,
  profileImg: "userDefault.png",
});

onMounted(async () => {
  const dataStore = await userStore.getUser();
  let response = await getUserProfilePage(dataStore.nameToShow);
  addUserProfilePageApi.value.id = response.id;
  addUserProfilePageApi.value.longitude = response.longitude;
  addUserProfilePageApi.value.latitude = response.latitude;
  addUserProfilePageApi.value.name = response.name;
  addUserProfilePageApi.value.lastName = response.lastName;
  addUserProfilePageApi.value.address = response.address;
  addUserProfilePageApi.value.phone = response.phone;
  addUserProfilePageApi.value.movile = response.movile;
  addUserProfilePageApi.value.email = response.email;
  addUserProfilePageApi.value.nameToShow = response.nameToShow;
  addUserProfilePageApi.value.idPronoun = response.idPronoun;
  addUserProfilePhotoApi.value.idUser = response.id;
  addUserProfilePageApi.value.profileImg = response.profileImg;
  emailInitial.value = response.email;
  nameToShowInitial.value = response.nameToShow;

  let img =
    response.profileImg != "userDefault.png"
      ? "resources/" + response.profileImg
      : "resources/userDefault.png";
  imgChange(img);
});

const imgChange = (url) => {
  let src = import.meta.env.BASE_URL + url;
  let img = document.getElementById("img-profile-user");
  img.src = src;
};

const uploadUserProfilePageApi = async () => {
  let response = await postSetUserProfileInfo(addUserProfilePageApi.value);
  if (response != null)
    ShowAlert("good!", "Changes added successfully", "success");
};

// actualizar foto del usuario
const addUserProfilePhotoApi = ref({
  idUser: 0,
  file: null,
  fileName: "",
});

const onFileSelected = async (input) => {
  let alert = await ShowAlertConfirm(
    "",
    "This action would change the profile image, are you sure?",
    "question"
  );
  if (!alert) {
    input.value = "";
    return;
  }
  let inputFile = input.files[0];
  addUserProfilePhotoApi.value.fileName =
    addUserProfilePageApi.value.profileImg;
  let dat = new FormData();
  dat.append("idUser", addUserProfilePhotoApi.value.idUser);
  dat.append("fileName", addUserProfilePhotoApi.value.fileName);
  dat.append("file", inputFile);
  let response = await postSetProfilePhoto(dat);
  addUserProfilePageApi.value.profileImg = "userDefault.png";
  if (response.success) {
    input.value = "";
    addUserProfilePageApi.value.profileImg = response.name;
    imgChange("resources/" + response.name);
    ShowAlert("good!", "image updated successfully", "success");
  } else ShowAlert("Error!", "Please contact support!", "success");
};

// validando nickName
const checkNameToShow = async () => {
  if (
    addUserProfilePageApi.value.nameToShow.length < 5 &&
    addUserProfilePageApi.value.nameToShow != "root"
  ) {
    ShowAlert(
      "error",
      "minimum 5 characters for what would you like to be called",
      "error"
    );
    addUserProfilePageApi.value.nameToShow = nameToShowInitial.value;
    return;
  }
  let response = await availableNameToShow(
    addUserProfilePageApi.value.nameToShow
  );
  let isAvaliable = response;
  if (isAvaliable) {
    ShowAlert("good", "name to show available", "success");
  } else {
    ShowAlert("error", "name to show no available", "error");
    addUserProfilePageApi.value.nameToShow = nameToShowInitial.value;
  }
};

// Validando email
const checkEmail = async () => {
  if (!EMAIL_REGEX.test(addUserProfilePageApi.value.email)) {
    ShowAlert("error", "invalid email address", "error");
    addUserProfilePageApi.value.email = emailInitial.value;
    return;
  }
  let response = await availableEmail(addUserProfilePageApi.value.email);
  let isAvaliable = response;
  if (isAvaliable) {
    // ShowAlert("good", "email available", "success");
    // return;
  } else {
    ShowAlert("error", "email no available", "error");
    addUserProfilePageApi.value.email = emailInitial.value;
  }
};
</script>

<template lang="pug">
.account-general
  .account_container
    .profile-header
      h3.title My Account
      .image-actions-container
        img#img-profile-user.profile_img
        label.labelPrueba(for="imagenC") add img
        input#imagenC.inputPrueba(
          type="file",
          accept="image/*",
          @change="onFileSelected($event.target)"
        )
    q-list.rounded-borders
      q-expansion-item(
        expand-separator,
        default-opened,
        icon="account_circle",
        label="Profile settings",
        :caption="addUserProfilePageApi.nameToShow",
        header-class="text-white"
      )
        q-card.profile-info
          q-card-section
            q-form.user-info-container(
              @submit.prevent="uploadUserProfilePageApi()"
            )
              q-input.bkf-form-col(
                v-model="addUserProfilePageApi.name",
                label="Name",
                type="text",
                filled,
                lazy-rules,
                :rules="[(val) => (val && val.length > 0) || 'Please type your user name']"
              )
              q-input.bkf-form-col(
                type="text",
                label="Last name",
                ,
                v-model="addUserProfilePageApi.lastName",
                filled,
                lazy-rules,
                :rules="[(val) => (val && val.length > 0) || 'Please type your Last name']"
              )
              q-input.bkf-form-col(
                type="text",
                label="Nickname",
                v-model="addUserProfilePageApi.nameToShow",
                autocomplete="off",
                @change="checkNameToShow",
                filled,
                lazy-rules,
                :rules="[(val) => (val && val.length > 0) || 'Please type your Nickname']"
              )
              .bkf-form-row.container-rows
                //- .bkf-form-row.birth
                //-   .bkf-form-col
                //-     label(for="birth-date") Date of Birth
                //-     Datepicker(v-model="birthDate")
                //-   svg#Capa_1(
                //-     data-name="Capa 1",
                //-     xmlns="http://www.w3.org/2000/svg"
                //-   )
                //-     g.cls-2
                //-       path.cls-1(
                //-         d="m12.81,0C15.99,0,19.18-.01,22.36.01c2.08.02,2.86.8,2.86,2.91.02,6.49.02,12.99,0,19.48,0,1.99-.81,2.8-2.77,2.81-6.56.03-13.11.03-19.67,0-1.96,0-2.76-.82-2.76-2.82C0,15.91,0,9.41.01,2.92.02.81.79.03,2.88.01c3.31-.03,6.62,0,9.93,0Zm-.19,6.88c2.48,0,4.96,0,7.44,0,2.91,0,2.84,0,2.91-2.91.03-1.31-.3-1.73-1.67-1.71-5.72.08-11.45.09-17.17,0-1.53-.03-2.07.44-1.84,1.9.06.37.05.77,0,1.14-.17,1.22.27,1.65,1.55,1.61,2.92-.09,5.85-.03,8.78-.03Zm3.61,5.13c-.06,0-.13-.02-.19,0-.9.29-2.57-.73-2.6.83-.03,1.52,1.6.64,2.46.75,1.01.12,1.24.33.72,1.25-.69,1.21-1.35,2.45-1.94,3.72-.2.43-.97,1.02-.24,1.43.66.37,1.49.3,1.93-.61.64-1.32,1.31-2.61,1.96-3.92,1.64-3.28,1.54-3.45-2.09-3.45Zm-8.13,2.31c0,1.46.02,2.97,0,4.47-.01.79.09,1.36,1.1,1.34.89-.02,1.03-.5,1.03-1.23-.02-1.9,0-3.8,0-5.71,0-.43.08-.94-.49-1.1-1.17-.34-2.07.24-2.97.88-.75.53-.82,1.14-.44,1.88.66,0,.98-.74,1.8-.53Z"
                      )
                q-input.bkf-form-col(
                  type="email",
                  label="Email",
                  v-model="addUserProfilePageApi.email",
                  @change="checkEmail",
                  filled,
                  lazy-rules,
                  :rules="[(val) => (val && val.length > 0) || 'Please type your Email']"
                )
              q-input.bkf-form-col(
                type="text",
                label="Adress",
                v-model="addUserProfilePageApi.address",
                filled,
                lazy-rules,
                :rules="[(val) => (val && val.length > 0) || 'Please type your Adress']"
              )
              q-input.bkf-form-col(
                type="text",
                label="Phone",
                v-model="addUserProfilePageApi.phone",
                filled,
                lazy-rules,
                :rules="[(val) => (val && val.length > 0) || 'Please type your Phone']"
              )
              q-input.bkf-form-col(
                type="text",
                label="Movil",
                v-model="addUserProfilePageApi.movile",
                filled,
                lazy-rules,
                :rules="[(val) => (val && val.length > 0) || 'Please type your Movile']"
              )
              //- q-btn-group.bkf-form-row-actions.bkf-form-col(spread)
              //-   .q-pa-md
              //-     q-btn.metrics.btn Metric
              //-     q-btn.units.btn Us units
              q-btn.full-width.save-profile(spread, type="submit") Save Changes
      q-expansion-item(
        expand-separator,
        icon="straighten",
        label="Measurements settings ",
        :caption="addUserProfilePageApi.nameToShow",
        header-class="text-white"
      )
        q-card
          q-card-section
            measurements
</template>

