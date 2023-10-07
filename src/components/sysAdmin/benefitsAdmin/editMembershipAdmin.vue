<script setup>
import { onMounted, ref, computed } from "vue";
import { useUserStore } from "src/stores/user";
import { catalogueProductsAdminApi } from "src/api/catalogue/CatalogueProductsAdmin";
import { productAdminApi } from "src/api/product/ProductAdmin";
import { alertService } from "src/libs/alert";
import { cataloguePartnerTypesAdminApi } from "src/api/catalogue/CataloguePartnerTypesAdmin";

const { getProducts, postProducts, putProducts } = productAdminApi();
const { ShowAlert } = alertService();
const { getProductTypes } = catalogueProductsAdminApi();
const { getPartners } = cataloguePartnerTypesAdminApi();

const urlBaseImg = import.meta.env.BASE_URL + "resources/";
const useUser = useUserStore();
const showModal = ref(false);
let productsApi = ref([]);
let catalogueProductTypes = ref([]);
let cataloguePartners = ref([]);

onMounted(async () => {
  // obteniendo datos de la store
  const responseUserStore = await useUser.getUser();

  let response = await getProducts();
  productsApi.value = response;

  let responseTypes = await getProductTypes();
  catalogueProductTypes.value = responseTypes;

  let responsePartnersApi = await getPartners();
  cataloguePartners.value = responsePartnersApi;

  addProductApi.value.idUserCreate = responseUserStore.id;
  addProductApi.value.idUserUpdate = responseUserStore.id;
});



//  solo se muestras las membresías (productos)
const filteredProduct = computed(() => {
  return productsApi.value.filter((elemento) => elemento.category === "memberships");
});

//  solo se muestran tipo las membresías
const filteredType = computed(() => {
  return catalogueProductTypes.value.filter((id) => id.idCategory === 5
  );
  // cambiar el 5 por el nombre de al categoría cuando yeison me haga el cambio en el enpoint
});

//------ producto
const addProductApi = ref({
  id: 0,
  idType: 0,
  idPartner: 0,
  idUserCreate: 0,
  idUserUpdate: 0,
  name: "",
  creationDate: new Date(),
  description: "",
  cost: 0,
  clientCost: 0,
  taxes: 0,
  activeSale: true,
  img: "productdefault.png",
  barCode: "",
});

// agregando
const uploadProductApi = async () => {
  let response = await postProducts(addProductApi.value);
  productsApi.value.push(response);
  if (response != null) addProductApi.value.name = "";
  addProductApi.value.description = "";
  addProductApi.value.idType = 0;
  addProductApi.value.idPartner = 0;
  // addProductApi.value.img = ""
  addProductApi.value.cost = 0;
  addProductApi.value.clientCost = 0;
  addProductApi.value.taxes = 0;
  addProductApi.value.barCode = 0;
  imgUrl.value = "";
  ShowAlert("good!", "Product added successfully", "success");
};

// modificar
const selectedProduct = ref({
  id: 0,
  idType: 0,
  idPartner: 0,
  idUserCreate: 0,
  idUserUpdate: 0,
  creationDate: "",
  name: "",
  description: "",
  cost: 0,
  clientCost: 0,
  taxes: 0,
  activeSale: true,
  img: "",
  barCode: "",
});

// editar
const editSelectedProduct = (product) => {
  selectedProduct.value = {
    id: product.id,
    idType: product.idType,
    idPartner: 0, // pendiente que envie yeison en el getProduct el id el partner
    idUserCreate: product.idUserCreate,
    idUserUpdate: product.idUserUpdate,
    creationDate: product.creationDate,
    updateDate: new Date(),
    name: product.name,
    description: product.description,
    cost: product.cost,
    clientCost: product.clientCost,
    taxes: product.taxes,
    activeSale: product.activeSale,
    img: product.img,
    barCode: product.barCode,
  };
  showModal.value = true;
};

const updateProduct = async () => {
  // cargar datos actualizados sin actualizar la pagina
  let response = await getProducts();
  productsApi.value = response;
};

const saveEditedProduct = async () => {
  let response = await putProducts(selectedProduct.value);
  showModal.value = false;
  await updateProduct();
  ShowAlert("good!", "Product updated successfully", "success");
};
const imgUrl = ref("");

const onFileSelected = (event) => {
  const selectedFile = event.target.files[0];
  const reader = new FileReader();
  reader.onload = () => {
    imgUrl.value = reader.result;
  };
  reader.readAsDataURL(selectedFile);
  addProductApi.value.img = selectedFile.name;
};
</script>

