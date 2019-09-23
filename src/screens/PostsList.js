import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Navigation} from 'react-native-navigation';

class PostsList extends Component {
  //   static propTypes = {
  //     componentId: PropTypes.string,
  //   };

  constructor(props) {
    super(props);
    Navigation.events().bindComponent(this);
  }

  static options() {
    return {
      topBar: {
        rightButtons: [
          {
            id: 'addPost',
            text: 'Add',
          },
        ],
      },
    };
  }

  pushViewPostScreen = () => {
    Navigation.push(this.props.componentId, {
      component: {
        name: 'ViewPost',
        passProps: {
          somePropToPass: 'Some props that we are passing',
        },
        options: {
          topBar: {
            title: {
              text: 'View Post',
            },
          },
        },
      },
    });
  };

  navigationButtonPressed({buttonId}) {
    if (buttonId === 'addPost') {
      this.openAddPostModal();;
    }
  }

  openAddPostModal = () => {
    Navigation.showModal({
      stack: {
        children: [
          {
            component: {
              name: 'AddPost',
              options: {
                topBar: {
                  title: {
                    text: 'Modal',
                  },
                },
              },
            },
          },
        ],
      },
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text} onPress={this.pushViewPostScreen}>
          PostsList Screen
        </Text>
      </View>
    );
  }
}

export default PostsList;

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
