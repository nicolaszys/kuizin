/* eslint-disable react/self-closing-comp */
/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';
import Header from '../components/Header';
import { auth, db, storage } from '../services/firebase';


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
          recipes.push({
            key: snap.key,
            picture_url: '',
            content: snap.val(),
          });


          // console.log(recipes);
        });
        // recipes.sort((a, b) => a.timestamp - b.timestamp);


        const storageRef = storage.ref();

        recipes.forEach((recipe) => {
          this.setState({ loadingRecipes: true });

          const img_path_ref = storageRef.child(`${recipe.key}/${recipe.content.picture_name}`);
          img_path_ref.getDownloadURL().then((url) => {
            const img = document.getElementById(recipe.key);
            if (img) {
              img.src = url;
              img.onload = () => {
                this.setState({ loadingRecipes: false });
              };
            }
          });
        });

        this.setState({ recipes });
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
            <div id="loading-spinner" className="spinner-border text-success" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          ) : ''}
          {this.state.recipes.map((recipe) => (

            <div className="recipe-card">
              {recipe.content.title}
              <br />
              {recipe.content.content}
              <br />

              <img id={recipe.key} alt={recipe.key} className="recipe-thumbnail"></img>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
