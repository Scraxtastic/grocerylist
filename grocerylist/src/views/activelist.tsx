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
import ProductManager from "../manager/productmanager"

const useStyles = makeStyles({
  ButtonGroup: {
    color: "red",
  },
  ButtonGroup2: {},
})

export const ActiveList = () => {
  const classes = useStyles()
  const [edit, setEdit] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [products, setProducts] = useState(
    cloneDeep(ProductManager.getProducts())
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
          edit={false}
          onChange={(update: ProductUpdate) => {
            ProductManager.updateProductProperty(product.id, update)
            updateProducts()
          }}
        />
      )
    })
  }
  const onAddHandler = (product: ProductInterface) => {
    ProductManager.addProduct(product)
    updateProducts()
  }
  const updateProducts = () => {
    setProducts(cloneDeep(ProductManager.getProducts()))
    setProductWrapperKey(Math.random())
  }

  const sortProducts = (ascending: boolean) => {
    setProducts(ProductManager.sortBy("name", ascending))
    setProductWrapperKey(Math.random())
  }

  const filterProduts = () => {
    const currentFilteredProducts: ProductInterface[] = ProductManager.filterProduts(
      searchText
    )
    console.log(products, currentFilteredProducts)
    //TODO Workaround - i was in an airplane and i couldn't google for a good and performant solution
    if (products.length != currentFilteredProducts.length) updateProducts()
  }
  return (
    <Grid container>
      <Grid item xs={12}>
        <Typography>Active List</Typography>
      </Grid>
      <Grid container>
        <Grid item xs={9}>
          <Paper>
            <TextField
              value={searchText}
              id="standard-basic"
              label="Search product"
              onChange={({target}) => {
                setSearchText(target.value)
                filterProduts()
              }}
            />
            <ButtonGroup
              className={classes.ButtonGroup}
              variant="text"
              color="primary"
              aria-label="text primary button group"
            >
              <Button
                onClick={() => {
                  sortProducts(true)
                }}
              >
                Sort Products ASC
              </Button>
              <Button
                onClick={() => {
                  sortProducts(false)
                }}
              >
                Sort Products DESC
              </Button>
            </ButtonGroup>
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Button disabled={true}>
            <Typography>Add new Product</Typography> (coming soon..)
          </Button>
        </Grid>
      </Grid>
      <ProductAdder
        edit={edit}
        onClick={() => {
          setModalOpen(true)
        }}
        descriptionText={"Add new Product"}
      ></ProductAdder>
      {/* <ModalHandler
        onClose={(newModalOpen: boolean) => {
          setModalOpen(newModalOpen)
        }}
        onAdd={onAddHandler}
        edit={edit}
        open={modalOpen}
      ></ModalHandler> */}
      <Grid item xs={12}>
        {getProductElements()}
      </Grid>
    </Grid>
  )
}
