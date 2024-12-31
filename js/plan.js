import { setAlert } from "./message.js";

const addList = document.querySelector(".addList");
const addListBtn = document.querySelector(".addList__btn");
const planListForm = document.querySelector(".plan__list__form");
const formAddListBtnAdd = document.querySelector(".form__addList__btn__add");
const planShowList = document.querySelector(".plan__show__list");
const listTitleH2 = document.querySelector(".list__title__h2");


let infoUsers = JSON.parse(localStorage.getItem("InfoUsers")) || [];
const loginInfoUser = JSON.parse(localStorage.getItem("loginUser"));

// ***********************************
// Function
const verifyUser = (user) => {
  if (!user) window.location.href = "/index.html";
};

const AddList = (e) => {
    e.preventDefault();
  
    // Access the input element and get its trimmed value
    const formAddListInputElement = planListForm.querySelector(".form__addList__input");
    const formAddListInput = formAddListInputElement.value.trim();
  
    // Validate if the input is empty
    if (!formAddListInput) {
      setAlert("#F9cccc", "#E63535", "Field must be filled");
      return;
    }
  
    // Verify if the logged-in user exists in the infoUsers array
    const userIndex = infoUsers.findIndex(
      (user) => user.userName === loginInfoUser.userName
    );
  
    if (userIndex < 0) {
      setAlert("#F9cccc", "#E63535", "User not found!");
      return;
    }
  
    // Update the user's data by adding the list
    const user = infoUsers[userIndex];
    if (!user.lists) user.lists = []; 
    user.lists.push({nameList:formAddListInput,cards:[]}); 
  
    // Save the updated infoUsers array back to localStorage
    localStorage.setItem("InfoUsers", JSON.stringify(infoUsers));
  
    // Clear the input field
    formAddListInputElement.value = "";

    planListForm.style.display='none';
    planShowList.style.display='block';
    listTitleH2.innerHTML=formAddListInput
  };
  
verifyUser(loginInfoUser);
// ***********************************
// Event
addList.addEventListener("click", function () {
  addList.style.display = "none";
  planListForm.style.display = "block";
});

formAddListBtnAdd.addEventListener("click", AddList);
