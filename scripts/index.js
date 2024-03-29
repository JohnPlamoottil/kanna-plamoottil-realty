const initialCards = [
  {
    name: "277 W Biros Ln",
    link: "./card-images/277wbirosln.jpg",
    // link: "https://drive.google.com/file/d/12BWOuWeW6XUBWIFNzFDmKHZBYh5xaphZ/view?usp=drive_link",
  },
  {
    name: "154 Wildflower Ln",
    link: "./card-images/154wildflowerln.jpg",
    // link: "https://drive.google.com/file/d/1_tZJgbybSxvZf8JQQDzNINmOt-0Eo-ya/view?usp=drive_link",
  },
  {
    name: "1001 S Windsor Ct",
    link: "./card-images/1001swindsorct.jpg",
    // link: "https://drive.google.com/file/d/1k6G5CGzNXYFkOWgaAG3wagvMbdcUabw7/view?usp=drive_link",
  },
  {
    name: "532 Fairfax Ln",
    link: "./card-images/532fairfaxln.jpg",
    // link: "https://drive.google.com/file/d/1oYe5ce-PlNeYHrUrvHIA81Ngb9N3cO7f/view?usp=drive_link",
  },
  {
    name: "525 S Park Rd",
    link: "./card-images/525sparkrd.jpg",
    // link: "https://drive.google.com/file/d/1NY0QPntkeXdqEVh3rkXyLqKXKpWjdicC/view?usp=drive_link",
  },
  {
    name: "2583 W Birch Dr",
    link: "./card-images/2583wbirchdr.jpg",
    // link: "https://drive.google.com/file/d/1wt6WTZQy_8E6HY8N0WVhqImKR8J5kFg2/view?usp=drive_link",
  },
];

/*----------------------------------ELEMENTS----------------------------------*/

//Selecting profile elements
const profileEditButton = document.querySelector(".profile__edit-button");
const profileAddCardButton = document.querySelector(".profile__add-button");
const profileName = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

//Selecting modal elements
const modal = document.querySelector(".modal");
const modalCloseButtons = document.querySelectorAll(".modal__close-button");

//Selecting modal profile elements
const modalProfileEdit = document.querySelector("#modal-profile");
const modalProfileFormName = document.querySelector(
  ".modal__form-name_profile"
);
const modalProfileFormDescription = document.querySelector(
  ".modal__form-description_profile"
);
const modalProfileForm = document.querySelector(".modal__form_profile");

//Selecting modal new place elements
const modalNewPlaceAdd = document.querySelector("#modal-newplace");
const modalNewPlaceFormTitle = document.querySelector(
  ".modal__form-title_newplace"
);
const modalNewPlaceFormLink = document.querySelector(
  ".modal__form-url_newplace"
);
const modalNewPlaceForm = document.querySelector(".modal__form_newplace");

//Selecting modal image preview elements
const modalImagePreview = document.querySelector("#modal-preview");
const modalImagePreviewLink = document.querySelector(".modal__image_preview");
const modalImagePreviewCaption = document.querySelector(
  ".modal__caption_preview"
);

//Selecting card list
const cardList = document.querySelector(".cards__list");

//Selecting card template
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;

/*----------------------------------FUNCTIONS----------------------------------*/

function openPopup(modal) {
  modal.classList.add("modal_opened");
}

function closePopup(modal) {
  modal.classList.remove("modal_opened");
}
/*Function that makes inputs values of name and description being
same as current name and description on page when form opened*/
function openProfilePopup() {
  modalProfileFormName.value = profileName.textContent;
  modalProfileFormDescription.value = profileDescription.textContent;
  openPopup(modalProfileEdit);
}

//Function which will get card data
function getCardData(cardData) {
  //Selecting card and cloning it same amount of times as array length
  const cardElement = cardTemplate.cloneNode(true);

  //Selecting images and title of our card
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");

  //Selecting like button
  const cardLikeButton = cardElement.querySelector(".card__like-button");

  //Selecting delete button
  const cardDeleteButton = cardElement.querySelector(".card__delete-button");

  //Setting text, image and alt data same as arrays data
  cardTitle.textContent = cardData.name;
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;

  //OnClick event for heart icon which will change color of it
  cardLikeButton.addEventListener("click", () => {
    cardLikeButton.classList.toggle("card__like-button_black");
  });

  //OnClick event for trash icon which will delete card
  cardDeleteButton.addEventListener("click", () => {
    cardElement.remove();
  });

  //OnClick event which will open image preview with caption
  cardImage.addEventListener("click", () => {
    modalImagePreviewLink.src = cardImage.src;
    modalImagePreviewLink.alt = cardImage.alt;
    modalImagePreviewCaption.textContent = cardTitle.textContent;
    openPopup(modalImagePreview);
  });

  return cardElement;
}

//Function which will render card
function renderCard(cardData) {
  cardList.prepend(getCardData(cardData));
}

//Function which will save changes that we made with profile form
function saveProfileFormChanges(event) {
  event.preventDefault();
  profileName.textContent = modalProfileFormName.value;
  profileDescription.textContent = modalProfileFormDescription.value;
  closePopup(modalProfileEdit);
}

//Function which will add new place card
function addNewPlaceCard(event) {
  event.preventDefault();
  const link = modalNewPlaceFormLink.value;
  const name = modalNewPlaceFormTitle.value;
  renderCard({
    name: name,
    link: link,
  });
  event.target.reset();
  closePopup(modalNewPlaceAdd);
}

//Function that will make all cards visible
initialCards.forEach(renderCard);

/*----------------------------------SUBMIT HANDLERS----------------------------------*/

//Submit profile form
modalProfileForm.addEventListener("submit", saveProfileFormChanges);

//Submit new place form
modalNewPlaceForm.addEventListener("submit", addNewPlaceCard);

/*----------------------------------EVENT LISTENERS----------------------------------*/

//Open profile edit form
profileEditButton.addEventListener("click", openProfilePopup);

//Close any modal
modalCloseButtons.forEach((button) => {
  const modal = button.closest(".modal");
  button.addEventListener("click", () => closePopup(modal));
});

//Open form which will add new place
profileAddCardButton.addEventListener("click", () => {
  openPopup(modalNewPlaceAdd);
});
