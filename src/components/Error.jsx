import { PropTypes } from 'prop-types'
import styled from "@emotion/styled";

const Texto = styled.div`
    background-color: #b7322c;
    color: #fff;
    padding: 15px;
    font-size: 22px;
    text-transform: uppercase;
    font-weight: 'Lato', sans-serif;
    font-weight: 700;
    text-align: center;
`

export const Error = ({children}) => {
    return (
        <Texto>
            {children}
        </Texto>
    );
};

Error.propTypes = {
    children: PropTypes.string.isRequired
}