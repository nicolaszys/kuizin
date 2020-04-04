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
      title: '',
      content: '',
      readError: null,
      postingRecipe: false,
      sucess: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleContentChange = this.handleContentChange.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
  }

  // handle submit recipe with a push
  async handleSubmit(event) {
    event.preventDefault();
    this.setState({ writeError: null, postingRecipe: true });
    try {
      await db.ref('recipes').push({
        title: this.state.title,
        content: this.state.content,
        timestamp: Date.now(),
        uid: this.state.user.uid,
      });
      this.setState({
        content: '', title: '', postingRecipe: false, success: true,
      });
    } catch (error) {
      this.setState({ writeError: error.message });
    }
  }

  handleContentChange(event) {
    console.log(event);

    this.setState({
      content: event.target.value,
    });
  }

  handleTitleChange(event) {
    console.log(event);

    this.setState({
      title: event.target.value,
    });
  }


  render() {
    return (
      <div id="add-recipe-container">
        <Header />
        <form id="add-recipe-form" onSubmit={this.handleSubmit}>
          {this.state.success ? (<div id="add-recipe-success-message">Sucessfully posted recipe</div>) : ''}
          <input type="text" className="form-control" placeholder="title" name="title" onChange={this.handleTitleChange} value={this.state.title} />
          <input type="text" className="form-control" placeholder="content" name="content" onChange={this.handleContentChange} value={this.state.content} />
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