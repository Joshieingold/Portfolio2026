const contentIds = [
  "summary-content",
  "skills-content",
  "projects-content",
  "education-content",
];
let currentHighlight = "";

window.onload = function () {
  AddButtonListenerByName("#header-title", HeaderClick);
  AddButtonListenerByName("#summary", SummaryClick);
  AddButtonListenerByName("#skills", SkillsClick);
  AddButtonListenerByName("#projects", ProjectsClick);
  AddButtonListenerByName("#education", EducationClick);
};
async function HeaderClick() {
  await TypeInTerminal("cd ~");
  ClearMiniNav();
  ClearNavHighlights();
  HideAllExcept("");
  // reset all the divs
}

async function SummaryClick() {
  if (currentHighlight != "#summary") {
    await TypeInTerminal("exec summary");
    CreateMiniNav();
    ChangeActiveHighlight("#summary");
    currentHighlight = "#summary";
    HideAllExcept("summary");
  }
}
async function SkillsClick() {
  if (currentHighlight != "#skills") {
    await TypeInTerminal("which skills");
    CreateMiniNav();
    ChangeActiveHighlight("#skills");
    currentHighlight = "#skill";
    HideAllExcept("skills");
  }
}
async function ProjectsClick() {
  if (currentHighlight != "#projects") {
    await TypeInTerminal("ls ./projects");
    CreateMiniNav();
    ChangeActiveHighlight("#projects");
    currentHighlight = "#projects";
    HideAllExcept("projects");
  }
}
async function EducationClick() {
  if (currentHighlight != "#education") {
    await TypeInTerminal("cat education");
    CreateMiniNav();
    ChangeActiveHighlight("#education");
    currentHighlight = "#education";
    HideAllExcept("education");
  }
}

function HideAllExcept(idToUnHide) {
  for (let i = 0; i < contentIds.length; i++) {
    hideId = document.querySelector(`#${contentIds[i]}`);
    if (hideId != null) {
      if (contentIds[i] != `${idToUnHide}-content`) {
        hideId.classList.add("hidden");
        hideId.classList.remove("content-flex");
      } else {
        hideId.classList.remove("hidden");
        hideId.classList.add("content-flex");
      }
    }
  }
}
function AddButtonListenerByName(classOrId, func) {
  let targetElement = document.querySelector(classOrId);
  if (!targetElement) {
    console.log("Add Button Failed!");
  } else {
    targetElement.addEventListener("click", func);
  }
}
function ClearNavHighlights() {
  allHighlights = document.querySelectorAll(".highlight-nav");
  for (let i = 0; i < allHighlights.length; i++) {
    allHighlights[i].classList.remove("highlight-nav");
  }
  currentHighlight = "";
}
function ChangeActiveHighlight(currentPage) {
  let foundLink = document.querySelector(currentPage);
  ClearNavHighlights();
  if (foundLink) {
    foundLink.classList.add("highlight-nav");
    currentHighlight = currentPage;
  }
}
function CreateMiniNav() {
  let navElement = document.querySelector(".navigation-container");
  navElement.style.height = "5%";
  let navList = navElement.querySelector(".nav-list");
  navList.style.flexDirection = "row";
  navList.style.width = "100%";
  let itemList = navList.querySelectorAll("li");
  for (let i = 0; i < itemList.length; i++) {
    itemList[i].style.fontSize = "14pt";
    itemList[i].style.width = "25%";
  }
}
function ClearMiniNav() {
  navElement = document.querySelector(".navigation-container");
  navElement.style.height = "100%";
  let navList = navElement.querySelector(".nav-list");
  navList.style.flexDirection = "column";
  navList.style.width = "100%";
  let itemList = navList.querySelectorAll("li");
  for (let i = 0; i < itemList.length; i++) {
    itemList[i].style.fontSize = "24pt";
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
    await sleep(300);
    element.innerHTML = "|";
    await sleep(300);
    element.innerHTML = "";
  }
  for (let i = 0; i < textToType.length; i++) {
    await sleep(100);
    element.innerHTML = element.innerHTML + textToType[i];
  }
  await sleep(200);
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
