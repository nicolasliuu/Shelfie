/* eslint-disable */
import React, { useState } from 'react';
import { HfInference } from '@huggingface/inference';
import { AnyAttrs } from '@tensorflow/tfjs';

const UploadImageButton = () => {
  const [image, setImage] = useState(null);
  const [label, setLabel] = useState<string>('');

  const handleUpload = async (event: any) => {
  const handleUpload = async (event: any) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = async (e: any) => {
      const imageData = e.target.result;
      const hf = new HfInference(process.env.HUGGING_FACE_API);
      const response = await hf.objectDetection({
        data: new Blob([imageData]),
        model: 'facebook/detr-resnet-50',
      });
      console.log(response);
    //   setLabel(response.label);
      console.log(label);
    }
    };

    reader.readAsDataURL(file);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '10px' }}>
      <label htmlFor="image-upload" style={{ backgroundColor: '#0078D4', color: 'white', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer' }}>Or Upload An Image</label>
      <input id="image-upload" type="file" accept="image/*" onChange={handleUpload} style={{ display: 'none' }} />
    </div>
  );
};

export default UploadImageButton;
