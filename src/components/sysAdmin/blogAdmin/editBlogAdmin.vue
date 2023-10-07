<script setup>
import { onMounted, ref } from "vue";
import { catalogueBlogAdminApi } from "src/api/catalogue/CatalogueBlogAdmin";
import { alertService } from "src/libs/alert";

const {
  getBlogCategories,
  putBlogCategories,
  postBlogCategories,
  getBlogStatuses,
  putBlogStatuses,
  postBlogStatuses,
  getBlogTopics,
  putBlogTopics,
  postBlogTopics,
} = catalogueBlogAdminApi();
const { ShowAlert, ShowAlertConfirm } = alertService();

onMounted(async () => {
  let responsBlogCategories = await getBlogCategories();
  catalogueBlogCategories.value = responsBlogCategories;

  let responseBlogStatuses = await getBlogStatuses();
  catalogueBlogStatuses.value = responseBlogStatuses;

  let responseBlogTopics = await getBlogTopics();
  catalogueBlogTopics.value = responseBlogTopics;
});

// -------categorias
let catalogueBlogCategories = ref("");
const showModal = ref(false);
let idBlogCategory = ref(0);

const addBlogCategoryApi = ref({
  name: "",
  description: "",
  active: true,
});

// agregando
const uploadBlogCategoryApi = async () => {
  let response = await postBlogCategories(addBlogCategoryApi.value);
  catalogueBlogCategories.value.push(response);
  if (response != null) addBlogCategoryApi.value.name = "";
  addBlogCategoryApi.value.description = "";
  ShowAlert("good!", "Category added successfully", "success");
};

// modificar
const selectedBlogCategory = ref({
  name: "",
  description: "",
  active: true,
});

// editar
const editSelectedBlogCategory = (blogCategory) => {
  idBlogCategory.value = blogCategory.id;
  selectedBlogCategory.value = {
    name: blogCategory.name,
    description: blogCategory.description,
    active: blogCategory.active,
  };
  showModal.value = true;
};

const updateBlogCategory = async () => {
  // cargar datos actualizados sin actualizar la pagina
  let response = await getBlogCategories();
  catalogueBlogCategories.value = response;
};

// actualizar
const saveEditedBlogCategory = async () => {
  let response = await putBlogCategories(
    idBlogCategory.value,
    selectedBlogCategory.value
  );
  showModal.value = false;
  await updateBlogCategory();
  ShowAlert("good!", "Category updated successfully", "success");
};

// ----------statuses
let catalogueBlogStatuses = ref("");
const showModalStatus = ref(false);
let idBlogStatus = ref(0);

const addBlogStatusApi = ref({
  name: "",
  active: true,
});

// agregando
const uploadBlogStatusApi = async () => {
  let response = await postBlogStatuses(addBlogStatusApi.value);
  catalogueBlogStatuses.value.push(response);
  if (response != null) addBlogStatusApi.value.name = "";
  ShowAlert("good!", "Status added successfully", "success");
};

// modificar
const selectedBlogStatus = ref({
  name: "",
  active: true,
});

// editar
const editSelectedBlogStatus = (blogStatus) => {
  idBlogStatus.value = blogStatus.id;
  selectedBlogStatus.value = {
    name: blogStatus.name,
    active: blogStatus.active,
  };
  showModalStatus.value = true;
};

const updateBlogStatus = async () => {
  // cargar datos actualizados sin actualizar la pagina
  let response = await getBlogStatuses();
  catalogueBlogStatuses.value = response;
};

// actualizar
const saveEditedBlogStatus = async () => {
  let response = await putBlogStatuses(
    idBlogStatus.value,
    selectedBlogStatus.value
  );
  showModalStatus.value = false;
  await updateBlogStatus();
  ShowAlert("good!", "Status updated successfully", "success");
};

// -----------topics
let catalogueBlogTopics = ref("");
const showModalTopics = ref(false);
let idBlogTopic = ref(0);

const addBlogTopicApi = ref({
  idCategory: 0,
  name: "",
  description: "",
  active: true,
});

// agregando
const uploadBlogTopicApi = async () => {
  let response = await postBlogTopics(addBlogTopicApi.value);
  catalogueBlogTopics.value.push(response);
  if (response != null) addBlogTopicApi.value.name = "";
  addBlogTopicApi.value.description = "";
  addBlogTopicApi.value.idCategory = "";
  ShowAlert("good!", "Topic added successfully", "success");
};

// modificar
const selectedBlogTopic = ref({
  idCategory: 0,
  name: "",
  description: "",
  active: true,
});

