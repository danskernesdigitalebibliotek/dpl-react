# Reserve button

```mermaid
flowchart TD;

Start[User is on the material page and the default manifestation is selected]
-->1{Is a manifestation selected ?}

1{Is a manifestation selected ?}
--Yes--> Button[Button is shown] --> 2{Is the manifestation  physical ?}
1{Is a manifestation selected ?}
--No--> NoButton[No button is shown]

2{Is the manifestation  physical ?}
--Yes--> 3{Is the user blocked ?}
2{Is the manifestation  physical ?}
--No--> ExternalService[We access external service]

3{Is the user blocked ?} --Yes--> ButtonDisabled[The button is disabled]
3{Is the user blocked ?} --No--> ButtonEnabled[The button is enabled]
--> 4{Is the selected manifestations  reservable ?}

4{Is the selected manifestation  reservable ?}
--Yes--> ShowBtn[The button says 'Reserver -material type-'  + Is disabled]
4{Is the selected manifestation  reservable ?}
--No--> CannotbeReserved[The button says 'Kan ej reserveres' + Is disabled]
