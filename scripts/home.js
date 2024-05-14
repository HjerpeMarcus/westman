document.addEventListener("DOMContentLoaded", function() {
    const carouselOne = document.querySelector('.carouselOne');
    const carouselTwo = document.querySelector('.carouselTwo');
    const lookingContainer = document.querySelector('.lookingContainer');
    const arrowLeft = document.querySelector('.arrowLeft');
    const arrowRight = document.querySelector('.arrowRight');
    const hero = document.querySelector('.hero');
    const sections = document.querySelectorAll('.section-hidden');
    const observerOptions = {
        root: null, 
        rootMargin: '0px',
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('section-visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });
    hero.classList.add('fade-in');

    function setupCarousel(carousel) {
        const originalContent = carousel.innerHTML;
        carousel.innerHTML = originalContent + originalContent; 
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
        const baseDuration = 150000; 
        const speedOne = (carouselOne.scrollWidth / 2) / (baseDuration / (1000 / 60));
        const speedTwo = (carouselTwo.scrollWidth / 2) / (baseDuration / (1000 / 60));

        if (animationFrameIdOne) cancelAnimationFrame(animationFrameIdOne);
        if (animationFrameIdTwo) cancelAnimationFrame(animationFrameIdTwo);

        animationFrameIdOne = requestAnimationFrame(scrollCarousel(carouselOne, speedOne));
        animationFrameIdTwo = requestAnimationFrame(scrollCarousel(carouselTwo, -speedTwo));
    }

    function stopScrolling(carousel) {
        if (carousel === carouselOne && animationFrameIdOne) {
            cancelAnimationFrame(animationFrameIdOne);
        } else if (carousel === carouselTwo && animationFrameIdTwo) {
            cancelAnimationFrame(animationFrameIdTwo);
        }
    }

    window.addEventListener('resize', startScrolling);
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
    }

    const newsImages = document.querySelectorAll('.newsImage');
    const newsTexts = document.querySelectorAll('.newsText');
    const leftArrow = document.querySelector('.newsArrow.left');
    const rightArrow = document.querySelector('.newsArrow.right');
    let currentIndex = 0;
    const totalNewsItems = newsImages.length / 2;

    function updateNews(direction) {
        const oldIndex = currentIndex;
        if (direction === 'right') {
            currentIndex = (currentIndex + 1) % totalNewsItems;
        } else if (direction === 'left') {
            currentIndex = (currentIndex - 1 + totalNewsItems) % totalNewsItems;
        }

        updateCarousel(newsImages, oldIndex, currentIndex, direction);
        updateCarousel(newsTexts, oldIndex, currentIndex, direction);
    }

    function updateCarousel(elements, oldIndex, newIndex, direction) {
        const incomingDirection = direction === 'right' ? 'incoming' : 'incoming-left';
        const outgoingDirection = direction === 'right' ? 'outgoing' : 'outgoing-left';

        elements[newIndex].classList.add(incomingDirection);
        elements[newIndex].style.display = 'block';

        elements[oldIndex].classList.add(outgoingDirection);

        setTimeout(() => {
            elements[oldIndex].classList.remove('active', outgoingDirection);
            elements[oldIndex].style.display = 'none';

            elements[newIndex].classList.remove(incomingDirection);
            elements[newIndex].classList.add('active');
        }, 500); 
    }

    newsImages[currentIndex].classList.add('active');
    newsImages[currentIndex].style.display = 'block';
    newsTexts[currentIndex].classList.add('active');
    newsTexts[currentIndex].style.display = 'block';

    let autoUpdateInterval = setInterval(() => updateNews('right'), 5000); 

    function resetInterval() {
        clearInterval(autoUpdateInterval);
        autoUpdateInterval = setInterval(() => updateNews('right'), 5000);
    }

    rightArrow.addEventListener('click', () => {
        updateNews('right');
        resetInterval();
    });

    leftArrow.addEventListener('click', () => {
        updateNews('left');
        resetInterval();
    });
    const carousels = document.querySelectorAll('.newsCarousel');

    carousels.forEach(carousel => {
        const h3Elements = carousel.querySelectorAll('h3');
        h3Elements.forEach(h3 => {
            h3.addEventListener('mouseover', () => stopScrolling(carousel));
            h3.addEventListener('mouseout', startScrolling);
        });
    });
});