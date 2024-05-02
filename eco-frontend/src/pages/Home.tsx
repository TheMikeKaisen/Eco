import React from "react";
import { Link } from "react-router-dom";
import ProductCard from "../components/Product-card";

const Home = () => {
  const addToCartHandler = () => {};

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
        <ProductCard
          productId="random"
          photo="https://imgs.search.brave.com/cUytKzCJ3RJquydoAT8L4fbhUmycqcPJ1Gt1XmZhKU4/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/cHJlbWl1bS1wc2Qv/bWFjYm9vay1sYXB0/b3Atc2NyZWVuLW1v/Y2t1cF8xMDYyNDQt/MjA4Ny5qcGc_c2l6/ZT02MjYmZXh0PWpw/Zw"
          name="Macbook"
          price={4545}
          stock={435}
          handler={addToCartHandler}
        />
      </main>
    </div>
  );
};

export default Home;
