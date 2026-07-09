import { Outlet } from "react-router"

function App() {
  return (
    <>
      <div className="flex justify-center">
        <main>
          <Outlet />
        </main>
      </div>
    </>
  )
}

export default App
