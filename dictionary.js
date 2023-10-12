const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";

const btn = document.querySelector(".btn");
const result = document.querySelector(".result");
const sound = document.querySelector("#say");

btn.addEventListener("click", () => {
  let input = document.querySelector(".inpt").value;
  fetch(`${url}${input}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      result.innerHTML = `
      <div class="sound">
      <h4>${input}</h4>
      <button onclick = "playSound()">
        <ion-icon name="volume-high-outline"></ion-icon>
      </button>
    </div>

    <div class="details">
      <p>${data[0].meanings[0].partOfSpeech}</p>
      <p>${data[0].phonetic}</p>
    </div>

    <p class="word-meaning">
    ${data[0].meanings[0].definitions[0].definition}
    </p>
    <p class="word-example">
      ${data[0].meanings[0].definitions[0].example || ""}
    </p>
    <p class="word-antonyms"><b>Antonyms</b> : ${
      data[0].meanings[0].antonyms
    || "no antonyms"} </p>

   <p class="word-synonyms"><b>Synonyms</b> : ${
     data[0].meanings[0].synonyms
   || "no synonyms"} </p>
      `;
      sound.setAttribute("src", `https:${data[0].phonetics[0].audio}`);
    })
    .catch(() => {
      result.innerHTML = `<h3 class="error">couldn't find the word</h3>`;
    });
});

function playSound() {
  sound.play();
}
