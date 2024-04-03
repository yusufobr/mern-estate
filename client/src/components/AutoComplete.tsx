import { useState } from 'react';
import PlacesAutocomplete from 'react-places-autocomplete';

const AutoComplete = () => {
  const [address, setAddress] = useState('')
  
  const handleSelect = async (value: string) => {
    setAddress(value)
    
  }

  return (
      <PlacesAutocomplete
        value={address}
        onChange={setAddress}
        onSelect={handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div className='relative w-full'>
            <div className="autocomplete-dropdown-container flex flex-col gap-1 absolute bottom-10 w-full">
              {loading && <div>Loading...</div>}
              {suggestions.map((suggestion, index) => {
                return (
                  <div
                  {...getSuggestionItemProps(suggestion)}
                  className='text-white bg-black p-2 rounded-md cursor-pointer hover:bg-blue-50 hover:text-black hover:shadow-lg transition duration-30'
                  key={index}
                  >
                    <span>{suggestion.description}</span>
                  </div>
                );
              })}
            </div>
            <input
              {...getInputProps({
                placeholder: 'Search Places ...',
                className: 'location-search-input bg-transparent pr-4 text-lg md:text-2xl font-bold placeholder-white focus:bg-black rounded-md w-full',
              })}
            />
            
          </div>
        )}
      </PlacesAutocomplete>

  );

};

export default AutoComplete;
