
let iconMenu = document.getElementById('icon__menu');
let menuMobile = document.getElementById('menu__mobile');
let contentMenu = document.querySelectorAll("#menu__mobile a");
let header = document.querySelector(".header__container");

function closeMenu() {
    menuMobile.classList.toggle('show__menu') 
}

iconMenu.addEventListener('click', closeMenu);

for (const a of contentMenu) {
    a.addEventListener("click", closeMenu)
    
}

// FUNCIÓN con IntersectionObserver para cambiar los estilos de la barra de navegación
(()=>{
    let observador = document.querySelector("observador");

    const options = {
        root: null,
        rootMargin: '25px 0px 0px 0px'
        // threshold: 0
    }

    function callback(entries, observer){
        console.log("funciona");
        header.classList.toggle('transparent')
    }

    const observer = new IntersectionObserver(callback, options);
    observer.observe(observador);
})();
