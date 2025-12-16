import { useState } from "react";

import HomeDashboard from "./screens/HomeDashboard";
import HeartMonitor from "./screens/HeartMonitor";
import LungMonitor from "./screens/LungMonitor";
import RecordingSession from "./screens/RecordingSession";


type Screen =
  | "home"
  | "heart"
  | "lung"
  | "recording";

export default function App() {
  const [screen, setScreen] = useState<Screen>("home");

  switch (screen) {
    case "heart":
      return <HeartMonitor onBack={() => setScreen("home")} />;
    case "lung":
      return <LungMonitor onBack={() => setScreen("home")} />;
    case "recording":
      return <RecordingSession onBack={() => setScreen("home")} />;
    default:
      return <HomeDashboard onNavigate={setScreen} />;
  }
}
