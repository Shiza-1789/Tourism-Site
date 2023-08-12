import React, { useContext, useState } from "react";
import "../styleSheets/auth.css"
import { NavLink, useLocation, useNavigate } from "react-router-dom"
import { LOGIN_ROUTE, REGISTRATION_ROUTE, USER_ROUTE } from "../utils/consts";
import { login, registration } from "../http/userAPI";
import { Context } from "..";

const Auth = () =>{
    const location = useLocation()
    const navigate = useNavigate()
    const isLogin = location.pathname === LOGIN_ROUTE
    const { user } = useContext(Context)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordCheck, setPasswordCheck] = useState('')
    const [phone, setPhone] = useState('')

    const auth = async () => {
        try {  
            let response;          
            if (isLogin) {
                response = await login(email, password)
            } else {
                if (password !== passwordCheck)
                    return
                response = await registration(name, email, password, phone)
            }
            user.setUser(response)
            user.setIsAuth(true)
            navigate(USER_ROUTE)
        } catch (e) {
            alert(e.response.data.message)
        }
    }

    return(
        <div className="bg-[url('../img/trees.jpg')] bg-center">
            <div className="grid h-[650px] pb-10 pt-5 px-4">
                <div className="green-form self-center">
                    <h1 className="px-6 pt-1">{isLogin ? "Авторизация" : "Регистрация"}</h1>
                    {!isLogin &&                     
                    <div className="group">
                        <label>Имя пользователя:</label>
                        <input 
                            type="text"
                            onChange={e => setName(e.target.value)} 
                            value={name}
                        />
                    </div>
                    }
                    <div className="group">
                        <label>Электронная почта:</label>
                        <input 
                            type="email"
                            onChange={e => setEmail(e.target.value)} 
                            value={email}
                        />
                    </div>
                    <div className="group">
                        <label>Пароль:</label>
                        <input 
                            type="password"
                            onChange={e => setPassword(e.target.value)} 
                            value={password}
                        />
                    </div>
                    {!isLogin &&                     
                    <div className="group">
                        <label>Пароль еще раз:</label>
                        <input 
                            type="password"
                            onChange={e => setPasswordCheck(e.target.value)} 
                            value={passwordCheck}
                        />
                    </div>
                    }
                    {!isLogin &&
                    <div className="group">
                        <label>Телефон:</label>
                        <input 
                            type="number"
                            onChange={e => setPhone(e.target.value)} 
                            value={phone}
                        />
                    </div>
                    }
                    <div className="group">
                        <center><button className="button-submit" onClick={auth}>{isLogin ? "Войти" : "Зарегистрироваться"}</button></center>
                    </div>
                    {isLogin ?
                        <div className="px-6 py-2">
                            Нет аккаунта? <NavLink to={REGISTRATION_ROUTE}>Зарегистрироваться</NavLink>
                        </div>     
                        :
                        <div className="px-6 py-2">
                            Есть аккаунт? <NavLink to={LOGIN_ROUTE}>Войти</NavLink>
                        </div>
                    }
                </div>
            </div>  
        </div>
    )
}
export default Auth;