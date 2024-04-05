import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setDogs } from '../redux/sliceDogs';


const useDogs = () => {
  const dispatch = useDispatch();

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

  return {
    handleDogs
  };
};

export default useDogs;