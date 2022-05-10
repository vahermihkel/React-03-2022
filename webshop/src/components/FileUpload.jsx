import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, uploadBytesResumable, getDownloadURL } from "firebase/storage";

function FileUpload() {
  let minuFail;
  
  // Set the configuration for your app
  // TODO: Replace with your app's config object
  const firebaseConfig = {
    apiKey: 'AIzaSyBMXLt-J5iYfSnoScMk3jUVLJyAMAve50E',
    authDomain: 'react0322.web.app',
    databaseURL: 'https://react-03-22-default-rtdb.europe-west1.firebasedatabase.app/',
    storageBucket: 'gs://react-03-22.appspot.com'
  };
  const firebaseApp = initializeApp(firebaseConfig);
  const storage = getStorage(firebaseApp);
  const storageRef = ref(storage);
  let uploadedPictureUrl = "";
  let metadata = {
      contentType: 'image/png'
    };

  function uploadPicture(file) {
    const storageRef = ref(storage, 'images/' + file.name);
    const uploadTask = uploadBytesResumable(storageRef, file, metadata);
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
              uploadedPictureUrl = downloadURL;
            });
          }
        );
  }

  function handleFileInput(event) {
    minuFail = event.target.files[0];
  }


  return (<div>
    <input onChange={(e) => handleFileInput(e)} type="file" />
    <button onClick={() => uploadPicture(minuFail)}>Lae üles</button>
  </div>)
}

export default FileUpload;