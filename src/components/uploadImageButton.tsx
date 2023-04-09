/* eslint-disable */
import React, { useState, useMemo} from 'react';

// import '@google-cloud/vision';
import { Storage } from "@google-cloud/storage"; 
import InputInfo from './inputInfo';
// import { ImageAnnotatorClient } from "@google-cloud/vision";
// import 'fs';
// import { HfInference } from '@huggingface/inference';
import Gpt from './gpt';

const UploadImageButton = () => {
  const [image, setImage] = useState([]);
  const [label, setLabel] = useState('');

  const handleUpload = async (event: any) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    const file = event.target.files[0];
    const reader = new FileReader();
    
    reader.onload = async (e: any) => {
      const imageData = e.target.result;
      const API_KEY = "AIzaSyApuTAyHiGE6HaTaVh8Vctvd38MtzUCRcQ";
      const VISION_API_ENDPOINT = "https://vision.googleapis.com/v1/images:annotate";
      
      const response = await fetch(`${VISION_API_ENDPOINT}?key=${API_KEY}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          requests: [
            {
              image: {
                content: imageData.replace("data:image/jpeg;base64,", "")
              },
              features: [
                {
                  type: "LABEL_DETECTION",
                  maxResults: 10
                }
              ]
            }
          ]
        })
      });
  
      const data = await response.json();
      // console.log(data.responses[0].labelAnnotations[0].description, "666666666");
      const labels = data.responses[0].labelAnnotations.map((label: any) => label.description).join(", ");
      console.log(labels);
      setLabel(labels);
    };
    
    reader.readAsDataURL(file);
  };
  
  return (
    <>
<div className="flex w-full justify-center bg-[#F1F2F6]">
  <div className="h-4/5 w-4/5 max-w-4xl rounded-lg bg-[#F1F2F6] p-3">
    <div style={{ display: 'flex', justifyContent: 'center', padding: '0px' }}>
      <label htmlFor="image-upload" style={{ backgroundColor: '#0078D4', color: 'white', padding: '10px 20px', borderRadius: '20px', cursor: 'pointer', fontSize: '1.2rem', transition: 'background-color 0.2s ease-in-out' }}>
        Or Upload An Image
      </label>
      <input id="image-upload" type="file" accept="image/*" onChange={handleUpload} style={{ display: 'none' }} />
    </div>
    <Gpt img_prompt={label}></Gpt>
  </div>
</div>


    </>
  );
};

export default UploadImageButton;
