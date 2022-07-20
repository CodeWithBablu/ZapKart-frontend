import React, { createContext, useContext, useState } from 'react';

export const ShopContext = createContext();

export const StateContext = ({ children }) => {

  const [qty, setQty] = useState(1);
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalQty, setTotalQty] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  const increaseQty = () => {
    setQty((prevQty) => prevQty + 1);
  }

  const decreaseQty = () => {
    setQty((prevQty) => {
      if (prevQty < 2) return 1;
      return prevQty - 1;
    });
  }

  const onAdd = (product, qty) => {
    //Total Price
    setTotalPrice((prevTotal) => prevTotal + (qty * product.price));
    //Increase Total Quantity
    setTotalQty((prev) => prev + qty);

    const exist = cartItems.find((item) => item.slug === product.slug);

    if (exist) {
      setCartItems(
        cartItems.map((item) =>
          item.slug === product.slug ? { ...exist, quantity: exist.quantity + qty }
            : item
        )
      );
    }
    else {
      setCartItems(
        [...cartItems, { ...product, quantity: qty }]
      );
    }
  }

  const onRemove = (product, qty) => {
    //Total Price
    setTotalPrice((prevTotal) => prevTotal - product.price);
    //Decrease Total Quantity
    setTotalQty((prev) => prev - 1);

    const exist = cartItems.find((item) => item.slug === product.slug);

    if (exist.quantity === 1) {
      setCartItems(
        cartItems.filter((item) => item.slug !== product.slug)
      );
    }
    else {
      setCartItems(
        cartItems.map((item) =>
          item.slug === product.slug
            ? { ...exist, quantity: exist.quantity - 1 }
            : item
        )
      );
    }
  }

  return (
    <ShopContext.Provider value=
      {{ qty, increaseQty, decreaseQty, showCart, setShowCart, cartItems, totalQty, totalPrice, setQty, onAdd, onRemove }}
    >
      {children}
    </ShopContext.Provider>
  );
}

export const useStateContext = () => useContext(ShopContext);