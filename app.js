window.onload = () => {
  const form = document.querySelector("#addForm");
  const items = document.getElementById("items");
  let editItem = null;

  const storedItems = JSON.parse(localStorage.getItem("items")) || [];
  storedItems.forEach((item) => addItemToList(item));

  form.addEventListener("submit", addItem);
  items.addEventListener("click", function (e) {
    handleDelete(e);
    handleEdit(e);
    handleMoveUp(e);
    handleMoveDown(e);
    updateLocalStorage();
  });
};

function startTimer() {
  const timer = new CountdownTimer(600);
  timer.start();
}

function addItem(e) {
  e.preventDefault();
  const submit = document.getElementById("submit");
  const itemInput = document.getElementById("item");

  if (submit.value != "+") {
    editItem.target.parentNode.childNodes[0].data = itemInput.value;
    submit.value = "+";
    itemInput.value = "";

    updateLocalStorage();
    return false;
  }

  let newItem = itemInput.value.trim();
  if (newItem == "") return false;
  itemInput.value = "";

  addItemToList(newItem);
  updateLocalStorage();
}

function addItemToList(newItem) {
  const li = document.createElement("li");
  li.className = "list-group-item";

  const buttons = [
    new Button("-", "small-btn delete"),
    new Button("Edit", "general-btn edit"),
    new Button("Up", "general-btn up"),
    new Button("Down", "general-btn down"),
  ];

  li.appendChild(document.createTextNode(newItem));

  buttons.forEach((buttonInfo) => {
    li.appendChild(buttonInfo.createButton());
  });

  document.getElementById("items").appendChild(li);
}

function handleDelete(e) {
  if (e.target.classList.contains("delete")) {
    let li = e.target.parentNode;
    items.removeChild(li);
  }
}

function handleEdit(e) {
  if (e.target.classList.contains("edit")) {
    document.getElementById("item").value =
      e.target.parentNode.childNodes[0].data;
    submit.value = "Edit";
    editItem = e;
  }
}

function handleMoveUp(e) {
  if (e.target.classList.contains("up")) {
    let li = e.target.parentNode;
    let prevSibling = li.previousElementSibling;
    if (prevSibling) {
      li.parentNode.insertBefore(li, prevSibling);
    }
  }
}

function handleMoveDown(e) {
  if (e.target.classList.contains("down")) {
    let li = e.target.parentNode;
    let nextSibling = li.nextElementSibling;
    if (nextSibling) {
      li.parentNode.insertBefore(nextSibling, li);
    }
  }
}

function updateLocalStorage() {
  const items = Array.from(document.getElementById("items").children).map(
    (li) => li.firstChild.data
  );
  localStorage.setItem("items", JSON.stringify(items));
}
