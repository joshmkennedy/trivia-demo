import React from "react"
import { Button, CircularProgress } from "@material-ui/core"
const AnswerStyle = {
  listStyle: "none",
  padding: "0",
  margin: 0,
}
const listStyle = {
  padding: 0,
  margin: 0,
}
const buttonStyle = {
  textTransform: "none",
  display: "block",
  width: "100%",
  textAlign: "left",
  padding: "20px",
  height: "100%",
  borderBottom: "1px solid #eee",
}
export default function TriviaUI({
  answerStatus,
  question,
  possibleAnswers,
  chooseAnswerFn,
}) {
  return (
    <>
      <h2>{answerStatus}</h2>
      {question && (
        <>
          <h3
            style={{ color: `#4051B6` }}
            dangerouslySetInnerHTML={{
              __html: question,
            }}
          />
          <ul style={listStyle}>
            {possibleAnswers &&
              possibleAnswers.map((answer, key) => (
                <li style={AnswerStyle} key={key}>
                  <Button
                    style={buttonStyle}
                    type="button"
                    onClick={() => chooseAnswerFn(answer)}
                  >
                    {answer}
                  </Button>
                </li>
              ))}
          </ul>
        </>
      )}
    </>
  )
}
