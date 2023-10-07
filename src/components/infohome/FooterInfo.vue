<template lang="pug">
.footer
  .footer__general
    .footer__container
      .footer__container-text
        p.footer__container-text-terms(@click="$router.push({ path: '/termsofservice' })") privacy policies
        p.footer__container-text-terms(@click="$router.push({ path: '/register' })") Register
        p.footer__container-text-terms(@click="$router.push({ path: '/aboutus' })") About us
        p.footer__container-text-terms(@click="$router.push({ path: '/contactus' })") Contact Us
        p Disclaimer
      .footer__image-container
        .footer__container-logo
          img(src="../../assets/images/LogoLetter.png", alt="")
        .footer__social
          .footer__social-image
            img(src="../../assets/images/facebook.png", alt="")
          .footer__social-image
            img(src="../../assets/images/instagram.png", alt="")
  .footer__right
    p 2022 All Rights Reserved
</template>

<style>
.footer__container-text-terms{
  cursor: pointer;
}
</style>

