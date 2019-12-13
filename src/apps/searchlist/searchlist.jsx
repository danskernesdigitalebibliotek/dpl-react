import React from "react";
import PropTypes from "prop-types";
import urlPropType from "url-prop-type";
import dayjs from "dayjs";
import { FixedSizeList } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import faker from "faker";
import replaceTags from "../../core/replaceTags";
import ListItem from "../../components/list-item/list-item";
import Skeleton, { getList } from "../../components/atoms/skeleton/skeleton";
import UnorderedList from "../../components/atoms/list/list";
import Button from "../../components/atoms/button/button";
import SimpleMaterial from "../../components/simple-material/simple-material";

const fake = getList(10000).map(() => {
  return {
    creators: getList(4).map(() => faker.name.findName()),
    pid: faker.random.uuid(),
    title: faker.commerce.productName(),
    type: faker.commerce.productMaterial(),
    year: faker.date.month(),
    coverUrl: faker.image.avatar()
  };
});

function SkeletonElement(_, index) {
  return (
    <ListItem
      key={index}
      aside={
        <>
          <Skeleton width="130px" height="50px" />
          <Skeleton width="130px" height="50px" />
        </>
      }
    >
      <div className="ddb-searchlist__container">
        <Skeleton height="30px" width="95px" mb="12px" />
        <Skeleton width="60px" mb="12px" />
        <Skeleton width="145px" />
      </div>
    </ListItem>
  );
}

function Searchlist({
  searches,
  loading,
  newButtonText,
  removeButtonText,
  searchUrl,
  statusText,
  materials,
  onOpenMaterials,
  onCloseMaterials,
  authorUrl,
  materialUrl
}) {
  if (loading === "active") {
    return <UnorderedList>{getList(8).map(SkeletonElement)}</UnorderedList>;
  }
  return (
    <UnorderedList>
      {searches.map(search => {
        const isOpen = materials.some(
          material => material.id === search.id && material.open
        );
        const onMaterialClick = () =>
          !isOpen ? onOpenMaterials(search.id) : onCloseMaterials(search.id);
        return (
          <ListItem
            className="ddb-searchlist__item"
            key={search.id}
            containerClass="ddb-searchlist__container"
            childrenClass="ddb-searchlist__children"
            aside={
              <>
                {search.hit_count > 0 && (
                  <Button
                    className="ddb-searchlist__new-button"
                    variant="charcoal"
                    onClick={onMaterialClick}
                  >
                    {newButtonText}
                  </Button>
                )}
                <Button>{removeButtonText}</Button>
              </>
            }
            footerClass="ddb-searchlist__materials"
            footer={
              isOpen && (
                <AutoSizer>
                  {({ width, height }) => (
                    <FixedSizeList
                      className="ddb-searchlist__scroll"
                      layout="horizontal"
                      itemCount={fake.length}
                      itemSize={320}
                      height={height}
                      width={width}
                    >
                      {({ style, index }) => (
                        <SimpleMaterial
                          authorUrl={authorUrl}
                          materialUrl={materialUrl}
                          style={style}
                          item={fake[index]}
                        />
                      )}
                    </FixedSizeList>
                  )}
                </AutoSizer>
              )
            }
          >
            <h2 className="ddb-searchlist__header">
              <a
                href={replaceTags({
                  text: searchUrl,
                  tags: {
                    query: search.query
                  }
                })}
              >
                {search.title}
              </a>
            </h2>
            <p className="ddb-searchlist__query">{search.query}</p>
            {search.hit_count > 0 && (
              <p className="ddb-searchlist__status">
                {replaceTags({
                  text: statusText,
                  tags: {
                    hit_count: search.hit_count
                  }
                })}{" "}
                <time dateTime={search.last_seen}>
                  {dayjs(search.last_seen).format("DD/MM-YYYY")}
                </time>
                .
              </p>
            )}
          </ListItem>
        );
      })}
    </UnorderedList>
  );
}

Searchlist.propTypes = {
  loading: PropTypes.oneOf(["inactive", "active", "finished", "failed"]),
  materials: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      open: PropTypes.bool.isRequired
    })
  ).isRequired,
  onOpenMaterials: PropTypes.func.isRequired,
  onCloseMaterials: PropTypes.func.isRequired,
  statusText: PropTypes.string.isRequired,
  newButtonText: PropTypes.string.isRequired,
  removeButtonText: PropTypes.string.isRequired,
  searchUrl: PropTypes.string.isRequired,
  materialUrl: urlPropType.isRequired,
  authorUrl: urlPropType.isRequired,
  searches: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      hit_count: PropTypes.number.isRequired,
      last_seen: PropTypes.string.isRequired,
      query: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired
    })
  ).isRequired
};

Searchlist.defaultProps = {
  loading: "inactive"
};

export default Searchlist;
