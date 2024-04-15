import 'core-js/stable';
import 'regenerator-runtime/runtime';

import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import bookmarksView from './views/bookmarksView.js';
import addRecipeView from './views/addRecipeView.js';
import * as model from './model';

import icons from '../img/icons.svg';
import { MODAL_CLOSE_SEC } from './config.js';

// if (module.hot) module.hot.accept();

const recipeContainer = document.querySelector('.recipe');


// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////


const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;
    recipeView.renderSpinner();

    // 0) Update results view to mark selected search result
    resultsView.update(model.getSearchResultPage());
    
    // 1) Updating bookmarks view
    bookmarksView.update(model.state.bookmarks);

    // 2) Loading recipe
    await model.loadRecipe(id);
    
    // 3) Rendering recipe
    recipeView.render(model.state.recipe);
  } catch (error) {
    console.error(error)
    recipeView.renderError();
  }
};

const controlSearchResults = async function() {
  try {
    resultsView.renderSpinner();

    const query = searchView.getQuery();
    if (!query) return;

    await model.loadSearchResults(query);
    resultsView.render(model.getSearchResultPage(1));

    paginationView.render(model.state.search);
  } catch(error) {
    console.error(error)
  }
}

const controlPagination = function(goToPage) {
  resultsView.render(model.getSearchResultPage(goToPage));

  paginationView.render(model.state.search);
}

const controlServings = function(newServings) {
  // Update the recipe servings (in state)
  model.updateServings(newServings);
  // Update the recipe view
  recipeView.update(model.state.recipe);
}

const controlAddBookmark = function() {
  // Add or remove a bookmark
  if (!model.state.recipe.bookmarked) {
    model.addBookmark(model.state.recipe);
  } else {
    model.deleteBookmark(model.state.recipe.id);
  }
  // update recipe view
  recipeView.update(model.state.recipe);

  // Render bookmarks
  bookmarksView.render(model.state.bookmarks)
}

const controlBookmarks = function () {
  bookmarksView.render(model.state.bookmarks);
}

const controlAddRecipe = async function(newRecipe) {
  try {

    addRecipeView.renderSpinner();

    await model.uploadRecipe(newRecipe);
    recipeView.render(model.state.recipe);

    // Render success mesasge
    addRecipeView.renderMessage();

    bookmarksView.render(model.state.bookmarks);

    // Change id in the URL
    window.history.pushState(null, '', `#${model.state.recipe.id}`);
    
    // Close modal after some secconds
    setTimeout(function() {
      addRecipeView.toggleWindow();
    }, MODAL_CLOSE_SEC * 1000)
  } catch(error) {
    console.error('💥', error);
    addRecipeView.renderError(error.message);
  }
}

const init = function() {
  try {

    bookmarksView.addHandlerRender(controlBookmarks);
    recipeView.addHandlerRednder(controlRecipes);
    recipeView.addHandlerUpdateServings(controlServings);
    recipeView.addHandlerAddBookmark(controlAddBookmark);
    searchView.addHandlerSearch(controlSearchResults);
    paginationView.addHandlerClick(controlPagination);
    addRecipeView._addHandlerUpload(controlAddRecipe);
  } catch (error) {
    console.error(error);
  }
}

init();

