# Skeleton screens

In order to improve both UX and the performance score you can choose to use
skeleton screens in situation where you need to fill the interface
with data from a requests to an external service.

## Main Purpose

The skeleton screens are being showed instantly in order to deliver
some content to the end user fast while loading data.
When the data is arriving the skeleton screens are being replaced
with the real data.

## How to use it

The skeleton screens are rendered with help from the
[skeleton-screen-css library](https://www.npmjs.com/package/skeleton-screen-css?activeTab=readme).
 By using [ssc classes](https://github.com/nullilac/skeleton-screen-css#example---card)
 you can easily compose screens
 that simulate the look of a "real" rendering with real data.

### Example

In this example we are showing a search result item as a skeleton screen.
The skeleton screen consists of a cover, a headline and two lines of text.
In this case we wanted to maintain the styling of the .search-result-item
wrapper. And show the skeleton screen elements by using ssc classes.

```tsx
import React from "react";

const SearchResultListItemSkeleton: React.FC = () => {
  return (
    <article className="search-result-item ssc">
      <div className="ssc-square">&nbsp;</div>
      <div className="ssc-wrapper w-80">
        <div className="ssc-head-line w-60 mb" />
        <div className="ssc-line w-60 mbs">&nbsp;</div>
        <div className="ssc-line w-60 mbs">&nbsp;</div>
      </div>
    </article>
  );
};

export default SearchResultListItemSkeleton;
