describe("Cover", () => {
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
    cy.visit("/iframe.html?args=&id=components-cover--item&viewMode=story");
    cy.get("img").should(
      "have.attr",
      "src",
      "https://res.cloudinary.com/dandigbib/image/upload/t_ddb_cover_small/v1605727140/bogportalen.dk/9781848485532.jpg"
    );
  });
  it("Shows an alt text if there is a description", () => {
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
      "/iframe.html?args=description:description&id=components-cover--item&viewMode=story"
    );
    cy.get("img").should("have.attr", "alt", "description");
  });

  it("Use <a> if there is an url", () => {
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
      "/iframe.html?args=url:%2F&id=components-cover--item&viewMode=story"
    );
    cy.get("a").should("have.attr", "href", "http://localhost:57021/");
  });
});

export {};
