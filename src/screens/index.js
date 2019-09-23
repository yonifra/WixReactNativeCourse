import {Navigation} from 'react-native-navigation';

export function registerScreens() {
  Navigation.registerComponent(
    'PostsList',
    () => require('./PostsList').default,
  );
  Navigation.registerComponent('AddPost', () => require('./AddPost').default);
  Navigation.registerComponent('ViewPost', () => require('./ViewPost').default);
  Navigation.registerComponent('Other', () => require('./Other').Other);
  Navigation.registerComponent('Home', () => require('./Home').Home);
}
