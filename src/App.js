import index from './index.css';
import logoNoir from './assets/logoNoir.png';
import EditingPage from './components/EditingPage';

function App() {
  return (
  <>
     <EditingPage/>
  </>
  );
}


/*
<div className="App">
      <div className='card text-center h-screen flex flex-col items-center justify-center ' >

        <div className='bg-blue-200 rounded-xl p-4 flex flex-col items-center justify-center shadow-lg'>
        <img src={logoNoir}  className="rounded h-[200px] w-[200px] " alt="ResumeBuilder logo"/>
        <h1 className=" rounded-lg font-semibold text-lg mx-auto">Welcome to ResumeBuilder</h1>
        </div>
      </div>
    </div>

*/ 

export default App;
