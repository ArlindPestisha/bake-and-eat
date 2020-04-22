import Search from './models/Search';
import * as searchView from './views/searchView';
import { elements } from './views/base';

// Creating the state object where we controll the entire app in state
/* *Global state
    *Search object
    *Current recipe object
    *Shopping list object
    *Liked recipes
    */
const state = {};

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

        // 4) Search for recipes
        await state.search.getResults();

        // 5) Render results on UI
        searchView.renderResults(state.search.result);
    }
}

// Event listner for search form

elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
})


/*const search = new Search('pizza');
console.log(search);
search.getResults();*/