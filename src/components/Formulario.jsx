import { useEffect, useState } from "react";
import { PropTypes } from 'prop-types'
import styled from "@emotion/styled";
import { useSelectMonedas } from "../hooks/useSelectMonedas";
import { monedas } from '../data/monedas';
import { Error } from "./Error";

const InputSubmit = styled.input`
    background-color: #9497FF;
    border: none;
    width: 100%;
    padding: 10px;
    color: #fff;
    font-weight: 700;
    text-transform: uppercase;
    font-size: 20px;
    border-radius: 5px;
    transition: background-color .3s ease;
    margin-top: 30px;

    &:hover {
        background-color: #7A7BDE;
        cursor: pointer;
    }
`

export const Formulario = ({setMonedas}) => {

    const [criptos, setCriptos] = useState([]);
    const [error, setError] = useState(false);

    const [ moneda, SelectMonedas ] = useSelectMonedas('Elija una moneda', monedas); 
    const [ criptomoneda, SelectCriptoMonedas ] = useSelectMonedas('Elija una criptomoneda', criptos); 

    useEffect(() => {
        const consultarAPI = async () => {
            const url = "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD";
            const respuesta = await fetch(url);
            const resultado = await respuesta.json();

            const arrayCriptos = resultado.Data.map( cripto => {
                const objeto = {
                    id: cripto.CoinInfo.Name,
                    nombre: cripto.CoinInfo.FullName
                }
                return objeto;
            });

            setCriptos(arrayCriptos);
        };
        consultarAPI();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        if ([moneda, criptomoneda].includes('')) {
            setError(true);
            return;
        }

        setError(false);
        setMonedas({
            moneda,
            criptomoneda
        });
    }

    return (
        <>
            {error && <Error> Todos los campos son obligatorios </Error>}
            <form
                onSubmit={handleSubmit}
            >
                <SelectMonedas />
                <SelectCriptoMonedas />

                <InputSubmit 
                    type="submit"
                    value="Calcular Criptomoneda"
                />
            </form>
        </>
    );
};

Formulario.propTypes = {
    setMonedas: PropTypes.func.isRequired
}
