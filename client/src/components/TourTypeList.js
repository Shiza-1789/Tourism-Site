import React, {useContext} from 'react';
import { observer } from "mobx-react-lite";
import { Context } from '..';

const TourTypeList = observer(() => {
    const {tour} = useContext(Context)

    const click = (tourType) => e => {
        if (tour.selectedTourType.id === JSON.parse(tourType).id) {
            e.target.checked = false
            tour.setSelectedTourType("")
            return
        }
        tour.setSelectedTourType(JSON.parse(tourType))
    }
    
    return (
        <div className="grid grid-cols-1 gap-2 place-self-center justify-items-center text-lg w-full">
            {tour.tourTypes.map(tourType => 
            <div className='w-24' key={tourType.id}>
                <input 
                    id={tourType.id}
                    type="radio" 
                    name="tourType" 
                    value={tourType.id} 
                    onClick={click(JSON.stringify(tourType))}  
                    onChange={e => {}}
                    checked={tour.selectedTourType.id === tourType.id}                          
                    className="tour-item invisible" 
                />
                <div className='grid h-10 place-items-center outline outline-1 bg-white'>
                    <label htmlFor={tourType.id} className='cursor-pointer p-0'>{tourType.name}</label>
                </div>
            </div>
            )}        
        </div>
    )
})

export default TourTypeList;