const FormPage2 = ({ setSteps,localUser,setLocalUser }) => {
  // const user = useSelector((store) => store.user);
  // const [localUser, setLocalUser] = useState(user);

  // useEffect(() => {
  //   setLocalUser(user);
  // }, [user]);

  const handleInputChange = (key, value) => {
    setLocalUser((prevUser) => ({
      ...prevUser,
      professional: {
        ...prevUser.professional,
        [key]: value,
      },
    }));
    console.log(localUser)
  };

  const handleNext = () => {
    // console.log("Professional Info:", localUser.professional);
    // dispatch(setProfessionalLink({
    //   professional: { ...localUser.professional },
    // }));
    setSteps((prev) => prev + 1);
  };

  return (
    <>
      <p className="mt-4 m-4 w-full text-lg font-semibold text-white">Professional Links</p>

      {/* Company */}
      <div className="w-full mb-4">
        <label htmlFor="company" className="block text-sm font-medium text-white mb-1">
          Company
        </label>
        <input
          type="text"
          id="company"
          name="company"
          placeholder="Google, Microsoft, Startup etc"
          value={localUser?.professional?.company || ""}
          onChange={(e) => handleInputChange(e.target.name, e.target.value)}
          className="w-full px-4 py-2 rounded-md bg-white/10 border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-400"
        />
      </div>

      {/* GitHub */}
      <div className="w-full mb-4">
        <label htmlFor="github" className="block text-sm font-medium text-white mb-2">
          GitHub Profile
        </label>
        <input
          type="text"
          id="github"
          name="github"
          placeholder="https://github.com/username"
          value={localUser?.professional?.github || ""}
          onChange={(e) => handleInputChange(e.target.name, e.target.value)}
          className="w-full px-4 py-2 rounded-md bg-white/10 border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-400"
        />
      </div>

      {/* LinkedIn */}
      <div className="w-full mb-4">
        <label htmlFor="linkedin" className="block text-sm font-medium text-white mb-2">
          LinkedIn Profile
        </label>
        <input
          type="text"
          id="linkedin"
          name="linkedin"
          placeholder="https://linkedin.com/in/username"
          value={localUser?.professional?.linkedin || ""}
          onChange={(e) => handleInputChange(e.target.name, e.target.value)}
          className="w-full px-4 py-2 rounded-md bg-white/10 border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-400"
        />
      </div>

      {/* Portfolio */}
      <div className="w-full mb-4">
        <label htmlFor="portfolio" className="block text-sm font-medium text-white mb-2">
          Portfolio Website
        </label>
        <input
          type="text"
          id="portfolio"
          name="portfolio"
          placeholder="https://yourportfolio.com"
          value={localUser?.professional?.portfolio || ""}
          onChange={(e) => handleInputChange(e.target.name, e.target.value)}
          className="w-full px-4 py-2 rounded-md bg-white/10 border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-400"
        />
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between w-full mb-2 mt-2">
        <button
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
          onClick={() => setSteps((prev) => prev - 1)}
        >
          Previous
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          onClick={handleNext}
        >
          Next
        </button>
      </div>
    </>
  );
};

export default FormPage2;






