import { useState } from "react";
import ProductCard from "../components/Product-card";
import {
  useCategoriesQuery,
  useSearchProductsQuery,
} from "../redux/api/productApi";
import toast from "react-hot-toast";
import { CustomError } from "../types/api-types";
import { Skeleton } from "../components/Loader";

const Search = () => {
  const { data, isLoading, isError, error } = useCategoriesQuery("");

  if (isError) {
    const err = error as CustomError;
    toast.error(err.data.message);
  }

  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [maxPrice, setMaxPrice] = useState(100000);
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(1);

  const { isLoading: productLoading, data: searchedData , isError:productIsError, error: productError}=
    useSearchProductsQuery({
      search,
      sort,
      price: maxPrice,
      category,
      page,
    });

    if(productIsError){
      const err = productError as CustomError;
      toast.error(err.data.message);
    }
  console.log("apna searched product h ye", searchedData);

  const addToCartHandler = () => {};
  
  const isNextPage = page < searchedData?.totalPage!;
  const isPrevPage = page > 1;

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
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">All</option>
            {!isLoading &&
              data?.categories.map((i) => (
                <option key={i} value={i}>
                  {i.toUpperCase()}
                </option>
              ))}
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

        {
          productLoading? <Skeleton count={10}/> :
          <div className="search-product-list">
          {searchedData?.products.map((i) => (
            <ProductCard
              key={i._id}
              productId={i._id}
              photo={i.photo}
              name={i.name}
              price={i.price}
              stock={i.stock}
              handler={addToCartHandler}
            />
          ))}
        </div>
        }

        {
          searchedData && searchedData.totalPage >= 1 && (
            <article>
          <button
            disabled={!isPrevPage}
            onClick={() => setPage((prev) => prev - 1)}
          >
            Prev
          </button>
          <span>
            {page} of {searchedData.totalPage}
          </span>
          <button
            disabled={!isNextPage}
            onClick={() => setPage((prev) => prev + 1)}
          >
            Next
          </button>
        </article>
          )
        }
      </main>
    </div>
  );
};

export default Search;
