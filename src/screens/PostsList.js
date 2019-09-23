import React, {Component} from 'react';
import {
  FlatList,
  Text,
  StyleSheet,
  TouchableHighlight,
  View,
} from 'react-native';
import PropTypes from 'prop-types';
import {Navigation} from 'react-native-navigation';
import {connect} from 'remx';
import {postsStore} from '../posts.store';
import * as postsActions from '../posts.actions';

class PostsList extends Component {
  static propTypes = {
    componentId: PropTypes.string,
    posts: PropTypes.array,
  };

  constructor(props) {
    super(props);
    Navigation.events().bindComponent(this);
  }

  async componentDidMount() {
    await postsActions.fetchPosts();
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

  pushViewPostScreen(item) {
    Navigation.push(this.props.componentId, {
      component: {
        name: 'ViewPost',
        options: {
          topBar: {
            title: {
              text: item.title,
            },
          },
        },
      },
    });
  }

  navigationButtonPressed({buttonId}) {
    if (buttonId === 'addPost') {
      this.openAddPostModal();
    }
  }

  openAddPostModal() {
    Navigation.showModal({
      stack: {
        children: [
          {
            component: {
              name: 'AddPost',
              options: {
                topBar: {
                  title: {
                    text: 'Add Post Modal',
                  },
                },
              },
            },
          },
        ],
      },
    });
  }

  renderItem = ({item}) => (
    <TouchableHighlight onPress={() => this.pushViewPostScreen(item)}>
      <Text>{item.title}</Text>
    </TouchableHighlight>
  );

  render() {
    return (
      <FlatList
        data={this.props.posts}
        renderItem={this.renderItem}
        keyExtractor={item => item.id}
      />
    );
  }
}

function mapStateToProps() {
  return {
    posts: postsStore.getPosts(),
  };
}

export default connect(mapStateToProps)(PostsList);

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
