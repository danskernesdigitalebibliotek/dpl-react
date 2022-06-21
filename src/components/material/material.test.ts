describe("Material cover", () => {
  it("Loads a cover (default is small)", () => {
    cy.intercept("GET", "**/api/v2/covers?**", {
      statusCode: 200,
      body: [
        {
          id: "870970-basis:45234401",
          type: "pid",
          imageUrls: {
            original: {
              url: "https://res.cloudinary.com/dandigbib/image/upload/v1605727140/bogportalen.dk/9781848485532.jpg",
              format: "jpeg",
              size: "original"
            },
            small: {
              url: "https://res.cloudinary.com/dandigbib/image/upload/t_ddb_cover_small/v1605727140/bogportalen.dk/9781848485532.jpg",
              format: "jpeg",
              size: "small"
            },
            medium: {
              url: "https://res.cloudinary.com/dandigbib/image/upload/t_ddb_cover_medium/v1605727140/bogportalen.dk/9781848485532.jpg",
              format: "jpeg",
              size: "medium"
            },
            large: {
              url: "https://res.cloudinary.com/dandigbib/image/upload/t_ddb_cover_large/v1605727140/bogportalen.dk/9781848485532.jpg",
              format: "jpeg",
              size: "large"
            }
          }
        }
      ]
    });
    cy.visit("/iframe.html?args=&id=atoms-material--item&viewMode=story");
    cy.get("img");
  });
  it("Shows an alt text if there is a materialDescription", () => {
    cy.intercept("GET", "**/api/v2/covers?**", {
      statusCode: 200,
      body: [
        {
          id: "870970-basis:45234401",
          type: "pid",
          imageUrls: {
            small: {
              url: "https://res.cloudinary.com/dandigbib/image/upload/t_ddb_cover_small/v1605727140/bogportalen.dk/9781848485532.jpg",
              format: "jpeg",
              size: "small"
            }
          }
        }
      ]
    });
    cy.visit(
      "/iframe.html?args=materialDescription:description&id=atoms-material--item&viewMode=story"
    );
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(5000);
    cy.get("img[alt='description']");
  });

  it("Use <a> if there is a materialUrl", () => {
    cy.intercept("GET", "**/api/v2/covers?**", {
      statusCode: 200,
      body: [
        {
          id: "870970-basis:45234401",
          type: "pid",
          imageUrls: {
            small: {
              url: "https://res.cloudinary.com/dandigbib/image/upload/t_ddb_cover_small/v1605727140/bogportalen.dk/9781848485532.jpg",
              format: "jpeg",
              size: "small"
            }
          }
        }
      ]
    });
    cy.visit(
      "/iframe.html?args=materialUrl:%2F&id=atoms-material--item&viewMode=story"
    );
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(5000);
    cy.get("a[href='/']");
  });
});

export {};
