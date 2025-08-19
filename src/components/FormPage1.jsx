const FormPage1 = ({ setSteps, localUser, setLocalUser }) => {
  

  const handleInputChange = (key, value) => {
    setLocalUser((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleNext = () => {
    // dispatch(
    //   setBasicInfo({
    //     firstName: localUser.firstName,
    //     lastName: localUser.lastName,
    //     bio: localUser.bio,
    //     experienceLevel: localUser.experienceLevel,
    //   })
    // );

    setSteps((prev) => prev + 1);
  };

  return (
    <>
      <div className="m-3 flex flex-col items-start w-full mx-auto">
        <p className="text-white font-semibold mb-4">Basic Information</p>

      <div className="flex gap-6 mb-4 w-full ">
          {/* First Name */}
          <div className="w-1/2">
            <label
              htmlFor="firstName"
              className="block text-sm font-medium text-white mb-1"
            >
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              placeholder="John"
              value={localUser?.firstName || ""}
              onChange={(e) =>
                handleInputChange("firstName", e.target.value)
              }
              className="w-full px-4 py-2 rounded-md bg-white/10 border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>

          {/* Last Name */}
          <div className="w-1/2">
            <label
              htmlFor="lastName"
              className="block text-sm font-medium text-white mb-1"
            >
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              placeholder="Doe"
              value={localUser?.lastName || ""}
              onChange={(e) =>
                handleInputChange("lastName", e.target.value)
              }
              className="w-full px-4 py-2 rounded-md bg-white/10 border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>
        </div>
      </div>

      {/* Bio */}
      <div className="w-full mb-6">
        <label
          htmlFor="bio"
          className="block text-sm font-medium text-white mb-1"
        >
          Bio
        </label>
        <textarea
          id="bio"
          rows="4"
          placeholder="Tell us about yourself, your coding journey, and what you're passionate about..."
          value={localUser?.bio || ""}
          onChange={(e) => handleInputChange("bio", e.target.value)}
          className="w-full px-4 py-2 rounded-md bg-white/5 border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-400 resize-none"
        />
      </div>

      {/* Experience Dropdown */}
      <div className="w-full mb-6">
        <label
          htmlFor="experience"
          className="block text-sm font-medium text-white mb-1"
        >
          Experience Level
        </label>
        <select
          id="experience"
          value={localUser?.experienceLevel || ""}
          onChange={(e) =>
            handleInputChange("experienceLevel", e.target.value)
          }
          className="w-full px-4 py-2 rounded-md bg-white/5 border border-white/30 text-white focus:outline-none focus:ring-2 focus:ring-purple-400"
        >
          <option style={{ backgroundColor: "#494395" }}>
            Beginner (0-1 years)
          </option>
          <option style={{ backgroundColor: "#494395" }}>
            Intermediate (2-4 years)
          </option>
          <option style={{ backgroundColor: "#494395" }}>
            Advanced (5-7 years)
          </option>
          <option style={{ backgroundColor: "#494395" }}>
            Lead (8+ years)
          </option>
        </select>
      </div>

      {/* Navigation */}
      <div className="flex justify-end w-full">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
          onClick={handleNext}
        >
          Next
        </button>
      </div>
    </>
  );
};

export default FormPage1;
