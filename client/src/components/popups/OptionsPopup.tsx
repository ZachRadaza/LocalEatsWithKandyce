import "./OptionsPopup.css";

type OptionsPopupProp = {
    title: string;
    message: string;
    isOpened: boolean;
    option1Title: string;
    option2Title: string;
    option1Func: () => void;
    option2Func: () => void;
}

export default function OptionsPopup({ title, message, isOpened, option1Title, option2Title, option1Func, option2Func }: OptionsPopupProp){
    return (
        <div className={ isOpened ? "whole-screen" : "whole-screen closed"}>
            <div className="options-popup-cont">
                <div className="message-cont">
                    <h5>{ title }</h5>
                    <p>{ message }</p>
                </div>
                <div className="btns-cont">
                    <button
                        className="option-one"
                        onClick={ () => option1Func() }
                    >
                        { option1Title }
                    </button>
                    <button
                        className="option-two"
                        onClick={ () => option2Func() }
                    >
                        { option2Title }
                    </button>
                </div>
            </div>
        </div>
    );
}