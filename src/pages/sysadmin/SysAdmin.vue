<script setup>
import { ref } from "vue";



import createUserAdmin from "src/components/sysAdmin/userAdmin/createUserAdmin.vue";
import editUserAdmin from "../../components/sysAdmin/userAdmin/editUserAdmin.vue";
import editCyTofProductsAdmin from "src/components/sysAdmin/productsAdmin/editCyTofProductsAdmin.vue";
import editClassAdmin from "src/components/sysAdmin/classAdmin/editClassAdmin.vue";
import editNotificationsAdmin from "src/components/sysAdmin/notificationsAdmin/EditNotificationsAdmin.vue";
import editMenuAdmin from "src/components/sysAdmin/menuAdmin/editMenuAdmin.vue";
import editCountriesAdmin from "src/components/sysAdmin/countriesAdmin/editCountriesAdmin.vue";
import editGendersAdmin from "../../components/sysAdmin/gendersAdmin/editGendersAdmin.vue";
import editPermissionsAdmin from "src/components/sysAdmin/permissionsAdmin/editPermissionsAdmin.vue";
import editColorsAdmin from "src/components/sysAdmin/colorsAdmin/editColorsAdmin.vue";
import editBenefitsAdmin from "src/components/sysAdmin/benefitsAdmin/editBenefitsAdmin.vue";
import editPartnerTypesAdmin from "src/components/sysAdmin/partnerTypesAdmin/editPartnerTypesAdmin.vue";
import editPronounsAdmin from "src/components/sysAdmin/pronounsAdmin/editPronounsAdmin.vue";
import editCentersAdmin from "src/components/sysAdmin/centersAdmin/editCentersAdmin.vue";
import editProfilesAdmin from "src/components/sysAdmin/profilesAdmin/editProfilesAdmin.vue";
import editBlogAdmin from "src/components/sysAdmin/BlogAdmin/editBlogAdmin.vue";
import maintenanceVue from "src/components/generalComponents/maintenance.vue";
import editPaymentAdmin from "src/components/sysAdmin/shopAdmin/editPaymentAdmin.vue";
import editInvoiceAdmin from "src/components/sysAdmin/shopAdmin/editInvoiceAdmin.vue";
import editShippingStatusesAdmin from "src/components/sysAdmin/shopAdmin/editShippingStatusesAdmin.vue";
import editTimeZonesAdmin from "src/components/sysAdmin/timeZonesAdmin/editTimeZonesAdmin.vue";
import editImagesAdmin from "src/components/sysAdmin/ImagesAdmin/editImagesAdmin.vue";
import editProductsAdmin from "src/components/sysAdmin/productsAdmin/editProductsAdmin.vue";
import editStorageProductsAdmin from "src/components/sysAdmin/productsAdmin/editStorageProductsAdmin.vue";
import editCenterStorageAdmin from "src/components/sysAdmin/centersAdmin/editCenterStorageAdmin.vue";
import editClassExcercisesAdmin from "src/components/sysAdmin/classAdmin/editClassExcercisesAdmin.vue";
import editClassSchedulerAdmin from "src/components/sysAdmin/classAdmin/editClassSchedulerAdmin.vue";
import editClassesAdmin from "src/components/sysAdmin/classAdmin/editClassesAdmin.vue";
import editMembershipBenefitsAdmin from "src/components/sysAdmin/benefitsAdmin/editMembershipBenefitsAdmin.vue";
import editMembershipAdmin from "src/components/sysAdmin/benefitsAdmin/editMembershipAdmin.vue";
import editStatesAdmin from "src/components/sysAdmin/countriesAdmin/editStatesAdmin.vue";
import editPackageAdmin from "src/components/sysAdmin/productsAdmin/editPackageAdmin.vue";
import { colors } from "quasar";

const tab = ref("user");
const tab2 = ref("datainitial");
const splitterModel = ref(20);

</script>

