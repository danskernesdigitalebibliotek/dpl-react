function getWork(amount = 12) {
  return [
    {
      dcTitleFull: ["Dragerne vågner"],
      pid: ["870970-basis:47248655"],
      creator: ["Angie Sage"],
      typeBibDKType: ["Bog"],
      date: ["2019"]
    },
    {
      dcTitleFull: ["Lærlingen"],
      pid: ["870970-basis:47450527"],
      creator: ["Hanne Rump"],
      typeBibDKType: ["Bog"],
      date: ["2020"]
    },
    {
      dcTitleFull: ["Indlagt på dødens hospital"],
      pid: ["870970-basis:47664705"],
      creator: ["Bjarke Schjødt Larsen"],
      typeBibDKType: ["Bog"],
      date: ["2020"]
    },
    {
      dcTitleFull: ["Good luck girls"],
      pid: ["870970-basis:47593638"],
      creator: ["Charlotte Nicole Davis"],
      typeBibDKType: ["Bog"],
      date: ["2020"]
    },
    {
      dcTitleFull: ["Isens Stav"],
      pid: ["870970-basis:47679907"],
      creator: ["Anders Christian Meidahl"],
      typeBibDKType: ["Bog"],
      date: ["2020"]
    },
    {
      dcTitleFull: ["En slange i dybet"],
      pid: ["870970-basis:47811406"],
      creator: ["Nicole Boyle Rødtnes"],
      typeBibDKType: ["Bog"],
      date: ["2020"]
    },
    {
      dcTitleFull: ["Enhjørningefeerne - den fortryllede flod"],
      pid: ["870970-basis:46365674"],
      creator: ["Zanna Davidson"],
      typeBibDKType: ["Bog"],
      date: ["2019"]
    },
    {
      dcTitleFull: ["Ild og vand"],
      pid: ["710100-katalog:25929802"],
      creator: ["Kathrine Louise Nielsen"],
      typeBibDKType: ["Bog"],
      date: ["2005"]
    },
    {
      dcTitleFull: ["Drømmefanger"],
      pid: ["870970-basis:47661927"],
      creator: ["Christian Kronow"],
      typeBibDKType: ["Bog"],
      date: ["2020"]
    },
    {
      dcTitleFull: ["Gudernes krig - den knuste gud"],
      pid: ["870970-basis:47806119"],
      creator: ["Henriette Hesselholdt"],
      typeBibDKType: ["Bog"],
      date: ["2020"]
    },
    {
      dcTitleFull: ["Skolen med magiske dyr - sød musik?!"],
      pid: ["870970-basis:47714168"],
      creator: ["Margit Auer"],
      typeBibDKType: ["Bog"],
      date: ["2020"]
    },
    {
      dcTitleFull: ["Mysteriet om de forsvundne tryllestave"],
      pid: ["870970-basis:47820979"],
      typeBibDKType: ["Lydbog (net)"],
      date: ["2020"]
    }
  ].slice(0, amount - 1);
}

function getCover(amount = 10) {
  return [
    {
      id: "870970-basis:47664705",
      type: "pid",
      imageUrls: {
        large: {
          url:
            "https://res.cloudinary.com/dandigbib/image/upload/t_ddb_cover_large/v1580475253/bogportalen.dk/9788772143804.jpg",
          format: "jpeg",
          size: "large"
        }
      }
    },
    {
      id: "870970-basis:46365674",
      type: "pid",
      imageUrls: {
        large: {
          url:
            "https://res.cloudinary.com/dandigbib/image/upload/t_ddb_cover_large/v1575217601/bogportalen.dk/9788762731103.jpg",
          format: "jpeg",
          size: "large"
        }
      }
    },
    {
      id: "870970-basis:47714168",
      type: "pid",
      imageUrls: {
        large: {
          url:
            "https://res.cloudinary.com/dandigbib/image/upload/t_ddb_cover_large/v1580477087/bogportalen.dk/9788772053264.jpg",
          format: "jpeg",
          size: "large"
        }
      }
    },
    {
      id: "870970-basis:47248655",
      type: "pid",
      imageUrls: {
        large: {
          url:
            "https://res.cloudinary.com/dandigbib/image/upload/t_ddb_cover_large/v1575214321/bogportalen.dk/9788741508146.jpg",
          format: "jpeg",
          size: "large"
        }
      }
    },
    {
      id: "870970-basis:47593638",
      type: "pid",
      imageUrls: {
        large: {
          url:
            "https://res.cloudinary.com/dandigbib/image/upload/t_ddb_cover_large/v1580478413/bogportalen.dk/9788702264524.jpg",
          format: "jpeg",
          size: "large"
        }
      }
    },
    {
      id: "870970-basis:47679907",
      type: "pid",
      imageUrls: {
        large: {
          url:
            "https://res.cloudinary.com/dandigbib/image/upload/t_ddb_cover_large/v1580475188/bogportalen.dk/9788740661279.jpg",
          format: "jpeg",
          size: "large"
        }
      }
    },
    {
      id: "870970-basis:47450527",
      type: "pid",
      imageUrls: {
        large: {
          url:
            "https://res.cloudinary.com/dandigbib/image/upload/t_ddb_cover_large/v1575214074/bogportalen.dk/9788793728233.jpg",
          format: "jpeg",
          size: "large"
        }
      }
    },
    {
      id: "870970-basis:47811406",
      type: "pid",
      imageUrls: {
        large: {
          url:
            "https://res.cloudinary.com/dandigbib/image/upload/t_ddb_cover_large/v1580475133/bogportalen.dk/9788741510415.jpg",
          format: "jpeg",
          size: "large"
        }
      }
    },
    {
      id: "870970-basis:47661927",
      type: "pid",
      imageUrls: {
        large: {
          url:
            "https://res.cloudinary.com/dandigbib/image/upload/t_ddb_cover_large/v1580476960/bogportalen.dk/9788772187471.jpg",
          format: "jpeg",
          size: "large"
        }
      }
    },
    {
      id: "870970-basis:47806119",
      type: "pid",
      imageUrls: {
        large: {
          url:
            "https://res.cloudinary.com/dandigbib/image/upload/t_ddb_cover_large/v1580475217/bogportalen.dk/9788758836713.jpg",
          format: "jpeg",
          size: "large"
        }
      }
    }
  ].slice(0, amount);
}

