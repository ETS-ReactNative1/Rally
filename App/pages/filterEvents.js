import React from 'react';
import { StyleSheet, Text, View, Image, ImageBackground } from 'react-native';
import { Images } from '../Themes';

export default class FilterEvents extends React.Component {

  static navigationOptions = {
    headerTitle: (<Image source={Images.logo}/>),
  };

  render() {
    return (
      <View style={styles.container}>
          <ImageBackground source={Images.map} style={{width: '100%', height: '100%'}}>
          </ImageBackground>
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
});