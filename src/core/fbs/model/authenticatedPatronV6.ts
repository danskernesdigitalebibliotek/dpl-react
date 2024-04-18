/**
 * Generated by orval v6.26.0 🍺
 * Do not edit manually.
 * FBS Adapter
 * OpenAPI spec version: 1.0
 */
import type { AuthenticatedPatronV6AuthenticateStatus } from "./authenticatedPatronV6AuthenticateStatus";
import type { PatronV5 } from "./patronV5";

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
