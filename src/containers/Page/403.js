import React from 'react';
import FourZeroFourStyleWrapper from './404.style';
import { Link } from 'react-router-dom';
import Image from '../../image/rob.png';


const FourZeroThree = () => {
    return (
        <FourZeroFourStyleWrapper className="iso404Page">
            <div style={{background:'white',    opacity: 0.9,
                height: '100%',
                width: '41%',
                padding: "24px"}} className="iso404Content">
                <h1>
                    403
                </h1>
                <h3>
                    Cette page n'est pas autorisé
                </h3>
                <p>
                    Acces refusé vous n'avez pas l'autorisation d'accéder à cette page.
                </p>
            </div>

            <div className="iso404Artwork" style={{    position: "absolute",
                height: "25%",
                top: "10%"}}>
                <img alt="#" src={Image} />
            </div>
        </FourZeroFourStyleWrapper>
    )
}

export default FourZeroThree
