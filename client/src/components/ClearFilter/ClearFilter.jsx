import { useDispatch } from 'react-redux';
import { clearFilter } from '../../redux/action';
import styles from './ClearFilter.module.css'

const ClearFilter = () => {
  const dispatch = useDispatch();

  const handleClearFilter = () => {
    dispatch(clearFilter())
  }

  return (
    <div className={styles.clearFilterContainer}>
      <button onClick={handleClearFilter}>Clear Filters</button>
    </div>
  )
};

export default ClearFilter;