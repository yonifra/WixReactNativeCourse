import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Navigation} from 'react-native-navigation';

class AddPost extends Component {
  constructor(props) {
    super(props);
    Navigation.events().bindComponent(this);
  }

  static options() {
    return {
      topBar: {
        rightButtons: [
          {
            id: 'save',
            text: 'Save',
          },
        ],
        leftButtons: [
          {
            id: 'cancel',
            text: 'Cancel',
          },
        ],
      },
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>AddPost Screen</Text>
      </View>
    );
  }

  navigationButtonPressed({buttonId}) {
    if (buttonId === 'save') {
      Navigation.dismissModal(this.props.componentId);
    } else if (buttonId === 'cancel') {
      Navigation.dismissModal(this.props.componentId);
    }
  }
}

export default AddPost;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#D3EDFF',
  },
  text: {
    fontSize: 28,
    textAlign: 'center',
    margin: 10,
  },
});
