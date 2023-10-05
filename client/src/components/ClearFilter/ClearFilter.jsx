import { useDispatch } from 'react-redux';
import { clearFilter, setCurrentPage } from '../../redux/action';
import styles from './ClearFilter.module.css'

const ClearFilter = () => {
  const dispatch = useDispatch();

  const handleClearFilter = () => {
    dispatch(clearFilter());
    dispatch(setCurrentPage(1));
  };

  return (
    <div className={styles.clearFilterContainer}>
      <button onClick={handleClearFilter}>Clear Filters</button>
    </div>
  )
};

export default ClearFilter;