import React from "react"
import { ScoreDataWrapper } from "./hooks/ScoreContext"
import { SettingsWrapper } from "./hooks/TriviaSettings"

export const wrapRootElement = ({ element }) => {
  return (
    <ScoreDataWrapper>
      <SettingsWrapper>{element}</SettingsWrapper>
    </ScoreDataWrapper>
  )
}
