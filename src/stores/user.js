import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => {
    return {
      user: {
        Id: 0,
        IdProfile: 0,
        IdPronoun: 0,
        IdCenter: 0,
        IdMembership: 0,
        LastActivity: null,
        UserBan: false,
        Latitude: 0.0,
        Longitude: 0.0,
        NameToShow: "Guest",
        ProfileImg: "unknown.png",
        Profile: "No Log",
        Pronoun: "Sir/Miss",
        Center: "Not Found",
        Membership: "Not Found",
        MembershipImg: "unknown.png",
      },
      permissions: [],
      menus: [],
    };
  },
  actions: {
    async getUser() {
      return this.user;
    },
    async getMenus() {
      return this.menus;
    },
    async getPermissions() {
      return this.permissions;
    },
    
    setUser(user) {
      this.user = user;
    },
    setMenus(menus) {
      this.menus = menus;
    },
    setPermissions(permissions) {
      this.permissions = permissions;
    },
  },
  persist: true
});
