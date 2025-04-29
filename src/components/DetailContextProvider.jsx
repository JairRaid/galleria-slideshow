import React, { useReducer } from "react";
import { ArtContext } from "../store/detail-art-context";

export default function DetailContextProvider({ children }) {
  const [artworkState, artworkDispatch] = useReducer(artworkReducer, {
    selectedIndex: 0,
  });

  function handleUpdateArtworkCurrentSlide(index, btnTxt) {
    artworkDispatch({
      type: "UPDATE_SLIDE",
      payload: { artworkIndex: index, buttonPressed: btnTxt },
    });
  }

  const ctxValue = {
    artworkIndex: artworkState.selectedIndex,
    updateCurrSlide: handleUpdateArtworkCurrentSlide,
  };
  return (
    <>
      <ArtContext.Provider value={ctxValue}>{children}</ArtContext.Provider>
    </>
  );
}

function artworkReducer(state, action) {
  if (
    action.type === "UPDATE_SLIDE" &&
    action.payload.buttonPressed === "none"
  ) {
    const updatedIndex = action.payload.artworkIndex;
    return { selectedIndex: updatedIndex };
  }

  if (
    action.type === "UPDATE_SLIDE" &&
    action.payload.buttonPressed === "prev"
  ) {
    let updatedIndex = state.selectedIndex;
    updatedIndex -= 1;
    return { selectedIndex: updatedIndex };
  }

  if (
    action.type === "UPDATE_SLIDE" &&
    action.payload.buttonPressed === "next"
  ) {
    let updatedIndex = state.selectedIndex;
    updatedIndex += 1;
    return { selectedIndex: updatedIndex };
  }

  return state;
}
