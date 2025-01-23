import { setAlert } from "./message.js";

let planList,
  addList,
  planListForm,
  planShowList,
  listTitleH2,
  planShowMenuList,
  planShowInput,
  planCards,
  listTitleSpan,
  planCardsForm,
  formFddCardBtnDelet,
  planCard,
  planCardEdit,
  planCardDelete,
  formAddCardBtnAdd,
  formAddcardInput,
  editCardBtn,
  beforeChangeInput,
  saveCardBtn,
  formCardBtns;

const plan = document.querySelector(".plan");
const planBackground = document.querySelector(".plan__background");

let infoUsers = JSON.parse(localStorage.getItem("InfoUsers")) || [];
const loginInfoUser = JSON.parse(localStorage.getItem("loginUser"));
// Verify if the logged-in user exists in the infoUsers array
const userIndex = infoUsers.findIndex(
  (user) => user.userName === loginInfoUser.userName
);

// ***********************************
// Function
const showAllLists__cards = () => {
  const user = infoUsers[userIndex];
  let html = "";

  if (!user.lists) {
    addHtmlPlanList();
    return;
  }

  user.lists.map(({id, nameList, cards }) => {
    html += _renderAllLists__cards(id,nameList, cards);
  });
  plan.insertAdjacentHTML("beforeend", html);
  addHtmlPlanList();
};

const _renderAllLists__cards = (id,nameList, cards) => {
  const newId = +(Date.now() + "").slice(-10);

  return `  
  <div class="plan__list" data-id="${id}">
    <article class="plan__show__list" style="display: block;" >
      <div class="list__title">
        <h2 class="list__title__h2">${nameList}</h2> 
        <span class="list__title__span">...</span>
        <div class="plan__show__menuList">
          <img class="plan__showList__delete" src="../images/delete_icon.svg" alt="" />
        </div>
      </div>
      <textarea class="plan__show__input" placeholder="Enter list name…"></textarea>
    <ul class="plan__cards">
      ${cards
        .map((card) => {
          return `
                  <li class="plan__cards__form" data-id="${card.id}">
            <div class="plan__card" style="display: flex;">
              <textarea
                class="form__addcard__input"
                placeholder="Enter a title card"
              >${card.nameCard}</textarea>
              <img
                class="plan__card__edit"
                style="display: block;"
                src="../images/edit_icon.svg"
                alt=""
              />
              <img
                class="plan__card__delete"
                style="display: block;"
                src="../images/delete_icon.svg"
                alt=""
              />
            </div>
            <div class="form__card__btns">
              <button class="form__addCard__btn__add transparent" style="display: none;">
                <span class="form__addCard__btn__add__span"> + </span>
                Add Card
              </button>
              <button class="save__card__btn" >
                Add Card
              </button>
              <button class="edit__card__btn" >
                Save Card
              </button>

              <span class="form__addCard__btn__delet" >
                <img src="../images/close_icon.svg" alt="" />
              </span>
            </div>
        </li>

        `;
        })
        .join("")}
        <li class="plan__cards__form" data-id="${newId}">
            <div class="plan__card">
              <textarea
                class="form__addcard__input"
                placeholder="Enter a title card"
              ></textarea>
              <img
                class="plan__card__edit"
                src="../images/edit_icon.svg"
                alt=""
              />
              <img
                class="plan__card__delete"
                src="../images/delete_icon.svg"
                alt=""
              />
            </div>
            <div class="form__card__btns">
              <button class="form__addCard__btn__add transparent" >
                <span class="form__addCard__btn__add__span"> + </span>
                Add Card
              </button>
              <button class="save__card__btn" >
                Add Card
              </button>
              <button class="edit__card__btn" >
                Save Card
              </button>

              <span class="form__addCard__btn__delet" >
                <img src="../images/close_icon.svg" alt="" />
              </span>
            </div>
        </li>
    </ul>

    </article>
  </div>
  `;
};

const verifyUser = (user) => {
  if (!user) window.location.href = "/index.html";
  showAllLists__cards();
};

