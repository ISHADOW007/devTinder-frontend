import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { lookingFor, addUser } from "../../utils/userSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BASE_URL } from "../../utils/constants";
import axios from "axios";

const FormPage4 = ({ setSteps, localUser, setLocalUser }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const lookingFors = [
    "Serious Relationship",
    "Casual Dating",
    "Friendship",
    "Networking",
    "Coding Partner",
    "Startup Co-founder",
    "Mentor",
    "Mentee",
  ];

  const [selectedOptions, setSelectedOptions] = useState(localUser?.lookingFor || []);

  useEffect(() => {
    setSelectedOptions(localUser?.lookingFor || []);
  }, [localUser]);

  const toggleOption = (option) => {
    const updated = selectedOptions.includes(option)
      ? selectedOptions.filter((o) => o !== option)
      : [...selectedOptions, option];

    setSelectedOptions(updated);
    setLocalUser((prev) => ({
      ...prev,
      lookingFor: updated,
    }));
  };

  const handleSubmit = async () => {
    if (selectedOptions.length === 0) {
      return toast.warn("Please select at least one option");
    }

    dispatch(lookingFor({ lookingFor: selectedOptions }));

    // ✅ Define allowed fields
    const allowedFields = [
      "firstName", "lastName", "emailId", "photoUrl", "gender", "age",
      "about", "skills", "lookingFor", "bio", "content", "professional",
      "interests", "experienceLevel"
    ];

    // ✅ Filter localUser object
    const filteredUser = Object.keys(localUser).reduce((obj, key) => {
      if (allowedFields.includes(key)) {
        obj[key] = localUser[key];
      }
      return obj;
    }, {});

    // ✅ Force latest `lookingFor`
    filteredUser.lookingFor = selectedOptions;

    try {
      const res = await axios.patch(`${BASE_URL}/profile/edit`, filteredUser, {
        withCredentials: true,
      });

      dispatch(addUser(res?.data?.data));
      toast.success("Profile updated successfully!");
      navigate("/");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Something went wrong!");
    }
  };

  const baseButton =
    "rounded-full px-4 py-2 text-white text-sm font-medium m-1 shadow-sm transition transform hover:scale-105";
  const bgNormal = "bg-[#515ca0]";
  const bgSelected = "bg-gradient-to-r from-pink-500 to-purple-500";

  return (
    <>
      <div className="w-full mb-12">
        <p className="text-lg font-semibold text-white mb-4">
          What are you looking for?
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 w-full">
          {lookingFors.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => toggleOption(item)}
              className={`${baseButton} ${
                selectedOptions.includes(item) ? bgSelected : bgNormal
              }`}
            >
              {selectedOptions.includes(item) ? "✔ " : ""}
              {item}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between w-full">
        <button
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
          onClick={() => setSteps((prev) => prev - 1)}
        >
          Previous
        </button>
        <button
          onClick={handleSubmit}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
        >
          Submit
        </button>
      </div>
    </>
  );
};

export default FormPage4;
