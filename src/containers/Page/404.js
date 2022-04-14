import React from 'react';
import FourZeroFourStyleWrapper from './404.style';
import { Link } from 'react-router-dom';
import Image from '../../image/rob.png';


const FourZeroFour = () => {
    return (
        <FourZeroFourStyleWrapper className="iso404Page">
        <div className="iso404Content">
          <h1>
            404
          </h1>
          <h3>
            Cette page n'est pas disponible
          </h3>
          <p>
            Le lien que vous avez suivi peut etre incorrect ou la page peut avoir été supprimée
          </p>
          <button type="button">
            <Link to="/app/recapTreso">
              Retour
            </Link>
          </button>
        </div>

        <div className="iso404Artwork" style={{    position: "absolute",
            height: "25%",
            top: "10%"}}>
          <img alt="#" src={Image} />
        </div>
      </FourZeroFourStyleWrapper>
    )
}

export default FourZeroFour
