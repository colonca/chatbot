const defaultState = null;

// eslint-disable-next-line default-param-last
const reducer = (state = defaultState, { type, payload }) => {
  switch (type) {
    case 'login': {
      return payload;
    }
    case 'logout': {
      return null;
    }
    default:
      return state;
  }
};

export default reducer;
