/* eslint-disable react/self-closing-comp */
/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';
import Header from '../components/Header';
import { auth, db } from '../services/firebase';


export default class Recipes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: auth().currentUser,
      recipes: [],
      readError: null,
      loadingRecipes: false,
    };
  }

  async componentDidMount() {
    this.setState({ readError: null, loadingRecipes: true });
    try {
      db.ref('recipes').on('value', (snapshot) => {
        const recipes = [];
        snapshot.forEach((snap) => {
          recipes.push(snap.val());
        });
        // recipes.sort((a, b) => a.timestamp - b.timestamp);
        this.setState({ recipes });
        this.setState({ loadingRecipes: false });
      });
    } catch (error) {
      this.setState({ readError: error.message, loadingRecipes: false });
    }
  }


  render() {
    return (
      <div>
        <Header />
        <div id="recipes-container">
          {this.state.loadingRecipes ? (
            <div className="spinner-border text-success" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          ) : ''}
          {this.state.recipes.map((recipe) => (

            <div key={recipe.timestamp} className="recipe-thumbnail">
              {recipe.content}
              {recipe.recipe_image}
              {recipe.timestamp}
              <img src={recipe.recipe_picture} alt="Not loading"></img>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
