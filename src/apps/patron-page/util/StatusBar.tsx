import React, { useEffect, useState, FC } from "react";
import {
  useGetV1LibraryProfile,
  useGetV1UserLoans
} from "../../../core/publizon/publizon";
import { LibraryProfile, UserData } from "../../../core/publizon/model";
import { useText } from "../../../core/utils/text";

const StatusBar: FC = () => {
  const t = useText();
  const { data: libraryProfileFetched } = useGetV1LibraryProfile();
  const { isSuccess, data } = useGetV1UserLoans();
  const [libraryProfile, setLibraryProfile] = useState<LibraryProfile | null>(
    null
  );
  const [patronData, setPatronData] = useState<UserData | null>(null);

  useEffect(() => {
    if (isSuccess && data && data.userData) {
      setPatronData(data.userData);
    }
  }, [isSuccess, data]);

  useEffect(() => {
    if (libraryProfileFetched) {
      setLibraryProfile(libraryProfileFetched);
    }
  }, [libraryProfileFetched]);

  // Todo where do I get these numbers from?

  let patronEbookLoans = 0;
  if (patronData?.ebookLoansRemaining) {
    patronEbookLoans = Math.abs(patronData?.ebookLoansRemaining) || 0;
  }
  let patronAudioBookLoans = 0;
  if (patronData?.audiobookLoansRemaining) {
    patronAudioBookLoans = Math.abs(patronData?.audiobookLoansRemaining) || 0;
  }
  const patronEbookReservations = 1; // todo afventer svar
  const patronAudioBookReservations = 2; // todo afventer svar
  let eBookLoanPerent = 100;
  if (libraryProfile?.maxConcurrentEbookLoansPerBorrower) {
    eBookLoanPerent =
      (patronEbookLoans / libraryProfile.maxConcurrentEbookLoansPerBorrower) *
      100;
  }
  let audioBookLoanPercent = 100;
  if (libraryProfile?.maxConcurrentAudioLoansPerBorrower) {
    audioBookLoanPercent =
      (patronAudioBookLoans /
        libraryProfile.maxConcurrentAudioLoansPerBorrower) *
      100;
  }

  let eBookReservationPerent = 100;
  if (libraryProfile?.maxConcurrentEbookReservationsPerBorrower) {
    eBookReservationPerent =
      (patronEbookReservations /
        libraryProfile.maxConcurrentEbookReservationsPerBorrower) *
      100;
  }
  let audioBookReservationPercent = 100;
  if (libraryProfile?.maxConcurrentAudioReservationsPerBorrower) {
    audioBookReservationPercent =
      (patronAudioBookReservations /
        libraryProfile.maxConcurrentAudioReservationsPerBorrower) *
      100;
  }
  return (
    <div className="dpl-status-loans">
      {libraryProfile && (
        <>
          <h2 className="text-body-small-regular mt-32 mb-16">
            {t("patronPageStatusBarHeaderText")}
          </h2>
          <div className="text-body-small-regular">
            {t("patronPageStatusBarBreadText")}
            <a href="todo" className="text-links">
              {t("patronPageStatusBarLinkText")}
            </a>
          </div>
          <div className="dpl-status-loans__column">
            <div className="dpl-status mt-32">
              <h3 className="text-small-caption">
                {t("patronPageStatusBarLoanHeaderText")}
              </h3>
              <div className="dpl-progress-bar text-small-caption color-secondary-gray">
                <div className="dpl-progress-bar__header">
                  <div className="text-label">
                    {t("patronPageStatusBarLoansEbooksText")}
                  </div>
                  <div className="text-label">
                    {/* todo string interpolation */}
                    {/* todo string interpolation aria label */}
                    {patronEbookLoans} ud af{" "}
                    {libraryProfile.maxConcurrentEbookLoansPerBorrower}
                  </div>
                </div>
                <div className="dpl-progress-bar__progress-bar bg-global-secondary">
                  <div
                    className="bg-identity-primary"
                    style={{ width: `${eBookLoanPerent}%` }}
                  />
                </div>
              </div>
              <div className="dpl-progress-bar text-small-caption color-secondary-gray">
                <div className="dpl-progress-bar__header">
                  <div className="text-label">
                    {t("patronPageStatusBarLoansAudioBooksText")}
                  </div>
                  <div className="text-label">
                    {/* todo string interpolation */}
                    {/* todo string interpolation aria label */}
                    {patronAudioBookLoans} ud af{" "}
                    {libraryProfile.maxConcurrentAudioLoansPerBorrower}
                  </div>
                </div>
                <div className="dpl-progress-bar__progress-bar bg-global-secondary">
                  <div
                    className="bg-identity-primary"
                    style={{ width: `${audioBookLoanPercent}%` }}
                  />
                </div>
              </div>
            </div>
            <div className="dpl-status mt-32">
              <h3 className="text-small-caption">
                {t("patronPageStatusBarReservationsHeaderText")}
              </h3>
              <div className="dpl-progress-bar text-small-caption color-secondary-gray">
                <div className="dpl-progress-bar__header">
                  <div className="text-label">
                    {t("patronPageStatusBarReservationsEbooksText")}
                  </div>
                  <div className="text-label">
                    {/* todo string interpolation */}
                    {/* todo string interpolation aria label */}
                    {patronEbookReservations} ud af{" "}
                    {libraryProfile.maxConcurrentEbookReservationsPerBorrower}
                  </div>
                </div>
                <div className="dpl-progress-bar__progress-bar bg-global-secondary">
                  <div
                    className="bg-identity-primary"
                    style={{ width: `${eBookReservationPerent}%` }}
                  />
                </div>
              </div>
              <div className="dpl-progress-bar text-small-caption color-secondary-gray">
                <div className="dpl-progress-bar__header">
                  <div className="text-label">
                    {t("patronPageStatusBarReservationsAudioBooksText")}
                  </div>
                  <div className="text-label">
                    {/* todo string interpolation */}
                    {/* todo string interpolation aria label */}
                    {patronAudioBookReservations} ud af{" "}
                    {libraryProfile.maxConcurrentAudioReservationsPerBorrower}
                  </div>
                </div>
                <div className="dpl-progress-bar__progress-bar bg-global-secondary">
                  <div
                    className="bg-identity-primary"
                    style={{ width: `${audioBookReservationPercent}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default StatusBar;
