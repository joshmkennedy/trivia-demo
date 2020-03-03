import React, { useState, useEffect, useContext } from "react"
import { Button, CircularProgress } from "@material-ui/core"

import TriviaUI from "../components/TriviaUI"
import { ScoreContext } from "../hooks/ScoreContext"
import { SettingsContext } from "../hooks/TriviaSettings"
import useGetAQuestion from "../hooks/useGetAQuestion"

export default function Trivia() {
  const { url } = useContext(SettingsContext)
  const {
    question,
    possibleAnswers,
    correctAnswer,
    getQuestion,
    loading,
  } = useGetAQuestion({ url })
  const { scoreData, setScoreData } = useContext(ScoreContext)
  const [answerStatus, setAnswerStatus] = useState(null)
  function _chooseAnswer(answer, correctAnswer) {
    if (answer === correctAnswer) {
      setAnswerStatus("correct")
      setScoreData({ ...scoreData, correct: scoreData.correct + 1 })
    } else {
      setAnswerStatus("incorrect")
      setScoreData({ ...scoreData, wrong: scoreData.wrong + 1 })
    }
  }
  const chooseAnswer = answer => _chooseAnswer(answer, correctAnswer)
  return (
    <div>
      {!answerStatus &&
        (!loading ? (
          <TriviaUI
            question={question}
            possibleAnswers={possibleAnswers}
            chooseAnswerFn={chooseAnswer}
            getQuestionFn={getQuestion}
          />
        ) : (
          <CircularProgress />
        ))}
      {answerStatus !== null && (
        <DisplayResult
          resetStatus={() => setAnswerStatus(null)}
          answerStatus={answerStatus}
          getQuestionFn={getQuestion}
        />
      )}
    </div>
  )
}

function DisplayResult({ resetStatus, answerStatus, getQuestionFn }) {
  return (
    <>
      <h2>{answerStatus}</h2>
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          getQuestionFn()
          resetStatus()
        }}
      >
        Next Question
      </Button>
    </>
  )
}
