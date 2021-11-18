import React from "react";
import "./App.css";
import AppRouting from "./app.routing";
import DataProvider from "./Context/DataProvider";
function App() {
  return (
    <DataProvider>
      <AppRouting />
    </DataProvider>
  );
}

export default App;
