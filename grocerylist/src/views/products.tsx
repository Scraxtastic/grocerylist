import React, { useState } from "react"
import Product from "../components/product/Product"
import ProductManager from "../manager/ProductManager"
import { Switch, Typography } from "@material-ui/core"

export const Products = () => {
  const [edit, setEdit] = useState(false)
  const [_, setRerender] = useState(0)
  const getProductElements = () => {
    return ProductManager.getProducts().map((product) => {
      return (
        <Product
          key={product.id}
          product={product}
          edit={edit}
          onChange={(property: string, value: any) => {
            switch (property) {
              case "name":
                ProductManager.updateProductName(product.id, value)
                break
            }
            //TODO bessere Lösung - indem der state geändert wird, wird ein rerender geforct, ohne dieses kann man die Werte nicht bearbeiten
            setRerender(Math.random())
          }}
        />
      )
    })
  }
  return (
    <div>
      <div>
        <Switch
          onChange={() => {
            setEdit(!edit)
          }}
        ></Switch>
        {edit ? (
          <Typography>back to Viewmode</Typography>
        ) : (
          <Typography>Activate Editmode</Typography>
        )}
      </div>
      <div>{getProductElements()}</div>
    </div>
  )
}
