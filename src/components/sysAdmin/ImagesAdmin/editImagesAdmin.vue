<script setup>
import { ref } from "vue";
import useQuasar from "quasar/src/composables/use-quasar.js";

const images = ref([]);

const handleImageUpload = (event) => {
  const file = event.target.files[0];
  const reader = new FileReader();
  reader.onload = () => {
    const img = new Image();
    img.onload = () => {
      images.value.push(img.src);
    };
    img.src = reader.result;
  };
  reader.readAsDataURL(file);
};

const handleImageDelete = (index) => {
  images.value.splice(index, 1);
};

const $q = useQuasar();
const name = ref(null);
const age = ref(null);

// const onSubmit = () => {
//   if (name.value == "") {
//     $q.notify({
//       color: 'red-5',
//       textColor: 'white',
//       icon: 'warning',
//       message: 'You need to accept the license and terms first'
//     })
//   }
//   else {
//     $q.notify({
//       color: 'green-4',
//       textColor: 'white',
//       icon: 'cloud_done',
//       message: 'Submitted'
//     })
//   }
// }

// const onReset = () => {
//   name.value = null
//   age.value = null
// }
</script>

<template lang="pug">
section.images-admin 
  |
  .images-admin-title
    h4 images home
    label(for="addimg") add img
    input#addimg(type="file", @change="handleImageUpload", accept="image/*") 
    div(v-for="(image, index) in images", :key="index")
      div
        img(:src="image")
      div
        q-btn(@click="handleImageDelete(index)") delet img
</template> 
  
<!-- <template>
    <div class="q-pa-md" style="max-width: 400px">
  
      <q-form
        @submit="onSubmit"
        @reset="onReset"
        class="q-gutter-md"
      >
        <q-input
          filled
          v-model="name"
          label="Your name"
          hint="Name and surname"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Please type something']"
        />
  
        <q-input
          filled
          type="number"
          v-model="age"
          label="Your age"
          lazy-rules
          :rules="[
            val => val !== null && val !== '' || 'Please type your age',
            val => val > 0 && val < 100 || 'Please type a real age'
          ]"
        />
        <div>
          <q-btn label="Submit" type="submit" color="primary"/>
          <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
        </div>
      </q-form>
  
    </div>
</template> -->



