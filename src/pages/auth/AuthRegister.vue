 <script  setup>
import { onMounted, ref, watchEffect } from "vue";
import { useRouter } from "vue-router";
import { authRegisterApi } from "../../api/auth/AuthRegister";
import { alertService } from "../../libs/alert";
// import { useTokenStore } from "src/stores/token";
import { useUserStore } from "src/stores/user";
import { EMAIL_REGEX, PASSWORD_REGEX } from "../../libs/regex";

const router = useRouter();
const {
  getIp,
  register,
  infoForRegister,
  availableEmail,
  availableUserName,
  availableNameToShow,
} = authRegisterApi();
const { ShowAlert, ShowAlertConfirm } = alertService();
// const useToken = useTokenStore();
const useUser = useUserStore();

let pronouns = ref([]);
let genders = ref([]);
let centers = ref([]);
const passConfirm = ref("");
const passValidate = ref(false);
const accept = ref(false);
let userCreate = ref({
  idPronoun: 0,
  idCenter: 0,
  // idGender: 0,
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
  isOn: true,
  latitude: 0,
  longitude: 0,
  nameToShow: "",
});

onMounted(async () => {
  let response = await getIp();
  userCreate.value.lastIp = response;
  let infoForRegisterRes = await infoForRegister();
  pronouns.value = infoForRegisterRes.pronouns.result;
  genders.value = infoForRegisterRes.genders.result;
  centers.value = infoForRegisterRes.centers;
});

// validando contraseña
const checkPassword = () => {
  if (!PASSWORD_REGEX.test(userCreate.value.password)) {
    ShowAlert(
      "Error!",
      "the password must contain at least one capital letter, one number and one special character '(?=.*d)')",
      "error"
    );
    userCreate.value.password = "";
    return;
  }
};

// confirmando contraseña
const ConfirmPass = () => {
  if (passConfirm.value == userCreate.value.password) {
    passValidate.value = true;
    ShowAlert("good", "Passwords do match", "success");

    return;
  } else {
    passValidate.value = false;
    ShowAlert("error", "Passwords do not match", "error");
    passConfirm.value = "";

    return;
  }
};

// validando nombre de usuario
const checkUserName = async () => {
  if (
    userCreate.value.userName.length < 5 &&
    userCreate.value.userName != "root"
  ) {
    ShowAlert("error", "Minimum 5 characters for the User Name ", "error");
    return;
  }
  let response = await availableUserName(userCreate.value.userName);
  let isAvaliable = response;
  if (isAvaliable == true) {
    // ShowAlert("good", "username available", "success");
    // return;
  } else {
    ShowAlert("error", "username no available", "error");
    userCreate.value.userName = "";
  }
};

// validando nombre para mostrar
const checkNameToShow = async () => {
  let result = false;
  if (
    userCreate.value.nameToShow.length < 5 &&
    userCreate.value.nameToShow != "root"
  ) {
    ShowAlert(
      "error",
      "minimum 5 characters for what would you like to be called",
      "error"
    );
    return;
  }
  let response = await availableNameToShow(userCreate.value.nameToShow);
  let isAvaliable = response;
  result = isAvaliable;
  if (isAvaliable == true) {
    // ShowAlert("good", "name to show available", "success");
  } else {
    ShowAlert("error", "name to show no available", "error");
    userCreate.value.nameToShow = "";
  }
  return result;
};

// validando email
const checkEmail = async () => {
  if (!EMAIL_REGEX.test(userCreate.value.email)) {
    ShowAlert("error", "invalid email address", "error");
    userCreate.value.email = "";
    return;
  }
  let response = await availableEmail(userCreate.value.email);
  let isAvaliable = response;
  if (isAvaliable) {
    // ShowAlert("good", "email available", "success");
    // return;
  } else {
    ShowAlert("error", "email no available", "error");
    userCreate.value.email = "";
  }
};

const validate = async () => {
  if (
    userCreate.value.lastIp == "" ||
    userCreate.value.userName == "" ||
    userCreate.value.userName.length < 5 ||
    userCreate.value.password == "" ||
    userCreate.value.password.length < 8
  ) {
    ShowAlert("Error!", "please enter the fields.", "error");
    return;
  }
  if (accept.value) {
    let response = await register(userCreate.value);
    if (response) {
      ShowAlert("good", "User created!", "success");
      router.push("/");
    } else {
      userCreate.value.name = "";
      userCreate.value.lastName = "";
      userCreate.value.email = "";
      userCreate.value.phone = "";
      userCreate.value.address = "";
      userCreate.value.movile = "";
      userCreate.value.userName = "";
      userCreate.value.nameToShow = "";
      userCreate.value.password = "";
      ShowAlert("Error!", "incorrect data", "error");
    }
  } else {
    ShowAlert("Error!", "acept terms", "error");
  }
};
</script>

