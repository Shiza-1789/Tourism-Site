import React, { useContext } from "react";
import Modal from "react-modal"
import '../../styleSheets/tourList.css'
import { NavLink } from "react-router-dom";
import { ABOUTUS_ROUTE, MAIN_ROUTE, TOURS_ROUTE } from "../../utils/consts";
import { Context } from "../..";

const MobileSidebar = ({isOpen, onClose}) => {
    const {user} = useContext(Context)

    const logOut = () => {
        user.setUser({})
        user.setIsAuth(false)
        onClose()
    }

    return (
        <Modal
        ariaHideApp={false}
        isOpen={isOpen}    
        onRequestClose={onClose}
        style={{overlay: {zIndex:100}}}
        className="absolute left-0 bottom-auto w-1/2 h-full right-auto border bg-white"
        >
             <div className="grid place-items-center text-center">
                <NavLink className="hover:bg-green-200 duration-500 w-36 py-5" to={MAIN_ROUTE} onClick={onClose}>Главная</NavLink>               
                <NavLink className="hover:bg-green-200 duration-500 w-36 py-5" to={TOURS_ROUTE} onClick={onClose}>Туры</NavLink>
                <NavLink className="hover:bg-green-200 duration-500 w-36 py-5" to={ABOUTUS_ROUTE}>О нас</NavLink>
                <a className="hover:bg-green-200 duration-500 w-36 py-5" onClick={onClose}>Контакты</a>
                {user.isAuth && 
                    <a className="hover:bg-green-200 duration-500 w-36 py-5" onClick={logOut}>Выйти</a>
                }
            </div>            
        </Modal>
    )

};

export default MobileSidebar;