import React from 'react';
import { Button, StyleSheet, View, Image, Text, Alert, FlatList, TextInput, TouchableOpacity, Dimensions } from 'react-native';
import MapView from 'react-native-maps';
import { Marker, Callout } from 'react-native-maps';
import { Images, Metrics } from '../Themes';
import { RallyLogo, BackButton, SideIcons } from '../components';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import { AntDesign } from '@expo/vector-icons';
import Constants from 'expo-constants';

const { height, width } = Dimensions.get('window')

export default class EventTwoStartRally extends React.Component {

  static navigationOptions = {
    header: null,
  };

  state = { interested: false };

  interestedButton() {
    this.setState({ interested: true});
    alert('You are interested in this event!');
  }

  render() {
    return (
        <View style={styles.scrollView}>
          <Image source={Images.event2Pic} style={styles.eventImage}/>
          <View>
            <Text style={styles.title}>Social Justice Activities Fair</Text>
            <Text style={styles.smallText}>Hosted by: Columbae</Text>
            <Text style={styles.smallText}>Nov. 1 | 4PM - 6PM</Text>
            <Text style={styles.smallText}>Columbae Lawn</Text>
            <Text></Text>
            <Text style={styles.title}>Rally with Friends</Text>
          <View style={styles.friendRow}>
            <Text style={styles.largeText}>Friend 1</Text>
            <View style={styles.checkBoxWrapper}>
              <Image source={Images.star} style={styles.star}/>
            </View>
           </View>
           <View style={styles.friendRow}>
            <Text style={styles.largeText}>Friend 2</Text>
            <View style={styles.checkBoxWrapper}>
              <Image source={Images.star} style={styles.star}/>
            </View>
           </View>
           <View style={styles.friendRow}>
            <Text style={styles.largeText}>Friend 3</Text>
            <View style={styles.checkBoxWrapper}>
              <Image source={Images.star} style={styles.star}/>
            </View>
           </View>
          </View>
        </View>
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
  map: {
    flex: 1,
  },
  mapStyle: {
    flex: 1,
    width: Metrics.screenWidth,
    height: Metrics.screenHeight,
  },
  info: {
    flex: 2.5,
  },
  eventImage: {
    width: Metrics.screenWidth,
    height: 300,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingTop: 10,
  },
  smallText: {
    fontSize: 16,
    textAlign: 'center',
  },
  largeText: {
    fontSize: 24,
    textAlign: 'left',
    paddingVertical: height * .025
  },
  checkBoxWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
    backgroundColor: '#F0F0F0',
    borderRadius: 20
  },
  checkBox: {
    height: 25,
    width: 25,
  },
  description: {
    textAlign: 'center',
  },
  bottombuttons: {
    paddingTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 25,
  },
  friendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  star: {
    height: 25,
    width: 25,
  },
});
