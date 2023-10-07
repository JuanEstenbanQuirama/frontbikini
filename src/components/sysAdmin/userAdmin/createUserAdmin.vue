<script setup>
import { onMounted, ref, onUpdated } from "vue";
import { getCatalogueUserApi } from "../../../api/catalogue/CatalogueUser";
import { alertService } from "src/libs/alert";
import { authRegisterApi } from "src/api/auth/AuthRegister";
import { EMAIL_REGEX, PASSWORD_REGEX } from "../../../libs/regex";
import { useUserStore } from "src/stores/user";
import { usersAdminApi } from "src/api/user/UsersEditAdmin";

const { ShowAlert, ShowAlertConfirm } = alertService();
const useUser = useUserStore();

// validar campos -no headers autorization
const {
  getIp,
  infoForRegister,
  availableEmail,
  availableNameToShow,
  availableUserName,
} = authRegisterApi();

// validar campos -headers autorization
const { getGenders, getPronouns, getProfiles } = getCatalogueUserApi();
const { postUsers } = usersAdminApi();

onMounted(async () => {
  let responseIp = await getIp(); // obtener la ip
  userCreateAdmin.value.lastIp = responseIp;
  // obteniendo datos de la store
  let responseIdUser = await useUser.getUser();
  userCreateAdmin.value.idUserCreate = responseIdUser.id;
  userCreateAdmin.value.idUserUpdate = responseIdUser.id;

  let responseInfo = await infoForRegister(); // obtener los centros
  centers.value = responseInfo.centers;

  let responseGenders = await getGenders();
  genders.value = responseGenders; // obtener los generos

  let responsePronouns = await getPronouns(); // obtener los pronombres
  pronouns.value = responsePronouns;

  let responseProfiles = await getProfiles();
  profiles.value = responseProfiles;
});

const genders = ref([]);
const pronouns = ref([]);
const centers = ref([]);
const profiles = ref([]);
let file = ref(null);

const passConfirm = ref("");
let imageUpload = ref(null);

let userCreateAdmin = ref({
  id: 0,
  idProfile: 0,
  idPronoun: 0,
  idCenter: 0,
  idUserCreate: 0,
  idUserUpdate: 0,
  idMembership: 1,
  idGender: 0,
  userName: "",
  password: "",
  name: "",
  lastName: "",
  address: "",
  phone: "",
  movile: "",
  email: "",
  active: true,
  lastIp: "",
  isOn: false,
  latitude: 0,
  longitude: 0,
  nameToShow: "",
  profileImg: "userDefault.png",
  createDate: new Date(),
});

// validando nombre de usuario
const checkUserName = async () => {
  if (
    userCreateAdmin.value.userName.length < 5 &&
    userCreateAdmin.value.userName != "root"
  ) {
    ShowAlert("error", "Minimum 5 characters for the User Name ", "error");
    return;
  }
  let response = await availableUserName(userCreateAdmin.value.userName);
  let isAvaliable = response;
  if (isAvaliable == true) {
    // ShowAlert("good", "username available", "success");
    // return;
  } else {
    ShowAlert("error", "username no available", "error");
    userCreateAdmin.value.userName = "";
  }
};

// validando nombre para mostrar
const checkNameToShow = async () => {
  if (
    userCreateAdmin.value.nameToShow.length < 5 &&
    userCreateAdmin.value.nameToShow != "root"
  ) {
    ShowAlert(
      "error",
      "minimum 5 characters for what would you like to be called",
      "error"
    );
    return;
  }
  let response = await availableNameToShow(userCreateAdmin.value.nameToShow);
  let isAvaliable = response;
  if (isAvaliable == true) {
    // ShowAlert("good", "name to show available", "success");
  } else {
    ShowAlert("error", "name to show no available", "error");
    userCreateAdmin.value.nameToShow = "";
  }
};

