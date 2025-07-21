import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { BASE_URL } from "../utils/constants";
import UserCardForEditProfile from "./UserCardForEditProfile";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [age, setAge] = useState(user.age || "");
  const [gender, setGender] = useState(user.gender || "");
  const [about, setAbout] = useState(user.about || "");
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);

  const dispatch = useDispatch();

  const saveProfile = async () => {
    setError("");
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        { firstName, lastName, photoUrl, age, gender, about },
        { withCredentials: true }
      );
      dispatch(addUser(res?.data?.data));
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    } catch (err) {
      setError(err.response?.data || "An error occurred");
    }
  };

  return (
    <>
      <div className=" bg-gradient-to-br from-green-50 to-green-100 flex flex-col items-center py-10 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full max-w-6xl items-start">
          {/* ✏️ Edit Profile Form */}
          <div className="card bg-white shadow-xl p-6 rounded-lg w-full">
            <h2 className="text-2xl font-bold text-center text-green-700 mb-6">
              Edit Profile
            </h2>

            <div className="space-y-4">
              <Input label="First Name" value={firstName} onChange={setFirstName} />
              <Input label="Last Name" value={lastName} onChange={setLastName} />
              <Input label="Photo URL" value={photoUrl} onChange={setPhotoUrl} />
              <Input label="Age" value={age} onChange={setAge} />
              <Input label="Gender" value={gender} onChange={setGender} />
              <Input label="About" value={about} onChange={setAbout} />
            </div>

            {error && <p className="text-red-500 mt-4">{error}</p>}
            <div className="card-actions justify-center mt-6">
              <button className="btn btn-primary w-full" onClick={saveProfile}>
                Save Profile
              </button>
            </div>
          </div>

          {/* 👤 Live Preview */}
         <div > <UserCardForEditProfile user={{ firstName, lastName, photoUrl, age, gender, about }} /></div>
        </div>

        {/* ✅ Toast */}
        {showToast && (
          <div className="toast toast-top toast-center z-50">
            <div className="alert alert-success shadow-lg animate-fade-in-up">
              <span>✅ Profile updated successfully!</span>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

// 🧩 Reusable Input Component
const Input = ({ label, value, onChange }) => (
  <label className="form-control w-full">
    <div className="label">
      <span className="label-text text-gray-700">{label}</span>
    </div>
    <input
      type="text"
      className="input input-bordered w-full"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  </label>
);

export default EditProfile;
