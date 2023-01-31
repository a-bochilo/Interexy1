const navbar = document.querySelector('.navigation');
const checkbox = document.querySelector('#menu__toggle');

window.onload = () => {
  checkbox.checked = false;
};

checkbox.onchange = () => {
  checkbox.checked ? (navbar.style.width = '20%') : (navbar.style.width = '10%');
};