// Validando email
const checkEmail = async () => {
  if (!EMAIL_REGEX.test(userCreateAdmin.value.email)) {
    ShowAlert("error", "invalid email address", "error");
    userCreateAdmin.value.email = "";
    return;
  }
  let response = await availableEmail(userCreateAdmin.value.email);
  let isAvaliable = response;
  if (isAvaliable) {
    // ShowAlert("good", "email available", "success");
    // return;
  } else {
    ShowAlert("error", "email no available", "error");
    userCreateAdmin.value.email = "";
  }
};

// validando contraseña
const checkPassword = () => {
  if (!PASSWORD_REGEX.test(userCreateAdmin.value.password)) {
    ShowAlert(
      "Error!",
      "the password must contain at least one capital letter, one number and one special character '(?=.*d)')",
      "error"
    );
    userCreateAdmin.value.password = "";
    return;
  }
};

// confirmando contraseña
const ConfirmPass = () => {
  if (passConfirm.value == userCreateAdmin.value.password) {
    ShowAlert("success", "Passwords match", "success");
    return;
  } else {
    ShowAlert("error", "Passwords do not match", "error");
    passConfirm.value = "";
    return;
  }
};

// enviar datos al back para el registro
const validate = async () => {
  let response = await postUsers(userCreateAdmin.value);
  if (response) {
    ShowAlert("good!", "user created successfully", "success");
    userCreateAdmin.value.name = "";
    userCreateAdmin.value.lastName = "";
    userCreateAdmin.value.email = "";
    userCreateAdmin.value.phone = "";
    userCreateAdmin.value.address = "";
    userCreateAdmin.value.movile = "";
    userCreateAdmin.value.userName = "";
    userCreateAdmin.value.nameToShow = "";
    userCreateAdmin.value.password = "";
    userCreateAdmin.value.idCenter = 0;
    userCreateAdmin.value.idGender = 0;
    userCreateAdmin.value.idPronoun = 0;
    userCreateAdmin.value.idProfile = 0;
    passConfirm.value = "";
    return;
  } else {
    ShowAlert("error", "the user could not be created", "error");
    return;
  }
};

// cargar imagen usuario
const onFileSelected = (event) => {
  const selectedFile = event.target.files[0];
  const imgName = selectedFile.name;
  // userCreateAdmin.value.file = selectedFile;
  file.value = selectedFile;
  userCreateAdmin.value.profileImg = imgName;
  let img = document.getElementById("img-user-create");
  var dataImg = URL.createObjectURL(selectedFile);
  img.src = dataImg;
};
</script>

