import { useState } from "react";
import axios from "axios";
import {toast} from "react-toastify";

function Register() {
  // Jumbotron class has been removed in bootstrap 5

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async(e) => {
    e.preventDefault();
    // console.table({ name, email, password });
    try {
    const { data } = await axios.post(
      `${process.env.NEXT_PUBLIC_API}/register`,
      {name, email, password}
    );
    // console.log("REGISTER RESPONSE", data);
    toast.success("Registration successful. Please proceed to login")
    } catch (err) {
      toast.error(err.response.data)
    }

  };

  return (
    <>
      <h1 className="jumbotron h-100 p-5  text-center bg-primary square">
        Register
      </h1>
      <div className="container col-md-4 offset-md-4 pb-5">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="form-control mb-4 p-3"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter name"
            required
          />
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
            <button type="submit" className="btn btn-primary p-2">
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Register;
