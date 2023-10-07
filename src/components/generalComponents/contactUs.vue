<script setup>
import { ref } from "vue";
const showModal = ref(false);

const formContact = ref({
  name: "",
  cellphone: "",
  email: "",
  coment: "",
});

const infoUser = () => {
  // enviar al endpoint
  showModal.value = true;
};
</script>
    
<template  lang="pug">
section.bk__contact--Us
  .bk__contact--Us-container
    .bk__contact--Us-container-title
      h3 Contact us:
    q-form.bk__contact--Us-container-form(@submit.prevent="infoUser()")
      .bk__contact--Us-container-form-inputs
        q-input.bk__contact--Us-container-form-input(
          type="text",
          label="Name:",
          v-model="formContact.name"
        )
        q-input.bk__contact--Us-container-form-input(
          type="text",
          label="Cellphone:",
          v-model="formContact.cellphone"
        ) 
      q-input.bk__contact--Us-container-form-input(
        type="text",
        label="E-mail:",
        v-model="formContact.email"
      )
      q-input.bk__contact--Us-container-form-input.textarea(
        type="textarea",
        label="Enter your message:",
        rows="5",
        cols="30",
        v-model="formContact.coment"
      )
      .bk__contact--Us-container-form-boton
        q-btn(label="Send", type="submit")
  q-dialog.bk__contact--Us-popup(v-model="showModal")
    q-card.bk__contact--Us-popup-card
      q-card-section.bk__contact--Us-popup-card-section
        p.bk__contact--Us-popup-card-section-title Thanks
        p.bk__contact--Us-popup-card-section-subtitle for contact us!
        p.bk__contact--Us-popup-card-section-text will contact you in the
        p.bk__contact--Us-popup-card-section-text shortest possible time.
        q-card-actions.bk__contact--Us-popup-card-section-boton(align="center")
          q-btn(label="Back", @click="showModal = false")
</template>



