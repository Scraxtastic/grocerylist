import {Grid, Button, Typography} from "@material-ui/core"
import React from "react"
import ProductAdderProps from "./productadder.types"

export const ProductAdder = (props: ProductAdderProps) => {
  if (!props.edit) return null
  return (
    <Grid item xs={12}>
      <Button
          style={{marginBottom: "20px"}}
        onClick={() => {
          props.onClick()
        }}
        variant={"outlined"}
      >
        <Typography>Add new Product</Typography>
      </Button>
    </Grid>
  )
}
