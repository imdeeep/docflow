import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import JoditEditor from 'jodit-react';
import { authInstance } from '/src/firebase.js';

const Home = () => {
  const editor = useRef(null);
  const [content, setContent] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = authInstance.onAuthStateChanged((authUser) => {
      setUser(authUser);
    });

    return () => unsubscribe();
  }, []);

  const handleSavedClick = async () => {
    if (!user) {
      // Redirect to login if the user is not logged in
      navigate('/login');
    } else {
      // Add logic to save the document to the backend
      const title = document.getElementById('documentTitle').value;
      const userId = user.email;

      try {
        const response = await fetch('https://docflow-server.cyclic.app/documents', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            title,
            content,
            userId,
          }),
        });

        if (response.ok) {
          console.log('Document saved successfully!');
          setShowAlert(true);
          setTimeout(() => {
            setShowAlert(false);
          }, 3000);
        } else {
          console.error('Error saving document:', response.statusText);
        }
      } catch (error) {
        console.error('Error saving document:', error.message);
      }
    }
  };

  return (
    <>
      {showAlert && (
        <div style={{ position: "absolute", right: "1rem", marginTop: "1rem", backgroundColor: "#2563eb12", padding: "5px 10px", border: "1px solid #2563EB", borderRadius: "2px", fontWeight: "bold" }}>
          Document Saved successfully!
        </div>
      )}
      <h1 className='mx-6 my-8' style={{ fontSize: "3rem", fontWeight: "bold", lineHeight: "1.8rem" }}>
        DocFlow <br />
        <span style={{ fontSize: "1.3rem", letterSpacing: "0.2px" }}>Seamlessly Edit, Share, and Organize Your Documents.</span>
      </h1>
      <div className='mx-5' style={{ border: "1px solid #E0E0E0", borderRadius: "2px" }}>
        <div className='my-5 mx-5' style={{ display: "flex", justifyContent: "space-between" }}>
          <input id="documentTitle" type="text" placeholder='Untitled document' style={{ backgroundColor: "#F5F5F5", border: "1px solid grey", borderRadius: "2px", padding: "2px 10px", outline: "none", minWidth: "40vw" }} />
          <button onClick={handleSavedClick} style={{ backgroundColor: "#2563EE", color: "white", borderRadius: "2px", padding: "2px 10px", border: "1px solid gray" }}>Save</button>
        </div>

        <div className="my-3 mx-5">
          <JoditEditor
            ref={editor}
            value={content}
            onChange={newContent => setContent(newContent)}
          />
        </div>
      </div>
    </>
  );
}

export default Home;
