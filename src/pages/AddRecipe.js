/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';
import Header from '../components/Header';
import { auth, db, storage } from '../services/firebase';
import { RecipeFileInputButton, RecipeSubmitButton } from '../styles/Buttons';


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
      success: false,
      created_recipe_id: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.file_input = React.createRef();
  }

  // handle submit recipe with a push
  async handleSubmit(event) {
    event.preventDefault();

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
        content: '', title: '', created_recipe_id: database_op.path.pieces_[1],
      });
    } catch (error) {
      this.setState({ writeError: error.message });
    }

    // alert(
    //   `Selected file - ${this.file_input.current.files[0].name}`,
    // );
    const storageRef = storage.ref();
    const recipeImageRef = storageRef.child(`${this.state.created_recipe_id}/${this.file_input.current.files[0].name}`);
    const file = this.file_input.current.files[0];

    try {
      await recipeImageRef.put(file).then((snapshot) => {
        console.log('Uploaded a blob or file!');
        this.setState({ postingRecipe: false, success: true });
      });
    } catch (error) {
      this.setState({ writeError: error.message });
    }
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    return (
      <div id="add-recipe-container">
        <Header />
        <form id="add-recipe-form" onSubmit={this.handleSubmit}>
          <input type="text" className="form-control" placeholder="title" name="title" onChange={this.handleChange} value={this.state.title} />
          <input type="text" className="form-control" placeholder="content" name="content" onChange={this.handleChange} value={this.state.content} />
          {/* <input type="file" accept="image/png, image/jpeg" name="recipe_picture" ref={this.file_input} onChange={this.handleChange} /> */}
          {this.state.error ? <p className="text-danger">{this.state.error}</p> : null}

          <RecipeFileInputButton>
            <input type="file" id="file" ref={this.file_input} />
            <label htmlFor="file">Upload a picture</label>
          </RecipeFileInputButton>

          {this.state.postingRecipe ? (
            <div className="spinner-border text-success" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          ) : ''}
          {this.state.success ? (<div id="add-recipe-success-message">Sucessfully posted recipe</div>) : ''}

          <RecipeSubmitButton type="submit">Upload recipe</RecipeSubmitButton>
        </form>
      </div>
    );
  }
}
