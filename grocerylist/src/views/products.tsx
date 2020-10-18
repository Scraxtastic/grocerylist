import React, { useState } from "react"
import Product from "../components/product/Product"
import { Product as ProductInterface, ProductUpdate } from "../models/product"
import ProductManager from "../manager/productmanager"
import {
  Button,
  ButtonGroup,
  Grid,
  makeStyles,
  createStyles,
  Paper,
  Switch,
  TextField,
  Typography,
  Theme,
} from "@material-ui/core"
import cloneDeep from "lodash/cloneDeep"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    ButtonGroup: {
    },
  })
)

export const Products = () => {
  const classes = useStyles()
  const [edit, setEdit] = useState(false)
  const [products, setProducts] = useState(
    cloneDeep(ProductManager.getProducts())
  )
  const getProductElements = () => {
    return products.map((product: ProductInterface) => {
      return (
        <Product
          key={product.id}
          product={product}
          edit={edit}
          onChange={(update: ProductUpdate) => {
            ProductManager.updateProductProperty(product.id, update)
            setProducts(cloneDeep(ProductManager.getProducts()))
          }}
        />
      )
    })
  }
  return (
    <Grid container>
      <Grid container>
        <Grid xs>
          <Paper>
            <TextField id="standard-basic" label="Standard" />
            <ButtonGroup
            className={classes.ButtonGroup}
              variant="text"
              color="primary"
              aria-label="text primary button group"
            >
              <Button>Sort Products ASC</Button>
              <Button>Sort Products DESC</Button>
            </ButtonGroup>
          </Paper>
        </Grid>
        <Grid xs={3}>
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
        </Grid>
      </Grid>
      <Grid xs={12}>{getProductElements()}</Grid>
    </Grid>
  )
}
