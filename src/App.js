import index from './index.css';
import logoNoir from './assets/logoNoir.png';
import EditingPage from './components/EditingPage';
import { useEffect,useState ,useLayoutEffect} from 'react';
function App() {
  const [auth, setAuth] = useState(undefined);

useEffect(() => {
  async function login() {
    try {
      const loginResponse = await fetch('http://localhost:8000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          
            email: "email.example@gmail.com", 
            password: "MyPasswordIs0xDeadBeef",
           
          
        }),
      });

      const loginData = await loginResponse.json();
      console.log("Login Response:", loginData);
      setAuth((prev)=>loginData.Authorization);

      if (!loginResponse.ok) {
        console.error("Login failed.");
      }

      return loginData; 
    } catch (error) {
      console.error('Error during login:', error);
    }
  }

  login(); 
}, []);


  return (
  <>
     <EditingPage auth={auth}/>
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
