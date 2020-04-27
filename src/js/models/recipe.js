// Import the axios pac
import axios from 'axios'

//Creating the recipe class
export default class Recipe {
    // Pasing the id to constructor to fetch data
    constructor(id) {
        this.id = id;
    }

    // the get method to get recipes based on the ID
   async getRecipe() {
       try {
            const res = await axios(`https://forkify-api.herokuapp.com/api/get?rId=${this.id}`);
            this.title = res.data.recipe.title;
            this.author = res.data.recipe.publisher;
            this.img = res.data.recipe.image_url;
            this.url = res.data.recipe.source_url;
            this.ingredients = res.data.recipe.ingredients;
    } catch (error) {
        console.log(error)
        alert('Something went wrong');
    }
  }
  // calc time to prep. Assuming tha we need 15 min for each 3 ingredients
  calcTime () {
      const numIng = this.ingredients.length;
      const periods = Math.ceil(numIng / 3);
      this.time = periods * 15;
  }
  calcServings() {
      this.servings = 4;
  }
}
