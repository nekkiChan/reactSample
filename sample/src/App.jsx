import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";  // BrowserRouterをインポート
import InputTestComponent from "./components/pages/InputTestComponent";
import MuiTableComponent from "./components/pages/mui-table/MuiTableComponent";

const App = () => {
  return (
    <Router>  {/* ここでBrowserRouterでラップ */}
      <div>
        <h1>React Router サンプル</h1>
        <Routes>
          <Route path="/input-test" element={<InputTestComponent />} />
          <Route path="/mui-table" element={<MuiTableComponent />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
