import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../../utils/constants";

const CreateCommunity = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const user = useSelector((state) => state.user); // or auth.userId

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!name.trim()) return setError("Name is required");

    try {
      setLoading(true);
      setError("");

      const res = await axios.post(BASE_URL+"/communities", {
        name,
        description,
      },{
  withCredentials: true, // 👈 must include this
});

      // Optionally: Auto-join or redirect to room
      navigate("/userCommunity");
// or `/community/${res.data._id}`
    } catch (err) {
      setError(err.response?.data?.error || "Failed to create community");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-12 bg-white p-6 rounded-xl shadow-md">
      <div className="flex items-center justify-center">
        <h2 className="text-2xl font-semibold mb-4">Create a Community</h2>
        
        <Link to="/userCommunity"><span>Communities Created By You</span></Link>

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
        {error && <p className="text-red-500">{error}</p>}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? "Creating..." : "Create Community"}
        </button>
      </form>
    </div>
  );
};

export default CreateCommunity;
