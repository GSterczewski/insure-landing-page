window.addEventListener("DOMContentLoaded", ()=>{
  const hamburgerButton = document.getElementById("js-hamburger");
  const navigation = document.getElementById("js-navigation"); 
  hamburgerButton.addEventListener("click", () => {
    hamburgerButton.classList.toggle("hamburger-menu--open");
    navigation.classList.toggle("header__navigation--active");
  })
})