<template lang="pug">
section.auth-container
  .auth-container-elements
    .auth-container-elements-title
      q-icon(
          name="fa-solid fa-circle-chevron-left",
          size="18px",
          @click="$router.back()"
        )
      h3 Sign Up
    .auth-container-elements-form
      q-form.auth-container-elements-form-items(
        autocomplete="off",
        @submit.prevent="validate()"
      )
        select.auth-container-elements-form-items-select(
          v-model="userCreate.idPronoun"
        )
          option(:value="0", disabled) Select a pronoun
          option(
            v-for="pronoun in pronouns",
            :key="pronoun.id",
            :value="pronoun.id",
            filled
          ) {{ pronoun.name }}
        q-input.auth-container-elements-form-items-input(
          type="text",
          label="Your name",
          v-model="userCreate.name",
          v-show="userCreate.idPronoun != 0",
          filled,
          lazy-rules,
          :rules="[(val) => (val && val.length > 0) || 'Please type your name']"
        )
        q-input.auth-container-elements-form-items-input(
          type="text",
          label="your last name",
          v-model="userCreate.lastName",
          v-show="userCreate.name != '' && userCreate.name.length >= 5",
          filled,
          lazy-rules,
          :rules="[(val) => (val && val.length > 0) || 'Please type your last name']"
        )
        //- select.auth-container-form-items-select(v-model="userCreate.idGender"  v-show="userCreate.lastName != '' && userCreate.lastName.length > 5")
        //-   option(:value="0", disabled) Select a gender
        //-   option(
        //-       v-for="gender in genders",
        //-       :key="gender.id",
        //-       :value="gender.id"
        //- v-show="userCreate.idGender != 0" 
        //-     ) {{ gender.name }}
        q-input.auth-container-elements-form-items-input(
          type="text",
          label="your email",
          v-model="userCreate.email",
          v-show="userCreate.lastName != '' && userCreate.lastName.length > 5",
          @change="checkEmail",
          autocomplete="off",
          filled,
          lazy-rules,
          :rules="[(val) => (val && val.length > 0) || 'Please type your email']"
        )
        q-input.auth-container-elements-form-items-input(
          type="text",
          label="your phone",
          v-model="userCreate.phone",
          v-show="userCreate.email != '' && userCreate.email.length > 5",
          filled,
          lazy-rules,
          :rules="[(val) => (val && val.length > 0) || 'Please type your Phone']"
        )
        q-input.auth-container-elements-form-items-input(
          type="text",
          label="your Adress",
          v-model="userCreate.address",
          v-show="userCreate.phone != '' && userCreate.phone.length > 5",
          filled,
          lazy-rules,
          :rules="[(val) => (val && val.length > 0) || 'Please type your address']"
        )
        q-input.auth-container-elements-form-items-input(
          type="text",
          label="Your movile",
          v-model="userCreate.movile",
          v-show="userCreate.address != '' && userCreate.address.length > 5",
          filled,
          lazy-rules,
          :rules="[(val) => (val && val.length > 0) || 'Please type your movile']"
        )
        select.auth-container-elements-form-items-select(
          v-model="userCreate.idCenter",
          v-show="userCreate.movile != '' && userCreate.movile.length > 5",
          filled
        )
          option(:value="0", disabled) Select a Center
          option(
            v-for="center in centers",
            :key="center.id",
            :value="center.id"
          ) {{ center.name }}
        q-input.auth-container-elements-form-items-input(
          type="text",
          label="Your user name",
          v-model="userCreate.userName",
          v-show="userCreate.idCenter != 0",
          @change="checkUserName",
          autocomplete="off",
          filled,
          lazy-rules,
          :rules="[(val) => (val && val.length > 0) || 'Please type your user name']"
        )
        q-input.auth-container-elements-form-items-input(
          type="text",
          label="Your nickname",
          v-model="userCreate.nameToShow",
          v-show="userCreate.userName != '' && userCreate.userName.length >= 5",
          @change="checkNameToShow",
          autocomplete="off",
          filled,
          lazy-rules,
          :rules="[(val) => (val && val.length > 0) || 'Please type What you would like to be called']"
        )
        q-input.auth-container-elements-form-items-input(
          type="password",
          label="Your password",
          v-model="userCreate.password",
          v-show="userCreate.nameToShow != '' && userCreate.nameToShow.length >= 5",
          @change="checkPassword",
          autocomplete="off",
          filled,
          lazy-rules,
          :rules="[(val) => (val && val.length > 0) || 'Please type your password']"
        )
        q-input.auth-container-elements-form-items-input(
          type="password",
          label="Your password",
          v-model="passConfirm",
          v-show="userCreate.password != '' && userCreate.password.length > 8",
          @change="ConfirmPass",
          filled,
          lazy-rules,
          :rules="[(val) => (val && val.length > 0) || 'Please type your repeat password']"
        )
        q-toggle(
          v-model="accept",
          label="I accept the license and terms",
          v-show="passValidate"
        )
        .auth-container-elements-form-items-text
          p.auth-container-elements-form-items-text-parrafo By signing up, you agree to our
            strong(@click="$router.push({ path: '/termsofservice' })") Terms and Condition
          p.auth-container-elements-form-items-text-parrafo and that you have read our
            strong(@click="$router.push({ path: '/termsofservice' })") Privacy Polity.
        q-btn.auth-container-elements-form-items-boton(
          type="submit",
          v-show="passValidate"
        ) Create user

        //- q-btn.registerContainer__form-boton-item.auth-container-form-boton(
        //-   type="submit",
        //-   v-show="passValidate"
        //- ) Create user
  p.auth-container-action if you already have an account,
    strong(@click="$router.push({ path: '/login' })") please login.
</template>
