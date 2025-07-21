import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const CreateCommunity = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [communityStatus, setCommunityStatus] = useState("private");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  // const user = useSelector((state) => state.user);

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!name.trim()) return setError("Name is required");

    try {
      setLoading(true);
      setError("");

      await axios.post(
        BASE_URL + "/communities",
        {
          name,
          description,
          isPublic: communityStatus === "public", // 👈 convert to boolean
        },
        {
          withCredentials: true,
        }
      );

      navigate("/userCommunity");
    } catch (err) {
      setError(err.response?.data?.error || "Failed to create community");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-12 bg-white p-6 rounded-xl shadow-md">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold">Create a Community</h2>
        <Link
          to="/userCommunity"
          className="text-blue-600 hover:underline text-sm"
        >
          Your Communities
        </Link>
      </div>

      <form onSubmit={handleCreate} className="space-y-4">
        <input
          type="text"
          placeholder="Community Name"
          className="w-full border px-3 py-2 rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <textarea
          placeholder="Description (optional)"
          className="w-full border px-3 py-2 rounded"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <select
          value={communityStatus}
          onChange={(e) => setCommunityStatus(e.target.value)}
          className="w-full border px-3 py-2 rounded text-gray-800"
        >
          <option value="private">Private Community</option>
          <option value="public">Public Community</option>
        </select>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          {loading ? "Creating..." : "Create Community"}
        </button>
      </form>
    </div>
  );
};

export default CreateCommunity;
