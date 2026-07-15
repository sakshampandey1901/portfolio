import { useState } from 'react';
import VideoStage from './components/VideoStage';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import PhotoToggle from './components/PhotoToggle';
import TvOverlay from './components/TvOverlay';
import type { SectionId } from './data/sections';

const PHOTO_STORAGE_KEY = 'tv-photo-mode';

function readStoredPhotoMode(): boolean {
  // Default ON: the first impression must be Saksham's portfolio.
  try {
    return localStorage.getItem(PHOTO_STORAGE_KEY) !== 'off';
  } catch {
    return true;
  }
}

export default function App() {
  const [activeSection, setActiveSection] = useState<SectionId | null>(null);
  const [photoOn, setPhotoOn] = useState(readStoredPhotoMode);
  const focused = activeSection !== null;

  const setPhotoMode = (on: boolean) => {
    setPhotoOn(on);
    try {
      localStorage.setItem(PHOTO_STORAGE_KEY, on ? 'on' : 'off');
    } catch {
      // Storage can be blocked (private browsing); the preference just won't persist.
    }
  };

  return (
    <>
      <VideoStage focused={focused} photoVisible={photoOn} />
      <Navbar hidden={focused} />
      <Hero hidden={focused} onSelectSection={setActiveSection} />
      <PhotoToggle on={photoOn} onChange={setPhotoMode} hidden={focused} />
      <TvOverlay
        activeSection={activeSection}
        onSelectSection={setActiveSection}
        onExit={() => setActiveSection(null)}
      />
    </>
  );
}
