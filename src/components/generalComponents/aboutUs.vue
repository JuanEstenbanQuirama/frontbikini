<template lang="pug">
section.bk__about--us
  .bk__about--us-container
    .bk__about--us-container-photo
      .bk__about--us-container-photo-imagen
        img.bk__about--us-container-photo-imagen-image(
          src="../../assets/images/program4.jpg"
        )
    .bk__about--us-container-text
      h2.bk__about--us-container-text-title About us
      q-list.rounded-borders
        q-expansion-item(
          expand-separator,
          icon="eva-alert-circle-outline",
          label="Where does it come from?",
          header-class="text-white",
          popup
        )
          q-card
            q-card-section
              p Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta autem esse assumenda dicta iste voluptatum nulla perferendis sed reiciendis sunt doloribus, libero porro dolorum corporis repudiandae accusantium labore a voluptate!
        q-expansion-item(
          expand-separator,
          icon="eva-alert-circle-outline",
          label="Where can I get some?",
          header-class="text-white",
          popup
        )
          q-card
            q-card-section
              p Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita autem deserunt impedit praesentium, ab culpa quis quos dolore nemo porro accusantium quam aliquid consequuntur consequatur in non, corrupti soluta placeat?
        q-expansion-item(
          expand-separator,
          icon="eva-alert-circle-outline",
          label="Where does it come from?",
          header-class="text-white",
          popup
        )
          q-card
            q-card-section
              p Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta autem esse assumenda dicta iste voluptatum nulla perferendis sed reiciendis sunt doloribus, libero porro dolorum corporis repudiandae accusantium labore a voluptate!
        q-expansion-item(
          expand-separator,
          icon="eva-alert-circle-outline",
          label="Where can I get some?",
          header-class="text-white",
          popup
        )
          q-card
            q-card-section
              p Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita autem deserunt impedit praesentium, ab culpa quis quos dolore nemo porro accusantium quam aliquid consequuntur consequatur in non, corrupti soluta placeat?
</template>

<style lang="scss">
.bk__about--us {
  margin: 2%;
  display: flex;
  justify-content: center;
  &-container {
    max-width: 1000px;
    width: 100%;
    display: flex;
    gap: 1rem;
    @media (max-width: 780px){
      align-items: center;
      flex-direction: column;
    }
    &-photo {
      &-imagen {
        max-width: 415px;
        min-height: 545px;
        & img {
          width: 100%;
          height: 100%;
          border-radius: 35px;
        }
      }
    }
    &-text {
      width: 100%;
      &-title{
        text-align: center;
        margin-bottom: 1rem;
      }
    }
  }
  .q-card {
    background: black;
  }
}
</style>