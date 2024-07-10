

//Utility function

function createElement(element) {
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

const shoppingList = ['milk', 'bread']

const ol = select('ol')

listen(document,'DOMContentLoaded', displayItems)

function displayItems() {
  shoppingList.forEach(createAlistItem)
} 

function createAlistItem(item) {
  const li = createElement('li')
  addText(li, item)
  appendChild(li,ol)
}