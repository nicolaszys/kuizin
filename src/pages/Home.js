/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default class HomePage extends Component {
  render() {
    return (
      <div className="home">
        <Header />
        <section>
          <div className="jumbotron jumbotron-fluid py-5">
            <div className="container text-center py-5">
              <h1 className="display-4">Welcome</h1>
              <div id="home-container">
                <Link className="menu-btn btn px-3" to="/chat">Go to chat app</Link>
                <Link className="menu-btn btn px-3" to="/recipes">Go to recipes app</Link>
                <Link className="menu-btn btn px-3" to="/add-recipe">Add a recipe</Link>

              </div>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    );
  }
}
