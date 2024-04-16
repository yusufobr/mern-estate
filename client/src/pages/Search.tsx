const Search = () => {

  document.body.classList.add('search-bg')

  return (
    <div className="container my-20 p-3 mx-auto max-w-screen-xl min-h-screen">
      <div className="grid grid-cols-4 gap-4">
        <div className="backdrop-blur-sm bg-black bg-opacity-5 p-5 flex flex-col gap-4 rounded-lg">
          <div className="flex flex-col gap-1 w-full">
            <span>Search Term :</span>
            <input
              className="p-1 rounded-md"
              type="text"
              placeholder="Search"
            />
          </div>
          <div className="flex flex-col gap-1 w-full">
            <span>Type :</span>
            <div className="flex flex-wrap gap-3">
              <div className="flex gap-1 py-1 px-3 bg-slate-100 rounded-md">
                <input type="checkbox" />
                <span>Rental & Sell</span>
              </div>
              <div className="flex gap-1 py-1 px-3 bg-slate-100 rounded-md">
                <input type="checkbox" />
                <span>Rent</span>
              </div>
              <div className="flex gap-1 py-1 px-3 bg-slate-100 rounded-md">
                <input type="checkbox" />
                <span>Sell</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-1 w-full">
            <span>Amenities :</span>
            <div className="flex flex-wrap gap-3">
              <div className="flex gap-1 py-1 px-3 bg-slate-100 rounded-md">
                <input type="checkbox" />
                <span>Furnished</span>
              </div>
              <div className="flex gap-1 py-1 px-3 bg-slate-100 rounded-md">
                <input type="checkbox" />
                <span>Parking</span>
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-3 backdrop-blur-sm bg-black bg-opacity-5">hello</div>
      </div>
    </div>
  );
};

export default Search;
