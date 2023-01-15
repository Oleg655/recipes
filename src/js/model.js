import { API_URL } from "./config.js";
import { getJson } from "./helpers.js";

export const state = {
	recipe: {},
	search: {
		query: '',
		results: [],
	},
};

export const loadRecipe = async function (id) {
	try {
		const data = await getJson(`${API_URL}${id}`)

		const { recipe } = data.data;
		state.recipe = {
			id: recipe.id,
			title: recipe.title,
			publisher: recipe.publisher,
			sourceUrl: recipe.source_url,
			image: recipe.image_url,
			servings: recipe.servings,
			cookingTime: recipe.cooking_time,
			ingredients: recipe.ingredients,
		};
	} catch (error) {
		throw error
	}
};

export const loadSearchResults = async function (query) {
	try {
		state.search.query = query
		const data = await getJson(`${API_URL}?search=${query}`)
		console.log(data)

		state.search.results = data.data.recipes.map(recipe => {
			return {
				id: recipe.id,
				title: recipe.title,
				publisher: recipe.publisher,
				image: recipe.image_url,
			}
		})

	} catch (error) {
		throw error
	}
}
