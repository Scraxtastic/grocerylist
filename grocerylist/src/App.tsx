import React from 'react';
import "./App.scss"
import { Button } from "@material-ui/core"
import { Route , Link } from "react-router-dom"
import { Default, Products, Help } from "./views"

interface LinkRouteCollection {
  linkElements: JSX.Element[]
  routeElements: JSX.Element[]
};
interface IRoute{
  path: string;
  component: ()=>JSX.Element;
  linkText: string;
  exact?: boolean;
}

const App = () => {
const routes: IRoute[] = [
  { path: "/", component: Default, linkText: "Home", exact: true },
  { path: "/products", component: Products, linkText: "Products" },
  { path: "/help", component: Help, linkText: "Help" },
]
const linkRouteCollection: LinkRouteCollection = {
  linkElements: [],
  routeElements: [],
}
const {linkElements, routeElements} = createLinksAndRoutes(routes, linkRouteCollection);
  return (
    <div className={"App"}>
      <div key="Links">{linkElements}</div>
      <div key="Routes">{routeElements}</div>
    </div>
  )
}

export default App;


const createLinksAndRoutes = (
  routes: IRoute[],
  linkRouteCollection: LinkRouteCollection
) => {
  return routes.reduce((storage, route) => {
    storage.linkElements.push(
      <Link key={route.linkText} to={route.path}>
        <Button>{route.linkText}</Button>
      </Link>
    )
    storage.routeElements.push(
      route.exact ? (
        <Route
          key={route.linkText}
          exact
          path={route.path}
          component={route.component}
        />
      ) : (
        <Route
          key={route.linkText}
          path={route.path}
          component={route.component}
        />
      )
    )
    return storage
  }, linkRouteCollection)
}