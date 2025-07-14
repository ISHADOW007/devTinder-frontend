import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { interests as setInterests, skills as setSkills } from '../../utils/userSlice';

const skillList = [
  "JavaScript", "TypeScript", "React", "Vue.js", "Angular", "Node.js", "Python", "Java",
  "Go", "Rust", "C++", "Swift", "Kotlin", "React Native", "Flutter", "Docker",
  "Kubernetes", "AWS", "GCP", "Azure", "Mongodb", "GrapQL", "REST APIs", "PostgeSQL"
];

const interestList = [
  "Open Source", "AI/ML", "Blockchain", "Gaming", "Mobile Apps", "Web dev", "DevOps",
  "CyberSecurity", "DataScience", "Iot", "AR/VR", "Fintec", "EdTech", "HealthTech",
  "E-commerce", "SaaSs", "Startups", "Tech Talks"
];

const FormPage3 = ({ steps, setSteps, localUser, setLocalUser }) => {
  const dispatch = useDispatch();

  const [selectedSkills, setSelectedSkills] = useState(localUser.skills || []);
  const [selectedInterests, setSelectedInterests] = useState(localUser.interests || []);

  // Toggle helper
  const toggleItem = (item, selectedItems, setItems, keyName) => {
    const updated = selectedItems.includes(item)
      ? selectedItems.filter((i) => i !== item)
      : [...selectedItems, item];

    setItems(updated);
    setLocalUser((prev) => ({
      ...prev,
      [keyName]: updated,
    }));
  };

  const baseButton =
    "rounded-full px-4 py-2 text-white text-sm font-medium m-1 shadow-sm transition transform hover:scale-105";
  const bgNormal = "bg-[#515ca0]";
  const bgSelected = "bg-gradient-to-r from-pink-500 to-purple-500";

  const handleNext = () => {
    // dispatch(setSkills({ skills: selectedSkills }));
    // dispatch(setInterests({ interests: selectedInterests }));
    console.log(localUser)
    setSteps((prev) => prev + 1);
  };

  return (
    <>
      <div className="w-full">
        <p className="text-lg font-semibold text-white mb-4">Tech Skills & Interests</p>

        {/* Skills */}
        <div className="mb-6 w-full">
          <p className="text-white font-medium mb-2">Tech Skills (Select all that apply)</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 w-full">
            {skillList.map((skill) => (
              <button
                key={skill}
                type="button"
                onClick={() => toggleItem(skill, selectedSkills, setSelectedSkills, "skills")}
                className={`${baseButton} ${
                  selectedSkills.includes(skill) ? bgSelected : bgNormal
                }`}
              >
                {skill}
              </button>
            ))}
          </div>
        </div>

        {/* Interests */}
        <div className="mb-6">
          <p className="text-white font-medium mb-2">Interests (Select your favorites)</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {interestList.map((interest) => (
              <button
                key={interest}
                type="button"
                onClick={() => toggleItem(interest, selectedInterests, setSelectedInterests, "interests")}
                className={`${baseButton} ${
                  selectedInterests.includes(interest) ? bgSelected : bgNormal
                }`}
              >
                {interest}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between w-full p-2 mt-6">
        <button
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
          onClick={() => setSteps((prev) => prev - 1)}
        >
          Previous
        </button>
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

export default FormPage3;
