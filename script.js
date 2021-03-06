const product = {
    id: 1,
    productName: "Product 1",
    description: "Product 1 description",
    price: 2000,
    numberInStock: 30,
  };
  
  const allProducts = [
    {
      id: 1,
      productName: "Product 1",
      description: "Product 1 description",
      price: 2000,
      numberInStock: 30,
    },
    {
      id: 2,
      productName: "Product 2",
      description: "Product 2 description",
      price: 2000,
      numberInStock: 30,
    },
    {
      id: 3,
      productName: "Product 3",
      description: "Product 3 description",
      price: 2000,
      numberInStock: 30,
    },
    {
      id: 4,
      productName: "Product 4",
      description: "Product 4 description",
      price: 2000,
      numberInStock: 30,
    },
    {
      id: 5,
      productName: "Product 5",
      description: "Product 5 description",
      price: 2000,
      numberInStock: 30,
    },
    {
      id: 6,
      productName: "Product 6",
      description: "Product 6 description",
      price: 2000,
      numberInStock: 30,
    },
    {
      id: 7,
      productName: "Product 7",
      description: "Product 7 description",
      price: 2000,
      numberInStock: 30,
    },
    {
      id: 8,
      productName: "Product 8",
      description: "Product 8 description",
      price: 2000,
      numberInStock: 30,
    },
    {
      id: 9,
      productName: "Product 9",
      description: "Product 9 description",
      price: 2000,
      numberInStock: 30,
    },
    {
      id: 10,
      productName: "Product 10",
      description: "Product 10 description",
      price: 2000,
      numberInStock: 30,
    },
    {
      id: 11,
      productName: "Product 11",
      description: "Product 11 description",
      price: 2000,
      numberInStock: 30,
    },
    {
      id: 12,
      productName: "Product 12",
      description: "Product 12 description",
      price: 2000,
      numberInStock: 30,
    },
  ];
  
  let cartProductsList = [];
  
  function prepareProduct(product) {
    let productHTML = `<div class="product-item">
       <div class="container">
           <div class="product-name">${product.productName}</div>
           <div class="description">${product.description}</div>
           <div class="product-stock-count">${product.numberInStock}</div>
           <div class="product-price">${product.price}</div>
           <button class="add" data-id="${product.id}">Add to Cart</button>
           <input type="text" placeholder="specify quantity" id="quantity-${product.id}"/>
       </div>
   </div> `;
  
    return productHTML;
  }
  
  function prepareCartProduct(product) {
    let productHTML = `<div class="product-item">
      <div class="container">
               <div class="product-name">${product.productName}</div>
              <div class="description">${product.description}</div>
              <div class="product-stock-count">${product.numberInStock}</div>
               <div class="product-price">${product.price}</div>
              <div class="product-quantity">Quantity: ${product.quantity}</div>
              <button class="remove" data-id="${product.id}">Remove product</button>
          </div>
      </div> `;
  
    return productHTML;
  }
  
  const allProductsListContainer = document.getElementById("all-products-list");
  const cartProductListContainer = document.getElementById("cart-products-list");
  
  function generateProducts(products, scope) {
    let allProductHTML = "";
  
    products.forEach((product) => {
      if (scope === "product-list") {
        allProductHTML = allProductHTML + prepareProduct(product);
      } else {
        allProductHTML = allProductHTML + prepareCartProduct(product);
      }
    });
  
    return allProductHTML;
  }
  render();

  function render() {
    allProductsListContainer.innerHTML = generateProducts(
      allProducts,
      "product-list"
    );
    cartProductListContainer.innerHTML = generateProducts(
      cartProductsList,
      "cart-list"
    );
    bindEvents();
  }

  
function bindEvents() {
    const addToCartButtons = document.getElementsByClassName("add");
  
    for (let i = 0; i < addToCartButtons.length; i++) {
      if (addToCartButtons[i]) {
        addToCartButtons[i].addEventListener("click", addToCart);
      }
    }
    const removeButtons = document.getElementsByClassName("remove");
    for (let i = 0; i < addToCartButtons.length; i++) {
      if (removeButtons[i]) {
        removeButtons[i].addEventListener("click", removeFromCart);
      }
    }
  
  }
  
  function addToCart(event) {
    const productId = Number(event.target.dataset.id);
  
  
    const product = allProducts.find((item) => item.id === productId);
  
    let cartProductIndex;
    const productFromCart = cartProductsList.find((item, index) => {
  
      cartProductIndex = index;
      return item.id === productId;
    });
  
    const quantityInput = document.getElementById(`quantity-${productId}`);
    const productQuantity = Number(quantityInput.value) || 1;
  
    if (productFromCart) {
      if (productFromCart.quantity + productQuantity >
        product.numberInStock
      ) {
        return alert("the product is more than the stock value");
      }
      // update the product in the cart with the new selected quantity
      productFromCart.quantity = productFromCart.quantity + productQuantity;
      // update the selected product, increasing the quantity by the new selection
      cartProductsList[cartProductIndex] = productFromCart;
  
      return render();
    }
  
    if (product.numberInStock < productQuantity) {
      return alert("the product is more than the stock value");
    }
  
    const newCartProduct = {
      ...product,
      quantity: productQuantity,
    };
    cartProductsList.push(newCartProduct);
    // cartProductsList.push(product);
    render();
  }