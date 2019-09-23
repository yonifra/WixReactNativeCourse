import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {TextField, View} from 'react-native-ui-lib';
import {Navigation} from 'react-native-navigation';
import {postsStore} from '../posts.store';

const INPUT_SPACING = 10;

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

  onTextChange = text => {
    this.setState({text});
  };

  onSavePressed = () => {
    Navigation.dismissModal(this.props.componentId);
    const randomImageNumber = Math.floor(Math.random() * 500 + 1);
    postsStore.addPost({
      title: this.state.title,
      text: this.state.text,
      img: `https://picsum.photos/200/200/?image=${randomImageNumber}`,
    });
  };

  render() {
    return (
      <View flex style={{margin: 20}}>
        <TextField
          text70
          containerStyle={{marginBottom: INPUT_SPACING}}
          floatingPlaceholder
          placeholder="Write your title..."
          helperText="Blog title"
          maxLength={100}
          onChangeText={this.onTitleChange}
        />

        <TextField
          text70
          containerStyle={{marginBottom: INPUT_SPACING}}
          floatingPlaceholder
          multiline
          placeholder="Some content..."
          helperText="Your blog content"
          value={this.state.text}
          onChangeText={this.onTextChange}
        />
      </View>
    );
  }

  navigationButtonPressed({buttonId}) {
    if (buttonId === 'save') {
      this.onSavePressed();
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
    backgroundColor: '#FFFFFF',
  },
  text: {
    fontSize: 28,
    textAlign: 'center',
    margin: 10,
  },
});
