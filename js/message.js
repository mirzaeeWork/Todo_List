const alert = document.querySelector(".alert");
const alertMessage = document.querySelector(".alert__message");


export const setAlert=(bg, color, text)=> {
  alert.classList.add("active");
  alert.style.background = bg;
  alertMessage.style.color = color;
  alertMessage.textContent = text;

  setTimeout(() => {
    alert.classList.remove("active");
  }, 3000);
}
