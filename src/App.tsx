import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import IntroPage from "./pages/IntroPage";
import QuizPage from "./pages/QuizPage";
import ChatbotPage from "./pages/ChatbotPage";
import CaseStudyPage from "./pages/CaseStudyPage";
import Header from "./components/Header";
import Footer from "./components/Footer";
import QAPage from "./pages/QAPage";

function App() {
  return (
    <Router>
      <div className="min-h-screen w-full flex flex-col bg-[#f4f7ff]">
        <Header />
        <main className="flex-1 flex flex-col justify-center px-0 w-full">
          <div className="w-full flex-1 flex flex-col">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/intro" element={<IntroPage />} />
              <Route path="/quiz" element={<QuizPage />} />
              <Route path="/chatbot" element={<ChatbotPage />} />
              <Route path="/ai-usage" element={<CaseStudyPage />} />
              <Route path="/qa" element={<QAPage />} />
            </Routes>
          </div>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
