import { useSelector } from 'react-redux';
import Card from '../Card/Card';


const Cards = () => {
  const dogs = useSelector((state) => state.dogs.dogs)

  return (
    <div>
      {
        dogs.map(dog => {
          return (
            <Card
              key={dog.id}
              idRaza={dog.id}
              image={dog.image}
              name={dog.name}
              temperaments={dog.Temperaments}
              weight={dog.weight}
            />
          )
        })
      }
    </div>
  )
}

export default Cards;