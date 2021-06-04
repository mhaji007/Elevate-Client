// Upon refreshing or navigating away from the page
// the user information retrieved in form of json
// is lost. We need a global state management system like redux

import { useReducer, createContext, useEffect } from "react";

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

// Context provider (global state provider)
const Provider = ({ children }) => {
  const [state, dispatch] = useReducer(rootReducer, initialState);

  // On component mount retrieve user details persisted in state
  // (stored in local storage) upon login and update the state
  useEffect(() =>{
    dispatch ({
      type:"LOGIN",
      payload: JSON.parse(window.localStorage.getItem("user"))
    })
  },[])

  return (
    // The value will be accessible using useContext(Context)
    // inside any child component
    <Context.Provider value={{ state, dispatch }}> {children}</Context.Provider>
  );
};

export {Context, Provider}
