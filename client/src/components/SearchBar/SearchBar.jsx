import useDogs from '../../hooks/useDogs';

const SearchBar = () => {
  const { handleSearchDog, handleChange, name } = useDogs();

  return (
    <div>
      <form onSubmit={handleSearchDog}>
        <input type='search' value={name} onChange={handleChange}/>
        <button>Search</button>
      </form>
    </div>
  );
};

export default SearchBar;
