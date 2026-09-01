import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import ScrollToTop from "./components/ScrollToTop";
import HomePage from "./pages/HomePage";
import PhasesPage from "./pages/PhasesPage";
import SelfEnumerationPage from "./pages/SelfEnumerationPage";
import PrivacyPage from "./pages/PrivacyPage";
import SchedulePage from "./pages/SchedulePage";
import AssistantPage from "./pages/AssistantPage";

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/phases" element={<PhasesPage />} />
          <Route path="/self-enumeration" element={<SelfEnumerationPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/schedule" element={<SchedulePage />} />
          <Route path="/assistant" element={<AssistantPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;