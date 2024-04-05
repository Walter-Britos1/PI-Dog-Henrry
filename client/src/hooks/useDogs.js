import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setDogs } from '../redux/sliceDogs';


const useDogs = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');

  const handleDogs = async () => {
    try {
      const { data } = await axios.get('http://localhost:3001/dogs');

      if (data) dispatch(setDogs(data))

    } catch (error) {
      alert('Something went wrong please contact support');
    }
  };

  useEffect(() => {
    const fechtData = async () => {
      await handleDogs();
    };
    fechtData();
  }, []);

  const handleSearchDog = async (event) => {
    event.preventDefault();
    if(name === '') alert('Please enter dog name');

    try {
      const { data } = await axios.get(`http://localhost:3001/dogs?name=${name}`)
      if (data) dispatch(setDogs(data))

    } catch (error) {
      alert('Something went wrong please contact support')
    }
  };

  const handleChange = (event) => {
    const nameDog = event.target.value
    setName(nameDog)
  }

  return {
    handleDogs,
    handleSearchDog,
    handleChange,
    name
  };
};

export default useDogs;