const AddList = (e) => {
  e.preventDefault();

  // Access the input element and get its trimmed value
  const formAddListInputElement = planListForm.querySelector(
    ".form__addList__input"
  );
  const formAddListInput = formAddListInputElement.value.trim();

  // Validate if the input is empty
  if (!formAddListInput) {
    setAlert("#F9cccc", "#E63535", "Field must be filled");
    return;
  }

  if (userIndex < 0) {
    setAlert("#F9cccc", "#E63535", "User not found!");
    return;
  }

  // Update the user's data by adding the list
  const user = infoUsers[userIndex];
  const id = e.target.closest(".plan__list").dataset.id;
  if (!user.lists) user.lists = [];
  user.lists.push({id,nameList: formAddListInput, cards: [] });

  // Save the updated infoUsers array back to localStorage
  localStorage.setItem("InfoUsers", JSON.stringify(infoUsers));

  // Clear the input field
  formAddListInputElement.value = "";

  planListForm.classList.toggle("active");
  planShowList.classList.toggle("active");
  listTitleH2.innerHTML = formAddListInput;
  addHtmlPlanList();
  addHtmlAddCard();
};

const cancleList = (e) => {
  e.preventDefault();
  planListForm.classList.toggle("active");
  addList.classList.toggle("active");
};

const handleShowMenudeleteList = (e) => {
  e.preventDefault();

  // Return early if the click is inside the ".plan__show__menuList"
  if (e.target.closest(".plan__show__menuList")) return;

  // Check if the click is outside of ".list__title__span"
  if (!e.target.closest(".list__title__span")) {
    handleClickOutsideListTitleMenu(); // Handle the case when clicking outside the span
    return;
  }

  // Toggle menu visibility and apply related classes and styles when ".list__title__span" is clicked
  const isActive = planShowMenuList.classList.toggle("active__opacity");
  planBackground.classList.toggle("active", isActive);
  listTitleSpan.classList.toggle("list__title__span__active", isActive);
  planShowList.style.zIndex = isActive ? "5" : "0";
};

const deleteList = () => {
  const user = infoUsers[userIndex];
  const listIndex = user.lists.findIndex(
    (list) => list.nameList === listTitleH2.textContent
  );

  user.lists.splice(listIndex, 1);
  localStorage.setItem("InfoUsers", JSON.stringify(infoUsers));


  plan.removeChild(planList);
  planBackground.classList.remove("active");
};

const handleClickOutsideListTitleMenu = () => {
  planShowMenuList.classList.remove("active__opacity");
  planBackground.classList.remove("active");
  listTitleSpan.classList.remove("list__title__span__active");
  planShowList.style.zIndex = "0";
};

const editTitleList = (e) => {
  e.preventDefault();

  // پنهان کردن h2 و نمایش ورودی
  listTitleH2.style.display = "none";
  planShowInput.style.display = "block";

  // مقداردهی ورودی با محتوای h2
  planShowInput.value = listTitleH2.textContent;

  // فوکوس دادن به ورودی
  planShowInput.focus();

  // تابع برای ذخیره تغییرات
  const saveTitle = () => {
    if (planShowInput.value.trim() !== listTitleH2.textContent.trim()) {
      const user = infoUsers[userIndex];
      const listIndex = user.lists.findIndex(
        (list) => list.nameList === listTitleH2.textContent
      );

      if (listIndex > -1) {
        user.lists[listIndex].nameList = planShowInput.value.trim();
        localStorage.setItem("InfoUsers", JSON.stringify(infoUsers));
      }
      listTitleH2.textContent = planShowInput.value.trim(); // به‌روزرسانی نمایش
    }
    listTitleH2.style.display = "block";
    planShowInput.style.display = "none";
  };

  // مدیریت فشردن کلید Enter
  const handleEnterOrClickOutside = (e) => {
    if (e.key === "Enter") {
      saveTitle();
    }
  };

  planShowInput.addEventListener("blur", () => {
    saveTitle();
  });

  planShowInput.addEventListener("keydown", handleEnterOrClickOutside);
};

