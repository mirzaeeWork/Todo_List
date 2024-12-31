// const popup = document.getElementById("popup");
// const loginForm = document.querySelector(".loginForm");
// const signupForm = document.querySelector(".signupForm");
// const loginLink = document.querySelector(".loginLink");
// const signupLink = document.querySelector(".signupLink");
// const userInfo = document.querySelector(".user-info");
// const logOutLink = document.querySelector(".log-out-Link");
// const links = document.querySelectorAll(".link");
// const alert = document.querySelector(".alert");
// const alertMessage = document.querySelector(".alert__message");
// const logoMenu = document.querySelector(".logo__menu");

// // **************************************

// let infoUsers = JSON.parse(localStorage.getItem("InfoUsers")) || [];
// const loginInfoUser = JSON.parse(localStorage.getItem("loginUser"));

// // **************************************
// // Function
// function setAlert(bg, color, text) {
//   alert.classList.add("active");
//   alert.style.background = bg;
//   alertMessage.style.color = color;
//   alertMessage.textContent = text;

//   setTimeout(() => {
//     alert.classList.remove("active");
//   }, 4000);
// }

// function handleSignupOrLoginClickForm(e) {
//   e.preventDefault();

//   // دریافت مقادیر ورودی‌ها
//   const userName = e.target.querySelector(".user-input").value.trim();
//   const password = e.target.querySelector(".password-input").value.trim();

//   if (!userName || !password) {
//     setAlert("#F9cccc", "#E63535", "Fields must be filled");
//     return;
//   }

//   e.target.closest(".signupForm")
//     ? addUser(userName, password)
//     : loginUser(userName, password);

//   e.target.querySelector(".user-input").value = "";
//   e.target.querySelector(".password-input").value = "";
// }

// // Add User
// function addUser(userName, password) {
//   const userExists = infoUsers.some((user) => user.userName === userName);

//   if (userExists) {
//     setAlert("#F9cccc", "#E63535", "This user is already registered");
//     return;
//   }

//   infoUsers.push({ userName, password });
//   localStorage.setItem("InfoUsers", JSON.stringify(infoUsers));
//   setAlert("#C6ECD4", "#1CB774", "User successfully registered");
//   handleSignupOrLoginForm();
// }

// // Login User
// function loginUser(userName, password) {
//   const user = infoUsers.find(
//     (user) => user.userName === userName && user.password === password
//   );

//   if (!user) {
//     setAlert("#F9cccc", "#E63535", "User not found");
//     return;
//   }

//   console.log(user);
//   localStorage.setItem("loginUser", JSON.stringify(user));
//   setAlert("#C6ECD4", "#1CB774", "The entry was successful");
//   handleButtonHeader(user);
// }

// // Set whether to show or hide the signup, login, userInfo, and logout buttons in the header
// const handleButtonHeader = (user) => {
//   window.location.hash = "";
//   loginLink.style.display = "none";
//   signupLink.style.display = "none";
//   userInfo.style.display = "inline-block";
//   logOutLink.style.display = "inline-block";
//   userInfo.textContent = user.userName[0];
//   userInfo.style.textTransform = "uppercase";
//   userInfo.style.setProperty("--user-name", `"${user.userName}"`);
//   logoMenu.style.display = "inline-block";
// };

// //handle Form
// function handleSignupOrLoginForm() {
//   loginForm.classList.toggle("hidden");
//   signupForm.classList.toggle("hidden");
// }

// handleButtonHeader(loginInfoUser);

// // **************************************
// // Event
// links.forEach((item) => {
//   item.addEventListener("click", function () {
//     handleSignupOrLoginForm();
//   });
// });

// loginLink.addEventListener("click", () => {
//   loginForm.classList.remove("hidden");
//   signupForm.classList.add("hidden");
// });

// signupLink.addEventListener("click", () => {
//   signupForm.classList.remove("hidden");
//   loginForm.classList.add("hidden");
// });

// loginForm.addEventListener("submit", handleSignupOrLoginClickForm);
// signupForm.addEventListener("submit", handleSignupOrLoginClickForm);

// logOutLink.addEventListener("click", function () {
//   localStorage.removeItem("loginUser");
//   window.location.hash = "";
//   userInfo.style.display = "none";
//   logOutLink.style.display = "none";
//   userInfo.textContent = "";
//   loginLink.style.display = "inline-block";
//   signupLink.style.display = "inline-block";
// });

// logoMenu.addEventListener("click", () => {});
// *********************************
// class component

