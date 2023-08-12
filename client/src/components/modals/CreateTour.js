import React, { useContext, useEffect, useState } from "react";
import Modal from 'react-modal';
import { Context } from "../..";
import { fetchTourTypes } from "../../http/tourtypeAPI";
import { createTour } from "../../http/tourAPI";
import closeIcon from "../../img/closeIcon.png"

const CreateTour = ({isOpen, onClose}) =>{
    const {tour} = useContext(Context)
    const [name, setName] = useState('')
    const [date, setDate] = useState(new Date().toISOString().split('T')[0])
    const [duration, setDuration] = useState(0)
    const [place, setPlace] = useState('')
    const [difficulty, setDifficulty] = useState('')
    const [amountofparticipants, setAmountofparticipants] = useState(0)
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState(0)
    const [file, setFile] = useState(null)
    
    useEffect(() => {
        fetchTourTypes().then(data => tour.setTourTypes(data))
    })

    const selectFile = e => {
        setFile(e.target.files[0])
    }

    const addTour = () => {
        const formData = new FormData()
        
        if (!name)
            return
        if (new Date(date) <= new Date())
            return
        if (duration <= 0)
            return
        if (!place)
            return   
        if (!difficulty)
            return
        if (amountofparticipants <= 0)
            return
        if (!description)
            return
        if (price <= 0)
            return 
        if (!file)
            return
        if (!tour.selectedTourType.id)
            return

        formData.append('name', name)
        formData.append('date', new Date(date))
        formData.append('duration', duration)
        formData.append('place', place)
        formData.append('difficulty', difficulty)    
        formData.append('amountofparticipants', amountofparticipants)          
        formData.append('description', description)
        formData.append('price', price)
        formData.append('img', file)
        formData.append('tourTypeId', tour.selectedTourType.id)

        createTour(formData).then(() => {
            setName('')
            setDate(new Date().toISOString().split('T')[0])
            setDuration(0)
            setPlace('')
            setDifficulty('')
            setAmountofparticipants(0)
            setDescription('')
            setPrice(0)
            setFile(null)
            onClose()
        }).catch(e => console.log(e))
    }

    return (
        <Modal
        ariaHideApp={false}
        isOpen={isOpen}
        onRequestClose={onClose}
        className="absolute top-[60%] left-1/2 bottom-auto w-[85%] max-w-[450px] h-[80%] max-h-[700px] right-auto translate-y-[-60%] translate-x-[-50%] bg-white"
        >
            <div className="w-full h-full green-form grid text-sm md:text-lg">
                <div className="w-full h-[100%] grid gap-6 overflow-y-auto justify-items-center border-b border-black">
                    <img className="h-5 justify-self-end self-start m-2 cursor-pointer" onClick={onClose} src={closeIcon}/>
                    <div className="w-full px-6">
                        <label>Название тура:</label>
                        <input 
                            type="text" 
                            value={name} 
                            onChange={e => setName(e.target.value)}
                            className="h-10 w-full"                             
                        />
                    </div>
                    <div className="w-full px-6">
                        <label>Дату проведения тура:</label>
                        <input 
                            type="date" 
                            value={date} 
                            onChange={e => setDate(e.target.value)}
                            className="h-10 w-full" 
                        />
                    </div>
                    <div className="w-full px-6">
                        <label>Место проведения тура:</label>
                        <input 
                            type="text" 
                            value={place} 
                            onChange={e => setPlace(e.target.value)}
                            className="h-10 w-full" 
                        />
                    </div>
                    <div className="w-full px-6">
                        <label>Сложность тура:</label>
                        <input 
                            type="text" 
                            value={difficulty} 
                            onChange={e => setDifficulty(e.target.value)}
                            className="h-10 w-full" 
                        />
                    </div>
                    <div className="w-full px-6">
                        <label>Количество дней тура:</label>
                        <input 
                            type="number" 
                            value={duration} 
                            onChange={e => setDuration(Number(e.target.value))}
                            className="h-10 w-full"  
                        />
                    </div>
                    <div className="w-full px-6">
                        <label>Количество человек в туре:</label>
                        <input 
                            type="number" 
                            value={amountofparticipants} 
                            onChange={e => setAmountofparticipants(Number(e.target.value))}
                            className="h-10 w-full" 
                        />
                    </div>
                    <div className="w-full px-6">
                        <label>Тип тура:</label>
                        <select 
                            type="text" 
                            className="h-10 w-full invalid:text-[#999] input-class"
                            required defaultValue={""} 
                            onChange={e => tour.setSelectedTourType(JSON.parse(e.target.value))}
                        >
                            <option key="" value="" disabled hidden></option>
                            {tour.tourTypes.map(tourType => 
                                <option 
                                    key={tourType.id}
                                    value={JSON.stringify(tourType)}                         
                                    className="text-black"
                                >
                                    {tourType.name}
                                </option>
                            )}
                        </select>
                    </div>
                    <div className="w-full px-6">
                        <label>Описание тура:</label>
                        <textarea 
                            type="text" 
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                            className="h-48 w-full input-class" 
                        />
                    </div>
                    <div className="w-full px-6">
                        <label>Цена тура в рублях:</label>
                        <input 
                            type="number" 
                            value={price} 
                            onChange={e => setPrice(Number(e.target.value))}
                            className="h-10 w-full" 
                        />
                    </div>
                    <div className="w-full px-6">
                        <label>Картинку для тура:</label>
                        <label className="justify-self-center self-center">
                            <input type="file" className="hidden" onChange={selectFile}/>		
                            <div className="grid w-full h-10 text-center bg-white duration-300 cursor-pointer mb-5 input-class">
                                <span className="self-center">Выберите изображение</span>
                            </div>
                        </label>      
                    </div>
                </div>
                <button 
                    onClick={addTour}
                    className="bg-green-600 input-class rounded-none text-white justify-self-center self-center w-[35%] h-10 m-2"
                >
                    Сохранить
                </button>
            </div>
        </Modal>
    );
};

export default CreateTour;