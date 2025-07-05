window.onload = function () {
  const board = document.getElementById('game-board');
  const message = document.getElementById('message');
  const cards = ['🍎', '🍌', '🍇', '🍊', '🍉', '🍓', '🍍', '🥝'];
  let cardArray = [...cards, ...cards]; // two of each
  let firstCard = null;
  let secondCard = null;
  let lockBoard = false;
  let matchedPairs = 0;

  function shuffle(array) {
    return array.sort(() => 0.5 - Math.random());
  }

  function createBoard() {
    board.innerHTML = '';
    matchedPairs = 0;
    message.textContent = '';
    cardArray = shuffle(cardArray);

    cardArray.forEach((emoji, index) => {
      const card = document.createElement('div');
      card.classList.add('card');
      card.dataset.emoji = emoji;
      card.dataset.index = index;
      card.innerHTML = '?';
      card.addEventListener('click', flipCard);
      board.appendChild(card);
    });
  }

  function flipCard() {
    if (lockBoard || this.classList.contains('flip')) return;

    this.textContent = this.dataset.emoji;
    this.classList.add('flip');

    if (!firstCard) {
      firstCard = this;
    } else {
      secondCard = this;
      lockBoard = true;

      if (firstCard.dataset.emoji === secondCard.dataset.emoji) {
        firstCard.removeEventListener('click', flipCard);
        secondCard.removeEventListener('click', flipCard);
        resetTurn();
        matchedPairs++;

        if (matchedPairs === cards.length) {
          message.textContent = '🎉 You matched all the cards!';
        }
      } else {
        setTimeout(() => {
          firstCard.textContent = '?';
          secondCard.textContent = '?';
          firstCard.classList.remove('flip');
          secondCard.classList.remove('flip');
          resetTurn();
        }, 1000);
      }
    }
  }

  function resetTurn() {
    [firstCard, secondCard] = [null, null];
    lockBoard = false;
  }

  createBoard();
};
