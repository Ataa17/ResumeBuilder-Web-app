import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import logoNoir from './assets/logoNoir.png';
function App() {
  return (
  <>
      <div className="App">
      <div className='card text-center' >
        <img src={logoNoir}  className="card-img-top" alt="ResumeBuilder logo"/>
        <h1 className="card-title">Welcome to ResumeBuilder</h1>
      </div>
    </div>
  </>
  );
}

export default App;
