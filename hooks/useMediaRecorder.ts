import { useState, useCallback, useRef } from "react";

interface RecordingData {
  blob: Blob;
  url: string;
}

export const useMediaRecorder = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingData, setRecordingData] = useState<RecordingData | null>(
    null
  );
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  const startRecording = useCallback((stream: MediaStream) => {
    try {
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: "video/webm" });
        const url = URL.createObjectURL(blob);
        setRecordingData({ blob, url });
        chunksRef.current = [];
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error("Error starting recording:", error);
    }
  }, []);

  const stopRecording = useCallback(() => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  }, [isRecording]);

  const clearRecording = useCallback(() => {
    if (recordingData) {
      console.log("Recording data ", recordingData);

      URL.revokeObjectURL(recordingData.url);
      setRecordingData(null);
    }
  }, [recordingData]);

  // TO-DO:ADD DOWNLOAD RECORDING HERE

  return {
    isRecording,
    recordingData,
    startRecording,
    stopRecording,
    clearRecording,
  };
};
