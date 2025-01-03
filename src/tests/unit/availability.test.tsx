import { renderHook } from "@testing-library/react-hooks";
import {
  afterEach,
  beforeEach,
  beforeAll,
  describe,
  expect,
  it,
  vi
} from "vitest";
import { act } from "react";
import usePhysicalAvailabilityData from "../../components/availability-label/usePhysicalAvailabilityData";
import { useGetAvailabilityV3 } from "../../core/fbs/fbs";
import { ManifestationMaterialType } from "../../core/utils/types/material-type";
import { useConfig } from "../../core/utils/config";
import {
  useGetV1LoanstatusIdentifier,
  useGetV1ProductsIdentifier
} from "../../core/publizon/publizon";
import useOnlineAvailabilityData from "../../components/availability-label/useOnlineAvailabilityData";

describe("usePhysicalAvailability tests", () => {
  beforeAll(() => {
    vi.mock("../../core/fbs/fbs", () => ({
      useGetAvailabilityV3: vi.fn()
    }));
    vi.mock("../../core/utils/config", () => ({
      useConfig: vi.fn()
    }));

    // Make sure that the config hook returns an array with an empty string.
    // In that way we do not have any blacklisted branches (they are not needed for the test).
    // Typescript does not understand our mocked hook.
    // So we gracefully ignore the error :).
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore-next-line
    useConfig.mockReturnValue(() => [""]);
  });

  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("Test that if one material is a book and is available, the hook returns that the material is available", () => {
    // Typescript does not understand our mocked hook.
    // So we gracefully ignore the error :).
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore-next-line
    useGetAvailabilityV3.mockReturnValue({
      data: [
        {
          recordId: "24859451",
          reservable: true,
          available: true,
          reservations: 0
        },
        {
          recordId: "24859450",
          reservable: true,
          available: false,
          reservations: 0
        }
      ],
      isLoading: false,
      isError: false
    });

    const { result } = renderHook(() =>
      usePhysicalAvailabilityData({
        enabled: true,
        faustIds: ["24859452"],
        manifestText: "bog"
      })
    );

    act(() => {
      expect(result.current).toEqual({
        isLoading: false,
        isAvailable: true
      });
    });
  });

  it("Test that if the material is a book amd no material is available the hook returns that it is unavailable", async () => {
    // Typescript does not understand our mocked hook.
    // So we gracefully ignore the error :).
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore-next-line
    useGetAvailabilityV3.mockReturnValue({
      data: [
        {
          recordId: "24859451",
          reservable: true,
          available: false,
          reservations: 0
        },
        {
          recordId: "24859450",
          reservable: true,
          available: false,
          reservations: 0
        }
      ],
      isLoading: false,
      isError: false
    });

    const { result } = renderHook(() =>
      usePhysicalAvailabilityData({
        enabled: true,
        faustIds: ["24859452"],
        manifestText: "bog"
      })
    );

    act(() => {
      expect(result.current).toEqual({
        isLoading: false,
        isAvailable: false
      });
    });
  });

  it("Test that if the material is an article it will always be available even though the remote service tells otherwise", () => {
    // Typescript does not understand our mocked hook.
    // So we gracefully ignore the error :).
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore-next-line
    useGetAvailabilityV3.mockReturnValue({
      data: [
        {
          recordId: "24859451",
          reservable: true,
          available: false,
          reservations: 0
        },
        {
          recordId: "24859450",
          reservable: true,
          available: false,
          reservations: 0
        }
      ],
      isLoading: false,
      isError: false
    });

    const { result } = renderHook(() =>
      usePhysicalAvailabilityData({
        enabled: true,
        faustIds: ["24859452"],
        manifestText: ManifestationMaterialType.article
      })
    );

    act(() => {
      expect(result.current).toEqual({
        isLoading: false,
        isAvailable: true
      });
    });
  });

  it("Test that if the material is an article it will always be available even though the remote service tells otherwise", () => {
    // Typescript does not understand our mocked hook.
    // So we gracefully ignore the error :).
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore-next-line
    useGetAvailabilityV3.mockReturnValue({
      data: [
        {
          recordId: "24859451",
          reservable: true,
          available: false,
          reservations: 0
        },
        {
          recordId: "24859450",
          reservable: true,
          available: false,
          reservations: 0
        }
      ],
      isLoading: false,
      isError: false
    });

    const { result } = renderHook(() =>
      usePhysicalAvailabilityData({
        enabled: true,
        faustIds: ["24859452"],
        manifestText: ManifestationMaterialType.article
      })
    );

    act(() => {
      expect(result.current).toEqual({
        isLoading: false,
        isAvailable: true
      });
    });
  });

  it("Test that if the hook is not enabled it should return null statuses", () => {
    // Typescript does not understand our mocked hook.
    // So we gracefully ignore the error :).
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore-next-line
    useGetAvailabilityV3.mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: false
    });

    const { result } = renderHook(() =>
      usePhysicalAvailabilityData({
        enabled: false,
        faustIds: ["24859452"],
        manifestText: ManifestationMaterialType.article
      })
    );

    act(() => {
      expect(result.current).toEqual({
        isLoading: null,
        isAvailable: null
      });
    });
  });
});

