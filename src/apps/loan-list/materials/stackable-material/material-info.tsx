import React, { FC, ReactNode } from "react";
import AuthorYear from "../../../../components/author-year/authorYear";
import { Cover } from "../../../../components/cover/cover";
import { BasicDetailsType } from "../../../../core/utils/types/basic-details-type";

interface MaterialInfoProps {
  material: BasicDetailsType;
  isbnForCover: string;
  periodical?: string | null;
  children?: ReactNode;
  openDetailsModal: () => void;
  focused: boolean;
  arrowLabelledBy: string;
}

const MaterialInfo: FC<MaterialInfoProps> = ({
  material,
  isbnForCover,
  periodical,
  openDetailsModal,
  focused,
  arrowLabelledBy,
  children
}) => {
  const {
    authorsShort,
    materialType,
    year,
    title,
    description,
    pid,
    series,
    lang
  } = material || {};
  const coverId = pid || isbnForCover;
  const handleDetailsModal = (event: React.SyntheticEvent) => {
    event.stopPropagation();
    openDetailsModal();
  };

  return (
    <div className="list-reservation__material">
      <div>
        <Cover
          ids={[coverId]}
          idType={pid ? "pid" : "isbn"}
          size="small"
          animate={false}
          alt={description || ""}
        />
      </div>
      <div className="list-reservation__information">
        {/* Add a div for material types even if there are none to ensure element alignment */}
        <div>
          {materialType && (
            <div>
              <div className="status-label status-label--outline">
                {materialType}
              </div>
            </div>
          )}
        </div>
        <div className="list-reservation__about">
          <button
            onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
              handleDetailsModal(e);
            }}
            onKeyUp={(e) => {
              // `!focused` prevents opening material details modal after clicking
              // enter on pager. Pager gives focus to the next stackable material too
              // quickly while still registering the enter key press.
              if ((e.key === "Enter" || e.key === "Space") && !focused) {
                handleDetailsModal(e);
              }
            }}
            type="button"
            // This is to handle focus when more items are loaded via pagination
            // eslint-disable-next-line jsx-a11y/no-autofocus
            autoFocus={focused}
            lang={lang || ""}
            className="list-reservation__header color-secondary-gray"
          >
            <span
              id={arrowLabelledBy}
              className="list-reservation__header__text"
            >
              {title}
            </span>
          </button>
          <p
            data-cy="reservation-about-author"
            className="text-small-caption color-secondary-gray"
          >
            <AuthorYear author={authorsShort || ""} year={year || ""} />
          </p>
          {periodical && (
            <p
              data-cy="reservation-about-periodical"
              className="text-small-caption color-secondary-gray"
            >
              {periodical}
            </p>
          )}
          {series && (
            <p
              data-cy="reservation-about-series"
              className="text-small-caption color-secondary-gray"
            >
              {series}
            </p>
          )}
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default MaterialInfo;
