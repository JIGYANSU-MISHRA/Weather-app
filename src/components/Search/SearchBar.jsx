// components/Search/SearchBar.jsx
import { Search } from 'react-feather';
import './Search.css';

const SearchBar = ({ city, setCity, getWeatherbyCity }) => {
  return (
    <div className="input-wrapper">
      <input 
        type="text" 
        value={city} 
        onChange={(e) => setCity(e.target.value)} 
        placeholder="Enter City Name" 
      />
      <button onClick={getWeatherbyCity}>
        <Search />
      </button>
    </div>
  );
};

export default SearchBar;