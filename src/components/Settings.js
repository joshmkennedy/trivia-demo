import React, { useContext, useEffect, useState } from "react"

import {
  Button,
  Card,
  CardActionArea,
  CardContent,
  Divider,
  CardHeader,
} from "@material-ui/core"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { Select } from "@material-ui/core"
import { SettingsContext } from "../hooks/TriviaSettings"

const SettingsOptionsDefault = {
  category: [{ name: "adfasf", id: "null" }],
  difficulty: [
    { name: "easy", value: "easy" },
    { name: "medium", value: "medium" },
    { name: "hard", value: "hard" },
  ],
}
const labelStyle = {
  marginBottom: "40px",
  display: "flex",
  justifyContent: "left",
  alignItems: "center",
}
const spanStyle = {
  marginRight: "20px",
  fontSize: "24px",
  fontFamily: "sans-serif",
}

function Settings() {
  const { url, settings, setSettings } = useContext(SettingsContext)
  function handleChange(e) {
    const { name, value } = e.target
    setSettings({ ...settings, [name]: value })
  }
  const [settingOptions, setSettingOptions] = useState(SettingsOptionsDefault)
  async function getCats() {
    const res = await fetch("https://opentdb.com/api_category.php")
    const data = await res.json()
    setSettingOptions({ ...settingOptions, category: data.trivia_categories })
  }
  useEffect(() => {
    getCats()
  }, [])
  console.log(settings.category)
  return (
    <div>
      <h1>Settings</h1>
      <div style={{ marginBottom: "40px" }}>
        <label style={labelStyle}>
          <span style={spanStyle}>Category</span>
          <Select
            native
            value={settings.categories}
            inputProps={{ id: "category", name: "categories" }}
            onChange={handleChange}
          >
            <option key="null" value={0}>
              random
            </option>
            {settingOptions.category.map(cat => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </Select>
        </label>
        <label style={labelStyle}>
          <span style={spanStyle}>Difficulty</span>
          <Select
            native
            value={settings.difficulty}
            inputProps={{ id: "difficulty", name: "difficulty" }}
            onChange={handleChange}
          >
            <option key={"null"} value={0}>
              random
            </option>
            {settingOptions.difficulty.map(diff => (
              <option key={diff.value} value={diff.value}>
                {diff.name}
              </option>
            ))}
          </Select>
        </label>
      </div>
    </div>
  )
}

export default Settings
