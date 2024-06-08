import React, { useState, useEffect } from 'react';

const Logs = () => {
  const [logs, setLogs] = useState([]);
  useEffect(() => {
    fetch('https://docflow-server.cyclic.app/logs')
      .then(response => response.json())
      .then(data => setLogs(data))
      .catch(error => console.error('Error fetching logs:', error));
  }, []);

  return (
    <>
      <h1 className='mx-6 my-8' style={{ fontSize: '3rem', fontWeight: 'bold', lineHeight: '1.8rem' }}>All Logs</h1>
      <div className="border mx-10 border-gray-300 overflow-auto" style={{ height: '60vh', borderRadius: '2px' }}>
        {logs.map(log => (
          <p key={log._id} className='mx-2'>
            Last Document: {log.title}{' '}
            <span style={{ color: log.action === 'delete' ? 'red' : (log.action === 'edit' ? 'green' : (log.action === 'update' ? 'green' : 'blue')) }}>
              {log.action}
            </span> by {log.userId}. [ Date: {new Date(log.timestamp).toLocaleString()} ]
          </p>
        ))}
      </div>
    </>
  );
};

export default Logs;
