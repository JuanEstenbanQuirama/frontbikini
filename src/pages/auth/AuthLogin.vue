<script setup>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { spinnerService } from "../../libs/spinner";
import { authLoginApi } from "src/api/auth/AuthLogin";
import { alertService } from "../../libs/alert";
import { useUserStore } from "src/stores/user";
import { useQuasar } from "quasar";

const $q = useQuasar();
const router = useRouter();
const { getIp, login } = authLoginApi();
const { ShowAlert, ShowAlertConfirm } = alertService();
const useUser = useUserStore();

let userConfirm = ref({
  UserName: "",
  Password: "",
  LastIp: "",
});

onMounted(async () => {
  let response = await getIp();
  userConfirm.value.LastIp = response;
});

const validate = async () => {
  if (
    (userConfirm.value.UserName != "root" &&
      (userConfirm.value.UserName == "" ||
        userConfirm.value.UserName.length < 5)) ||
    userConfirm.value.Password == "" ||
    userConfirm.value.Password.length < 8
  ) {
    ShowAlert("Error!", "usuario o pass incorrecto.", "error");
    userConfirm.value.UserName = "";
    userConfirm.value.Password = "";
    return;
  } else {
    // enviando información a la store
    let response = await login(userConfirm.value);
    if (response.access) {
      $q.cookies.set("token_bikini", response.token, { expires: "90d" });
      useUser.setUser(response.user);
      useUser.setMenus(response.menus);
      useUser.setPermissions(response.permissions);
      // router.push("/");
      location.replace("/");
    } else {
      ShowAlert("Error!", "usuario o pass incorrecto.", "error");
      userConfirm.value.UserName = "";
      userConfirm.value.Password = "";
    }
  }
};
</script>

<template lang="pug">
section.auth-container
  
  //- .auth-container-back
  //-   q-icon.auth-container-back-item(
  //-     name="eva-arrow-circle-left",
  //-     size="25px",
  //-     @click="$router.push({ path: '/' })"
  //-   )
  .auth-container-elements
    .auth-container-elements-title
      q-icon(
          name="fa-solid fa-circle-chevron-left",
          size="18px",
          @click="$router.back()"
        )
     
      h3 Login
    .auth-container-elements-form
      q-form.auth-container-elements-form-items(@submit.prevent="validate()")
        q-input.auth-container-elements-form-items-input(
          v-model="userConfirm.UserName",
          type="text",
          label="User name",
          filled,
          lazy-rules,
          :rules="[(val) => (val && val.length > 0) || 'Please type your user name']"
        )
        q-input.auth-container-elements-form-items-input(
          v-model="userConfirm.Password",
          type="password",
          label="Password",
          filled,
          lazy-rules,
          :rules="[(val) => (val && val.length > 0) || 'Please type your password']"
        )
        .auth-container-elements-form-items-text
          p.auth-container-elements-form-items-text-parrafo By signing up, you agree to our
            strong(@click="$router.push({ path: '/termsofservice' })") Terms and Condition
          p.auth-container-elements-form-items-text-parrafo and that you have read our
            strong(@click="$router.push({ path: '/termsofservice' })") Privacy Polity.
        q-btn.auth-container-elements-form-items-boton(type="submit") login
  p.auth-container-action(@click="$router.push({ path: '/register' })") Don’t you have an account?
    strong Sign up
</template>


