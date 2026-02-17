import React, { FC } from "react";
import Arrow from "../../components/atoms/icons/arrow/arrow";
import MediaImage from "../../components/media-container/MediaImage";
import { useConfig } from "../../core/utils/config";
import { useText } from "../../core/utils/text";

type Branch = {
  title: string;
  url: string;
  image?: string;
  address?: string;
  city?: string;
};

const BranchList: FC = () => {
  const config = useConfig();
  const t = useText();

  const branches = config<Branch[]>("branchesConfig", {
    transformer: "jsonParse"
  });
  const title = t("branchListTitleText");

  return (
    <div className="content-list-page">
      <h1 className="content-list-page__heading">{title}</h1>
      <ul className="content-list">
        {branches.map((branch) => (
          <li key={branch.url} className="content-list__item">
            <a
              className="content-list-item content-list-item-grid arrow__hover--right-small"
              href={branch.url}
            >
              <div className="content-list-item__image-container">
                <MediaImage src={branch.image} />
              </div>
              <div className="content-list-item__content">
                <div className="content-list-item__tag-container" />
                <div className="content-list-item__content-top-container">
                  <div className="content-list-item__content-top-container__inner">
                    <h2 className="content-list-item__title">{branch.title}</h2>
                    {(branch.address || branch.city) && (
                      <div className="content-list-item__description">
                        <div className="address" translate="no">
                          {branch.address}
                          <br />
                          {branch.city}
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="content-list-item__content-top-container__meta" />
                </div>
                <div className="content-list-item__content-bottom-container" />
              </div>
              <Arrow />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BranchList;
