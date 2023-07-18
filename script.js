import { firstLetterUpperCase } from './functions.js';

const randomJokeButton = document.querySelector('.random-joke-btn');
const randomJokeText = document.querySelector('.random-joke-text');
const categoryJokeText = document.querySelector('.category-joke-text');
const searchJokeText = document.querySelector('.search-joke-text');

randomJokeButton.addEventListener('click', () => {
    fetch('https://api.chucknorris.io/jokes/random')
    .then(response => response.json())
    .then(joke => {
        randomJokeText.textContent = joke.value;
    })
})

// const form = document.querySelector('.form-categories');
const selectElement = document.querySelector('#category');
const submitButton = document.querySelector('.joke-button');

function categoryOptions(button, select) {
    fetch('https://api.chucknorris.io/jokes/categories')
    .then(response => response.json())
    .then(categories => {
        categories.map(category => {        
            let optionElement = document.createElement('option');        
            optionElement.textContent = firstLetterUpperCase(category);
            optionElement.value = category;     
            select.prepend(optionElement);   
        })

        button.removeAttribute('disabled');
    })
}

categoryOptions(submitButton, selectElement);

function createJokeByCategory() {
    const form = document.querySelector('.form-categories');
    form.addEventListener('submit', (event) => {
        event.preventDefault();     
        const category = event.target.category.value;
        fetch(`https://api.chucknorris.io/jokes/random?category=${category}`)
        .then(response => response.json())
        .then(joke => {
            categoryJokeText.textContent = joke.value;
        })

    })
}

createJokeByCategory();

const searchForm = document.querySelector('.search-form');
searchForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const searchText = event.target.search.value;

    if (searchText.length === 0) {
        return searchJokeText.textContent = 'You have to write something...';  
    }

    searchForJoke(searchText);
})

function searchForJoke(text) {
    fetch(`https://api.chucknorris.io/jokes/search?query=${text}`)
    .then(response => response.json())
    .then(data => {
        let index = data.result.length - 1;
        let randomNumber = Math.random() * index;
        randomNumber = Math.round(randomNumber);

        let randomJoke = data.result[randomNumber].value;
        searchJokeText.textContent = randomJoke;
    })
    .catch(error => {
        searchJokeText.textContent = 'Not found, try something else..';
    })
}