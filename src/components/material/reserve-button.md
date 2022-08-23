# Reserve button

```mermaid
flowchart TD;

UserOnMaterialPage[User is on the material page and the default manifestation is selected]-->1{Is a manifestation <br>selected ?}

1{Is a manifestation <br>selected ?} --Yes--> Button[Button is shown] --> 2{Is the manifestation <br> physical ?}
1{Is a manifestation <br>selected ?} --No--> NoButton[No button is shown]

2{Is the manifestation <br> physical ?} --Yes--> 3{Is the user <br>blocked ?}
2{Is the manifestation <br> physical ?} --No--> ExternalService[We access external service]

3{Is the user <br>blocked ?} --Yes--> ButtonDisabled[The button is disabled]
3{Is the user <br>blocked ?} --No--> ButtonEnabled[The button is enabled] --> 4{Is the <br>selected manifestations <br> reservable ?}

4{Is the <br>selected manifestation <br> reservable ?} --Yes--> ShowButtonWithmaterialType[The button says <br>'Reserve -material type-' / 'Reserver -material type-' <br> + Is disabled]
4{Is the <br>selected manifestation <br> reservable ?} --No--> CannotbeReserved[The button says <br>'Cannot be reserved' / 'Kan ej reserveres' <br> + Is disabled]
