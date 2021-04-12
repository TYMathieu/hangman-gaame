// Choisir un mot parmi une liste
let word = 'angular';
word = word.toUpperCase();
// .map permet de recréer un tableau à partir d'un tableau
let trouve = word.split('').map((letter) => '_'); // Comme au morpion, on génère un tableau d'état
let errors = 0;
// Faire apparaitre autant de _ que de lettres dans le mot
// on utilise des spans pour avoir des enfants à la section indexables
for (let i = 0; i < trouve.length; i++) {​​
  document.querySelector(
    '#affichage'
  ).innerHTML += `<span class="letter">${​​trouve[i]}​​</span>`;
}​​
// faire apparaitre un clavier virtuel
for (let i = 65; i < 91; i++) {​​
  document.querySelector(
    '#clavier'
  ).innerHTML += `<button>${​​String.fromCharCode(i)}​​</button>`; // fromCharCode permet à partir d'une valeur d'afficher le caractère correspondant
}​​
const touches = document.querySelectorAll('#clavier button');
for (let touche of touches) {​​
  touche.addEventListener('click', function () {​​
    this.style.display = 'none';
    let found = false;
    for (let i = 0; i < word.length; i++) {​​
      if (this.innerHTML === word[i]) {​​
        found = true;
        trouve[i] = word[i];
        // console.log(trouve);
        document.querySelector('#affichage').children[i].innerHTML = word[i];
      }​​
    }​​
    if (!found) {​​
      errors++;
      console.log('.hang_' + errors);
      document.querySelector('.hang_' + errors).style.opacity = 1;
    }​​
    if (errors === 7) {​​
      console.log('GAME OVER');
    }​​
  }​​);
}​​