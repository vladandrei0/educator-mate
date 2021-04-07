import firebaseConfig from './config';

class Firebase {
  constructor(app) {
    if (!firebaseInstance) {
      app.initializeApp(firebaseConfig);
      this.auth = app.auth();
      this.googleProvider = new app.auth.GoogleAuthProvider()
      this.facebookProvider = new app.auth.FacebookAuthProvider()
    }
  }


  getUserProfile({ userId, onSnapshot }) {
    return this.db.collection('publicProfiles')
      .where('userId', '==', userId)
      .limit(1)
      .onSnapshot(onSnapshot)
  }

  register({ email, password }) {
    return this.auth.createUserWithEmailAndPassword(email, password);
  }

  doSignInWithGoogle = () => {
    return this.auth.signInWithPopup(this.googleProvider);
  }
  doSignInWithFacebook = () => {
    return this.auth.signInWithPopup(this.facebookProvider);
  }

  doPasswordUpdate = password => {
    return (this.auth.currentUser.updatePassword(password));
  }

  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

  async login({ email, password }) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  async logout() {
    await this.auth.signOut();
  }
}

let firebaseInstance;

function getFirebaseInstance(app) {
  if (!firebaseInstance && app) {
    firebaseInstance = new Firebase(app);
    return firebaseInstance;
  } else if (firebaseInstance) {
    return firebaseInstance
  } else {
    return null;
  }
}

export default getFirebaseInstance;
