import { useState } from "react";
import "./AcceptPopup.css";

type AcceptPopupProp = {
    isOpened: boolean;
    showPopup: (proceed: boolean, dateDue: string) => void;
}

export default function AcceptPopup({ isOpened, showPopup }: AcceptPopupProp){
    const [dateDue, setDateDue] = useState<string>(() => {
        const now = new Date();
        return now.toISOString().slice(0, 16); 
    });

    return (
        <div className={ isOpened ? "whole-screen" : "whole-screen closed"}>
            <div className="accept-popup-cont">
                <div className="message-cont">
                    <h5>Proceed with Accepting Order</h5>
                    <p>Enter date for new delivary</p>
                    <input 
                        type="datetime-local"
                        value={ dateDue }
                        onChange={ event => setDateDue(event.target.value) }
                    />
                </div>
                <div className="btns-cont">
                    <button
                        className="cancel red"
                        onClick={ () => showPopup(false, dateDue) }
                    >
                        Cancel
                    </button>
                    <button
                        className="submit green"
                        onClick={ () => showPopup(true, dateDue) }
                    >
                        Submit
                    </button>
                </div>
            </div>
        </div>
    );
}