const addHtmlPlanList = () => {
  const id = +(Date.now() + "").slice(-10);
  const html = `  <div class="plan__list" data-id="${id}">
  <div class="addList active">
    <button class="addList__btn" type="button">
      <img src="../images/add_arrow.svg" alt="" />
      Add a list
    </button>
  </div>
  <form class="plan__list__form">
    <textarea
      class="form__addList__input"
      spellcheck="false"
      placeholder="Enter list name…"
    ></textarea>
    <div class="form__btns">
      <button class="form__addList__btn__add">Add list</button>
      <button class="form__addList__btn__delet" type="button">
        <img src="../images/close_icon.svg" alt="" />
      </button>
    </div>
  </form>
  <article class="plan__show__list">
    <div class="list__title">
      <h2 class="list__title__h2"></h2>
      <span class="list__title__span">...</span>
      <div class="plan__show__menuList">
        <img
          class="plan__showList__delete"
          src="../images/delete_icon.svg"
          alt=""
        />
      </div>
    </div>
    <textarea
      class="plan__show__input"
      placeholder="Enter list name…"
    ></textarea>
    <ul class="plan__cards">
    </ul>
  </article>
</div>
`;
  plan.insertAdjacentHTML("beforeend", html);
};

// ///////////////////////////////////
const showFormCard = (e) => {
  e.preventDefault();

  formAddcardInput.value = "";

  planCard.style.display = "flex";
  formFddCardBtnDelet.style.display = "block";
  planCard.classList.toggle("active__plan__card");
  formAddCardBtnAdd.style.display = "none";
  saveCardBtn.style.display = "block";

  // فوکوس دادن به ورودی
  formAddcardInput.focus();
};

const addCard = (e) => {
  e.preventDefault();
  const trimmedValue = formAddcardInput.value.trim();
  const id = e.target.closest(".plan__cards__form").dataset.id;


  if (!trimmedValue) {
    setAlert("#F9cccc", "#E63535", "Field must be filled");
    return;
  }
  const user = infoUsers[userIndex];
  const listIndex = user.lists.findIndex(
    (list) => list.nameList === listTitleH2.textContent
  );

  if (listIndex > -1) {
    user.lists[listIndex].cards.push({id,nameCard:trimmedValue});
    localStorage.setItem("InfoUsers", JSON.stringify(infoUsers));
    formCardBtns.style.display = "none";
    formAddcardInput.disabled = true;
    planCardEdit.style.display = "block";
    planCardDelete.style.display = "block";
    addHtmlAddCard();
  }
};

const cancleCard = () => {
  planCard.style.display = "none";
  formFddCardBtnDelet.style.display = "none";
  formAddCardBtnAdd.style.display = "block";
  saveCardBtn.style.display = "none";
};

const showEditCard = (e) => {
  formCardBtns.style.display = "block";
  formAddCardBtnAdd.style.display = "none";
  saveCardBtn.style.display = "none";
  formFddCardBtnDelet.style.display = "none";
  editCardBtn.style.display = "block";

  formAddcardInput.disabled = false;
  formAddcardInput.focus();

  beforeChangeInput = formAddcardInput.value.trim();
};

const editCard = () => {
  const user = infoUsers[userIndex];
  const listIndex = user.lists.findIndex(
    (list) => list.nameList === listTitleH2.textContent
  );

  let cardIndex = user.lists[listIndex].cards.findIndex(
    (card) => card.nameCard === beforeChangeInput
  );

  //  برای ذخیره تغییرات
  if (listIndex > -1) {
    const trimmedValue = formAddcardInput.value.trim();
    user.lists[listIndex].cards[cardIndex].nameCard = trimmedValue;
    localStorage.setItem("InfoUsers", JSON.stringify(infoUsers));
    formAddcardInput.disabled = true;
    formCardBtns.style.display = "none";
  }
};

const deleteCard = () => {
  const user = infoUsers[userIndex];
  const listIndex = user.lists.findIndex(
    (list) => list.nameList === listTitleH2.textContent
  );

  let cardIndex = user.lists[listIndex].cards.findIndex(
    (card) => card.nameCard === formAddcardInput.value
  );
  user.lists[listIndex].cards.splice(cardIndex, 1);
  localStorage.setItem("InfoUsers", JSON.stringify(infoUsers));
  planCards.removeChild(planCardsForm);
};

