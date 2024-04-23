export const feesData = [
  {
    feeId: 434536,
    type: "fee",
    reasonMessage: "Gebyr (for sent)",
    amount: 70,
    dueDate: "2022-05-08",
    creationDate: "2022-04-06",
    paidDate: null,
    payableByClient: true,
    materials: [
      {
        materialItemNumber: "5237124059",
        recordId: "48724566",
        periodical: null,
        materialGroup: {
          name: "standard",
          description: "31 dages lånetid til alm lånere"
        }
      },
      {
        materialItemNumber: "5119382558",
        recordId: "52518563",
        periodical: null,
        materialGroup: {
          name: "standard",
          description: "31 dages lånetid til alm lånere"
        }
      },
      {
        materialItemNumber: "5324175956",
        recordId: "38540335",
        periodical: null,
        materialGroup: {
          name: "standard",
          description: "31 dages lånetid til alm lånere"
        }
      }
    ]
  },
  {
    feeId: 306404,
    type: "fee",
    reasonMessage: "Gebyr (for sent)",
    amount: 2.56,
    dueDate: "2020-04-15",
    creationDate: "2019-10-18",
    paidDate: null,
    payableByClient: true,
    materials: [
      {
        materialItemNumber: "3839631447",
        recordId: "26285283",
        periodical: null,
        materialGroup: {
          name: "standard",
          description: "31 dages lånetid til alm lånere"
        }
      }
    ]
  }
];

export const workData = {
  data: {
    manifestation: {
      pid: "870970-basis:22629344",
      titles: { full: ["Dummy Some Title"] },
      abstract: ["Dummy Some abstract ..."],
      edition: {
        summary: "3. udgave, 1. oplag (2019)",
        publicationYear: {
          display: "2006"
        }
      },
      materialTypes: [{ materialTypeSpecific: { display: "Dummy bog" } }],
      creators: [
        { display: "Dummy Jens Jensen" },
        { display: "Dummy Some Corporation" }
      ]
    }
  }
};

export const physicalLoansDataWithOverdue = [
  {
    isRenewable: true,
    renewalStatusList: ["deniedOtherReason"],
    isLongtermLoan: false,
    loanDetails: {
      loanId: 956250508,
      materialItemNumber: "3846990827",
      recordId: "28847238",
      periodical: null,
      loanDate: "2022-10-16T16:43:25.325",
      // Should have been handed in yesterday, renders a overdue-warning
      dueDate: "2021-10-20",
      loanType: "loan",
      ilBibliographicRecord: null,
      materialGroup: {
        name: "fon2",
        description: "Flere CD-plader"
      }
    }
  }
];

export const physicalLoansDataNoOverdue = [
  {
    isRenewable: true,
    renewalStatusList: ["deniedOtherReason"],
    isLongtermLoan: false,
    loanDetails: {
      loanId: 956250508,
      materialItemNumber: "3846990827",
      recordId: "28847238",
      periodical: null,
      loanDate: "2022-10-16T16:43:25.325",
      // Should have been handed in yesterday, renders a overdue-warning
      dueDate: "2222-10-20",
      loanType: "loan",
      ilBibliographicRecord: null,
      materialGroup: {
        name: "fon2",
        description: "Flere CD-plader"
      }
    }
  }
];

export const digitalLoansData = {
  loans: [
    {
      orderId: "082bb01a-8979-424b-93a6-7cc7081f8a45",
      orderNumber: "0c5a287f-be96-4a68-a85a-453864b330cd",
      orderDateUtc: "2022-10-20T06:32:30Z",
      loanExpireDateUtc: "2022-10-24T06:32:30Z",
      isSubscriptionLoan: false,
      libraryBook: {
        identifier: "9788771076940",
        identifierType: 15,
        title: "Tættere end man tror",
        publishersName: "Jentas"
      },
      fileExtensionType: 3
    }
  ]
};

export default {};
