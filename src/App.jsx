import Dashboard from "@/pages/Dashboard"
import { Route, Routes } from "react-router-dom"
import Layout from "./components/Layout"


function App() {
  return (
    <Routes>
      <Route path="/" element={
        <Layout>
          <Dashboard />
        </Layout>
      } />
    </Routes>
  )
}

export default App