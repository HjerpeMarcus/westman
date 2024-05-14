
    const cart = document.querySelector('.cart');
    const mobileMenu = document.querySelector('.mobileMenu');
    const cartPopout = document.querySelector('.cartPopout');
    const closeBtn = document.querySelector('.closeBtn');

    function activateCartPopout() {
        cartPopout.classList.add('active');
    }
    function deactivateCartPopout() {
        cartPopout.classList.remove('active');
    }
    cart.addEventListener('click', activateCartPopout);
    mobileMenu.addEventListener('click', activateCartPopout);
    closeBtn.addEventListener('click', deactivateCartPopout);
