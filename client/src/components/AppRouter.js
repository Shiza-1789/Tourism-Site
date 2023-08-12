import React, { useContext } from "react";
import { Routes, Route, Navigate} from "react-router-dom"
import { Context } from "..";
import { adminRoutes, authRoutes, publicRoutes } from "../routes";
import { MAIN_ROUTE } from "../utils/consts";

const AppRouter = () =>{
    const {user} = useContext(Context)
    return( 
        <Routes>
            {user.user.role === "ADMIN" && adminRoutes.map(({path, Component}) =>
            <Route key = {path} path = {path} element = {<Component/>} exact/>
            )}

            {user.isAuth && authRoutes.map(({path, Component}) =>
            <Route key = {path} path = {path} element = {<Component/>} exact/>
            )}

            {publicRoutes.map(({path, Component}) =>
            <Route key = {path} path = {path} element = {<Component/>} exact/>
            )}
            <Route path="*" element={<Navigate to={MAIN_ROUTE}/>}/>
        </Routes>
    );
};
export default AppRouter;