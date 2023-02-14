import React, { useEffect, useState, FC } from "react";
import {
  useGetV1LibraryProfile,
  useGetV1UserLoans
} from "../../../core/publizon/publizon";
import { LibraryProfile, UserData } from "../../../core/publizon/model";
import { useText } from "../../../core/utils/text";
import { useUrls } from "../../../core/utils/url";
import { Link } from "../../../components/atoms/link";

const StatusSection: FC = () => {
  const t = useText();
  const { alwaysAvailableEreolenUrl } = useUrls();
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
    maxConcurrentAudioReservationsPerBorrower,
    maxConcurrentEbookReservationsPerBorrower
  } = libraryProfile || {};

  let patronEbookLoans = 0;
  if (patronData?.ebookLoansRemaining) {
    patronEbookLoans = Math.abs(patronData?.ebookLoansRemaining) || 0;
  }
  let patronAudioBookLoans = 0;
  if (patronData?.audiobookLoansRemaining) {
    patronAudioBookLoans = Math.abs(patronData?.audiobookLoansRemaining) || 0;
  }
  let eBookLoanPerent = 100;
  if (maxConcurrentEbookLoansPerBorrower) {
    eBookLoanPerent =
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
          <h2 className="text-body-small-regular mt-32 mb-16">
            {t("patronPageStatusSectionHeaderText")}
          </h2>
          <div className="text-body-small-regular">
            {t("patronPageStatusSectionBodyText")}{" "}
            <Link href={alwaysAvailableEreolenUrl}>
              {t("patronPageStatusSectionLinkText")}
            </Link>
          </div>
          {maxConcurrentEbookReservationsPerBorrower &&
            maxConcurrentAudioReservationsPerBorrower && (
              <div className="text-body-small-regular">
                {t("patronPageStatusSectionReservationsText", {
                  placeholders: {
                    "@countEbooks": maxConcurrentEbookReservationsPerBorrower,
                    "@countAudiobooks":
                      maxConcurrentAudioReservationsPerBorrower
                  }
                })}
              </div>
            )}
          <div className="dpl-status-loans__column">
            <div className="dpl-status mt-32">
              <h3 className="text-small-caption">
                {t("patronPageStatusSectionLoanHeaderText")}
              </h3>
              <div className="dpl-progress-bar text-small-caption color-secondary-gray">
                <div className="dpl-progress-bar__header">
                  <div className="text-label text-body-medium-medium">
                    {t("patronPageStatusSectionLoansEbooksText")}
                  </div>
                  {maxConcurrentEbookLoansPerBorrower && (
                    <div className="text-label">
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
                  {maxConcurrentEbookLoansPerBorrower && (
                    <div
                      className="bg-identity-primary"
                      role="img"
                      aria-label={t(
                        "patronPageStatusSectionOutOfAriaLabelEbooksText",
                        {
                          placeholders: {
                            "@this": patronEbookLoans,
                            "@that": maxConcurrentEbookLoansPerBorrower
                          }
                        }
                      )}
                      style={{ width: `${eBookLoanPerent}%` }}
                    />
                  )}
                </div>
              </div>
              <div className="dpl-progress-bar text-small-caption color-secondary-gray">
                <div className="dpl-progress-bar__header">
                  <div className="text-label">
                    {t("patronPageStatusSectionLoansAudioBooksText")}
                  </div>
                  {maxConcurrentAudioLoansPerBorrower && (
                    <div
                      className="text-label"
                      aria-label={t(
                        "patronPageStatusSectionOutOfAriaLabelAudioBooksText",
                        {
                          placeholders: {
                            "@this": patronAudioBookLoans,
                            "@that": maxConcurrentAudioLoansPerBorrower
                          }
                        }
                      )}
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
                <div
                  aria-hidden
                  className="dpl-progress-bar__progress-bar bg-global-secondary"
                >
                  <div
                    className="bg-identity-primary"
                    style={{ width: `${audioBookLoanPercent}%` }}
                  />
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
