import React from 'react';
import { Text, View } from 'react-native';
import firebase from 'firebase';
import { Header, Button, Spinner } from './src/components/common';
import LoginForm from './src/components/LoginForm';

export default class App extends React.Component {
  state = { loggedIn: null };

  componentWillMount() {
    if (!firebase.apps.length) {
      //checking whether firebase is already initialised
      firebase.initializeApp({
        apiKey: 'AIzaSyBl9Zjup1dpFyb5C6E7Sz-nmA_prvQrG5w',
        authDomain: 'auth-36797.firebaseapp.com',
        databaseURL: 'https://auth-36797.firebaseio.com',
        projectId: 'auth-36797',
        storageBucket: 'auth-36797.appspot.com',
        messagingSenderId: '301707849811',
      });
    }

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ loggedIn: true });
      } else {
        this.setState({ loggedIn: false });
      }
    });
  }

  renderContent() {
    switch (this.state.loggedIn) {
      case true:
        return (
          <View style={styles.buttonContainerStyle}>
            <Button onPress={() => firebase.auth().signOut()}>Log Out</Button>
          </View>
        );
      case false:
        return <LoginForm />;
      default:
        return (
          <View>
            <Spinner size="large" />
          </View>
        );
    }
  }

  render() {
    return (
      <View>
        <Header headerText="Authentication" />
        {this.renderContent()}
      </View>
    );
  }
} 

const styles = {
  buttonContainerStyle: {
    flexDirection: 'row',
    height: 40,
  },
};
