import React, { useState, useEffect } from "react"

export const ScoreContext = React.createContext()
export const ScoreProvider = ScoreContext.Provider

export function ScoreDataWrapper({ children }) {
  const [scoreData, setScoreData] = useState({
    wrong: 0,
    correct: 0,
  })
  useEffect(() => {
    setScoreData({ ...scoreData, total: scoreData.wrong + scoreData.correct })
  }, [scoreData.wrong, scoreData.correct])

  return (
    <ScoreProvider value={{ scoreData, setScoreData }}>
      {children}
    </ScoreProvider>
  )
}
