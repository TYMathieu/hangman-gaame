keyboard = document.getElementById("keyboard");
hidden = document.getElementById("hidden");
svg = document.getElementsByClassName("svg");
fail = document.getElementById("fail");
register = document.getElementById("register");

let theme = "default";
let words = "";
document.querySelector("#formTheme").addEventListener("submit", function (e) {
  e.preventDefault();
  pseudo = document.getElementById("pseudo").value;
  theme = document.querySelector("#theme").value;
  fetch("http://localhost/Hangman%20Game/server/word.php", {
    method: "POST",
    headers: new Headers({
      "Content-Type": "application/json",
    }),
    body: JSON.stringify({
      theme,
    }),
  })
    .then((res) => res.json()) // récupère les données JSON du body de la réponse
    // Promise pour faire le traitement
    .then((data) => {
      words = new Themes(data);
      document.querySelector(".modalbg").style.display = "none";
      const pendu = new Pendu();
      pendu.newGame(words.randomWord());
      console.log(words.randomWord());
      // Instanciation du timer
      let seconds = 0;
      let timer = setInterval(function () {
        // permet de faire une action tous les intervals donnés (en millissecondes)
        seconds++;
        document.querySelector("#timer").innerHTML =
          "Temps écoulé: " + seconds + "s";
      }, 1000);
      // logique du jeu
      for (let i = 0; i < pendu.buttons.length; i++) {
        pendu.buttons[i].addEventListener("click", () => {
          if (pendu.isPlayable) {
            pendu.buttons[i].style.visibility = "hidden";
            pendu.verify((i + 10).toString(36).toUpperCase());
            if (!pendu.isPlayable) {
              clearInterval(timer);
              register.style.display = "inline-block";
            }
          }
        });
      }
      document
        .querySelector("#register")
        .addEventListener("click", function (e) {
          register.style.display = "none";
          fetch("http://localhost/Hangman%20Game/server/register.php", {
            method: "POST",
            headers: new Headers({
              "Content-Type": "application/json",
            }),
            body: JSON.stringify({
              seconds,
              pseudo,
              theme,
            }),
          });
        });
    });
});

// Traitement du mot dans class Themes
