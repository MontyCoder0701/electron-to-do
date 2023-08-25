window.onload = () => {
  const form1 = document.querySelector("#addForm");
  const items = document.getElementById("items");
  const submit = document.getElementById("submit");
  let editItem = null;

  // Check if there are items in localStorage and load them
  const storedItems = JSON.parse(localStorage.getItem("items")) || [];
  storedItems.forEach((item) => addItemToList(item));

  form1.addEventListener("submit", addItem);
  items.addEventListener("click", removeItem);
};

function addItem(e) {
  e.preventDefault();
  const itemInput = document.getElementById("item");
  const items = document.getElementById("items");

  if (submit.value != "Submit") {
    editItem.target.parentNode.childNodes[0].data = itemInput.value;
    submit.value = "Submit";
    itemInput.value = "";
    document.getElementById("lblsuccess").innerHTML =
      "Text edited successfully";
    document.getElementById("lblsuccess").style.display = "block";
    setTimeout(function () {
      document.getElementById("lblsuccess").style.display = "none";
    }, 3000);

    // Update the edited item in localStorage
    updateLocalStorage();
    return false;
  }

  let newItem = itemInput.value.trim();
  if (newItem == "") return false;
  itemInput.value = "";

  // Add the new item to the list
  addItemToList(newItem);

  // Update localStorage with the new item
  updateLocalStorage();
}

function addItemToList(newItem) {
  const li = document.createElement("li");
  li.className = "list-group-item";

  const deleteButton = document.createElement("button");
  deleteButton.className = "btn-danger btn btn-sm float-right delete";
  deleteButton.appendChild(document.createTextNode("Delete"));

  const editButton = document.createElement("button");
  editButton.className = "btn-success btn btn-sm float-right edit";
  editButton.appendChild(document.createTextNode("Edit"));

  li.appendChild(document.createTextNode(newItem));
  li.appendChild(deleteButton);
  li.appendChild(editButton);

  document.getElementById("items").appendChild(li);
}

function removeItem(e) {
  e.preventDefault();
  if (e.target.classList.contains("delete")) {
    if (confirm("Are you Sure?")) {
      let li = e.target.parentNode;
      items.removeChild(li);
      document.getElementById("lblsuccess").innerHTML =
        "Text deleted successfully";
      document.getElementById("lblsuccess").style.display = "block";
      setTimeout(function () {
        document.getElementById("lblsuccess").style.display = "none";
      }, 3000);

      // Remove the item from localStorage
      updateLocalStorage();
    }
  }
  if (e.target.classList.contains("edit")) {
    document.getElementById("item").value =
      e.target.parentNode.childNodes[0].data;
    submit.value = "EDIT";
    editItem = e;
  }
}

function updateLocalStorage() {
  const items = Array.from(document.getElementById("items").children).map(
    (li) => li.firstChild.data
  );
  localStorage.setItem("items", JSON.stringify(items));
}
