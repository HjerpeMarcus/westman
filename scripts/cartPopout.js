const cart = document.querySelector('.cart');
const mobileMenu = document.querySelector('.mobileMenu');
const cartPopout = document.querySelector('.cartPopout');
const closeBtn = document.querySelector('.closeBtn');
const shadow = document.querySelector('.shadow');

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
cart.addEventListener('click', activateCartPopout);
mobileMenu.addEventListener('click', activateCartPopout);
closeBtn.addEventListener('click', deactivateCartPopout);
shadow.addEventListener('click', deactivateCartPopout);