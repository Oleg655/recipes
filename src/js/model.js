import { API_URL, RESULTS_PER_PAGE } from "./config.js";
import { getJson } from "./helpers.js";

export const state = {
	recipe: {},
	search: {
		query: '',
		results: [],
		page: 1,
		resultsPerPage: RESULTS_PER_PAGE,
	},
	bookmarks: [],
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

		if (state.bookmarks.some(bookmark => bookmark.id === id))
			state.recipe.bookmarked = true
		else state.recipe.bookmarked = false

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

		state.search.page = 1

	} catch (error) {
		throw error
	}
}

export const getSearchResultsPage = function (page = state.search.page) {
	state.search.page = page
	const start = (page - 1) * 10;
	const end = page * state.search.resultsPerPage;

	return state.search.results.slice(start, end)
}

export const updateServings = function (newServings) {
	state.recipe.ingredients.forEach(ingredient => {
		ingredient.quantity = (ingredient.quantity * newServings) / state.recipe.servings
	})

	state.recipe.servings = newServings
}

const persistBookmarks = function () {
	localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks))
}

export const addBookmark = function (recipe) {
	state.bookmarks.push(recipe)

	if (recipe.id === state.recipe.id) state.recipe.bookmarked = true

	persistBookmarks()
}

export const deleteBookmark = function (id) {
	const index = state.bookmarks.findIndex(element => element.id === id)
	state.bookmarks.splice(index, 1)

	if (id === state.recipe.id) state.recipe.bookmarked = false

	persistBookmarks()
}

const init = function () {
	const storage = localStorage.getItem('bookmarks')

	if (storage) state.bookmarks = JSON.parse(storage)
}

init()

const clearBookmarks = function () {
	localStorage.clear('bookmarks')
}

export const uploadRecipe = async function (newRecipe) {
	try {
		const ingredients = Object.entries(newRecipe).filter(entry => entry[0].startsWith('ingredient') && entry[1] !== '')
			.map(ingredient => {
				const ingredientArray = ingredient[1].replaceAll(' ', '').split(',')
				if (ingredientArray.length !== 3) throw new Error('Wrong ingredient format! Please use the correct format')
				const [quantity, unit, description] = ingredientArray
				return { quantity: quantity ? +quantity : null, unit, description }
			})
		const recipe = {
			title: newRecipe.title,
			source_url: newRecipe.sourceUrl,
			image_url: newRecipe.image,
			publisher: newRecipe.publisher,
			cooking_time: +newRecipe.cookingTime,
			servings: +newRecipe.servings,
			ingredients,
		}
		console.log(recipe)
	} catch (error) {
		throw error
	}
}