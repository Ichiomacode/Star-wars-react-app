/** @format */
import './App.css';
import CardList from './Components/CardList';
import React from "react";
import { Route, Routes } from "react-router-dom";
import More from "./Components/More";

function App() {
  return (
    <div>
      <Header className="header" />
      <main>
        <Routes>
          <Route path="/" element={<CardList />} />
          <Route path="/movie/:id" element={<More/>} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
