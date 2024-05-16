let lastScrollTop = 0;
const header = document.querySelector(".headerContainer");
const heroSection = document.querySelector(".hero");

const observerOptions = {
  root: null,
  threshold: [0]
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      header.classList.add("invert");
    } else {
      header.classList.remove("invert");
    }
  });
}, observerOptions);

if (heroSection) {
  observer.observe(heroSection);
}

window.addEventListener("scroll", function() {
  let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  
  if (scrollTop > lastScrollTop) {
    header.classList.add("scroll-down");
    header.classList.remove("scroll-up");
  } else {
    header.classList.add("scroll-up");
    header.classList.remove("scroll-down");
  }
  lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; 
}, false);