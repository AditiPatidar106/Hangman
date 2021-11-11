var country_names = [
	"afghanistan",
	"argentina",
	"australia",
	"austria",
	"bahamas",
	"bangladesh",
	"barbados",
	"belgium",
	"bhutan",
	"brazil",
	"bulgaria",
	"cambodia",
	"canada",
	"chile",
	"china",
	"colombia",
	"croatia",
	"cuba",
	"denmark",
	"egypt",
	"fiji",
	"finland",
	"france",
	"georgia",
	"germany",
	"ghana",
	"greece",
	"hungary",
	"iceland",
	"india",
	"indonesia",
	"iran",
	"iraq",
	"ireland",
	"israel",
	"italy",
	"jamaica",
	"japan",
	"jordan",
	"kazakhstan",
	"kenya",
	"kuwait",
	"libya",
	"madagascar",
	"malaysia",
	"maldives",
	"mauritius",
	"mexico",
	"morocco",
	"myanmar",
	"nepal",
	"netherlands",
	"norway",
	"oman",
	"pakistan",
	"panama",
	"peru",
	"philippines",
	"poland",
	"portugal",
	"qatar",
	"romania",
	"russia",
	"singapore",
	"spain",
	"sweden",
	"switzerland",
	"syria",
	"thailand",
	"turkey",
	"uganda",
	"ukraine",
	"venezuela",
	"vietnam",
	"zimbabwe"
]

let answer = '';
let maxWrong = 10;
let mistakes = 0;
let guessed = [];
let wordStatus = null;

function randomWord() {
  answer = country_names[Math.floor(Math.random() * country_names.length)];
}
	
function generateButtons() {
  let buttonsHTML = 'abcdefghijklmnopqrstuvwxyz'.split('').map(letter =>
    `
      <button
        class="btn btn-lg btn-primary m-2"
        id='` + letter + `'
        onClick="handleGuess('` + letter + `')"
      >
        ` + letter + `
      </button>
    `).join('');

  document.getElementById('keyboard').innerHTML = buttonsHTML;
}

function handleGuess(chosenLetter) {
  guessed.indexOf(chosenLetter) === -1 ? guessed.push(chosenLetter) : null;
  document.getElementById(chosenLetter).setAttribute('disabled', true);

  if (answer.indexOf(chosenLetter) >= 0) {
    guessedWord();
    checkIfGameWon();
  } else if (answer.indexOf(chosenLetter) === -1) {
    mistakes++;
    updateMistakes();
    checkIfGameLost();
    updateHangmanPicture();
  }
}

function updateHangmanPicture() {
  document.getElementById('hangmanPic').src = './images/' + mistakes + '.jpg';
}

function checkIfGameWon() {
  if (wordStatus === answer) {
    document.getElementById('keyboard').innerHTML = 'You Won!!!';
  }
}

function checkIfGameLost() {
  if (mistakes === maxWrong) {
    document.getElementById('wordSpotlight').innerHTML = 'The answer was: ' + answer;
    document.getElementById('keyboard').innerHTML = 'You Lost!!!';
  }
}

function guessedWord() {
  wordStatus = answer.split('').map(letter => (guessed.indexOf(letter) >= 0 ? letter : " _ ")).join('');

  document.getElementById('wordSpotlight').innerHTML = wordStatus;
}

function updateMistakes() {
  document.getElementById('mistakes').innerHTML = mistakes;
}

function reset() {
  mistakes = 0;
  guessed = [];
  document.getElementById('hangmanPic').src = './images/0.jpg';

  randomWord();
  guessedWord();
  updateMistakes();
  generateButtons();
}

document.getElementById('maxWrong').innerHTML = maxWrong;

randomWord();
generateButtons();
guessedWord();
