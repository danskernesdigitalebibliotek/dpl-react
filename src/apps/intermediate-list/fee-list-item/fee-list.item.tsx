import * as React from "react";
import { FC } from "react";
import { Link } from "../../../components/atoms/link";
import { FeeV2 } from "../../../core/fbs/model";

export interface FeeListItemProps {
  itemData: FeeV2[];
}

const FeeListItem: FC<FeeListItemProps> = ({ itemData }) => {
  return (
    <div>
      {itemData &&
        Object.values(itemData).map((item) => {
          switch (itemData.length > 1) {
            case true:
              return (
                <div className="list-reservation-container">
                  <div className="list-reservation list-reservation--stacked">
                    <div className="list-reservation__material">
                      <div>
                        <div className="cover-container">
                          <span className="cover cover--small bg-identity-tint-120 cover__animate">
                            <img src="images/book_cover_3.jpg" alt="" />
                          </span>
                        </div>
                      </div>
                      <div className="list-reservation__information">
                        <div>
                          <div className="status-label status-label--outline ">
                            bog
                          </div>
                        </div>
                        <div className="list-reservation__about">
                          <h3 className="text-header-h4">Audrey Hepburn</h3>
                          <p className="text-small-caption color-secondary-gray">
                            Af Isabel Sánchez Vegara, Amaia Arrazola (2018)
                          </p>
                        </div>
                        <button
                          type="button"
                          aria-label="note about material"
                          className="list-reservation__note-desktop color-secondary-gray"
                        >
                          + {itemData.length - 1} materialer
                        </button>
                      </div>
                    </div>
                    <div className="list-reservation__status">
                      <div className="list-reservation__counter" />
                      <div>
                        <div className="list-reservation__deadline">
                          <div className="status-label status-label--danger ">
                            afleveret for sent
                          </div>
                          <p className="text-small-caption">
                            Afleveres {item.dueDate}
                          </p>
                          <Link
                            href={new URL("https://www.google.dk")}
                            className="list-reservation__note-mobile color-secondary-gray"
                          >
                            + 3 materialer
                          </Link>
                        </div>
                      </div>
                      <div className="list-reservation__fee">
                        <p className="text-body-medium-medium">
                          Gebyr {item.amount},-
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            case false:
            default:
              return (
                <div className="list-reservation-container">
                  <div className="list-reservation false">
                    <div className="list-reservation__material">
                      <div>
                        <div className="cover-container">
                          <span className="cover cover--small bg-identity-tint-120 cover__animate">
                            <img src="images/book_cover_3.jpg" alt="" />
                          </span>
                        </div>
                      </div>
                      <div className="list-reservation__information">
                        <div>
                          <div className="status-label status-label--outline ">
                            bog
                          </div>
                        </div>
                        <div className="list-reservation__about">
                          <h3 className="text-header-h4">Audrey Hepburn</h3>
                          <p className="text-small-caption color-secondary-gray">
                            Af Isabel Sánchez Vegara, Amaia Arrazola (2018)
                          </p>
                        </div>
                        <button
                          type="button"
                          aria-label="note about material"
                          className="list-reservation__note-desktop color-secondary-gray"
                        >
                          Du pålægges et gebyr, når materialet afleveres
                        </button>
                      </div>
                    </div>
                    <div className="list-reservation__status">
                      <div className="list-reservation__counter" />
                      <div>
                        <div className="list-reservation__deadline">
                          <div className="status-label status-label--danger ">
                            afleveret for sent
                          </div>
                          <p className="text-small-caption">
                            Afleveres 10.10.2020
                          </p>
                          <Link
                            href={new URL("https://www.google.dk")}
                            className="list-reservation__note-mobile color-secondary-gray"
                          >
                            + 3 materialer
                          </Link>
                        </div>
                      </div>
                      <div className="list-reservation__fee">
                        <p className="text-body-medium-medium">Gebyr 20,-</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
          }
        })}
    </div>
  );
};

export default FeeListItem;
