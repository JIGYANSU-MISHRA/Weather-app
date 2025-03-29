// components/Search/SearchHistory.jsx
import './Search.css';

const SearchHistory = ({ searchHistory, setCity }) => {
  return (
    <div className="search-history">
      <h4>Recent Searches:</h4>
      <ul>
        {searchHistory.map((item, index) => (
          <li key={index} onClick={() => setCity(item)}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default SearchHistory;