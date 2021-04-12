// Class du pendu

class Pendu {
  constructor() {
    for (let i = 0; i < 26; i++) {
      keyboard.innerHTML +=
        "<button class='letters'>" +
        (i + 10).toString(36).toUpperCase() +
        "</button>";
    }
    this.buttons = document.getElementsByClassName("letters");
    this.isPlayable = true;
    this.errors = 0;
    this.good = 0;
  }

  newGame(word) {
    this.actual = word.toUpperCase().split("");
    let i = 0;
    while (i < this.actual.length) {
      if (this.actual[i] === " ") {
        hidden.innerHTML += "<span class='space'>_</span>";
        this.actual.splice(i, 1);
      } else {
        hidden.innerHTML += "<span class='hiddenletters'>_</span> ";
        i++;
      }
    }
    this.letters = document.getElementsByClassName("hiddenletters");
    fail.innerHTML = " " + (8 - this.errors);
    console.log(this.actual);
  }

  verify(letter) {
    if (this.actual.includes(letter)) {
      for (let i = 0; i < this.actual.length; i++) {
        if (letter === this.actual[i]) {
          this.letters[i].innerHTML = letter;
          this.good += 1;
        }
      }
    } else {
      this.errors += 1;
      this.error();
    }
    this.victory();
  }

  victory() {
    if (this.good === this.actual.length) {
      for (let i = 0; i < this.actual.length; i++) {
        this.letters[i].style.color = "green";
      }
      this.isPlayable = false;
      clearInterval(timer);
    }
  }

  error() {
    if (this.errors === 1) {
      for (let i = 0; i < 4; i++) {
        svg[i].style.visibility = "visible";
      }
    } else if (this.errors < 9) {
      svg[this.errors + 2].style.visibility = "visible";
    }
    if (this.errors === 8) {
      this.isPlayable = false;
    }
    fail.innerHTML = " " + (8 - this.errors);
  }
}

// Class des themes

class Themes {
  constructor(array) {
    this.words = array;
  }

  randomWord() {
    let random = Math.floor(Math.random() * Math.floor(this.words.length));
    return this.words[random]["nom"];
  }
}
