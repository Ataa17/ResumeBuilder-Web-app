import EditingPage from './components/EditingPage';
import { useEffect,useState ,useLayoutEffect} from 'react';
import Dashbord from './components/DashbordComponent/Dashbord';
import { BrowserRouter as Router, Route,Routes} from 'react-router-dom';
import Login from './components/Login';
import SignUp from './components/Signup';
import Cookies from 'js-cookie';


//for routing , check if the project id is valid or not and add conditions to the routes for security reasons


function App() {
  const [auth, setAuth] = useState(undefined);
  
  useEffect(() => {
    const authToken = Cookies.get('authToken');
    if (authToken) {
      setAuth(authToken);
    }
  }, []);

  useEffect(() => {
    if (auth && !Cookies.get('authToken')) {
      Cookies.set('authToken', auth, { expires: 7 }); 
    }
  }, [auth]);

  return (
  <>
  <Router>
      <Routes>
        {auth && (<Route path="/edit/:projectId" element={<EditingPage auth={auth} />} />)}
        {auth && <Route  path="/" element={<Dashbord auth={auth}  setAuth={setAuth}/>} />}
        <Route index exact path="/login" element={<Login setAuth={setAuth} auth={auth}/>}/>
        <Route path="/signup" element={<SignUp setAuth={setAuth}/>}/>
        <Route path="*" element={<Login setAuth={setAuth} auth={auth}/>}/>
      </Routes>
    </Router>
  
  </>
  );
}





/*



*/

export default App;
