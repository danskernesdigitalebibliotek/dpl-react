import React from "react";
import { Work } from "../../../core/utils/types/entities";
import { getNumberInSeries } from "../helper";
import HorizontalTermLine from "../../horizontal-term-line/HorizontalTermLine";
import { constructSearchUrl } from "../../../core/utils/helpers/url";
import { UseTextFunction } from "../../../core/utils/text";

type SeriesListProps = {
  series: Work["series"];
  workId: Work["workId"];
  searchUrl: URL;
  t: UseTextFunction;
};

const SeriesList = ({ series, workId, searchUrl, t }: SeriesListProps) => {
  return (
    <>
      {series.map((serie) => {
        return (
          !!getNumberInSeries(serie, workId) && (
            <HorizontalTermLine
              title={getNumberInSeries(serie, workId) || ""}
              subTitle={t("inSeriesText")}
              linkList={[
                {
                  url: constructSearchUrl(searchUrl, serie.title),
                  term: serie.title
                }
              ]}
              classNames="horizontal-term-line--no-wrap"
            />
          )
        );
      })}
    </>
  );
};

export default SeriesList;
