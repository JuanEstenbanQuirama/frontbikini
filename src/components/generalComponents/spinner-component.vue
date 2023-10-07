<script>
import { useSpinnerStore } from "../../stores/spinner";
export default {
  name: "spinner-component",
  data() {
    return {
      useSpinnerStore: useSpinnerStore(),
    };
  },
};
</script>

<template lang="pug">
div
  #loader(:hidden="!useSpinnerStore.isLoaderShown")
    div
      div: .spinner-border.text-light(style="width: 75px; height: 75px")
        .imageLogo
          img(src="../../assets/images/LogoLetter.png")
      | Searching...
</template>

<style lang="scss" scoped>
#loader {
  width: 100vw;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 60000;
  background-color: rgba(0, 0, 0, 0.6);
  > div {
    background-color: #c40071;
    height: calc(130px + 2rem);
    width: calc(130px + 2rem);
    color: #fff;
    padding: 2.4rem 2.4rem;
    border-radius: 6rem;
    position: fixed;
    left: calc(50vw - 1rem - 70.5px);
    border: 3px solid white;
    top: calc(50vh - 1rem - 45.5px);
  }
  & .imageLogo {
    width: 70px;
    height: 70px;
    img {
      width: 100%;
      height: auto;
      animation: pulsate 2.2s ease-out infinite;
    }
  }
}

// @keyframes spin {
//   from {
//     transform: rotate(0deg);
//   }
//   to {
//     transform: rotate(360deg);
//   }
// }

@keyframes pulsate {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.4);
  }
  100% {
    transform: scale(1);
  }
}
</style>


