
// Utility Functions for DOM Manipulation.

function createAnElement(element) {
	return document.createElement(element);
}

function addText(element, text) {
	return (element.innerText = text);
}

function appendChild(child, parent) {
	return parent.appendChild(child);
}

function select(selector) {
	return document.querySelector(selector);
}

function listen(element, event, callback) {
	return element.addEventListener(event, callback);
}

function addAttribute(element, attribute, content) {
	return element.setAttribute(attribute, content);
}

const shoppingList = [];

const ol = select("ol");

listen(document, "DOMContentLoaded", displayItems);

function displayItems() {
	ol.innerHTML= "";
	shoppingList.map(createAListItem);
}

function createAListItem(item, index) {
	const li = createAnElement("li");
	addText(li, item);
	appendChild(li, ol);

	listen(li, "click", toggleChecked);

	function toggleChecked() {
		li.classList.toggle("checked");
	}

	// Trigger editing when a user double clicks on each menu item.
	listen(li, "dblclick", editItem);
	function editItem() {
		addAttribute(li, "contenteditable", true);
		li.focus();
	}

	// Listen when the item is not in focus and stop editing.
	// This could happen when the cursor is clicked outside the list item or when(as will be done with the implementation of the keydown listener, when a user hits "Enter")
	listen(li, "blur", stopEditingTheItem);

	function stopEditingTheItem() {
		li.removeAttribute("contenteditable");
		li.blur();
	}

	// Listen when a key is pressed. We want the content to stop being editable when a user hits "Enter"
	listen(li, "keydown", stopEditingWhenEnterIsPressed);

	function stopEditingWhenEnterIsPressed(event) {
		if (event.key === "Enter") {
			event.target.blur();
			shoppingList[index] = event.target.innerText;
		}
	}
}

const form = select("form");
listen(form, "submit", addItem);

function addItem(event) {
	event.preventDefault();

	shoppingList.push(event.target[0].value);

	displayItems();

	event.target.reset();
}

const deleteButton = select(".delete");
listen(deleteButton, "click", clearList);

function clearList() {
	shoppingList.length = 0;
	displayItems();
}
