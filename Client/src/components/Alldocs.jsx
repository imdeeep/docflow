import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { convert } from "html-to-text";

const options = {
  wordwrap: 20,
};

const Alldocs = () => {
  const [documents, setDocuments] = useState([]);
  const [searchInput, setSearchInput] = useState('');

  useEffect(() => {
    // Fetch documents from the API
    fetch('https://docflow-server.cyclic.app/documents')
      .then(response => response.json())
      .then(data => setDocuments(data))
      .catch(error => console.error('Error fetching documents:', error));
  }, []);

  // Filter documents based on the search input
  const filteredDocuments = documents.filter(document =>
    document.title.toLowerCase().includes(searchInput.toLowerCase())
  );

  return (
    <>
      <div className="flex justify-between items-center">
        <h1 className='mx-4 my-8' style={{ fontSize: "3rem", fontWeight: "bold", lineHeight: "1.8rem" }}>All Documents</h1>
        <div className="flex items-center mr-8">
          <input
            type="text"
            placeholder="Search..."
            className="border border-gray-300 px-2 py-1 rounded-md mr-2"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <button className="bg-blue-500 text-white px-2 py-1 rounded-md">Search</button>
        </div>
      </div>

      <div className="alldocs mx-8" style={{ display: "flex", justifyContent: "flex-start", flexWrap: "wrap" }}>
        {filteredDocuments.map(document => (
          <div key={document._id} className="max-w-xs mx-2 my-2 p-4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-200 dark:border-gray-700">
            <Link
              to={`/edit?id=${document._id}`}
            >
              <h5 className="mb-0 text-2xl font-bold tracking-tight">{document.title}</h5>
            </Link>
            <p className='mb-1' style={{ fontSize: "0.7rem" }}>
              <b>Date</b>: {new Date(document.createdAt).toLocaleDateString()} - <span className='ml-1'>{document.userId}</span>
            </p>
            <p className="mb-5 text-sm">{(convert(document.content, options)).slice(0,25)}...</p>

            <Link to={`/edit?id=${document._id}`} style={{ border: "1px solid #2563EB", borderRadius: "2px", color: "#2563EB", padding: "5px 10px" }}>
              Edit
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}

export default Alldocs;