<template lang="pug">
section
  q-form.create-user-admin(autocomplete="off", @submit.prevent="validate()")
    .create-user-admin__image
      .create-user-admin__image-default
        label(for="userAdmin")
          img(
            :src="'resources/' + userCreateAdmin.profileImg",
            v-show="file == null"
          )
          img#img-user-create(
            v-show="file != null",
            src="resources/userDefault.png"
          )
        input#userAdmin.create-user-admin__image-default-upload(
          type="file",
          @change="onFileSelected",
          accept="image/*"
        )

    .create-user-admin__container
      select.create-user-admin__container-select(
        v-model="userCreateAdmin.idCenter"
      )
        option(:value="0", disabled) Select a Center
        option(v-for="center in centers", :value="center.id", :key="center.id") {{ center.name }}
      select.create-user-admin__container-select(
        v-model="userCreateAdmin.idPronoun"
      )
        option(:value="0", disabled) Select a Pronoun
        option(
          v-for="pronoun in pronouns",
          :value="pronoun.id",
          :key="pronoun.id"
        ) {{ pronoun.name }}
      select.create-user-admin__container-select(
        v-model="userCreateAdmin.idGender"
      )
        option(:value="0", disabled) Select a Gender
        option(v-for="gender in genders", :value="gender.id", :key="gender.id") {{ gender.name }}
      select.create-user-admin__container-select(
        v-model="userCreateAdmin.idProfile"
      )
        option(:value="0", disabled) Select a Profile
        option(
          v-for="profile in profiles",
          :value="profile.id",
          :key="profile.id"
        ) {{ profile.name }}
      q-input.create-user-admin__container-input(
        type="text",
        label="User name",
        v-model="userCreateAdmin.userName",
        @change="checkUserName",
        autocomplete="off",
        filled,
        lazy-rules,
        :rules="[(val) => (val && val.length > 0) || 'Please type User Name']"
      )
      q-input.create-user-admin__container-input(
        type="text",
        label="Name",
        v-model="userCreateAdmin.name",
        autocomplete="off",
        filled,
        lazy-rules,
        :rules="[(val) => (val && val.length > 0) || 'Please type Name']"
      )
      q-input.create-user-admin__container-input(
        type="text",
        label="Last name",
        v-model="userCreateAdmin.lastName",
        autocomplete="off",
        filled,
        lazy-rules,
        :rules="[(val) => (val && val.length > 0) || 'Please type Last Name']"
      )
      q-input.create-user-admin__container-input(
        type="text",
        label="Email",
        v-model="userCreateAdmin.email",
        @change="checkEmail",
        autocomplete="off",
        filled,
        lazy-rules,
        :rules="[(val) => (val && val.length > 0) || 'Please type Email']"
      )
      q-input.create-user-admin__container-input(
        type="text",
        label="Address",
        v-model="userCreateAdmin.address",
        filled,
        lazy-rules,
        :rules="[(val) => (val && val.length > 0) || 'Please type Address']"
      )
      q-input.create-user-admin__container-input(
        type="number",
        label="Phone",
        v-model="userCreateAdmin.phone",
        filled,
        lazy-rules,
        :rules="[(val) => (val && val.length > 0) || 'Please type Phone']"
      )
      q-input.create-user-admin__container-input(
        type="number",
        label="Movile",
        v-model="userCreateAdmin.movile",
        filled,
        lazy-rules,
        :rules="[(val) => (val && val.length > 0) || 'Please type Movile']"
      )
      q-input.create-user-admin__container-input(
        type="text",
        label="Name to show",
        v-model="userCreateAdmin.nameToShow",
        @change="checkNameToShow",
        autocomplete="off",
        filled,
        lazy-rules,
        :rules="[(val) => (val && val.length > 0) || 'Please type Name to show']"
      )
      q-input.create-user-admin__container-input(
        type="password",
        label="Password",
        v-model="userCreateAdmin.password",
        @change="checkPassword",
        autocomplete="off",
        filled,
        lazy-rules,
        :rules="[(val) => (val && val.length > 0) || 'Please type Password']"
      )
      q-input.create-user-admin__container-input(
        type="password",
        label="Confirm password",
        v-model="passConfirm",
        @change="ConfirmPass",
        autocomplete="off",
        filled,
        lazy-rules,
        :rules="[(val) => (val && val.length > 0) || 'Please type Confirm password']"
      )
      q-btn.create-user-admin__container-botton delete User
      q-btn.create-user-admin__container-botton(
        type="submit",
        label="create user"
      ) 
</template> 

<style lang="scss">
.create-user-admin {
  margin: 1%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  &__image {
    display: flex;
    justify-content: center;
    border-radius: 20px;
    &-default {
      width: 170px;
      height: auto;
      img {
        width: 100%;
        height: auto;
        border-radius: 90px;
      }
      &-upload {
        display: none;
      }
    }
  }
  &__container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    &-input {
         // border: 1px solid #707070;
        // border-radius: 10px;
        // padding: 12px;
        // height: 58px;
        background: black;
        color: white;
        // max-width: 450px;
        width: 100%;
        font-family: Montserrat;
        & .q-field__label.no-pointer-events.absolute.ellipsis {
          color: #848484;
        }
        & .q-field__native.q-placeholder {
          color: white;
        }
    }
    &-select {
      padding: 0 12px;
        border-radius: 10px;
        border: 1px solid #707070;
        background-color: black;
        color: white;
        height: 57px;
        max-width: 450px;
        width: 100%;
        margin-bottom: 20px;
    }
    &-botton {
      border-radius: 10px;
      background: $primary;
      max-width: 100%;
      height: 63px;
      font-size: 16px;
    }
    @media (max-width: 720px) {
      grid-template-columns: 1fr;
    }
  }
}
</style>