import { useEffect, useState } from "react";
import { VscError } from "react-icons/vsc";
import CartItem from "../components/Cart-item";
import { Link } from "react-router-dom";

const cartItems = [
  {
    productId: 'randomid', 
    photo:"https://imgs.search.brave.com/cUytKzCJ3RJquydoAT8L4fbhUmycqcPJ1Gt1XmZhKU4/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/cHJlbWl1bS1wc2Qv/bWFjYm9vay1sYXB0/b3Atc2NyZWVuLW1v/Y2t1cF8xMDYyNDQt/MjA4Ny5qcGc_c2l6/ZT02MjYmZXh0PWpw/Zw",
    name: "macbook", 
    price: 3000, 
    quantity: 40, 
    stock: 10
  }
];
const subtotal = 4000;
const tax = Math.round(subtotal * 0.18);
const shippingCharges = 200;
const discount = 200;
const total = subtotal + tax + shippingCharges - discount;

const Cart = () => {
  const [couponCode, setCouponCode] = useState<string>("");
  const [isValidCouponCode, setIsValidCouponCode] = useState<boolean>(false);


  useEffect(() => {
    const timeOutID = setTimeout(() => {
      if(Math.random() > 0.5) setIsValidCouponCode(true);
      else setIsValidCouponCode(false)
    })
    return () => {
      clearTimeout(timeOutID);
      setIsValidCouponCode(false);
      
    };
  }, [couponCode]);

  return (
    <div className="cart">
      <main>

        {
          cartItems.length > 0 ? (
            cartItems.map((i, idx) => <CartItem key={idx} cartItem={i}/>)
          ) : (
            <h1>No Items Added</h1>
          )
        }
      </main>

      {/* Right side tab */}
      <aside>
        <p>Subtotal: ₹{subtotal} </p>
        <p>Shipping Charges: ₹{shippingCharges} </p>
        <p>Tax: ₹{tax} </p>

        <p>
          Discount: <em className="red"> -₹{discount} </em>
        </p>
        <p>
          <b>Total: ₹{total}</b>
        </p>

        <input
          type="text"
          placeholder="coupon code"
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
        />

        {/* discount if coupon code is valid */}
        {couponCode &&
          (isValidCouponCode ? (
            <span className="green">
              ₹{discount} off using the <code>{couponCode}</code>
            </span>
          ) : (
            <span className="red">
              Invalid Coupon <VscError />
            </span>
          ))}

          {
            cartItems.length > 0 && <Link to={'/shipping'}>Checkout</Link>
          }
      </aside>
    </div>
  );
};

export default Cart;
