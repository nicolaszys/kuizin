import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

// eslint-disable-next-line react/prefer-stateless-function
export default class Welcome extends Component {
  render() {
    return (
      <div className="welcome">
        {/* <Header /> */}
        <section>
          <div className="jumbotron jumbotron-fluid py-5">
            <div className="container text-center py-5">
              <h1 className="display-4">Welcome to Chatty</h1>
              <p className="lead">A great place to share your thoughts with friends</p>
              <div className="mt-4">
                <Link className="btn btn-primary px-5 mr-3" to="/signup">Create New Account</Link>
                <Link className="btn px-5" to="/login">Login to Your Account</Link>
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    );
  }
}
