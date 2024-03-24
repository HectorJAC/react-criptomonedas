import { useState } from "react";
import styled from "@emotion/styled";

const Label = styled.label`
    color: #fff;
    display: block;
    fontfamily: 'Lato', sans-serif;
    fontzise: 24px;
    font-weight: 700;
    margin: 15px 0;
`;

const Select = styled.select`
    width: 100%;
    fontsise: 18px;
    padding: 14px;
    border-radius: 10px;
    margin-bottom: 20px;
    cursor: pointer;
`;

export const useSelectMonedas = (label, opciones) => {

    const [state, setState] = useState('');

    const SelectMonedas = () => (
        <>
            <Label> {label} </Label>
            <Select
                value={state}
                onChange={ e => setState(e.target.value) }
            >
                <option> Seleccione </option>

                {opciones.map(opciones => (
                    <option 
                        key={opciones.id}
                        value={opciones.id}
                    >
                        {opciones.nombre}
                    </option>
                ))}
            </Select>
        </>
    )

    return [ state, SelectMonedas  ];
};