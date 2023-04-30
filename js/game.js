const grid = document.querySelector('.grid');
const spanPlayer = document.querySelector('.player');
const timer = document.querySelector('.timer');
 
const characters = [
    'beth',
    'jerry',
    'jessica',
    'morty',
    'pessoa-passaro',
    'pickle-rick',
    'rick',
    'summer',
    'meeseeks',
    'scroopy'
]

let firstCard = '';
let secondCard = '';

const checkEndGame = () => {
    const disabledCard = document.querySelectorAll('.disabled-card');

    if(disabledCard.length === 20) {
        clearInterval(this.loop);
        alert(`Parabéns, ${spanPlayer.innerHTML}! Seu tempo foi: ${timer.innerHTML}`);
    }
}

const checkCards = () => {
    const firstCharacter = firstCard.getAttribute('data-character');
    const secondCharacter = secondCard.getAttribute('data-character');

    if(firstCharacter === secondCharacter) {
        firstCard.firstChild.classList.add('disabled-card');
        secondCard.firstChild.classList.add('disabled-card');

        firstCard = '';
        secondCard = '';

        checkEndGame();
    } else {
        setTimeout(() => {
            firstCard.classList.remove('revel-card');
            secondCard.classList.remove('revel-card');

            firstCard = '';
            secondCard = '';
        }, 500)
    }
}

const createElement = (tag, className) => {
    const element = document.createElement(tag);
    element.className = className
    return element
}

const revelCard = ({ target }) => {
    if(target.parentNode.className.includes('revel-card')) {
        return;
    }

    if(firstCard === ''){
        target.parentNode.classList.add('revel-card');
        firstCard = target.parentNode;
    } else if(secondCard === ''){
        target.parentNode.classList.add('revel-card');
        secondCard = target.parentNode;
        checkCards();
    }

}

const createCard = (character) => {
    const card = createElement('div', 'card');
    const front = createElement('div','face front');
    const back = createElement('div', 'face back');

    front.style.backgroundImage = `url('../images/${character}.png')`;

    card.appendChild(front);
    card.appendChild(back);

    card.addEventListener('click', revelCard);
    card.setAttribute('data-character', character)

    return card;
}

const loadingGame = () => {
    const duplicateCharacter = [ ...characters, ...characters ];

    const shuffledArray = duplicateCharacter.sort(() => Math.random() - 0.5);

    shuffledArray.forEach((character) => {
        const card = createCard(character);
        grid.appendChild(card);
    });
}

const startTimer = () => {
    this.loop = setInterval(() => {
        const currentTime = +timer.innerHTML;
        timer.innerHTML = currentTime + 1;
    }, 1000);
}

window.onload = () => {
    spanPlayer.innerHTML = localStorage.getItem('player');
    startTimer();
    loadingGame();
}
