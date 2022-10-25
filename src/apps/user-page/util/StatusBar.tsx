import React, { useEffect, useState, FC } from "react";
import { useGetV1LibraryProfile } from "../../../core/publizon/publizon";
import { LibraryProfile } from "../../../core/publizon/model";

const StatusBar: FC = () => {
  const { data: libraryProfileFetched } = useGetV1LibraryProfile();
  const [libraryProfile, setLibraryProfile] = useState<LibraryProfile | null>(
    null
  );

  useEffect(() => {
    if (libraryProfileFetched) {
      setLibraryProfile(libraryProfileFetched);
    }
  }, [libraryProfileFetched]);

  // Todo where do I get these numbers from?
  const userEbookLoans = 1;
  const userAudioBookLoans = 4;
  const userEbookReservations = 1;
  const userAudioBookReservations = 2;
  let eBookLoanPerent = 100;
  if (libraryProfile?.maxConcurrentEbookLoansPerBorrower) {
    eBookLoanPerent =
      (userEbookLoans / libraryProfile.maxConcurrentEbookLoansPerBorrower) *
      100;
  }
  let audioBookLoanPercent = 100;
  if (libraryProfile?.maxConcurrentAudioLoansPerBorrower) {
    audioBookLoanPercent =
      (userAudioBookLoans / libraryProfile.maxConcurrentAudioLoansPerBorrower) *
      100;
  }

  let eBookReservationPerent = 100;
  if (libraryProfile?.maxConcurrentEbookReservationsPerBorrower) {
    eBookReservationPerent =
      (userEbookReservations /
        libraryProfile.maxConcurrentEbookReservationsPerBorrower) *
      100;
  }
  let audioBookReservationPercent = 100;
  if (libraryProfile?.maxConcurrentAudioReservationsPerBorrower) {
    audioBookReservationPercent =
      (userAudioBookReservations /
        libraryProfile.maxConcurrentAudioReservationsPerBorrower) *
      100;
  }
  return (
    <div className="dpl-status-loans">
      {libraryProfile && (
        <>
          <h2 className="text-body-small-regular mt-32 mb-16">
            DIGITALE LÅN (EREOLEN)
          </h2>
          <div className="text-body-small-regular">
            På mange digitale materialer, er der er begrænsning på, hvor mange
            du kan låne pr. måned. Der findes dog en række materialer uden
            begrænsning.
            <a href="todo" className="text-links">
              Se titler du altid kan låne
            </a>
          </div>
          <div className="dpl-status-loans__column">
            <div className="dpl-status mt-32">
              <h3 className="text-small-caption">Lån pr. måned</h3>
              <div className="dpl-progress-bar text-small-caption color-secondary-gray">
                <div className="dpl-progress-bar__header">
                  <div className="text-label">Ebøger</div>
                  <div className="text-label">
                    {userEbookLoans} ud af
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
                  <div className="text-label">Lydbøger</div>
                  <div className="text-label">
                    {userAudioBookLoans} ud af
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
              <h3 className="text-small-caption">Reserveringer pr. måned</h3>
              <div className="dpl-progress-bar text-small-caption color-secondary-gray">
                <div className="dpl-progress-bar__header">
                  <div className="text-label">Ebøger</div>
                  <div className="text-label">
                    {userEbookReservations} ud af
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
                  <div className="text-label">Lydbøger</div>
                  <div className="text-label">
                    {userAudioBookReservations} ud af
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
