import Sun from '../assets/sun.svg';
import Water from'../assets/water.svg';

const qualityLabel = {
    1: 'peu',
    2: 'modérément',
    3: 'beaucoup'
}

function CareScale({ scaleValue, careType} ) {
    const range = [1, 2, 3];

    const scaleType = careType === 'light' ? (
            <img src={Sun} alt='sun-icon' />
        ) : (
            <img src={Water} alt='water-icon' />
        );

    return (
        
        <div onClick={() =>
                alert(
                    `Cette plante a besoin de ${qualityLabel[scaleValue]} ${
                        careType === 'light' ? 'de lumière' : "d'arrosage"
                    }`
                )
            }
        >
            {range.map((rangeElement) =>
                scaleValue >= rangeElement ? <span key={rangeElement.toString()}>{scaleType}</span> : null
            )}
        </div>
    )
}

export default CareScale;