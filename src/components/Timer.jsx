// src/components/Timer.jsx
import React, { useEffect, useState } from "react";

const Timer = ({ duration, onTimeUp }) => {
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);

          // ✅ Delay state update callback to avoid React warning
          setTimeout(() => {
            onTimeUp();
            if (navigator.vibrate) navigator.vibrate(500);
          }, 0);

          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [onTimeUp]);

  const formatTime = (sec) => {
    const min = Math.floor(sec / 60);
    const s = sec % 60;
    return `${min}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <div className="text-xl font-semibold">
      ⏱️ {formatTime(timeLeft)}
      <div className="w-full bg-gray-700 h-2 rounded mt-2">
        <div
          className="bg-green-500 h-2 rounded"
          style={{ width: `${(timeLeft / duration) * 100}%` }}
        />
      </div>
    </div>
  );
};

export default Timer;
