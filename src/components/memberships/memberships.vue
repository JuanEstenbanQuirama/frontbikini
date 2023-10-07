<script setup>
import { membershipBenefitsAdminApi } from "src/api/membershipBenefits/MembershipBenefitsAdmin";
import { onMounted, ref, computed } from "vue";
import { addProductCartApi } from "src/api/cart";
import { useShopStore } from "src/stores/shop";
import { useRouter } from "vue-router";

const router = useRouter();
const shopStore = useShopStore();
const { getMemberships, getMembershipBenefitsById } =
  membershipBenefitsAdminApi();
  
const membershipsApi = ref([]);
const membershipBenefitsApi = ref([]);

onMounted(async () => {
  let response = await getMemberships();
  membershipsApi.value = response;
  
  const membershipBenefits = await Promise.all(
    response.map(async (membership) => {
      const benefits = await getMembershipBenefitsById(membership.id);
      return {
        id: membership.id,
        benefits: benefits,
      };
    })
  );
  membershipBenefitsApi.value = membershipBenefits;
});

const filteredProduct1 = computed(() => {
  return membershipsApi.value?.filter(
    (iterador) => iterador.description === "consulta"
  );
});

const filteredProduct2 = computed(() => {
  return membershipsApi.value?.filter(
    (iterador) => iterador.description === "personal"
  );
});

const filteredProduct3 = computed(() => {
  return membershipsApi.value?.filter(
    (iterador) => iterador.description === "group"
  );
});

const filteredProduct4 = computed(() => {
  return membershipsApi.value?.filter(
    (iterador) => iterador.description === "package"
  );
});

const filteredProduct5 = computed(() => {
  return membershipsApi.value?.filter(
    (iterador) => iterador.description === "online"
  );
});

const productDetail = (product) => {
  shopStore.setProduct(product);
  router.push({ path: "/membershipsDetail"  });
};

</script>

<template lang="pug">
section
  .memberships
    .memberships--title
      h3 Bikini Fitness Gym Membership
    .memberships--container
      .memberships--container-items
        .memberships--container-items-product(
          v-for="membership in filteredProduct1",
          :key="membership.id"
          @click="productDetail(membership)"
        )
          .memberships--container-items-product-title
            h4 {{ membership.name }}
            p {{ membership.description }}
          hr.memberships--container-items-product-title-hr
          .memberships--container-items-product-price
            p {{ membership.clientCost }} $
          .memberships--container-items-product-benefit
            p(
              v-for="benefitInMembership in membershipBenefitsApi.find((mB) => mB.id === membership.id)?.benefits",
              :key="benefitInMembership.id"
            ) {{ benefitInMembership.benefit }}
          .actions
            q-btn(
              @click.stop="addProductCartApi(membership); $router.push({ path: '/cartresume' })", label="Buy now")
            q-btn(
              @click.stop="addProductCartApi(membership); shopStore.setShowCart(true)", label="Add to cart") 
      .memberships--container-separator
        .memberships--container-separator-line
        p.memberships--container-separator-text Personal Training: 1 on 1
        .memberships--container-separator-line
      .memberships--container-items
        .memberships--container-items-product(
          v-for="membership in filteredProduct2",
          :key="membership.id"
          @click="productDetail(membership)"
        )
          .memberships--container-items-product-title
            h4 {{ membership.name }}
            p {{ membership.description }}
          hr.memberships--container-items-product-title-hr
          .memberships--container-items-product-price
            p {{ membership.clientCost }} $
          .memberships--container-items-product-benefit.saving
            p(
              v-for="benefitInMembership in membershipBenefitsApi.find((mB) => mB.id === membership.id)?.benefits",
              :key="benefitInMembership.id"
            ) {{ benefitInMembership.benefit }}
          .actions
            q-btn(
              @click.stop="addProductCartApi(membership); $router.push({ path: '/cartresume' })", label="Buy now") 
            q-btn(
              @click.stop="addProductCartApi(membership); shopStore.setShowCart(true)", label="Add to cart") 
      .memberships--container-separator
        .memberships--container-separator-line
        p.memberships--container-separator-text Group Classes
        .memberships--container-separator-line
      .memberships--container-items
        .memberships--container-items-product(
          v-for="membership in filteredProduct3",
          :key="membership.id"
          @click="productDetail(membership)"
        )
          .memberships--container-items-product-title
            h4 {{ membership.name }}
            p {{ membership.description }}
          hr.memberships--container-items-product-title-hr

          .memberships--container-items-product-price
            p {{ membership.clientCost }} $
          .memberships--container-items-product-benefit
            p(
              v-for="benefitInMembership in membershipBenefitsApi.find((mB) => mB.id === membership.id)?.benefits",
              :key="benefitInMembership.id"
            ) {{ benefitInMembership.benefit }}
          .actions
            q-btn(
              @click.stop="addProductCartApi(membership); $router.push({ path: '/cartresume' })", label="Buy now")
            
            q-btn(
              @click.stop="addProductCartApi(membership); shopStore.setShowCart(true)", label="Add to cart")
      .memberships--container-separator
        .memberships--container-separator-line
        p.memberships--container-separator-text Monthly packages
        .memberships--container-separator-line
      .memberships--container-items
        .memberships--container-items-product(
          v-for="membership in filteredProduct4",
          :key="membership.id"
          @click="productDetail(membership)"
        )
          .memberships--container-items-product-title
            h4 {{ membership.name }}
            p {{ membership.description }}
          hr.memberships--container-items-product-title-hr
          .memberships--container-items-product-price
            p.memberships--container-items-product-price-valor {{ membership.clientCost }} $
          .memberships--container-items-product-benefit
            p.memberships--container-items-product-benefit-item(
              v-for="benefitInMembership in membershipBenefitsApi.find((mB) => mB.id === membership.id)?.benefits",
              :key="benefitInMembership.id"
            ) {{ benefitInMembership.benefit }}
          .actions
            q-btn(
              @click.stop="addProductCartApi(membership); $router.push({ path: '/cartresume' })", label="Buy now")
            q-btn(
              @click.stop="addProductCartApi(membership); shopStore.setShowCart(true)", label="Add to cart")
    .memberships--title
      h3 Bikini Fitness Gym Online Membership
    .memberships--container
      .memberships--container-items
        .memberships--container-items-product(
          v-for="onlineProgram in filteredProduct5",
          :key="onlineProgram.id"
          @click="productDetail(onlineProgram)"
        )
          .memberships--container-items-product-title
            h4 {{ onlineProgram.name }}
            p {{ onlineProgram.description }}
          hr.memberships--container-items-product-title-hr
          .memberships--container-items-product-price
            p.memberships--container-items-product-price-valor {{ onlineProgram.clientCost }} $
          .memberships--container-items-product-benefit
            p.memberships--container-items-product-benefit-item(
              v-for="benefitInMembership in membershipBenefitsApi.find((mB) => mB.id === onlineProgram.id)?.benefits",
              :key="benefitInMembership.id"
            ) {{ benefitInMembership.benefit }}
          .actions
            q-btn(
              @click.stop="addProductCartApi(onlineProgram); $router.push({ path: '/cartresume' })", label="Buy now")
            q-btn(
              @click.stop="addProductCartApi(onlineProgram); shopStore.setShowCart(true)", label="Add to cart")
</template>
<style lang="scss">
.memberships--container-items-product-title-hr {
  opacity: 0.3;
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
</style>

