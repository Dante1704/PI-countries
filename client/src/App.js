import './style/App.css';
import React from "react";
import { Route } from "react-router-dom";

import LandingPage from "./components/LandingPage";
import Home from "./components/Home";
import CountryDetail from './components/CountryDetail';
import ActivityForm from './components/ActivityForm';

function App() {

  return (
    <div className="App">
      <Route exact path="/" component={LandingPage} />
      <Route exact path="/home" component={Home} />
      <Route exact path="/activity" component={ActivityForm} />
      <Route exact path="/countries/:id" component={CountryDetail} /> {/* con este tipo de componente el id viaja directo a props de CountryDetail */}
    </div>
  );
}

export default App;
