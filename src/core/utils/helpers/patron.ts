import { Patron } from "../types/entities";
import { first } from "lodash";
import { PatronSettingsV6 } from "../../fbs/model";

export function patronPhoneNumber(
  patron: Patron | PatronSettingsV6
): string | undefined {
  return first(patron.phoneNumbers)?.phoneNumber || undefined;
}

export function patronEmail(
  patron: Patron | PatronSettingsV6
): string | undefined {
  return first(patron.emailAddresses)?.emailAddress || undefined;
}

export function patronReceiveSms(patron: Patron | PatronSettingsV6): boolean {
  return first(patron.phoneNumbers)?.receiveNotification || false;
}

export function patronRecieveEmail(patron: Patron | PatronSettingsV6): boolean {
  return first(patron.emailAddresses)?.receiveNotification || false;
}
