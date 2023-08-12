import React, { useContext, useEffect, useState } from "react";
import Modal from 'react-modal';
import { fetchTourTypes, deleteTourType } from "../../http/tourtypeAPI";
import closeIcon from "../../img/closeIcon.png"
import deleteIcon from "../../img/delete.png"
import { Context } from "../..";
import { observer } from "mobx-react-lite";


const TourTypeListToDelete = observer(({isOpen, onClose}) =>{
    const {tour} = useContext(Context)

    useEffect(() => {
        fetchTourTypes().then(data => tour.setTourTypes(data))
    }, [])

    const deleteClick = async (id) => {
        await deleteTourType(id)
        fetchTourTypes().then(data => tour.setTourTypes(data))
    }

    return (
        <Modal
        ariaHideApp={false}
        isOpen={isOpen}
        onRequestClose={onClose}
        className="absolute top-[50%] left-1/2 bottom-auto w-[85%] max-w-[300px] h-3/4 max-h-[150px] right-auto translate-y-[-55%] translate-x-[-50%]"
        >
            <div className="w-full grid gap-4 green-form text-2xl">
                <img className="h-5 justify-self-end self-start m-2 cursor-pointer" onClick={onClose} src={closeIcon}/>
                <div className="w-full h-48 px-6 overflow-y-auto grid gap-2">
                {tour.tourTypes.map(tourType => 
                    <div key={tourType.id} className="flex justify-between items-center h-16 px-3 rounded-full bg-white">
                        <a>{tourType.name}</a>
                        <img className="w-10 cursor-pointer" src={deleteIcon} onClick={() => deleteClick(tourType.id)}/>
                    </div>
                )}   
                </div>           
            </div>
        </Modal>
    );
});

export default TourTypeListToDelete;