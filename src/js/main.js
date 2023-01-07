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

    productos.forEach(function({ id, name, price, stock, image }){
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
(()=>{
    let observador = document.querySelector("observador");

    const options = {
        root: null,
        // rootMargin: '25px 0px 0px 0px'
        // threshold: 0
    }

    function callback(entries, observer){
        header.classList.toggle('transparent')
    }

    const observer = new IntersectionObserver(callback, options);
    observer.observe(observador);
})();
