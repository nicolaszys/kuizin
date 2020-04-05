/* eslint-disable react/self-closing-comp */
/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';
import Header from '../components/Header';
import { auth, db, storage } from '../services/firebase';


export default class AddRecipe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: auth().currentUser,
      title: '',
      content: '',
      recipe_picture: null,
      recipe_picture_name: '',
      readError: null,
      postingRecipe: false,
      sucess: false,
      created_recipe_id: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.file_input = React.createRef();
  }

  // handle submit recipe with a push
  async handleSubmit(event) {
    event.preventDefault();


    // const img = document.createElement('img');
    // img.file = this.file_input.current.files[0];
    // document.getElementById('add-recipe-form').appendChild(img);

    // const reader = new FileReader();
    // reader.onload = (function (aImg) { return function (e) { aImg.src = e.target.result; }; }(img));
    // const recipe_image_data = await reader.readAsDataURL(this.file_input.current.files[0]);

    // console.log(recipe_image_data);

    // console.log(this.file_input);
    this.setState({ writeError: null, postingRecipe: true });
    try {
      const database_op = await db.ref('recipes').push({
        title: this.state.title,
        content: this.state.content,
        timestamp: Date.now(),
        uid: this.state.user.uid,
        picture_name: this.file_input.current.files[0].name,
      });
      //   const created_db_ref = database_op.path.pieces[1];
      console.log(database_op.path.pieces_[1]);

      this.setState({
        content: '', title: '', postingRecipe: false, success: true, created_recipe_id: database_op.path.pieces_[1],
      });
    } catch (error) {
      this.setState({ writeError: error.message });
    }

    alert(
      `Selected file - ${this.file_input.current.files[0].name}`,
    );
    const storageRef = storage.ref();
    const recipeImageRef = storageRef.child(`${this.state.created_recipe_id}/${this.file_input.current.files[0].name}`);
    const file = this.file_input.current.files[0];

    try {
      await recipeImageRef.put(file).then((snapshot) => {
        console.log('Uploaded a blob or file!');
      });
    } catch (error) {
      this.setState({ writeError: error.message });
    }
  }


  // handle form input changes
  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleImageChange(e) {
    if (e.target.files[0]) {
      const recipe_picture = e.target.files[0];
      this.setState(() => ({ recipe_picture }));
    }
  }


  render() {
    return (
      <div id="add-recipe-container">
        <Header />
        <form id="add-recipe-form" onSubmit={this.handleSubmit}>
          {this.state.success ? (<div id="add-recipe-success-message">Sucessfully posted recipe</div>) : ''}
          <input type="text" className="form-control" placeholder="title" name="title" onChange={this.handleChange} value={this.state.title} />
          <input type="text" className="form-control" placeholder="content" name="content" onChange={this.handleChange} value={this.state.content} />
          <input type="file" accept="image/png, image/jpeg" name="recipe_picture" ref={this.file_input} onChange={this.handleChange} />
          {this.state.error ? <p className="text-danger">{this.state.error}</p> : null}

          {this.state.postingRecipe ? (
            <div className="spinner-border text-success" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          ) : ''}
          <button id="add-recipe-button" type="submit" className="btn btn-submit ml-1">Send recipe</button>
        </form>
      </div>
    );
  }
}
