import React, { useEffect, useState, FC } from "react";
import {
  useGetV1LibraryProfile,
  useGetV1UserLoans
} from "../../../core/publizon/publizon";
import { LibraryProfile, UserData } from "../../../core/publizon/model";
import { useText } from "../../../core/utils/text";

const StatusSection: FC = () => {
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

  const {
    maxConcurrentAudioLoansPerBorrower,
    maxConcurrentEbookLoansPerBorrower,
    maxConcurrentAudioReservationsPerBorrower = 0,
    maxConcurrentEbookReservationsPerBorrower = 0
  } = libraryProfile || {};

  let patronEbookLoans = 0;
  if (patronData?.totalEbookLoans) {
    patronEbookLoans = Math.abs(patronData?.totalEbookLoans) || 0;
  }
  let patronAudioBookLoans = 0;
  if (patronData?.totalAudioLoans) {
    patronAudioBookLoans = Math.abs(patronData?.totalAudioLoans) || 0;
  }
  let eBookLoanPercent = 100;
  if (maxConcurrentEbookLoansPerBorrower) {
    eBookLoanPercent =
      (patronEbookLoans / maxConcurrentEbookLoansPerBorrower) * 100;
  }

  let audioBookLoanPercent = 100;
  if (maxConcurrentAudioLoansPerBorrower) {
    audioBookLoanPercent =
      (patronAudioBookLoans / maxConcurrentAudioLoansPerBorrower) * 100;
  }

  return (
    <section className="dpl-status-loans">
      {libraryProfile && (
        <>
          <h2 className="text-header-h4 mt-64 mb-16">
            {t("patronPageStatusSectionHeaderText")}
          </h2>
          <div className="text-body-small-regular mb-8">
            {t("patronPageStatusSectionBodyText")}
          </div>
          <div className="text-body-small-regular mt-8 mb-8">
            {t("patronPageStatusSectionReservationsText", {
              placeholders: {
                "@countEbooks": maxConcurrentEbookReservationsPerBorrower,
                "@countAudiobooks": maxConcurrentAudioReservationsPerBorrower
              }
            })}
          </div>
          <div className="dpl-status-loans__column">
            <div className="dpl-status mt-32">
              <h3 className="text-small-caption">
                {t("patronPageStatusSectionLoanHeaderText")}
              </h3>
              <div className="dpl-progress-bar text-small-caption color-secondary-gray">
                <div className="dpl-progress-bar__header">
                  <label
                    className="text-label text-body-medium-medium"
                    htmlFor="patron-page-status-section-out-of-text"
                  >
                    {t("patronPageStatusSectionLoansEbooksText")}
                  </label>
                  {maxConcurrentEbookLoansPerBorrower !== undefined && (
                    <div
                      className="text-label"
                      id="patron-page-status-section-out-of-text"
                    >
                      {t("patronPageStatusSectionOutOfText", {
                        placeholders: {
                          "@this": patronEbookLoans,
                          "@that": maxConcurrentEbookLoansPerBorrower
                        }
                      })}
                    </div>
                  )}
                </div>
                <div className="dpl-progress-bar__progress-bar bg-global-secondary">
                  {maxConcurrentEbookLoansPerBorrower !== undefined && (
                    <div
                      className="bg-identity-primary"
                      role="figure"
                      aria-label={t(
                        "patronPageStatusSectionOutOfAriaLabelEbooksText",
                        {
                          placeholders: {
                            "@this": patronEbookLoans,
                            "@that": maxConcurrentEbookLoansPerBorrower
                          }
                        }
                      )}
                      style={{ width: `${eBookLoanPercent}%` }}
                    />
                  )}
                </div>
              </div>
              <div className="dpl-progress-bar text-small-caption color-secondary-gray">
                <div className="dpl-progress-bar__header">
                  <label
                    className="text-label"
                    htmlFor="max-concurrent-audio-loans-per-borrower"
                  >
                    {t("patronPageStatusSectionLoansAudioBooksText")}
                  </label>
                  {maxConcurrentAudioLoansPerBorrower !== undefined && (
                    <div
                      className="text-label"
                      id="max-concurrent-audio-loans-per-borrower"
                    >
                      {t("patronPageStatusSectionOutOfText", {
                        placeholders: {
                          "@this": patronAudioBookLoans,
                          "@that": maxConcurrentAudioLoansPerBorrower
                        }
                      })}
                    </div>
                  )}
                </div>
                <div className="dpl-progress-bar__progress-bar bg-global-secondary">
                  {maxConcurrentAudioLoansPerBorrower !== undefined && (
                    <div
                      role="figure"
                      aria-label={t(
                        "patronPageStatusSectionOutOfAriaLabelAudioBooksText",
                        {
                          placeholders: {
                            "@this": patronEbookLoans,
                            "@that": maxConcurrentAudioLoansPerBorrower
                          }
                        }
                      )}
                      className="bg-identity-primary"
                      style={{ width: `${audioBookLoanPercent}%` }}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </section>
  );
};

export default StatusSection;
