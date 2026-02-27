import { useState } from "react";
import "./DeclinePopup.css";

type DeclinePopupProp = {
    isOpened: boolean;
    showPopup: (proceed: boolean, message: string) => void;
}

export default function DeclinePopup({ isOpened, showPopup }: DeclinePopupProp){
    const [message, setMessage] = useState<string>("");

    return (
        <div className={ isOpened ? "whole-screen" : "whole-screen closed"}>
            <div className="decline-popup-cont">
                <div className="message-cont">
                    <h5>Proceed with Declining Order</h5>
                    <p>State reason to Customer why the decline was made. This message will be sent to the Customer</p>
                    <textarea
                        value={ message }
                        onChange={ (event) => setMessage(event.target.value) }
                        placeholder="Ex. Sorry! I am busy with school work!"
                        rows={ 3 }
                    ></textarea>
                </div>
                <div className="btns-cont">
                    <button
                        className="cancel"
                        onClick={ () => showPopup(false, message) }
                    >
                        Cancel
                    </button>
                    <button
                        className="submit"
                        onClick={ () => showPopup(true, message) }
                    >
                        Submit
                    </button>
                </div>
            </div>
        </div>
    );
}