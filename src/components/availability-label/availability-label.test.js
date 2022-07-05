describe("Availability Label", () => {
  it("shows that at least one of the materials is available", () => {
    cy.intercept(
      "GET",
      "**/external/agencyid/catalog/availability/v3?recordid=62523611&recordid=62150041&recordid=61435867",
      {
        statusCode: 200,
        body: [
          {
            recordId: "62523611",
            reservable: true,
            available: false,
            reservations: 10
          },
          {
            recordId: "62150041",
            reservable: true,
            available: false,
            reservations: 6
          },
          {
            recordId: "61435867",
            reservable: true,
            available: true,
            reservations: 0
          }
        ]
      }
    );
    cy.visit(
      "iframe.html?code=7ebccf5b1adc38fe7970e645657efa314c9f9f84&id=components-availability-label--more-than-one-id&viewMode=story"
    );
    cy.contains("available");
  });
  it("shows that the material is not available", () => {
    cy.intercept("GET", "**/external/agencyid/catalog/availability/v3?**", {
      statusCode: 200,
      body: [
        {
          recordId: "12345678",
          reservable: false,
          available: false,
          reservations: 0
        }
      ]
    });
    cy.visit(
      "iframe.html?code=7ebccf5b1adc38fe7970e645657efa314c9f9f84&id=components-availability-label--more-than-one-id&viewMode=story"
    );
    cy.contains("unavailable");
  });
});
