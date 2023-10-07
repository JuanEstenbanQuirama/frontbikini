<script setup>
import { onMounted, onUpdated, ref, watchEffect } from "vue";
import { useUserStore } from "src/stores/user";
import { usersAdminApi } from "src/api/user/UsersEditAdmin";
import { alertService } from "src/libs/alert";

const { ShowAlert, ShowAlertConfirm } = alertService();
const userStore = useUserStore();
const { getUserMeasurements, postUserMeasurements, putUserMeasurements } =
  usersAdminApi();

const isEditable = false;
let measurements = ref([]);
let mesasurementsImg = ref("");
let formData = new FormData();
let urlBaseImg = import.meta.env.BASE_URL + "resources/";
const addMeasurementsUserApi = ref({
  id: 0,
  idUser: 0,
  idCenter: 0,
  weigth: 0,
  height: 0,
  comments: "",
  waistLine: 0,
  lowerBelly: 0,
  hips: 0,
  thigh: 0,
  arm: 0,
  bodyFat: 0,
  water: 0,
  muscleMass: 0,
  atheleteLevel: 0,
  caloriesBodyBlumDay: 0,
  metabolicAge: 0,
  sampleImg: "imgFront.png",
  sampleImgFile: null,
  sampleSide: "imgSide.png",
  sampleSideFile: null,
  sampleBack: "imgBack.png",
  sampleBackFile: null,
});

onMounted(async () => {
  const dataStore = await userStore.getUser();
  addMeasurementsUserApi.value.idUser = dataStore.id;
  addMeasurementsUserApi.value.idCenter = dataStore.idCenter;

  let response = await getUserMeasurements(dataStore.id);
  if (response.length != 0) {
    measurements.value = response;
    mesasurementsImg.value = measurements.value[0].sampleImg;
    // mesasurementsImg.value += measurements.value[0].sampleSide;
    // mesasurementsImg.value += measurements.value[0].sampleBack;
  } else mesasurementsImg.value = "measurementsFront.png";

  imgChange("resources/" + mesasurementsImg.value);
});

const imgChange = async (url) => {
  let src = import.meta.env.BASE_URL + url;
  let img1 = document.getElementById("img-measurements-user-head-on");
  let img2 = document.getElementById("img-measurements-user-sideways");
  let img3 = document.getElementById("img-measurements-user-backwards");
  // img1.src = "";
  // img1.src = src;
  // img2.src = src;
  // img3.src = src;
};

const imgChangeInput = async (url1, url2, url3, id) => {
  let src1 = import.meta.env.BASE_URL + url1;
  let src2 = import.meta.env.BASE_URL + url2;
  let src3 = import.meta.env.BASE_URL + url3;
  let img1 = document.getElementById("img-measurements-head-on-" + id);
  let img2 = document.getElementById("img-measurements-sideways-" + id);
  let img3 = document.getElementById("img-measurements-backwards-" + id);
  img1.src = "";
  img2.src = "";
  img3.src = "";
  img1.src = src1;
  img2.src = src2;
  img3.src = src3;
};

const calculateImagesMeasuremente = async () => {
  measurements.value.forEach((measurement) => {
    let url = "resouces/";
    imgChangeInput(
      url + measurement.sampleImg,
      url + measurement.sampleSide,
      url + measurement.sampleBack,
      measurement.id
    );
  });
};

// ----------- cargar imagen usuario
const onFileSelected = async (input, imgNum) => {
  let alert = await ShowAlertConfirm(
    "",
    `This action would change the measurement image ${imgNum}, are you sure?`,
    "question"
  );
  if (!alert) {
    input.value = "";
    return;
  }
  let inputFile = input.files[0];
  if (imgNum === 1) {
    addMeasurementsUserApi.value.sampleImg = inputFile.name;
    addMeasurementsUserApi.value.sampleImgFile = inputFile;
  } else if (imgNum === 2) {
    addMeasurementsUserApi.value.sampleSide = inputFile.name;
    addMeasurementsUserApi.value.sampleSideFile = inputFile;
  } else if (imgNum === 3) {
    addMeasurementsUserApi.value.sampleBack = inputFile.name;
    addMeasurementsUserApi.value.sampleBackFile = inputFile;
  }
  // input.value = "";
};

