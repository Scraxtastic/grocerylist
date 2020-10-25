import React, { useState } from "react"
import { TextField, Typography } from "@material-ui/core"

interface Answer {
  input: string
  answer: string
}
const helpAnswers: Answer[] = [
  {input: "programmer", answer: "Google is your friend"},
  {input: "nobody", answer: "Leave this page alone"},
  {input: "nick", answer: "404"},
  {input: "senno", answer: "Fucking Weeb"},
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
      <div>The real question is, who of us really needs help?</div>
      <div>I am a programmer, what can you say about yourself?</div>
      <div>
        <Typography>I am </Typography>
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
