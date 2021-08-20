const headingMain = {
  text: "Main Navigation",
  heading: true,
};

const Payments = {
  text: "Payments",
  link: "/payments/summary",
  icon: "icon-wallet",
  userlevel: 6,
};
const Settings = {
  text: "Settings",
  link: "/settings/users/summary",
  icon: "icon-settings",
  userlevel: 6,
  submenu: [
    {
      text: "Users Summary",
      link: "/settings/users/summary",
      userlevel: 8,
    },

    {
      text: "Product Categories",
      link: "/settings/inventory/categories",
      userlevel: 8,
    },
  ],
};

const Clients = {
  text: "Customers",
  link: "/clients/summary",
  icon: "icon-people",
  userlevel: 6,
};

const cart = {
  text: "CART",
  link: "/cart/summary",
  icon: "icon-basket-loaded",
  userlevel: 1,
};

export const menu = [headingMain, cart, Clients,Payments, Settings];
