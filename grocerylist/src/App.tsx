import React from 'react';
import "./App.scss"
import { Route, Link } from "react-router-dom"
import { Default, Products } from "./views"


const App = () => {
  return (
    <div className={"App"}>
      <Link to="/">Default</Link>
      <Link to="/products">Prodcuts</Link>
      <Route exact path="/" component={Default} />
      <Route path="/products" component={Products} />
    </div>
  )
}

export default App;
