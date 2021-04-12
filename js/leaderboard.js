const buttons = document.querySelectorAll("button");
board = document.querySelector("#board");

for (let button of buttons) {
  button.addEventListener("click", function (e) {
    e.preventDefault;
    theme = this.id;
    console.log(theme);
    fetch("http://localhost/Hangman%20Game/server/displayleader.php", {
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
        board.innerHTML = `
          <tr>
            <th>Placement</th>
            <th>Nom</th>
            <th>Timer</th>
          </tr>
        `;
        for (let i = 0; i < data.length; i++) {
          board.innerHTML += `
            <tr>
              <td>${i + 1}</td>
              <td>${data[i]["nom"]}</td>
              <td>${data[i]["timer"]}</td>
            </tr>
          `;
        }
      });
  });
}
