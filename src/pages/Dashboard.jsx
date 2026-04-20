import { useEffect, useState, useRef } from "react";
import "../styles/Admin.css";

import { db, auth } from "../firebase";
import { ref, onValue, remove, push, set } from "firebase/database";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { FaUser, FaImages, FaEnvelope, FaPaperPlane } from "react-icons/fa";

function Dashboard() {
  const [dragActive, setDragActive] = useState(false);
  
  const [selectedMessage, setSelectedMessage] = useState(null);
  
  const [showModal, setShowModal] = useState(false);
  const [user, setUser] = useState(null);
  const [profileImage, setProfileImage] = useState(null);

  const [active, setActive] = useState("gallery");
  const [gallery, setGallery] = useState([]);
  const [messages, setMessages] = useState([]);

  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const fileInputRef = useRef();
  const navigate = useNavigate();

  const handleDrag = (e) => {
  e.preventDefault();
  e.stopPropagation();

  if (e.type === "dragenter" || e.type === "dragover") {
    setDragActive(true);
  } else if (e.type === "dragleave") {
    setDragActive(false);
  }
};

const handleDrop = (e) => {
  e.preventDefault();
  e.stopPropagation();
  setDragActive(false);

  const file = e.dataTransfer.files[0];
  if (file) handleFileChange(file);
};

  // 🔐 Auth + Profile
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) return navigate("/admin-login");

      setUser(currentUser);

      onValue(ref(db, "users/" + currentUser.uid), (snap) => {
        setProfileImage(snap.val()?.profileImage || null);
      });
    });

    return () => unsubscribe();
  }, [navigate]);

  // 📥 Gallery
  useEffect(() => {
  const galleryRef = ref(db, "gallery");

  const unsubscribe = onValue(galleryRef, (snapshot) => {
    const data = snapshot.val();

    if (!data) {
      setGallery([]);
      return;
    }

    const images = Object.entries(data).map(([id, value]) => ({
      id,
      ...value,
    }));

    setGallery(images);
  });

  return () => unsubscribe();
}, []);

  // 📥 Messages
  useEffect(() => {
    onValue(ref(db, "messages"), (snap) => {
      const data = snap.val() || {};
      setMessages(Object.keys(data).map((id) => ({ id, ...data[id] })));
    });
  }, []);

  // 📸 Preview
  const handleFileChange = (file) => {
    setFile(file);
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result);
    reader.readAsDataURL(file);
  };

  // 📤 Upload Image
  const handleUpload = () => {
  if (!file) return alert("Select Image");

  const reader = new FileReader();

  reader.onloadend = async () => {
    await push(ref(db, "gallery"), {
      image: reader.result,
      timestamp: Date.now(),
    });

    // ✅ Clear everything properly
    setFile(null);
    setPreview(null);
    fileInputRef.current.value = ""; // 🔥 IMPORTANT FIX

    Swal.fire("Success", "Image Uploaded", "success");
  };

  reader.readAsDataURL(file);
};

  // 👤 Profile Upload
  const handleProfileUpload = (file) => {
  if (!file || !user) return;

  const reader = new FileReader();
  reader.onloadend = async () => {
    await set(ref(db, "users/" + user.uid), {
      email: user.email,
      profileImage: reader.result,
    });

    setProfileImage(reader.result);

    Swal.fire({
      title: "Success",
      text: "Profile Updated",
      icon: "success",
      confirmButtonText: "OK"
    }).then(() => {
  setShowModal(false);
});
  };

  reader.readAsDataURL(file);
};

  // ❌ Delete Functions
  const deleteImage = async (id) => {
  console.log("Clicked delete for:", id); // ✅ debug

  if (!id) {
    alert("ID missing!");
    return;
  }

  try {
    const confirm = await Swal.fire({
      title: "Delete Image?",
      text: "This cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      await remove(ref(db, "gallery/" + id));

      // ✅ Instant UI update
      setGallery((prev) => prev.filter((img) => img.id !== id));

      Swal.fire("Deleted!", "Image removed", "success");
    }
  } catch (err) {
    console.error(err);
    Swal.fire("Error", "Delete failed", "error");
  }
};

  const deleteMessage = async (id) => {
    const res = await Swal.fire({ title: "Delete Message?", icon: "warning", showCancelButton: true });
    if (res.isConfirmed) {
      await remove(ref(db, "messages/" + id));
      Swal.fire("Deleted!", "Message removed", "success");
    }
  };

  const handleDeleteProfile = async () => {
    const res = await Swal.fire({ title: "Remove Profile?", icon: "warning", showCancelButton: true });
    if (res.isConfirmed && user) {
      await set(ref(db, "users/" + user.uid), {
        email: user.email,
        profileImage: null,
      });
      setProfileImage(null);
    }
  };

  // 🔓 Logout
  const handleLogout = async () => {
    await signOut(auth);
    navigate("/admin-login");
  };

  return (
    <div className="admin-container">

      {/* SIDEBAR */}
      <div className="sidebar">
  <button
    onClick={() => setActive("gallery")}
    className={active === "gallery" ? "active" : ""}
  >
    <FaImages className="icon" />
    <span>Gallery</span>
  </button>

  <button
    onClick={() => setActive("messages")}
    className={active === "messages" ? "active" : ""}
  >
    <FaEnvelope className="icon" />
    <span>Messages</span>
  </button>
</div>

      {/* CONTENT */}
      <div className="content">

        {/* NAVBAR */}
        <div className="top-navbar">

          {/* MODAL */}
          {showModal && (
            <div className="modal-overlay" onClick={() => setShowModal(false)}>
              <div className="modal-box" onClick={(e) => e.stopPropagation()}>

                <div className="modal-header">
                  <h3>Profile Photo</h3>
                  <span onClick={() => setShowModal(false)}>✖</span>
                </div>

                <div className="modal-image">
                  {profileImage ? <img src={profileImage} alt="" /> : <FaUser />}
                </div>

                <div className="modal-actions">
                  <button onClick={() => fileInputRef.current.click()}>✏️ Edit</button>
                  <button onClick={() => fileInputRef.current.click()}>📷 Update</button>
                  {profileImage && (
                    <button className="delete-btn" onClick={handleDeleteProfile}>
                      🗑 Delete
                    </button>
                  )}
                </div>

              </div>
            </div>
          )}

          {/* PROFILE */}
          <div className="profile">
            <div className="profile-img clickable" onClick={() => setShowModal(true)}>
              {profileImage ? <img src={profileImage} alt="" /> : <FaUser />}
            </div>

            <input
              type="file"
              ref={fileInputRef}
              hidden
              onChange={(e) => handleProfileUpload(e.target.files[0])}
            />

            <div className="profile-info">
              <p className="username">{user?.email}</p>
              <span className="role">Admin</span>
            </div>
          </div>

          <button className="logout-btn" onClick={handleLogout}>Logout</button>
        </div>

        {/* GALLERY */}
        {active === "gallery" && (
          <>
            <div
  className={`card-box drop-zone ${dragActive ? "active-drop" : ""}`}
  onDragEnter={handleDrag}
  onDragLeave={handleDrag}
  onDragOver={handleDrag}
  onDrop={handleDrop}
>
  <h3>Upload Image</h3>

  <p>Drag & Drop image here OR</p>

  <button onClick={() => fileInputRef.current.click()}>
    Choose File
  </button>

  <input
    type="file"
    ref={fileInputRef}
    hidden
    onChange={(e) => handleFileChange(e.target.files[0])}
  />

  {preview && file && (
    <>
      <img src={preview} alt="" className="preview" />
      <div className="btn-group">
        <button onClick={handleUpload}>Upload</button>
        <button
          className="cancel"
          onClick={() => {
            setFile(null);
            setPreview(null);
          }}
        >
          Cancel
        </button>
      </div>
    </>
  )}
</div>

            <div className="grid">
  {gallery.map((img) => {
    console.log("Rendering ID:", img.id); // ✅ DEBUG

    return (
      <div className="card" key={img.id}>
        <img src={img.image} alt="" />

        <button
          onClick={(e) => {
            e.stopPropagation(); // ✅ prevents UI block
            deleteImage(img.id);
          }}
        >
          Delete
        </button>
      </div>
    );
  })}
</div>
          </>
        )}

        {/* MESSAGES */}
{active === "messages" && (
  <div className="wa-container">

    {/* LEFT SIDE (CHAT LIST) */}
    <div className={`wa-sidebar ${selectedMessage ? "hide-mobile" : ""}`}>
      <div className="wa-header">Chats</div>

      {messages.map((msg) => (
        <div
          key={msg.id}
          className={`wa-chat-item ${selectedMessage?.id === msg.id ? "active" : ""}`}
          onClick={() => setSelectedMessage(msg)}
        >
          <div className="wa-avatar">👤</div>
          <div className="wa-chat-info">
            <h4>{msg.name}</h4>
            <p>{msg.message.slice(0, 25)}...</p>
          </div>
        </div>
      ))}
    </div>

    {/* RIGHT SIDE (CHAT WINDOW) */}
    <div className={`wa-chat ${selectedMessage ? "show" : ""}`}>

      {selectedMessage ? (
        <>
          {/* HEADER */}
          <div className="wa-chat-header">
            <button className="back-btn" onClick={() => setSelectedMessage(null)}>⬅</button>
            <div>
              <h4>{selectedMessage.name}</h4>
              <span>{selectedMessage.phone}</span>
            </div>
          </div>

          {/* BODY */}
          <div className="wa-chat-body">
            <div className="wa-message received">
              {selectedMessage.message}
            </div>
          </div>

          {/* FOOTER (Input UI like WhatsApp) */}
          <div className="wa-chat-footer">
  <input type="text" placeholder="Type a message..." />
  
  <button className="send-btn">
    <FaPaperPlane />
  </button>
</div>

          {/* DELETE */}
          <button
            className="delete-chat"
            onClick={() => deleteMessage(selectedMessage.id)}
          >
            Delete Chat
          </button>
        </>
      ) :  null}
    </div>

  </div>
)}

      </div>
    </div>
  );
}

export default Dashboard;