// editar
const editSelectedBlogTopic = (blogTopic) => {
  idBlogTopic.value = blogTopic.id;
  selectedBlogTopic.value = {
    idCategory: blogTopic.idCategory,
    name: blogTopic.name,
    description: blogTopic.description,
    active: blogTopic.active,
  };
  showModalTopics.value = true;
};

const updateBlogTopic = async () => {
  // cargar datos actualizados sin actualizar la pagina
  let response = await getBlogTopics();
  catalogueBlogTopics.value = response;
};

// actualizar
const saveEditedBlogTopic = async () => {
  let response = await putBlogTopics(
    idBlogTopic.value,
    selectedBlogTopic.value
  );
  showModalTopics.value = false;
  await updateBlogTopic();
  ShowAlert("good!", "Topic updated successfully", "success");
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
          v-for="catalogueBlogCategory in catalogueBlogCategories",
          :key="catalogueBlogCategory.id"
        )
          .center-container 
            q-icon(name="radio_button_checked", size="25px")
            p.sys-Admin-Container__elements--element-item {{ catalogueBlogCategory.name }}
          .sys-Admin-Container__elements--element-buttons
            q-btn.sys-Admin-Container__elements--element-buttons-button(
              @click="editSelectedBlogCategory(catalogueBlogCategory)"
            ) edit
            q-btn.sys-Admin-Container__elements--element-buttons-button Delet
        q-dialog.popup-container__dialog(v-model="showModal")
          q-card.popup-container__dialog--card
            q-card-section.popup-container__dialog--card-section
              q-form.popup-container__dialog--card-section-form(
                @submit.prevent="saveEditedBlogCategory"
              )
                q-input.popup-container__dialog--card-section-form-input(
                  v-model="selectedBlogCategory.name",
                  label="Name",
                  filled,
                  lazy-rules,
                  :rules="[(val) => (val && val.length > 0) || 'Please type Name']"
                )
                q-input.popup-container__dialog--card-section-form-input(
                  v-model="selectedBlogCategory.description",
                  label="Description",
                  filled,
                  lazy-rules,
                  :rules="[(val) => (val && val.length > 0) || 'Please type Description']"
                )
                q-checkbox.popup-container__dialog--card-section-form-checkbox(
                  v-model="selectedBlogCategory.active",
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
          @submit.prevent="uploadBlogCategoryApi()"
        )
          q-input.sys-Admin-Container__Add--form-input(
            type="text",
            placeholder="name",
            v-model="addBlogCategoryApi.name",
            filled,
            lazy-rules,
            :rules="[(val) => (val && val.length > 0) || 'Please type Name']"
          )
          q-input.sys-Admin-Container__Add--form-input(
            type="text",
            placeholder="Description",
            v-model="addBlogCategoryApi.description",
            filled,
            lazy-rules,
            :rules="[(val) => (val && val.length > 0) || 'Please type Description']"
          )
          q-btn.sys-Admin-Container__Add--form-button(
            type="submit",
            label="Add Category"
          ) 
    .sys-Admin-Container-contenedor
      .sys-Admin-Container-contenedor-title
        h4 Status
      .sys-Admin-Container__elements
        .sys-Admin-Container__elements--element(
          v-for="catalogueBlogStatus in catalogueBlogStatuses",
          :key="catalogueBlogStatus.id"
        )
          .center-container 
            q-icon(name="radio_button_checked", size="25px")
            p.sys-Admin-Container__elements--element-item {{ catalogueBlogStatus.name }}
          .sys-Admin-Container__elements--element-buttons
            q-btn.sys-Admin-Container__elements--element-buttons-button(
              @click="editSelectedBlogStatus(catalogueBlogStatus)"
            ) edit
            q-btn.sys-Admin-Container__elements--element-buttons-button Delet
        q-dialog.popup-container__dialog(v-model="showModalStatus")
          q-card.popup-container__dialog--card
            q-card-section.popup-container__dialog--card-section
              q-form.popup-container__dialog--card-section-form(
                @submit.prevent="saveEditedBlogStatus"
              )
                q-input.popup-container__dialog--card-section-form-input(
                  v-model="selectedBlogStatus.name",
                  label="Name",
                  filled,
                  lazy-rules,
                  :rules="[(val) => (val && val.length > 0) || 'Please type Name']"
                )
                q-checkbox.popup-container__dialog--card-section-form-checkbox(
                  v-model="selectedBlogStatus.active",
                  label="Active"
                ) 
                q-card-actions.popup-container__dialog--card-actions(
                  align="center"
                )
                  q-btn.popup-container__dialog--card-actions-botton(
                    label="Cancel",
                    @click="showModalStatus = false"
                  )
                  q-btn.popup-container__dialog--card-actions-botton(
                    label="Save",
                    type="submit"
                  )
      .sys-Admin-Container__Add
        q-form.sys-Admin-Container__Add--form(
          @submit.prevent="uploadBlogStatusApi()"
        )
          q-input.sys-Admin-Container__Add--form-input(
            type="text",
            label="Name",
            v-model="addBlogStatusApi.name",
            filled,
            lazy-rules,
            :rules="[(val) => (val && val.length > 0) || 'Please type Name']"
          )
          q-btn.sys-Admin-Container__Add--form-button(
            type="submit",
            label="Add Status"
          ) 
    .sys-Admin-Container-contenedor
      .sys-Admin-Container-contenedor-title
        h4 Topcis
      .sys-Admin-Container__elements
        .sys-Admin-Container__elements--element(
          v-for="catalogueBlogTopic in catalogueBlogTopics",
          :key="catalogueBlogTopic.id"
        )
          .center-container 
            q-icon(name="radio_button_checked", size="25px")
            p.sys-Admin-Container__elements--element-item {{ catalogueBlogTopic.name }}
          .sys-Admin-Container__elements--element-buttons
            q-btn.sys-Admin-Container__elements--element-buttons-button(
              @click="editSelectedBlogTopic(catalogueBlogTopic)"
            ) edit
            q-btn.sys-Admin-Container__elements--element-buttons-button Delet
        q-dialog.popup-container__dialog(v-model="showModalTopics")
          q-card.popup-container__dialog--card
            q-card-section.popup-container__dialog--card-section
              q-form.popup-container__dialog--card-section-form(
                @submit.prevent="saveEditedBlogTopic"
              )
                q-input.popup-container__dialog--card-section-form-input(
                  v-model="selectedBlogTopic.name",
                  label="Name",
                  filled,
                  lazy-rules,
                  :rules="[(val) => (val && val.length > 0) || 'Please type Name']"
                )
                q-input.popup-container__dialog--card-section-form-input(
                  v-model="selectedBlogTopic.description",
                  label="Description",
                  filled,
                  lazy-rules,
                  :rules="[(val) => (val && val.length > 0) || 'Please type Description']"
                )
                select.popup-container__dialog--card-section-form-select(
                  v-model="selectedBlogTopic.idCategory"
                )
                  option(:value="0", disabled) Select a type
                  option(
                    v-for="catalogueBlogCategory in catalogueBlogCategories",
                    :value="catalogueBlogCategory.id",
                    :key="catalogueBlogCategory.id"
                  ) {{ catalogueBlogCategory.name }}
                q-checkbox.popup-container__dialog--card-section-form-checkbox(
                  v-model="selectedBlogTopic.active",
                  label="Active"
                ) 
                q-card-actions.popup-container__dialog--card-actions(
                  align="center"
                )
                  q-btn.popup-container__dialog--card-actions-botton(
                    label="Cancel",
                    @click="showModalTopics = false"
                  )
                  q-btn.popup-container__dialog--card-actions-botton(
                    label="Save",
                    type="submit"
                  )
      .sys-Admin-Container__Add
        q-form.sys-Admin-Container__Add--form(
          @submit.prevent="uploadBlogTopicApi()"
        )
          q-input.sys-Admin-Container__Add--form-input(
            type="text",
            label="name",
            v-model="addBlogTopicApi.name",
            filled,
            lazy-rules,
            :rules="[(val) => (val && val.length > 0) || 'Please type Name']"
          )
          select.sys-Admin-Container__Add--form-select(
            v-model="addBlogTopicApi.idCategory"
          )
            option(:value="0", disabled) Select a category
            option(
              v-for="catalogueBlogCategory in catalogueBlogCategories",
              :value="catalogueBlogCategory.id",
              :key="catalogueBlogCategory.id"
            ) {{ catalogueBlogCategory.name }}
          q-input.sys-Admin-Container__Add--form-input(
            type="text",
            placeholder="Description",
            v-model="addBlogTopicApi.description",
            filled,
            lazy-rules,
            :rules="[(val) => (val && val.length > 0) || 'Please type Description']"
          )
          q-btn.sys-Admin-Container__Add--form-button(
            type="submit",
            label="Add Topic"
          ) 
</template>

