import "./Popup.css";

type PopupProp = {
    title: string;
    message: string;
    positiveMessage: boolean;
    isOpened: boolean;
    closePopup: () => void;
}

export default function Popup({ title, message, positiveMessage, isOpened, closePopup }: PopupProp){
    return (
        <div className={ isOpened ? "whole-screen" : "whole-screen closed"}>
            <div className={ positiveMessage ? "popup-cont" : "popup-cont danger" }>
                <div className="message-cont">
                    <h5>{ title }</h5>
                    <p>{ message }</p>
                </div>
                <button
                    onClick={ () => closePopup() }
                >
                    Close
                </button>
            </div>
        </div>
    );
}