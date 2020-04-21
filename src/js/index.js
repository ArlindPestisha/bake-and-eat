import Search from './models/Search';

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
    const query = 'pizza'

    if (query) {
        // 2) New search object and add to state
        state.search = new Search(query);

        // 3) Preapre UI for results

        // 4) Search for recipes
        await state.search.getResults();

        // 5) Render results on UI
        console.log(state.search.result);
    }
}

// Event listner for search form

document.querySelector('.search').addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
})


/*const search = new Search('pizza');
console.log(search);
search.getResults();*/