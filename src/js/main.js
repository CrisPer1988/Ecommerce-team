
let productos = [
  {
    id: crypto.randomUUID(),
    name: "Buzo rojo",
    price: "14.00",
    stock: 10,
    image: "./src/images/featured1.png",
  },
  {
    id: crypto.randomUUID(),
    name: "Buzo negro",
    price: "24.00",
    stock: 15,
    image: "./src/images/featured2.png",
  },
  {
    id: crypto.randomUUID(),
    name: "Buzo gris",
    price: "24.00",
    stock: 10,
    image: "./src/images/featured3.png",
  },
]

const iconDarkMode = document.querySelector(".dark__mode");
let body = document.querySelector('body')
let iconSun = document.querySelector('.fa-sun')
const products = document.querySelector(".products__print")
const iconMenu = document.getElementById("icon__menu");
const menuMobile = document.getElementById("menu__mobile");
const contentMobileMenu = document.querySelectorAll("#menu__mobile a");
// const shoppingBag = document.querySelector(".shopping__bag--summary");
const shoppingBag = document.querySelector("#shopping__bag");
const header = document.querySelector(".header__container");
const bagIcon = document.querySelector(".fa-bag-shopping");
const closeIcon = document.querySelector(".bx-x");
const shoppingBagAdd = document.querySelector('.shopping__bag--container')
const emptyShopping = document.querySelector('.empty__shopping');
const totalCart = document.querySelector(".total__cart");
const numberProduct = document.getElementById("numberProduct");
let btnHero = document.querySelector('.btn__hero')
let numCart = document.querySelector('.num_cart');

let productCart = {};
let objCart = {};

// Lógica del DarkMode
iconDarkMode.addEventListener("click", () => {
  body.className = "darkmode";
  iconSun.style.display = 'block'
  iconDarkMode.style.display = 'none'

  // verificarStorage();
  // localStorage.setItem("data", "true")
});

iconSun.addEventListener("click", () => {
  body.className = "body";
  iconSun.style.display = 'none'
  iconDarkMode.style.display = 'block'

  // verificarStorage();
  // localStorage.setItem("data", "false")
});
// Lógica del DarkMode



// Función que imprime los productos en el DOM
const printProducts = () => {
  let html = ""

  productos.forEach(({ id, name, price, stock, image }) => {
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
printProducts();
// Función que imprime los productos en el DOM



// Funciones para el menu hamburguesa (mostrar / ocultar)
const menuSwitch = () => {
  menuMobile.classList.toggle("show__menu");
}

iconMenu.addEventListener("click", menuSwitch);

contentMobileMenu.forEach((link) => {
  link.addEventListener("click", menuSwitch);
});
// Funciones para el menu hamburguesa (mostrar / ocultar)



// --------------------- Código para mostrar / ocultar el lateral del carrito de compras
bagIcon.addEventListener("click", () => {
  shoppingBag.classList.toggle("shopping__bag--active");
});

closeIcon.addEventListener("click", () => {
  shoppingBag.classList.toggle("shopping__bag--active");
});
// --------------------- Código para mostrar / ocultar el lateral del carrito de compras



// --------------------- Código para imprimir los productos seleccionados en el lateral de compras
function printProductCart() {
  let html = '';
  let arrayCart = Object.values(objCart)
  

  if (arrayCart.length === 0) {
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
    const totalApagar = arrayCart.reduce((acumulador, item) => {
      return acumulador += (item.price) * (item.amount);
    }, 0)

    const totalProductos = arrayCart.reduce((acumulador, item) => {
      return acumulador += (item.amount);
    }, 0)

    numberProduct.innerText = totalProductos;

    arrayCart.forEach(({ id, name, price, stock, image, amount }) => {
      html += ` <div class="cart__product">
                  <div class="product__image">
                    <img src="${image}" alt="${name}">
                  </div>
                  <div class="products__text" >
                    <span>${name}</span>
                    <p>Stock: ${stock} | <span class="red_color">$${price}</span></p>
                    <p class="red_color">Subtotal: $${price * amount}</p>
                    <p>${amount} units</p>
                    <div class="units" id="${id}">
                      <i class='bx bx-minus'></i>
                      <i class='bx bx-plus'></i>
                      <i class='bx bx-trash red_color'></i>
                    </div>
                  </div>
                </div>
                `
    })
    shoppingBagAdd.innerHTML = html + ` <div class="total__cart">
                                          <div class="price">
                                            <span>${totalProductos} items</span>
                                            <span>$${totalApagar}.00</span>
                                          </div>
                                          <button class="btn_off">Comprar</button>
                                        </div>`;
  }
}
// --------------------- Código para imprimir los productos seleccionados en el lateral de compras



// --------------------- Agrega o muestra por primera vez el amount de los productos en el carrito
products.addEventListener('click', (e) => {
  if (e.target.classList.contains('button__float')) {

    const id = e.target.id;

    let selectProduct = productos.find((item) => {
      return item.id === e.target.id;
    })

    if (objCart[id]) {
      if (selectProduct.stock === objCart[id].amount) {
        Swal.fire({
          title: 'Stock superado',
          text: 'No hay más artículos disponibles',
          icon: 'info',
          confirmButtonText: 'Entendido'
        })
      } else {
        objCart[e.target.id].amount++
      }
    } else {
      objCart[e.target.id] = { ...selectProduct, amount: 1 }
    }
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

  // let arrayCart = Object.values(objCart)

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



// Comprobar el LocalStorage
const verificarStorage = () => {
  let dataStorage = localStorage.getItem("data");
}
verificarStorage();
// Comprobar el LocalStorage
