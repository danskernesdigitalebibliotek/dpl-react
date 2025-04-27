import { PatronV5 } from "../../fbs/model";

/**
 * Legacy types
 *
 * These are types originally generated from external APIs.
 *
 * The APIs have since been updated by these types are still referenced within
 * the project. Keep a copy of the last form we saw them in before the API
 * specification was updated.
 */
export interface AuthenticatedPatronV6 {
  /** AuthenticateStatus:
   <ul>
   <li>- 'VALID': successfully authenticated</li>
   <li>- 'INVALID': either the user is not known in the system, or an invalid combination of authentication parameters has been used.</li>
   <li>- 'LOANER_LOCKED_OUT': user has been blocked temporary because of too many failed login attempts</li>
   </ul> */
  authenticateStatus: AuthenticatedPatronV6AuthenticateStatus;
  patron?: PatronV5;
}

/**
 * AuthenticateStatus:
 <ul>
 <li>- 'VALID': successfully authenticated</li>
 <li>- 'INVALID': either the user is not known in the system, or an invalid combination of authentication parameters has been used.</li>
 <li>- 'LOANER_LOCKED_OUT': user has been blocked temporary because of too many failed login attempts</li>
 </ul>
 */
export type AuthenticatedPatronV6AuthenticateStatus =
  (typeof AuthenticatedPatronV6AuthenticateStatus)[keyof typeof AuthenticatedPatronV6AuthenticateStatus];

export const AuthenticatedPatronV6AuthenticateStatus = {
  VALID: "VALID",
  INVALID: "INVALID",
  LOANER_LOCKED_OUT: "LOANER_LOCKED_OUT"
} as const;
