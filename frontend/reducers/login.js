// login reducer function
export default login = (state, action) => {
  // conditional states
  switch (action.types) {
    case '': {
      return {
        ...state,
        // emmutate the state
      };
    }

    default:
      return state;
  }
};
