document.addEventListener('DOMContentLoaded', () => {
  // ADD TO CART (on home.html)
  document.querySelectorAll(".add-cart-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const item = {
        id: btn.dataset.id,
        name: btn.dataset.name,
        price: parseInt(btn.dataset.price)
      };
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      cart.push(item);
      localStorage.setItem("cart", JSON.stringify(cart));
      alert("✅ Product added to cart!");
    });
  });

  // RENDER CART (on cart.html)
  const cartContainer = document.getElementById("cartContainer");
  if (cartContainer) {
    const productImages = {
      nike: "nikeairmax.png",
      adidas: "adidasultraboost.png",
      vans: "vans.png"
    };

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const renderCart = () => {
      cartContainer.innerHTML = "";
      if (cart.length === 0) {
        cartContainer.innerHTML = "<p>Your cart is empty.</p>";
        return;
      }

      let total = 0;

      cart.forEach((item, index) => {
        total += item.price;

        const div = document.createElement("div");
        div.className = "cart-item";
        div.innerHTML = `
          <img src="${productImages[item.id]}" alt="${item.name}" />
          <div>
            <h3>${item.name}</h3>
            <p>Price: ₹${item.price}</p>
            <button class="remove-btn" data-index="${index}">Remove</button>
          </div>
        `;
        cartContainer.appendChild(div);
      });

      const totalEl = document.createElement("h2");
      totalEl.textContent = `Total: ₹${total}`;
      cartContainer.appendChild(totalEl);

      const buyBtn = document.createElement("button");
      buyBtn.className = "buy-now-btn";
      buyBtn.textContent = "Buy Now";
      buyBtn.onclick = () => {
        alert("🛒 Thank you for your purchase!");
        localStorage.removeItem("cart");
        cart = [];
        renderCart();
      };
      cartContainer.appendChild(buyBtn);
    };

    // REMOVE BUTTON LOGIC
    cartContainer.addEventListener("click", (e) => {
      if (e.target.classList.contains("remove-btn")) {
        const index = parseInt(e.target.dataset.index);
        cart.splice(index, 1);
        localStorage.setItem("cart", JSON.stringify(cart));
        renderCart();
      }
    });

    renderCart();
  }
});