<template lang="pug">
section
  .sys-Admin-Container 
    .sys-Admin-Container__elements
      .sys-Admin-Container__elements--element(
        v-for="product in filteredProduct",
        :key="product.id"
      )
        .center-container 
          q-icon(name="redeem", size="25px")
          p.sys-Admin-Container__elements--element-item {{ product.name }}
        .sys-Admin-Container__elements--element-buttons
          q-btn.sys-Admin-Container__elements--element-buttons-button(
            @click="editSelectedProduct(product)"
          ) edit
          q-btn.sys-Admin-Container__elements--element-buttons-button Delet
      q-dialog.popup-container__dialog(v-model="showModal")
        q-card.popup-container__dialog--card
          q-card-section.popup-container__dialog--card-section
            q-form.popup-container__dialog--card-section-form(@submit.prevent="saveEditedProduct")
              |
              .popup-container__dialog--card-section-form-image
                img.popup-container__dialog--card-section-form-image-img(
                  :src="urlBaseImg + selectedProduct.img"
                )
                input(type="file", @change="onFileSelected")
              select.popup-container__dialog--card-section-form-select(
                v-model="selectedProduct.idType"
              )
                option(:value="0", disabled) Select a Type
                option(
                  v-for="catalogueProductType in filteredType",
                  :value="catalogueProductType.id",
                  :key="catalogueProductType.id"
                ) {{ catalogueProductType.name }}
              select.popup-container__dialog--card-section-form-select(
                v-model="selectedProduct.idPartner"
              )
                option(:value="0", disabled) Select a Partner
                option(
                  v-for="cataloguePartner in cataloguePartners",
                  :value="cataloguePartner.id",
                  :key="cataloguePartner.id"
                ) {{ cataloguePartner.name }}
              q-input.popup-container__dialog--card-section-form-input(
                v-model="selectedProduct.name",
                label="Name",
                filled,
                lazy-rules,
                :rules="[(val) => (val && val.length > 0) || 'Please type Name']"
              )
              q-input.popup-container__dialog--card-section-form-input(
                v-model="selectedProduct.description",
                label="Description",
                filled,
                lazy-rules,
                :rules="[(val) => (val && val.length > 0) || 'Please type Description']"
              )
              q-input.popup-container__dialog--card-section-form-input(
                v-model="selectedProduct.cost",
                label="Cost",
                filled,
                lazy-rules,
                :rules="[(val) => (val && val.length > 0) || 'Please type Cost']"
              )
              q-input.popup-container__dialog--card-section-form-input(
                v-model="selectedProduct.clientCost",
                label="Client cost",
                filled,
                lazy-rules,
                :rules="[(val) => (val && val.length > 0) || 'Please type Client cost']"
              )
              q-input.popup-container__dialog--card-section-form-input(
                v-model="selectedProduct.taxes",
                label="Taxes",
                filled,
                lazy-rules,
                :rules="[(val) => (val && val.length > 0) || 'Please type Taxes']"
              )
              q-input.popup-container__dialog--card-section-form-input(
                v-model="selectedProduct.barCode",
                label="Bar code",
                filled,
                lazy-rules,
                :rules="[(val) => (val && val.length > 0) || 'Please type Bar code']"
              )
              q-checkbox.popup-container__dialog--card-section-form-checkbox(
                v-model="selectedProduct.activeSale",
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
        @submit.prevent="uploadProductApi()"
      )
        select.sys-Admin-Container__Add--form-select(
          v-model="addProductApi.idType"
        )
          option(:value="0", disabled) Select a type
          option(
            v-for="catalogueProductType in filteredType",
            :value="catalogueProductType.id",
            :key="catalogueProductType.id"
          ) {{ catalogueProductType.name }}
        select.sys-Admin-Container__Add--form-select(
          v-model="addProductApi.idPartner"
        )
          option(:value="0", disabled) Select a partner
          option(
            v-for="cataloguePartner in cataloguePartners",
            :value="cataloguePartner.id",
            :key="cataloguePartner.id"
          ) {{ cataloguePartner.name }}
        //- div
        //-   img.sys-Admin-Container__Add--form-image(:src="imgUrl")
        //-   input(type="file", @change="onFileSelected")

        q-input.sys-Admin-Container__Add--form-input(
          type="text",
          label="Name",
          v-model="addProductApi.name",
          filled,
          lazy-rules,
          :rules="[(val) => (val && val.length > 0) || 'Please type Name']"
        )
        q-input.sys-Admin-Container__Add--form-input(
          type="text",
          label="Description",
          v-model="addProductApi.description",
          filled,
          lazy-rules,
          :rules="[(val) => (val && val.length > 0) || 'Please type Description']"
        )
        q-input.sys-Admin-Container__Add--form-input(
          type="number",
          label="Cost",
          v-model="addProductApi.cost",
          filled,
          lazy-rules,
          :rules="[(val) => (val && val.length > 0) || 'Please type Cost']"
        )
        q-input.sys-Admin-Container__Add--form-input(
          type="number",
          label="Client cost",
          v-model="addProductApi.clientCost",
          filled,
          lazy-rules,
          :rules="[(val) => (val && val.length > 0) || 'Please type Client cost']"
        )
        q-input.sys-Admin-Container__Add--form-input(
          type="number",
          label="Taxes",
          v-model="addProductApi.taxes",
          filled,
          lazy-rules,
          :rules="[(val) => (val && val.length > 0) || 'Please type Taxes']"
        )
        q-input.sys-Admin-Container__Add--form-input(
          type="text",
          label="Bar code",
          v-model="addProductApi.barCode",
          filled,
          lazy-rules,
          :rules="[(val) => (val && val.length > 0) || 'Please type Bar code']"
        )
        q-btn.sys-Admin-Container__Add--form-button(
          type="submit",
          label="Add Membership"
        ) 
</template>

<style lang="scss">

</style>