import { materialFactory } from "./material.factory";
import type { GetMaterialQuery } from "../../src/core/dbc-gateway/generated/graphql";
import { AccessTypeCodeEnum } from "../../src/core/dbc-gateway/generated/graphql";

/**
 * Helper function to intercept getMaterial GraphQL calls with factory-generated data
 *
 * @example
 * // Basic usage - uses default factory data
 * interceptGetMaterial();
 *
 * @example
 * // Customize the material data
 * interceptGetMaterial({
 *   work: {
 *     titles: {
 *       full: ['Custom Book Title'],
 *     },
 *     creators: [{
 *       __typename: 'Person',
 *       display: 'Custom Author',
 *       nameSort: 'Author, Custom',
 *     }],
 *   },
 * });
 *
 * @example
 * // Create fiction vs non-fiction
 * interceptGetMaterial({
 *   work: {
 *     fictionNonfiction: {
 *       __typename: 'FictionNonfiction',
 *       display: 'faglitteratur',
 *       code: 'NOT_FICTION',
 *     },
 *   },
 * });
 */
export function interceptGetMaterial(overrides?: any) {
  const data = overrides
    ? { ...materialFactory.build(), ...overrides }
    : materialFactory.build();

  // Use the same pattern as cy.interceptGraphql for consistency
  cy.intercept("POST", "**/next*/graphql", (req) => {
    // Check if this is a getMaterial operation using the same logic as hasOperationName
    const pattern = /(query|mutation) (\w+)[(]*/g;
    const matches = pattern.exec(req.body.query);
    const operationName = matches ? matches[2] : null;

    if (operationName === "getMaterial") {
      req.reply({ body: { data } });
    }
  }).as("getMaterial GraphQL operation");
}

/**
 * Helper function to create material data for different material types
 */
export function createMaterialVariant(
  type: "book" | "ebook" | "audiobook" | "periodical" | "music" | "movie"
) {
  const variants = {
    book: {
      work: {
        materialTypes: [
          {
            __typename: "MaterialType",
            materialTypeSpecific: {
              __typename: "SpecificMaterialType",
              display: "bog"
            }
          }
        ],
        manifestations: {
          __typename: "Manifestations",
          all: [
            {
              __typename: "Manifestation",
              materialTypes: [
                {
                  __typename: "MaterialType",
                  materialTypeSpecific: {
                    __typename: "SpecificMaterialType",
                    display: "bog"
                  }
                }
              ],
              accessTypes: [
                {
                  __typename: "AccessType",
                  code: AccessTypeCodeEnum.Physical
                }
              ]
            }
          ]
        }
      }
    },
    ebook: {
      work: {
        materialTypes: [
          {
            __typename: "MaterialType",
            materialTypeSpecific: {
              __typename: "SpecificMaterialType",
              display: "e-bog"
            }
          }
        ],
        manifestations: {
          __typename: "Manifestations",
          all: [
            {
              __typename: "Manifestation",
              materialTypes: [
                {
                  __typename: "MaterialType",
                  materialTypeSpecific: {
                    __typename: "SpecificMaterialType",
                    display: "e-bog"
                  }
                }
              ],
              accessTypes: [
                {
                  __typename: "AccessType",
                  code: AccessTypeCodeEnum.Online
                }
              ]
            }
          ]
        }
      }
    },
    audiobook: {
      work: {
        materialTypes: [
          {
            __typename: "MaterialType",
            materialTypeSpecific: {
              __typename: "SpecificMaterialType",
              display: "lydbog (cd-mp3)"
            }
          }
        ],
        manifestations: {
          __typename: "Manifestations",
          all: [
            {
              __typename: "Manifestation",
              materialTypes: [
                {
                  __typename: "MaterialType",
                  materialTypeSpecific: {
                    __typename: "SpecificMaterialType",
                    display: "lydbog (cd-mp3)"
                  }
                }
              ],
              accessTypes: [
                {
                  __typename: "AccessType",
                  code: AccessTypeCodeEnum.Physical
                }
              ]
            }
          ]
        }
      }
    },
    periodical: {
      work: {
        materialTypes: [
          {
            __typename: "MaterialType",
            materialTypeSpecific: {
              __typename: "SpecificMaterialType",
              display: "tidsskrift"
            }
          }
        ],
        manifestations: {
          __typename: "Manifestations",
          all: [
            {
              __typename: "Manifestation",
              materialTypes: [
                {
                  __typename: "MaterialType",
                  materialTypeSpecific: {
                    __typename: "SpecificMaterialType",
                    display: "tidsskrift"
                  }
                }
              ],
              accessTypes: [
                {
                  __typename: "AccessType",
                  code: AccessTypeCodeEnum.Physical
                }
              ]
            }
          ]
        }
      }
    },
    music: {
      work: {
        materialTypes: [
          {
            __typename: "MaterialType",
            materialTypeSpecific: {
              __typename: "SpecificMaterialType",
              display: "musik (cd)"
            }
          }
        ],
        manifestations: {
          __typename: "Manifestations",
          all: [
            {
              __typename: "Manifestation",
              materialTypes: [
                {
                  __typename: "MaterialType",
                  materialTypeSpecific: {
                    __typename: "SpecificMaterialType",
                    display: "musik (cd)"
                  }
                }
              ],
              accessTypes: [
                {
                  __typename: "AccessType",
                  code: AccessTypeCodeEnum.Physical
                }
              ]
            }
          ]
        }
      }
    },
    movie: {
      work: {
        materialTypes: [
          {
            __typename: "MaterialType",
            materialTypeSpecific: {
              __typename: "SpecificMaterialType",
              display: "film (online)"
            }
          }
        ],
        manifestations: {
          __typename: "Manifestations",
          all: [
            {
              __typename: "Manifestation",
              materialTypes: [
                {
                  __typename: "MaterialType",
                  materialTypeSpecific: {
                    __typename: "SpecificMaterialType",
                    display: "film (online)"
                  }
                }
              ],
              accessTypes: [
                {
                  __typename: "AccessType",
                  code: AccessTypeCodeEnum.Online
                }
              ]
            }
          ]
        }
      }
    }
  };

  return variants[type];
}
