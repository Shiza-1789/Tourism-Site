import React, { useContext, useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./components/AppRouter";
import NavBar from "./components/NavBar";
import { observer } from "mobx-react-lite";
import { Context } from ".";
import { check } from "./http/userAPI"
import {Helmet} from "react-helmet";

const App = observer(() => {
  const {user} = useContext(Context)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    check().then(e => {
      user.setUser(e)
      user.setIsAuth(true)
    }).finally(() => setLoading(false))
  } ,[])

  if (loading){
    return <></>
  }

  return (
    <BrowserRouter>
      <Helmet>        
        <title>Турфирма "Костер"</title>
      </Helmet>
      <NavBar/>
      <AppRouter />
    </BrowserRouter>
  );
})

export default App;
