// Filter produk
function filterProducts() {
  const searchQuery = document
    .getElementById("searchInput")
    .value.toLowerCase();
  const selectedCategory = document.querySelector(".category-btn.active")
    .dataset.category;

  document.querySelectorAll(".product-card").forEach((card) => {
    const productName = card.dataset.name.toLowerCase();
    const productCategory = card.dataset.category;

    const nameMatch = productName.includes(searchQuery);
    const categoryMatch =
      selectedCategory === "all" || productCategory === selectedCategory;

    card.style.display = nameMatch && categoryMatch ? "block" : "none";
  });
}

// Event listeners
document
  .getElementById("searchInput")
  .addEventListener("input", filterProducts);

document.querySelectorAll(".category-btn").forEach((btn) => {
  btn.addEventListener("click", function () {
    document
      .querySelectorAll(".category-btn")
      .forEach((b) => b.classList.remove("active"));
    this.classList.add("active");
    filterProducts();
  });
});

(function () {
  "use strict";

  const escapeHTML = (str) =>
    str.replace(
      /[&<>"']/g,
      (tag) =>
        ({
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#39;",
        }[tag])
    );

  const safeQuerySelector = (selector) => {
    const el = document.querySelector(selector);
    if (!el) throw new Error(`Element ${selector} not found`);
    return el;
  };

  // Filter produk dengan sanitasi input
  function filterProducts() {
    const searchQuery = escapeHTML(
      safeQuerySelector("#searchInput").value.toLowerCase()
    );

    const selectedCategory = safeQuerySelector(".category-btn.active").dataset
      .category;

    document.querySelectorAll(".product-card").forEach((card) => {
      const productName = escapeHTML(card.dataset.name.toLowerCase());
      const productCategory = card.dataset.category;

      const nameMatch = productName.includes(searchQuery);
      const categoryMatch =
        selectedCategory === "all" || productCategory === selectedCategory;

      card.style.display = nameMatch && categoryMatch ? "block" : "none";
    });
  }

  // Event listeners dengan error handling
  try {
    safeQuerySelector("#searchInput").addEventListener("input", filterProducts);

    document.querySelectorAll(".category-btn").forEach((btn) => {
      btn.addEventListener("click", function () {
        document
          .querySelectorAll(".category-btn")
          .forEach((b) => b.classList.remove("active"));
        this.classList.add("active");
        filterProducts();
      });
    });
  } catch (e) {
    console.error("Initialization error:", e);
  }
})();
