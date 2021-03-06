import CareScale from './CareScale';
import '../styles/PlantItem.css';
import { 
    Button,
    Col,
    Card,
    CardImg,
    CardBody,
    CardTitle,
    CardText,
    Badge,
    ButtonGroup,
   } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faStar, faVideo} from '@fortawesome/free-solid-svg-icons'


function handleClick(plantName) {
	alert(`Vous voulez acheter 1 ${plantName}? Très bon choix 🌱✨`)
}

function PlantItem(props){

    return (
        <div>
            <li className='jp-plant-item' onClick={() => handleClick}>
            <span className='jp-plant-item-price'>{props.product.price} €</span>
            <img className='jp-plant-item-cover' src={props.product.image} alt={`${props.product.name}`} />
            <h3>{props.product.name}</h3>
            <h6>{props.product.category}</h6>
            <p className='jp-plant-item-cover'>{props.product.description.slice(0, 100)} ... <span style= {{color: '#FF000'}}><b>Lire la suite</b></span> </p>

            <div>
                <p>Arrosage : </p><CareScale careType='water' scaleValue={props.product.water} />
                <p>Luminosité : </p><CareScale careType='light' scaleValue={props.product.sun} />
            </div>   
        </li>

        
        </div>
    )
    
}

export default PlantItem;