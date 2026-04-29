import HtmlOverlay from "./HtmlOverlay";
import SceneCanvas from "./SceneCanvas";

export default function PortfolioExperience() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-alabaster">
      <div className="fixed inset-0 z-0 bg-[radial-gradient(circle_at_20%_20%,rgba(192,87,70,0.16),transparent_30%),radial-gradient(circle_at_78%_28%,rgba(74,111,165,0.18),transparent_28%),linear-gradient(135deg,#f7f5f0_0%,#ebe4d8_100%)]" />
      <SceneCanvas />
      <HtmlOverlay />
    </div>
  );
}
