import "bootstrap/dist/css/bootstrap.min.css";
import './App.css'
import Header from './templates/header/header'
import Sidenav from './templates/sidenav/sidenav'

function App() {


  return (
    <>
    <div className='main-container'>
      <Header />
      <section className='content'></section>
      <Sidenav />
    </div>
    </>
  )
}

export default App
