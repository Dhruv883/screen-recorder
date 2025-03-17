import React, { useState } from "react";

interface RecordingOptionsProps {
  onStart: (options: {
    screen: boolean;
    webcam: boolean;
    audio: boolean;
  }) => void;
}

export const RecordingOptions: React.FC<RecordingOptionsProps> = ({
  onStart,
}) => {
  const [options, setOptions] = useState({
    screen: false,
    webcam: false,
    audio: false,
  });

  const handleOptionChange = (option: keyof typeof options) => {
    setOptions((prev) => ({
      ...prev,
      [option]: !prev[option],
    }));
  };

  const handleStart = () => {
    onStart(options);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Recording Options
        </h2>
        <div className="space-y-4">
          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              checked={options.screen}
              onChange={() => handleOptionChange("screen")}
              className="form-checkbox h-5 w-5 text-blue-600"
            />
            <span className="text-gray-700">Record Screen</span>
          </label>

          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              checked={options.webcam}
              onChange={() => handleOptionChange("webcam")}
              className="form-checkbox h-5 w-5 text-blue-600"
            />
            <span className="text-gray-700">Record Webcam</span>
          </label>

          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              checked={options.audio}
              onChange={() => handleOptionChange("audio")}
              className="form-checkbox h-5 w-5 text-blue-600"
            />
            <span className="text-gray-700">Record Audio</span>
          </label>
        </div>

        <button
          onClick={handleStart}
          className="mt-6 w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
        >
          Start Recording
        </button>
      </div>
    </div>
  );
};
