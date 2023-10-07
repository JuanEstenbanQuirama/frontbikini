<script setup>
import { onMounted, ref, computed } from "vue";
import { catalogueProductsAdminApi } from "../../../api/catalogue/CatalogueProductsAdmin";
import { alertService } from "src/libs/alert";

const {
  getProductCategories,
  putProductCategories,
  postProductCategories,
  getProductTypes,
  putProductTypes,
  postProductTypes,
} = catalogueProductsAdminApi();
const { ShowAlert, ShowAlertConfirm } = alertService();

let catalogueProductTypes = ref([]);
let catalogueProductCategories = ref([]);
const showModal = ref(false);
const showModalTypes = ref(false);
let idProductCategory = ref(0);
let idProductType = ref(0);

onMounted(async () => {
  let responseCategorie = await getProductCategories();
  catalogueProductCategories.value = responseCategorie;

  let responseProductTypes = await getProductTypes();
  catalogueProductTypes.value = responseProductTypes;
});

const addProductCategoryApi = ref({
  name: "",
  active: true,
});

// agregando
const uploadProductCategoryApi = async () => {
  let response = await postProductCategories(addProductCategoryApi.value);
  catalogueProductCategories.value.push(response);
  if (response != null) addProductCategoryApi.value.name = "";
  ShowAlert("good!", "Category added successfully", "success");
};

// modificar
const selectedProductCategory = ref({
  name: "",
  active: true,
});

// editar
const editSelectedProductCategory = (productCategory) => {
  idProductCategory.value = productCategory.id;
  selectedProductCategory.value = {
    name: productCategory.name,
    active: productCategory.active,
  };
  showModal.value = true;
};

const updateProductCategory = async () => {
  // cargar datos actualizados sin actualizar la pagina
  let response = await getProductCategories();
  catalogueProductCategories.value = response;
};

// actualizar
const saveEditedProductCategory = async () => {
  let response = await putProductCategories(
    idProductCategory.value,
    selectedProductCategory.value
  );
  showModal.value = false;
  await updateProductCategory();
  ShowAlert("good!", "Category updated successfully", "success");
};

const addProductTypeApi = ref({
  idCategory: 0,
  name: "",
  active: true,
});

// agregando
const uploadProductTypeApi = async () => {
  let response = await postProductTypes(addProductTypeApi.value);
  catalogueProductTypes.value.push(response);
  if (response != null) addProductTypeApi.value.name = "";
  addProductTypeApi.value.idCategory = 0;
  ShowAlert("Good!", "Type added successfully", "Success");
};

// modificar
const selectedProductType = ref({
  idCategory: 0,
  name: "",
  active: true,
});

// editar
const editSelectedProductType = (productType) => {
  idProductType.value = productType.id;
  selectedProductType.value = {
    idCategory: productType.idCategory,
    name: productType.name,
    active: productType.active,
  };
  showModalTypes.value = true;
};

const updateProductType = async () => {
  // cargar datos actualizados sin actualizar la pagina
  let response = await getProductTypes();
  catalogueProductTypes.value = response;
};

// actualizar
const saveEditedProductType = async () => {
  let response = await putProductTypes(
    idProductType.value,
    selectedProductType.value
  );
  showModalTypes.value = false;
  await updateProductType();
  ShowAlert("Good!", "Type updated successfully", "Success");
};
</script>

