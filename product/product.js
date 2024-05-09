document.addEventListener('DOMContentLoaded', function() {
    const colorButtons = document.querySelectorAll('.colorButton');
    const chosenColorText = document.querySelector('.chosenColor');
    const spline = document.querySelectorAll('.splineFrame');
    const qMinus = document.querySelector('.quantityMinus');
    const qPlus = document.querySelector('.quantityPlus');
    const qCounter = document.querySelector('.quantityCounter');
    const carousel = document.querySelector('.productCarousel');
    const images = document.querySelectorAll('.carouselImage');
    const lookingContainer = document.querySelector('.lookingContainer');
    const arrowLeft = document.querySelector('.arrowLeft');
    const arrowRight = document.querySelector('.arrowRight');

    let totalImages = images.length;
    let imageWidth = images[0].clientWidth;
    let marginRight = parseFloat(getComputedStyle(images[0]).marginRight);
    let singleImageWidth = imageWidth + marginRight;
    let currentScrollPosition = 0;
    let scrollInterval = null;

    function recalculateDimensions() {
        imageWidth = images[0].clientWidth;
        marginRight = parseFloat(getComputedStyle(images[0]).marginRight);
        singleImageWidth = imageWidth + marginRight;
    }

    function scrollCarousel() {
        currentScrollPosition += 1; // Adjust this value to change scrolling speed
        carousel.scrollLeft = currentScrollPosition;

        if (carousel.scrollLeft >= singleImageWidth * (totalImages / 2)) {
            carousel.scrollLeft = 0;
            currentScrollPosition = 0;
        }
    }

    function startCarousel() {
        if (!scrollInterval) {
            scrollInterval = setInterval(scrollCarousel, 30); // Adjust the interval for speed control
        }
    }

    function stopCarousel() {
        if (scrollInterval) {
            clearInterval(scrollInterval);
            scrollInterval = null;
            carousel.scrollLeft = 0;
            currentScrollPosition = 0;
        }
    }

    function checkViewport() {
        if (window.innerWidth <= 600) {
            startCarousel();
        } else {
            stopCarousel();
        }
    }

    function adjustArrowNavigation() {
        if (window.innerWidth > 600) {
            arrowLeft.style.display = 'block';
            arrowRight.style.display = 'block';
        } else {
            arrowLeft.style.display = 'none';
            arrowRight.style.display = 'none';
        }
    }

    window.addEventListener('resize', function() {
        recalculateDimensions();
        adjustArrowNavigation();
        checkViewport();
    });

    colorButtons.forEach(colorButton => {
        colorButton.addEventListener('click', function() {
            colorButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            const colorMap = {
                pink: "https://my.spline.design/cuppink-ea11a7ed82db86f8809be791b0e064b9/",
                red: "https://my.spline.design/cupred-bd957e2554a5690cba4d74db7c0af9dc/",
                lightBlue: "https://my.spline.design/untitled-e74344cacc796b2ce1caa76494f8cffa/",
                yellow: "https://my.spline.design/yellowcup-797a1372b2dd6c72d2ef6de3dcf614fe/",
                purple: "https://my.spline.design/cupredcopy-8aee95210649bf25e28e2b5846980bb3/",
                brown: "https://my.spline.design/cupredcopy-48871bb162b93c0dc6038ac836abc069/"
            };
            const textMap = {
                pink: "Pink",
                red: "Red",
                lightBlue: "Light Blue",
                yellow: "Yellow",
                purple: "Purple",
                brown: "Brown"
            };
            chosenColorText.innerHTML = `Color: ${textMap[this.classList[1]]}`;
            spline.forEach(iframe => {
                iframe.src = colorMap[this.classList[1]];
            });
        });
    });

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

    qMinus.addEventListener('click', () => {
        if (qNumber > 0) {
            qNumber--;
            qCounter.textContent = qNumber.toString();
        }
    });

    qPlus.addEventListener('click', () => {
        qNumber++;
        qCounter.textContent = qNumber.toString();
    });

    adjustArrowNavigation();
    checkViewport(); // Initial checks when document is ready
});
