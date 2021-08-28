import { useContext } from "react";
import { Context } from "../../context";
import axios from "axios";
import UserRoute from "../../components/routes/UserRoute";

const UserIndex = () => {
  const {
    state: { user },
  } = useContext(Context);

  return (
    <UserRoute>
      <h1 className="jumbotron h-100 p-5  text-center bg-primary square">
        User Dashboard
      </h1>
    </UserRoute>
  );
};

export default UserIndex;
