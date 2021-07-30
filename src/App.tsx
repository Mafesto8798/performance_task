import React, { useEffect, useState } from "react";
import Main from "./ui/layout/Main";
import Navbar from "./ui/layout/Navbar";
import "@elastic/eui/dist/eui_theme_dark.css";

interface UserType {
  id: Number;
  first_name: String;
  last_name: String;
  email: String;
  verified: Boolean;
  middle_initial?: String;
  created_at: String;
  district: Number;
  active: Boolean;
}

const App: React.FC = () => {
  return (
    <div className="App">
      <Navbar />
      <Main />
    </div>
  );
};

export default App;
