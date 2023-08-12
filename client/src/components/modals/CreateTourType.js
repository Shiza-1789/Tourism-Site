import React, { useState } from "react";
import Modal from 'react-modal';
import { createTourType } from "../../http/tourtypeAPI";
import closeIcon from "../../img/closeIcon.png"

const CreateTourType = ({isOpen, onClose}) =>{
    const [name, setName] = useState('')
    const addType = () => {
        if(!name)
            return

        createTourType(({name: name})).then(data => {
            setName('')
            onClose()
        })
    }

    return (
        <Modal
        ariaHideApp={false}
        isOpen={isOpen}
        onRequestClose={onClose}
        className="absolute top-[55%] left-1/2 bottom-auto w-[85%] max-w-[450px] h-3/4 max-h-[150px] right-auto translate-y-[-55%] translate-x-[-50%]"
        >
            <div className="w-full grid gap-4 green-form text-sm md:text-lg">
                <img className="h-5 justify-self-end self-start m-2 cursor-pointer" onClick={onClose} src={closeIcon}/>
                <div className="w-full px-6">
                    <label>Название типа:</label>
                    <input 
                        type="text" 
                        value={name} 
                        onChange={e => setName(e.target.value)}
                        className="h-10 w-full"      
                    />
                </div>
                <button className="bg-green-600 text-white justify-self-center w-[35%] h-10 m-2 input-class rounded-none" onClick={addType}>Сохранить</button>
            </div>
        </Modal>
    );
};

export default CreateTourType;