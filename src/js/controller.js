import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/recipeView.js';


const controlRecipes = async function () {
	try {
		const id = window.location.hash.slice(1);

		if (!id) return;
		recipeView.renderSpinner();

		await model.loadRecipe(id);

		recipeView.render(model.state.recipe);
	} catch (error) {
		recipeView.renderError()
	}
};

const controlSearchResults = async function(){
	try{
		const query = searchView.getQuery()

		if(!query) return
		
		await model.loadSearchResults(query)
	}catch(error){
		console.log(error)
	}
}

controlSearchResults()

const init = function () {
	recipeView.addHandlerRender(controlRecipes)
}

init()
