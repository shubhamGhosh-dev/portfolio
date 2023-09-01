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
////////////////////////////////////// For Message Sending ////////////////////////////////////

const nameInput = document.getElementById("name_input");
const emailInput = document.getElementById("email-input");
const messageInput = document.getElementById("message-input");
const messageForm = document.getElementById("message-form");
const messageAlart = document.getElementById("message-alart");
const msgSubmitBtn = document.getElementById("message-submit-btn"); 

const sendIcon = document.getElementById("send-icon");
const lodingIcon = document.getElementById("loading-icon");

// const LOCAL_API_LINK = 'http://localhost:3000/api/send-message';
const API_LINK = 'https://strange-clothes-lion.cyclic.app/api/send-message';

messageForm.addEventListener("submit", async (e) => {
   e.preventDefault();

   if(
      nameInput.value && 
      (emailInput.value && validateEmailID(emailInput.value)) && 
      messageInput.value
      ){
      disableBtn();
      sendMessage(nameInput.value, emailInput.value, messageInput.value)
         .then(res => {
            if(res.success){
               nameInput.value = "";
               emailInput.value = "";
               messageInput.value = "";
            }
            enableBtn()
            showAlert(res.message? res.message : "Something went wrong.");
         }).catch(err => {
            console.log(err);
            showAlert("Something went wrong.");
         })
   }else{
      if(emailInput.value && !validateEmailID(emailInput.value)){
         showAlert("Please enter a valid email ID")
      }else{
         showAlert("Please fill the form appropriately.");
      }
   }
})

function showAlert(msg){
   messageAlart.classList.add("active");
   messageAlart.innerText = msg;

   setTimeout(() => {
      messageAlart.classList.remove("active");
   }, 4500)
}

async function sendMessage(name, email, message){
   const body = {
      name,
      email,
      message,
   }
   const header = {
      'Content-Type': 'application/json'
   }

   const options = {method: 'POST', headers: header, body: JSON.stringify(body)};

   const res = await fetch(API_LINK, options).then(response => response.json())
   return res;
}

function validateEmailID(email){
   const REG_EXP = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
   if(REG_EXP.test(email)){
       return true;
   }
   return false;
}

function disableBtn(){
   msgSubmitBtn.setAttribute("disabled", true);
   msgSubmitBtn.classList.add("disable-send-btn")
   sendIcon.classList.add("disabled");
   lodingIcon.classList.remove("disabled");
}
function enableBtn(){
   msgSubmitBtn.removeAttribute("disabled");
   msgSubmitBtn.classList.remove("disable-send-btn")
   sendIcon.classList.remove("disabled");
   lodingIcon.classList.add("disabled");
}