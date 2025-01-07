import { RouterProvider } from "react-router-dom"
import { router } from "./router"
import { QueryClientProvider } from "@tanstack/react-query"
import { queryClient } from "./lib/react-query"

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router}/>
    </QueryClientProvider>
  )
}

export default App
