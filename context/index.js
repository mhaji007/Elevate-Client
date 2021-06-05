// Upon refreshing or navigating away from the page
// the user information retrieved in form of json
// is lost. We need a global state management system like redux

import { useReducer, createContext, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";

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

  //router
  const router = useRouter();

  // On component mount retrieve user details persisted in state
  // (stored in local storage) upon login and update the state
  useEffect(() => {
    dispatch({
      type: "LOGIN",
      payload: JSON.parse(window.localStorage.getItem("user")),
    });
  }, []);

  // Interceptors are called for every request
  axios.interceptors.response.use(
    function (response) {
      // Any status code that lies wihthin the range of 2XX cause
      // this function to trigger;
      return response;
    },
    function (error) {
      // Any status code that falls outside the range of 2XX cause
      // this function to trigger
      // We can use it here to log out users with expired tokens immediately
      let res = error.response;
      if (res.status === 401 && res.config && !res.config.__isRetryRequest) {
        return new Promise((resolve, reject) => {
          axios
            .get("/api/logout")
            .then((data) => {
              console.log("/401 error => logout");
              dispatch({ type: "LOGOUT" });
              window.localStorage.removeItem("user");
              router.push("/login");
            })
            .catch((error) => {
              console.log("Axios Interception Error", error);
              reject(error);
            });
        });
      }
      return Promise.reject(error);
    }
  );

  useEffect(() =>{
    const getCsrfToken = async () => {
      // Retrieve CSRF token from backend
      const {data} = await axios.get("/api/csrf-token");
      console.log("CDRF", data)
      // include the CSRF token retrieved from backend
      // on all requests
      axios.defaults.headers["X-CSRF-Token"] = data.getCsrfToken;
    }
    getCsrfToken();

  },[])

  return (
    // The value will be accessible using useContext(Context)
    // inside any child component
    <Context.Provider value={{ state, dispatch }}> {children}</Context.Provider>
  );
};



export { Context, Provider };
