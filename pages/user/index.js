import { useEffect, useState, useContext } from "react";
import { Context } from "../../context";
import axios from "axios";

const UserIndex = () => {
  // state
  const [hidden, setHidden] = useState(true);

  const {
    state: { user },
  } = useContext(Context);

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const { data } = await axios.get("/api/current-user");
      console.log(data);
      setHidden(false);
    } catch (err) {
      console.log(err);
      setHidden(true);
    }
  };

  return (
    <>
      {!hidden && (
        <h1 className="jumbotron h-100 p-5  text-center bg-primary square">
          <pre>{JSON.stringify(user, null, 4)}</pre>
        </h1>
      )}
    </>
  );
};

export default UserIndex;
