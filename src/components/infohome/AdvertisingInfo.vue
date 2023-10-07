<script setup>
const urlBaseImg = import.meta.env.BASE_URL + "resources/";
const trazado = "Trazado-bottom.png";
</script>

<template lang="pug">
.publish
  img.publish-advertisingInfo-trazado(:src="urlBaseImg + trazado")
  .publish-advertisingInfo
    .publish-advertisingInfo__title
      h3 See our App
    .publish-advertisingInfo__image
      img(src="../../assets/images/bkvistaapppublicidad.png")
    .publish-advertisingInfo__elements
      .publish-advertisingInfo__elements-item
        img(src="../../assets/images/dowloadandroid.png")
      .publish-advertisingInfo__elements-item
        img(src="../../assets/images/dowloadapple.png")
    img.publish-advertisingInfo-trazado-bot(:src="urlBaseImg + trazado")
  .publish-advertisingInfo2
    .publish-advertisingInfo2-container
      .publish-advertisingInfo2-container-item
        .publish-advertisingInfo2-container-item-image
          img(src="../../assets/images/fitnessApparel.png")
        h5.fitness Fitness Apparel
        q-btn More info
      .publish-advertisingInfo2-container-item
        .publish-advertisingInfo2-container-item-image
          img(src="../../assets/images/supplements.png")
        h5 Supplements
        q-btn More info
      .publish-advertisingInfo2-container-item
        .publish-advertisingInfo2-container-item-image
          img(src="../../assets/images/ourProducts.png")
        h5 Our Products
        q-btn More info
    .programInfo__text
      .programInfo__text-element
        .programInfo__text-element-texto
          h4 Become the best version of yourself.
          p Take care, love yourself, pamper yourself
          .programInfo__text-element-texto-boton
            q-btn Click here
</template>
<style lang="scss">
.publish-advertisingInfo-trazado {
  position: absolute;
  top: -28px;
  z-index: 2;
  transform: rotate(180deg);
  @media (max-width: 768px) {
    left: -230px;
  }
}
.publish-advertisingInfo-trazado-bot {
  position: absolute;
  bottom: -28px;
  z-index: 2;
}
</style>


