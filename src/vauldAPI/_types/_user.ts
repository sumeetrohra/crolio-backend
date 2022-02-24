import { _vauldBaseRequestData, _vauldBaseResponseData } from "./_baseTypes";

export interface ICreateVauldUserRequestData extends _vauldBaseRequestData {
  userIdentifier: string;
  isCorporate: boolean;
}

interface _VauldCrateUserResponseData {
  message: string;
  userID: string;
}

export interface ICreateVauldUserAccountResponseData
  extends _vauldBaseResponseData {
  data?: _VauldCrateUserResponseData;
  error?: _VauldCrateUserResponseData;
}
