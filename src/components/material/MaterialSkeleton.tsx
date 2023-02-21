import React from "react";

const MaterialSkeleton: React.FC = () => {
  return (
    <section className="material-page ssc">
      <header className="material-header">
        <div className="material-header__cover">
          <div className="cover-container">
            <div className="ssc-square" />
          </div>
        </div>
        <div className="material-header__content">
          <div>
            <div className="scc-wrapper">
              <div className="ssc-square mb-32" />
              <div className="ssc-head-line mbs" />
              <div className="ssc-head-line mbs" />
              <div className="ssc-head-line mb-48" />
              <div className="ssc-line w-30">&nbsp;</div>
            </div>
            <div className="scc-wrapper pt-48">
              <div className="ssc-head-line w-80 mbs" />
              <div className="ssc-head-line w-80 mbs" />
              <div className="ssc-line" />
            </div>
          </div>
        </div>
      </header>
      <section className="material-description">
        <div className="ssc-head-line w-20 mb" />
        <div className="ssc-line w-60 mbs" />
        <div className="ssc-line w-60 mbs" />
        <div className="ssc-line w-60 mbs" />
        <div className="ssc-line w-60 mb" />
        <div className="scc-wrapper pt-16">
          <div className="ssc-head-line w-10 mt mb" />
          <div className="ssc-line w-70 mbs" />
          <div className="ssc-line w-70 mbs" />
          <div className="ssc-line w-70 mbs" />
        </div>
        <div className="scc-wrapper pt-64">
          <div className="skeleton-disclosure ssc-head-line mbs" />
          <div className="skeleton-disclosure ssc-head-line mbs" />
          <div className="skeleton-disclosure ssc-head-line mbs" />
        </div>
      </section>
    </section>
  );
};

export default MaterialSkeleton;
