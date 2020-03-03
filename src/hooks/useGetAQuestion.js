import { useEffect, useState, useContext } from "react"
import { SettingsContext } from "./TriviaSettings"
const fData = [
  {
    results: [
      {
        question: "this is question 1",
        correct_answer: "true",
        incorrect_answers: ["false", "false", "false"],
        type: "multiple",
      },
    ],
  },
  {
    results: [
      {
        question: "this is question 3",
        correct_answer: "correct",
        incorrect_answers: ["hell0", "im a", "mouse"],
        type: "multiple",
      },
    ],
  },
  {
    results: [
      {
        question: "this is question 2",
        correct_answer: "choose me",
        incorrect_answers: ["blah", "blehh", "bleg"],
        type: "multiple",
      },
    ],
  },
]

function chooseRandom(array) {
  array.sort(() => Math.random() - 0.5)
  return array[0]
}

async function fakeData(fData) {
  const delay = ms => new Promise(res => setTimeout(res, ms))
  await delay(2000)
  const data = chooseRandom(fData)
  return data
}

async function getData(e, url) {
  //e.preventDefault()
  const res = await fetch(url)
  const data = await res.json()
  return data
}

export default function({ url }) {
  const { setResponse } = useContext(SettingsContext)
  console.log(url)
  const [questionData, setQuestionData] = useState([])
  const [possibleAnswers, setPossibleAnswers] = useState([])
  const [loading, setLoading] = useState(false)
  const getQuestion = async e => {
    setLoading(true)
    //const data = await fakeData(fData)
    const data = await getData(e, url)
    setResponse(data.response_code)
    if (data.results.length >= 1) {
      setQuestionData(data.results)
      setLoading(false)
    }
  }

  function getAnswers(questionObj) {
    const { incorrect_answers, correct_answer } = questionObj
    if (questionObj.type === "multiple") {
      const answers = [...incorrect_answers, correct_answer]
      return answers.sort(() => Math.random() - 0.5)
    } else {
      const answers = [incorrect_answers, correct_answer]
      return answers.sort(() => Math.random() - 0.5)
    }
  }
  const controller = new AbortController()
  useEffect(() => {
    if (url !== "") {
      getQuestion()
    }
    return () => {
      controller.abort()
    }
  }, [url])
  useEffect(() => {
    if (questionData.length >= 1) {
      setPossibleAnswers(questionData && getAnswers(questionData[0]))
    }
    return () => {
      controller.abort()
    }
  }, [questionData])

  const { question, correct_answer: correctAnswer } =
    (questionData && questionData[0]) || {}

  return { loading, question, possibleAnswers, correctAnswer, getQuestion }
}
