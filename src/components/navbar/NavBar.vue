<script setup>
import {
  onMounted,
  onUpdated,
  ref,
  watchEffect,
  watch,
  computed,
  onBeforeUnmount,
} from "vue";
import { useShopStore } from "src/stores/shop";
import { useUserStore } from "src/stores/user";
import { useRouter } from "vue-router";
import { useQuasar } from "quasar";
import { authValidateTokenApi } from "src/api/auth/authValidateToken";

const $q = useQuasar();
const useUser = useUserStore();
const shopStore = useShopStore();
const router = useRouter();
const { postLogout, getIp } = authValidateTokenApi();

const urlBaseImg = import.meta.env.BASE_URL + "resources/";
const selectedMenuId = ref(null);
const open = ref(false);
let getMenu = ref([]);
let nameToShow = ref("");
let imgUser = ref("");

let fromLogout = ref({
  token: "",
  lastIp: "",
});

onUpdated(async () => {
  fromLogout.value.token = $q.cookies.get("token_bikini");
  let response = await getIp();
  fromLogout.value.lastIp = response;
});

watchEffect(async () => {
  // obtenendo datos de la store
  const getMenusStore = await useUser.getMenus();
  getMenu.value = getMenusStore;
  const getDataUser = await useUser.getUser();
  nameToShow.value = getDataUser.nameToShow;
  imgUser.value = getDataUser.profileImg;
});

const logout = async () => {
  let response = await postLogout(fromLogout.value);
  if (response) {
    $q.cookies.remove("token_bikini");
    localStorage.removeItem("user");
    location.replace("/login");
  } else location.replace("/login");
};

const closeNav = () => {
  open.value = false;
};

const selectedMenuItem = (menu) => {
  if (menu.id !== selectedMenuId.value) {
    selectedMenuId.value = menu.id;
    selectedMenuIdUser.value = null;
  }
};
const selectedMenuIdUser = ref(null);
const selectedMenuItemUser = () => {
  selectedMenuId.value = null;
  selectedMenuIdUser.value = true;
};
const deselectedMenuItem = () => {
  selectedMenuId.value = null;
  selectedMenuIdUser.value = null;
};

const redirectToMenu = (menu) => {
  if (menu.goTO.length > 3) router.push({ path: menu.goTO });
};

const redirectToSubMenu = (subMenu) => {
  if (subMenu.maintenance) {
    router.push("/maintenance");
  } else {
    router.push({ path: subMenu.goTo });
  }
};

const openSubMenuHover = (menu) => {
  getMenu.value.forEach((m) => {
    if (m !== menu) {
      m.showSubMenu = false;
    }
  });
  menu.showSubMenu = true;
};
</script>

<template lang="pug" scoped>
.header
  .dimmer-nav(:class="open ? 'open' : ''", @click="open = !open")
  .header__view
    .header__view-item(@click="open = !open")
      img(v-if="!open"
        src="../../assets/images/menu-hamburguesa.png",
        alt=""
      )
      img(v-if="open"
        src="../../assets/images/menu-navbar-close.png"
        )
    .header__view-logo
      img(
        src="../../assets/images/navbarlogo.png",
        alt="",
        @click="$router.push({ path: '/' }); open = false; deselectedMenuItem()"
      )
    .header__view-item
      img(
        v-if="$q.cookies.has('token_bikini')",
        :src="urlBaseImg + imgUser",
        @click="$router.push({ path: '/profile/' + `${nameToShow}` }); open = false; selectedMenuItemUser()"
      )
      img(
        v-if="!$q.cookies.has('token_bikini')",
        src="../../assets/images/usuario.png",
        alt="",
        @click="$router.push({ path: '/login' })"
      )
  #navbar-container
    .header__navbar(:class="open ? 'active-menu' : ''")
      .header__navbar-logo
        .header__navbar-logo-image
          img(
            @click="$router.push({ path: '/' }); deselectedMenuItem()",
            src="../../assets/images/navbarlogo.png",
            alt=""
          )
      ul.header__navbar-container(v-if="!$q.cookies.has('token_bikini')")
        li.header__navbar-container-items(
          @click="$router.push({ path: '/aboutus' })"
        ) About us
        li.header__navbar-container-items(
          @click="$router.push({ path: '/maintenance' })"
        ) Shop
        li.header__navbar-container-items(
          @click="$router.push({ path: '/maintenance' })"
        ) Memberships
        li.header__navbar-container-items(
          @click="$router.push({ path: '/maintenance' })"
        ) Blog
        li.header__navbar-container-items(
          @click="$router.push({ path: '/maintenance' })"
        ) Contact us
      ul.header__navbar-container(v-if="$q.cookies.has('token_bikini')")
        li.header__navbar-container-items(
          v-for="menu in getMenu",
          :key="menu.id",
          @click="redirectToMenu(menu); closeNav(); selectedMenuItem(menu)",
          :class="{ active: menu.id === selectedMenuId }",
          @mouseover="openSubMenuHover(menu)"
        ) {{ menu.name }}
          q-menu.qmenu(
            transition-show="scale",
            transition-hide="scale",
            v-model="menu.showSubMenu",
            @mouseleave="menu.showSubMenu = false"
          )
            q-list.qlist(style="min-width: 100px")
              q-item.qitem(
                clickable,
                v-for="subMenu in menu.menuSub",
                :key="subMenu.id",
                @click="redirectToSubMenu(subMenu); closeNav(); selectedMenuItem(menu)"
              )
                q-item-section.qitemsection {{ subMenu.name }}
      .header__navbar-user(@click="closeNav()")
        .header__navbar-user-login(v-if="!$q.cookies.has('token_bikini')")
          p.header__navbar-user-logout-user(@click="shopStore.setShowCart(true)") 
            |
            q-icon(name="shopping_cart", size="25px")
          p.header__navbar-user-logout-user(@click="$router.push({ path: '/register' })") Sign up
            q-icon(name="face", size="25px")
          p.header__navbar-user-logout-user(@click="$router.push({ path: '/login' })") Sign in
            q-icon(name="login", size="25px", padding="10px")
        .header__navbar-user-logout(v-if="$q.cookies.has('token_bikini')")
          p.header__navbar-user-logout-user(
            @click="$router.push({ path: '/profile/' + `${nameToShow}` }); selectedMenuItemUser()",
            :class="{ active: selectedMenuIdUser === true }"
          ) Hi! {{ nameToShow }}
            q-icon(size="30px")
              img.header__navbar-user-logout-user-image(
                :src="urlBaseImg + imgUser"
              )
          p.header__navbar-user-logout-user(@click="shopStore.setShowCart(true)") 
            |
            q-icon(name="shopping_cart", size="25px") {{ 1 }}
          p.header__navbar-user-logout-user(@click="logout") 
            |
            q-icon(name="logout", size="25px")
</template>

