import React from "react";
import vk from '../img/vk.png'
import tg from '../img/tg.png'
import mail from '../img/mail.png'
import { NavLink } from "react-router-dom";

const Contacts = () =>{
    return(
        <div className="grid justify-items-center px-2 md:px-0 pt-36 auto-rows-min gap-24 h-[85vh] bg-[url('../img/flowers.jpg')] bg-cover" >
            <h2 className="text-black text-4xl md:text-5xl">Наши контакты</h2>
            <div className="flex gap-10 md:gap-24 m-0">
                <NavLink to={"https://vk.com/club81886510"}><img className="w-24 h-24" src={vk}/></NavLink>
                <NavLink to={"https://t.me/walker554"}><img className="w-24 h-24" src={tg}/></NavLink>
                <NavLink to={"https://vk.com/club81886510"}><img className="w-24 h-24" src={mail}/></NavLink>
            </div>
        </div>
    )
}
export default Contacts;