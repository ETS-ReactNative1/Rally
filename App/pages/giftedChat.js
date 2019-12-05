'use strict'
import React, { Component } from 'react';
import {
  Text,
  TextInput,
  TouchableHighlight,
  StatusBar,
  ListView,
  FlatList,
  View
} from 'react-native';
import { RallyLogo, SideIcons, BackButton, ScrollView } from '../components';
import firestore from '../../firebase';
import firebase from 'firebase';
import styles from './styles.js';

class Rooms extends Component {
  static navigationOptions = {
    title: 'Rooms',
    header: null
  };

  constructor(props) {
    super(props);
    var firebaseDB = firebase.database();
    this.roomsRef = firebaseDB.ref('rooms');
    this.state = {
      rooms: [],
      newRoom: ''
    }
  }

  componentDidMount() {
    this.listenForRooms(this.roomsRef);
  }

  listenForRooms(roomsRef) {
    roomsRef.on('value', (dataSnapshot) => {
      var roomsFB = [];
      dataSnapshot.forEach((child) => {
        roomsFB.push({
          name: child.val().name,
          key: child.key
        });
      });
      this.setState({ rooms: roomsFB });
    });
  }

  addRoom() {
    if (this.state.newRoom === '') {
      return;
    }
    this.roomsRef.push({ name: this.state.newRoom });
    this.setState({ newRoom: '' });
  }

  openMessages(room) {
    this.props.navigation.navigate('GiftedMessages', {roomKey: room.key, roomName: room.name});
  }

  renderRow(item) {
    return (
      <TouchableHighlight style={styles.roomLi}
      underlayColor="#fff"
      onPress={() => this.openMessages(item)}
      >
        <Text style={styles.roomLiText}>{item.name}</Text>
      </TouchableHighlight>
    )
  }

  render() {
    return (
      <View style={styles.roomsContainer}>
        <BackButton navigation={this.props.navigation} />
        <StatusBar barStyle="light-content"/>
        <Text style={styles.roomsHeader}>Messages</Text>
        <View style={styles.roomsListContainer}>
          <FlatList
            data={this.state.rooms}
            renderItem={({item}) => (this.renderRow(item)
            )}
          />
        </View>
      </View>
    );
  }
}

export default Rooms;
