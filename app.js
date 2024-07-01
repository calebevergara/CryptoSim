// app.js

// Initialize Firestore
const db = firebase.firestore();

// References to the collections
const tradesRef = db.collection('trades');

// Get elements
const tradeForm = document.getElementById('tradeForm');
const cryptoInput = document.getElementById('cryptoInput');
const amountInput = document.getElementById('amountInput');
const tradeList = document.getElementById('tradeList');

// Listen for form submission
tradeForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get input values
    const crypto = cryptoInput.value;
    const amount = amountInput.value;

    // Add trade to Firestore
    tradesRef.add({
        crypto: crypto,
        amount: parseFloat(amount),
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    });

    // Clear input fields
    cryptoInput.value = '';
    amountInput.value = '';
});

// Listen for real-time updates
tradesRef.orderBy('timestamp', 'desc').onSnapshot((snapshot) => {
    tradeList.innerHTML = ''; // Clear the list
    snapshot.forEach((doc) => {
        const trade = doc.data();
        const li = document.createElement('li');
        li.textContent = `${trade.amount} of ${trade.crypto}`;
        tradeList.appendChild(li);
    });
});
