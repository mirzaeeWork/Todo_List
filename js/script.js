const popup = document.getElementById('popup');
const loginForm = document.querySelector('.loginForm');
const signupForm = document.querySelector('.signupForm');
const loginLink = document.querySelector('.loginLink');
const signupLink = document.querySelector('.signupLink');
const userInfo = document.querySelector('.user-info');
const logOutLink = document.querySelector('.log-out-Link');
const links = document.querySelectorAll('.link');
const alert = document.querySelector('.alert');
const alertMessage = document.querySelector('.alert__message');
const logoMenu = document.querySelector('.logo__menu');

// **************************************

let infoUsers = JSON.parse(localStorage.getItem('InfoUsers')) || [];

// **************************************
// Function
function setAlert(bg,color ,text) {
  alert.classList.add('active'); 
  alert.style.background = bg;
  alertMessage.style.color = color;
  alertMessage.textContent=text

  setTimeout(() => {
    alert.classList.remove('active');
  }, 4000); 
}

function handleClickForm(e) {
  e.preventDefault();

  // دریافت مقادیر ورودی‌ها
  const userName = e.target.querySelector('.user-input').value.trim();
  const password = e.target.querySelector('.password-input').value.trim();

  if (!userName || !password) {
    setAlert("#F9cccc", "#E63535","Fields must be filled")
    return;
  }


  if (e.target.closest('.signupForm')) {
    // ثبت کاربر جدید
    addUser(userName, password);
  } else {
    // ورود کاربر
    loginUser(userName, password);
  }

  e.target.querySelector('.user-input').value='';
  e.target.querySelector('.password-input').value='';

}

// Add User
function addUser(userName, password) {
  const userExists = infoUsers.some(user => user.userName === userName);

  if (userExists) {
    setAlert("#F9cccc", "#E63535","This user is already registered");
    return;
  }

  infoUsers.push({ userName, password });
  localStorage.setItem('InfoUsers', JSON.stringify(infoUsers));
  setAlert("#C6ECD4" , "#1CB774","User successfully registered");
  handleForm();
}

// Login User
function loginUser(userName, password) {
  const user = infoUsers.find(user => user.userName === userName && user.password === password);

  if (!user) {
    setAlert("#F9cccc", "#E63535","User not found");
    return;
  }

  console.log(user)
  localStorage.setItem('loginUser', JSON.stringify(user));  
  setAlert("#C6ECD4" , "#1CB774","The entry was successful");
  window.location.hash = '';
  loginLink.style.display='none';
  signupLink.style.display='none';
  userInfo.style.display='inline-block';
  logOutLink.style.display='inline-block';
  userInfo.textContent =user.userName[0];
  userInfo.style.textTransform = 'uppercase';
  userInfo.style.setProperty('--user-name', `"${user.userName}"`);
  logoMenu.style.display='inline-block';
}

//handle Form
function handleForm() {
  loginForm.classList.toggle('hidden');
  signupForm.classList.toggle('hidden');

}

// **************************************
// Event
links.forEach(item => {
  item.addEventListener('click', function () {
    handleForm()
  });
});

loginLink.addEventListener('click', () => {
  loginForm.classList.remove('hidden');
  signupForm.classList.add('hidden');
});

signupLink.addEventListener('click', () => {
  signupForm.classList.remove('hidden');
  loginForm.classList.add('hidden');
});

loginForm.addEventListener('submit', handleClickForm);
signupForm.addEventListener('submit', handleClickForm);

logOutLink.addEventListener('click',function(){
  localStorage.removeItem('loginUser');
  window.location.hash = '';
  userInfo.style.display='none';
  logOutLink.style.display='none';
  userInfo.textContent = '';
  loginLink.style.display='inline-block';
  signupLink.style.display='inline-block';

})

logoMenu.addEventListener('click',()=>{
  
})
