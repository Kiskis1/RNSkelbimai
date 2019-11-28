import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Modal,
} from 'react-native';

import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import loginScreen from './loginScreen.js';
import pridetiScreen from './tabScreen2.js';
import editScreen from './tabScreen3.js';
import firebase from 'react-native-firebase';
import SafeAreaView from 'react-native-safe-area-view';
import {ScrollView} from 'react-native-gesture-handler';

class TabScreen1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: null,
      data: [],
      userData: [],
      modal: false,
    };
  }

  componentWillMount() {
    const {currentUser} = firebase.auth();

    this.setState({currentUser});
    this.retrieveData();
  }
  componentDidMount() {
    this.retrieveUserData();
  }
  Rerender = () => {
    const {currentUser} = firebase.auth();

    this.setState({currentUser});
    this.retrieveData();
    this.retrieveUserData();
  };
  handleLogout = () => {
    firebase
      .auth()
      .signOut()
      .catch(error => this.setState({errorMessage: error.message}));
    this.setState({currentUser: null});
    this.setState({userData: []});
  };

  retrieveUserData = () => {
    if (this.state.currentUser != null) {
      const userioData = [];
      firebase
        .firestore()
        .collection('Skelbimai')
        .where('email', '==', this.state.currentUser.email)
        .get()
        .then(snapshot => {
          snapshot.docs.forEach(doc => {
            userioData.push({
              kaina: doc.data().kaina,
              lokacija: doc.data().lokacija,
              kvadratura: doc.data().kvadratura,
              kambsk: doc.data().kambsk,
              telnr: doc.data().telnr,
              email: doc.data().email,
              id: doc.data().id,
              docId: doc.id,
            });
          });
          this.setState({userData: userioData});
        });
    }
  };

  retrieveData = () => {
    const list = [];
    firebase
      .firestore()
      .collection('Skelbimai')
      .get()
      .then(snapshot => {
        snapshot.docs.forEach(doc => {
          list.push({
            kaina: doc.data().kaina,
            lokacija: doc.data().lokacija,
            kvadratura: doc.data().kvadratura,
            kambsk: doc.data().kambsk,
            telnr: doc.data().telnr,
            email: doc.data().email,
            id: doc.data().id,
            docId: doc.id,
          });
        });
        this.setState({data: list});
      });
  };

  renderItem = ({item}) => {
    return (
      <View style={styles.flatlistStyle}>
        <View style={styles.setBorderRadius}>
          <Text style={styles.info}>Kaina: {item.kaina}</Text>
          <Text style={styles.info}>Lokacija: {item.lokacija}</Text>
          <Text style={styles.info}>Kvadratura: {item.kvadratura}</Text>
          <Text style={styles.info}>Kambariu skaicius: {item.kambsk}</Text>
          <Text style={styles.info}>Tel Nr.: {item.telnr}</Text>
        </View>
      </View>
    );
  };

  render() {
    const {currentUser} = this.state;
    return (
      <SafeAreaView>
        <Modal
          visible={this.state.modal}
          animationType="fade"
          transparent={true}
          onRequestClose={() => this.setState({modal: false})}
          onDismiss={() => this.setState({modal: false})}>
          <View style={styles.modalViewStyle}>
            <TouchableOpacity
              style={styles.modalButtonStyle}
              onPress={() =>
                this.state.data.sort(
                  (a, b) => parseFloat(a.kaina) - parseFloat(b.kaina),
                )
              }>
              <Text style={styles.textStyle}>KAINA DIDEJANCIAI</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalButtonStyle}
              onPress={() =>
                this.state.data.sort(
                  (a, b) => parseFloat(b.kaina) - parseFloat(a.kaina),
                )
              }>
              <Text style={styles.textStyle}>KAINA MAZEJANCIAI</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalButtonStyle}
              onPress={() =>
                this.state.data.sort(
                  (a, b) => parseFloat(a.kvadratura) - parseFloat(b.kvadratura),
                )
              }>
              <Text style={styles.textStyle}>KVADRATURA DID</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalButtonStyle}
              onPress={() =>
                this.state.data.sort(
                  (a, b) => parseFloat(b.kvadratura) - parseFloat(a.kvadratura),
                )
              }>
              <Text style={styles.textStyle}>KVADRATURA MAZ</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalButtonStyle}
              onPress={_ => this.setState({modal: false})}>
              <Text style={styles.textStyle}>UZDARYTI</Text>
            </TouchableOpacity>
          </View>
        </Modal>
        <ScrollView>
          <View style={styles.container}>
            {currentUser ? (
              <Text>Hi {currentUser && currentUser.email}!</Text>
            ) : (
              <Text>Hi! Please login!</Text>
            )}
          </View>
          <FlatList
            data={this.state.data}
            keyExtractor={item => item.docId}
            renderItem={this.renderItem}
            extraData={this.state}
            style={styles.flatlist}
          />
          {currentUser ? (
            <View style={styles.textContainer}>
              <Text>Tavo Skelbimai</Text>
            </View>
          ) : null}
          {currentUser ? (
            <FlatList
              data={this.state.userData}
              keyExtractor={item => item.docId}
              extraData={this.state}
              renderItem={({item}) => (
                <TouchableOpacity
                  style={styles.touchButton}
                  onPress={() =>
                    this.props.navigation.navigate('Edit', {itemas: item})
                  }>
                  <View style={styles.flatlistStyle}>
                    <View style={styles.setBorderRadiusUser}>
                      <Text style={styles.info}>Kaina: {item.kaina}</Text>
                      <Text style={styles.info}>Lokacija: {item.lokacija}</Text>
                      <Text style={styles.info}>
                        Kvadratura: {item.kvadratura}
                      </Text>
                      <Text style={styles.info}>
                        Kambariu skaicius: {item.kambsk}
                      </Text>
                      <Text style={styles.info}>Tel Nr.: {item.telnr}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              )}
              style={styles.flatlist}
            />
          ) : null}
        </ScrollView>

        <View style={styles.buttonContainer}>
          {currentUser ? (
            <TouchableOpacity
              style={styles.buttonStyle}
              onPress={this.handleLogout}>
              <Text style={styles.textStyle}>LOGOUT</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.buttonStyle}
              onPress={() => this.props.navigation.navigate('Login')}>
              <Text style={styles.textStyle}>LOGIN</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            style={styles.buttonStyle}
            onPress={_ => this.setState({modal: true})}>
            <Text style={styles.buttonText}>FILTRAS</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonStyle}
            onPress={() => this.Rerender()}>
            <Text style={styles.buttonText}>REFRESH</Text>
          </TouchableOpacity>

          {currentUser ? (
            <TouchableOpacity
              style={styles.buttonStyle}
              onPress={() => this.props.navigation.navigate('Prideti')}>
              <Text style={styles.textStyle}>PRIDETI</Text>
            </TouchableOpacity>
          ) : null}
        </View>
      </SafeAreaView>
    );
  }
}

