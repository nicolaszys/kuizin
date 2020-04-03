import app from 'firebase/app';
import 'firebase/database';
import firebaseConfig from '../../firebase-config';

class Firebase {
  constructor() {
    app.initializeApp({
      firebaseConfig,
      databaseURL: 'https://kuizin-1c07f.firebaseio.com',
    });
    this.db = app.database();

    // test database set at object creation
    this.db.ref('users/test').set({
      username: '2222',
      email: '2222',
    });
  }
}

export default Firebase;
