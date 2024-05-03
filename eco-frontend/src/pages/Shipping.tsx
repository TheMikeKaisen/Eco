import { ChangeEvent, useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

const Shipping = () => {

    const navigate = useNavigate();


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

      <form action="">
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

        <button type="submit" onClick={()=> navigate('/cart')}>
            Pay Now
        </button>
      </form>
    </div>
  );
};

export default Shipping;
