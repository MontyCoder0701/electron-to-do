window.onload = () => {
  const form1 = document.querySelector("#addForm");
  const items = document.getElementById("items");
  const submit = document.getElementById("submit");
  let editItem = null;

  const storedItems = JSON.parse(localStorage.getItem("items")) || [];
  storedItems.forEach((item) => addItemToList(item));

  form1.addEventListener("submit", addItem);
  items.addEventListener("click", removeItem);
};

function addItem(e) {
  e.preventDefault();
  const itemInput = document.getElementById("item");
  const items = document.getElementById("items");

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

  const deleteButton = document.createElement("button");
  deleteButton.className = "delete-btn delete";
  deleteButton.appendChild(document.createTextNode("-"));

  const editButton = document.createElement("button");
  editButton.className = "edit-btn edit";
  editButton.appendChild(document.createTextNode("Edit"));

  const upButton = document.createElement("button");
  upButton.className = "up-btn up";
  upButton.appendChild(document.createTextNode("Up"));

  li.appendChild(document.createTextNode(newItem));
  li.appendChild(deleteButton);
  li.appendChild(editButton);
  li.appendChild(upButton);

  document.getElementById("items").appendChild(li);
}

function removeItem(e) {
  e.preventDefault();
  if (e.target.classList.contains("delete")) {
    let li = e.target.parentNode;
    items.removeChild(li);
    updateLocalStorage();
  }
  if (e.target.classList.contains("edit")) {
    document.getElementById("item").value =
      e.target.parentNode.childNodes[0].data;
    submit.value = "Edit";
    editItem = e;
  }
  if (e.target.classList.contains("up")) {
    let li = e.target.parentNode;
    let parent = li.parentNode;
    parent.insertBefore(li, parent.firstChild);
  }
}

function updateLocalStorage() {
  const items = Array.from(document.getElementById("items").children).map(
    (li) => li.firstChild.data
  );
  localStorage.setItem("items", JSON.stringify(items));
}
