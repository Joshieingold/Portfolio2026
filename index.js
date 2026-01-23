const contentIds = [
  "summary-content",
  "skills-content",
  "projects-content",
  "education-content",
];
window.onload = function () {
  AddButtonListenerByName("#summary", SummaryClick);
  AddButtonListenerByName("#header-title", TypeInTerminal("fastfetch"));
};

function SummaryClick() {
  CreateMiniNav();
  TypeInTerminal("clear");
}
function AddButtonListenerByName(classOrId, func) {
  let targetElement = document.querySelector(classOrId);
  if (!targetElement) {
    console.log("Add Button Failed!");
  } else {
    targetElement.addEventListener("click", func);
  }
}
function CreateMiniNav() {
  let bigNav = document.querySelector(".navigation-container");
  bigNav.style.height = "5%";
  let navList = bigNav.querySelector(".nav-list");
  navList.style.flexDirection = "row";
  navList.style.width = "100%";
  let itemList = navList.querySelectorAll("li");
  for (let i = 0; i < itemList.length; i++) {
    itemList[i].style.fontSize = "14pt";
    itemList[i].style.width = "25%";
  }
}

async function TypeInTerminal(textToType) {
  let terminal = document.querySelector("#terminal");
  terminal.style.transform = "translateY(0vh)";
  await TypeText(terminal, textToType);
  terminal.innerHTML = "";
  terminal.style.transform = "translateY(100vh)";
}
async function TypeText(element, textToType) {
  for (let i = 0; i < 2; i++) {
    await sleep(400);
    element.innerHTML = "|";
    await sleep(400);
    element.innerHTML = "";
  }
  for (let i = 0; i < textToType.length; i++) {
    await sleep(200);
    element.innerHTML = element.innerHTML + textToType[i];
  }
  await sleep(300);
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
