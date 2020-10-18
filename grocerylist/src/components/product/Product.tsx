import React from "react"
import { ProductProps } from "./Product.types"
import {
  FilledInput,
  FormControl,
  InputLabel,
  Typography,
} from "@material-ui/core"
import { ProductUpdate } from "../../models/product"

const Product = (props: ProductProps) => {
  const height = "75px"
  const width = "200px"
  const style = { height, maxHeight: height, minHeight: height }
  return (
    <div style={style}>
      {props.edit ? (
        <FormControl variant="filled">
          <InputLabel htmlFor="component-filled">Name</InputLabel>
          <FilledInput
            id="component-filled"
            value={props.product.name}
            onChange={(event) => {
              const newValue = event.target.value
              const productUpdate: ProductUpdate = {
                property: "name",
                value: newValue,
              }
              props && props.onChange && props.onChange(productUpdate)
            }}
          />
        </FormControl>
      ) : (
        <FormControl variant="filled" style={{ width, margin: "auto" }}>
          <Typography>{props.product.name}</Typography>
        </FormControl>
      )}
    </div>
  )
}

export default Product