describe("useOnlineAvailabilityData tests", () => {
  beforeAll(() => {
    vi.mock("../../core/publizon/publizon", async () => {
      const actual =
        (await vi.importActual("../../core/publizon/publizon")) ?? {};
      return {
        // No need for the ts check here.
        // We want to partially mock the module and this is the way to do it.
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        ...actual,
        useGetV1ProductsIdentifier: vi.fn(),
        useGetV1LoanstatusIdentifier: vi.fn()
      };
    });

    // Make sure that the config hook returns an array with an empty string.
    // In that way we do not have any blacklisted branches (they are not needed for the test).
    // Typescript does not understand our mocked hook.
    // So we gracefully ignore the error :).
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore-next-line
    // useConfig.mockReturnValue(() => [""]);
  });

  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("If the useGetV1ProductsIdentifier service tells us that the material is NOT `costFree` (not a blue title) and the material belongs to 'Ereol' (the access param) the Publizon product status should dictate the availability ", () => {
    // The only Publizon product status that is NOT available is 5.

    // Typescript does not understand our mocked hooks.
    // So we gracefully ignore the errors:).
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore-next-line
    useGetV1ProductsIdentifier.mockReturnValue({
      isLoading: false,
      data: {
        product: {
          costFree: false
        }
      }
    });

    /**
     * First test:
     * Publizon product status: 4
     */
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore-next-line
    useGetV1LoanstatusIdentifier.mockReturnValue({
      isLoading: false,
      data: {
        loanStatus: 4
      }
    });

    const { result: firstResult } = renderHook(() =>
      useOnlineAvailabilityData({
        enabled: true,
        access: ["Ereol"],
        faustIds: ["138625958"],
        isbn: "9788794564076"
      })
    );

    act(() => {
      expect(firstResult.current).toEqual({
        isLoading: false,
        isAvailable: true
      });
    });
    /**
     * End first test.
     */

    /**
     * Second test:
     * Publizon product status: 5
     */
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore-next-line
    useGetV1LoanstatusIdentifier.mockReturnValue({
      isLoading: false,
      data: {
        loanStatus: 5
      }
    });
    const { result: secondResult } = renderHook(() =>
      useOnlineAvailabilityData({
        enabled: true,
        access: ["Ereol"],
        faustIds: ["138625958"],
        isbn: "9788794564076"
      })
    );

    act(() => {
      expect(secondResult.current).toEqual({
        isLoading: false,
        isAvailable: false
      });
    });
    /**
     * End second test.
     */

    /**
     * Third test:
     * Publizon product status: 2
     */
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore-next-line
    useGetV1LoanstatusIdentifier.mockReturnValue({
      isLoading: false,
      data: {
        loanStatus: 2
      }
    });
    const { result: thirdResult } = renderHook(() =>
      useOnlineAvailabilityData({
        enabled: true,
        access: ["Ereol"],
        faustIds: ["138625958"],
        isbn: "9788794564076"
      })
    );

    act(() => {
      expect(thirdResult.current).toEqual({
        isLoading: false,
        isAvailable: true
      });
    });
    /**
     * End third test.
     */
  });

  it("Test that if the material is cost free nothing else matters", () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore-next-line
    useGetV1ProductsIdentifier.mockReturnValue({
      isLoading: false,
      data: {
        product: {
          costFree: true
        }
      }
    });

    // If the material is cost free no data is being loaded from this service.
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore-next-line
    useGetV1LoanstatusIdentifier.mockReturnValue({
      isLoading: false,
      data: undefined
    });

    const { result } = renderHook(() =>
      useOnlineAvailabilityData({
        enabled: true,
        access: ["Ereol"],
        faustIds: ["138625958"],
        isbn: "9788794564076"
      })
    );

    act(() => {
      expect(result.current).toEqual({
        isLoading: false,
        isAvailable: true
      });
    });
  });

  it("Test that if the hook is not enabled it should return null statuses", () => {
    // If the hook is not enabled no data is being loaded from this service.
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore-next-line
    useGetV1ProductsIdentifier.mockReturnValue({
      isLoading: false,
      data: undefined
    });

    // If the hook is not enabled no data is being loaded from this service.
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore-next-line
    useGetV1LoanstatusIdentifier.mockReturnValue({
      isLoading: false,
      data: undefined
    });

    const { result } = renderHook(() =>
      useOnlineAvailabilityData({
        enabled: false,
        access: ["Ereol"],
        faustIds: ["138625958"],
        isbn: "9788794564076"
      })
    );

    act(() => {
      expect(result.current).toEqual({
        isLoading: null,
        isAvailable: null
      });
    });
  });
});
