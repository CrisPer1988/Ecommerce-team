let iconMenu = document.getElementById('icon__menu');
let menuMobile = document.getElementById('menu__mobile');

function closeMenu() {
    menuMobile.classList.toggle('show__menu') 
}

iconMenu.addEventListener('click', closeMenu);

let contentMenu = document.querySelectorAll("#menu__mobile a");

for (const a of contentMenu) {
    a.addEventListener("click", closeMenu)
    
}