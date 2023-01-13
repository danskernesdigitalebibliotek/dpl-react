import * as React from "react";
import { FC } from "react";
import fetchDigitalMaterial from "../../loan-list/materials/utils/digital-material-fetch-hoc";
import fetchMaterial from "../../loan-list/materials/utils/material-fetch-hoc";

export interface QueuedReservationItemProps {
  hest: string;
}

const QueuedReservationItem: FC<QueuedReservationItemProps> = ({ hest }) => {
  return (
    <li>
      <div className="list-materials ">
        <div className="list-materials__checkbox mr-32">
          <div className="checkbox">
            <input
              id="checkbox_id__0.6081662328158144"
              className="checkbox__input"
              type="checkbox"
              aria-label="Vælg materiale"
            />
            <label className="checkbox__label">
              <span className="checkbox__icon">
                <svg width="20px" height="20px">
                  <polyline
                    points="1.5 6 4.5 9 10.5 1"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  />
                </svg>
              </span>
              <div />
            </label>
          </div>
        </div>
        <div className="list-materials__content">
          <div className="list-materials__content-status">
            <div className="status-label status-label--outline ">bog</div>
            <div className="status-label status-label--warning list-materials__content-status-label">
              AFLEVERES 20.11.21
            </div>
          </div>
          <p className="text-header-h5 mt-8">Audrey Hepburn</p>
          <p className="text-small-caption">
            Af Isabel Sánchez Vegara, Amaia Arrazola (2018)
          </p>
        </div>
        <div className="list-materials__status">
          <div className="status-label status-label--warning ">
            AFLEVERES 20.11.21
          </div>
        </div>
      </div>
    </li>
  );
};

export default fetchDigitalMaterial(fetchMaterial(QueuedReservationItem));
