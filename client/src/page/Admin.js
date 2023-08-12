import React, { useState } from "react";
import CreateTourType from "../components/modals/CreateTourType";
import CreateTour from "../components/modals/CreateTour";
import TourTypeListToDelete from "../components/modals/TourTypeListToDelete";
const Admin = () =>{
    const [tourTypeOpen, setTourTypeOpen] = useState(false);
    const [tourOpen, setTourOpen] = useState(false);
    const [tourTypeList, setTourTypeListOpen] = useState(false);

    return (
        <div className="grid justify-items-center gap-8 p-10 text-xl">        
            <button className="w-[200px] h-10 rounded-3xl outline outline-2" onClick={() => setTourOpen(true)}>Добавить тур</button>
            <button className="w-[200px] h-10 rounded-3xl outline outline-2" onClick={() => setTourTypeOpen(true)}>Добавить тип</button>
            <button className="w-[200px] rounded-3xl outline outline-2" onClick={() => setTourTypeListOpen(true)}>Просмотреть список типов</button>
            <CreateTourType isOpen={tourTypeOpen} onClose={() => setTourTypeOpen(false)}/>
            <CreateTour isOpen={tourOpen} onClose={() => setTourOpen(false)}/>
            <TourTypeListToDelete isOpen={tourTypeList} onClose={() => setTourTypeListOpen(false)}/>
        </div>
    );
}
export default Admin;