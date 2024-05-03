import React, { useState } from "react";
import ProductCard from "../components/Product-card";

const Search = () => {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [maxPrice, setMaxPrice] = useState(100000);
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(1);


  const addToCartHandler =() => {}

  const isNextPage = page < 4;
  const isPrevPage = page > 0;

  return (
    <div className="product-search-page">
      {/* Left side filter */}
      <aside>
        <h2>Filters</h2>

        {/* Sort */}
        <div>
          <h4>Sort</h4>
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="">None</option>
            <option value="asc">Price (Low to High)</option>
            <option value="dsc">Price (High to Low)</option>
          </select>
        </div>

        {/* max price */}
        <div>
          <h4>Max Price: {maxPrice || ""}</h4>
          <input
            type="range"
            min={100}
            max={100000}
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
          />
        </div>

        <div>
          <h4>Categories</h4>
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="">All</option>
            <option value="">Sample 1</option>
            <option value="">Sample 2</option>
          </select>
        </div>
      </aside>

      {/* products */}
      <main>
        <h1>Products</h1>
        <input
          type="text"
          placeholder="Search by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="search-product-list">
          <ProductCard
            productId="random"
            photo="https://imgs.search.brave.com/cUytKzCJ3RJquydoAT8L4fbhUmycqcPJ1Gt1XmZhKU4/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/cHJlbWl1bS1wc2Qv/bWFjYm9vay1sYXB0/b3Atc2NyZWVuLW1v/Y2t1cF8xMDYyNDQt/MjA4Ny5qcGc_c2l6/ZT02MjYmZXh0PWpw/Zw"
            name="Macbook"
            price={4545}
            stock={435}
            handler={addToCartHandler}
          />
        </div>

        <article>
          <button disabled={!isPrevPage} onClick={()=>setPage((prev)=>prev-1)}>Prev</button>
          <span>
            {page} of {4}
          </span>
          <button disabled={!isNextPage} onClick={()=>setPage((prev)=>prev+1)}>
            Next
          </button>
        </article>
      </main>
    </div>


  );
};

export default Search;
