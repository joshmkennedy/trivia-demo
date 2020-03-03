import React, { useState, useEffect, useContext } from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"

import { SettingsContext } from "../hooks/TriviaSettings"

import { Button, CircularProgress } from "@material-ui/core"
import {
  DashboardRounded,
  SaveAltRounded,
  DeleteForever,
  Delete,
} from "@material-ui/icons"
export const API = "https://opentdb.com/api.php?amount=1"

const listItemStyle = { listStyle: `none`, marginBottom: `10px` }
const linkStyle = {
  background: "white",
  padding: "8px 20px",
  fontFamily: "sans-serif",
  textDecoration: `none`,
  textAlign: `center`,
  display: `block`,
  fontWeight: 400,
  color: `#4051B6`,
}
const IndexPage = () => {
  return (
    <div
      style={{
        background: `#4051B6`,
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: `white`,
      }}
    >
      <SEO title="Home" />
      <div
        style={{
          margin: `0 auto`,
          maxWidth: 960,
          padding: `0 1.0875rem 1.45rem`,
        }}
      >
        <h1>Trivia</h1>
        <div>
          <ul style={{ padding: 0, margin: 0 }}>
            <li style={listItemStyle}>
              <Link style={linkStyle} to="/trivia">
                Game
              </Link>
            </li>
            <li style={listItemStyle}>
              <Link style={linkStyle} to="/settings">
                Settings
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default IndexPage
