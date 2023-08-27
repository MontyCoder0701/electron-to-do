class CountdownTimer {
  constructor(seconds) {
    this.seconds = seconds;
    this.timer = null;
    this.targetElement = document.getElementById("timer");
  }

  start() {
    this.timer = setInterval(() => {
      if (this.seconds <= 0) {
        this.stop();
      } else {
        this.seconds--;
        this.#updateDisplay();
      }
    }, 1000);
  }

  stop() {
    clearInterval(this.timer);
  }

  #updateDisplay() {
    if (this.targetElement) {
      this.targetElement.innerHTML = this.seconds;
    }
  }
}
