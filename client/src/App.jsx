import { Outlet } from "react-router"
import Header from "./components/Header"

function App() {
  return (
    <>
      <header>
        <Header />
      </header>
      <main>
        <Outlet />
      </main>
    </>
  )
}

export default App
