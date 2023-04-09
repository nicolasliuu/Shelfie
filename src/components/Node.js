// /**
//  * TODO(developer):
//  *  1. Uncomment and replace these variables before running the sample.
//  *  2. Set up ADC as described in https://cloud.google.com/docs/authentication/external/set-up-adc
//  *  3. Make sure you have the necessary permission to list storage buckets "storage.buckets.list"
//  *    (https://cloud.google.com/storage/docs/access-control/iam-permissions#bucket_permissions)
//  */
// const projectId = 'shelfie-383122';

// const {Storage} = require('@google-cloud/storage');

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

// // authenticateImplicitWithAdc();

// async function quickstart() {
//     // Imports the Google Cloud client library
//     const vision = require('@google-cloud/vision');
  
//     // Creates a client
//     const client = new vision.ImageAnnotatorClient();
  
//     // Performs label detection on the image file
//     const [result] = await client.labelDetection('src/components/wakeupcat.jpg');
//     const labels = result.labelAnnotations;
//     console.log('Labels:');
//     labels.forEach(label => console.log(label.description));
//   }
//   quickstart();