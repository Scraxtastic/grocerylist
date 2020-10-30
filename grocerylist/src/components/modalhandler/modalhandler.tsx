import {
  Button,
  FilledInput,
  FormControl,
  InputLabel,
  makeStyles,
  Modal,
  Paper,
  Typography,
} from "@material-ui/core"
import React, {useState} from "react"
import ModalHandlerProps from "./modalhandler.types"

const useStyles = makeStyles({
  modalPaper: {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    margin: "auto",
    center: {
      margin: "auto",
    },
  },
})
export const ModalHandler = (props: ModalHandlerProps) => {
  const classes = useStyles()
  const [name, setName] = useState("")
  if (!props.edit) return null
  return (
    <Modal
      open={props.open}
      onClose={() => {
        props.onClose()
      }}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <Paper className={classes.modalPaper}>
        <form
          onSubmit={() => {
            if (name.length > 0) props.onAdd({id: -1, name})
            props.onClose()
          }}
        >
          <FormControl variant="filled">
            <InputLabel htmlFor="component-filled">Name</InputLabel>
            <FilledInput
              autoFocus={true}
              id="component-filled"
              onChange={(event) => {
                const name = event.target.value
                setName(name)
              }}
            />
          </FormControl>
          <Button type={"submit"}>
            <Typography>Add new product</Typography>
          </Button>
        </form>
      </Paper>
    </Modal>
  )
}
