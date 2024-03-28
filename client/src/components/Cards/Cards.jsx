import Card from '../Card/Card';

const Cards = () => {
  const dogs = [
    {
      "id": 1,
      "image": "https://cdn2.thedogapi.com/images/BJa4kxc4X.jpg",
      "name": "Affenpinscher",
      "height": "23 - 29",
      "weight": "3 - 6",
      "lifespan": "10 - 12 years",
      "Temperaments": "Stubborn, Curious, Playful, Adventurous, Active, Fun-loving"
    },
    {
      "id": 2,
      "image": "https://cdn2.thedogapi.com/images/hMyT4CDXR.jpg",
      "name": "Afghan Hound",
      "height": "64 - 69",
      "weight": "23 - 27",
      "lifespan": "10 - 13 years",
      "Temperaments": "Aloof, Clownish, Dignified, Independent, Happy"
    },
    {
      "id": 3,
      "image": "https://cdn2.thedogapi.com/images/rkiByec47.jpg",
      "name": "African Hunting Dog",
      "height": "76",
      "weight": "20 - 30",
      "lifespan": "11 years",
      "Temperaments": "Wild, Hardworking, Dutiful"
    },
    {
      "id": 4,
      "image": "https://cdn2.thedogapi.com/images/1-7cgoZSh.jpg",
      "name": "Airedale Terrier",
      "height": "53 - 58",
      "weight": "18 - 29",
      "lifespan": "10 - 13 years",
      "Temperaments": "Outgoing, Friendly, Alert, Confident, Intelligent, Courageous"
    },
    {
      "id": 5,
      "image": "https://cdn2.thedogapi.com/images/26pHT3Qk7.jpg",
      "name": "Akbash Dog",
      "height": "71 - 86",
      "weight": "41 - 54",
      "lifespan": "10 - 12 years",
      "Temperaments": "Loyal, Independent, Intelligent, Brave"
    },
  ]
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