describe("Related Materials", () => {
  it("Should show an explianer text", () => {
    cy.visit("/iframe.html?id=apps-related-materials--entry");
    cy.contains("Forslag");
  });
  it("Should show a link that leads to the full suggested search", () => {
    cy.visit("/iframe.html?id=apps-related-materials--entry");
    cy.contains("Søg")
      .should("have.attr", "href")
      .and("include", "magi");
  });
  it("Should show loading elements for the requested amount of materials", () => {
    cy.server();
    cy.route({
      method: "GET",
      url: "https://openplatform.dbc.dk/v3/search*",

      status: 200,
      response: {
        statusCode: 200,
        data: getWork(12),
        hitCount: 2826,
        more: true
      }
    });
    cy.visit("/iframe.html?id=apps-related-materials--entry");
    cy.get(".ddb-related-material__skeleton").should("have.length", 10);
  });
  it("Should show the requested amount of images and links", () => {
    cy.server();
    cy.route({
      method: "GET",
      url: "https://openplatform.dbc.dk/v3/search*",

      status: 200,
      response: {
        statusCode: 200,
        data: getWork(12),
        hitCount: 2826,
        more: true
      }
    });
    cy.route({
      method: "GET",
      url: "https://cover.dandigbib.org/api/v2/covers*",
      status: 200,
      response: getCover(10)
    });
    cy.visit("/iframe.html?id=apps-related-materials--entry");
    cy.get("a.ddb-related-material").should("have.length", 10);
  });

  it("Should show a subset of requested images and links", () => {
    cy.server();
    cy.route({
      method: "GET",
      url: "https://openplatform.dbc.dk/v3/search*",

      status: 200,
      response: {
        statusCode: 200,
        data: getWork(12),
        hitCount: 2826,
        more: true
      }
    });

    // Only returns 5 covers
    cy.route({
      method: "GET",
      url: "https://cover.dandigbib.org/api/v2/covers*",
      status: 200,
      response: getCover(5)
    });
    cy.visit("/iframe.html?id=apps-related-materials--entry");
    cy.get("a.ddb-related-material").should("have.length", 5);
    cy.get(".ddb-related-material__skeleton").should("have.length", 5);
  });

  it("Should not show covers without image urls", () => {
    cy.server();
    cy.route({
      method: "GET",
      url: "https://openplatform.dbc.dk/v3/search*",

      status: 200,
      response: {
        statusCode: 200,
        data: getWork(12),
        hitCount: 2826,
        more: true
      }
    });

    // Make one cover behave as if no image existed for the large size with
    // is used by the app.
    function withNullCover(covers) {
      const nullCover = covers.shift();
      nullCover.imageUrls.large.url = null;
      return [nullCover, ...covers];
    }

    cy.route({
      method: "GET",
      url: "https://cover.dandigbib.org/api/v2/covers*",
      status: 200,
      response: withNullCover(getCover(11))
    });
    cy.visit("/iframe.html?id=apps-related-materials--entry");
    cy.get("a.ddb-related-material").should("have.length", 10);
    cy.get(".ddb-related-material img:not([src])").should("have.length", 0);
  });

  it("Should show a blank screen on failure", () => {
    cy.server();
    cy.route({
      method: "GET",
      url: "https://openplatform.dbc.dk/v3/search*",

      status: 200,
      response: {
        statusCode: 200,
        data: [],
        hitCount: 2826,
        more: true
      }
    });

    cy.route({
      method: "GET",
      url: "https://cover.dandigbib.org/api/v2/covers*",
      status: 400,
      response: {
        type: "https://tools.ietf.org/html/rfc2616#section-10",
        title: "An error occured",
        detail: 'The "id" paramater is required'
      }
    });
    cy.visit("/iframe.html?id=apps-related-materials--entry");
    cy.get(".ddb-related-material__skeleton").should("have.length", 10);
    cy.contains("Søg");
    cy.contains("Forslag");
    cy.get("a.ddb-related-material").should("have.length", 0);
    cy.contains("Søg").should("not.exist");
    cy.contains("Forslag").should("not.exist");
  });
});
