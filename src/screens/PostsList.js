import React, {Component} from 'react';
import {FlatList, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import * as Animatable from 'react-native-animatable';
import {Navigation} from 'react-native-navigation';
import {
  AnimatableManager,
  ListItem,
  Colors,
  Text,
  ThemeManager,
  BorderRadiuses,
} from 'react-native-ui-lib';
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

  renderRow(item, id) {
    const animationProps = AnimatableManager.presets.fadeInRight;
    const imageAnimationProps = AnimatableManager.getRandomDelay();

    return (
      <Animatable.View {...animationProps}>
        <ListItem
          activeBackgroundColor={Colors.dark60}
          activeOpacity={0.3}
          height={77.5}
          onPress={() => this.pushViewPostScreen(item)}>
          <ListItem.Part left>
            <Animatable.Image
              source={{uri: item.img}}
              style={styles.image}
              {...imageAnimationProps}
            />
          </ListItem.Part>
          <ListItem.Part
            middle
            column
            containerStyle={[styles.border, {paddingRight: 17}]}>
            <ListItem.Part containerStyle={{marginBottom: 3}}>
              <Text
                dark10
                text70
                style={{flex: 1, marginRight: 10}}
                numberOfLines={1}>
                {item.title}
              </Text>
              <Text dark10 text70 style={{marginTop: 2}}>
                {item.text}
              </Text>
            </ListItem.Part>
          </ListItem.Part>
        </ListItem>
      </Animatable.View>
    );
  }

  render() {
    return (
      <FlatList
        data={this.props.posts}
        renderItem={({item, index}) => this.renderRow(item, index)}
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
  image: {
    width: 54,
    height: 54,
    borderRadius: BorderRadiuses.br20,
    marginHorizontal: 14,
  },
  border: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: ThemeManager.dividerColor,
  },
});
