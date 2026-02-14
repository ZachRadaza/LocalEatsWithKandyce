import { useEffect, useState } from "react";
import { isPrime } from "../../utils/RandomFunctions";
import type { Item, Category } from "../../schemas/schemas";
import ItemComp from "./ItemComp";
import "./CategoryComp.css";

type CategoryCompProp = {
    items: Item[];
    category: Category;
    isLeft: boolean
}

export default function CategoryComp({ items, category, isLeft }: CategoryCompProp){
    const [numCols, setNumCols] = useState<number>(1);
    const [cols, setCols] = useState<Item[][]>([[]]);

    useEffect(() => {
        if(isPrime(items.length) && items.length >= 5){
            setNumCols(5);
            return;
        }

        let maxCols = items.length < 5 ? items.length : 5;
        let optimalCols = 1;

        for(let i = maxCols; i > 0; i--){
            if(items.length % i === 0){
                optimalCols = i;
                break;
            }
        }

        setNumCols(optimalCols);
    }, []);

    useEffect(() => {
        const itemsSorted: Item[][] = [];

        for(let i = 0; i < numCols; i++){
            itemsSorted.push([]);
        }

        for(let i = 0; i < items.length; i++){
            const col = i % numCols;

            itemsSorted[col].push(items[i]);
        }

        setCols(itemsSorted);
    }, [numCols]);

    return (
        <div 
            className="category"
            id={ category.id! }
        >
            <div className={ isLeft ? "category-name left" : "category-name right" }>
                { [...category.name].map( (c, i) => (
                    <h5 key={ `${category.id}-${i}${c}` }>{ c }</h5>
                )) }
            </div>
            <div className="category-items">
                { cols.map((colItems, i) => (
                    <div key={ `${category.id}-col-${i}` } className="category-col">
                        { colItems.map((item) => (
                            <ItemComp key={ item.id } item={item} />
                        )) }
                    </div>
                ))
                }
            </div>
        </div>
    );
}