import { useEffect, useState } from 'react';

function Admin() {
  const [submissions, setSubmissions] = useState([]);
  const [approved, setApproved] = useState([]);

  // ✅ Use correct base path depending on environment
  const basePath = window.location.hostname.includes('localhost')
    ? 'http://localhost:3001'
    : 'https://chance.chasingachance.com';

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const unapproved = await fetch(`${basePath}/api/unapproved`).then((res) => res.json());
    const approved = await fetch(`${basePath}/api/approved`).then((res) => res.json());
    setSubmissions(unapproved);
    setApproved(approved);
  };

  const approve = async (jsonFileName) => {
    const res = await fetch(`${basePath}/api/approve/${jsonFileName}`, {
      method: 'POST',
    });
    if (res.ok) {
      alert('Approved!');
      loadData();
    } else {
      alert('Error approving.');
    }
  };

  const unapprove = async (jsonFileName) => {
    const res = await fetch(`${basePath}/api/unapprove/${jsonFileName}`, {
      method: 'POST',
    });
    if (res.ok) {
      alert('Unapproved!');
      loadData();
    } else {
      alert('Error unapproving.');
    }
  };

  return (
    <div className='admin-main' style={{ padding: '2rem', fontFamily: 'Arial' }}>
      <h2>Unapproved Submissions</h2>
      {submissions.length === 0 && <p>No unapproved submissions.</p>}
      {submissions.map((s, i) => (
        <div
          key={i}
          style={{
            border: '1px solid #ccc',
            marginBottom: '1.5rem',
            padding: '1rem',
            borderRadius: '8px',
            background: '#f9f9f9',
          }}
        >
          {s.imageUrl && (
            <img
              src={`${basePath}${s.imageUrl}`}
              style={{ maxWidth: '300px', marginBottom: '1rem', display: 'block' }}
              alt='Unapproved dog submission'
            />
          )}
          <p style={{ whiteSpace: 'pre-wrap' }}>{s.story}</p>
          <button
            style={{
              marginTop: '1rem',
              padding: '0.5rem 1rem',
              cursor: 'pointer',
              background: '#2d572c',
              color: '#fff',
              border: 'none',
              borderRadius: '4px',
            }}
            onClick={() => approve(s.jsonFileName)}
          >
            Approve
          </button>
        </div>
      ))}

      <hr style={{ margin: '3rem 0' }} />

      <h2>Approved Submissions</h2>
      {approved.length === 0 && <p>No approved submissions yet.</p>}
      {approved.map((a, i) => (
        <div
          key={i}
          style={{
            border: '1px solid #ddd',
            marginBottom: '1.5rem',
            padding: '1rem',
            borderRadius: '8px',
            background: '#eafce9',
          }}
        >
          {a.imageUrl && (
            <img
              src={`${basePath}${a.imageUrl}`}
              style={{ maxWidth: '300px', marginBottom: '1rem', display: 'block' }}
              alt='Approved dog submission'
            />
          )}
          <p style={{ whiteSpace: 'pre-wrap' }}>{a.story}</p>
          <button
            style={{
              marginTop: '1rem',
              padding: '0.5rem 1rem',
              cursor: 'pointer',
              background: '#b02727',
              color: '#fff',
              border: 'none',
              borderRadius: '4px',
            }}
            onClick={() => unapprove(a.jsonFileName)}
          >
            Unapprove
          </button>
        </div>
      ))}
    </div>
  );
}

export default Admin;
