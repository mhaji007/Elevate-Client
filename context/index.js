// Upon refreshing or navigating away from the page
// the user information retrieved in form of json
// is lost. We need a global state management system like redux

import { useReducer, createContext } from "react";

// Initial state
const initialState = {
  user: null,
};

// Create context
const Context = createContext();

// root reducer
const rootReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, user: action.payload };
    case "LOGOUT":
      return { ...state, user: null };
    default:
      return state;
  }
};

// Context provider
const Provider = ({ children }) => {
  const [state, dispatch] = useReducer(rootReducer, initialState);

  return (
    <Context.Provider value={{ state, dispatch }}> {children}</Context.Provider>
  );
};

export {Context, Provider}
