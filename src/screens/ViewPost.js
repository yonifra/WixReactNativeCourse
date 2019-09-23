import React, {Component} from 'react';
import {View, Text} from 'react-native-ui-lib';
import {ScrollView, StyleSheet} from 'react-native';

class ViewPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: props.item.title,
      text: props.item.text,
      img: props.item.img,
    };
  }

  render() {
    return (
      <ScrollView>
        <View flex padding-20>
          <Text text70 padding-10>
            {this.state.title}
          </Text>
          <Text text40>{this.state.text}</Text>
        </View>
      </ScrollView>
    );
  }
}

export default ViewPost;

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
