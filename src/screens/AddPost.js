import React, {Component} from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';
import {Navigation} from 'react-native-navigation';

class AddPost extends Component {
  constructor(props) {
    super(props);
    Navigation.events().bindComponent(this);
    this.state = {
      title: '',
      text: '',
    };
  }

  static options() {
    return {
      topBar: {
        leftButtons: [
          {
            id: 'cancel',
            text: 'Cancel',
          },
        ],
        rightButtons: [
          {
            id: 'save',
            text: 'Save',
            enabled: false,
          },
        ],
      },
    };
  }

  onTitleChange = title => {
    this.setState({title});
    Navigation.mergeOptions(this.props.componentId, {
      topBar: {
        rightButtons: [
          {
            id: 'save',
            text: 'Save',
            enabled: !!title,
          },
        ],
      },
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>AddPost Screen</Text>
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          placeholder={'title'}
          onChangeText={this.onTitleChange}
        />
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
