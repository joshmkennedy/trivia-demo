import React, { useState, useEffect, useContext } from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { ScoreContext } from "../hooks/ScoreContext"
import Trivia from "../components/Trivia"

export default function TriviaPage() {
  const { scoreData, setScoreData } = useContext(ScoreContext)

  return (
    <Layout>
      <SEO title="Game" />
      {scoreData.correct} / {scoreData.total}
      <Trivia />
    </Layout>
  )
}
