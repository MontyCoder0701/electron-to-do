class Button {
  constructor(text, className) {
    this.text = text;
    this.className = className;
  }

  createButton() {
    const button = document.createElement("button");
    button.className = this.className;
    button.appendChild(document.createTextNode(this.text));
    return button;
  }
}
