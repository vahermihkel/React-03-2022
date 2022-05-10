import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useRef } from "react";

function FileUpload() {
  const fileRef = useRef();
  
// Set the configuration for your app
// TODO: Replace with your app's config object
const firebaseConfig = {
  apiKey: 'AIzaSyBH9ePbaGz6wwIV6FS2AK4O5NlcJ6g05i8',
  authDomain: 'react0322.web.app',
  databaseURL: 'https://react-03-22-default-rtdb.europe-west1.firebasedatabase.app/',
  storageBucket: 'gs://react-03-22.appspot.com'
};
const firebaseApp = initializeApp(firebaseConfig);

// Get a reference to the storage service, which is used to create references in your storage bucket
const storage = getStorage(firebaseApp);

// Points to the root reference
const storageRef = ref(storage);

// Points to 'images'
const imagesRef = ref(storageRef, 'images');

// Points to 'images/space.jpg'
// Note that you can use variables to create child values
const fileName = 'space.jpg';
const spaceRef = ref(imagesRef, fileName);

// File path is 'images/space.jpg'
const path = spaceRef.fullPath;

// File name is 'space.jpg'
const name = spaceRef.name;

// Points to 'images'
const imagesRefAgain = spaceRef.parent;

let uploadedPictureUrl = "";

let  metadata = {
    contentType: 'image/jpeg'
  };

// Upload file and metadata to the object 'images/mountains.jpg'


  function uploadPicture2(file) {
    uploadBytes(storageRef, file, this.metadata);
  }

  function uploadPicture(file) {
    const storageRef = ref(storage, 'images/' + file.name);
    const uploadTask = uploadBytesResumable(storageRef, file, this.metadata);
    // Listen for state changes, errors, and completion of the upload.
        uploadTask.on('state_changed',
          (snapshot) => {
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
              case 'paused':
                console.log('Upload is paused');
                break;
              case 'running':
                console.log('Upload is running');
                break;
            }
          }, 
          (error) => {
            // A full list of error codes is available at
            // https://firebase.google.com/docs/storage/web/handle-errors
            switch (error.code) {
              case 'storage/unauthorized':
                // User doesn't have permission to access the object
                break;
              case 'storage/canceled':
                // User canceled the upload
                break;

              // ...

              case 'storage/unknown':
                // Unknown error occurred, inspect error.serverResponse
                break;
            }
          }, 
          () => {
            // Upload completed successfully, now we can get the download URL
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              console.log('File available at', downloadURL);
              this.uploadedPictureUrl = downloadURL;
            });
          }
        );
  }


  return (<div>
    <input ref={fileRef} type="file" />
    <button onClick={() => uploadPicture(fileRef.current.value)}>Lae üles</button>
  </div>)
}

export default FileUpload;