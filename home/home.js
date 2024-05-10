    const carouselOne = document.querySelector('.carouselOne');
    const carouselTwo = document.querySelector('.carouselTwo');
    const lookingContainer = document.querySelector('.lookingContainer');
    const arrowLeft = document.querySelector('.arrowLeft');
    const arrowRight = document.querySelector('.arrowRight');

    function setupCarousel(carousel) {
        const originalContent = carousel.innerHTML;
        carousel.innerHTML = originalContent + originalContent; // Duplicate content
    }

    setupCarousel(carouselOne);
    setupCarousel(carouselTwo);

    let animationFrameIdOne, animationFrameIdTwo;

    function scrollCarousel(carousel, speed) {
        let scrollPosition = carousel.scrollLeft;
        function scroll() {
            scrollPosition += speed;
            if (scrollPosition >= carousel.scrollWidth / 2) {
                scrollPosition -= carousel.scrollWidth / 2;
            } else if (scrollPosition < 0) {
                scrollPosition += carousel.scrollWidth / 2;
            }
            carousel.scrollLeft = scrollPosition;
            if (carousel === carouselOne) {
                animationFrameIdOne = requestAnimationFrame(scroll);
            } else {
                animationFrameIdTwo = requestAnimationFrame(scroll);
            }
        }
        return scroll;
    }

    function startScrolling() {
        const baseDuration = 150000; // Duration to complete one loop
        const speedOne = (carouselOne.scrollWidth / 2) / (baseDuration / (1000 / 60));
        const speedTwo = (carouselTwo.scrollWidth / 2) / (baseDuration / (1000 / 60));

        if (animationFrameIdOne) cancelAnimationFrame(animationFrameIdOne);
        if (animationFrameIdTwo) cancelAnimationFrame(animationFrameIdTwo);

        animationFrameIdOne = requestAnimationFrame(scrollCarousel(carouselOne, speedOne));
        animationFrameIdTwo = requestAnimationFrame(scrollCarousel(carouselTwo, -speedTwo));
    }

    // Listen to resize event to adjust carousel speed dynamically
    window.addEventListener('resize', startScrolling);
    
    // Initial start
    startScrolling();
arrowLeft.addEventListener('click', () => scrollLookingContainer('left'));
arrowRight.addEventListener('click', () => scrollLookingContainer('right'));
function scrollLookingContainer(direction) {
    const cards = document.querySelectorAll('.lookingCard');
    if (cards.length === 0) return;
    const cardWidth = cards[0].offsetWidth;
    const margin = parseFloat(getComputedStyle(cards[0]).marginRight);
    const scrollAmount = cardWidth + margin;
    if (direction === 'right') {
        lookingContainer.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    } else {
        lookingContainer.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    }
};