const addHtmlAddCard = () => {
  const id = +(Date.now() + "").slice(-10);

  const html = `
        <li class="plan__cards__form" data-id="${id}">
            <div class="plan__card">
              <textarea
                class="form__addcard__input"
                placeholder="Enter a title card"
              ></textarea>
              <img
                class="plan__card__edit"
                src="../images/edit_icon.svg"
                alt=""
              />
              <img
                class="plan__card__delete"
                src="../images/delete_icon.svg"
                alt=""
              />
            </div>
            <div class="form__card__btns">
              <button class="form__addCard__btn__add transparent" >
                <span class="form__addCard__btn__add__span"> + </span>
                Add Card
              </button>
              <button class="save__card__btn" >
                Add Card
              </button>
              <button class="edit__card__btn" >
                Save Card
              </button>

              <span class="form__addCard__btn__delet" >
                <img src="../images/close_icon.svg" alt="" />
              </span>
            </div>
        </li>
`;
  planCards.insertAdjacentHTML("beforeend", html);
};

// ***********************************
// Event Delegation
plan.addEventListener("click", function (e) {
  planList = e.target.closest(".plan__list");
  addList = planList && planList.querySelector(".addList");
  planListForm = planList && planList.querySelector(".plan__list__form");
  planShowList = planList && planList.querySelector(".plan__show__list");
  listTitleH2 = planList && planList.querySelector(".list__title__h2");
  listTitleSpan = planList && planList.querySelector(".list__title__span");
  planShowMenuList =
    planList && planList.querySelector(".plan__show__menuList");
  planShowInput = planList && planList.querySelector(".plan__show__input");
  planCards = planList && planList.querySelector(".plan__cards");
  planCardsForm = e.target.closest(".plan__cards__form");
  planCard = planCardsForm && planCardsForm.querySelector(".plan__card");
  planCardEdit =
    planCardsForm && planCardsForm.querySelector(".plan__card__edit");
  planCardDelete =
    planCardsForm && planCardsForm.querySelector(".plan__card__delete");
  formFddCardBtnDelet =
    planCardsForm && planCardsForm.querySelector(".form__addCard__btn__delet");
  formCardBtns =
    planCardsForm && planCardsForm.querySelector(".form__card__btns");
  formAddCardBtnAdd =
    planCardsForm && planCardsForm.querySelector(".form__addCard__btn__add");
  formAddcardInput =
    planCardsForm && planCardsForm.querySelector(".form__addcard__input");
  saveCardBtn =
    planCardsForm && planCardsForm.querySelector(".save__card__btn");
  editCardBtn =
    planCardsForm && planCardsForm.querySelector(".edit__card__btn");

  // Add List button clicked
  if (e.target.closest(".addList__btn")) {
    addList.classList.toggle("active");
    planListForm.classList.toggle("active");
  }

  // Hide the "Add List" form when the delete button is clicked
  if (e.target.closest(".form__addList__btn__delet")) {
    cancleList(e);
  }

  // Handle click on "Add List" form button
  if (e.target.closest(".form__addList__btn__add")) {
    AddList(e);
  }

  // Handles logic for toggling visibility of the menu or responding to clicks outside it.
  handleShowMenudeleteList(e);

  if (e.target.closest(".plan__showList__delete")) {
    deleteList(e);
  }

  if (e.target.closest(".list__title__h2")) {
    editTitleList(e);
  }

  if (e.target.closest(".form__addCard__btn__add")) showFormCard(e);
  console.log(e.target)
  if (e.target.closest(".save__card__btn")) addCard(e);

  if (e.target.closest(".form__addCard__btn__delet")) cancleCard(e);

  if (e.target.closest(".plan__card__edit")) showEditCard(e);

  if (e.target.closest(".edit__card__btn")) editCard(e);

  if (e.target.closest(".plan__card__delete")) deleteCard(e);
});

// Add an event listener for the planBackground element
planBackground.addEventListener("click", handleClickOutsideListTitleMenu);

// Verify the user
verifyUser(loginInfoUser);

// showAllLists__cards();
