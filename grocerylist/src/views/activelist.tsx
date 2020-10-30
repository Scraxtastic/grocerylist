import {
  Button,
  ButtonGroup,
  Grid,
  makeStyles,
  Paper,
  Switch,
  TextField,
  Typography,
} from "@material-ui/core"
import cloneDeep from "lodash/cloneDeep"
import React, {useState} from "react"
import Product from "../components/product/Product"
import {ProductAdder} from "../components/productadder/productadder"
import {Product as ProductInterface, ProductUpdate} from "../models/product"
import {ActiveListProps} from "./views.types"

const useStyles = makeStyles({
  ButtonGroup: {
    color: "red",
  },
  ButtonGroup2: {},
})

export const ActiveList = () => {
  return (
    <div>
      ActiveList
      <div>Coming soon...</div>
    </div>
  )
}
