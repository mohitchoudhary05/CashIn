export const auth = {
  isAuthenticated: () => {
    return JSON.parse(localStorage.getItem("isAuthenticated")) || false;
  },

  login() {
    localStorage.setItem("isAuthenticated", "true");
  },

  logout() {
    localStorage.removeItem("isAuthenticated");
  },
};
