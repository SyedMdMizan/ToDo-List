const itemsArray = localStorage.getItem("items")
  ? JSON.parse(localStorage.getItem("items"))
  : [];

document.querySelector("#enter").addEventListener("click", () => {
  const item = document.querySelector("#item");
  createItem(item);
});

document.querySelector("#item").addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    const item = document.querySelector("#item");
    createItem(item);
  }
});

function displayDate() {
  let date = new Date();
  date = date.toString().split(" ");
  date = date[1] + " " + date[2] + " " + date[3];
  document.querySelector("#date").innerHTML = date;
}

function displayItems() {
  let items = "";
  if (itemsArray.length == 0) {
    items = `<img src="list.png" style="width:auto; height:200px">`;
  } else {
    for (let i = 0; i < itemsArray.length; i++) {
      items += `<div class="item">
            <div class="input-controller">
            <textarea disabled>${itemsArray[i]}</textarea>
            <div class="edit-controller">
                            <i class="fa-solid fa-check fa-2x deleteBtn"></i>
                            <i class="fa-solid fa-pen-to-square fa-2x editBtn"></i>
                            </div>
                            </div>
                            <div class="update-controller">
                            <button class="saveBtn">Save</button>
                            </div>
                            </div>`;
    }
  }
  document.querySelector(".to-do-list").innerHTML = items;
  activateDeleteListeners();
  activateEditListeners();
  activateSaveListeners();
}

function activateDeleteListeners() {
  let deleteBtn = document.querySelectorAll(".deleteBtn");
  deleteBtn.forEach((dB, i) => {
    dB.addEventListener("click", () => {
      deleteItem(i);
    });
  });
}

function activateEditListeners() {
  const editBtn = document.querySelectorAll(".editBtn");
  const updateController = document.querySelectorAll(".update-controller");
  const inputs = document.querySelectorAll(".input-controller textarea");
  editBtn.forEach((eB, i) => {
    eB.addEventListener("click", () => {
      updateController[i].style.display = "block";
      inputs[i].style.backgroundColor = "rgba(255, 255, 255, 0.3)";
      inputs[i].disabled = false;
    });
  });
}

function activateSaveListeners() {
  const saveBtn = document.querySelectorAll(".saveBtn");
  const inputs = document.querySelectorAll(".input-controller textarea");
  saveBtn.forEach((sB, i) => {
    sB.addEventListener("click", () => {
      inputs[i].style.backgroundColor = "rgba(0,0,0,0.7)";
      updateItem(inputs[i].value, i);
    });
  });
}

function createItem(item) {
  if (item.value == "") {
    item.setAttribute("placeholder", "This field is required!");
    return;
  }
  itemsArray.push(item.value);
  localStorage.setItem("items", JSON.stringify(itemsArray));
  location.reload();
}

function deleteItem(i) {
  itemsArray.splice(i, 1);
  localStorage.setItem("items", JSON.stringify(itemsArray));
  location.reload();
}

function updateItem(text, i) {
  itemsArray[i] = text;
  localStorage.setItem("items", JSON.stringify(itemsArray));
  location.reload();
}

window.onload = function () {
  displayDate();
  displayItems();
};
