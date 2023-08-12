import React, { useContext, useEffect, useState } from "react";
import PurchasedTourList from "../components/PurchasedToursList"
import { Context } from "..";
import { fetchOrders } from "../http/ordersAPI";

const Profile = () =>{
    const { user, tour } = useContext(Context)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchOrders(user.user.id)
        .then(data => {
            tour.setPurchasedTours(data)
        }).finally(() => setLoading(false))
    }, [])

    if (loading){
        return <></>
    }

    return(
        <div className="w-full h-[85vh] grid place-items-center bg-[url('../img/leafsBackground.jpg')]">
            <div className="green-form bg-white w-[95%] md:w-[700px] p-3 md:p-10 grid auto-rows-min gap-4 divide-y divide-solid divide-black">
                <div className="flex justify-between text-xl">
                    <div className="grid">
                        <a className="text-2xl md:text-3xl">{user.user.name}</a>
                        <a>Почта: {user.user.email}</a>
                        <a>Телефон: {user.user.phone}</a>
                    </div>          
                    {user.user.role === "ADMIN" && <a className="text-2xl md:text-3xl">Админ</a>}          
                </div>
                <div>
                    <a className="text-2xl md:text-3xl">Оплаченные туры:</a>
                    <div className="">
                        <PurchasedTourList></PurchasedTourList>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Profile;