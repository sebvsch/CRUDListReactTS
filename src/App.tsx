import AgregarTarea from './components/AgregarTarea'
import Header from './components/Header'
import ListaTarea from './components/ListaTarea'
import { TareasContextProvider } from './context/ListaTareaContext'

function App() {


  return (
    <>
      <TareasContextProvider>
        <Header />
        <AgregarTarea />
        <ListaTarea />
      </TareasContextProvider>
    </>
  )
}

export default App
