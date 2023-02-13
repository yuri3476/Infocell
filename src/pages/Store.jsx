import React, { useEffect, useState } from 'react';
import { BsCart4, BsFillCartCheckFill } from 'react-icons/bs';
import { getItem, setItem } from '../services/LocalStorageFuncs'; 
import { Link } from 'react-router-dom';
import { ProductsArea } from '../css/style';
import { Header } from '../components/Header';

// chamando API
export const Store = () => {

    const [data, setData] = useState([]);
    const [cart, setCart] = useState( getItem('carrinhoYt') || []);  // ele vai guardar os itens que estão no carrinho

    useEffect(() => {
        const fetchApi = async () => {
            const url = 'https://api.mercadolibre.com/sites/MLB/search?q=celular';
            const response = await fetch(url);
            const objJson = await response.json();
            setData(objJson.results);
        }
        fetchApi();
    }, [])

    // função para adicionar e remover do carrinho
    const HandleClick = (obj) => {
        const element = cart.find((e) => e.id === obj.id)
        if(element){
            const arrFilter = cart.filter((e) => e.id !== obj.id)
            setCart(arrFilter)
            setItem('carrinhoYt', arrFilter)
        } else{
            setCart([...cart,obj])
            setItem('carrinhoYt', [...cart,obj])
        }

    }

    return(
        <div>
            <Header />
        <ProductsArea>
            {
                // puxando da APi para exibir na tela
                data.map((e) => (
                    <div key={e.id}>
                        <h4>{e.title}</h4>
                        <img src={e.thumbnail} alt=''/>
                        <h4>{`R$ ${e.price},00`}</h4>
                        <button
                        onClick={() => HandleClick(e)}>
                            {
                                cart.some((itemCart) => itemCart.id === e.id) ?(
                                    <BsFillCartCheckFill/>
                                ) :
                                <BsCart4/>
                            }
                        </button>
                    </div>
                ))
            }
            </ProductsArea>    
        </div>

    )
}