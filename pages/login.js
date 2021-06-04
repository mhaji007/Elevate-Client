import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { SyncOutlined } from "@ant-design/icons";
import Link from "next/link";
import {Context} from "../context";
import {useRouter} from "next/router";

function Login() {
  // Jumbotron class has been removed in bootstrap 5
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // useContext grants access to state
  const {state:{user}, dispatch} = useContext(Context)


  // console.log("State", state)

  // Router
  const router = useRouter();

  // On component mount redirect users away
  // from login page if they are aleady logged in

  useEffect(() =>{

    if(user !== null) router.push("/")

  }, [user])

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.table({ name, email, password });
    try {
      setLoading(true);
      const { data } = await axios.post(`/api/login`, {
        email,
        password,
      });
      // console.log("Login RESPONSE", data);
      // toast.success("Login successful. Please proceed to login");
      dispatch({
        type: 'LOGIN',
        payload:data
      })

      // Up until now if we refresh the page
      // the user detail retrieved from
      // the state is lost. We need to persist the
      // state on page refresh

      // Save user data in local storage
      window.localStorage.setItem("user", JSON.stringify(data))

      // Redirect user after successful login
      router.push("/")

      // setLoading(false);
    } catch (err) {
      toast.error(err.response.data);
      setLoading(false);
    }
  };

  return (
    <>
      <h1 className="jumbotron h-100 p-5  text-center bg-primary square">
        Login
      </h1>
      <div className="container col-md-4 offset-md-4 pb-5">
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            className="form-control mb-4 p-3"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
            required
          />
          <input
            type="password"
            className="form-control mb-4 p-3"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            required
          />
          <div className="d-grid gap-2">
            <button
              type="submit"
              className="btn btn-primary p-2"
              disabled={ !email || !password || loading}
            >
              {loading ? <SyncOutlined spin /> : "Submit"}
            </button>
          </div>
        </form>
        <p className="text-center p-3">
          Don't have an account?{" "}
          <Link href="/register">
            <a>Register</a>
          </Link>
        </p>
      </div>
    </>
  );
}

export default Login;
