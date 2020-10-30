import React from "react"
import "./App.scss"
import {Button} from "@material-ui/core"
import {Route, Link} from "react-router-dom"
import {Default, Products, Help, ActiveList} from "./views"
import ProductManager from "./manager/productmanager"

interface LinkRouteCollection {
  linkElements: JSX.Element[]
  routeElements: JSX.Element[]
}
export interface RouteInterface {
  key: string
  path: string
  // TODO REPLACE ANY
  component: (props?: any) => JSX.Element
  props?: {}
  linkText?: string
  exact?: boolean
}

const prefix = "sgl | "
const App = () => {
  const productManager = new ProductManager()
  document.title = prefix + "Scrax's grocery list"
  const routes: RouteInterface[] = [
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
      props: {productManager},
      linkText: "Active List",
    },
    {
      key: "products",
      path: "/products",
      component: Products,
      props: {productManager},
      linkText: "Products",
    },
    {key: "help", path: "/help", component: Help, linkText: "Help"},
  ]
  const linkRouteCollection: LinkRouteCollection = {
    linkElements: [],
    routeElements: [],
  }
  const {linkElements, routeElements} = createLinksAndRoutes(
    routes,
    linkRouteCollection
  )
  return (
    <div className={"App"}>
      <div key="Links">{linkElements}</div>
      <div key="Routes">{routeElements}</div>
    </div>
  )
}

export default App

const createLinksAndRoutes = (
  routes: RouteInterface[],
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
        <Route key={key} exact path={route.path}>
          {React.createElement(route.component, route.props)}
        </Route>
      ) : (
        <Route key={key} path={route.path}>
          {React.createElement(route.component, route.props)}
        </Route>
      )
    )
    return storage
  }, linkRouteCollection)
}
