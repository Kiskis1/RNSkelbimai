/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import loginScreen from './loginScreen.js';
import firebase from 'react-native-firebase';

class TabScreen3 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      kaina: '',
      lokacija: '',
      kvadratura: '',
      kambsk: '',
      telnr: '',
      email: '',
      data: [],
      errorMessage: null,
    };
  }

  componentWillMount() {
    let itemas = this.props.navigation.getParam('itemas', 'NO-ITEM');
    this.setState({data:itemas});
  }

  _saveData() {
    let skelbimas = {
      kaina: this.state.kaina,
      lokacija: this.state.lokacija,
      kvadratura: this.state.kvadratura,
      kambsk: this.state.kambsk,
      telnr: this.state.telnr,
      email: this.state.data.email,
      docId: this.state.data.docId,
    };
    firebase
      .firestore()
      .collection('Skelbimai')
      .doc(this.state.data.docId)
      .set(skelbimas);
  }
  _deleteData(){
    firebase
      .firestore()
      .collection('Skelbimai')
      .doc(this.state.data.docId)
      .delete();
  }

  render() {
    return (
      <View style={styles.itemContainer}>
        <TextInput
          style={styles.textInput}
          autoCapitalize="none"
          placeholder= {this.state.data.kaina}
          onChangeText={kaina => this.setState({kaina})}
          value={this.state.kaina}
        />
        <TextInput
          style={styles.textInput}
          autoCapitalize="none"
          placeholder= {this.state.data.lokacija}
          onChangeText={lokacija => this.setState({lokacija})}
          value={this.state.lokacija}
        />
        <TextInput
          style={styles.textInput}
          autoCapitalize="none"
          placeholder= {this.state.data.kvadratura}
          onChangeText={kvadratura => this.setState({kvadratura})}
          value={this.state.kvadratura}
        />
        <TextInput
          style={styles.textInput}
          autoCapitalize="none"
          placeholder= {this.state.data.kambsk}
          onChangeText={kambsk => this.setState({kambsk})}
          value={this.state.kambsk}
        />
        <TextInput
          style={styles.textInput}
          autoCapitalize="none"
          placeholder= {this.state.data.telnr}
          onChangeText={telnr => this.setState({telnr})}
          value={this.state.telnr}
        />
        <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.buttonStyle}
          onPress={this._saveData.bind(this)}>
          <Text style={styles.textStyle}>ISSAUGOTI</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonStyle}
          onPress={this._deleteData.bind(this)}>
          <Text style={styles.textStyle}>ISTRINTI</Text>
        </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const TabScreenas = createStackNavigator(
  {
    Tab: {
      screen: TabScreen3,
    },
    Edit: {
      screen: loginScreen,
    },
  },
  {
    initialRouteName: 'Tab',
    headerMode: 'none',
  },
);
const TabScreen = createAppContainer(TabScreenas);
export default TabScreen;

const styles = StyleSheet.create({
  itemContainer: {
    flex:1,
    padding: 15,
  },
  buttonContainer:{
    flex: 1,
    flexDirection: 'row',
  },
  buttonStyle:{
    backgroundColor: '#6495ED',
    color: 'white',
    marginTop: 20,
    marginRight: 20,
    height: 50,
    width: 100,
    alignItems: 'center',
    justifyContent: 'center',
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
