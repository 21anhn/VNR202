import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import ChatbotPage from "./pages/ChatbotPage";
import CaseStudyPage from "./pages/CaseStudyPage";
import Header from "./components/Header";
import Footer from "./components/Footer";
import QAPage from "./pages/QAPage";
import StoryGamePage from "./game/StoryGamePage";

function App() {
  return (
    <Router>
      <div className="min-h-screen w-full flex flex-col bg-[#f4f7ff]">
        <Header />
        <main className="flex-1 flex flex-col justify-center px-0 w-full pt-[70px]">
          <div className="w-full flex-1 flex flex-col">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/chatbot" element={<ChatbotPage />} />
              <Route path="/ai-usage" element={<CaseStudyPage />} />
              <Route path="/qa" element={<QAPage />} />
              <Route path="/game" element={<StoryGamePage />} />{" "}
              {/* <-- Thêm dòng này */}{" "}
            </Routes>
          </div>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
