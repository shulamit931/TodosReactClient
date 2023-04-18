import React, { useEffect, useState } from 'react';
import Login from './Login'
import Todos from './Todos';

function App() {
  const [isLogin, setIsLogin] = useState(false);
  const login = () => {
    {
      if (localStorage.getItem('access_token'))
        setIsLogin(true)
    }

  }
  useEffect(login, []);
  return (
    <>

      {
        !isLogin ?
          <Login setIsLogin={setIsLogin} /> :
          <Todos setIsLogin={setIsLogin} />}
    </>


  );
}

export default App;