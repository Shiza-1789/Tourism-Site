import TourTypeList from "../TourTypeList";
import Modal from "react-modal"
import closeIcon from "../../img/closeIcon.png"

const TourTypeListModal = ({isOpen, onClose}) => {
    return (
        <Modal
        ariaHideApp={false}
        isOpen={isOpen}
        onRequestClose={onClose}
        className="absolute top-[50%] left-1/2 bottom-auto w-[60%] max-w-[300px] h-3/4 max-h-[300px] right-auto translate-y-[-55%] outline-none translate-x-[-50%] grid"
        >
            <div className="grid gap-1 green-form w-full h-[300px]">
                <img className="w-7 h-7 justify-self-end m-2" src={closeIcon} onClick={onClose}/>
                <div className="w-full h-[100%] overflow-y-auto p-1">
                    <TourTypeList/>
                </div>            
            </div>
        </Modal>
    )
}

export default TourTypeListModal;