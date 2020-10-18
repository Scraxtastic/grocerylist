import React from "react"
import "./App.scss"
import { Button } from "@material-ui/core"
import { Route, Link } from "react-router-dom"
import { Default, Products, Help, ActiveList } from "./views"

interface LinkRouteCollection {
  linkElements: JSX.Element[]
  routeElements: JSX.Element[]
}
interface IRoute {
  key: string
  path: string
  component: () => JSX.Element
  linkText?: string
  exact?: boolean
}

const prefix = "sgl | "
const App = () => {
  document.title = prefix + "Scrax's grocery list"
  const routes: IRoute[] = [
    {
      key: "home",
      path: "/",
      component: Default,
      linkText: "Home",
      exact: true,
    },
    {
      key: "activelist",
      path: "/activelist",
      component: ActiveList,
      linkText: "Active List",
    },
    {
      key: "products",
      path: "/products",
      component: Products,
      linkText: "Products",
    },
    { key: "help", path: "/help", component: Help, linkText: "Help" },
  ]
  const linkRouteCollection: LinkRouteCollection = {
    linkElements: [],
    routeElements: [],
  }
  const { linkElements, routeElements } = createLinksAndRoutes(
    routes,
    linkRouteCollection
  )
  console.log("routeElements", routeElements)
  return (
    <div className={"App"}>
      <div key="Links">{linkElements}</div>
      <div key="Routes">{routeElements}</div>
    </div>
  )
}

export default App

const createLinksAndRoutes = (
  routes: IRoute[],
  linkRouteCollection: LinkRouteCollection
) => {
  const setDocumentTitle = (newTitle: string) => {
    document.title = prefix + newTitle
  }
  return routes.reduce((storage, route, index) => {
    const routeTitle = route.linkText ? route.linkText : route.key
    if (route.linkText) {
      storage.linkElements.push(
        <Link
          key={route.key + "_" + route.linkText + "_" + index}
          to={route.path}
        >
          <Button
            onClick={() => {
              setDocumentTitle(routeTitle)
            }}
          >
            {route.linkText}
          </Button>
        </Link>
      )
    }
    const key = route.key + "_" + index
    storage.routeElements.push(
      route.exact ? (
        <Route key={key} exact path={route.path} component={route.component} />
      ) : (
        <Route key={key} path={route.path} component={route.component} />
      )
    )
    return storage
  }, linkRouteCollection)
}
