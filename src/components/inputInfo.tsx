import React, { useState, useEffect, useRef, use } from "react";
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
});

// const Webcam = () => {
//   // Declare state variables
//   const [stream, setStream] = useState<MediaStream | null>(null);
//   const videoRef = useRef<HTMLVideoElement>(null);

//   // Function to start the webcam stream
//   const startWebcam = async () => {
//     try {
//       const stream = await navigator.mediaDevices.getUserMedia({ video: true });
//       console.log(stream.getVideoTracks(), "1111111");

//       videoRef.current.srcObject = stream;
//     } catch (err) {
//       console.error("Failed to start webcam: ", err);
//     }
//   };

//   // Function to stop the webcam stream
//   const stopWebcam = () => {
//     if (stream) {
//       stream.getTracks().forEach((track) => track.stop());
//       setStream(null);
//     }
//   };

//   // On mount, start the webcam stream
//   useEffect(() => {
//     startWebcam();
//     return () => stopWebcam();
//   }, []);

//   // Render the video element to display the webcam feed
//   return (
//     <div className="flex w-full items-center justify-center border-2 border-gray-400">
//       <video ref={videoRef} autoPlay playsInline muted />
//     </div>
//   );
// };


export const openai = new OpenAIApi(configuration);
const prompt = "tomatoes eggs rice";
console.log(prompt);

function InputInfo() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");

  const addPerson = async () => {

    const conversationsResponse = await openai.createCompletion({
      model: "gpt-3.5-turbo",
      prompt:
        "Given the following ingredients in a fridge, and taking into account the user's dietary needs: " +
        prompt +
        ", provide a list of recipes that can be recommended.",
      temperature: 0,
      max_tokens: 500,
    });
    console.log(conversationsResponse.data.choices[0]?.text);
    const response = conversationsResponse.data.choices[0]?.text;
    if (response) {
      setResponse(response);
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
  };

  return (
    <>
      <div className="flex h-screen w-full items-center justify-center bg-[#F5EFFF]">
        <div className="h-3/4 w-3/4 rounded-lg bg-[#F1F2F6] p-10 shadow-lg">
          <h1 className="text-center text-3xl font-extrabold text-[#2C1338]">
            Scan your ingredients below:
          </h1>
          {/* <div>
            <Webcam />
          </div> */}
          {/* <form onSubmit={handleSubmit} className="mt-6 h-screen">
            <textarea
              autoFocus
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="mb-3 h-1/2 w-full resize-none rounded-md border border-gray-400 p-3 caret-black outline-none"
              style={{ minHeight: "16px" }}
              placeholder="Scan below"
            />
            <button
              onClick={() => void addPerson()}
              type="submit"
              className="w-full rounded-md bg-[#15162C] p-2 text-[#F1F2F6] hover:bg-[#2E026D]">
              Get Response
            </button>
          </form> */}
          {response && (
            <div className="mt-10">
              <p className="text-lg font-medium">Response:</p>
              {response.split(/\r?\n/).map((line, i) => (
                <p key={i}>{line}</p>
              ))}
              {/* //{" "} */}
              {/* <p className="text-gray-600">
                {response.split(/\r?\n/).join("\r\n")}
              </p> */}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default InputInfo;
