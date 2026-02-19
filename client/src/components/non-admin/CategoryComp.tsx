import { useMemo } from "react";
import { isPrime } from "../../utils/RandomFunctions";
import type { Category } from "../../schemas/schemas";
import type { MenuItem } from "../../pages/non-admin/Menu";
import ItemComp from "./ItemComp";
import "./CategoryComp.css";

type CategoryCompProp = {
    items: MenuItem[];
    category: Category;
    isLeft: boolean;
    onPatchItem: (categoryID: string, itemId: string, patch: Partial<MenuItem>) => void;
};

export default function CategoryComp({ items, category, isLeft, onPatchItem }: CategoryCompProp) {
    const numCols = useMemo(() => {
        const length = items.length;

        if(isPrime(length) && length >= 5) 
            return 5;

        const maxCols = length < 5 ? length : 5;
        let optimalCols = 1;

        for(let i = maxCols; i > 0; i--){
            if(length % i === 0){
                optimalCols = i;
                break;
            }
        }

        return optimalCols;
    }, [items.length]);

    const cols = useMemo(() => {
        const itemsSorted: MenuItem[][] = Array.from({ length: Math.max(1, numCols) }, () => []);

        for (let i = 0; i < items.length; i++) {
            const col = i % numCols;
            itemsSorted[col].push(items[i]);
        }

        return itemsSorted;
    }, [items, numCols]);

  return (
    <div className="category" id={category.id!}>
        <div className={ isLeft ? "category-name left" : "category-name right" }>
            { [...category.name].map((c, i) => (
                <h5 key={ `${category.id}-${i}${c}` }>{c}</h5>
            )) }
        </div>
        <div className="category-items">
            { cols.map((colItems, i) => (
                <div key={ `${category.id}-col-${i}` } className="category-col">
                    { colItems.map((item) => (
                        <ItemComp
                            key={ item.id }
                            item={ item }
                            onPatch={ (patch) => onPatchItem(category.id!, item.id!, patch) }
                        />
                    )) }
                </div>
            )) }
        </div>
    </div>
  );
}