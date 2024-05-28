document.addEventListener('DOMContentLoaded', () => {
    const cardsArray = [
        { name: 'A', img: 'A' },
        { name: 'A', img: 'A' },
        { name: 'B', img: 'B' },
        { name: 'B', img: 'B' },
        { name: 'C', img: 'C' },
        { name: 'C', img: 'C' },
        { name: 'D', img: 'D' },
        { name: 'D', img: 'D' },
        { name: 'E', img: 'E' },
        { name: 'E', img: 'E' },
        { name: 'F', img: 'F' },
        { name: 'F', img: 'F' },
        { name: 'G', img: 'G' },
        { name: 'G', img: 'G' },
        { name: 'H', img: 'H' },
        { name: 'H', img: 'H' }
    ];

    const gameBoard = document.getElementById('game-board');
    let firstCard = null;
    let secondCard = null;
    let lockBoard = false;

    // Shuffle cards
    cardsArray.sort(() => 0.5 - Math.random());

    // Create cards
    cardsArray.forEach((card, index) => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.dataset.name = card.name;
        cardElement.dataset.index = index;
        cardElement.addEventListener('click', flipCard);
        gameBoard.appendChild(cardElement);
    });

    function flipCard() {
        if (lockBoard) return;
        if (this === firstCard) return;

        this.classList.add('flipped');
        this.textContent = this.dataset.name;

        if (!firstCard) {
            firstCard = this;
            return;
        }

        secondCard = this;
        lockBoard = true;

        checkForMatch();
    }

    function checkForMatch() {
        const isMatch = firstCard.dataset.name === secondCard.dataset.name;

        if (isMatch) {
            disableCards();
        } else {
            unflipCards();
        }
    }

    function disableCards() {
        firstCard.classList.add('matched');
        secondCard.classList.add('matched');

        resetBoard();
    }

    function unflipCards() {
        setTimeout(() => {
            firstCard.classList.remove('flipped');
            secondCard.classList.remove('flipped');
            firstCard.textContent = '';
            secondCard.textContent = '';
            
            resetBoard();
        }, 1500);
    }

    function resetBoard() {
        [firstCard, secondCard] = [null, null];
        lockBoard = false;
    }
});
