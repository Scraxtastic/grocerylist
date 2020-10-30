import React, {useState} from "react"
import {TextField, Typography} from "@material-ui/core"

interface Answer {
  input: string
  answer: string
}
const helpAnswers: Answer[] = [
  {input: "nick", answer: "404"},
  {input: "error", answer: "Google or Stackoverflow might help you"},
]

export const Help = () => {
  const [answer, setAnswer] = useState("")
  const validateTextfieldInput = (input: string) => {
    setAnswer("")
    helpAnswers.forEach((helpAnswer) => {
      if (input === helpAnswer.input) {
        setAnswer(helpAnswer.answer)
      }
    })
  }
  return (
    <div>
      Help
      <div>What is your problem?</div>
      <div>
        <TextField
          onChange={(event) => {
            validateTextfieldInput(event.target.value.toLowerCase())
          }}
        ></TextField>
      </div>
      <div>
        <Typography>{answer}</Typography>
      </div>
    </div>
  )
}
