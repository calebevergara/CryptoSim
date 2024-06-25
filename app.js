// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyARPKy8qTvKHL2L3teS0TLevU0TWG7TF9Y",
    authDomain: "cryptosim-2b130.firebaseapp.com",
    projectId: "cryptosim-2b130",
    storageBucket: "cryptosim-2b130.appspot.com",
    messagingSenderId: "71048475804",
    appId: "1:71048475804:web:e401176df043e214232959",
    measurementId: "G-LDNQ5T96PZ"
  
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Reference to Firestore database
const db = firebase.firestore();

// Reference to the message form and input
const messageForm = document.getElementById('messageForm');
const messageInput = document.getElementById('messageInput');

// Function to render messages from Firestore
function renderMessages() {
    const messageList = document.getElementById('messageList');
    messageList.innerHTML = ''; // Clear the current list
    db.collection('messages').get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            const message = doc.data().message;
            const li = document.createElement('li');
            li.textContent = message;
            messageList.appendChild(li);
        });
    });
}

// Listen for form submission
messageForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent form submission
    const message = messageInput.value; // Get the message from the input
    // Add the message to Firestore
    db.collection('messages').add({
        message: message
    }).then(() => {
        console.log('Message added!');
        messageInput.value = ''; // Clear the input field
        renderMessages(); // Render the updated list of messages
    }).catch((error) => {
        console.error('Error adding message: ', error);
    });
});

