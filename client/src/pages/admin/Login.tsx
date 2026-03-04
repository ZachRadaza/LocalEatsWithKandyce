import { useState } from "react";
import { ExtensionService } from "../../utils/ExtensionService";
import { useNavigate } from "react-router-dom";
import "./Login.css";

export default function Login(){
    const [password, setPassword] = useState<string>("");
    const [validPass, setValidPass] = useState<boolean>(true);
    const [message, setMessage] = useState<string>("");
    const [submitted, setSubmitted] = useState<string>("Submit");
    const navigate = useNavigate();

    async function attemptPassword(){
        setSubmitted("Submitted...");
        const attempt = await ExtensionService.login(password);

        setSubmitted("Submit");
        if(attempt){
            setValidPass(true);
            setMessage("Successfully Logged In");
            navigate("/admin");
        } else {
            setValidPass(false);
            setMessage("Failed to Log in");        
        }
    }

    return (
        <div className="login-cont">
            <div className="login-box">
                <h5 className="login-title">Kandyce Super Secret Admin Login</h5>
                <div className={ validPass ? "input-pair" : "input-pair invalid-pass"}>
                    <h6>Password</h6>
                    <input 
                        value={ password }
                        type="password"
                        onChange={ (event) => setPassword(event.target.value) }
                        onKeyDown={(event) => {
                            if(event.key === "Enter")
                                attemptPassword();
                        }}
                    />
                </div>
                <p className={ validPass ? "message" : "message invalid-pass"}>{ message }</p>
                <button
                    className="submit"
                    onClick={ () => attemptPassword() }
                >
                    { submitted }
                </button>
            </div>
            <button
                onClick={ () => navigate("/") }
                className="back-to-home"
            >
                Back to Home
            </button>
        </div>
    )
}