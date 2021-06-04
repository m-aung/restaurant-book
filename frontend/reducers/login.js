// login reducer function
export default function login(state, action) {
  // conditional states
  switch (action.types) {
    case 'field': {
      return {
        ...state,
        // emmutate the state
        [action.fieldName]: action.payload,
      };
    }
    case 'login': {
      return {
        ...state,
        // emmutate the states
        error: '',
        isLoading: true,
      };
    }
    case 'loaded': {
      return {
        ...state,
        // emmutate the state
        // _id: action.payload || Math.floor(Math.random()*124250)
        isLoggedIn: true,
        isLoading: false,
      };
    }
    case 'error': {
      return {
        ...state,
        // emmutate the state
        error: 'Incorrect username or password!',
        isLoggedIn: false,
        isLoading: false,
        username: '',
        password: '',
      };
    }
    case 'logout': {
      return {
        ...state,
        // emmutate the state
        _id: '',
        isLoggedIn: false,
      };
    }
    default:
      return state;
  }
}
