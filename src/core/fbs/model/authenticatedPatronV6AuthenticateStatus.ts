/**
 * Generated by orval v6.18.1 🍺
 * Do not edit manually.
 * FBS Adapter
 * OpenAPI spec version: 1.0
 */

/**
 * AuthenticateStatus:
 <ul>
     <li>- 'VALID': successfully authenticated</li>
     <li>- 'INVALID': either the user is not known in the system, or an invalid combination of authentication parameters has been used.</li>
     <li>- 'LOANER_LOCKED_OUT': user has been blocked temporary because of too many failed login attempts</li>
 </ul>
 */
export type AuthenticatedPatronV6AuthenticateStatus =
  typeof AuthenticatedPatronV6AuthenticateStatus[keyof typeof AuthenticatedPatronV6AuthenticateStatus];

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const AuthenticatedPatronV6AuthenticateStatus = {
  VALID: "VALID",
  INVALID: "INVALID",
  LOANER_LOCKED_OUT: "LOANER_LOCKED_OUT"
} as const;
