<script setup>
import { ref } from "vue";
import { useShopStore } from "src/stores/shop";
import { addProductCartApi } from "src/api/cart";

const shopStore = useShopStore();
const slide = ref(1);
const autoplay = ref(true);
// :autoplay="autoplay",
const urlBaseImg = import.meta.env.BASE_URL + "resources/";
const trazado = "Trazado-bottom.png";

const popularMemberships = [
  {
    id: 13,
    idType: 9,
    name: "1 year membership",
    description: "group",
    cost: 200,
    clientCost: 200,
    taxes: 1,
    activeSale: true,
    img: "productdefault.png",
    barCode: "01",
    partner: "Central Office",
    type: "Memberships",
  },
  {
    id: 14,
    idType: 9,
    name: "6 months membership",
    description: "group",
    cost: 255,
    clientCost: 250,
    taxes: 1,
    activeSale: true,
    img: "productdefault.png",
    barCode: "02",
    partner: "Central Office",
    type: "Memberships",
  },
  {
    id: 24,
    idType: 9,
    name: "3 times per week",
    description: "personal",
    cost: 55,
    clientCost: 55,
    taxes: 1,
    activeSale: true,
    img: "productdefault.png",
    barCode: "00005",
    partner: "Central Office",
    type: "Memberships",
  },
];
// :autoplay="autoplay",
</script>

<template lang="pug">
.programInfo.membership-popular
  .membership-title
    h3 Bikini Fitness Gym Memberships
    p The Most Popular packages
  .programInfo__container.membership-desktop
    .memberships--container-items-product(
      @click="shopStore.setProduct(popularMemberships[0]); $router.push({ path: '/membershipsDetail' })"
    )
      .memberships--container-items-product-title
        h4 1 year membership
        p Unlimited group Classes
      hr.memberships--container-items-product-title-hr
      .memberships--container-items-product-price
        p 200 $
      .memberships--container-items-product-benefit
        p a month for 12 months
      .actions
        q-btn(@click.stop="addProductCartApi(popularMemberships[0]); $router.push({ path: '/cartresume' })", label="Buy now")
        q-btn(@click.stop="addProductCartApi(popularMemberships[0]); shopStore.setShowCart(true)", label="Add to cart") 
    .memberships--container-items-product(
      @click="shopStore.setProduct(popularMemberships[1]); $router.push({ path: '/membershipsDetail' })"
    )
      .memberships--container-items-product-title
        h4 6 months membership
        p Unlimited group Classes
      hr.memberships--container-items-product-title-hr
      .memberships--container-items-product-price
        p 250 $
      .memberships--container-items-product-benefit
        p a month for 6 months
      .actions
        q-btn(@click.stop="addProductCartApi(popularMemberships[1]); $router.push({ path: '/cartresume' })", label="Buy now")
        q-btn(@click.stop="addProductCartApi(popularMemberships[1]); shopStore.setShowCart(true)", label="Add to cart")
    .memberships--container-items-product(
      @click="shopStore.setProduct(popularMemberships[2]); $router.push({ path: '/membershipsDetail' })"
    )
      .memberships--container-items-product-title
        h4 3 sessions per week
        p Total 12 session
      hr.memberships--container-items-product-title-hr
      .memberships--container-items-product-price
        p 55 $ Session
      .pruebitacio
        .memberships--container-items-product-benefit
          p Total $660.000
        .memberships--container-items-product-benefit.saving
          p - 180.00 $
      .actions
        q-btn(@click.stop="addProductCartApi(popularMemberships[2]); $router.push({ path: '/cartresume' })", label="Buy now")
        q-btn(@click.stop="addProductCartApi(popularMemberships[2]); shopStore.setShowCart(true)", label="Add to cart")
  .programInfo__container.membership-mobile
    q-carousel.programInfo__container--carousel-membership(
      animated,
      v-model="slide",
      navigation,
      
      infinite,
      arrows,
      transition-prev="slide-right",
      transition-next="slide-left",
      @mouseenter="autoplay = false",
      @mouseleave="autoplay = true"
    )
      q-carousel-slide(:name="1")
        .memberships--container-items-product(@click="shopStore.setProduct(popularMemberships[0]); $router.push({ path: '/membershipsDetail' })")
          .memberships--container-items-product-title
            h4 1 year membership
            p Unlimited group Classes
          hr.memberships--container-items-product-title-hr
          .memberships--container-items-product-price
            p 200 $
          .memberships--container-items-product-benefit
            p a month for 12 months
          .actions
            q-btn(@click.stop="addProductCartApi(popularMemberships[0]); $router.push({ path: '/cartresume' })", label="Buy now")
            q-btn(@click.stop="addProductCartApi(popularMemberships[0]); shopStore.setShowCart(true)", label="Add to cart") 

      q-carousel-slide(:name="2")
        .memberships--container-items-product(@click="shopStore.setProduct(popularMemberships[1]); $router.push({ path: '/membershipsDetail' })")
          .memberships--container-items-product-title
            h4 6 months membership
            p Unlimited group Classes
          hr.memberships--container-items-product-title-hr
          .memberships--container-items-product-price
            p 250 $
          .memberships--container-items-product-benefit
            p a month for 6 months
          .actions
            q-btn(@click.stop="addProductCartApi(popularMemberships[1]); $router.push({ path: '/cartresume' })", label="Buy now")
            q-btn(@click.stop="addProductCartApi(popularMemberships[1]); shopStore.setShowCart(true)", label="Add to cart") 

      q-carousel-slide(:name="3")
        .memberships--container-items-product(@click="shopStore.setProduct(popularMemberships[2]); $router.push({ path: '/membershipsDetail' })")
          .memberships--container-items-product-title
            h4 3 sessions per week
            p Total 12 session
          hr.memberships--container-items-product-title-hr
          .memberships--container-items-product-price
            p 55 $ Session
          .pruebitacio
            .memberships--container-items-product-benefit
              p Total $660.000
            .memberships--container-items-product-benefit.saving
              p - 180.00 $
          .actions
            q-btn(@click.stop="addProductCartApi(popularMemberships[2]); $router.push({ path: '/cartresume' })", label="Buy now")
            q-btn(@click.stop="addProductCartApi(popularMemberships[2]); shopStore.setShowCart(true)", label="Add to cart") 
  .container__arrow-boton
    #flecha-container
      #flecha
        q-icon(name="arrow_downward", size="50px")
    q-btn.membership-boton See more packages
