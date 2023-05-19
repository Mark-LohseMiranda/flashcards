import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

import Login from "./components/Users/Login";
import Signup from "./components/Users/Signup";
import Home from "./components/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import CardGroups from "./components/CardGroups/CardGroups";
import Cards from "./components/Cards/Cards";
import EditCards from "./components/Cards/EditCards";

function App() {
  const [user, setUser] = useState();
  const [cardGroups, setCardGroups] = useState();
  const [cards, setCards] = useState();
  const [cardGroupId, setCardGroupId] = useState();
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar user={user} setUser={setUser} />
        <Routes>
          <Route
            path="/signup"
            element={<Signup setUser={setUser} setCardGroups={setCardGroups} />}
          />
          <Route
            path="/login"
            element={<Login setUser={setUser} setCardGroups={setCardGroups} />}
          />
          <Route
            path="/cardgroups"
            element={
              <CardGroups
                user={user}
                cardGroups={cardGroups}
                setCardGroups={setCardGroups}
                setCards={setCards}
                setCardGroupId={setCardGroupId}
              />
            }
          />
          <Route
            path="/cards"
            element={
              <Cards
                cards={cards}
                setCards={setCards}
              />
            }
          />
          <Route
            path="/editcards"
            element={<EditCards cards={cards} setCards={setCards} cardGroupId={cardGroupId} setCardGroups={setCardGroups}/>}
          />
          <Route path="/*" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
