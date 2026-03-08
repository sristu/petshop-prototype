// Central product database used by shop, cart and featured sections.
window.PRODUCTS = [
  { id: 1, name: "Goldfish", price: 80, category: "Aquarium Fish", image: "images/fish.svg" },
  { id: 2, name: "Betta Fish", price: 150, category: "Aquarium Fish", image: "images/fish.svg" },
  { id: 3, name: "Guppy Fish", price: 50, category: "Aquarium Fish", image: "images/fish.svg" },
  { id: 4, name: "Angelfish", price: 200, category: "Aquarium Fish", image: "images/fish.svg" },
  { id: 5, name: "Molly Fish", price: 60, category: "Aquarium Fish", image: "images/fish.svg" },

  { id: 6, name: "Budgies Pair", price: 600, category: "Birds", image: "images/birds.svg" },
  { id: 7, name: "Cockatiels Pair", price: 2400, category: "Birds", image: "images/birds.svg" },
  { id: 8, name: "Finches Pair", price: 400, category: "Birds", image: "images/birds.svg" },

  { id: 9, name: "Rabbits Pair", price: 800, category: "Small Pets", image: "images/smallpets.svg" },
  { id: 10, name: "Turtles Pair", price: 500, category: "Small Pets", image: "images/smallpets.svg" },

  { id: 11, name: "2 Feet Tank", price: 1200, category: "Aquariums", image: "images/aquariums.svg" },
  { id: 12, name: "3 Feet Tank", price: 2000, category: "Aquariums", image: "images/aquariums.svg" },
  { id: 13, name: "4 Feet Tank", price: 3500, category: "Aquariums", image: "images/aquariums.svg" },

  { id: 14, name: "Bird Cage Medium", price: 900, category: "Pet Cages", image: "images/cages.svg" },
  { id: 15, name: "Rabbit Cage", price: 1500, category: "Pet Cages", image: "images/cages.svg" },
  { id: 16, name: "Hamster Cage", price: 1200, category: "Pet Cages", image: "images/cages.svg" },

  { id: 17, name: "Fish Food Premium", price: 120, category: "Pet Food", image: "images/food.svg" },
  { id: 18, name: "Bird Seeds Mix", price: 200, category: "Pet Food", image: "images/food.svg" },
  { id: 19, name: "Dog Food Pack", price: 350, category: "Pet Food", image: "images/food.svg" },

  { id: 20, name: "Bird Swing Toy", price: 150, category: "Pet Toys", image: "images/toys.svg" },
  { id: 21, name: "Dog Chew Toy", price: 200, category: "Pet Toys", image: "images/toys.svg" },
  { id: 22, name: "Cat Ball Toy", price: 120, category: "Pet Toys", image: "images/toys.svg" }
];

window.CATEGORIES = [
  "Aquarium Fish",
  "Birds",
  "Small Pets",
  "Aquariums",
  "Pet Cages",
  "Pet Food",
  "Pet Toys"
];

function formatINR(value) {
  return `?${value.toLocaleString("en-IN")}`;
}

function renderFeaturedProducts() {
  const container = document.getElementById("featuredProducts");
  if (!container) return;

  const featured = window.PRODUCTS.slice(0, 6);
  container.innerHTML = featured
    .map(
      (product) => `
      <article class="glass-card product-card">
        <img class="product-media" src="${product.image}" alt="${product.name}" />
        <div class="card-body">
          <span class="card-tag">${product.category}</span>
          <h3 class="card-title">${product.name}</h3>
          <p class="card-price">${formatINR(product.price)}</p>
          <button class="btn btn-primary" data-add-to-cart="${product.id}">Add to Cart</button>
        </div>
      </article>
    `
    )
    .join("");
}

function renderShop() {
  const productsGrid = document.getElementById("productsGrid");
  const filterButtons = document.getElementById("filterButtons");
  if (!productsGrid || !filterButtons) return;

  const params = new URLSearchParams(window.location.search);
  const initialCategory = params.get("category") || "All";

  const allCategories = ["All", ...window.CATEGORIES];
  let selectedCategory = allCategories.includes(initialCategory) ? initialCategory : "All";

  function drawFilters() {
    filterButtons.innerHTML = allCategories
      .map(
        (category) => `
          <button class="filter-btn ${selectedCategory === category ? "active" : ""}" data-filter="${category}">
            ${category}
          </button>
        `
      )
      .join("");
  }

  function drawProducts() {
    const list =
      selectedCategory === "All"
        ? window.PRODUCTS
        : window.PRODUCTS.filter((item) => item.category === selectedCategory);

    productsGrid.innerHTML = list
      .map(
        (product) => `
          <article class="glass-card product-card">
            <img class="product-media" src="${product.image}" alt="${product.name}" />
            <div class="card-body">
              <span class="card-tag">${product.category}</span>
              <h3 class="card-title">${product.name}</h3>
              <p class="card-price">${formatINR(product.price)}</p>
              <button class="btn btn-primary" data-add-to-cart="${product.id}">Add to Cart</button>
            </div>
          </article>
        `
      )
      .join("");
  }

  filterButtons.addEventListener("click", (event) => {
    const button = event.target.closest("[data-filter]");
    if (!button) return;

    selectedCategory = button.dataset.filter;
    drawFilters();
    drawProducts();
  });

  drawFilters();
  drawProducts();
}

document.addEventListener("DOMContentLoaded", () => {
  renderFeaturedProducts();
  renderShop();
});
