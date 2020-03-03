import React, { useState, useEffect } from "react"

export const SettingsContext = React.createContext()
export const SettingsProvider = SettingsContext.Provider

export const SettingsWrapper = ({ children }) => {
  //session token
  const [response, setResponse] = useState(0)
  const storedToken =
    typeof window !== "undefined" ? localStorage.getItem("token") : ""
  const [token, setToken] = useState(storedToken)
  //
  async function getToken() {
    const res = await fetch("https://opentdb.com/api_token.php?command=request")
    const data = await res.json()
    localStorage.setItem("token", data.token)
    setToken(data.token)
  }
  async function resetToken(token) {
    const res = await fetch(
      `https://opentdb.com/api_token.php?command=reset&token=${token}`
    )
    const data = await res.json()
    localStorage.setItem("token", data.token)
    setToken(data.token)
  }
  useEffect(() => {
    if (response === 3) {
      getToken()
    }
    if (response === 4) {
      resetToken(token)
    }
  }, [response])
  const [settings, setSettings] = useState({
    base: "https://opentdb.com/api.php?amount=1",
    categories: "0",
    difficulty: "0",
    //TODO session: getSession()
  })

  const [url, setUrl] = useState("")
  useEffect(() => {
    const { base, categories, difficulty } = settings
    const newUrl = `${base}&token=${token}${
      categories !== "0" ? `&category=${categories}` : ""
    }${difficulty !== "0" ? `&difficulty=${difficulty}` : ""}`

    setUrl(newUrl)
  }, [settings, response, token])
  return (
    <SettingsProvider
      value={{
        url,
        settings,
        setSettings,
        setResponse,
      }}
    >
      {children}
    </SettingsProvider>
  )
}
