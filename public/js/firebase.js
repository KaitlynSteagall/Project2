//=======================================================
// firebase data & scripting for storing uploaded images
//=======================================================

const firebaseConfig = {
  apiKey: "AIzaSyBLnaCoI1DzsO_7yccSzmsbb4vGVAN9iIM",
  authDomain: "puffinpower-90f79.firebaseapp.com",
  databaseURL: "https://puffinpower-90f79.firebaseio.com",
  projectId: "puffinpower-90f79",
  storageBucket: "puffinpower-90f79.appspot.com",
  messagingSenderId: "934243007516",
  appId: "1:934243007516:web:b8d887b235a3578a2c33d9"
};

// Initialize Firebase, create some variables we can use
firebase.initializeApp(firebaseConfig);
const storageService = firebase.storage(); // contains methods for storing/fetching files
const puffinFBserver = storageService.ref(); // our actual specific server

// function to capture submit button, check for image, push to firebase if present, return url
function pushImageToPenguinByIDAndGetURL(penguinID) {
  const uploadedFile = document.querySelector("#validatedCustomFile").files[0];
  const capturedFile = $("#photo").attr("src");
  const randomNameString = penguinID + "_" + generateHash(6);
  let fileToSend;
  if (capturedFile) {
    fileToSend = capturedFile;
    console.log("inside pushImage function, see a camera picture");
  } else if (uploadedFile) {
    console.log("inside pushImage function, see an uploaded file");
    fileToSend = uploadedFile;
  } else {
    console.log("inside pushImage function, currently seeing no valid files");
    return;
  }
  // we can also grab metadata if we want; it can be added as .put(fileToSend, metadata)
  // const metadata = { contentType: capturedFile.type };
  const uploadTask = puffinFBserver
    .child(`images/${randomNameString}`)
    .put(fileToSend);
  uploadTask.then(snapshot => {
    console.log(
      "made it inside the actual firebase call, file sent to FB server"
    );
    snapshot.puffinFBserver.getDownloadURL().then(url => {
      console.log(`file uploaded. download url from firebase is ${url}`);
      return url;
    });
  });
}

// when we want to use an image from firebase, we can just set its source to the download url
// like so: $('#someImageTagID').src = url

// generate random number hash
function generateHash(n) {
  let hash = "";
  for (let i = 0; i < n; i++) {
    hash += Math.floor(Math.random() * 10);
  }
  console.log("made a random number hash, looks like ", hash);
  return hash;
}

// submit button function
$("#submitNewPuffinButton").on("click", event => {
  event.preventDefault(); // don't reload the page
  console.log("caught submit click event, sending image file to firebase");
  url = pushImageToPenguinByIDAndGetURL(penguinID);
  console.log("ran firebase submission, got url back", url);
});
