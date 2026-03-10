import "./Home.css";
import food1 from "../../assets/images/food1.jpg";
import food2 from "../../assets/images/food2.jpg";
import food3 from "../../assets/images/food3.jpg";

export default function Home(){
    return (
        <div className="home-cont">
            <div className="hero">
                <img src={ food1 }/>
                <img src={ food2 } />
                <img src={ food3 } />
                <p className="welcome">Welcome to Local Eats With Kandyce</p>
            </div>
            <div className="about">
                
            </div>
        </div>
    );
}