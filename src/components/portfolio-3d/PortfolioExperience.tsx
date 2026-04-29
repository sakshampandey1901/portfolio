import HtmlOverlay from "./HtmlOverlay";
import SceneCanvas from "./SceneCanvas";

export default function PortfolioExperience() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-void">
      <SceneCanvas />
      <HtmlOverlay />
    </div>
  );
}
