import React from 'react';
import { Button, StyleSheet, View, Image, Text, Alert } from 'react-native';
import MapView from 'react-native-maps';
import { Marker, Callout } from 'react-native-maps';
import { Images, Metrics } from '../Themes';
import { RallyLogo, BackButton, SideIcons, CurrentLocationIcon } from '../components';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import { Entypo } from '@expo/vector-icons';
import firestore from '../../firebase';
import firebase from 'firebase';

const eventIcons = [ Images.rally1, Images.rally2 ];
const ralliesImages = [ Images.rally1Pic, Images.rally2Pic ];

export default class RalliesExpanded extends React.Component {

  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    var user = firebase.auth().currentUser;
    this.roomsRef = firestore.collection('users/' + user.uid  + '/rooms');
    this.state = {
      rooms: [],
      rally: false,
    }
  }

  openMessages(room) {
    console.log(room.key);
    if (room.key == '6HBpyQIweArvlyP50LiK') {
      this.props.navigation.navigate('GiftedMessages', {roomKey: room.key, roomName: "What is Asian American Studies?"});
    } else if (room.key == 'fTokbgBc9FSDrmmiO63u') {
      this.props.navigation.navigate('GiftedMessages', {roomKey: room.key, roomName: 'Sexual Violence Town Hall'});
    }
  }

  rallyButton() {
    let tmp = !this.state.interested;
    this.setState({ interested: tmp });
    var FirebaseDB = firebase.database();
    if (tmp) {
      Alert.alert('Success', 'You have joined ' + this.props.navigation.getParam('info').rallyOwner + '\'s Rally!');
    }
    if (this.props.navigation.getParam('info').rallyOwner == 'Sophie') {
      this.roomsRef.doc('6HBpyQIweArvlyP50LiK').set({
        name: "What is Asian American Studies?",
      });
      this.openMessages(FirebaseDB.ref('messages/6HBpyQIweArvlyP50LiK'));
    } else if (this.props.navigation.getParam('info').rallyOwner == 'Patrick') {
      this.roomsRef.doc('fTokbgBc9FSDrmmiO63u').set({
        name: 'Sexual Violence Town Hall',
      })
      this.openMessages(FirebaseDB.ref('messages/fTokbgBc9FSDrmmiO63u'));
    }

    //navigation to the correct messages
  }

  render() {
    const { navigation } = this.props;

    return (
      <ParallaxScrollView
        contentBackgroundColor="white"
        parallaxHeaderHeight={Metrics.screenHeight * .5}
        renderForeground={() => (
          <View style={styles.foreground}>
            <View style={styles.container}>
              <MapView
                initialRegion={{
                  latitude: 37.4274,
                  longitude: -122.1697,
                  latitudeDelta: 0.0222,
                  longitudeDelta: 0.0001,
                }}
                style={styles.mapStyle}
              >

              <CurrentLocationIcon/>

              <Marker 
                coordinate={{
                  latitude: navigation.getParam('info').latitude,
                  longitude: navigation.getParam('info').longitude,
                }}
                title={navigation.getParam('info').name}
              >
                <Image source={eventIcons[navigation.getParam('image')]}/>
              </Marker>

            </MapView>

            <RallyLogo navigation={this.props.navigation} />
            <SideIcons navigation={this.props.navigation} />
            <BackButton navigation={this.props.navigation} />
          </View>
        </View>
      )}>


        <View style={styles.scrollView}>
          <View style={styles.alignCenter}>
            <Entypo name='chevron-small-up' size={30}/>
            <Text style={styles.title}>{navigation.getParam('info').name}</Text>
            <Image source={ralliesImages[navigation.getParam('image')]} style={styles.eventImage}/>
          </View>

          <View style={styles.text}>
            <Text style={styles.smallText}>{navigation.getParam('info').host}</Text>
            <Text style={styles.smallText}>{navigation.getParam('info').date}</Text>
            <Text style={styles.smallText}>{navigation.getParam('info').location}</Text>
          </View>
          <View style={styles.text}>
            <Text style={styles.description}>{navigation.getParam('info').bodyOne} </Text>
          </View>
          {navigation.getParam('info').bodyTwo &&
            <View style={styles.text}>
              <Text style={styles.description}>{navigation.getParam('info').bodyTwo}</Text>
            </View>
          }
          {navigation.getParam('info').bodyThree &&
            <View style={styles.text}>
              <Text style={styles.description}>{navigation.getParam('info').bodyThree}</Text>
            </View>
          }


          <View style={styles.bottombuttons}>
            <Button
              title={'See ' + navigation.getParam('info').rallyOwner + '\'s Profile'}
              onPress={() => this.props.navigation.navigate('FriendTwo')}
            />
            {this.state.interested ?
              <View style={styles.confirmedInterest}>
                <Text style={styles.smallText}>Joined  </Text>
                <Image source={Images.filterRallies} style={styles.star}/>
              </View>
            :
              <Button
                title={'Join ' + navigation.getParam('info').rallyOwner + '\'s Rally'}
                onPress={() => this.rallyButton()}
              />
            }
          </View>
        </View>
      </ParallaxScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  foreground: {
    height: 700,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 10,
  },
  mapStyle: {
    flex: 1,
    width: Metrics.screenWidth,
    height: Metrics.screenHeight,
  },
  scrollView: {
    paddingLeft: 20,
    paddingRight: 20,
  },
  alignCenter: {
    alignItems: 'center',
  },
  eventImage: {
    width: Metrics.screenWidth * 0.90,
    height: Metrics.screenHeight * 0.3,
    margin: 10,
    borderRadius: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  smallText: {
    fontSize: 16,
    textAlign: 'center',
  },
  text: {
    padding: 10,
  },
  description: {
    textAlign: 'center',
  },
  bottombuttons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 10,
  },
  confirmedInterest: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  star: {
    height: 25,
    width: 30,
  },
});
