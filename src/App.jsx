import { useState } from "react";

export default function App() {
  const [page, setPage] = useState("welcome");
  const [selectedItem, setSelectedItem] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [newItem, setNewItem] = useState({ name: "", location: "", category: "Electronics", image: "" });
  const [items, setItems] = useState([
    { id: 1, name: "Calculator", location: "Library", image: "src/assets/calculator.png", category: "Electronics", x: 30, y: 40 },
    { id: 2, name: "Mouse", location: "EV Building", image: "src/assets/mouse.png", category: "Electronics", x: 60, y: 80 },
    { id: 3, name: "Pencil Box", location: "Hall Building", image: "src/assets/pencilbox.png", category: "Stationery", x: 40, y: 60 },
    { id: 4, name: "Pencil", location: "Classroom H-1025", image: "src/assets/pencil.png", category: "Stationery", x: 70, y: 20 },
    { id: 5, name: "Bottle", location: "Gym", image: "src/assets/bottle.png", category: "Personal Items", x: 50, y: 50 },
    { id: 6, name: "iPhone", location: "Guy Metro", image: "src/assets/iphone.png", category: "Electronics", x: 20, y: 30 },
    { id: 7, name: "Laptop", location: "LB Cafe", image: "src/assets/laptop.png", category: "Electronics", x: 10, y: 70 },
    { id: 8, name: "Backpack", location: "MB Entrance", image: "src/assets/backpack.png", category: "Personal Items", x: 80, y: 90 },
  ]);
  const [messages, setMessages] = useState([
    { sender: "founder", text: "Hey! I found your item." },
    { sender: "you", text: "Thanks! Where can I get it?" }
  ]);
  const [newMessage, setNewMessage] = useState("");
  
  const categories = {
    Electronics: "💻",
    "Personal Items": "🎒",
    Stationery: "✏️",
    Books: "📚",
    Clothing: "👕",
    Other: "❓",
  };

  const emojiColors = {
    Electronics: "#FF5733",
    "Personal Items": "#33C3FF",
    Stationery: "#33FF8A",
    Books: "#FFD700",
    Clothing: "#C700FF",
    Other: "#777",
  };

  const openModal = (item) => {
    setSelectedItem(item);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedItem(null);
  };

  const renderModal = () => {
    if (!selectedItem) return null;
    return (
      <div style={{
        position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
        backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex',
        justifyContent: 'center', alignItems: 'center', zIndex: 10
      }}>
        <div style={{
          background: 'white', padding: '1rem', borderRadius: '8px',
          width: '90%', maxWidth: '400px', position: 'relative'
        }}>
          <button onClick={closeModal} style={{ position: 'absolute', top: 10, right: 10, border: 'none', background: 'none', fontSize: '1.5rem', cursor: 'pointer' }}>×</button>
          <h2>{selectedItem.name}</h2>
          <img src={selectedItem.image} alt={selectedItem.name} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
          <p><strong>Location:</strong> {selectedItem.location}</p>
          <p><strong>Category:</strong> {selectedItem.category}</p>
          <button style={{
            marginTop: '1rem', backgroundColor: '#5A0B0B', color: 'white',
            border: 'none', padding: '0.5rem 1rem', borderRadius: '4px', cursor: 'pointer'
          }}>💬 Chat</button>
        </div>
      </div>
    );
  };

  const handleNewItemChange = (e) => {
    const { name, value } = e.target;
    setNewItem({ ...newItem, [name]: value });
  };

  const handleAddItem = () => {
    const newItemToAdd = { ...newItem, id: items.length + 1, x: Math.random() * 100, y: Math.random() * 100 };
    setItems([...items, newItemToAdd]);
    setNewItem({ name: "", location: "", category: "Electronics", image: "" }); // Reset form
    setPage("home");
  };

  const handleReportLostClick = () => {
    setPage("reportLost");
  };

  const handleMapClick = (e) => {
    // Get the clicked position and add a new marker
    const x = e.clientX;
    const y = e.clientY;
    setItems([
      ...items,
      { id: items.length + 1, name: "New Item", location: "Unknown", x, y, category: "Other", image: "src/assets/placeholder.png" },
    ]);
  };

  const renderMapView = () => {
    return (
      <div style={{ height: '100vh', position: 'relative' }}>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2881.2961191675744!2d-73.5806!3d45.4951!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4cc91ac522fe25bb%3A0xa57a6ff3a8e4ff9b!2sConcordia%20University!5e0!3m2!1sen!2sca!4v1617640191409!5m2!1sen!2sca"
          width="100%"
          height="100%"
          style={{
            border: '0',
            position: 'absolute',
            top: '0',
            left: '0',
          }}
          allowFullScreen
          loading="lazy"
        ></iframe>
  
        {items.map((item) => (
          <div
            key={item.id}
            style={{
              position: 'absolute',
              left: `${item.x}%`,
              top: `${item.y}%`,
              cursor: 'pointer',
            }}
            onClick={() => openModal(item)}
          >
            <img
              src={item.image}
              alt={item.name}
              style={{ width: '50px', height: '50px', objectFit: 'cover' }}
            />
          </div>
        ))}
  
        {/* Back Button */}
        <button
          onClick={() => setPage("home")}
          style={{
            position: 'absolute',
            top: '20px',
            left: '20px',
            backgroundColor: '#5A0B0B',
            color: 'white',
            border: 'none',
            padding: '0.5rem 1rem',
            borderRadius: '4px',
            cursor: 'pointer',
            zIndex: 5,
          }}
        >
          Back
        </button>
  
        {/* 💬 Popup Modal with Chat Button */}
        {renderModal()}
      </div>
    );
  };
  
  
  
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
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
          <h1>CONCORDIA LOST & FOUND</h1>
          <button onClick={() => setPage("login")} style={{
            backgroundColor: '#5A0B0B', color: 'white', padding: '0.5rem 1rem',
            border: 'none', borderRadius: '10px', cursor: 'pointer'
          }}>Logout</button>
        </div>

        <input placeholder="Search for items..." style={{ width: '100%', margin: '1rem 0' }} />
        <button onClick={() => setPage("map")} style={{
          backgroundColor: '#5A0B0B', color: 'white', padding: '0.5rem 1rem',
          border: 'none', borderRadius: '10px', cursor: 'pointer', marginBottom: '1rem', margin:'1rem'
        }}>Map View</button>

        <button onClick={handleReportLostClick} style={{
          backgroundColor: '#5A0B0B', color: 'white', padding: '0.5rem 1rem',
          border: 'none', borderRadius: '10px', cursor: 'pointer', marginBottom: '1rem', margin:'1rem'
        }}>Report Item as Lost</button>

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

  if (page === "map") {
    return renderMapView();
  }

  if (page === "reportLost") {
    return (
      <div style={{ padding: '1rem' }}>
        <h1>Report Item as Lost</h1>
        <input
          type="text"
          name="name"
          placeholder="Item Name"
          value={newItem.name}
          onChange={handleNewItemChange}
          style={{ width: '100%', marginBottom: '1rem', padding: '0.75rem', border: '1px solid #ccc', borderRadius: '4px' }}
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={newItem.location}
          onChange={handleNewItemChange}
          style={{ width: '100%', marginBottom: '1rem', padding: '0.75rem', border: '1px solid #ccc', borderRadius: '4px' }}
        />
        <select
          name="category"
          value={newItem.category}
          onChange={handleNewItemChange}
          style={{ width: '100%', marginBottom: '1rem', padding: '0.75rem', border: '1px solid #ccc', borderRadius: '4px' }}
        >
          <option value="Electronics">Electronics</option>
          <option value="Personal Items">Personal Items</option>
          <option value="Stationery">Stationery</option>
          <option value="Books">Books</option>
          <option value="Clothing">Clothing</option>
          <option value="Other">Other</option>
        </select>
        <input
          type="file"
          name="image"
          onChange={(e) => setNewItem({ ...newItem, image: URL.createObjectURL(e.target.files[0]) })}
          style={{ width: '100%', marginBottom: '1rem', padding: '0.75rem', border: '1px solid #ccc', borderRadius: '4px' }}
        />
        <button onClick={handleAddItem} style={{ width: '100%', padding: '0.75rem', backgroundColor: '#5A0B0B', color: 'white', border: 'none', borderRadius: '4px' }}>Add Item</button>
        <button onClick={() => setPage("home")} style={{ width: '100%', padding: '0.75rem', backgroundColor: '#ccc', color: 'black', border: 'none', borderRadius: '4px', marginTop: '1rem' }}>Cancel</button>
      </div>
    );
  }
  if (page === "details" && selectedItem) {
    return (
      <div style={{ padding: '1rem' }}>
        <button onClick={() => setPage("home")} style={{ marginBottom: '1rem' }}>← Back</button>
        <h2>{selectedItem.name}</h2>
        <img src={selectedItem.image} alt={selectedItem.name} style={{ width: '100%', height: '200px', objectFit: 'cover', margin: '1rem 0' }} />
        <p><strong>Description:</strong> This item is ...</p>
        <p><strong>Location:</strong> {selectedItem.location}</p>
        <img src="/assets/map_placeholder.png" alt="Map" style={{ width: '100%', height: '200px', objectFit: 'cover', margin: '1rem 0' }} />
        <div style={{ border: '1px solid #ddd', padding: '1rem' }}>
          <h3>Chat</h3>
          <div style={{ height: '100px', overflowY: 'auto', backgroundColor: '#eee', padding: '0.5rem', marginBottom: '0.5rem' }}>
            {messages.map((msg, idx) => (
              <div key={idx} style={{ textAlign: msg.sender === "you" ? "right" : "left", marginBottom: '0.5rem' }}>
                <span style={{
                  backgroundColor: msg.sender === "you" ? "#5A0B0B" : "#e0e0e0",
                  color: msg.sender === "you" ? "white" : "black",
                  padding: "0.5rem 1rem",
                  borderRadius: "20px",
                  display: "inline-block",
                  maxWidth: "70%"
                }}>
                  {msg.text}
                </span>
              </div>
            ))}
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (newMessage.trim() === "") return;
              setMessages([...messages, { sender: "you", text: newMessage }]);
              setNewMessage("");
            }}
            style={{ display: "flex", gap: "0.5rem", marginTop: "0.5rem" }}
          >
            <input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a message..."
              style={{ flex: 1, padding: "0.5rem", borderRadius: "8px", border: "1px solid #ccc" }}
            />
            <button type="submit" style={{ backgroundColor: "#5A0B0B", color: "white", border: "none", borderRadius: "8px", padding: "0 1rem" }}>
              Send
            </button>
          </form>
        </div>

      </div>
    );
  }

  return null;
}
