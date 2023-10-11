import { createContext, useContext, useEffect, useReducer, useState } from "react";
import { getData } from "../api";

const StateContext = createContext();

export const StateContextProvider = ({children}) => {
    const [search,setSearch] = useState("");
    const [productList,setProductList] = useState([]);



    const initialState = {
        products: [],
        cart: []
    }

    const reducer = (state,action) => {
        switch (action.type) {
            case "GET_PRODUCTS":
                return {...state, products: action.payload};
                case "ADD_TO_CART":
                    const item = action.payload;
                    const isExisited = state.cart.find(pd=> pd.id == item.id);
                    if(isExisited){
                        return {
                            ...state, cart: state.cart.map(pd=> item.id == pd.id ? {...item,qty:1}:{...pd})
                        }
                    }else {
                        return{
                            ...state, cart: [...state.cart,{...item,qty:1}]
                        }
                    }
                case "REMOVE_FROM_CART":
                    return {...state, cart: state.cart.filter(item=> item.id != action.payload.id)}
                case "EMPTY_CART":
                    return {
                        ...state, cart: (state.cart = [])
                    }
                case "INCREASE_QTY":
                        const i = action.payload;
                        const isExisit = state.cart.find(item=> item.id == action.payload.id)
                        const originItem = state.products.find(i => i.id == action.payload.id)
                        if(isExisit && i.qty>=1){
                            console.log(i.qty)
                            return{
                                ...state, cart: state.cart.map(item=> item.id == i.id ? {...item,qty:item.qty+1,price:originItem.price*(i.qty+1)} :{...item} )
                            }
                        }else{
                            return{
                                ...state, cart: [...state.cart]
                            }
                        }
                case "DECREASE_QTY":
                            const d = action.payload;
                            const isExisit1 = state.cart.find(item=> item.id == action.payload.id)
                        const originItem1 = state.products.find(i => i.id == action.payload.id)
                            if(isExisit1 && d.qty>1){
                                return{
                                    ...state, cart: state.cart.map(item=> item.id == d.id ? {...item,qty:d.qty-1,price:d.price-originItem1.price} :{...item} )
                                }
                            }else{
                                return{
                                    ...state, cart: [...state.cart]
                                }
                            }
                
            default:
                return state;
        }
    }

    const [state, dispatch] = useReducer(reducer, initialState)

    const getProduct = async() =>{
        const  data = await getData("/products")
        setProductList(data);
    }

    useEffect(()=>{
        getProduct();
    },[])

    useEffect(()=>{
        dispatch({type:"GET_PRODUCTS",payload:productList})
        const filterProductList = productList.filter(pd=>pd.title.toLowerCase().includes(search.toLowerCase()))
        dispatch({type:"GET_PRODUCTS",payload:filterProductList})
    },[productList,search])

    const data = {state, search, setSearch, dispatch};
    return(
        <StateContext.Provider value={data}>
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext)