import { useContext, useEffect, useRef, useState } from "react";
import Header from "../components/Header";
import { Link } from "react-router-dom";
import { ArtContext } from "../store/detail-art-context";
import { GALLERY_DATA } from "../galleryData";
import ProgressBar from "../components/ProgressBar";
import ImageModal from "../components/ImageModal";
import { motion } from "framer-motion";

function Detail() {
  const { artworkIndex, updateCurrSlide } = useContext(ArtContext);
  const [progress, setProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const progressInterval = useRef(null);
  const interval = 100; // millisecond
  const duration = (10 * 1000) / interval; // 10 second * 1000 / interval
  const dialogRef = useRef();

  const {
    artistImage,
    heroLarge,
    heroSmall,
    artistName,
    artName,
    gallery,
    description,
    creationDate,
  } = GALLERY_DATA[artworkIndex];

  useEffect(() => {
    if (isPlaying) {
      progressInterval.current = setInterval(() => {
        setProgress((prev) => (prev < duration ? prev + 1 : duration));
      }, interval);
    } else {
      clearInterval(progressInterval.current);
    }

    return () => {
      console.log("progress nettoyage effect run");
      clearInterval(progressInterval.current);
    };
  }, [isPlaying, duration]);

  useEffect(() => {
    if (progress === duration) {
      if (artworkIndex < GALLERY_DATA.length - 1) {
        updateCurrSlide(0, "next");
        setProgress(0);
      }
    }
  }, [progress, artworkIndex, duration, updateCurrSlide]);

  function handleViewImage() {
    const dialog = dialogRef.current;
    if (!dialog) return;
    console.log("dialog exist");
    if (dialog.open) {
      dialog.close();
    } else {
      dialog.showModal();
    }
  }

  function handleSlide(btnTxt) {
    updateCurrSlide(0, btnTxt);
    setProgress(0);
  }

  function handlePlayPause() {
    if (artworkIndex < GALLERY_DATA.length - 1) {
      setIsPlaying((prev) => !prev);
    }

    if (artworkIndex === GALLERY_DATA.length - 1) {
      updateCurrSlide(0, "none");
      setIsPlaying(true);
    }
  }

  if (artworkIndex === GALLERY_DATA.length - 1 && isPlaying) {
    setIsPlaying(false);
  }

  return (
    <>
      <ImageModal ref={dialogRef} gallery={gallery} artName={artName} />
      <Header isPlaying={isPlaying} onPlayPause={handlePlayPause} />
      <hr />
      <motion.main
        className="detail-page"
        key={artworkIndex}
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <section className="detail-container">
          <div className="artwork-card">
            <figure className="artwork-container">
              <picture>
                <source srcSet={heroLarge} media="(min-width: 48rem)" />
                <source srcSet={heroSmall} media="(max-width: 47.9375rem)" />
                <img src={heroSmall} alt={artName} className="art-image" />
              </picture>
              <figcaption className="view-button-container">
                <button className="view-btn" onClick={handleViewImage}>
                  VIEW IMAGE
                </button>
              </figcaption>
              <div className="art-image-desktop">
                <img
                  src={artistImage}
                  alt={artistName}
                  className="artist-image"
                />
              </div>
            </figure>
            <div className="art-meta">
              <h2>{artName}</h2>
              <p className="artist-name">{artistName}</p>
              <figure className="artist-image-container">
                <img
                  src={artistImage}
                  alt={artistName}
                  className="artist-image"
                />
              </figure>
            </div>
          </div>

          <article>
            <p className="description">
              <span className="creation-date">{creationDate}</span>
              {description}
            </p>

            <div className="link-container">
              <Link to="/">GO TO SOURCE</Link>
            </div>
          </article>
        </section>
      </motion.main>

      <footer className="detail-footer">
        <ProgressBar progress={progress} duration={duration} />
        <section className="footer-container">
          <div className="artwork-info">
            <h3>{artName}</h3>
            <p>{artistName}</p>
          </div>
          <nav className="footer-nav">
            <button
              aria-label="Previous Artwork"
              onClick={() => handleSlide("prev")}
              disabled={artworkIndex === 0 ? true : false}
            >
              <img
                src="assets/shared/icon-back-button.svg"
                alt="previous icon"
              />
            </button>
            <button
              aria-label="Next Artwork"
              onClick={() => handleSlide("next")}
              disabled={artworkIndex === GALLERY_DATA.length - 1 ? true : false}
            >
              <img
                src="assets/shared/icon-next-button.svg"
                alt="previous icon"
              />
            </button>
          </nav>
        </section>
      </footer>
    </>
  );
}

export default Detail;
