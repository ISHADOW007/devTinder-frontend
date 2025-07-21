import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";
import { Link } from "react-router-dom";

const Connections = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const connections = useSelector((store) => store.connection);
  const dispatch = useDispatch();

  // 🔁 Fetch connections from backend
  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      console.log(res.data.data)
      dispatch(addConnections(res.data.data));
      setLoading(false);
    } catch (err) {
      console.error("Fetch error:", err?.response?.data || err.message);
      setError(err?.response?.data?.error || "Failed to load connections.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  // 🟡 Loading UI
  if (loading) return <h2 className="text-center my-10 text-lg">Loading connections...</h2>;

  // 🔴 Error UI
  if (error) return <h2 className="text-center text-red-500 my-10">{error}</h2>;

  // ⚪ Empty state
  if (!connections || connections.length === 0)
    return <h2 className="text-center my-10">No Connections Found</h2>;

  // ✅ Main UI
  return (
    <div className="text-center my-10">
      <h1 className="font-bold text-white text-3xl mb-6">Connections</h1>

      {connections.map((connection) => {
        const { _id, firstName, lastName, photoUrl, age, gender, about } = connection;

        return (
          <div
            key={_id}
            className="flex items-center justify-between gap-4 m-4 p-4 rounded-lg bg-base-300 w-11/12 md:w-2/3 lg:w-1/2 mx-auto"
          >
            {/* Profile Picture */}
            <div>
              <img
                alt="profile"
                className="w-20 h-20 rounded-full object-cover"
                src={photoUrl || "https://via.placeholder.com/80"}
              />
            </div>

            {/* Info */}
            <div className="text-left flex-1 mx-4">
              <h2 className="font-bold text-xl text-white">
                {firstName + " " + lastName}
              </h2>
              {age && gender && (
                <p className="text-gray-300">{`${age}, ${gender}`}</p>
              )}
              <p className="text-gray-400">{about}</p>
            </div>

            {/* Chat Button */}
            <Link to={"/chat/" + _id}>
              <button className="btn btn-primary">Chat</button>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default Connections;
