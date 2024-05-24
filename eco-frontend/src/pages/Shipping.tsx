import { ChangeEvent, useEffect, useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { CartReducerInitialState } from "../types/reducer-types";
import { server } from "../redux/store";
import axios from "axios";
import toast from "react-hot-toast";
import { saveShippingInfo } from "../redux/reducer/cartReducer";

const Shipping = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  
  const { cartItems, total } =
    useSelector(
      (state: { cartReducer: CartReducerInitialState }) => state.cartReducer
    );

    const submitHandler = async(e:React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      dispatch(saveShippingInfo(shippingInfo))
      try {
        const {data} = await axios.post(`${server}/api/v1/payments/create`, {
          amount: total
        }, {
          headers: {
            "Content-Type":"application/json"
          }
        })
        navigate("/pay", {
          state: data.clientSecret
        })
      } catch (error) {
        console.log(error)
        toast.error("Something went wrong!")
      }
    }
    
    // cannot access shipping page if there is no item in cart
    useEffect(() => {
      if(cartItems.length <= 0) return navigate('/cart')
      
    }, [cartItems]);


  const [shippingInfo, setShippingInfo] = useState({
    address: "",
    city: "",
    state: "",
    country: "",
    pinCode: "",
  });

  const changeHandler = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setShippingInfo(prev => ({...prev, [e.target.name]: e.target.value}))
  };

  return (
    <div className="shipping">
      <button className="back-btn">
        <BiArrowBack />
      </button>

      <form onSubmit={submitHandler}>
        <h1>Shipping Address</h1>
        <input
          required
          type="text"
          placeholder="address"
          value={shippingInfo.address}
          name="address"
          onChange={changeHandler}
        />
        <input
          required
          type="text"
          placeholder="city"
          value={shippingInfo.city}
          name="city"
          onChange={changeHandler}
        />
        <input
          required
          type="text"
          placeholder="state"
          value={shippingInfo.state}
          name="state"
          onChange={changeHandler}
        />
        
        <select
          name="country"
          required
          value={shippingInfo.country}
          onChange={changeHandler}
        >
            <option value=''>Choose Country</option>
            <option value='india'>india</option>
            <option value='usa'>USA</option>
            <option value='uk'>UK</option>
        </select>
        <input
          required
          type="number"
          placeholder="Pin Code"
          value={shippingInfo.pinCode}
          name="pinCode"
          onChange={changeHandler}
        />

        <button type="submit">
            Pay Now
        </button>
      </form>
    </div>
  );
};

export default Shipping;
