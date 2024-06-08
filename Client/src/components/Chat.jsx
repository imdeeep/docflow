import { getDatabase, ref, push, set, onChildAdded ,off} from "firebase/database";
import React, { useEffect, useState, useRef } from 'react';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import './chat.css';

const Chat = () => {
  const [name, setName] = useState('');
  const [chats, setChats] = useState([]);
  const [msg, setMsg] = useState('');

  const auth = getAuth();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const userEmailParts = user.email.split('@');
        const userName = userEmailParts[0];
        setName(userName);
      } else {
        setName("Guest User");
        console.log("No user is signed in");
      }
    });
  }, []);

  const db = getDatabase();
  const chatListRef = ref(db, 'chats');
  const chatContainerRef = useRef();

  useEffect(() => {
    const uniqueMessageKeys = new Set();

    onChildAdded(chatListRef, (data) => {
      const newMessage = data.val();
      if (!uniqueMessageKeys.has(data.key)) {
        uniqueMessageKeys.add(data.key);
        setChats((prevChats) => [...prevChats, newMessage]);
      }
    });

    return () => {
      off(chatListRef);
    };
  }, []);

  useEffect(() => {
    // Scroll to the bottom when a new message is load !
    chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
  }, [chats]);

  const sendChat = () => {
    const chatRef = push(chatListRef);
    set(chatRef, {
      name,
      message: msg,
    });
    setMsg('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      sendChat();
    }
  };

  const clearChat = () => {
    setChats([]);
  };

  return (
    <>
      <h1 className='mx-6 my-3' style={{ textAlign: "center", fontSize: "2.5rem", fontWeight: "bold", lineHeight: "1.8rem" }}>Chat Room</h1>

      <div style={{ overflowY: "auto" }}>
        <div
          ref={chatContainerRef}
          className="chatcont"
          style={{ border: "1px solid grey", width: "80vw", margin: "0 auto", borderRadius: "2px", height: "60vh", overflowY: 'auto' }}
        >
          {chats.map((c, i) => (
            <div key={i} className={`cont ${c.name === name ? 'me' : ''}`} style={{ display: "flex" }}>
              <p className='chatbox' style={{ marginBottom: '0.8rem' }}>
                <h1 style={{ fontSize: '13px', lineHeight: '18px', fontWeight: 'bold', margin: '0px 15px' }}>
                  <small>{c.name} :</small>
                </h1>
                <h2 style={{
                  fontSize: '14px',
                  border: '1px solid #d3d3d3',
                  maxWidth: '20vw',
                  padding: '1px 10px',
                  textAlign: 'start',
                  borderRadius: '2px',
                  margin: '0px 15px',
                  wordWrap: 'break-word'
                }}>
                  {c.message}
                </h2>
              </p>
            </div>
          ))}
        </div>
      </div>
      <div style={{ width: "80vw", margin: "0 auto", marginTop: "0.5rem", display: "flex", flexDirection: "row", alignItems: "center" }}>
        <input
          type="text"
          value={msg}
          onInput={(e) => setMsg(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder='Enter your messages'
          style={{ padding: "5px 2px", flexGrow: "1", outline: 'none', border: '1px solid grey', marginRight: '0.3rem', borderRadius: '2px' }}
        />
        <button onClick={sendChat} style={{ border: "1px solid grey", padding: "5px 15px", backgroundColor: "#2563EB", color: 'white', borderRadius: '2px' }}>Send</button>
        <button onClick={clearChat} style={{ border: "1px solid grey", padding: "5px 15px", backgroundColor: "grey", color: 'white', borderRadius: '2px', marginLeft: '0.3rem' }}>Clear</button>
      </div>
    </>
  );
};

export default Chat;
