# Flow of Instant Loan functionality

## Dpl CMS holding instant book threshold

It is possible in the administration area to configure the amount of
instant books that should be available on a branch in order to decide
the availability of the material (`instantBookThreshold`).

## InstantLoan component visibility/rendering

We have a manifestation with a faust identifier (`faustId`).
We have an app data prop with the the threshold for amount of "instant books"
that should be available (`instantBookThreshold`), see above.

By collecting info for following services we know if we should show the
component or not:

### Is the manifestation reservable?

Make a request to useGetAvailabilityV3(`faustId`) to lookup
the properties: `reservable` and `available`.

If the manifestation is `reservable` we DO NOT show the component.
If the manifestation is NOT `reservable` but is `available` we proceed with
another request to get the holdings status on each branch:

### Get amount of books on branches

Make a request to useGetHoldingsV3(`faustId`) to get each branch
and its `holdings`.

#### Flow

We lookup the length of materials on each branch (`branchHolding`)
If all branches have a `branchHolding` that are below the `instantBookThreshold`
DO NOT show the InstantLoan component.

Otherwise we continue:
We show the whole component and the availability status the branches that are available:
If the `branchHolding` is equal to or above the `instantBookThreshold` it is available.
Otherwise it is unavailable.

Also note what kind of data is to be displayed in relation to the availability.
We show not only that the material is available, but the number of materials.

#### useGetAvailabilityV3

```json
[
    {
        "recordId": "29317038",
        "reservable": true, // should be `false`
        "available": true, // should be `true`
        "reservations": 0
    }
]
```

#### useGetHoldingsV3

