import { createContext } from "react";

export const ArtContext = createContext({
  artworkIndex: null,
  updateCurrSlide: () => {},
});
