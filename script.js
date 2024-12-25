document.addEventListener("DOMContentLoaded", () => {
  // array of objects for products
  const products = [
    { id: 1, name: "Product 1", price: 29.99 },
    { id: 2, name: "Product 2", price: 49.0 },
    { id: 3, name: "Product 3", price: 69.0 },
  ];

  const cart = JSON.parse(localStorage.getItem("cart")) || []; // for saving cart items & // for the local storage

  const productList = document.getElementById("product-list");
  const cartItems = document.getElementById("cart-items");
  const emptyCartMessage = document.getElementById("empty-cart");
  const cartTotalMessage = document.getElementById("cart-total");
  const totalPriceDisplay = document.getElementById("total-price");
  const checkOutBtn = document.getElementById("checkout-btn");

  products.forEach((product) => {
    const productDiv = document.createElement("div");
    productDiv.classList.add("product");

    productDiv.innerHTML = `
        <span>${product.name} - $${product.price.toFixed(2)}</span>
        <button data-id ="${product.id}">Add to cart</button>
        `;
    productList.appendChild(productDiv);
  });

  productList.addEventListener("click", (e) => {
    const productId = parseInt(e.target.getAttribute("data-id")); // this is the  unique id data id of the div's
    const product = products.find((p) => p.id === productId); // finds the strict matching id

    if (product) addToCart(product);
  });

  // Add product to cart
  function addToCart(product) {
    cart.push(product); // adding carts to a array
    renderCart();
  }

  function removeFromCart(index) {
    cart.splice(index, 1); // remove item by index
    saveStorage(); // Save updated cart to localStorage
    renderCart();
  }
  // Function to save the tasks array to local storage
  function saveStorage() {
    localStorage.setItem("cart", JSON.stringify(cart)); // Save the cart array to local storage
  }

  function renderCart() {
    // remove your cart is empty msg
    cartItems.innerHTML = "";
    let totalPrice = 0;

    if (cart.length > 0) {
      emptyCartMessage.classList.add("hidden");
      cartTotalMessage.classList.remove("hidden");

      cart.forEach((item, index) => {
        totalPrice += item.price;
        const cartItem = document.createElement("div");
        cartItem.innerHTML = ` ${item.name} - $${item.price.toFixed(2)} 
                <button class="delete-btn" data-index="${index}">Delete</button>`;
        cartItems.appendChild(cartItem);
      });

      // Add event listeners to delete buttons
      const deleteButton = document.querySelectorAll(".delete-btn");
      deleteButton.forEach((button) => {
        button.addEventListener("click", (e) => {
          const index = parseInt(e.target.getAttribute("data-index"));
          //   console.log(index);
          removeFromCart(index);
        });
      });

      totalPriceDisplay.textContent = `${totalPrice.toFixed(2)}`;
      saveStorage();
    } else {
      emptyCartMessage.classList.remove("hidden");
      cartTotalMessage.classList.add("hidden");
      totalPriceDisplay.textContent = `$0.00`;
    }
  }

  checkOutBtn.addEventListener("click", () => {
    if (cart.length > 0) {
      cart.length = 0; // Clear cart in memory
      localStorage.removeItem("cart"); // Clear cart in localStorage
      alert("Thank you for shopping with us!");
      renderCart(); // Update the UI
    } else {
      alert("Your cart is already empty!");
    }
  });

  renderCart();
});
