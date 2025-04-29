import React, { useContext, useEffect, useRef } from "react";
import { GALLERY_DATA } from "../galleryData";
import Masonry from "masonry-layout";
import { ArtContext } from "../store/detail-art-context";
import { useNavigate } from "react-router-dom";
import imagesLoaded from "imagesloaded";

function Gallery() {
  const gridRef = useRef(null);
  const navigate = useNavigate();
  const { updateCurrSlide } = useContext(ArtContext);

  // useEffect(() => {
  //   const msnry = new Masonry(gridRef.current, {
  //     itemSelector: ".gallery-item",
  //     columnWidth: ".grid-sizer",
  //     percentPosition: true,
  //   });

  //   return () => msnry.destroy();
  // }, []);

  useEffect(() => {
    const grid = gridRef.current;

    // Wait for images to be loaded
    const imgLoad = imagesLoaded(grid, { background: true }, () => {
      const msnry = new Masonry(grid, {
        itemSelector: ".gallery-item",
        columnWidth: ".grid-sizer",
        percentPosition: true,
      });

      // Clean up
      return () => {
        msnry.destroy();
      };
    });

    // Clean up imagesLoaded listener if component unmounts before it finishes
    return () => {
      imgLoad.off?.("always");
    };
  }, []);

  function handleClick(selectedIndex) {
    updateCurrSlide(selectedIndex, "none");
    navigate("/detail");
  }

  return (
    <>
      <section ref={gridRef} className="gallery-container">
        <div className="grid-sizer"></div>
        {GALLERY_DATA.map((item, index) => {
          return (
            <article
              key={index}
              className="gallery-item"
              onClick={() => handleClick(index)}
            >
              <button className="item-container">
                <img
                  src={item.thumbnail}
                  alt={item.artName}
                  className="gallery-img"
                />
                <div className="art-meta">
                  <h2>{item.artName}</h2>
                  <p className="artist-name">{item.artistName}</p>
                </div>
              </button>
            </article>
          );
        })}
      </section>
    </>
  );
}

export default Gallery;
