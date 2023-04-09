// Imports the Google Cloud client libraries
const vision = require('@google-cloud/vision');
const fs = require('fs');

// Creates a client
const client = new vision.ImageAnnotatorClient();

/**
 * TODO(developer): Uncomment the following line before running the sample.
 */
// const fileName = `/path/to/localImage.png`;
const request = {
  image: {content: fs.readFileSync(__filename)},
};

const [result] = await client.objectLocalization(request);
const objects = result.localizedObjectAnnotations;
objects.forEach((object: { name: any; score: any; boundingPoly: { normalizedVertices: any; }; }) => {
  console.log(`Name: ${object.name}`);
  console.log(`Confidence: ${object.score}`);
  const vertices = object.boundingPoly.normalizedVertices;
  vertices.forEach((v: { x: any; y: any; }) => console.log(`x: ${v.x}, y:${v.y}`));
});

// /**
//  * TODO(developer):
//  *  1. Uncomment and replace these variables before running the sample.
//  *  2. Set up ADC as described in https://cloud.google.com/docs/authentication/external/set-up-adc
//  *  3. Make sure you have the necessary permission to list storage buckets "storage.buckets.list"
//  *    (https://cloud.google.com/storage/docs/access-control/iam-permissions#bucket_permissions)
//  */
// const projectId = 'shelfie-383122';

// // const {Storage} = require('@google-cloud/storage');

// async function authenticateImplicitWithAdc() {
//   // This snippet demonstrates how to list buckets.
//   // NOTE: Replace the client created below with the client required for your application.
//   // Note that the credentials are not specified when constructing the client.
//   // The client library finds your credentials using ADC.
//   const storage = new Storage({
//     projectId,
//   });
//   const [buckets] = await storage.getBuckets();
//   console.log('Buckets:');

//   for (const bucket of buckets) {
//     console.log(`- ${bucket.name}`);
//   }

//   console.log('Listed all storage buckets.');
// }

// authenticateImplicitWithAdc();


// /**
//  * TODO(developer): Uncomment the following line before running the sample.
//  */
// const fileName = `/path/to/localImage.png`;

// const request = {
//   image: {content: fs.readFileSync(fileName)},
// };

// const [result] = await client.objectLocalization(request);
// const objects = result.localizedObjectAnnotations;
// objects.forEach(object => {
//   console.log(`Name: ${object.name}`);
//   console.log(`Confidence: ${object.score}`);
//   const vertices = object.boundingPoly.normalizedVertices;
//   vertices.forEach(v => console.log(`x: ${v.x}, y:${v.y}`));
// });

// async function quickstart() {
//     // Imports the Google Cloud client library
//     const vision = require('@google-cloud/vision');
  
//     // Creates a client
//     const client = new vision.ImageAnnotatorClient();
  
//     // Performs label detection on the image file
//     const [result] = await client.labelDetection('./wakeupcat.jpg');
//     const labels = result.labelAnnotations;
//     console.log('Labels:');
//     labels.forEach(label => console.log(label.description));
//   }
//   quickstart();