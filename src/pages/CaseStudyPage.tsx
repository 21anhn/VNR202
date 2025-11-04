import React from "react";
import ExampleAccordion from "../components/ExampleAccordion";

const CaseStudyPage: React.FC = () => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-[#f4f7ff] py-10 px-2">
    <div className="w-full max-w-2xl bg-white/90 rounded-2xl shadow-xl p-6 md:p-10">
      <ExampleAccordion />
    </div>
  </div>
);

export default CaseStudyPage;
