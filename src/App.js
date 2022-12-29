import { useGlobalContext } from './context'
import Loading from './loading'
import SetupForm from './setupForm'

function App() {
  const { waiting, loading, index, questions } = useGlobalContext()
  if (waiting) return <SetupForm />
  if (loading) return <Loading />
  return <main>quiz app</main>
}

export default App
