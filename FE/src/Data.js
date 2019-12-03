import Api from "../src/Api";

// Api.getDataProductAction();
Api.getListProductAction();

const categories = [
  {
    name: "All categories",
    icon: "fas fa-list",
    patch:"All categories"
  },
  {
    name: "Cameras",
    icon: "fas fa-tshirt",
    patch:"LSP05"
  },
  {
    name: "Watches",
    icon: "far fa-gem",
    patch:"LSP03"
  },
  {
    name: "Phones",
    icon: "fas fa-book",
    patch:"LSP02"
  },
  {
    name: "Computers",
    icon: "fas fa-desktop",
    patch:"LSP01"
  },
  {
    name: "Accessories",
    icon: "fas fa-desktop",
    patch:"LSP04"
  }
];
export { categories};
