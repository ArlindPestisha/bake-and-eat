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

  // Going to creat new arr[] to fix things from the old and put everything in the same Uniform
  parseIngredients () {
        // declaring to arr[] the old and the new wich is going to return from old arr
        const unitsLong = ['tablespoons', 'tablespoon', 'ounces', 'ounce', 'teaspoons', 'teaspoon', 'cups', 'pounds'];
        const unitsShort = ['tbsp', 'tbsp', 'oz', 'oz', 'tsp', 'tsp', 'cup', 'pound'];

      //using the map() method to go throghu old arr and after that creat a new arr with newIngredients
      const newIngredients = this.ingredients.map(el => {
          // 1) Uniform units
          let  ingredient = el.toLowerCase();
          // Loop through the old arr[] and find the current el and convert to the new arr with the same index to Unifom elements
          unitsLong.forEach((unit, i) => {
              ingredient = ingredient.replace(unit, unitsShort[i])
          });
          // 2) Remove parentheses, using regular expression
          ingredient = ingredient.replace(/ *\([^)]*\) */g, ' ');

          // 3) Parse ingredients into count, unit and ingredients
          // First thing to find the unit and to convert the ingredient to an array
          const arrIng = ingredient.split(' ');

          // Find the index at which part the unit is located using findIndex() method and icludes() methode
          const unitIndex = arrIng.findIndex(el2 => unitsShort.includes(el2));

          // Final obj that we are going to call
          let objIng;
          if (unitIndex > -1) {
              // There is a unit
              
              const arrCount = arrIng.slice(0, unitIndex);
              
              let count;
              if (arrCount.length === 1) {
                  count = eval(arrIng[0].replace('-', '+'));    //-----> Ex. 4 cups, arrCount is [4]
              } else {
                  count = eval(arrIng.slice(0, unitIndex).join('+'))  // ---> Ex. 4 1/2 cups, arrCount is [4, 1/2] after we use eval() this do the math and turn arrCount = [4.5];
              }
              // Final ingredient Object
            objIng = {
                count,
                unit: arrIng[unitIndex],
                ingredient: arrIng.slice(unitIndex + 1).join(' ')
            }

          } else if (parseInt(arrIng[0], 10)) {
            // There is NO unit, but 1st element is a number
            objIng = {
                count: parseInt(arrIng[0], 10),
                unit: '',
                ingredient: arrIng.slice(1).join(' ')
            }

            
          } else if (unitIndex === -1) {
            // There is NO unit and NO number in 1st position
            objIng = {
                count: 1,
                unit: '',
                ingredient
            }
          }

          return objIng;
      });
      this.ingredients = newIngredients;

  }
}
