# Reserve button

```mermaid
flowchart TD;

Start[User is on the material page and the default manifestation is selected]
-->1{Is a manifestation selected ? /Do we have any manifestation data/}

1{Is a manifestation selected ? /Do we have any manifestation data/}
--Yes--> Button[Button is shown]
--> 2{Is the manifestation physical ?}
1{Is a manifestation selected ? /Do we have any manifestation data/}
--No--> NoButton[No button is shown]

2{Is the manifestation physical ?} --Yes--> 3{Is the user blocked ?}
2{Is the manifestation physical ?}
--No--> ExternalService[Reserving using an external service]
-->5{Does the manifestation have origin and url?}

3{Is the user blocked ?} --Yes--> ButtonDisabled[The button is disabled]
3{Is the user blocked ?} --No--> ButtonEnabled[The button is enabled]
--> 4{Is the selected manifestations reservable ?}

4{Is the selected manifestation reservable ?} --Yes-->
ButtonWithType[The button says 'Reserve /material type/' + is enabled]
4{Is the selected manifestation reservable ?} --No-->
CannotbeReserved[The button says 'Cannot be reserved' + Is disabled]

5{Does the manifestation have origin and url?}
--Yes--> Ereol[The button says: 'Go to + origin' e.g. 'Gå til ereolen]
5{Does the manifestation have origin and url?}
--No--> 6{Does the manifestation have an issn digital article id?}

6{Does the manifestation have an issn digital article id?}
--yes--> DigitalArticle[The button says: 'Order digital copy']
6{Does the manifestation have an issn digital article id?}
--No--> InfomediaArticle[The button says 'See online']
