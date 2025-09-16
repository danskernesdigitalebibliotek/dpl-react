import { UserInfoData } from "../../adgangsplatformen/useUserInfo";

export const isResident = (userData: UserInfoData, siteAgencyId: string) => {
  return userData.attributes.municipalityAgencyId === siteAgencyId;
};
