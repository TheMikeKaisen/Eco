import { Link } from "react-router-dom";
import ProductCard from "../components/Product-card";
import { useLatestProductsQuery } from "../redux/api/productApi";
import toast from "react-hot-toast";
import Loader, { Skeleton } from "../components/Loader";

const Home = () => {
  const addToCartHandler = () => {};

  const { data, isLoading, isError } = useLatestProductsQuery("");

  if (isError) {
    toast.error("Cannot Fetch the Products.");
  }

  return (
    <div className="home">
      <section>{/* theme picture */}</section>

      <h1>
        Latest Products
        <Link to="/search" className="findmore">
          More
        </Link>
      </h1>
      <main>
        {isLoading ? (
          <Skeleton width="80vw" />
        ) : (
          data?.products.map((i) => (
            <ProductCard
              key={i._id}
              productId={i._id}
              photo={i.photo}
              name={i.name}
              price={i.price}
              stock={i.stock}
              handler={addToCartHandler}
            />
          ))
        )}
      </main>
    </div>
  );
};

export default Home;
