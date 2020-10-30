import React, {useState} from "react"
import Product from "../components/product/Product"
import {Product as ProductInterface, ProductUpdate} from "../models/product"
import ProductManager from "../manager/productmanager"
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
import {ProductAdder} from "../components/productadder/productadder"
import {ModalHandler} from "../components/modalhandler/modalhandler"
import {ProductsProps} from "./views.types"

const useStyles = makeStyles({
  ButtonGroup: {
    color: "red",
  },
  ButtonGroup2: {},
})

export const Products = (props: ProductsProps) => {
  const {productManager} = props
  const classes = useStyles()
  const [edit, setEdit] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  console.log("ProductMAnager products", productManager.getProducts())
  const [products, setProducts] = useState(
    cloneDeep(productManager.getProducts())
  )
  //productWrapperKey is neeeded, that React knows, that the products have to be updated
  const [productWrapperKey, setProductWrapperKey] = useState(Math.random())
  const [searchText, setSearchText] = useState("")
  const getProductElements = () => {
    filterProduts()
    return products.map((product: ProductInterface) => {
      return (
        <Product
          key={product.id}
          product={product}
          edit={edit}
          onChange={(update: ProductUpdate) => {
            productManager.updateProductProperty(product.id, update)
            updateProducts()
          }}
          onDelete={() => {
            productManager.deleteProduct(product)
            updateProducts()
          }}
        />
      )
    })
  }
  const onAddHandler = (product: ProductInterface) => {
    productManager.addProduct(product)
    updateProducts()
  }
  const updateProducts = () => {
    setProducts(cloneDeep(productManager.getProducts()))
    setProductWrapperKey(Math.random())
  }

  const filterProduts = () => {
    const currentFilteredProducts: ProductInterface[] = productManager.filterProduts(
      searchText
    )
    //TODO Workaround - i was in an airplane and i couldn't google for a good and performant solution
    if (products.length != currentFilteredProducts.length) updateProducts()
  }
  return (
    <Grid container>
      <Grid item xs={12}>
        <Typography>Products</Typography>
      </Grid>
      <Grid container>
        <Grid item xs={9}>
          Nothingness
        </Grid>
        <Grid item xs={3}>
          <Switch
            onChange={() => {
              setEdit(!edit)
              updateProducts()
            }}
          ></Switch>
          {edit ? (
            <Typography>back to Viewmode</Typography>
          ) : (
            <Typography>Activate Editmode</Typography>
          )}
        </Grid>
      </Grid>
      <ProductAdder
        edit={edit}
        onClick={() => {
          setModalOpen(true)
        }}
        descriptionText={"Add new Product"}
      ></ProductAdder>
      <ModalHandler
        onClose={() => {
          setModalOpen(false)
        }}
        onAdd={onAddHandler}
        edit={edit}
        open={modalOpen}
      ></ModalHandler>
      <Grid item xs={12}>
        {getProductElements()}
      </Grid>
    </Grid>
  )
}
