// // // Imports the Google Cloud client libraries
// // const vision = require('@google-cloud/vision');
// // const fs = require('fs');

// // // Creates a client
// // const client = new vision.ImageAnnotatorClient();

// // /**
// //  * TODO(developer): Uncomment the following line before running the sample.
// //  */
// // const fileName = `/path/to/localImage.png`;

// // const request = {
// //   image: {content: fs.readFileSync(fileName)},
// // };

// // const [result] = await client.objectLocalization(request);
// // const objects = result.localizedObjectAnnotations;
// // objects.forEach(object => {
// //   console.log(`Name: ${object.name}`);
// //   console.log(`Confidence: ${object.score}`);
// //   const vertices = object.boundingPoly.normalizedVertices;
// //   vertices.forEach(v => console.log(`x: ${v.x}, y:${v.y}`));
// // });

// async function quickstart() {
//     // Imports the Google Cloud client library
//     const vision = require('@google-cloud/vision');
  
//     // Creates a client
//     const client = new vision.ImageAnnotatorClient();
  
//     // Performs label detection on the image file
//     const [result] = await client.labelDetection('./resources/wakeupcat.jpg');
//     const labels = result.labelAnnotations;
//     console.log('Labels:');
//     labels.forEach(label => console.log(label.description));
//   }
//   quickstart();