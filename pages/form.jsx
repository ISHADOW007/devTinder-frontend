import React, { useEffect, useState } from 'react';

import FormPage1 from '../src/components/FormPage1';
import FormPage2 from '../src/components/FormPage2';
import FormPage3 from '../src/components/FormPage3';
import FormPage4 from '../src/components/FormPage4';
import ProgressBar from '../src/components/ProgressBar';
import { useSelector } from 'react-redux';

const Form = () => {
  const [steps, setSteps] = useState(1);
  const totalSteps = 4;
  const user= useSelector(store=> store.user)
  const [localUser,setLocalUser]=useState(user)
  
    useEffect(()=>{
         setLocalUser((prev)=> user)
       
    },[user]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900 text-white px-4">
      <div className=" max-w-sm flex flex-col items-start justify-center p-4 rounded-md m-2 bg-blue-600 shadow-md">
        <h2 className="text-xl font-bold mb-2">Complete Your Profile</h2>
        <p className="text-sm mb-3">Help us find your perfect developer match</p>

        <ProgressBar steps={steps} totalSteps={totalSteps} />
        <p className="text-sm mt-2 mb-4">Step {steps} of {totalSteps}</p>

        {steps === 1 && <FormPage1 steps={steps} setSteps={setSteps} localUser={localUser} setLocalUser={setLocalUser}/>}
        {steps === 2 && <FormPage2 steps={steps} setSteps={setSteps} localUser={localUser} setLocalUser={setLocalUser}/>}
        {steps === 3 && <FormPage3 steps={steps} setSteps={setSteps} localUser={localUser} setLocalUser={setLocalUser} />}
        {steps === 4 && <FormPage4 steps={steps} setSteps={setSteps} localUser={localUser} setLocalUser={setLocalUser}/>}
      </div>
    </div>
  );
};

export default Form;
