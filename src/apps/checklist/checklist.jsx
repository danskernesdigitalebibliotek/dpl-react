import React from "react";
import PropTypes from "prop-types";
import Skeleton from "../../components/atoms/skeleton/skeleton";
import Button from "../../components/atoms/button/button";
import UnorderedList from "../../components/atoms/list/list";

function Checklist({ loading, items, onRemove }) {
  if (loading === "active") {
    const createSkeletons = () => {
      const skeletons = [];

      for (let i = 0; i < 4; i += 1) {
        skeletons.push(
          <li className="ddb-list-item">
            <section className="ddb-list-inner">
              <Skeleton
                borderRadius="0"
                mb="0"
                mt="0"
                height="82px"
                width="63px"
                className="ddb-list-cover"
              />
              <article className="ddb-list-content">
                <Skeleton width="45px" mb="12px" />
                <Skeleton width="145px" mb="12px" />
                <Skeleton width="95px" />
              </article>
              <Skeleton width="103px" className="ddb-btn" />
            </section>
          </li>
        );
      }
      return skeletons;
    };

    return <UnorderedList>{createSkeletons()}</UnorderedList>;
  }

  if (loading === "finished" && items.length === 0) {
    return <div>No items on the list!</div>;
  }

  return (
    <UnorderedList>
      {items.map(item => (
        <li key={item.pid} className="ddb-list-item">
          <section className="ddb-list-inner">
            <article className="ddb-list-content">
              <figure className="ddb-list-cover">
                <img src={item.coverUrlThumbnail} alt={item.title} />
              </figure>
              <div className="ddb-list-data">
                {item.type}
                <h2>{item.title}</h2>
                <p>
                  Af {item.creatorAut} ({item.date})
                </p>
              </div>
            </article>
            <aside className="ddb-list-button ddb-list-button__remove">
              <Button
                className="ddb-btn--charcoal"
                onClick={() => onRemove(item.pid)}
              >
                Fjern fra listen
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
  loading: "inactive"
};

Checklist.propTypes = {
  loading: PropTypes.oneOf(["inactive", "active", "finished"]),
  items: PropTypes.arrayOf(PropTypes.object),
  onRemove: PropTypes.func.isRequired
};

export default Checklist;
