import React from "react"
import { ProductProps } from "./Product.types"
import {
  FilledInput,
  FormControl,
  InputLabel,
  Typography,
} from "@material-ui/core"

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
              props &&
                props.onChange &&
                props.onChange("name", newValue)
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
