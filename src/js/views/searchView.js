// All DOM elements in a central Variable
import { elements } from './base';

export const getInput = () => elements.searchInput.value;

export const clearInput = () => {
    elements.searchInput.value = '';
};

// clearing the results
export const clearResults = () => {
    // clear the res list
    elements.searchResList.innerHTML = '';
    // clear the pages and go to the next page with new res
    elements.searchResPages.innerHTML = '';

};

const limitRecipeTitle = (title, limit = 17) => {
    const newTitle = [];
    if (title.length > limit) {
        title.split (' ').reduce((acc, cur) => {
            if (acc + cur.length <= limit) {
                newTitle.push(cur);
            }
            return acc + cur.length;
        }, 0);

        // return the result with join()
        return `${newTitle.join(' ')}...`;
    }
    return title;
};

const renderRecipe = recipe => {
    const markup = `
    <li>
        <a class="results__link" href="#${recipe.recipe_id}">
            <figure class="results__fig">
                <img src="${recipe.image_url}" alt="${recipe.title}">
            </figure>
            <div class="results__data">
                <h4 class="results__name">${limitRecipeTitle(recipe.title)}</h4>
                <p class="results__author">${recipe.publisher}</p>
            </div>
        </a>
    </li>`;
    elements.searchResList.insertAdjacentHTML('beforeend', markup);
};

// Creat button and markup to use to renderButtons. type can be 'next'or 'prev'
const creatButton = (page, type) => `
    <button class="btn-inline results__btn--${type}" data-goto=${type === 'prev' ? page - 1 : page + 1}>
        <span>Page ${type === 'prev' ? page - 1 : page + 1}</span>
        <svg class="search__icon">
            <use href="img/icons.svg#icon-triangle-${type === 'prev' ? 'left' : 'right'}"></use>
        </svg>
    </button>                 
`;

//Render buttons to the UI
const renderButtons = (page, numResults, resPerPage) => {
    //calc the number of pages also we use the Math.ceil to round the numbers
    const pages = Math.ceil(numResults / resPerPage);

    let button;
    if (page === 1 && pages > 1) {
        // Show button to go to next page
        button = creatButton(page, 'next');
    } else if (page < pages) {
        // Show both buttons to go prev and next page
        button =
        `${creatButton(page, 'prev')}
         ${creatButton(page, 'next')}
        `;
    } else if (page === pages && pages > 1) {
        // Show button to go to the prev page
        button = creatButton(page, 'prev');
    }
    elements.searchResPages.insertAdjacentHTML('afterbegin', button);
    
};

//Building the functionallity for pages and also to render the results
export const renderResults = (recipes, page = 1, resPerPage = 10) => {
    // Render only the resluts for page for ex: 10
    const start = (page - 1) * resPerPage;
    const end = page * resPerPage;

    recipes.slice(start, end).forEach(renderRecipe);

    // render the page buttons
    renderButtons(page, recipes.length, resPerPage);
};

// next we are going to put the event listen