import React, { FC, useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import ArrowLeft from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/collection/ArrowLeft.svg";
import ArrowRight from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/collection/ArrowRight.svg";
import { LoanV2 } from "../../../../core/fbs/model/loanV2";
import { LoanDetailsV2 } from "../../../../core/fbs/model";
import { GetMaterialManifestationQuery } from "../../../../core/dbc-gateway/generated/graphql";
import LoanListItems from "../../list/loan-list-items";
import { useText } from "../../../../core/utils/text";

interface PaginationProps {
  itemsPerPage: number;
  loans: LoanV2[];
  duplicateDueDates: string[];
  view: string;
  dueDates: string[];
  selectModalMaterial: ({
    material,
    loanDetails
  }: {
    material: GetMaterialManifestationQuery | undefined | null;
    loanDetails: LoanDetailsV2;
  }) => void;
  openModalDueDate: (dueDate: string) => void;
}

const Pagination: FC<PaginationProps> = ({
  itemsPerPage,
  loans,
  duplicateDueDates,
  openModalDueDate,
  selectModalMaterial
}) => {
  const t = useText();
  // We start with an empty list of items.
  const [currentItems, setCurrentItems] = useState<LoanV2[]>([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);

  useEffect(() => {
    // Fetch items from another resources.
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(loans.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(loans.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, loans]);
  // Invoke when user click to request another page.
  const handlePageClick = (event: { selected: number }) => {
    const newOffset = (event.selected * itemsPerPage) % loans.length;
    setItemOffset(newOffset);
  };

  return (
    <>
      <LoanListItems
        duplicateDueDates={duplicateDueDates}
        loans={currentItems}
        openModalDueDate={openModalDueDate}
        selectModalMaterial={selectModalMaterial}
      />
      <div className="pagination m-24">
        <ReactPaginate
          breakLabel="..."
          nextLabel={<img src={ArrowRight} alt={t("paginationNextLabel")} />}
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel={
            <img src={ArrowLeft} alt={t("paginationPreviousLabel")} />
          }
        />
      </div>
    </>
  );
};

export default Pagination;
