import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";  // BrowserRouterをインポート
import InputTestComponent from "./components/pages/InputTestComponent";

const App = () => {
  return (
    <Router>  {/* ここでBrowserRouterでラップ */}
      <div>
        <h1>React Router サンプル</h1>
        <Routes>
          <Route path="/input-test" element={<InputTestComponent />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