```json
[
    {
        "recordId": "29317038",
        "reservable": true,
        "reservations": 0,
        "holdings": [
            {
                "branch": {
                    "branchId": "DK-775133",
                    "title": "Bavnehøj"
                },
                "department": {
                    "departmentId": "sko",
                    "title": "Skolebibliotek"
                },
                "location": {
                    "locationId": "fanta",
                    "title": "Fantasy"
                },
                "sublocation": null,
                "materials": [
                    {
                        "itemNumber": "4931573964",
                        "available": false,
                        "periodical": null,
                        "materialGroup": {
                            "name": "skohag",
                            "description": "Bavnehøj (Kolt-Hasselager) Bibliotek"
                        }
                    }
                ]
            },
            {
                "branch": {
                    "branchId": "DK-775147",
                    "title": "Hasle"
                },
                "department": {
                    "departmentId": "bø",
                    "title": "Børn"
                },
                "location": {
                    "locationId": "fanta",
                    "title": "Fantasy"
                },
                "sublocation": null,
                "materials": [
                    {
                        "itemNumber": "5058515193",
                        "available": false,
                        "periodical": null,
                        "materialGroup": {
                            "name": "standard",
                            "description": "31 dages lånetid til alm lånere"
                        }
                    },
                    {
                        "itemNumber": "5058515088",
                        "available": true,
                        "periodical": null,
                        "materialGroup": {
                            "name": "standard",
                            "description": "31 dages lånetid til alm lånere"
                        }
                    }
                ]
            },
            {
                "branch": {
                    "branchId": "DK-775133",
                    "title": "Bavnehøj"
                },
                "department": {
                    "departmentId": "bø",
                    "title": "Børn"
                },
                "location": {
                    "locationId": "fanta",
                    "title": "Fantasy"
                },
                "sublocation": null,
                "materials": [
                    {
                        "itemNumber": "5058515169",
                        "available": false,
                        "periodical": null,
                        "materialGroup": {
                            "name": "standard",
                            "description": "31 dages lånetid til alm lånere"
                        }
                    }
                ]
            },
            {
                "branch": {
                    "branchId": "DK-775126",
                    "title": "Solbjerg"
                },
                "department": {
                    "departmentId": "bø",
                    "title": "Børn"
                },
                "location": {
                    "locationId": "fanta",
                    "title": "Fantasy"
                },
                "sublocation": null,
                "materials": [
                    {
                        "itemNumber": "5058515185",
                        "available": false,
                        "periodical": null,
                        "materialGroup": {
                            "name": "standard",
                            "description": "31 dages lånetid til alm lånere"
                        }
                    }
                ]
            },
            {
                "branch": {
                    "branchId": "DK-775150",
                    "title": "Tilst"
                },
                "department": {
                    "departmentId": "bø",
                    "title": "Børn"
                },
                "location": {
                    "locationId": "fanta",
                    "title": "Fantasy"
                },
                "sublocation": null,
                "materials": [
                    {
                        "itemNumber": "5058515231",
                        "available": true,
                        "periodical": null,
                        "materialGroup": {
                            "name": "standard",
                            "description": "31 dages lånetid til alm lånere"
                        }
                    }
                ]
            },
            {
                "branch": {
                    "branchId": "DK-775100",
                    "title": "Hovedbiblioteket"
                },
                "department": {
                    "departmentId": "bø",
                    "title": "Børn"
                },
                "location": {
                    "locationId": "fanta",
                    "title": "Fantasy"
                },
                "sublocation": null,
                "materials": [
                    {
                        "itemNumber": "5058515207",
                        "available": true,
                        "periodical": null,
                        "materialGroup": {
                            "name": "standard",
                            "description": "31 dages lånetid til alm lånere"
                        }
                    }
                ]
            },
            {
                "branch": {
                    "branchId": "FBS-751031",
                    "title": "Fjernlager 1"
                },
                "department": {
                    "departmentId": "bø",
                    "title": "Børn"
                },
                "location": {
                    "locationId": "fanta",
                    "title": "Fantasy"
                },
                "sublocation": null,
                "materials": [
                    {
                        "itemNumber": "4932071296",
                        "available": true,
                        "periodical": null,
                        "materialGroup": {
                            "name": "standard",
                            "description": "31 dages lånetid til alm lånere"
                        }
                    }
                ]
            },
            {
                "branch": {
                    "branchId": "DK-775149",
                    "title": "Sabro"
                },
                "department": {
                    "departmentId": "bø",
                    "title": "Børn"
                },
                "location": {
                    "locationId": "fanta",
                    "title": "Fantasy"
                },
                "sublocation": null,
                "materials": [
                    {
                        "itemNumber": "4933366036",
                        "available": false,
                        "periodical": null,
                        "materialGroup": {
                            "name": "standard",
                            "description": "31 dages lånetid til alm lånere"
                        }
                    }
                ]
            },
            {
                "branch": {
                    "branchId": "DK-775146",
                    "title": "Harlev"
                },
                "department": {
                    "departmentId": "bø",
                    "title": "Børn"
                },
                "location": {
                    "locationId": "fanta",
                    "title": "Fantasy"
                },
                "sublocation": null,
                "materials": [
                    {
                        "itemNumber": "5058515215",
                        "available": false,
                        "periodical": null,
                        "materialGroup": {
                            "name": "standard",
                            "description": "31 dages lånetid til alm lånere"
                        }
                    }
                ]
            },
            {
                "branch": {
                    "branchId": "DK-775168",
                    "title": "Skødstrup"
                },
                "department": {
                    "departmentId": "bø",
                    "title": "Børn"
                },
                "location": {
                    "locationId": "fanta",
                    "title": "Fantasy"
                },
                "sublocation": null,
                "materials": [
                    {
                        "itemNumber": "4932071326",
                        "available": true,
                        "periodical": null,
                        "materialGroup": {
                            "name": "standard",
                            "description": "31 dages lånetid til alm lånere"
                        }
                    }
                ]
            },
            {
                "branch": {
                    "branchId": "DK-775127",
                    "title": "Tranbjerg"
                },
                "department": {
                    "departmentId": "bø",
                    "title": "Børn"
                },
                "location": {
                    "locationId": "fanta",
                    "title": "Fantasy"
                },
                "sublocation": null,
                "materials": [
                    {
                        "itemNumber": "5058515118",
                        "available": false,
                        "periodical": null,
                        "materialGroup": {
                            "name": "standard",
                            "description": "31 dages lånetid til alm lånere"
                        }
                    }
                ]
            },
            {
                "branch": {
                    "branchId": "DK-775160",
                    "title": "Risskov"
                },
                "department": {
                    "departmentId": "bø",
                    "title": "Børn"
                },
                "location": {
                    "locationId": "fanta",
                    "title": "Fantasy"
                },
                "sublocation": null,
                "materials": [
                    {
                        "itemNumber": "4934155640",
                        "available": false,
                        "periodical": null,
                        "materialGroup": {
                            "name": "standard",
                            "description": "31 dages lånetid til alm lånere"
                        }
                    }
                ]
            },
            {
                "branch": {
                    "branchId": "DK-775167",
                    "title": "Lystrup"
                },
                "department": {
                    "departmentId": "bø",
                    "title": "Børn"
                },
                "location": {
                    "locationId": "fanta",
                    "title": "Fantasy"
                },
                "sublocation": null,
                "materials": [
                    {
                        "itemNumber": "4934155608",
                        "available": true,
                        "periodical": null,
                        "materialGroup": {
                            "name": "standard",
                            "description": "31 dages lånetid til alm lånere"
                        }
                    }
                ]
            },
            {
                "branch": {
                    "branchId": "DK-775140",
                    "title": "Åby"
                },
                "department": {
                    "departmentId": "bø",
                    "title": "Børn"
                },
                "location": {
                    "locationId": "fanta",
                    "title": "Fantasy"
                },
                "sublocation": null,
                "materials": [
                    {
                        "itemNumber": "4934155594",
                        "available": false,
                        "periodical": null,
                        "materialGroup": {
                            "name": "standard",
                            "description": "31 dages lånetid til alm lånere"
                        }
                    }
                ]
            }
        ]
    }
]
```
