import { useState, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { SyncOutlined } from "@ant-design/icons";
import Link from "next/link";
import {Context} from "../context";

function Login() {
  // Jumbotron class has been removed in bootstrap 5
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // state
  const {state, dispatch} = useContext(Context)

  console.log("State", state)

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
          <div class="d-grid gap-2">
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
