import React, { useState, useEffect, useRef, use } from "react";
import { Configuration, OpenAIApi } from "openai";
import { HfInference } from "@huggingface/inference";
// import { ImageAnnotatorClient } from '@google-cloud/vision';
import UploadImageButton from "./uploadImageButton";

const hf = new HfInference(process.env.HUGGING_FACE_API)

  // await hf.objectDetection({
  //   data: readFileSync('test/cats.png'),
  //   model: 'facebook/detr-resnet-50'
  // })

// import * as tf from '@tensorflow/tfjs';
// import * as cocoSsd from '@tensorflow-models/coco-ssd';
// import '@tensorflow/tfjs-backend-webgl';

// import '@tensorflow/tfjs-backend-cp@tensorflow-models/coco-ssdu';
// import '@tensorflow/tfjs-backend-webgl';

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
const configuration = new Configuration({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
});

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

  // Function to stop the webcam stream
  const stopWebcam = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
  };

  // On mount, start the webcam stream
  useEffect(() => {
    void startWebcam();
    return () => stopWebcam();
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

// // Store the resulting model in the global scope of our app.
// let model = undefined;

// // Before we can use COCO-SSD class we must wait for it to finish
// // loading. Machine Learning models can be large and take a moment 
// // to get everything needed to run.
// // Note: cocoSsd is an external object loaded from our index.html
// // script tag import so ignore any warning in Glitch.
// cocoSsd.load().then(function (loadedModel) {
//   model = loadedModel;
// });

//   const children = []; // type div type p

//   function predictWebcam() {
//     // Now let's start classifying a frame in the stream.
//     tf.browser.fromPixels(videoRef).then(function (pixels) {
//       model.detect(pixels).then(function (predictions) {
//         // Remove any highlighting we did previous frame.
//         for (let i = 0; i < children.length; i++) {
//           liveView.removeChild(children[i]);
//         }
//         // Now lets loop through predictions and draw them to the live view if
//         // they have a high confidence score.
//         for (let n = 0; n < predictions.length; n++) {
//           // If we are over 66% sure we are sure we classified it right, draw it!
//           if (predictions[n].score > 0.66) {
//             const p = document.createElement('p');
//             p.innerText = predictions[n].class + ' - with '
//                 + Math.round(parseFloat(predictions[n].score) * 100)
//                 + '% confidence.';
//             p.style = 'margin-left: ' + predictions[n].bbox[0] + 'px; margin-top: '
//                 + (predictions[n].bbox[1] - 10) + 'px; width: '
//                 + (predictions[n].bbox[2] - 10) + 'px; top: 0; left: 0;';
  
//             const highlighter = document.createElement('div');
//             highlighter.setAttribute('class', 'highlighter');
//             highlighter.style = 'left: ' + predictions[n].bbox[0] + 'px; top: '
//                 + predictions[n].bbox[1] + 'px; width: '
//                 + predictions[n].bbox[2] + 'px; height: '
//                 + predictions[n].bbox[3] + 'px;';
  
//             liveView.appendChild(highlighter);
//             liveView.appendChild(p);
//           }
//         }
  
//         // Call this function again to keep predicting when the browser is ready.
//         window.requestAnimationFrame(predictWebcam);
//       });
//     });
//   }
  
  


// const demosSection: HTMLElement = document.getElementById('demos')!;

// let model: cocoSsd.ObjectDetection | undefined;

// // Before we can use COCO-SSD class we must wait for it to finish
// // loading. Machine Learning models can be large and take a moment to
// // get everything needed to run.
// cocoSsd.load().then((loadedModel: cocoSsd.ObjectDetection) => {
//   model = loadedModel;
//   // Show demo section now model is ready to use.
//   demosSection.classList.remove('invisible');
// });

// const video: HTMLVideoElement = document.getElementById('webcam') as HTMLVideoElement;
// const liveView: HTMLDivElement = document.getElementById('liveView') as HTMLDivElement;

// // Check if webcam access is supported.
// function hasGetUserMedia(): boolean {
//   return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
// }

// let children: HTMLDivElement[] = [];

// // If webcam supported, add event listener to button for when user
// // wants to activate it.
// // if (hasGetUserMedia()) {
// //   const enableWebcamButton: HTMLButtonElement = document.getElementById('webcamButton') as HTMLButtonElement;
// //   enableWebcamButton.addEventListener('click', enableCam);
// // } else {
// //   console.warn('getUserMedia() is not supported by your browser');
// // }

// // Enable the live webcam view and start classification.
// function enableCam(event: MouseEvent): void {
//   if (!model) {
//     console.log('Wait! Model not loaded yet.');
//     return;
//   }

//   // Hide the button.
//   (event.target as HTMLButtonElement).classList.add('removed');

//   // getUsermedia parameters.
//   const constraints = {
//     video: true,
//   };

//     // Activate the webcam stream.
//     navigator.mediaDevices.getUserMedia(constraints).then((stream: MediaStream) => {
//       video.srcObject = stream;
//       video.addEventListener('loadeddata', predictWebcam);
//     });
//   }
  


// export const openai = new OpenAIApi(configuration);

function InputInfo() {
//   const [prompt, setPrompt] = useState("");
//   const [response, setResponse] = useState("");

//   const addPerson = async () => {

//     const conversationsResponse = await openai.createCompletion({
//       model: "gpt-3.5-turbo",
//       prompt:
//         "Given the following ingredients in a fridge, and taking into account the user's dietary needs: " +
//         prompt +
//         ", provide a list of recipes that can be recommended.",
//       temperature: 0,
//       max_tokens: 500,
//     });
//     console.log(conversationsResponse.data.choices[0]?.text);
//     const response = conversationsResponse.data.choices[0]?.text;
//     if (response) {
//       setResponse(response);
//     }
//   };


// async function quickstart(): Promise<void> {
//   // Creates a client
//   const client = new ImageAnnotatorClient();

//   // Performs label detection on the image file
//   const [result] = await client.labelDetection('./wakeupcat.jpg');
//   const labels = result.labelAnnotations;
//   console.log('Labels:');
//   if (labels) {
//     labels.forEach(label => console.log(label.description));
//   }
// }

// void quickstart();


  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
  };

  return (
    <>
      <div className="flex h-screen w-full justify-center bg-[#F1F2F6]">
        <div className="h-4/5 w-4/5 max-w-4xl rounded-lg bg-[#F1F2F6] p-3">
          <h1 className="text-center text-3xl font-extrabold text-[#2C1338]">
            Scan your ingredients below:
          </h1>
          <div>
            <Webcam></Webcam>
          </div>
          <h1 className="text-center text-3xl font-extrabold text-[#2C1338]">
            <UploadImageButton></UploadImageButton>
          </h1>
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
          </form>  */}
          {/* {response && (
            <div className="mt-10">
              <p className="text-lg font-medium">Response:</p>
              {response.split(/\r?\n/).map((line, i) => (
                <p key={i}>{line}</p>
              ))}
              {" "}
              <p className="text-gray-600">
                {response.split(/\r?\n/).join("\r\n")}
              </p>
            </div>
          )} */}
        </div>
      </div>
    </>
  );
  }


export default InputInfo;
