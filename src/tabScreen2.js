import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import uuidv4 from 'uuid';
import firebase from 'react-native-firebase';

export default class TabScreen2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      kaina: '',
      lokacija: '',
      kvadratura: '',
      kambsk: '',
      telnr: '',
      email: '',
      errorMessage: null,
    };
  }

  componentDidMount() {}

  _saveData() {
    let skelbimas = {
      kaina: this.state.kaina,
      lokacija: this.state.lokacija,
      kvadratura: this.state.kvadratura,
      kambsk: this.state.kambsk,
      telnr: this.state.telnr,
      email: firebase.auth().currentUser.email,
      id: uuidv4(),
    };
    firebase
      .firestore()
      .collection('Skelbimai')
      .doc()
      .set(skelbimas);
  }

  render() {
    return (
      <View style={styles.itemContainer}>
        <TextInput
          style={styles.textInput}
          autoCapitalize="none"
          placeholder="Kaina"
          onChangeText={kaina => this.setState({kaina})}
          value={this.state.kaina}
          keyboardType={'numeric'}
        />
        <TextInput
          style={styles.textInput}
          autoCapitalize="none"
          placeholder="Lokacija"
          onChangeText={lokacija => this.setState({lokacija})}
          value={this.state.lokacija}
        />
        <TextInput
          style={styles.textInput}
          autoCapitalize="none"
          placeholder="Kvadratura"
          onChangeText={kvadratura => this.setState({kvadratura})}
          value={this.state.kvadratura}
          keyboardType={'numeric'}
        />
        <TextInput
          style={styles.textInput}
          autoCapitalize="none"
          placeholder="Kambariu skaicius"
          onChangeText={kambsk => this.setState({kambsk})}
          value={this.state.kambsk}
          keyboardType={'numeric'}
        />
        <TextInput
          style={styles.textInput}
          autoCapitalize="none"
          placeholder="Tel. nr."
          onChangeText={telnr => this.setState({telnr})}
          value={this.state.telnr}
          keyboardType={'numeric'}
        />
        <TouchableOpacity
          style={styles.buttonStyle}
          onPressIn={this._saveData.bind(this)}
          onPress={() => this.props.navigation.goBack()}>
          <Text style={styles.textStyle}>ISSAUGOTI</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  itemContainer: {
    padding: 15,
  },
  name: {
    color: 'black',
    fontSize: 18,
  },
  info: {
    color: 'black',
    fontSize: 14,
    marginTop: 5,
  },
  setBorderRadius: {
    padding: 5,
    paddingTop: -5,
    width: 250,
    borderWidth: 3,
    borderColor: 'black',
    borderRadius: 20,
    backgroundColor: '#99badd',
  },
  buttonStyle: {
    backgroundColor: '#6495ED',
    color: 'white',
    marginTop: 20,
    height: 50,
    width: 85,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-start',
    elevation: 5,
    //position: 'absolute',
    bottom: 5,
    right: 5,
    borderRadius: 5,
  },
  textInput: {
    height: 40,
    width: '90%',
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 8,
  },
});
