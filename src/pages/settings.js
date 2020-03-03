import React from "react"
import { Link } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Settings from "../components/Settings"
const SettingsPage = () => {
  return (
    <Layout>
      <SEO title="Page two" />
      <Settings />
      <Link to="/">Go back to the homepage</Link>
    </Layout>
  )
}

export default SettingsPage
