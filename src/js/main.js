
let productos = [
  {
    id: crypto.randomUUID(),
    name: "Buzo rojo",
    price: "14.00",
    stock: 10,
    image: "./src/images/featured1.png",
    category: "Hoodies"
  },
  {
    id: crypto.randomUUID(),
    name: "Buzo negro",
    price: "24.00",
    stock: 15,
    image: "./src/images/featured2.png",
    category: "Shirts"
  },
  {
    id: crypto.randomUUID(),
    name: "Buzo gris",
    price: "24.00",
    stock: 10,
    image: "./src/images/featured3.png",
    category: "Sweatshirts"
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

const All = document.getElementById("All");
const Hoodies = document.getElementById("Hoodies");
const Shirts = document.getElementById("Shirts");
const Sweatshirts = document.getElementById("Sweatshirts");


let productCart = {};
let objCart = JSON.parse(localStorage.getItem("dataProducts")) || {};

// Lógica del DarkMode
iconDarkMode.addEventListener("click", () => {
  localStorage.setItem("dataMode", "true")
  verificarStorage();
});

iconSun.addEventListener("click", () => {
  localStorage.setItem("dataMode", "false")
  verificarStorage();
});
// Lógica del DarkMode



// Función que imprime los productos en el DOM
const printProducts = (filtro) => {
  let html = ""

  if(filtro==="All"){
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
  } else {
    let productosFiltrados = productos.filter((producto)=>{
      return producto.category === filtro;
    })

    productosFiltrados.forEach(({ id, name, price, stock, image }) => {
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
}
printProducts("All");
// Función que imprime los productos en el DOM

All.onclick = ()=>{
  printProducts("All")
}
Hoodies.onclick = ()=>{
  printProducts("Hoodies")
}
Shirts.onclick = ()=>{
  printProducts("Shirts")
}
Sweatshirts.onclick = ()=>{
  printProducts("Sweatshirts")
}

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
const printProductCart = ()=>{
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
                </div>`
    })
    shoppingBagAdd.innerHTML = html + ` <div class="total__cart">
                                          <div class="price">
                                            <span>${totalProductos} items</span>
                                            <span>$${totalApagar}.00</span>
                                          </div>
                                          <button class="btn_buy">Comprar</button>
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
      if (selectProduct.stock === objCart[id].amount || selectProduct.stock < 1) {
        Swal.fire({
          title: 'Stock superado',
          text: 'No hay más artículos disponibles',
          icon: 'info',
          confirmButtonText: 'Entendido'
        })
      } else {
        objCart[e.target.id].amount++
        localStorage.setItem("dataProducts", JSON.stringify(objCart))
      }
    } else {
      objCart[e.target.id] = { ...selectProduct, amount: 1 }
      localStorage.setItem("dataProducts", JSON.stringify(objCart))
    }
  }

  console.log(objCart)

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
    if (selectProduct.stock === objCart[id].amount || selectProduct.stock < 1) {
      Swal.fire({
        title: 'Stock superado',
        text: 'No hay más artículos disponibles',
        icon: 'info',
        confirmButtonText: 'Entendido'
      })
    } else {
      objCart[id].amount++
    }
    localStorage.setItem("dataProducts", JSON.stringify(objCart))
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
          localStorage.setItem("dataProducts", JSON.stringify(objCart))
          printProductCart()
        }
      })
    } else {
      objCart[id].amount--;
      localStorage.setItem("dataProducts", JSON.stringify(objCart))
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
        localStorage.setItem("dataProducts", JSON.stringify(objCart))
        printProductCart()
      }
    })
  }

  if (e.target.classList.contains('btn_buy')) {
    let newArray = [];

    productos.forEach((item) => {
      if (item.id === objCart[item.id]?.id) {
        if (item.stock < 1) {
          Swal.fire({
            title: 'Stock superado',
            text: 'No hay más artículos disponibles',
            icon: 'info',
            confirmButtonText: 'Entendido'
          })
          return
        }
        Swal.fire({
          title: 'Compra realizada con exito',
          text: 'Gracias por su compra',
          icon: 'success',
          confirmButtonText: 'Entendido'
        })
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

    printProducts("All");
    printProductCart()
  }
})
// --------------------- Eventos para aumentar / disminuir / eliminar amount de carrito de compras



// Comprobar el LocalStorage
const verificarStorage = () => {
  let dataMode = localStorage.getItem("dataMode");
  if (dataMode === "true") {
    body.className = "darkmode";
    iconSun.style.display = 'block'
    iconDarkMode.style.display = 'none'
  } else {
    body.className = "body";
    iconSun.style.display = 'none'
    iconDarkMode.style.display = 'block'
  }
  printProductCart();
}
verificarStorage();
// Comprobar el LocalStorage



/* ------------------ANIMATION-LOAD---------------------- */
window.addEventListener("load", () => {
  let containerAnimation = document.querySelector(".container__animation");

  setTimeout(() => {
    containerAnimation.style.opacity = 0;
    containerAnimation.style.visibility = "hidden";
  }, 3000);

});
/* ------------------ANIMATION-LOAD-FIN--------------------- */








