import { Route,Routes,Navigate} from "react-router-dom"; //naviagte
import HomePage from "./pages/Homepage";
import Profilepage from "./pages/Profilepage";
import LoginPage from "./pages/Loginpage";
import SignupPage from "./pages/Signuppage";
import {  useState } from "react";
import { Loader } from "lucide-react";
import BASE_URL from "./config";
import connectSocket from "./connectsocket";


function App() {
  const [authUser,setauthUser] = useState(null)
  const [socket,setsocket] = useState(null)
  const [onlineUsers,setonlineUsers] = useState([])
  const [isLogginigin,setisloggingin] = useState(false)
  const [isSigning,setisSigning] = useState(false)
  const [isLoggingOut,setisLoggingOut] = useState(false)
  const [isCheckingAuth,setIsCheckingAuth] = useState(true)
  console.log(onlineUsers)
  console.log(authUser?authUser:'')


useEffect(() => {
  const checkAuth = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/user/checkAuth`, {
        method: 'GET',
        credentials: 'include',
      });
      const data = await response.json();
      console.log("Auth data:", data);
      setauthUser(data);
      if (data?._id) connectSocket(data._id, setsocket, socket, setonlineUsers);
    } catch {
      setauthUser(null);
    
    }
    finally{
      setIsCheckingAuth(false)
    }
  };
  checkAuth();
}, []);


  if(isLogginigin|isSigning){
    return(
      <div className="alignspin">
      <div className="spinner">
      <Loader size={40} className="animate-spin"/>
      </div>
      </div>
    )
  } 


  return (
   <>
   <Routes>
   <Route path="/" element={authUser?<HomePage authUser={authUser} setauthUser={setauthUser} socket={socket} setsocket={setsocket} onlineUsers={onlineUsers} setonlineUsers={setonlineUsers} setisLoggingOut={setisLoggingOut} isLoggingOut={isLoggingOut} />:<Navigate to='/login'/>} />
   <Route path="/signup" element={!authUser?<SignupPage setauthUser={setauthUser} socket={socket} setsocket={setsocket} onlineUsers={onlineUsers} setonlineUsers={setonlineUsers} setisSigning={setisSigning} isSigning={isSigning} />:<Navigate to='/'/>} />
   <Route path="/login" element={!authUser?<LoginPage authUser={authUser} setauthUser={setauthUser} socket={socket} setsocket={setsocket} onlineUsers={onlineUsers} setonlineUsers={setonlineUsers} isLogginigin={isLogginigin} setisloggingin={setisloggingin}/>:<Navigate to='/'/>} />
   <Route path="/profile" element={authUser?<Profilepage authUser={authUser} setauthUser={setauthUser} socket={socket} setsocket={setsocket}/>:<Navigate to='/login'/>}/>
   </Routes>
   </>
  );
}

export default App;
