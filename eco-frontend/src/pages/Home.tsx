import { Link } from "react-router-dom";
import ProductCard from "../components/Product-card";
import { useLatestProductsQuery } from "../redux/api/productApi";
import toast from "react-hot-toast";
import Loader, { Skeleton } from "../components/Loader";
import { CartItem } from "../types/types";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/reducer/cartReducer";

const Home = () => {

  const dispatch = useDispatch();  

  const addToCartHandler = (cartItem: CartItem) => {
    if(cartItem.stock < 1) return toast.error("Out of Stock")
    dispatch(addToCart(cartItem))
    toast.success("Added to Cart")
  };


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
