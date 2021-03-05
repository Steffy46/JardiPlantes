import CareScale from './CareScale';
import '../styles/PlantItem.css';

function handleClick(plantName) {
	alert(`Vous voulez acheter 1 ${plantName}? Très bon choix 🌱✨`)
}

function PlantItem(props){

    return (
        <div>
        <li className='jp-plant-item' onClick={() => handleClick}>
            <span className='jp-plant-item-price'>{props.product.price} €</span>
            <img className='jp-plant-item-cover' src={{ uri: props.product.image}} alt={`${props.product.name}`} />
            <h3>{props.product.name}</h3>
            <p>{props.product.description}</p>

            <div>
                <CareScale careType='water' scaleValue={props.product.water} />
                <CareScale careType='light' scaleValue={props.product.sun} />
            </div>   
        </li>
        </div>
    )
    
}

export default PlantItem;