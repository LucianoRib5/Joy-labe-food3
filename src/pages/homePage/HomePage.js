import React, { useContext, useState, useEffect } from "react";
import { MainContainer, ContainerCards } from "./styles";
import { CardComponent } from "./CardComponent";
import GlobalStateContext from "../../global/GlobalStateContext";
import Header from "../../components/header/Header";
import { Container } from "../restaurantsPage/styles";
import { Footer } from "../../components/footer/Footer"
import { TextField } from "@material-ui/core";
import { CategoryBar } from "../../components/category/CategoryBar";
import { ContainerCategory, DontCategory } from "../../components/category/styles";
import axios from "axios";
import { base_URL } from "../../constants/URL"
import { SelectBar } from "../../components/SelectBar/SelectBar";

export default function HomePage(props) { 
    const [search, setSearch] = useState("") 
    const [restaurantes, setRestaurantes] = useState([])  
    const [categorias, setCategorias] = useState([]) 
    const [filteredRestaurantes, setFilteredRestaurantes] = useState([]) 
 
    const handleSearch = (e) => {
        const textFilter = e.target.value 
        setSearch(textFilter)
        if(!textFilter)  return setFilteredRestaurantes(restaurantes);
        
        const filteredList = restaurantes.filter( restaurantItem => {
            return restaurantItem.name.toLowerCase().includes( textFilter.toLowerCase() )
          
        })
       
     
        setFilteredRestaurantes(filteredList)
    }

    const handleSearchCategory = (categoryName) => {
        if(!categoryName) return setFilteredRestaurantes(restaurantes);
   
        const filteredList = restaurantes.filter( restaurantItem => restaurantItem.category.toLowerCase().includes( categoryName.toLowerCase()))
        setFilteredRestaurantes(filteredList)
    }

    
        const getRestaurants = () => {
            const auth = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InJjQXBxSzVCY3ZlVWxodzNBdWhhIiwibmFtZSI6IkFzdHJvZGV2IiwiZW1haWwiOiJhc3Ryb2RldnRlc3RlQGZ1dHVyZTQuY29tIiwiY3BmIjoiMTExLjExMS4yMjItMTEiLCJoYXNBZGRyZXNzIjp0cnVlLCJhZGRyZXNzIjoiUi4gQWZvbnNvIEJyYXp6eiwgMTc3OCwgNzExIC0gVmlsYSBOLiBDb25jZWnDp8Ojb28iLCJpYXQiOjE2NDUxMTgwODN9.J2c7hQS-Al-e7aEwm4gmpFXm1tf10EvNIsEhYuW-2pI"
            axios
                .get(`${base_URL}restaurants`, {
                    headers: {
                        auth: auth
                    }
                })
                .then(async (res) => {
                    const restaurantesResponse = res.data.restaurants
                    setRestaurantes(restaurantesResponse)
                    setFilteredRestaurantes(restaurantesResponse)
                    const categoriasResponse = restaurantesResponse.map((restaurant) => restaurant.category).sort()
                    setCategorias([...new Set(categoriasResponse)])
                })
                .catch((err) => console.log(err.data))
        }

    useEffect(() => {
        getRestaurants();
    }, [])

    
    
    return (
      <MainContainer>
        <Header
        pageName={"SnackTime"}
    />
            <hr/>
           
           <Container>
          <form>
          <TextField value={search} onChange={handleSearch} label="Restaurante" variant="outlined" fullWidth/>
          </form>
          <SelectBar list={categorias} action={handleSearchCategory} />
       

          {filteredRestaurantes.length === 0 && (
                <p>Nenhum restaurante encontrado</p>
                )
            }
            
          {filteredRestaurantes.map((restaurant) => {
            return (
                <CardComponent
                key={restaurant.id}
                image={restaurant.logoUrl}
                placeName={restaurant.name}
                deliveryTime={restaurant.deliveryTime}
                deliveyValue={restaurant.shipping}
                pathName={restaurant.id}
                />
                )
            })
            }
            </Container>
            <Footer />
        </MainContainer>
    )
}
