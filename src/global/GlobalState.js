import React, { useEffect, useState } from "react";
import axios from "axios";
import { base_URL } from "../constants/URL"
import GlobalStateContext from "./GlobalStateContext"
import { useRequestData } from "../hooks/useRequestData";

export const GlobalState = (props) => {

    const [restaurantes, setRestaurantes] = useState([])
    const [restaurantDetail, setRestaurantDetail] = useState({})
    const [cartItems, setCartItems] = useState([]);
    const [cart, setCart] = useState({
        products: [],
        restaurant: null,
      });  


      const addToCart = (restaurant, product, quantity = 1) => {
        const newProduct = { ...product, quantity };
    
        setCart((cart) => ({
          ...cart,
          restaurant,
          products:
            restaurant.id === cart.restaurant?.id
              ? [...cart.products, newProduct]
              : [newProduct],
        }));
      };

      const onAdd = (product) => {
        const exist = cartItems.find(x => x.id === product.id);
        if(exist) {
          setCartItems(
            cartItems.map((x)=> x.id === product.id ? {...exist, qty: exist.qty + 1} : x 
            
            )
          );
        }else {
          setCartItems([...cartItems, {...product, qty: 1}]);
        }
      }
      
    
    // console.log(restaurantes);
    const getRestaurants = () => {
        const auth = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InJjQXBxSzVCY3ZlVWxodzNBdWhhIiwibmFtZSI6IkFzdHJvZGV2IiwiZW1haWwiOiJhc3Ryb2RldnRlc3RlQGZ1dHVyZTQuY29tIiwiY3BmIjoiMTExLjExMS4yMjItMTEiLCJoYXNBZGRyZXNzIjp0cnVlLCJhZGRyZXNzIjoiUi4gQWZvbnNvIEJyYXp6eiwgMTc3OCwgNzExIC0gVmlsYSBOLiBDb25jZWnDp8Ojb28iLCJpYXQiOjE2NDUxMTgwODN9.J2c7hQS-Al-e7aEwm4gmpFXm1tf10EvNIsEhYuW-2pI"
        axios
            .get(`${base_URL}restaurants`, {
                headers: {
                    auth: auth
                }
            })
            .then(async (res) => {
                const allRestaurants = res.data.restaurants
                
                const promise = allRestaurants.map((restaurant) => {
                    return axios.get(`${base_URL}restaurants/${restaurant.id}`, {
                        headers: {
                            auth: auth
                            }
                    })
                })
                
                const getPromise = await Promise.all(promise)
                const filterListRestaurant = getPromise.map((item) => item.data.restaurant)
                
                setRestaurantes(filterListRestaurant)
            })
            .catch((err) => console.log(err.data))
    }
    // console.log(restaurantes);

    useEffect(() => {
        if (!restaurantes.length) {
            getRestaurants()
        }
    }, [])

    const states = {
        restaurantes,
        restaurantDetail
    }

    const setters = {
        setRestaurantes,
        setRestaurantDetail
    }
// redux
    return (
        <GlobalStateContext.Provider value={{ states, setters, cart, setCart, addToCart, cartItems, setCartItems, onAdd }}>
            {props.children}
        </GlobalStateContext.Provider>
    )
}
