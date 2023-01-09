import { productos } from "./data.js";

//-------------DARKMODE--------------------

const iconDarkMode = document.querySelector(".dark__mode");

iconDarkMode.addEventListener("click", function () {
    document.body.classList.toggle("darkmode");
});


const products = document.querySelector(".products__print")
let productCart = {};

const iconMenu = document.getElementById("icon__menu");
const menuMobile = document.getElementById("menu__mobile");
const contentMobileMenu = document.querySelectorAll("#menu__mobile a");

const shoppingBag = document.querySelector(".shopping__bag--summary");

const header = document.querySelector(".header__container");

// const shoppingBag = document.querySelector("#shopping__bag");
    // productos.forEach(function({ id, name, price, stock, image }){
    //     html += `   <div class="produc__print">
    //                     <div class="product__img">
    //                         <img src="${image}" alt="${name}" />
    //                         <div class="product__button" id="${id}">
    //                             <button class="product__button button__float">+</button>
    //                         </div>
    //                     </div>

    //                     <div class="product__info">
    //                         <p>${name}</p>
    //                         <p>Precio: ${price}</p>
    //                         <p>Stock: ${stock}</p>
    //                     </div>
    //                 </div>`;
    // })

    // products.innerHTML = html
// } 
// printProducts()


// let iconMenu = document.getElementById("icon__menu");
// let menuMobile = document.getElementById("menu__mobile");
// let contentMobileMenu = document.querySelectorAll("#menu__mobile a");

// let header = document.querySelector(".header__container");

function closeMenu() {
  menuMobile.classList.toggle("show__menu");
}

iconMenu.addEventListener("click", closeMenu);

contentMobileMenu.forEach((link) => {
  link.addEventListener("click", closeMenu);
});


const bagIcon = document.querySelector(".fa-bag-shopping");
const closeIcon = document.querySelector(".bx-x");

const shoppingBagAdd = document.querySelector('.shopping__bag--container')
const emptyShopping = document.querySelector('.empty__shopping');

// const totalCart = document.querySelector(".total__cart");
const numberProduct = document.getElementById("numberProduct");

let objCart = {};

// --------------------- Mostrando lista de productos en el DOM
function printProducts() {
  let html = "";

  productos.forEach(({ id, name, price, stock, image })=>{
    html += ` <div class="produc__print">
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

printProducts();
// --------------------- Mostrando lista de productos en el DOM



// --------------------- Funcionalidad de mostrar / ocultar el menu en mobile
function menuSwitch() {
  menuMobile.classList.toggle("show__menu");
}

iconMenu.addEventListener("click", menuSwitch);

contentMobileMenu.forEach((link) => {
  link.addEventListener("click", menuSwitch);
});
// --------------------- Funcionalidad de mostrar / ocultar el menu en mobile



// --------------------- Función con IntersectionObserver
(() => {
  let observador = document.querySelector("observador");

  const observer = new IntersectionObserver(() => {
    header.classList.toggle('transparent')
  }, { root: null });

  observer.observe(observador);
})();
// --------------------- Función con IntersectionObserver



// --------------------- Código para mostrar / ocultar el lateral del carrito de compras
bagIcon.addEventListener("click", ()=>{
  shoppingBag.classList.toggle("shopping__bag--active");
});

closeIcon.addEventListener("click", ()=>{
  shoppingBag.classList.toggle("shopping__bag--active");
});
// --------------------- Código para mostrar / ocultar el lateral del carrito de compras



// --------------------- Código para imprimir los productos seleccionados en el lateral de compras
function printProductCart() {
  let html = '';
  let arrayCart = Object.values(objCart)
  numberProduct.innerText = arrayCart.length;

  if(arrayCart.length===0){
    shoppingBagAdd.innerHTML = "";
    shoppingBagAdd.innerHTML = `  <div class="empty__shopping">
                                    <h2>My Shopping Bag</h2>
                                    <img src="./src/images/empty-cart.png" alt="empty bag" />
                                    <h2>Your bag is empty</h2>
                                    <p>
                                      You can add items to your shopping bag by clicking on the "+"
                                      button on the products page.
                                    </p>
                                  </div>`
  } else {
    const totalApagar = arrayCart.reduce((acumulador, item)=>{
      return acumulador += (item.price) * (item.amount);
    },0)

    arrayCart.forEach(({ id, name, price, stock, image, amount }) => {
      html += ` <div class="cart__product">
                  <div class="product__image">
                    <img src="${image}" alt="${name}">
                  </div>
                  <div class="products__text" >
                    <span>${name}</span>
                    <p>Stock: ${stock} | <span class="red_color">$${price}</span></p>
                    <p class="red_color">Subtotal: $${price*amount}</p>
                    <p>${amount} units</p>
                    <div class="units" id="${id}">
                      <i class='bx bx-minus'></i>
                      <i class='bx bx-plus'></i>
                      <i class='bx bx-trash red_color'></i>
                    </div>
                  </div>
                </div>
                <div class="total__cart">
                  <span>${arrayCart.length} items</span>
                  <span>$${totalApagar}</span>
                </div>`
    })
    shoppingBagAdd.innerHTML = html;
  }
}
// --------------------- Código para imprimir los productos seleccionados en el lateral de compras



// --------------------- Agrega o muestra por primera vez el amount de los productos en el carrito
products.addEventListener('click', (e)=>{
  if (e.target.classList.contains('button__float')) {
    emptyShopping.style.display = 'none';

    let selectProduct = productos.find((item) => {
      return item.id === e.target.id
    })

    objCart[e.target.id] ? objCart[e.target.id].amount++ : objCart[e.target.id] = { ...selectProduct, amount: 1 }
  }

  printProductCart()
})
// --------------------- Agrega o muestra por primera vez el amount de los productos en el carrito



// --------------------- Eventos para aumentar / disminuir / eliminar amount de carrito de compras
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
    printProductCart()
  }

  if (e.target.classList.contains('bx-minus')) {
    if (objCart[id].amount === 1) {
      Swal.fire({
        text: '¿Está seguro de eliminar el producto?',
        icon: 'question',
        confirmButtonText: 'Entendido'
      }).then((result) => {
        if (result.isConfirmed) {
          delete objCart[id]
          printProductCart()
        }
      })
    } else {
      objCart[id].amount--;
      printProductCart()
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
        printProductCart()
      }
    })
  }
})
// --------------------- Eventos para aumentar / disminuir / eliminar amount de carrito de compras
