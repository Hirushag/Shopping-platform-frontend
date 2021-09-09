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

const Suppliers = {
  text: "Suppliers",
  link: "/suppliers/summary",
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

const shop = {
  text: "SHOPPIN NOW",
  link: "/shopping/summary",
  icon: "icon-basket-loaded",
  userlevel: 1,
};

const delivery = {
  text: "DELIVERY",
  link: "/delivery/summary",
  icon: "icon-basket-loaded",
  userlevel: 1,
};

const Clients = {
  text: "Customers",
  link: "/clients/summary",
  icon: "icon-people",
  userlevel: 6,
};

const Inventory = {
  text: "Inventory",
  link: "/inventory/inventory/summary",
  icon: "icon-layers",
  userlevel: 6,
};

const cart = {
  text: "CART",
  link: "/cart/summary",
  icon: "icon-basket-loaded",
  userlevel: 1,
};
const space = {
  text: "",
  link: "",
  icon: "",
};

export const menu = [
  headingMain,
  space,
  shop,

  Clients,
  Payments,
  Suppliers,
  delivery,
  Inventory,
  Settings,
];
