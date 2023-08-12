import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { Context } from "..";
import logo from '../img/fire.png'
import dots from '../img/dots.png'
import sign from '../img/SignIn.png'
import logout from '../img/logout.png'
import profile from '../img/profile.png'
import admin from '../img/admin.png'
import { ABOUTUS_ROUTE, ADMIN_ROUTE, CONTACTS_ROUTE, LOGIN_ROUTE, MAIN_ROUTE, REGISTRATION_ROUTE, TOURS_ROUTE, USER_ROUTE } from "../utils/consts";
import { observer } from "mobx-react-lite";
import MobileSidebar from "./modals/MobileSidebar";

const NavBar = observer(() => {
    const {user} = useContext(Context)
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const logOut = () => {
        user.setUser({})
        user.setIsAuth(false)
    }

    return(
        <nav className="self-center flex justify-between items-center w-full h-28 px-5 md:px-10 bg-white text-center text-xl">                       
            <img className="w-8 h-8 md:hidden" src={dots} onClick={() => setSidebarOpen(true)}></img>
            <NavLink className="w-20 grid" to={MAIN_ROUTE}><img className="object-fill justify-self-center h-20" src={logo}/></NavLink>
            <div className="hidden md:flex align-middle items-center">
                <NavLink className="hover:bg-green-200 duration-500 w-28 h-28 py-10" to={MAIN_ROUTE}>Главная</NavLink>               
                <NavLink className="hover:bg-green-200 duration-500 w-28 h-28 py-10" to={TOURS_ROUTE}>Туры</NavLink>
                <NavLink className="hover:bg-green-200 duration-500 w-28 h-28 py-10" to={ABOUTUS_ROUTE}>О нас</NavLink>
                <NavLink className="hover:bg-green-200 duration-500 w-28 h-28 py-10" to={CONTACTS_ROUTE}>Контакты</NavLink>
            </div>
            {user.isAuth ?
                <div className="flex gap-2 items-center">
                    {user.user.role === "ADMIN" && 
                        <NavLink className="grid hidden md:grid hover:bg-green-200 duration-500 w-12 h-28" to={ADMIN_ROUTE}>
                            <img className="w-10 h-10 self-center justify-self-center" src={admin}/>
                        </NavLink>
                    }  
                    <NavLink className="grid hover:bg-green-200 duration-500 w-12 h-28" to={USER_ROUTE}>
                        <img className="w-10 h-10 self-center justify-self-center" src={profile}/>
                    </NavLink>
                    <NavLink className="grid hidden md:grid hover:bg-green-200 duration-500 w-12 h-28" onClick={logOut}>
                        <img className="w-10 h-10 self-center justify-self-center" src={logout}/>
                    </NavLink> 
                </div>
                :
                <>           
                    <NavLink className="hidden md:block hover:bg-green-200 duration-500 w-36 h-28 py-10" to={LOGIN_ROUTE}>Войти</NavLink> 
                    <NavLink className="md:hidden" to={LOGIN_ROUTE}><img className="w-10 h-10" src={sign}/></NavLink> 
                </>
            }
            <MobileSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)}/>
        </nav>
    )
})

export default NavBar;