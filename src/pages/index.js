import React, { useState } from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"

export const API = "https://opentdb.com/api.php?amount=1"
const IndexPage = () => {
  const [category, setCategory] = useState(null)
  const [questionData, setQuestionData] = useState(null)

  const getQuestion = async e => {
    e.preventDefault()
    const res = await fetch(`${API}`)
    const data = await res.json()
    setQuestionData(data.results)
    console.log(questionData)
  }
  function getAnswers(questionObj) {
    const { incorrect_answers, correct_answer } = questionObj
    if ((questionObj.type = "multiple")) {
      const answers = [...incorrect_answers, correct_answer]
      return answers.sort(() => Math.random() - 0.5)
    } else {
      const answers = [incorrect_answers, correct_answer]
      return answers.sort(() => Math.random() - 0.5)
    }
  }

  const possibleAnswers = questionData && getAnswers(questionData[0])
  return (
    <Layout>
      <SEO title="Home" />
      <h1>Hi people</h1>
      {questionData && (
        <>
          <h3 dangerouslySetInnerHTML={{ __html: questionData[0].question }} />
          <ul>
            {possibleAnswers.map((answer, key) => (
              <li key={key}>{answer}</li>
            ))}
          </ul>
          <details>
            <summary>answer</summary>
            {questionData[0].correct_answer}
          </details>
        </>
      )}
      <div>
        <button onClick={getQuestion}>get a questino</button>
      </div>
      <Link to="/page-2/">Go to page 2</Link>
    </Layout>
  )
}

export default IndexPage
