<script setup>
import { onMounted, ref, computed, watchEffect } from "vue";
import { useUserStore } from "src/stores/user";
import { productAdminApi } from "src/api/product/ProductAdmin";
import { alertService } from "src/libs/alert";

const {
  getPackages,
  postPackages,
  putPackages,
  postPackageImg,
  postPackagesProducts,
  putPackagesProducts,
  getProducts,
} = productAdminApi();
const { ShowAlert } = alertService();

const urlBaseImg = import.meta.env.BASE_URL + "resources/";
const useUser = useUserStore();
const packagesApi = ref([]);
const productsApi = ref([]);
const packageProductsApi = ref([]);
const showModal = ref(false);
const showModal3 = ref(false);

const addPackagePhotoApi = ref({
  idUser: 0,
  idPackage: 0,
  file: null,
  fileName: "",
});

const addPackageApi = ref({
  id: 0,
  idUserCreate: 0,
  idUserUpdate: 0,
  creationDate: new Date(),
  updateDate: new Date(),
  name: "",
  description: "",
  img: "packagedefault.png",
  active: true,
});

const selectedPackage = ref({
  id: 0,
  idUserCreate: 0,
  idUserUpdate: 0,
  creationDate: "",
  updateDate: new Date(),
  name: "",
  description: "",
  img: "packagedefault.png",
  active: true,
});

const addPackageProduct = ref({
  idPackage: 0,
  idUser: 0,
  idProduct: 0,
});

const packageInFocus = ref({
  id: 0,
  idUserCreate: 0,
  idUserUpdate: 0,
  creationDate: "",
  updateDate: new Date(),
  name: "",
  description: "",
  img: "packagedefault.png",
  active: true,
  userCreate: "",
  userUpdate: "",
  products: [],
});

onMounted(async () => {
  // obteniendo datos de la store
  const responseUserStore = await useUser.getUser();

  let response = await getPackages();
  packagesApi.value = response;

  let responseProducts = await getProducts();
  productsApi.value = responseProducts;

  addPackageApi.value.idUserCreate = responseUserStore.id;
  addPackageApi.value.idUserUpdate = responseUserStore.id;
  addPackageProduct.value.idUser = responseUserStore.id;

  let imagen =
    response.img != "packagedefault.png"
      ? "resources/" + response.img
      : "resources/packagedefault.png";
  imgChange(imagen);
});

const imgChange = (url) => {
  let src = import.meta.env.BASE_URL + url;
  let img = document.getElementById("img-profile-change");
  /* img.src = src; */
};

const onFileSelected = async (input) => {
  let inputFile = input.files[0];
  let id = 0;
  const responseUserStore = await useUser.getUser();
  id = responseUserStore.id;
  addPackagePhotoApi.value.fileName = selectedPackage.value.img;
  let dat = new FormData();
  addPackagePhotoApi.value.idPackage = selectedPackage.value.id;
  dat.append("idUser", id);
  dat.append("idPackage", addPackagePhotoApi.value.idPackage);
  dat.append("fileName", addPackagePhotoApi.value.fileName);
  dat.append("file", inputFile);
  let response = await postPackageImg(dat);
  if (response.success) {
    input.value = "";
    packageInFocus.value.img = response.name;
    // ShowAlert("good!", "image updated successfully", "success");
  } else ShowAlert("Error!", "Please contact support!", "success");
};

//  no se muestras las membresías
const filteredProduct = computed(() => {
  return productsApi.value.filter((classe) => classe.type != "Memberships");
});

// agregando paquete
const uploadPackageApi = async () => {
  let response = await postPackages(addPackageApi.value);
  packagesApi.value.push(response);
  if (response != null) addPackageApi.value.name = 0;
  addPackageApi.value.description = 0;
  ShowAlert("good!", "package added successfully", "success");
};
// agregando productos al paquete
const uploadPackageProductApi = async () => {
  let response = await postPackagesProducts(addPackageProduct.value);
  packageProductsApi.value.push(response);
  if (response != null) {
    const product = productsApi.value.find(
      (product) => product.id === addPackageProduct.value.idProduct
    );
    packageInFocus.value.products.push(product);
    ShowAlert("good!", "Product added package successfully", "success");
  }
};

// editar
const editSelectedPackage = (packages) => {
  selectedPackage.value = {
    id: packages.id,
    idUserCreate: packages.idUserCreate,
    idUserUpdate: packages.idUserUpdate,
    creationDate: packages.creationDate,
    updateDate: new Date(),
    name: packages.name,
    description: packages.description,
    img: packages.img,
    active: packages.active,
  };
  showModal.value = true;
};

const showProducts = async (packages) => {
  packageInFocus.value = packages;
  showModal3.value = true;
};

const deleteProduct = {
  idPackage: 0,
  idUser: 0,
  idProduct: 0,
};

const deleteProductPackage = async (packageInFocus, product) => {
  let responseUserStore = await useUser.getUser();
  deleteProduct.value = {
    idPackage: packageInFocus.id,
    idUser: responseUserStore.id,
    idProduct: product.id,
  };
  let response = await putPackagesProducts(deleteProduct.value);
  if (response) {
    let arrynew = packageInFocus.products.filter((pro) => {
      return pro.id != product.id;
    });
    packageInFocus.products = Object.assign([], arrynew);
  }
};

const updatePackage = async () => {
  // cargar datos actualizados sin actualizar la pagina
  let response = await getPackages();
  packagesApi.value = response;
};

