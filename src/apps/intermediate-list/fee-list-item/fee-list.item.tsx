import * as React from "react";
import { FC } from "react";
import { FeeV2 } from "../../../core/fbs/model";
import { FaustId } from "../../../core/utils/types/ids";
import StackableFees from "../stackable-fees/stackable-fees";

export interface FeeListItemProps {
  itemData: any;
}
const FeeListItem: FC<FeeListItemProps> = ({ itemData }) => {
  const { materials } = itemData;
  console.log(itemData);
  return (
    <StackableFees
      amountOfMaterialsWithDueDate={materials.length}
      fee={materials}
      faust={materials[0].recordId as FaustId}
    />
  );
};

export default FeeListItem;

/* // return (
          // <h1>Hello w!</h1>
          // <StackableFees amountOfMaterialsWithDueDate={2} fee={item} />
          // <div className="list-reservation-container">
          //   <div className="list-reservation list-reservation--stacked">
          //     <div className="list-reservation__material">
          //       <div>
          //         <div className="cover-container">
          //           <span className="cover cover--small bg-identity-tint-120 cover__animate">
          //             <img src="images/book_cover_3.jpg" alt="" />
          //           </span>
          //         </div>
          //       </div>
          //       <div className="list-reservation__information">
          //         <div>
          //           <div className="status-label status-label--outline ">
          //             bog
          //           </div>
          //         </div>
          //         <div className="list-reservation__about">
          //           <h3 className="text-header-h4">Audrey Hepburn</h3>
          //           <p className="text-small-caption color-secondary-gray">
          //             Af Isabel Sánchez Vegara, Amaia Arrazola (2018)
          //           </p>
          //         </div>
          //         <button
          //           type="button"
          //           aria-label="note about material"
          //           className="list-reservation__note-desktop color-secondary-gray"
          //         >
          //           + {itemData.length - 1} materialer
          //         </button>
          //       </div>
          //     </div>
          //     <div className="list-reservation__status">
          //       <div className="list-reservation__counter" />
          //       <div>
          //         <div className="list-reservation__deadline">
          //           <div className="status-label status-label--danger ">
          //             afleveret for sent
          //           </div>
          //           <p className="text-small-caption">
          //             Afleveres {item.dueDate}
          //           </p>
          //           <Link
          //             href={new URL("https://www.google.dk")}
          //             className="list-reservation__note-mobile color-secondary-gray"
          //           >
          //             + 3 materialer
          //           </Link>
          //         </div>
          //       </div>
          //       <div className="list-reservation__fee">
          //         <p className="text-body-medium-medium">
          //           Gebyr {item.amount},-
          //         </p>
          //       </div>
          //     </div>
          //   </div>
          // </div>
          // ); */
