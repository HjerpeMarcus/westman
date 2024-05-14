const searchInput = document.getElementById('search');
const categories = document.querySelectorAll('.category');
const types = document.querySelectorAll('.filterBoxTypes .type');
const colors = document.querySelectorAll('.filterBoxColors .color');
const cards = Array.from(document.querySelectorAll('.card'));
const container = document.querySelector('.container');
const filterButton = document.querySelector('.filterTool.filter');
const closeButton = document.querySelector('.filterBoxHeader p:nth-child(2)');
const filterBox = document.querySelector('.filterBox');
const toggleIcon = document.querySelector('.filterTool.filter .material-symbols-outlined.title');

document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('click', () => {
        window.location.href = '../product/index.html'; // Redirect to the product page
    });
});

function updateFilter() {
    if (window.innerWidth < 600) {
        filterButton.onclick = function() {
            filterBox.style.bottom = '0';
            toggleIcon.textContent = 'expand_less';
        };
        closeButton.onclick = function(event) {
            filterBox.style.bottom = '-70%';
            toggleIcon.textContent = 'expand_more';
            event.stopPropagation();
        };
        document.onclick = function(event) {
            if (!filterBox.contains(event.target) && !filterButton.contains(event.target)) {
                filterBox.style.bottom = '-70%'; 
                toggleIcon.textContent = 'expand_more';
            }
        };
    } else {
        filterButton.onclick = function() {
            filterBox.classList.toggle('active');
            toggleIcon.textContent = filterBox.classList.contains('active') ? 'expand_less' : 'expand_more';
        };
        closeButton.onclick = function(event) {
            filterBox.classList.remove('active');
            toggleIcon.textContent = 'expand_more';
            event.stopPropagation();
        };
        document.onclick = function(event) {
            if (!filterBox.contains(event.target) && !filterButton.contains(event.target)) {
                filterBox.classList.remove('active');
                toggleIcon.textContent = 'expand_more';
            }
        };
    }
}
filterBox.addEventListener('click', function(event) {
    event.stopPropagation();
});
updateFilter();
window.onresize = updateFilter;

categories.forEach(category => {
    category.addEventListener('click', function() {
        categories.forEach(cat => cat.classList.remove('active'));
        this.classList.add('active');
        updateCardVisibility();
    });
});
types.forEach(type => {
    type.addEventListener('click', function() {
        this.classList.toggle('active');
        updateCardVisibility();
    });
});
colors.forEach(color => {
    color.addEventListener('click', function() {
        this.classList.toggle('active');
        updateCardVisibility();
    });
});
searchInput.addEventListener('input', updateCardVisibility);

function updateCardVisibility() {
    const activeCategories = Array.from(categories).filter(cat => cat.classList.contains('active')).map(cat => cat.classList[1]);
    const activeTypes = Array.from(types).filter(type => type.classList.contains('active')).map(type => type.classList[1]);
    const activeColors = Array.from(colors).filter(color => color.classList.contains('active')).map(color => color.classList[1]);
    const searchText = searchInput.value.toLowerCase();
    cards.forEach(card => {
        const isInCategory = activeCategories.includes('all') || activeCategories.some(category => card.classList.contains(category));
        const isInType = activeTypes.length === 0 || activeTypes.some(type => card.classList.contains(type));
        const isInColor = activeColors.length === 0 || activeColors.some(color => card.classList.contains(color));
        const matchesSearch = card.querySelector('.name').textContent.toLowerCase().includes(searchText);
        if (isInCategory && isInType && isInColor && matchesSearch) {
            card.style.display = '';
        } else {
            card.style.display = 'none';
        }
    });
    updateGridLayout(cards.filter(card => card.style.display !== 'none'));
}

function updateGridLayout(visibleCards) {
    resetCardStyles(visibleCards);
    if (window.innerWidth >= 600) {
        applyDesktopGridLayout(visibleCards);
    } else {
        applyMobileGridLayout(visibleCards);
    }
}

function resetCardStyles(visibleCards) {
    visibleCards.forEach(card => {
        let cardImage = card.querySelector('.cardImage');
        cardImage.style.removeProperty('height');
        card.style.removeProperty('order');
        card.style.removeProperty('grid-column');
        card.style.removeProperty('grid-row');
    });
}

function applyMobileGridLayout(visibleCards) {
    visibleCards.forEach((card, index) => {
        let cardImage = card.querySelector('.cardImage');
        card.style.gridColumn = 'span 1';
        if (index % 5 === 4) {
            cardImage.style.height = '400px';
            card.style.gridColumn = 'span 2';
        } else {
            cardImage.style.height = '300px';
        }
    });
    container.style.gridTemplateColumns = 'repeat(2, 1fr)';
}

function applyDesktopGridLayout(visibleCards) {
    visibleCards.forEach((card, index) => {
        let cardImage = card.querySelector('.cardImage');
        const patternIndex = index % 12;
        const baseRow = Math.floor(index / 12) * 6; 

        switch (patternIndex) {
            case 0: case 1: case 2:
                card.style.gridColumn = 'span 1';
                card.style.gridRow = `${baseRow + 1}`;
                cardImage.style.height = '300px';
                break;
            case 3:
                card.style.gridColumn = '1 / 3';
                card.style.gridRow = `${baseRow + 2} / ${baseRow + 4}`;
                cardImage.style.height = '610px';
                break;
            case 4: case 5:
                card.style.gridColumn = '3';
                card.style.gridRow = `${baseRow + 2 + (patternIndex - 4)}`;
                cardImage.style.height = '300px';
                break;
            case 6: case 7: case 8:
                card.style.gridColumn = 'span 1';
                card.style.gridRow = `${baseRow + 4}`;
                cardImage.style.height = '300px';
                break;
            case 9: case 10:
                card.style.gridColumn = '1';
                card.style.gridRow = `${baseRow + 5 + (patternIndex - 9)}`;
                cardImage.style.height = '300px';
                break;
            case 11:
                card.style.gridColumn = '2 / 4';
                card.style.gridRow = `${baseRow + 5} / ${baseRow + 7}`;
                cardImage.style.height = '610px';
                break;
        }
    });
    container.style.gridTemplateColumns = 'repeat(3, 1fr)';
}

updateCardVisibility();
window.addEventListener('resize', function() {
    updateCardVisibility();
});



    