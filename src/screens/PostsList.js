import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Navigation} from 'react-native-navigation';

class PostsList extends Component {
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
