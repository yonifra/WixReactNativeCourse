import * as remx from 'remx';

const initialState = {
  posts: [],
};

const state = remx.state(initialState);

const getters = remx.getters({
  getPosts() {
    return state.posts;
  },
});

const setters = remx.setters({
  setPosts(posts) {
    state.posts = posts;
  },
});

export const postsStore = {
  ...getters,
  ...setters,
};
