<script setup>
import { onMounted, ref } from "vue";
import { useUserStore } from "src/stores/user";
import { productAdminApi } from "src/api/product/ProductAdmin";
import { alertService } from "src/libs/alert";
import { centerAdminApi } from "src/api/center/CenterAdmin";

const {
  getProducts,
  getStorageProducts,
  postStorageProducts,
  putStorageProducts,
} = productAdminApi();
const { ShowAlert } = alertService();
const { getALLCentersStorage } = centerAdminApi();

onMounted(async () => {
  // obteniendo datos de la store
  const responseUserStore = await useUser.getUser();

  let response = await getProducts();
  productsApi.value = response;

  let responseStorage = await getALLCentersStorage();
  centerStorageApi.value = responseStorage;

  addProductStorageApi.value.idUserCreate = responseUserStore.id;
  addProductStorageApi.value.idUserUpdate = responseUserStore.id;
});

let idStorage = ref(0);

let showModalStorage = ref(false);
const useUser = useUserStore();
const showModal = ref(false);
let productsApi = ref([]);
let productsStorageApi = ref([]);
let centerStorageApi = ref([]);

const addProductStorageApi = ref({
  id: 0, // ok
  idStorage: 0, // ok
  idProduct: 0, // ok
  idUserCreate: 0, // ok
  idUserUpdate: 0, // ok
  creationDate: new Date(), // ok
  updateDate: new Date(), // ok
  amount: 0,
  active: true,
  serialNumber: "",
  comments: "",
  maintenance: true,
});
// obteniendo productos de cada storage
let nameStorage = ref("");
const getStorageProductsApi = async (centerStorage) => {
  idStorage.value = centerStorage.id;
  nameStorage.value = centerStorage.name;
  let response = await getStorageProducts(idStorage.value);
  productsStorageApi.value = response;
  showModalStorage.value = true;
};

// agregando product storage
const uploadProductStorageApi = async () => {
  let response = await postStorageProducts(addProductStorageApi.value);
  productsStorageApi.value.push(response);
  if (response != null) addProductStorageApi.value.idStorage = 0;
  addProductStorageApi.value.idProduct = 0;
  addProductStorageApi.value.amount = 0;
  addProductStorageApi.value.serialNumber = "";
  addProductStorageApi.value.comments = "";
  ShowAlert("good!", "Product added successfully", "success");
};

// modificar
const selectedProductStorage = ref({
  id: 0,
  idStorage: 0,
  idProduct: 0,
  idUserCreate: 0,
  idUserUpdate: 0,
  creationDate: "",
  updateDate: new Date(),
  amount: 0,
  active: true,
  serialNumber: "",
  comments: "",
  maintenance: true,
});

// editar
const editSelectedProductStorage = (productStorage) => {
  selectedProductStorage.value = {
    id: productStorage.id,
    idStorage: productStorage.idStorage,
    idProduct: productStorage.idProduct,
    idUserCreate: productStorage.idUserCreate,
    idUserUpdate: productStorage.idUserUpdate,
    creationDate: productStorage.creationDate,
    updateDate: new Date(),
    amount: productStorage.amount,
    active: productStorage.active,
    serialNumber: productStorage.serialNumber,
    comments: productStorage.comments,
    maintenance: productStorage.maintenance,
  };
  showModal.value = true;
};

const updateProductStorage = async () => {
  // cargar datos actualizados sin actualizar la pagina
  let response = await getStorageProducts(idStorage.value);
  productsStorageApi.value = response;
};

const saveEditedProductStorage = async () => {
  let response = await putStorageProducts(selectedProductStorage.value);
  showModal.value = false;
  showModalStorage.value = false;
  await updateProductStorage();
  ShowAlert("good!", "Product updated successfully", "success");
};
</script>