</template>

<style lang="scss">
.memberships--container-items-product {
  text-align: start;
}
.programInfo.membership-popular {
  background: #060606 0% 0% no-repeat padding-box;
}
.programInfo {
  & .membership-title {
    text-align: center;
    display: flex;
    flex-direction: column;
    margin-bottom: -40px;
    gap: 1rem;
    & h3 {
      padding: 0 0 10px 0;
    }
    & p {
      margin-top: 12px;
      font-family: Montserrat;
      opacity: 0.7;
      font-size: 18px;
      letter-spacing: -0.31px;
      @media (min-width: 768px) {
        font-size: 27px;
        margin-top: -10;
      }
    }
  }
  & .container__arrow-boton {
    display: flex;
    flex-direction: column;
    gap: 1.6rem;
    margin-top: -63px;
    @media (min-width: 768px) {
      margin-top: -40px;
    }
  }
  & .membership-boton {
    @include bkfPrimaryBtn;
    width: 270px;
    height: 49px;
    border-radius: 26px;
    font-size: 18px;
    letter-spacing: -0.06px;
    white-space: nowrap;
  }
}
@media (max-width: 600px) {
  .membership-desktop {
    display: none;
  }
}
@media (min-width: 600px) {
  .membership-mobile {
    display: none;
  }
}
.programInfo__container--carousel-membership {
  background: #060606 0% 0% no-repeat padding-box;
  height: auto;
  & .q-carousel__navigation-inner.flex.flex-center.no-wrap {
    display: none;
  }
  & .q-carousel__slide {
    padding: 10px 42px;
  }
}

.pruebitacio {
  display: flex;
  gap: 2rem;
  align-items: center;
}

.memberships--container-items-product-benefit.saving {
  & p {
    margin: 0;
    &:last-child {
      color: $primary;
      font-weight: 600;
      font-size: 19px;
      margin: 0 0 16px;
      opacity: 1;
    }
  }
}
.memberships--container-items-product-title-hr {
  opacity: 0.3;
}

@keyframes moviendrew {
  0% {
    transform: translateY(0px);
  }
  100% {
    transform: translateY(20px);
  }
}

#flecha {
  animation-name: moviendrew;
  animation-duration: 0.6s;
  animation-iteration-count: infinite;
  animation-direction: alternate;
}
</style>

