function buildWhatsAppMessage() {
  const cart = getCart();
  if (!cart.length) return "";

  const user = JSON.parse(localStorage.getItem("reddysUser") || "null");
  const customerName = user?.name || "Guest";

  const lines = [
    "Hello, I want to order these items from Reddy's Aquarium & Pet Shop:",
    ""
  ];

  cart.forEach((item) => {
    const product = (window.PRODUCTS || []).find((entry) => entry.id === item.id);
    if (!product) return;
    lines.push(`${product.name} × ${item.quantity}`);
  });

  lines.push("");
  lines.push(`Customer Name: ${customerName}`);

  return lines.join("\n");
}

function setupWhatsAppOrderButton() {
  const button = document.getElementById("orderWhatsAppBtn");
  if (!button) return;

  button.addEventListener("click", () => {
    const message = buildWhatsAppMessage();
    if (!message) {
      alert("Your cart is empty. Add items before ordering.");
      return;
    }

    const encoded = encodeURIComponent(message);
    const url = `https://wa.me/918374293417?text=${encoded}`;
    window.open(url, "_blank");
  });
}

document.addEventListener("DOMContentLoaded", setupWhatsAppOrderButton);
