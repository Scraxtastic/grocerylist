import React from "react"
import {ProductProps} from "./Product.types"
import {
  Button,
  FilledInput,
  FormControl,
  IconButton,
  InputLabel,
  Typography,
} from "@material-ui/core"
import {DeleteOutline} from "@material-ui/icons"
import {ProductUpdate} from "../../models/product"

const Product = (props: ProductProps) => {
  const height = "75px"
  const width = "200px"
  const style = {height, maxHeight: height, minHeight: height}
  return (
    <div style={style}>
      {props.edit ? (
        <div>
          <FormControl variant="filled">
            <InputLabel htmlFor="component-filled">Name</InputLabel>
            <FilledInput
              value={props.product.name}
              onChange={(event) => {
                const newValue = event.target.value
                const productUpdate: ProductUpdate = {
                  property: "name",
                  value: newValue,
                }
                props.onChange && props.onChange(productUpdate)
              }}
            />
          </FormControl>
          <IconButton
            aria-label="delete"
            onClick={() => {
              props.onDelete && props.onDelete()
            }}
          >
            <DeleteOutline />
          </IconButton>
        </div>
      ) : (
        <FormControl variant="filled" style={{width, margin: "auto"}}>
          <Typography>{props.product.name}</Typography>
        </FormControl>
      )}
    </div>
  )
}

export default Product
