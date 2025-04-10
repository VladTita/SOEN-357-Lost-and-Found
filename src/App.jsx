import { useState } from "react";

export default function App() {
  const [page, setPage] = useState("welcome");
  const [selectedItem, setSelectedItem] = useState(null);
  const [location, setLocation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [proofFiles, setProofFiles] = useState([]);
  const [isUrgent, setIsUrgent] = useState(false);
  const [reportType, setReportType] = useState('lost');
  const [reportDetails, setReportDetails] = useState({ name: '', description: '', location: '', category: 'Electronics', contactInfo: '' });

  const categories = ['Electronics', 'Personal Items', 'Books', 'Clothing', 'Other'];

  const items = [
    { id: 1, name: "Calculator", location: "Library", image: "src/assets/calculator.png", category: "Electronics" },
    { id: 2, name: "Mouse", location: "EV Building", image: "src/assets/mouse.png", category: "Electronics" },
    { id: 3, name: "Pencil Box", location: "Hall Building", image: "src/assets/pencilbox.png", category: "Stationery" },
    { id: 4, name: "Pencil", location: "Classroom H-1025", image: "src/assets/pencil.png", category: "Stationery" },
    { id: 5, name: "Bottle", location: "Gym", image: "src/assets/bottle.png", category: "Personal Items" },
    { id: 6, name: "iPhone", location: "Guy Metro", image: "src/assets/iphone.png", category: "Electronics" },
    { id: 7, name: "Laptop", location: "LB Cafe", image: "src/assets/laptop.png", category: "Electronics" },
    { id: 8, name: "Backpack", location: "MB Entrance", image: "src/assets/backpack.png", category: "Personal Items" },
  ];

  if (page === "welcome") {
    return (
      <div style={{ display: 'flex', height: '100vh', justifyContent: 'center', alignItems: 'center', backgroundColor: '#5A0B0B' }}>
        <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '1rem', maxWidth: '400px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
          <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
            <h1 style={{ color: '#5A0B0B', fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>WELCOME TO CONCORDIA LOST & FOUND</h1>
            <img src="src/assets/concordia-logo.png" alt="Concordia University Logo" style={{ width: '200px', height: 'auto', margin: '1rem auto', display: 'block' }} />
          </div>
          <div style={{ backgroundColor: '#f8f9fa', padding: '1rem', borderRadius: '8px', marginBottom: '1rem' }}>
            <h3 style={{ color: '#5A0B0B', margin: '0 0 0.5rem 0' }}>Access Requirements</h3>
            <p>• Available exclusively for Concordia students and faculty/staff</p>
            <p>• Valid @concordia.ca email required for authentication</p>
            <p>• Your account must be active to access the system</p>
          </div>
          <button onClick={() => setPage("login")} style={{ width: '100%', padding: '0.75rem', backgroundColor: '#5A0B0B', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '1.1rem', fontWeight: '500', transition: 'background-color 0.2s' }}>Login with Concordia Account</button>
          <div style={{ marginTop: '1rem', textAlign: 'center', color: '#666' }}>
            <a href="/" style={{ color: '#5A0B0B', textDecoration: 'none', fontWeight: '500' }}> Contact Support</a>
          </div>
        </div>
      </div>
    );
  }

  if (page === "login") {
    return (
      <div style={{ display: 'flex', height: '100vh', justifyContent: 'center', alignItems: 'center', backgroundColor: '#5A0B0B' }}>
        <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '1rem', maxWidth: '400px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
          <img src="src/assets/concordia-logo.png" alt="Concordia University Logo" style={{ width: '200px', height: 'auto', margin: '0 auto 1rem', display: 'block' }} />
          <div style={{ marginBottom: '1rem' }}>
            <input type="email" placeholder="Your @concordia.ca email" style={{ display: 'block', width: '90%', padding: '0.75rem', border: '1px solid #ddd', borderRadius: '4px', fontSize: '1rem', transition: 'border-color 0.2s' }} />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <input type="password" placeholder="Password" style={{ display: 'block', width: '90%', padding: '0.75rem', border: '1px solid #ddd', borderRadius: '4px', fontSize: '1rem', transition: 'border-color 0.2s' }} />
          </div>
          <button onClick={() => setPage("home")} style={{ width: '100%', padding: '0.75rem', backgroundColor: '#5A0B0B', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '1.1rem', fontWeight: '500' }}>Login to Concordia Account</button>
          <div style={{ marginTop: '1rem', textAlign: 'center', color: '#666' }}>
            <p>Having trouble logging in? </p>
          </div>
        </div>
      </div>
    );
  }

  if (page === "home") {
    return (
      <div style={{ padding: '1rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <h1>CONCORDIA</h1>
          <button onClick={() => setPage("login")}>Logout</button>
        </div>
        <input placeholder="Search for items..." style={{ width: '100%', margin: '1rem 0' }} />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '1rem' }}>
          {items.map((item) => (
            <div key={item.id} onClick={() => { setSelectedItem(item); setPage("details"); }} style={{ border: '1px solid #ccc', borderRadius: '8px', cursor: 'pointer' }}>
              <img src={item.image} alt={item.name} style={{ width: '100%', height: '100px', objectFit: 'cover' }} />
              <div style={{ textAlign: 'center', padding: '0.5rem' }}>{item.name}</div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (page === "details" && selectedItem) {
    return (
      <div style={{ padding: '1rem' }}>
        <button onClick={() => setPage("home")} style={{ marginBottom: '1rem' }}>← Back</button>
        <h2>{selectedItem.name}</h2>
        <img src={selectedItem.image} alt={selectedItem.name} style={{ width: '100%', height: '200px', objectFit: 'cover', margin: '1rem 0' }} />
        <p><strong>Description:</strong> Lorem ipsum dolor sit amet...</p>
        <p><strong>Location:</strong> {selectedItem.location}</p>
        <img src="/assets/map_placeholder.png" alt="Map" style={{ width: '100%', height: '200px', objectFit: 'cover', margin: '1rem 0' }} />
        <div style={{ border: '1px solid #ddd', padding: '1rem' }}>
          <h3>Chat</h3>
          <div style={{ height: '100px', overflowY: 'auto', backgroundColor: '#eee', padding: '0.5rem', marginBottom: '0.5rem' }}>
            (Messages...)
          </div>
          <input placeholder="Type a message..." style={{ width: '100%' }} />
          </div>
      </div>
    );
  }

  return null;
}