class AuthComponent {
  constructor() {
    this.popup = document.getElementById("popup");
    this.loginForm = document.querySelector(".loginForm");
    this.signupForm = document.querySelector(".signupForm");
    this.loginLink = document.querySelector(".loginLink");
    this.signupLink = document.querySelector(".signupLink");
    this.userInfo = document.querySelector(".user-info");
    this.logOutLink = document.querySelector(".log-out-Link");
    this.links = document.querySelectorAll(".link");
    this.alert = document.querySelector(".alert");
    this.alertMessage = document.querySelector(".alert__message");
    this.logoMenu = document.querySelector(".logo__menu");
    // local storage
    this.infoUsers = JSON.parse(localStorage.getItem("InfoUsers")) || [];
    this.loginInfoUser = JSON.parse(localStorage.getItem("loginUser"));

    this.init();
  }

  init() {
    this.attachEventListeners();
    this.handleButtonHeader(this.loginInfoUser);
  }

  setAlert(bg, color, text) {
    this.alert.classList.add("active");
    this.alert.style.background = bg;
    this.alertMessage.style.color = color;
    this.alertMessage.textContent = text;

    setTimeout(() => {
      this.alert.classList.remove("active");
    }, 3000);
  }

  handleSignupOrLoginClickForm(e) {
    e.preventDefault();

    const userName = e.target.querySelector(".user-input").value.trim();
    const password = e.target.querySelector(".password-input").value.trim();

    if (!userName || !password) {
      this.setAlert("#F9cccc", "#E63535", "Fields must be filled");
      return;
    }

    if (e.target.classList.contains("signupForm")) {
      this.addUser(userName, password);
    } else {
      this.loginUser(userName, password);
    }

    e.target.querySelector(".user-input").value = "";
    e.target.querySelector(".password-input").value = "";
  }

  addUser(userName, password) {
    const userExists = this.infoUsers.some((user) => user.userName === userName);

    if (userExists) {
      this.setAlert("#F9cccc", "#E63535", "This user is already registered");
      return;
    }

    this.infoUsers.push({ userName, password });
    localStorage.setItem("InfoUsers", JSON.stringify(this.infoUsers));
    this.setAlert("#C6ECD4", "#1CB774", "User successfully registered");
    this.handleSignupOrLoginForm();
  }

  loginUser(userName, password) {
    const user = this.infoUsers.find(
      (user) => user.userName === userName && user.password === password
    );

    if (!user) {
      this.setAlert("#F9cccc", "#E63535", "User not found");
      return;
    }

    localStorage.setItem("loginUser", JSON.stringify(user));
    this.setAlert("#C6ECD4", "#1CB774", "The entry was successful");
    this.handleButtonHeader(user);
  }

  // Set whether to show or hide the signup, login, userInfo, and logout buttons in the header
  handleButtonHeader(user) {
    if (user) {
      window.location.hash = "";
      this.loginLink.style.display = "none";
      this.signupLink.style.display = "none";
      this.userInfo.style.display = "inline-block";
      this.logOutLink.style.display = "inline-block";
      this.userInfo.textContent = user.userName[0].toUpperCase();
      this.userInfo.style.setProperty("--user-name", `"${user.userName}"`);
      this.logoMenu.style.display = "inline-block";
    } else {
      this.userInfo.style.display = "none";
      this.logOutLink.style.display = "none";
      this.logoMenu.style.display = "none";
      this.userInfo.textContent = "";
      this.loginLink.style.display = "inline-block";
      this.signupLink.style.display = "inline-block";
    }
  }

  handleSignupOrLoginForm() {
    this.loginForm.classList.toggle("hidden");
    this.signupForm.classList.toggle("hidden");
  }

  logOutUser() {
    localStorage.removeItem("loginUser");
    this.handleButtonHeader(null);
    window.location.href = "/index.html";
  }

  attachEventListeners() {
    this.links.forEach((item) => {
      item.addEventListener("click", this.handleSignupOrLoginForm.bind(this));
    });

    this.loginLink.addEventListener("click", () => {
      this.loginForm.classList.remove("hidden");
      this.signupForm.classList.add("hidden");
    });

    this.signupLink.addEventListener("click", () => {
      this.signupForm.classList.remove("hidden");
      this.loginForm.classList.add("hidden");
    });

    this.loginForm.addEventListener("submit", this.handleSignupOrLoginClickForm.bind(this));
    this.signupForm.addEventListener("submit", this.handleSignupOrLoginClickForm.bind(this));

    this.logOutLink.addEventListener("click", this.logOutUser.bind(this));

  }
}

// Instantiate the AuthComponent
const authComponent = new AuthComponent();

