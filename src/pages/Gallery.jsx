import React, { useEffect, useState, useRef } from "react";
import "../styles/Gallery.css";
import { ref, onValue } from "firebase/database";
import { db } from "../firebase";

function Gallery() {
  const [images, setImages] = useState([]);
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const [scale, setScale] = useState(1);

  const touchStartX = useRef(0);
  const lastTap = useRef(0);

  useEffect(() => {
    const galleryRef = ref(db, "gallery");

    onValue(galleryRef, (snapshot) => {
      const data = snapshot.val();

      if (data) {
        const list = Object.keys(data)
          .map((id) => ({ id, ...data[id] }))
          .sort((a, b) => b.timestamp - a.timestamp);

        setImages(list);
      } else setImages([]);
    });
  }, []);

  const openImage = (i) => {
    setIndex(i);
    setOpen(true);
    setScale(1);
  };

  const closeModal = () => {
    setOpen(false);
    setScale(1);
  };

  const nextImage = () => {
    setIndex((prev) => (prev + 1) % images.length);
    setScale(1);
  };

  const prevImage = () => {
    setIndex((prev) => (prev - 1 + images.length) % images.length);
    setScale(1);
  };

  // 🔥 Swipe support
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    const diff = e.changedTouches[0].clientX - touchStartX.current;

    if (diff > 50) prevImage();
    else if (diff < -50) nextImage();
  };

  // 🔥 Double click zoom
  const handleTapZoom = () => {
  const now = Date.now();
  const DOUBLE_TAP_DELAY = 280;

  if (now - lastTap.current < DOUBLE_TAP_DELAY) {
    setScale((s) => (s === 1 ? 2.5 : 1));
  }

  lastTap.current = now;
};

  return (
    <section className="gallery-section">

      <h2 className="gallery-title">Our Gallery</h2>

      <div className={`gallery-grid ${open ? "blur" : ""}`}>
        {images.map((img, i) => (
          <div
            key={img.id}
            className="gallery-item"
            onClick={() => openImage(i)}
          >
            <img src={img.image} className="gallery-img" />
          </div>
        ))}
      </div>

      {/* MODAL */}
      {open && images.length > 0 && (
        <div
          className="modal"
          onClick={closeModal}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >

          {/* CLOSE */}
          <div className="close" onClick={closeModal}>
            &times;
          </div>

          {/* PREV */}
          <button className="nav left" onClick={(e) => { e.stopPropagation(); prevImage(); }}>
            ‹
          </button>

          {/* NEXT */}
          <button className="nav right" onClick={(e) => { e.stopPropagation(); nextImage(); }}>
            ›
          </button>

          {/* IMAGE */}
          <img
            src={images[index].image}
            className="modal-img"
            style={{ transform: `scale(${scale})` }}
            onClick={(e) => {
            e.stopPropagation();
            handleTapZoom();
            }}
          />
        </div>
      )}
    </section>
  );
}

export default Gallery;