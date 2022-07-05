import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import { useDispatch } from "react-redux";
import { openModal } from "../../../core/modal.slice";
import { Material } from "../../../components/material/material";
import StatusCircle from "../materials/utils/status-circle";

interface StackableMaterialProps {
  dueDate: string;
  loanDate: string | undefined;
  amountOfMaterialsWithDueDate: number;
  selectDueDate: Function;
  getAuthorName: Function;
  materialId: string;
  material: {
    description: string;
    fullTitle: string;
    datePublished: string;
    materialType: string;
    creators: {
      __typename?: "Creator" | undefined;
      name: string;
    }[];
  };
}

const StackableMaterial: React.FC<StackableMaterialProps> = ({
  dueDate,
  loanDate,
  amountOfMaterialsWithDueDate,
  selectDueDate,
  material,
  materialId,
  getAuthorName
}) => {
  const dispatch = useDispatch();

  return (
    <div
      className={`list-reservation m-32 ${
        amountOfMaterialsWithDueDate > 1 ? "list-reservation--stacked" : ""
      }`}
    >
      {material && (
        <>
          <div className="list-reservation__material">
            <div>
              <Material
                size="small"
                animate={false}
                tint="120"
                materialId={materialId}
                materialDescription={material.description}
              />
            </div>
            <div className="list-reservation__information">
              <div>
                <div className="status-label status-label--outline">
                  {material.materialType}
                </div>
              </div>
              <div className="list-reservation__about">
                <h3 className="text-header-h4">{material.fullTitle}</h3>
                <p className="text-small-caption color-secondary-gray">
                  {material.creators.length > 0 &&
                    getAuthorName(material.creators)}
                  {material.datePublished && <> ({material.datePublished})</>}
                </p>
              </div>
              {amountOfMaterialsWithDueDate > 1 && (
                <a
                  type="button"
                  onClick={() => {
                    selectDueDate();
                    dispatch(openModal({ modalId: dueDate }));
                  }}
                  aria-label="note about material"
                  className="list-reservation__note-desktop text-small-caption color-secondary-gray"
                >
                  + {amountOfMaterialsWithDueDate} materialer
                </a>
              )}
              {dayjs().isAfter(dayjs(dueDate)) && (
                <a
                  href="todo"
                  aria-label="todo"
                  className="list-reservation__note-desktop text-small-caption color-signal-alert"
                >
                  Du pålægges et gebyr, når materialet afleveres
                </a>
              )}
            </div>
          </div>
          <div>
            <div className="list-reservation__status">
              <StatusCircle loanDate={loanDate} dueDate={dueDate} />
              <div>
                <div className="list-reservation__deadline">
                  {dayjs().isAfter(dayjs(dueDate)) && (
                    <div className="status-label status-label--danger">
                      overskredet
                    </div>
                  )}
                  <p className="text-small-caption">
                    Afleveres {dayjs(dueDate).format("DD-MM-YYYY")}
                  </p>
                  {amountOfMaterialsWithDueDate > 1 && (
                    <a
                      href=""
                      className="list-reservation__note-mobile text-small-caption color-secondary-gray"
                    >
                      + {amountOfMaterialsWithDueDate} materialer
                    </a>
                  )}
                  <a
                    href="todo"
                    className="list-reservation__note-mobile text-small-caption color-signal-alert"
                  >
                    Du pålægges et gebyr, når materialet afleveres
                  </a>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default StackableMaterial;
