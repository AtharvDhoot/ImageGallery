import HeroContent from "./components/HeroContent";
import { NavBar } from "./components/NavBar";
import { useState } from "react";
import GalleryOrSearch from "./components/GalleryOrSearch";

function App() {
  const [searchQuery, setSearchQuery] = useState(null);
  return (
    <div>
      <NavBar onSearch={setSearchQuery} />
      {searchQuery ? null : <HeroContent onSearch={setSearchQuery} />}
      {searchQuery ? (
        <GalleryOrSearch mode="search" query={searchQuery} />
      ) : (
        <GalleryOrSearch mode="gallery" />
      )}
    </div>
  );
}

export default App;