const TabScreenas = createStackNavigator(
  {
    Tab: {
      screen: TabScreen1,
    },
    Login: {
      screen: loginScreen,
    },
    Prideti: {
      screen: pridetiScreen,
    },
    Edit: {
      screen: editScreen,
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
    padding: 15,
  },
  margin: {
    marginTop: 10,
  },
  buttonStyle: {
    backgroundColor: '#6495ED',
    color: 'white',
    marginTop: 20,
    height: 50,
    width: 85,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    position: 'relative',
    bottom: 5,
    right: 5,
    borderRadius: 5,
  },
  container: {
    flex: 1,
    marginBottom: 15,
  },
  info: {
    color: 'black',
    fontSize: 14,
    marginTop: 5,
  },
  setBorderRadius: {
    padding: 5,
    paddingTop: 5,
    width: 250,
    borderWidth: 3,
    borderColor: 'black',
  },
  setBorderRadiusUser: {
    padding: 5,
    paddingTop: 5,
    width: 250,
    borderWidth: 3,
    borderColor: 'black',
    backgroundColor: 'red',
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'column',
    position: 'absolute',
    justifyContent: 'flex-end',
    alignSelf: 'flex-end',
  },
  textContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  touchButton: {
    width: 250,
  },
  flatlist: {
    width: 255,
    flexGrow: 0,
  },
  modalButtonStyle: {
    backgroundColor: '#6495ED',
    color: 'white',
    marginBottom: 20,
    height: 50,
    width: 150,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-start',
    elevation: 5,
    //position: 'absolute',
    bottom: 5,
    right: 5,
    borderRadius: 5,
  },
  modalViewStyle: {
    height: 350,
    width: 175,
    backgroundColor: 'gray',
  },
  flatlistStyle: {
    paddingTop: 10,
    paddingLeft: 5,
  },
});
