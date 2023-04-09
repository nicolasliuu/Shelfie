/* eslint-disable */
import React, { useState, useEffect, useRef, use } from "react";
import { Configuration, OpenAIApi } from "openai";
import UploadImageButton from "./uploadImageButton";

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
// type InputProps = {
//   img_prompt: string;
// };

const Webcam = () => {
  // Declare state variables
  const [stream, setStream] = useState<MediaStream | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Function to start the webcam stream
  const startWebcam = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      console.log(stream.getVideoTracks(), "1111111");
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error("Failed to start webcam: ", err);
    }
  };

  // // Function to stop the webcam stream
  // const stopWebcam = () => {
  //   if (stream) {
  //     stream.getTracks().forEach((track) => track.stop());
  //     setStream(null);
  //   }
  // };

  // On mount, start the webcam stream
  useEffect(() => {
    void startWebcam();
    // return () => stopWebcam();
  }, []);

    // Render the video element to display the webcam feed
    return (
      // <div className="flex w-full items-center justify-center border-2 border-gray-400">
      //   <video ref={videoRef} autoPlay playsInline muted />
      // </div>
      <div className="flex w-full items-center justify-center">
          <video ref={videoRef} autoPlay playsInline muted className="object-contain" />
          {/* onLoadedData={predictWebcam} /> */}
      </div>
    );
};
  


function InputInfo() {

  // const handleSubmit = (event: React.FormEvent) => {
  //   event.preventDefault();
  // }

  return (
    <>
      <div className="flex w-full justify-center bg-[#F1F2F6]">
        <div className="h-4/5 w-4/5 max-w-4xl rounded-lg bg-[#F1F2F6] p-3">
          <h1 className="text-center text-3xl font-extrabold text-[#2C1338]">
            Scan your ingredients below:
          </h1>
          <div>
            <Webcam></Webcam>
          </div>
        </div>
      </div>
    </>
     
  );
}

export default InputInfo;
