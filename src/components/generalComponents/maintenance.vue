<template lang="pug">
section.maintenance
  .maintenance__image
    img(src="../../assets/images/maintenance.svg")
  .maintenance__text
    p.maintenance__text--1 We will back soon
    p.maintenance__text--2 we are working to imporve your service
</template>

<style lang="scss" scoped>
.maintenance {
  text-align: center;
  
  margin: 10% 5%;
  display: flex;
  flex-direction: column;
  gap: 3rem;

  &__text {
    line-height: 1.1em;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    font-family: Montserrat;
    &--1 {
      font-size: 43px;
      letter-spacing: -0.73px;
      font-weight: 700;
    }
    &--2 {
      font-size: 20px;
      letter-spacing: -0.4px;
      opacity: 0.5;
      font-weight: 200;
    }

    @media (max-width: 750px) {
      &--1 {
        font-size: 25px;
      }
      &--2 {
        font-size: 15px;
      }
    }
  }
}
</style>