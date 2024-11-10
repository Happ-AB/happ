import React, { useState } from "react";
import { useMap } from "react-leaflet";
import { OpenStreetMapProvider } from "leaflet-geosearch";
import { SearchResult } from "leaflet-geosearch/dist/providers/provider";
import "./Search.css"; // Importera CSS-filen

// Definiera en typ för OpenStreetMap-resultaten
type OSMRawResult = {
  place_id: string;
  lat: string;
  lon: string;
  display_name: string;
  // Lägg till andra fält du behöver från raw-objektet
};

const Search = () => {
  const map = useMap();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult<OSMRawResult>[]>([]); // Använd OSMRawResult som typ

  const provider = new OpenStreetMapProvider();

  const handleInputChange = async (e: any) => {
    const value = e.target.value;
    setQuery(value);

    // Gör sökning om det finns minst 3 tecken
    if (value.length >= 3) {
      const results = await provider.search({ query: value });
      setResults(results);
    } else {
      setResults([]);
    }
  };

  const handleSelectResult = (result: any) => {
    // Zooma in och centrera kartan på den valda platsen
    const { x, y } = result;
    map.setView([y, x], 12);
    setQuery(result.label);
    setResults([]);
  };

  const clearSearch = () => {
    setQuery("");
    setResults([]);
  };

  const handleFocus = () => {
    map.doubleClickZoom.disable(); // Inaktiverar dubbelklick-zoom när inputfältet är fokuserat
  };

  const handleBlur = () => {
    map.doubleClickZoom.enable(); // Återaktiverar dubbelklick-zoom när inputfältet inte är fokuserat
  };

  return (
    <div className="search-container">
      <div className="input-wrapper">
        {query && (
          <button onClick={clearSearch} className="clear-button">
            ✕
          </button>
        )}
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          onFocus={handleFocus} // Inaktivera dubbelklickzoom när inputfältet är fokuserat
          onBlur={handleBlur} // Återaktivera dubbelklickzoom när inputfältet inte är fokuserat
          placeholder="Sök efter stad..."
          className="search-input"
        />
        {results.length > 0 && (
          <ul className="results-list">
            {results.map((result) => (
              <li
                key={result.raw.place_id}
                onClick={() => handleSelectResult(result)}
                className="result-item"
              >
                {result.label}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Search;
