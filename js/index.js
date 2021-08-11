//////////////////////////////////////  Regular    //////////////////////////////////////////

const navBtn = document.querySelector(".header__nav-btn");
const headerList = document.querySelector(".header__list");
const headerDummySpace = document.querySelector(".header__dummy-space");

navBtn.onclick = function() {
    this.classList.toggle("header__nav-btn--active");
    headerList.classList.toggle("header__list--active");
    headerDummySpace.classList.toggle("header__dummy-space--active");
}

const navLinks = document.querySelectorAll(".header__link");

navLinks.forEach((link) => {
    link.addEventListener("click", () => {
        navBtn.classList.toggle("header__nav-btn--active");
        headerList.classList.toggle("header__list--active");
        headerDummySpace.classList.toggle("header__dummy-space--active");
    })
})

//////////////////////////////////////  For Glider  /////////////////////////////////////////

var options = {
   gap: 70,
   type: "carousel",
   perView: 4,
   focusAt: "center",
   breakpoints: {
      1136: {
         perView: 3,
      },
      700: {
         perView: 2,
      },
      420: {
         perView: 1,
      },
   },
};
var glide = new Glide(".glide", options);
var glide2 = new Glide(".glide2", options);

glide.mount();
glide2.mount();