const saveEditedPackage = async () => {
  let response = await putPackages(selectedPackage.value);
  showModal.value = false;
  await updatePackage();
  ShowAlert("good!", "Package updated successfully", "success");
};
</script>

<template lang="pug">
section
  .sys-Admin-Container
    .sys-Admin-Container-contenedor
      .sys-Admin-Container-contenedor-title
        h4 Packages
      .sys-Admin-Container__elements
        .sys-Admin-Container__elements--element(
          v-for="packages in packagesApi",
          :key="packages.id"
        )
          .center-container 
            q-icon(name="view_in_ar", size="25px")
            p.sys-Admin-Container__elements--element-item {{ packages.name }}
          .sys-Admin-Container__elements--element-buttons
            q-btn.sys-Admin-Container__elements--element-buttons-button(
              @click="editSelectedPackage(packages)"
            ) edit
            q-btn.sys-Admin-Container__elements--element-buttons-button(
              @click="showProducts(packages)"
            ) view products
            q-btn.sys-Admin-Container__elements--element-buttons-button Delet
        q-dialog.popup-container__dialog(v-model="showModal3")
          q-card.popup-container__dialog--card
            q-card-section.popup-container__dialog--card-section(
              v-if="packageInFocus.products.length != 0"
            )
              p Package: {{ packageInFocus.name }}
              div(
                v-for="product in packageInFocus.products",
                :key="product.id"
              ) 
                |
                p {{ product.name }}
                p {{ product.clientCost }}
                p {{ product.description }}
                img.package-Imagen-Product(:src="urlBaseImg + product.img")
                q-btn(@click="deleteProductPackage(packageInFocus, product)") X
            q-card-actions.popup-container__dialog--card-actions(
              align="center"
            )
              q-btn.popup-container__dialog--card-actions-botton(
                label="Cancel",
                @click="showModal3 = false"
              )
        q-dialog.popup-container__dialog(v-model="showModal")
          q-card.popup-container__dialog--card
            q-card-section.popup-container__dialog--card-section
              q-form.popup-container__dialog--card-section-form(
                @submit.prevent="saveEditedPackage"
              )
                .popup-container__dialog--card-section-form-image
                  img.popup-container__dialog--card-section-form-image-img(
                    :src="urlBaseImg + packageInFocus.img"
                  )
                  input#img-profile-change(
                    type="file",
                    @change="onFileSelected($event.target)"
                  )

                q-input.popup-container__dialog--card-section-form-input(
                  v-model="selectedPackage.name",
                  label="Name",
                  filled,
                  lazy-rules,
                  :rules="[(val) => (val && val.length > 0) || 'Please type Name']"
                )
                q-input.popup-container__dialog--card-section-form-input(
                  v-model="selectedPackage.description",
                  label="description",
                  filled,
                  lazy-rules,
                  :rules="[(val) => (val && val.length > 0) || 'Please type Description']"
                )
                q-checkbox.popup-container__dialog--card-section-form-checkbox(
                  v-model="selectedPackage.active",
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
            @submit.prevent="uploadPackageApi()"
          )
            //- div
            //-   img.sys-Admin-Container__Add--form-image(:src="imgUrl")
            //-   input(type="file")
            q-input.sys-Admin-Container__Add--form-input(
              type="text",
              label="Name",
              v-model="addPackageApi.name",
              filled,
              lazy-rules,
              :rules="[(val) => (val && val.length > 0) || 'Please type Name']"
            )
            q-input.sys-Admin-Container__Add--form-input(
              type="text",
              label="Description",
              v-model="addPackageApi.description",
              filled,
              lazy-rules,
              :rules="[(val) => (val && val.length > 0) || 'Please type Description']"
            )
            q-btn.sys-Admin-Container__Add--form-button(
              type="submit",
              label="Add package"
            ) 
    .sys-Admin-Container-contenedor
      .sys-Admin-Container-contenedor-title
        h4 Add products to package
      .sys-Admin-Container__elements
        .sys-Admin-Container__elements--element
          //- p.sys-Admin-Container__elements--element-item {{ packageProducts.name }}
          //- .sys-Admin-Container__elements--element-buttons
          //-   q-btn.sys-Admin-Container__elements--element-buttons-button(
          //-     @click="editSelectedPackage(packages)"
          //-   ) edit
          //-   q-btn.sys-Admin-Container__elements--element-buttons-button Delet
        .sys-Admin-Container__Add
        q-form.sys-Admin-Container__Add--form(
          @submit.prevent="uploadPackageProductApi()"
        )
          select.sys-Admin-Container__Add--form-select(
            v-model="addPackageProduct.idPackage"
          )
            option(:value="0", disabled) Package reference
            option(
              v-for="packages in packagesApi",
              :value="packages.id",
              :key="packages.id"
            ) {{ packages.name }}
          select.sys-Admin-Container__Add--form-select(
            v-model="addPackageProduct.idProduct"
          )
            option(:value="0", disabled) Select a Product
            option(
              v-for="product in filteredProduct",
              :value="product.id",
              :key="product.id"
            ) {{ product.name }}

          q-btn.sys-Admin-Container__Add--form-button(
            type="submit",
            label="Add to package"
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

.sys-Admin-Container__Add--form-image {
  width: 100px;
  height: 100px;
}

.package-Imagen-Product {
  width: 100px;
  height: 100px;
}
</style>
