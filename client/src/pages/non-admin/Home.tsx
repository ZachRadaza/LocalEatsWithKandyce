import "./Home.css";
import food1 from "../../assets/images/food1.jpg";
import food2 from "../../assets/images/food2.jpg";
import food3 from "../../assets/images/food3.jpg";
import aboutImage from "../../assets/images/about-image.png";
import type { Category, CategoryImage, MenuItem } from "../../schemas/schemas";
import { useOutletContext, useNavigate } from "react-router-dom";
import { useMemo, useState } from "react";

type HomeContext = {
    menu: Map<string, MenuItem[]>;
    categories: Set<Category>;
}

export default function Home(){
    const { menu, categories } = useOutletContext<HomeContext>();
    const [categoryPairs, setCategoryPairs] = useState<CategoryImage[]>([]);
    const navigate = useNavigate();

    useMemo(() => {
        const pairs = [...categories].map((cat: Category) => {
            const items = menu.get(cat.id!);
            const backUpImage = "https://fnsogrswnxgnkerrmtgl.supabase.co/storage/v1/object/public/menu_images/food5.jpg";
            let imageLink = items && items[0]
                ? items[0].imageLink
                : backUpImage;

            return { ...cat, imageLink: imageLink };
        });

        setCategoryPairs(pairs);

    }, [categories]);

    return (
        <div className="home-cont">
            <div className="hero">
                <img src={ food1 }/>
                <img src={ food2 } />
                <img src={ food3 } />
                <p className="welcome">Welcome to Local Eats With Kandyce</p>
            </div>
            <div className="about">
                <img 
                    className="about-image"
                    src={ aboutImage } 
                />
                <div className="about-info">
                    <h3>About</h3>
                    <p>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                        when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
                        It has survived not only five centuries, but also the leap into electronic typesetting, 
                        remaining essentially unchanged. 
                        It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, 
                        and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                    </p>
                </div>
            </div>
            <div className="preview">
                <h4 className="preview-title">Explore the Menu</h4>
                <div className="categories">
                    { categoryPairs.map(category => (
                        <div key={ `${category.id}-cont`}>
                            <div
                                key={ category.id }
                                onClick={ () => navigate(`/menu#${category.id}`) }
                                className="category"
                            >
                                <img 
                                    src={ category.imageLink }
                                    className="category-image"
                                />
                                <p className="category-title">{ category.name }</p>
                            </div>   
                        </div>
                    )) }
                </div>
            </div>
        </div>
    );
}