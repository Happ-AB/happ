// src/App.tsx
import React from "react";
//import AddSnusLocation from './components/AddSnusLocation';
import MapView from "./components/MapView";
import NavBar from "./components/NavBar";

const App: React.FC = () => {
  return (
    <div>
      {/* <h1>Snus Location App</h1>
      <AddSnusLocation /> */}
      <NavBar />
      <MapView />
    </div>
  );
};

export default App;