const uploadMeasurementsApi = async () => {
  formData.append("idUser", addMeasurementsUserApi.value.idUser);
  formData.append("idCenter", addMeasurementsUserApi.value.idCenter);
  formData.append("weigth", addMeasurementsUserApi.value.weigth);
  formData.append("height", addMeasurementsUserApi.value.height);
  formData.append("comments", addMeasurementsUserApi.value.comments);
  formData.append("waistLine", addMeasurementsUserApi.value.waistLine);
  formData.append("lowerBelly", addMeasurementsUserApi.value.lowerBelly);
  formData.append("hips", addMeasurementsUserApi.value.hips);
  formData.append("thigh", addMeasurementsUserApi.value.thigh);
  formData.append("arm", addMeasurementsUserApi.value.arm);
  formData.append("bodyFat", addMeasurementsUserApi.value.bodyFat);
  formData.append("water", addMeasurementsUserApi.value.water);
  formData.append("muscleMass", addMeasurementsUserApi.value.muscleMass);
  formData.append("athleteLevel", addMeasurementsUserApi.value.atheleteLevel);
  formData.append(
    "caloriesBodyBlumDay",
    addMeasurementsUserApi.value.caloriesBodyBlumDay
  );
  formData.append("metabolicAge", addMeasurementsUserApi.value.metabolicAge);
  formData.append("sampleImg", addMeasurementsUserApi.value.sampleImg);
  formData.append("sampleImgFile", addMeasurementsUserApi.value.sampleImgFile);
  formData.append("sampleSide", addMeasurementsUserApi.value.sampleSide);
  formData.append(
    "sampleSideFile",
    addMeasurementsUserApi.value.sampleSideFile
  );
  formData.append("sampleBack", addMeasurementsUserApi.value.sampleBack);
  formData.append(
    "sampleBackFile",
    addMeasurementsUserApi.value.sampleBackFile
  );
  let response = await postUserMeasurements(formData);

  if (response != null) {
    // await imgChange("resouces/" + response.sampleImg);
    ShowAlert("good!", "Measurements added successfully", "success");
    document.location.reload();
  } else ShowAlert("Error!", "Please contact support!", "success");
};
</script>

