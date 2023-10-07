<script setup>
const urlBaseImg = import.meta.env.BASE_URL + "resources/";
const trazado = "Trazado-bottom.png";
</script>
<template  lang="pug">
section.bk__nutrition--program
  img.bk__nutrition--program-trazado-top(:src="urlBaseImg + trazado")
  .bk__nutrition--program-container
    .bk__nutrition--program-container-text
      .bk__nutrition--program-container-text-title 
        h4 Nutrition Program
        p.bk__nutrition--program-container-text-title-subtitle Lorem ipsim dolor sit amet
      p.bk__nutrition--program-container-text-description It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.
      .bk__nutrition--program-container-text-boton
        q-btn Start now
    .bk__nutrition--program-container-image
      img(src="../../assets/images/herbalife.jpeg")

</template>




