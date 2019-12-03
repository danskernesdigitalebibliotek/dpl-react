import React from "react";
import PropTypes from "prop-types";
import Skeleton from "../../components/atoms/skeleton/skeleton";
import Button from "../../components/atoms/button/button";
import UnorderedList from "../../components/atoms/list/list";
import Alert from "../../components/alert/alert";
import createPath from "../../core/createPath";

function getList(length) {
  return Array.from(new Array(length));
}

function SkeletonElement() {
  return (
    <li className="ddb-list__item">
      <section className="ddb-list__inner">
        <article className="ddb-list__content">
          <figure className="ddb-list__cover">
            <Skeleton br="0px" mb="0px" mt="0px" height="154px" width="100px" />
          </figure>
          <div className="ddb-list__data">
            <Skeleton width="45px" mb="12px" />
            <Skeleton width="145px" mb="12px" />
            <Skeleton width="95px" />
          </div>
        </article>
        <aside className="ddb-list__button ddb-list__button--remove">
          <Skeleton width="151px" height="50px" className="ddb-btn" />
        </aside>
      </section>
    </li>
  );
}

function Checklist({
  loading,
  items,
  onRemove,
  materialUrl,
  authorUrl,
  removeButtonText
}) {
  if (loading === "active") {
    return (
      <UnorderedList className="ddb-skeleton-wrapper">
        {getList(4).map(SkeletonElement)}
      </UnorderedList>
    );
  }

  if (loading === "finished" && items.length === 0) {
    return <Alert type="polite" message="No items on the list!" />;
  }

  return (
    <UnorderedList>
      {items.map(item => (
        <li key={item.pid} className="ddb-list__item">
          <section className="ddb-list__inner">
            <article className="ddb-list__content">
              <figure className="ddb-list__cover">
                <a
                  href={createPath({
                    url: materialUrl,
                    property: ":pid",
                    value: item.pid
                  })}
                >
                  <img src={item.coverUrlThumbnail} alt={item.title} />
                </a>
              </figure>
              <div className="ddb-list__data">
                {item.type}
                <a
                  href={createPath({
                    url: materialUrl,
                    property: ":pid",
                    value: item.pid
                  })}
                >
                  <h2>{item.title}</h2>
                </a>
                <p>
                  {item.creator.map((creator, index) => {
                    return (
                      <span>
                        <a
                          href={createPath({
                            url: authorUrl,
                            property: ":author",
                            value: creator
                          })}
                        >
                          {creator}
                        </a>
                        {item.creator[index + 1] ? ", " : " "}
                      </span>
                    );
                  })}
                  ({item.year})
                </p>
              </div>
            </article>
            <aside className="ddb-list__button ddb-list__button--remove">
              <Button
                className="ddb-btn--charcoal"
                onClick={() => onRemove(item.pid)}
              >
                {removeButtonText}
              </Button>
            </aside>
          </section>
        </li>
      ))}
    </UnorderedList>
  );
}

Checklist.defaultProps = {
  items: [],
  loading: "inactive",
  removeButtonText: "Fjern fra listen"
};

Checklist.propTypes = {
  loading: PropTypes.oneOf(["inactive", "active", "finished"]),
  items: PropTypes.arrayOf(
    PropTypes.shape({
      creator: PropTypes.string,
      title: PropTypes.string,
      type: PropTypes.string,
      year: PropTypes.number
    })
  ),
  onRemove: PropTypes.func.isRequired,
  materialUrl: PropTypes.string.isRequired,
  authorUrl: PropTypes.string.isRequired,
  removeButtonText: PropTypes.string
};

export default Checklist;