<template lang="pug">
section.bk__measurements
  q-list.rounded-borders
    q-expansion-item(
      expand-separator,
      icon="straighten",
      label="Add New Measurement",
      header-class="text-white"
    )
      q-card
        q-card-section
          q-form.bk__measurements--form.borde(
            @submit.prevent="uploadMeasurementsApi()"
          )
            .bk__measurements--form-container
              .bk__measurements--form-container-inputs
                q-input.bk__measurements--form-container-inputs-input(
                  v-model="addMeasurementsUserApi.weigth",
                  label="Weigth",
                  type="number",
                  filled,
                  lazy-rules,
                  :rules="[(val) => (val && val.length > 0) || 'Please type your weigth']"
                )
                q-input.bk__measurements--form-container-inputs-input(
                  v-model="addMeasurementsUserApi.height",
                  label="Height",
                  type="number",
                  filled,
                  lazy-rules,
                  :rules="[(val) => (val && val.length > 0) || 'Please type your height']"
                )
                q-input.bk__measurements--form-container-inputs-input(
                  v-model="addMeasurementsUserApi.waistLine",
                  type="number",
                  label="Waist Line",
                  filled,
                  lazy-rules,
                  :rules="[(val) => (val && val.length > 0) || 'Please type your Waist Line']"
                )
                q-input.bk__measurements--form-container-inputs-input(
                  v-model="addMeasurementsUserApi.lowerBelly",
                  type="number",
                  label="Lower Belly",
                  filled,
                  lazy-rules,
                  :rules="[(val) => (val && val.length > 0) || 'Please type your Lower Belly']"
                )
                q-input.bk__measurements--form-container-inputs-input(
                  v-model="addMeasurementsUserApi.hips",
                  type="number",
                  label="Hips",
                  filled,
                  lazy-rules,
                  :rules="[(val) => (val && val.length > 0) || 'Please type your Hips']"
                )
                q-input.bk__measurements--form-container-inputs-input(
                  v-model="addMeasurementsUserApi.thigh",
                  type="number",
                  label="Thigh",
                  filled,
                  lazy-rules,
                  :rules="[(val) => (val && val.length > 0) || 'Please type your Thigh']"
                )
                q-input.bk__measurements--form-container-inputs-input(
                  v-model="addMeasurementsUserApi.arm",
                  type="number",
                  label="Arm",
                  filled,
                  lazy-rules,
                  :rules="[(val) => (val && val.length > 0) || 'Please type your Arm']"
                )
                q-input.bk__measurements--form-container-inputs-input(
                  v-model="addMeasurementsUserApi.bodyFat",
                  type="number",
                  label="Body Fat",
                  filled,
                  lazy-rules,
                  :rules="[(val) => (val && val.length > 0) || 'Please type your Body Fat']"
                )
                q-input.bk__measurements--form-container-inputs-input(
                  v-model="addMeasurementsUserApi.water",
                  type="number",
                  label="Water",
                  filled,
                  lazy-rules,
                  :rules="[(val) => (val && val.length > 0) || 'Please type your Water']"
                )
                q-input.bk__measurements--form-container-inputs-input(
                  v-model="addMeasurementsUserApi.muscleMass",
                  type="number",
                  label="Muscle Mass",
                  filled,
                  lazy-rules,
                  :rules="[(val) => (val && val.length > 0) || 'Please type your Muscle Mass']"
                )
                q-input.bk__measurements--form-container-inputs-input(
                  v-model="addMeasurementsUserApi.atheleteLevel",
                  type="number",
                  label="Athelete Level",
                  filled,
                  lazy-rules,
                  :rules="[(val) => (val && val.length > 0) || 'Please type your Athelete Level']"
                )
                q-input.bk__measurements--form-container-inputs-input(
                  v-model="addMeasurementsUserApi.caloriesBodyBlumDay",
                  type="number",
                  label="Calories Body Burn a Day",
                  filled,
                  lazy-rules,
                  :rules="[(val) => (val && val.length > 0) || 'Please type your Calories Body Burn a Day']"
                )
                q-input.bk__measurements--form-container-inputs-input(
                  v-model="addMeasurementsUserApi.metabolicAge",
                  type="number",
                  label="Metabolic Age",
                  filled,
                  lazy-rules,
                  :rules="[(val) => (val && val.length > 0) || 'Please type your Metabolic Age']"
                )
              .bk__measurements--form-container-comments
                q-input.bk__measurements--form-container-inputs-comment(
                  v-model="addMeasurementsUserApi.comments",
                  type="textarea",
                  label="Comments",
                  filled,
                  lazy-rules,
                  :rules="[(val) => (val && val.length > 0) || 'Please type your Comments']"
                )
            //- .measurements-image
            //-   img#img-measurements-user-head-on
            //-   img#img-measurements-user-sideways
            //-   img#img-measurements-user-backwards
            .bk__measurements--form-image
              .bk__measurements--form-image-container
                p Front
                .bk__measurements--form-image-container-img
                  label.labelImgMeasurements(for="new-measurement-image-input")
                  input#new-measurement-image-input(
                    type="file",
                    style="display: none",
                    accept="image/*",
                    @change="onFileSelected($event.target, 1)"
                  )
                  img(:src="urlBaseImg + addMeasurementsUserApi.sampleImg")
              .bk__measurements--form-image-container
                p Side
                .bk__measurements--form-image-container-img
                  label.labelImgMeasurements(
                    for="new-measurement-image-input2"
                  )
                  input#new-measurement-image-input2(
                    type="file",
                    style="display: none",
                    accept="image/*",
                    @change="onFileSelected($event.target, 2)"
                  )
                  img(:src="urlBaseImg + addMeasurementsUserApi.sampleSide")
              .bk__measurements--form-image-container
                p Back
                .bk__measurements--form-image-container-img
                  label.labelImgMeasurements(
                    for="new-measurement-image-input3"
                  )
                  input#new-measurement-image-input3(
                    type="file",
                    style="display: none",
                    accept="image/*",
                    @change="onFileSelected($event.target, 3)"
                  )
                  img(:src="urlBaseImg + addMeasurementsUserApi.sampleBack")
            q-btn.bk__measurements--form-boton.full-width(
              label="Save",
              type="submit",
              spread
            )
    q-expansion-item(
      v-for="(measurement, index) in measurements",
      :key="measurement.id",
      :default-opened="index === 0",
      expand-separator,
      icon="straighten",
      :label="'Measurements Date: ' + new Date(measurement.sampleDate).toLocaleString()",
      header-class="text-white",
      :id="'div-info-measurement-' + measurement.id"
    )
      q-card
        q-card-section
          .bk__measurements--form.borde
            .bk__measurements--form-image(v-if="measurements.length != 0")
              .bk__measurements--form-image-container
                p Head on
                .bk__measurements--form-image-container-img
                  img(
                    :src="urlBaseImg + measurement.sampleImg",
                    :id="'img-measurement-head-on-' + measurement.id"
                  )
              .bk__measurements--form-image-container
                p Sideways
                .bk__measurements--form-image-container-img
                  img(
                    :src="urlBaseImg + measurement.sampleSide",
                    :id="'img-measurement-sideways-' + measurement.id"
                  )
              .bk__measurements--form-image-container
                p Backwards
                .bk__measurements--form-image-container-img
                  img(
                    :src="urlBaseImg + measurement.sampleBack",
                    :id="'img-measurement-backwards-' + measurement.id"
                  )
            q-expansion-item(
              expand-separator,
              icon="straighten",
              label="Stats",
              header-class="text-white"
            )
              q-card
                q-card-section
                  .bk__measurements--form
                    .bk__measurements--form-container
                      .bk__measurements--form-container-inputs
                        q-input.bk__measurements--form-container-inputs-input(
                          v-model="measurement.weigth",
                          :readonly="!isEditable",
                          filled,
                          label="Weigth"
                        )
                        q-input.bk__measurements--form-container-inputs-input(
                          v-model="measurement.height",
                          :readonly="!isEditable",
                          filled,
                          label="Height"
                        )
                        q-input.bk__measurements--form-container-inputs-input(
                          v-model="measurement.waistLine",
                          :readonly="!isEditable",
                          filled,
                          label="Waist Line"
                        )
                        q-input.bk__measurements--form-container-inputs-input(
                          v-model="measurement.lowerBelly",
                          :readonly="!isEditable",
                          filled,
                          label="Lower Belly"
                        )
                        q-input.bk__measurements--form-container-inputs-input(
                          v-model="measurement.hips",
                          :readonly="!isEditable",
                          filled,
                          label="Hips"
                        )
                        q-input.bk__measurements--form-container-inputs-input(
                          v-model="measurement.thigh",
                          :readonly="!isEditable",
                          filled,
                          label="Thigh"
                        )
                        q-input.bk__measurements--form-container-inputs-input(
                          v-model="measurement.arm",
                          :readonly="!isEditable",
                          filled,
                          label="Arm"
                        )
                        q-input.bk__measurements--form-container-inputs-input(
                          v-model="measurement.bodyFat",
                          :readonly="!isEditable",
                          filled,
                          label="Body Fat"
                        )
                        q-input.bk__measurements--form-container-inputs-input(
                          v-model="measurement.water",
                          :readonly="!isEditable",
                          filled,
                          label="Water"
                        )
                        q-input.bk__measurements--form-container-inputs-input(
                          v-model="measurement.weigth",
                          :readonly="!isEditable",
                          filled,
                          label="Muscle Mass"
                        )
                        q-input.bk__measurements--form-container-inputs-input(
                          v-model="measurement.athleteLevel",
                          :readonly="!isEditable",
                          filled,
                          label="Athelete Level"
                        )
                        q-input.bk__measurements--form-container-inputs-input(
                          v-model="measurement.caloriesBodyBlumDay",
                          :readonly="!isEditable",
                          filled,
                          label="Calories Body Burn a Day"
                        )
                        q-input.bk__measurements--form-container-inputs-input(
                          v-model="measurement.metabolicAge",
                          :readonly="!isEditable",
                          filled,
                          label="Metabolic Age"
                        )
                      .bk__measurements--form-container-comments
                        q-input.bk__measurements--form-container-inputs-comment(
                          :readonly="!isEditable",
                          label="Comments",
                          v-model="measurement.comments",
                          filled,
                          type="textarea"
                        )
</template>

