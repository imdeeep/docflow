import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { authInstance } from '/src/firebase.js';
import { convert } from 'html-to-text';

const options = {
  wordwrap: 20,
};

const Documents = () => {
  const [userDocuments, setUserDocuments] = useState([]);
  const [user, setUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const unsubscribe = authInstance.onAuthStateChanged((authUser) => {
      setUser(authUser);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchUserDocuments = async () => {
      try {
        if (user) {
          const response = await fetch(`https://docflow-server.cyclic.app/documents/${user.email}`);
          const documents = await response.json();
          setUserDocuments(documents);
        }
      } catch (error) {
        console.error('Error fetching documents:', error);
      }
    };

    fetchUserDocuments();
  }, [user]);

  const handleDeleteClick = async (documentId) => {
    const isConfirmed = window.confirm("Are you sure to delete this document?");
    if (isConfirmed) {
      try {
        const response = await fetch(`https://docflow-server.cyclic.app/documents/${documentId}`, {
          method: 'DELETE',
        });
  
        if (response.ok) {
          handleDocumentDeleted(documentId);
        } else {
          console.error('Error deleting document:', response.statusText);
        }
      } catch (error) {
        console.error('Error deleting document:', error.message);
      }
    }
  };

  const handleDocumentDeleted = (documentId) => {
    setUserDocuments((prevDocuments) => prevDocuments.filter(doc => doc._id !== documentId));
    console.log('Document deleted successfully!');
    alert('Document Deleted Successfully !');
  };

  const filteredDocuments = userDocuments.filter(document =>
    document.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderDocument = (document) => (
    <div key={document._id} className="max-w-xs mx-2 my-2 p-4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-200 dark:border-gray-700">
      <Link to={`/edit?id=${document._id}`}>
        <h5 className="mb-0 text-2xl font-bold tracking-tight">{document.title}</h5>
      </Link>
      <p className='mb-1' style={{ fontSize: '0.7rem' }}><b>Date</b> : {document.createdAt} -<span className='ml-1'>{document.userId}</span></p>

      <p className="mb-5 text-sm">{(convert(document.content, options)).slice(0, 25)}...</p>

      <Link to={`/edit?id=${document._id}`} style={{ border: '1px solid #2563EB', borderRadius: '2px', color: '#2563EB', padding: '5px 10px' }}>
        Edit
      </Link>

      <button className="ml-3" style={{ border: '1px solid black', borderRadius: '2px', padding: '2px 10px' }} onClick={() => handleDeleteClick(document._id)}>
        Delete
      </button>
    </div>
  );

  return (
    <>
      <div className="flex justify-between items-center">
        <h1 className='mx-4 my-8' style={{ fontSize: '3rem', fontWeight: 'bold', lineHeight: '1.8rem' }}>Your Documents</h1>

        <div className="flex items-center mr-8">
          <input
            type="text"
            placeholder="Search..."
            className="border border-gray-300 px-2 py-1 rounded-md mr-2"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="bg-blue-500 text-white px-2 py-1 rounded-md">Search</button>
        </div>
      </div>

      <div className="alldocs mx-8" style={{ display: 'flex', justifyContent: 'flex-start', flexWrap: 'wrap' }}>
        {filteredDocuments.map(renderDocument)}
      </div>
    </>
  );
};

export default Documents;
