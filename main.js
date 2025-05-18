import { initializeApp } from "https://www.gstatic.com/firebasejs/11.7.3/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  onValue,
  query,
  orderByChild,

} from "https://www.gstatic.com/firebasejs/11.7.3/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyAiRrn9R3ZKLwbuuxPUgzD9x4peIUS8tiY",
  authDomain: "youssef-birthday-918da.firebaseapp.com",
  projectId: "youssef-birthday-918da",
  storageBucket: "youssef-birthday-918da.firebasestorage.app",
  messagingSenderId: "471201429857",
  appId: "1:471201429857:web:7a6bcab8f595123fdcad20",
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const messagesRef = ref(database, "birthdayMessages");

function saveMessage(name, message) {
  push(messagesRef, {
    name,
    message,
    timestamp: Date.now(),
  });
}

function loadMessages(callback) {
  const messagesQuery = query(messagesRef, orderByChild("timestamp"));
  onValue(messagesQuery, (snapshot) => {
    const data = snapshot.val();
    let messagesArray = [];
    if (data) {
      messagesArray = Object.values(data).sort((a, b) => b.timestamp - a.timestamp);
    }
    callback(messagesArray);
  });
}

function stylePost(post) {
  post.style.padding = "10px";
  post.style.marginTop = "10px";
  post.style.backgroundColor = "#fff";
  post.style.border = "2px solid #ff4081";
  post.style.borderRadius = "10px";
  post.style.boxShadow = "0 0 10px rgba(255, 64, 129, 0.2)";
  post.style.color = "#333";
  post.style.textAlign = "left";
  post.style.wordWrap = "break-word";
}

function displayMessages(messages) {
  const container = document.getElementById("messages");
  container.innerHTML = "";
  messages.forEach((msg) => {
    const post = document.createElement("div");
    post.textContent = `${msg.name}: ${msg.message}`;
    stylePost(post);
    container.appendChild(post);
  });
}

function postMessage() {
  const nameInput = document.getElementById("nameInput");
  const messageInput = document.getElementById("messageInput");
  
  const name = nameInput.value.trim();
  const message = messageInput.value.trim();
  
  if (name === "" || message === "") {
    alert("Write your message to youssef");
    return;
  }
  
  saveMessage(name, message);
  
  nameInput.value = "";
  messageInput.value = "";
}

