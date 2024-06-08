import React, { useRef, useState, useEffect, } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import JoditEditor from 'jodit-react';

const Edit = () => {
  const editor = useRef(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();

  // Use the useLocation hook to access the current location
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  // Retrieve the documentId from the query parameter
  const Id = searchParams.get('id');

  useEffect(() => {
    fetch(`https://docflow-server.cyclic.app/getdoc/${Id}`)
      .then(response => response.json())
      .then(data => {
        setTitle(data.title);
        setContent(data.content);
      })
      .catch(error => console.error('Error fetching document:', error));
  }, []);


  const handleUpdateClick = async () => {
    try {
      const response = await fetch(`https://docflow-server.cyclic.app/documents/${Id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, content }),
      });

      const updatedDocument = await response.json();
      setShowAlert(true);
      setTitle('');
      setContent('');
      setTimeout(() => {
        setShowAlert(false);
      }, 3000);
      setTimeout(() => {
        navigate('/documents')
      }, 3000);
    } catch (error) {
      console.error('Error updating document:', error);
    }
  };

  return (
    <>
      {showAlert && (
        <div style={{ position: "absolute", right: "1rem", marginTop: "1rem", backgroundColor: "#2563eb12", padding: "5px 10px", border: "1px solid #2563EB", borderRadius: "2px", fontWeight: "bold" }} severity="success" onClose={() => setShowAlert(false)}>
          Document Updated successfully!
        </div>
      )}

      <h1 className='mx-6 my-8' style={{ fontSize: "3rem", fontWeight: "bold", lineHeight: "1.8rem" }}>Edit your Documents <br /></h1>
      <div className='mx-5' style={{ border: "1px solid #E0E0E0", borderRadius: "2px" }}>
        <div className='my-5 mx-5' style={{ display: "flex", justifyContent: "space-between" }}>
          <input
            type="text"
            placeholder='Untitled document'
            style={{ backgroundColor: "#F5F5F5", border: "1px solid grey", borderRadius: "2px", padding: "2px 10px", outline: "none", minWidth: "40vw" }}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <button onClick={handleUpdateClick} style={{ backgroundColor: "#2563EE", color: "white", borderRadius: "2px", padding: "2px 10px", border: "1px solid gray" }}>Update</button>
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
};
export default Edit;
