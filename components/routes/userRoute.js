import { useEffect, useState, useContext } from "react";
import { Context } from "../../context";
import axios from "axios";

const UserRoute = () => {
  // state
  const [ok, setOk] = useState(false);

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
      if (data.ok) setOk(true);
    } catch (err) {
      console.log(err);
      setHidden(true);
    }
  };

  return (
    <>
      {ok && (
        <h1 className="jumbotron h-100 p-5  text-center bg-primary square">
          <pre>{JSON.stringify(user, null, 4)}</pre>
        </h1>
      )}
    </>
  );
};

export default UserRoute;
