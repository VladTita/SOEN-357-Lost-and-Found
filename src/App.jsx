import { useState } from "react";

export default function App() {
  const [page, setPage] = useState("login");
  const [selectedItem, setSelectedItem] = useState(null);

  const items = [
    { id: 1, name: "Calculator", location: "Library", image: "/assets/calc.jpg" },
    { id: 2, name: "Mouse", location: "EV Building", image: "/assets/mouse.jpg" },
    { id: 3, name: "Pencil Box", location: "Hall Building", image: "/assets/pencilbox.jpg" },
    { id: 4, name: "Pencil", location: "Classroom H-1025", image: "/assets/pencil.jpg" },
    { id: 5, name: "Bottle", location: "Gym", image: "/assets/bottle.jpg" },
    { id: 6, name: "iPhone", location: "Guy Metro", image: "/assets/iphone.jpg" },
    { id: 7, name: "Laptop", location: "LB Cafe", image: "/assets/laptop.jpg" },
    { id: 8, name: "Backpack", location: "MB Entrance", image: "/assets/backpack.jpg" },
  ];

  if (page === "login") {
    return (
      <div style={{ display: 'flex', height: '100vh', justifyContent: 'center', alignItems: 'center', backgroundColor: '#5A0B0B' }}>
        <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '1rem' }}>
          <input placeholder="Concordia Email" style={{ display: 'block', marginBottom: '1rem', width: '100%' }} />
          <input placeholder="Password" type="password" style={{ display: 'block', marginBottom: '1rem', width: '100%' }} />
          <button onClick={() => setPage("home")} style={{ width: '100%' }}>Login</button>
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
