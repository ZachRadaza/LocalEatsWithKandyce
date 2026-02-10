import "./ItemComp.css";

export default function ItemComp(
    item: { id: string, name: string, price: number, imageUrl: string },
    widthPx: number, 
    heightPx: number
){
    return (
        <button id={ item.id } style={{ width: widthPx, height: heightPx }}>
            <img src={ item.imageUrl }/>
            <div>
                <h4>{ item.name }</h4>
                <h4>{ item.price }</h4>
            </div>
        </button>
    );
}