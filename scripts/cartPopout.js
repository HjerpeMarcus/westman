const cart = document.querySelector('.cart');
const mobileMenu = document.querySelector('.mobileMenu');
const cartPopout = document.querySelector('.cartPopout');
const closeBtn = document.querySelector('.closeBtn');
const menuClose = document.querySelector('.menuClose');
const shadow = document.querySelector('.shadow');
const sideMenu = document.querySelector('.sideMenu');

function activateCartPopout() {
    cartPopout.classList.add('active');
    shadow.classList.add('active');
    document.body.style.overflow = 'hidden';
}
function deactivateCartPopout() {
    cartPopout.classList.remove('active');
    shadow.classList.remove('active');
    document.body.style.overflow = '';
}
function activateSideMenu(){
    sideMenu.classList.add('active');
    shadow.classList.add('active');
    document.body.style.overflow = 'hidden';
}
function deactivateSideMenu(){
    sideMenu.classList.remove('active');
    shadow.classList.remove('active');
    document.body.style.overflow = 'hidden';
}
cart.addEventListener('click', activateCartPopout);
mobileMenu.addEventListener('click', activateSideMenu);
menuClose.addEventListener('click', deactivateSideMenu);
closeBtn.addEventListener('click', deactivateCartPopout);
shadow.addEventListener('click', deactivateCartPopout);