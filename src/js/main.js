let productos = [
  {
    id: "1",
    name: "Buzo rojo",
    price: "14.00",
    stock: 10,
    image: "./src/images/featured1.png",
  },
  {
    id: "2",
    name: "Buzo negro",
    price: "24.00",
    stock: 15,
    image: "./src/images/featured2.png",
  },
  {
    id: "3",
    name: "Buzo gris",
    price: "24.00",
    stock: 10,
    image: "./src/images/featured3.png",
  },
]

const products = document.querySelector(".products__print")

function printProducts() {
  let html = ""

  productos.forEach(function ({ id, name, price, stock, image }) {
    html += `   <div class="produc__print">
                        <div class="product__img">
                            <img src="${image}" alt="${name}" />
                            <button class="product__button button__float" id="${id}">+</button>
                        </div>

                        <div class="product__info">
                            <p>${name}</p>
                            <p>Precio: ${price}</p>
                            <p>Stock: ${stock}</p>
                        </div>
                    </div>`;
  })

  products.innerHTML = html
}
printProducts()

//-----------------------------------------------------------------

let iconMenu = document.getElementById("icon__menu");
let menuMobile = document.getElementById("menu__mobile");
let contentMobileMenu = document.querySelectorAll("#menu__mobile a");


let header = document.querySelector(".header__container");

function closeMenu() {
  menuMobile.classList.toggle("show__menu");
}

iconMenu.addEventListener("click", closeMenu);

contentMobileMenu.forEach((link) => {
  link.addEventListener("click", closeMenu);
});

/* Shopping Cart's code */

const shoppingBag = document.querySelector(".shopping__bag--summary");
const bagIcon = document.querySelector(".fa-bag-shopping");
const closeIcon = document.querySelector(".bx-x");

bagIcon.addEventListener("click", function () {
  shoppingBag.classList.toggle("shopping__bag--active");
});

closeIcon.addEventListener("click", function () {
  shoppingBag.classList.toggle("shopping__bag--active");
});

// FUNCIÓN con IntersectionObserver para cambiar los estilos de la barra de navegación
(() => {
  let observador = document.querySelector("observador");

  const options = {
    root: null,
    // rootMargin: '25px 0px 0px 0px'
    // threshold: 0
  }

  function callback(entries, observer) {
    header.classList.toggle('transparent')
  }

  const observer = new IntersectionObserver(callback, options);
  observer.observe(observador);
})();

// ----------------------------------------------CODIGO ALEX / CARRITO DE COMPRA

let objCart = {};

let emptyShopping = document.querySelector('.empty__shopping');
let shoppingBagAdd = document.querySelector('.shopping__bag--container')
let totalCart = document.querySelector('.total__cart')
let btnHero = document.querySelector('.btn__hero')
let numCart = document.querySelector('.num_cart');

function printNumCart() {
  const newArray = Object.values(objCart);

  let sum = 0

  if (!newArray.length) {

    numCart.textContent = 0

    return
  }

  newArray.forEach(({ amount }) => {
    sum += amount
  })


  numCart.textContent = sum
}

function printProductCart() {
  let html = '';

  let arrayCart = Object.values(objCart)

  arrayCart.forEach(({ id, name, price, stock, image, amount }) => {
    html += `
        <div class="cart__product">

            <div class="product__image">
              <img src="${image}" alt="">
            </div>

            <div class="products__text" >
              <span>${name}</span>
              <p class="red_color">Price: $${price}</p>
              <p>${amount} units</p>
              <div class="units" id="${id}">
              <i class='bx bx-minus'></i>
              <i class='bx bx-plus'></i>
              <i class='bx bx-trash red_color'></i>
            </div>

            </div>

          </div>

        `

    shoppingBagAdd.innerHTML = html;
  })
}

function printTotalProductCart() {
  let arrayCart = Object.values(objCart);

  if (!arrayCart.length) {
    totalCart.innerHTML = `
    <div class="total__cart">
    <div class="price">
    <span>0 items</span>
    <span>$0.00</span>
    </div>
    <button class="btn_off">Comprar</button>
  </div>
      `
    return
  }

  let sum = 0;
  let totalAmount = 0

  arrayCart.forEach(({ amount, price }) => {
    sum += amount * price
  })

  arrayCart.forEach(({ amount }) => {
    totalAmount += amount
  })

  totalCart.innerHTML = `
  <div class="total__cart">
  <div class="price">
  <span>${totalAmount} items</span>
  <span>$${sum},00</span>
  </div>
  <button class="btn_buy">Comprar</button>
  </div>
      `
}

products.addEventListener('click', function (e) {
  if (e.target.classList.contains('button__float')) {
    // emptyShopping.style.display = 'none';

    const itemId = e.target.id;

    let selectProduct = productos.find((item) => {
      return item.id === itemId
    })

    if (objCart[itemId]) {

      let selectProduct = productos.find((item) => {
        return item.id === itemId
      })

      if (selectProduct.stock === objCart[itemId].amount) {
        alert('No hay mas articulos disponibles')
      } else {
        objCart[itemId].amount++
      }
    } else {
      objCart[itemId] = {
        ...selectProduct,
        amount: 1
      }
    }
  }

  printProductCart()
  printTotalProductCart()
  printNumCart()
})

shoppingBagAdd.addEventListener('click', function (e) {

  let arrayCart = Object.values(objCart)

  if (e.target.classList.contains('bx-plus')) {
    const id = e.target.parentElement.id

    let selectProduct = productos.find((item) => {
      return item.id === id
    })

    if (selectProduct.stock === objCart[id].amount) {
      alert('No hay mas articulos disponibles')
    } else {
      objCart[id].amount++
    }
  }

  if (e.target.classList.contains('bx-minus')) {
    const id = e.target.parentElement.id

    // ERROR, NO DEJA ELIMINAR SI ES EL ULTIMO PRODUCTO EN EL CARRITO

    if (objCart[id].amount === 1) {
      const alert = confirm('¿Esta seguro de elminiar el producto?')
      if (alert) delete objCart[id]

    } else {
      objCart[id].amount--
    }

  }

  if (e.target.classList.contains('bx-trash')) {
    const alert = confirm('¿Esta seguro de eliminar este producto?')

    if (!alert) return

    const id = e.target.parentElement.id
    delete objCart[id]

  }

  printProductCart()
  printTotalProductCart()
  printNumCart()
})

btnHero.addEventListener('click', function (e) {
  if (e.target.classList.contains('btn2')) {

    printProductCart()
  }
})

totalCart.addEventListener('click', function (e) {
  if (e.target.classList.contains('btn_buy')) {
    let newArray = [];

    productos.forEach((item) => {
      if (item.id === objCart[item.id]?.id) {
        newArray.push({
          ...item,
          stock: item.stock - objCart[item.id].amount
        })
      } else {
        newArray.push(item)
      }
    })

    productos = newArray;
    objCart = {};

    printProducts()
    printProductCart()
    printTotalProductCart()
    printNumCart()
  }
})

printProducts()
printTotalProductCart()
printNumCart()