<template lang="pug">
section
  .sys-Admin-Container
    .sys-Admin-Container-contenedor
      .sys-Admin-Container-contenedor-title
        h4 Categories
      .sys-Admin-Container__elements
        .sys-Admin-Container__elements--element(
          v-for="catalogueProductCategory in catalogueProductCategories",
          :key="catalogueProductCategory.id"
        )
          .center-container 
            q-icon(name="category", size="25px")
            p.sys-Admin-Container__elements--element-item {{ catalogueProductCategory.name }}
          .sys-Admin-Container__elements--element-buttons
            q-btn.sys-Admin-Container__elements--element-buttons-button(
              @click="editSelectedProductCategory(catalogueProductCategory)"
            ) edit
            q-btn.sys-Admin-Container__elements--element-buttons-button Delet
        q-dialog.popup-container__dialog(v-model="showModal")
          q-card.popup-container__dialog--card
            q-card-section.popup-container__dialog--card-section
              q-form.popup-container__dialog--card-section-form(
                @submit.prevent="saveEditedProductCategory"
              )
                q-input.popup-container__dialog--card-section-form-input(
                  v-model="selectedProductCategory.name",
                  label="Name",
                  filled,
                  lazy-rules,
                  :rules="[(val) => (val && val.length > 0) || 'Please type Name']"
                )
                q-checkbox.popup-container__dialog--card-section-form-checkbox(
                  v-model="selectedProductCategory.active",
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
          @submit.prevent="uploadProductCategoryApi()"
        )
          q-input.sys-Admin-Container__Add--form-input(
            type="text",
            label="New  name",
            v-model="addProductCategoryApi.name",
            filled,
            lazy-rules,
            :rules="[(val) => (val && val.length > 0) || 'Please type Name']"
          )
          q-btn.sys-Admin-Container__Add--form-button(
            type="submit",
            label="Add Category"
          ) 
    .sys-Admin-Container-contenedor
      .sys-Admin-Container-contenedor-title
        h4 Types
      .sys-Admin-Container__elements
        .sys-Admin-Container__elements--element(
          v-for="catalogueProductType in catalogueProductTypes",
          :key="catalogueProductType.id"
        )
          .center-container 
            q-icon(name="pentagon", size="25px")
            p.sys-Admin-Container__elements--element-item {{ catalogueProductType.name }}
          .sys-Admin-Container__elements--element-buttons
            q-btn.sys-Admin-Container__elements--element-buttons-button(
              @click="editSelectedProductType(catalogueProductType); selectedProductTypeId(catalogueProductType)"
            ) edit
            q-btn.sys-Admin-Container__elements--element-buttons-button Delet
        q-dialog.popup-container__dialog(v-model="showModalTypes")
          q-card.popup-container__dialog--card
            q-card-section.popup-container__dialog--card-section
              q-form.popup-container__dialog--card-section-form(
                @submit.prevent="saveEditedProductType"
              )
                q-input.popup-container__dialog--card-section-form-input(
                  v-model="selectedProductType.name",
                  label="Name",
                  filled,
                  lazy-rules,
                  :rules="[(val) => (val && val.length > 0) || 'Please type Name']"
                )
                select.popup-container__dialog--card-section-form-select(
                  v-model="selectedProductType.idCategory"
                )
                  option(:value="0", disabled) Select a Category
                  option(
                    v-for="catalogueProductCategory in catalogueProductCategories",
                    :value="catalogueProductCategory.id",
                    :key="catalogueProductCategory.id"
                  ) {{ catalogueProductCategory.name }}
                q-checkbox.popup-container__dialog--card-section-form-checkbox(
                  v-model="selectedProductType.active",
                  label="Active"
                ) 
                q-card-actions.popup-container__dialog--card-actions(
                  align="center"
                )
                  q-btn.popup-container__dialog--card-actions-botton(
                    label="Cancel",
                    @click="showModalTypes = false"
                  )
                  q-btn.popup-container__dialog--card-actions-botton(
                    label="Save",
                    type="submit"
                  )
      .sys-Admin-Container__Add
        q-form.sys-Admin-Container__Add--form(
          @submit.prevent="uploadProductTypeApi()"
        )
          q-input.sys-Admin-Container__Add--form-input(
            type="text",
            label="Name",
            v-model="addProductTypeApi.name",
            filled,
            lazy-rules,
            :rules="[(val) => (val && val.length > 0) || 'Please type Description']"
          )
          select.sys-Admin-Container__Add--form-select(
            v-model="addProductTypeApi.idCategory"
          )
            option(:value="0", disabled) Select a Category
            option(
              v-for="catalogueProductCategory in catalogueProductCategories",
              :value="catalogueProductCategory.id",
              :key="catalogueProductCategory.id"
            ) {{ catalogueProductCategory.name }}
          q-btn.sys-Admin-Container__Add--form-button(
            type="submit",
            label="Add type"
          ) 
</template>