<template lang="pug">
section
  .sys-Admin-Container
    .sys-Admin-Container-contenedor
      .sys-Admin-Container-contenedor-title
      .sys-Admin-Container__elements
        .sys-Admin-Container__elements--element(
          v-for="centerStorage in centerStorageApi",
          :key="centerStorage.id"
        )
          .center-container 
            q-icon(name="receipt", size="25px")
            p.sys-Admin-Container__elements--element-item {{ centerStorage.name }}
          .sys-Admin-Container__elements--element-buttons
            q-btn.sys-Admin-Container__elements--element-buttons-button(
              @click="getStorageProductsApi(centerStorage)"
            ) show products
        q-dialog.popup-container__dialog(v-model="showModalStorage")
          q-card.popup-container__dialog--card
            q-card-section.section-product
              .section-product-title
                h4 Products
                p Storage: {{ nameStorage }}
              .section-product-storage
                .section-product-storage-item(
                  v-for="productStorage in productsStorageApi",
                  :key="productStorage.id"
                )
                  p {{ productStorage.product }}
                  q-btn(@click="editSelectedProductStorage(productStorage)") edit

            q-card-actions.popup-container__dialog--card-actions(
              align="center"
            )
              q-btn.popup-container__dialog--card-actions-botton(
                label="Close",
                @click="showModalStorage = false"
              )
        q-dialog.popup-container__dialog(v-model="showModal")
          q-card.popup-container__dialog--card
            q-card-section.popup-container__dialog--card-section
              q-form.popup-container__dialog--card-section-form(@submit="saveEditedProductStorage")
                select.popup-container__dialog--card-section-form-select(
                  v-model="selectedProductStorage.idStorage"
                )
                  option(:value="0", disabled) Select a Storage
                  option(
                    v-for="centerStorage in centerStorageApi",
                    :value="centerStorage.id",
                    :key="centerStorage.id"
                  ) {{ centerStorage.name }}
                select.popup-container__dialog--card-section-form-select(
                  v-model="selectedProductStorage.idProduct"
                )
                  option(:value="0", disabled) Select a product
                  option(
                    v-for="product in productsApi",
                    :value="product.id",
                    :key="product.id"
                  ) {{ product.name }}

                q-input.popup-container__dialog--card-section-form-input(
                  v-model="selectedProductStorage.amount",
                  label="Amount"
                  filled,
                lazy-rules,
                :rules="[(val) => (val && val.length > 0) || 'Please type Amount']"
                )
                q-input.popup-container__dialog--card-section-form-input(
                  v-model="addProductStorageApi.serialNumber",
                  type="text"
                  label="Serial number"
                  filled,
                lazy-rules,
                :rules="[(val) => (val && val.length > 0) || 'Please type Serial Number']"
                )
                q-input.popup-container__dialog--card-section-form-input(
                  v-model="selectedProductStorage.comments",
                  label="Comments"
                  filled,
                lazy-rules,
                :rules="[(val) => (val && val.length > 0) || 'Please type Comments']"
                )
                q-checkbox.popup-container__dialog--card-section-form-checkbox(
                  v-model="selectedProductStorage.active",
                  label="Active"
                )
                q-checkbox.popup-container__dialog--card-section-form-checkbox(
                  v-model="selectedProductStorage.maintenance",
                  label="maintenance"
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
          h4.title-Product-storage Add product to storage
        q-form.sys-Admin-Container__Add--form(@submit.prevent="uploadProductStorageApi()")
          select.sys-Admin-Container__Add--form-select(
            v-model="addProductStorageApi.idStorage"
          )
            option(:value="0", disabled) Select a storage
            option(
              v-for="centerStorage in centerStorageApi",
              :value="centerStorage.id",
              :key="centerStorage.id"
            ) {{ centerStorage.name }}
          select.sys-Admin-Container__Add--form-select(
            v-model="addProductStorageApi.idProduct"
          )
            option(:value="0", disabled) Select a product
            option(
              v-for="product in productsApi",
              :value="product.id",
              :key="product.id"
            ) {{ product.name }}
          q-input.sys-Admin-Container__Add--form-input(
            type="text",
            label="Amount",
            v-model="addProductStorageApi.amount"
            filled,
                lazy-rules,
                :rules="[(val) => (val && val.length > 0) || 'Please type Amount']"
          )
          q-input.sys-Admin-Container__Add--form-input(
            type="text",
            label="Serial number",
            v-model="addProductStorageApi.serialNumber"
            filled,
                lazy-rules,
                :rules="[(val) => (val && val.length > 0) || 'Please type Serial Number']"
          )
          q-input.sys-Admin-Container__Add--form-input(
            type="text",
            label="Comments",
            v-model="addProductStorageApi.comments"
            filled,
                lazy-rules,
                :rules="[(val) => (val && val.length > 0) || 'Please type Comments']"
          )

          q-btn.sys-Admin-Container__Add--form-button(
            type="submit",
            label=" Add product Storage"
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

.section-product {
  font-family: Montserrat;
  line-height: 1.1em;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  &-title {
    text-align: center;
    & h4 {
      font-weight: 700;
    }
    & p {
    }
  }
  &-storage {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
    &-item {
      display: flex;
      flex-direction: column;
      & p {
        text-align: center;
        font-size: 18px;
        font-weight: 650;
      }
      & button {
        color: $primary;
        font-weight: 700;
      }
    }
  }
}

.title-Product-storage {
  text-align: center;
  margin: 2%;
}
</style>