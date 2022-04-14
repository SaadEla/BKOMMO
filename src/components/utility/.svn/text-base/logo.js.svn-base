import React from 'react';
import { Link } from 'react-router-dom';
import { siteConfig } from '../../config.js';
import logo from '../../image/bkm_logo.png'
export default function({ collapsed }) {
  return (
    <div
      className="isoLogoWrapper">
      {collapsed
        ? <div>
            <h3>
              <Link to="/future">
                {/*<i className={siteConfig.siteIcon} />*/}
                BKM
              </Link>
            </h3>
          </div>
        : <h3>
            <Link to="/future">
              {<img src={logo} />}
            </Link>
          </h3>}
    </div>
  );
}