<template lang="pug">
.sysadmin-page
  .admin-container
    q-splitter.qsplitter(v-model="splitterModel", style="height: 80vh")
      template(v-slot:before)
        q-tabs.text-teal.qtabs(v-model="tab", vertical)
          q-tab.qtab(name="user", icon="eva-person-add-outline", label="User")
          q-tab.qtab(
            name="centers",
            icon="eva-options-2-outline",
            label="Centers"
          )
          q-tab.qtab(
            name="genders",
            icon="eva-smiling-face-outline",
            label="Genders"
          )
          q-tab.qtab(
            name="pronouns",
            icon="eva-loader-outline",
            label="Pronouns"
          )
          q-tab.qtab(
            name="profiles",
            icon="eva-award-outline",
            label="profiles"
          )
          q-tab.qtab(name="menu", icon="eva-menu-2-outline", label="Menu")
          q-tab.qtab(
            name="colors",
            icon="eva-color-palette-outline",
            label="Colors"
          )
          q-tab.qtab(
            name="countries",
            icon="eva-globe-2-outline",
            label="Countries"
          )
          q-tab.qtab(
            name="partners",
            icon="eva-people-outline",
            label="partners"
          )
          q-tab.qtab(
            name="permissions",
            icon="eva-plus-square-outline",
            label="Permissions"
          )
          q-tab.qtab(
            name="products",
            icon="eva-cube-outline",
            label="Products"
          )
          q-tab.qtab(name="class", icon="eva-calendar-outline", label="Class")
          q-tab.qtab(
            name="notifications",
            icon="eva-settings-2-outline",
            label="notifications"
          )
          q-tab.qtab(name="blog", icon="eva-book-open-outline", label="Blog")
          q-tab.qtab(
            name="memberships",
            icon="eva-star-outline",
            label="memberships"
          )
          q-tab.qtab(
            name="customer",
            icon="eva-shopping-bag-outline",
            label="customer"
          )
          q-tab.qtab(
            name="timezones",
            icon="eva-shopping-bag-outline",
            label="TimeZones"
          )
          q-tab.qtab(name="images", icon="eva-image-outline", label="Images")
      template(v-slot:after)
        q-scroll-area(
          style="height: 100%",
          :bar-style="{ borderRadius: '9px', backgroundColor: '#c40071', width: '14px', opacity: 0.3 }"
          :thumb-style="{ borderRaidus: '7px', width: '14px', backgroundColor: '#c40071', opacity: 1}"
        )
          q-tab-panels.qtabpanels.probandoNegro(
            v-model="tab",
            animated,
            swipeable,
            vertical,
            transition-prev="jump-up",
            transition-next="jump-up"
          )
            q-tab-panel.qtabpanel(name="user")
              #q-app
                div
                  .q-gutter-y-md
                    q-card.backgroundColor
                      q-tabs.text-grey(
                        v-model="tab2",
                        dense,
                        active-color="primary",
                        indicator-color="primary",
                        align="justify",
                        narrow-indicator
                      )
                        q-tab(name="datainitial", label="Users")
                        q-tab(name="createUser", label="Create User")
                      q-separator
                      q-tab-panels.backgroundColor(v-model="tab2", animated)
                        q-tab-panel(name="datainitial")
                          editUserAdmin
                        q-tab-panel(name="createUser")
                          createUserAdmin
            q-tab-panel.qtabpanel(name="products")
              |
              #q-app
                div
                  .q-gutter-y-md
                    q-card.backgroundColor
                      q-tabs.text-grey(
                        v-model="tab2",
                        dense,
                        active-color="primary",
                        indicator-color="primary",
                        align="justify",
                        narrow-indicator
                      )
                        q-tab(name="datainitial", label="Categories and types")
                        q-tab(name="products", label="products")
                        q-tab(name="packages", label="packages")
                        q-tab(name="storage", label="storage")
                      q-separator
                      q-tab-panels.backgroundColor(v-model="tab2", animated)
                        q-tab-panel(name="datainitial")
                          editCyTofProductsAdmin
                        q-tab-panel(name="products")
                          editProductsAdmin
                        q-tab-panel(name="packages")
                          editPackageAdmin
                        q-tab-panel(name="storage")
                          editStorageProductsAdmin
            q-tab-panel.qtabpanel(name="class")
              |
              #q-app
                div
                  .q-gutter-y-md
                    q-card.backgroundColor
                      q-tabs.text-grey(
                        v-model="tab2",
                        dense,
                        active-color="primary",
                        indicator-color="primary",
                        align="justify",
                        narrow-indicator
                      )
                        q-tab(
                          name="datainitial",
                          label="class Models and types"
                        )
                        q-tab(name="classes", label="classes")
                        q-tab(name="classexcercises", label="Class Excercises")
                        q-tab(name="classscheduler", label="class Scheduler")
                      q-separator
                      q-tab-panels.backgroundColor(v-model="tab2", animated)
                        q-tab-panel(name="datainitial")
                          editClassAdmin
                        q-tab-panel(name="classexcercises")
                          editClassExcercisesAdmin
                        q-tab-panel(name="classscheduler")
                          editClassSchedulerAdmin
                        q-tab-panel(name="classes")
                          editClassesAdmin
            q-tab-panel.qtabpanel(name="centers")
              |
              #q-app
                div
                  .q-gutter-y-md
                    q-card.backgroundColor
                      q-tabs.text-grey(
                        v-model="tab2",
                        dense,
                        active-color="primary",
                        indicator-color="primary",
                        align="justify",
                        narrow-indicator
                      )
                        q-tab(name="datainitial", label="Centers")
                        q-tab(name="storages", label="Storages")

                      q-separator
                      q-tab-panels.backgroundColor(v-model="tab2", animated)
                        q-tab-panel(name="datainitial")
                          editCentersAdmin
                        q-tab-panel(name="storages")
                          editCenterStorageAdmin
            q-tab-panel.qtabpanel(name="notifications")
              |
              #q-app
                div
                  .q-gutter-y-md
                    q-card.backgroundColor
                      q-tabs.text-grey(
                        v-model="tab2",
                        dense,
                        active-color="primary",
                        indicator-color="primary",
                        align="justify",
                        narrow-indicator
                      )
                        q-tab(name="datainitial", label="Notifications")
                      q-separator
                      q-tab-panels.backgroundColor(v-model="tab2", animated)
                        q-tab-panel(name="datainitial")
                          editNotificationsAdmin
            q-tab-panel.qtabpanel(name="countries")
              #q-app
                div
                  .q-gutter-y-md
                    q-card.backgroundColor
                      q-tabs.text-grey(
                        v-model="tab2",
                        dense,
                        active-color="primary",
                        indicator-color="primary",
                        align="justify",
                        narrow-indicator
                      )
                        q-tab(name="datainitial", label="countries")
                        q-tab(name="states", label="states")
                      q-separator
                      q-tab-panels.backgroundColor(v-model="tab2", animated)
                        q-tab-panel(name="datainitial") 
                          |
                          |
                          editCountriesAdmin
                        q-tab-panel(name="states") 
                          |
                          |
                          editStatesAdmin
            q-tab-panel.qtabpanel(name="colors")
              |
              #q-app
                div
                  .q-gutter-y-md
                    q-card.backgroundColor
                      q-tabs.text-grey(
                        v-model="tab2",
                        dense,
                        active-color="primary",
                        indicator-color="primary",
                        align="justify",
                        narrow-indicator
                      )
                        q-tab(name="datainitial", label="colors")
                      q-separator
                      q-tab-panels.backgroundColor(v-model="tab2", animated)
                        q-tab-panel(name="datainitial")
                          editColorsAdmin
            q-tab-panel.qtabpanel(name="blog")
              |
              #q-app
                div
                  .q-gutter-y-md
                    q-card.backgroundColor
                      q-tabs.text-grey(
                        v-model="tab2",
                        dense,
                        active-color="primary",
                        indicator-color="primary",
                        align="justify",
                        narrow-indicator
                      )
                        q-tab(name="datainitial", label="Blog")
                      q-separator
                      q-tab-panels.backgroundColor(v-model="tab2", animated)
                        q-tab-panel(name="datainitial")
                          editBlogAdmin
            q-tab-panel.qtabpanel(name="timezones")
              |
              #q-app
                div
                  .q-gutter-y-md
                    q-card.backgroundColor
                      q-tabs.text-grey(
                        v-model="tab2",
                        dense,
                        active-color="primary",
                        indicator-color="primary",
                        align="justify",
                        narrow-indicator
                      )
                        q-tab(name="datainitial", label="Time Zones")
                      q-separator
                      q-tab-panels.backgroundColor(v-model="tab2", animated)
                        q-tab-panel(name="datainitial")
                          editTimeZonesAdmin
            q-tab-panel.qtabpanel(name="menu")
              |
              #q-app
                div
                  .q-gutter-y-md
                    q-card.backgroundColor
                      q-tabs.text-grey(
                        v-model="tab2",
                        dense,
                        active-color="primary",
                        indicator-color="primary",
                        align="justify",
                        narrow-indicator
                      )
                        q-tab(name="datainitial", label="Menu and menusub")
                      q-separator
                      q-tab-panels.backgroundColor(v-model="tab2", animated)
                        q-tab-panel(name="datainitial")
                          editMenuAdmin
            q-tab-panel.qtabpanel(name="genders")
              |
              #q-app
                div
                  .q-gutter-y-md
                    q-card.backgroundColor
                      q-tabs.text-grey(
                        v-model="tab2",
                        dense,
                        active-color="primary",
                        indicator-color="primary",
                        align="justify",
                        narrow-indicator
                      )
                        q-tab(name="datainitial", label="Genders")
                      q-separator
                      q-tab-panels.backgroundColor(v-model="tab2", animated)
                        q-tab-panel(name="datainitial")
                          editGendersAdmin
            q-tab-panel.qtabpanel(name="pronouns")
              |
              #q-app
                div
                  .q-gutter-y-md
                    q-card.backgroundColor
                      q-tabs.text-grey(
                        v-model="tab2",
                        dense,
                        active-color="primary",
                        indicator-color="primary",
                        align="justify",
                        narrow-indicator
                      )
                        q-tab(name="datainitial", label="pronouns")
                      q-separator
                      q-tab-panels.backgroundColor(v-model="tab2", animated)
                        q-tab-panel(name="datainitial")
                          editPronounsAdmin
            q-tab-panel.qtabpanel(name="profiles")
              |
              #q-app
                div
                  .q-gutter-y-md
                    q-card.backgroundColor
                      q-tabs.text-grey(
                        v-model="tab2",
                        dense,
                        active-color="primary",
                        indicator-color="primary",
                        align="justify",
                        narrow-indicator
                      )
                        q-tab(name="datainitial", label="profiles")
                      q-separator
                      q-tab-panels.backgroundColor(v-model="tab2", animated)
                        q-tab-panel(name="datainitial")
                          editProfilesAdmin
            q-tab-panel.qtabpanel(name="permissions")
              |
              #q-app
                div
                  .q-gutter-y-md
                    q-card.backgroundColor
                      q-tabs.text-grey(
                        v-model="tab2",
                        dense,
                        active-color="primary",
                        indicator-color="primary",
                        align="justify",
                        narrow-indicator
                      )
                        q-tab(name="datainitial", label="Permissions")
                      q-separator
                      q-tab-panels.backgroundColor(v-model="tab2", animated)
                        q-tab-panel(name="datainitial")
                          editPermissionsAdmin
            q-tab-panel.qtabpanel(name="memberships")
              |
              #q-app
                div
                  .q-gutter-y-md
                    q-card.backgroundColor
                      q-tabs.text-grey(
                        v-model="tab2",
                        dense,
                        active-color="primary",
                        indicator-color="primary",
                        align="justify",
                        narrow-indicator
                      )
                        q-tab(name="datainitial", label="benefits")
                        q-tab(
                          name="membershipbenefit",
                          label="Membership Benefits"
                        ) 
                        q-tab(name="membership", label="Membership")
                      q-separator
                      q-tab-panels.backgroundColor(v-model="tab2", animated)
                        q-tab-panel(name="datainitial")
                          editBenefitsAdmin
                        q-tab-panel(name="membershipbenefit")
                          editMembershipBenefitsAdmin
                        q-tab-panel(name="membership")
                          editMembershipAdmin
            q-tab-panel.qtabpanel(name="partners")
              |
              #q-app
                div
                  .q-gutter-y-md
                    q-card.backgroundColor
                      q-tabs.text-grey(
                        v-model="tab2",
                        dense,
                        active-color="primary",
                        indicator-color="primary",
                        align="justify",
                        narrow-indicator
                      )
                        q-tab(name="datainitial", label="Partners")
                      q-separator
                      q-tab-panels.backgroundColor(v-model="tab2", animated)
                        q-tab-panel(name="datainitial")
                          editPartnerTypesAdmin
            q-tab-panel.qtabpanel(name="customer")
              |
              #q-app
                div
                  .q-gutter-y-md
                    q-card.backgroundColor
                      q-tabs.text-grey(
                        v-model="tab2",
                        dense,
                        active-color="primary",
                        indicator-color="primary",
                        align="justify",
                        narrow-indicator
                      )
                        q-tab(name="datainitial", label="Payment")
                        q-tab(name="invoice", label="Invoice")
                        q-tab(name="shipping", label="shipping")
                      q-separator
                      q-tab-panels.backgroundColor(v-model="tab2", animated)
                        q-tab-panel(name="datainitial")
                          editPaymentAdmin
                        q-tab-panel(name="invoice")
                          editInvoiceAdmin
                        q-tab-panel(name="shipping")
                          editShippingStatusesAdmin
            q-tab-panel.qtabpanel(name="images")
              #q-app
                div
                  .q-gutter-y-md
                    q-card.backgroundColor
                      q-tabs.text-grey(
                        v-model="tab2",
                        dense,
                        active-color="primary",
                        indicator-color="primary",
                        align="justify",
                        narrow-indicator
                      )
                        q-tab(name="datainitial", label="Images")

                      q-separator
                      q-tab-panels.backgroundColor(v-model="tab2", animated)
                        q-tab-panel(name="datainitial")
                          editImagesAdmin
</template>


