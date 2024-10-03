import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "../src/pages/HomePage";

import LayoutLandingPage from "./Layouts/LayoutLanding";

const AppRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/*"
          element={
            <LayoutLandingPage>
              <Routes>
                <Route path="/" element={<HomePage />} />
              </Routes>
            </LayoutLandingPage>
          }
        />
      </Routes>
    </Router>
  );
};

export default AppRouter;
