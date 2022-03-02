import {
  ICreateVauldUserRequestData,
  ICreateVauldUserAccountResponseData,
} from "./_types/_user";
import request from "./_axiosInstance";

export const createVauldAccount = (
  payload: ICreateVauldUserRequestData
): Promise<ICreateVauldUserAccountResponseData> => {
  return request<ICreateVauldUserAccountResponseData>("/users/create", payload);
};
