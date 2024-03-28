import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
// import SearchBar from '../SearchBar/SearchBar';
import styles from './NavBar.module.css';

const NavBar = () => {
  const location = useLocation();

  // Estado local para el menu 
  const [menuOpen, setMenuOpen] = useState(false);

  // const shouldShowSearchBar = location.pathname === '/home';

  return (
    <div className={styles.navBar}>
      <div className={styles.navContainer}>
        <button
          className={styles.menuButton}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='16'
            height='16'
            fill='currentColor'
            className='bi bi-list'
            viewBox='0 0 16 16'
          >
            <path
              fillRule='evenodd'
              d='M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z'
            />
          </svg>
        </button>
        {menuOpen && (
          <div className={`${styles.navLinks} ${styles.showMenu}`}>
            {location.pathname !== '/home' && (
              <Link to='/home'>HOME</Link>
            )}
            {location.pathname !== '/form' && (
              <Link to='/form'>CREATE DOG</Link>
            )}
            {/* {shouldShowSearchBar && <SearchBar />} */}
            <Link to='/'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='16'
                height='16'
                fill='currentColor'
                className='bi bi-box-arrow-right'
                viewBox='0 0 16 16'
              >
                <path
                  fillRule='evenodd'
                  d='M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z'
                />
                <path
                  fillRule='evenodd'
                  d='M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z'
                />
              </svg>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;