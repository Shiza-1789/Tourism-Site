import React, { useContext, useEffect, useState } from "react";
import TourList from "../components/TourList";
import { observer } from "mobx-react-lite";
import { Context } from "..";
import { fetchTours } from "../http/tourAPI";
import ToursPaginate from "../components/ToursPaginate";
import TourTypeList from "../components/TourTypeList";
import { fetchTourTypes } from "../http/tourtypeAPI";
import find from '../img/findIcon.jpg'
import options from '../img/optionsIcon.png'
import TourTypeListModal from "../components/modals/TourTypeListModal";

const ToursPage = observer(() =>{
    const {tour} = useContext(Context)
    const [name, setName] = useState("")
    const [loading, setLoading] = useState(true)
    const [tourTypeListModal, setTourTypeListModalOpen] = useState(false);
    
    useEffect(() => {
        fetchTourTypes().then(data => tour.setTourTypes(data))
        fetchTours(null, 1, tour.limit, name).then(data => {
            tour.setTours(data.rows)
            tour.setTotalCount(data.count)
        })
    }, [])

    useEffect(() => {
        fetchTours(tour.selectedTourType.id, tour.page, tour.limit, name).then(data => {
            tour.setTours(data.rows)
            tour.setTotalCount(data.count)
        }).finally(() => setLoading(false))
    }, [tour.selectedTourType, tour.page])

    const searchClick = () => {
        fetchTours(tour.selectedTourType.id, tour.page, tour.limit, name).then(data => {
            tour.setTours(data.rows)
            tour.setTotalCount(data.count)
        }).finally(() => setLoading(false))
    }

    if (loading){
        return <></>
    }

    return(
        <div className="grid grid-cols-8 gap-10 justify-items-center p-5 md:px-10">
            <div className="w-full col-span-8 md:col-span-2">
                <div className="flex gap-2 mb-4">
                    <img className="w-8 h-8 md:hidden self-center" src={options} onClick={() => setTourTypeListModalOpen(true)}></img>
                    <div 
                        className="grid w-full border-none rounded-3xl shadow-[2px_2px_5px_rgba(0,0,0,0.82)]"
                    >
                        <img className="w-8 h-8 absolute self-center justify-self-end mr-3 cursor-pointer" src={find} onClick={() => searchClick()}></img>
                        <input type="text" className="w-[79%] shadow-none border-none" onChange={e => setName(e.target.value)}/>
                    </div>
                </div>
                {!tourTypeListModal &&
                <div className="hidden md:grid">
                    <TourTypeList/>
                </div>
                }
            </div>                
            <div className="col-span-8 md:col-span-6 w-full">
                <TourList/>
            </div>
            <div className="w-full col-span-8 grid justify-items-center">
                <ToursPaginate/>
            </div>
            {tourTypeListModal &&
            <TourTypeListModal isOpen={tourTypeListModal} onClose={() => setTourTypeListModalOpen(false)}/>
            }
        </div>
    );
});

export default ToursPage;