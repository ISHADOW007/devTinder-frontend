const ProgressBar = ({ steps, totalSteps }) => {
  const progressPercentage = (steps / totalSteps) * 100;

  return (
    <div className="w-full h-2 bg-indigo-800 rounded-full overflow-hidden">
      <div
        className="h-full bg-gradient-to-r from-pink-500 to-purple-500 rounded-full transition-all duration-500"
        style={{ width: `${progressPercentage}%` }}
      />
    </div>
  );
};

export default ProgressBar;
