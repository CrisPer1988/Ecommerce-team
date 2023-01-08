import { productos } from "./data.js";

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

  const observer = new IntersectionObserver(() => {
    header.classList.toggle('transparent')
  }, { root: null });

  observer.observe(observador);
})();

// ----------------------------------------------CODIGO ALEX

let objCart = {};

let emptyShopping = document.querySelector('.empty__shopping');
let shoppingBagAdd = document.querySelector('.shopping__bag--container')

function printProductCart() {
  let html = '';

  let arrayCart = Object.values(objCart)

  arrayCart.forEach(({ id, name, price, stock, image, amount }) => {
    html += ` <div class="cart__product">
                <div class="product__image">
                  <img src="${image}" alt="">
                </div>
                <div class="products__text" >
                  <span>${name}</span>
                  <p>Stock: ${stock} | <span class="red_color">$24.00</span></p>
                  <p class="red_color">Subtotal: $${price}</p>
                  <p>${amount} units</p>
                  <div class="units" id="${id}">
                    <i class='bx bx-minus'></i>
                    <i class='bx bx-plus'></i>
                    <i class='bx bx-trash red_color'></i>
                  </div>
                </div>
              </div>
              <div class="total__cart">
                <span>$ items</span>
                <span>$0.00 </span>
              </div>`
    shoppingBagAdd.innerHTML = html;
  })

}

products.addEventListener('click', function (e) {
  if (e.target.classList.contains('button__float')) {
    emptyShopping.style.display = 'none';

    const itemId = e.target.id;

    let selectProduct = productos.find((item) => {
      return item.id === itemId
    })

    objCart[itemId] ? objCart[itemId].amount++ : objCart[itemId] = { ...selectProduct, amount: 1 }
  }

  printProductCart()
})

shoppingBagAdd.addEventListener('click', function (e) {

  const id = e.target.parentElement.id

  let selectProduct = productos.find((item) => {
    return item.id === id
  })

  if (e.target.classList.contains('bx-plus')) {
    if (selectProduct.stock === objCart[id].amount) {
      Swal.fire({
        title: 'Stock superado',
        text: 'No hay más artículos disponibles',
        icon: 'info',
        confirmButtonText: 'Entendido'
      })
    } else {
      objCart[id].amount++
    }
  }

  if (e.target.classList.contains('bx-minus')) {
    if (objCart[id].amount === 1) {
      Swal.fire({
        text: '¿Está seguro de eliminar el producto?',
        icon: 'question',
        confirmButtonText: 'Entendido'
      }).then((result) => {
        if (result.isConfirmed) {
          // delete objCart[id]
        }
      })
      // ERROR, NO DEJA ELIMINAR SI ES EL ULTIMO PRODUCTO EN EL CARRITO
      delete objCart[id]
    } else {
      objCart[id].amount--;
    }
  }

  if (e.target.classList.contains('bx-trash')) {
    Swal.fire({
      title: 'Quitar producto',
      text: '¿Está seguro de quitar el producto de su carrito?',
      icon: 'question',
      confirmButtonText: 'Sí',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.isConfirmed) {
        delete objCart[id]
      }
    })
  }

  printProductCart()
})

