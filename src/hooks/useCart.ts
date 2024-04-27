import { useState, useEffect, useMemo } from 'react';
import { db } from '../data/db.js';
import type {Guitar, CartItem } from '../types/types';


export const useCart = () => {

  const initialCart = () : CartItem[] => {
    const localStorageCart = localStorage.getItem('cart');
    return localStorageCart ? JSON.parse(localStorageCart) : [];
  };

  const [data] = useState(db);
  const [cart, setCart] = useState(initialCart);

  const MAX_ITEMS = 5;
  const MIN_ITEMS = 1;

  //Cada vez que cart cambie quiero ejecutar lo siguiente con useEffect
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  //? FUNCIÓN PARA AGREGAR AL CARRITO
  //* Esta función toma como parámetro un item que iremos agregando
  const addToCart = (item : Guitar)  => {
    //Recorremos el carrito buscando en base el index, y comparamos si el id del objeto es igual al id del id del item
    const itemIndex = cart.findIndex((guitar) => guitar.id === item.id); //Nos retorna -1 si no encontró una coincidencia en base a nuestra condición

    //Ahora creamos una condición donde comparamos si itemIndex es diferente a -1
    if (itemIndex !== -1) {
      if (cart[itemIndex].quantity >= MAX_ITEMS) return;

      //En caso de ser true, significa que encontró algo y ejecutamos el siguiente código
      const updatedCart = cart.map((guitar, index) => {
        if (index === itemIndex) {
          return { ...guitar, quantity: guitar.quantity + 1 };
        } else {
          return guitar;
        }
      });
      setCart(updatedCart);
    } else {
      const newItem : CartItem = { ...item, quantity: 1 };
      setCart([...cart, newItem]);
    }
  };

  const removeToCart = (id : Guitar['id']) => {
    setCart((prevCart) => prevCart.filter((guitar) => guitar.id !== id));
  };

  const increaseQuantity = (id: Guitar['id']) => {
    const updateCart = cart.map((item) => {
      if (item.id === id && item.quantity < MAX_ITEMS) {
        return {
          ...item,
          quantity: item.quantity + 1,
        };
      }
      return item;
    });
    setCart(updateCart);
  };

  const decrementQuantity = (id : Guitar['id']) => {
    const updateCart = cart.map((item) => {
      if (item.id === id && item.quantity > MIN_ITEMS) {
        return {
          ...item,
          quantity: item.quantity - 1,
        };
      }
      return item;
    });
    setCart(updateCart);
  };

  const clearCart = () => {
    setCart([]);
  };

  const isEmpty = useMemo( () => cart.length === 0, [cart])
    const cartTotal = useMemo( () => cart.reduce( (total, item ) => total + (item.quantity * item.price), 0), [cart] )

  return {
    cart,
    initialCart,
    data,
    addToCart,
    decrementQuantity,
    increaseQuantity,
    clearCart,
    removeToCart,
    isEmpty,
    cartTotal,
  };
};
