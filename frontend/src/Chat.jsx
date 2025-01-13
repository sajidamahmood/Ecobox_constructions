// src/Chat.js
import React, { useState, useEffect } from 'react';
import { db } from './firebase';
import firebase from 'firebase/app';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  // Fetch messages from Firestore and listen for real-time updates
  useEffect(() => {
    const unsubscribe = db.collection('messages')
      .orderBy('timestamp')
      .onSnapshot((snapshot) => {
        setMessages(snapshot.docs.map((doc) => doc.data()));
      });

    return unsubscribe;
  }, []);

  // Send a new message to Firestore
  const sendMessage = async (e) => {
    e.preventDefault();

    await db.collection('messages').add({
      text: newMessage,
      sender: 'User', // Replace with dynamic sender if needed
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    });

    setNewMessage('');
  };

  return (
    <div>
      <div className="chat-window">
        {messages.map((message, index) => (
          <div key={index}>
            <strong>{message.sender}</strong>: {message.text}
          </div>
        ))}
      </div>
      <form onSubmit={sendMessage}>
        <input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message"
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default Chat;
