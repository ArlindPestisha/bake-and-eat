import Search from './models/Search';
import Recipe from './models/recipe';
import * as searchView from './views/searchView';
import { elements, renderLoader, clearLoader } from './views/base';

// Creating the state object where we controll the entire app in state
/* *Global state
    *Search object
    *Current recipe object
    *Shopping list object
    *Liked recipes
    */
const state = {};
/* SEARCH CONTROLLER */
// callback function for the controlSearch
const controlSearch = async () => {
    // 1) Get query from view
    const query = searchView.getInput();
    

    if (query) {
        // 2) New search object and add to state
        state.search = new Search(query);

        // 3) Preapre UI for results
        searchView.clearInput();
        searchView.clearResults();
        renderLoader(elements.searchRes);

        // 4) Search for recipes
        await state.search.getResults();

        // 5) Render results on UI
        clearLoader();
        searchView.renderResults(state.search.result);
    }
}

// Event listner for search form

elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
})

// Adding event listner
elements.searchResPages.addEventListener('click', e =>{
    const btn = e.target.closest('.btn-inline');
    if (btn) {
        // fetch the data attribute
        const goToPage = parseInt(btn.dataset.goto, 10);
        // first clear res before you show the next 10 res.
        searchView.clearResults();
        searchView.renderResults(state.search.result, goToPage);
    }
});


/* RECIPE CONTROLLER */

const controlRecipe = async () => {
    //Fetch hash from URL
    const id = window.location.hash.replace('#', '');
    //console.log(id);

    if (id) {
        // Prepare UI for changes

        // Creat new recipe object
        state.recipe = new Recipe(id);

        // Get recipe data
        await state.recipe.getRecipe();
        // Calculet servings and time
        state.recipe.calcTime();
        state.recipe.calcServings();

        // Render recipe
        console.log(state.recipe);
    }
};





//adding the eventlistner to global 'window'
window.addEventListener('hashchange', controlRecipe);
