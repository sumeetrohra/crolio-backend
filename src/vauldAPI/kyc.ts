import {
  IApproveVauldInstantKYCRequestData,
  IApproveVauldInstantKYCResponseData,
  IGetVauldKYCDocsUploadURLRequestData,
  IGetVauldKYCDocsUploadURLResponseData,
  IGetVauldKYCStatusRequestData,
  IGetVauldKYCStatusResponseData,
  IInitiateVauldKYCRequestData,
  IInitiateVauldKYCResponseData,
  IInitiateVauldManualKYCRequestData,
  IInitiateVauldManualKYCResponseData,
  IVerifyVauldKYCUploadedDocRequestData,
  IVerifyVauldKYCUploadedDocResponseData,
  IVerifyVauldKYCUploadedSelfieRequestData,
  IVerifyVauldKYCUploadedSelfieResponseData,
} from "./_types/_kyc";
import request from "./_axiosInstance";

export const initiateVauldKYC = (
  payload: IInitiateVauldKYCRequestData
): Promise<IInitiateVauldKYCResponseData> => {
  return request<IInitiateVauldKYCResponseData>("/kyc/initiateKyc", payload);
};

export const requestVauldKYCDocsUploadURL = (
  payload: IGetVauldKYCDocsUploadURLRequestData
): Promise<IGetVauldKYCDocsUploadURLResponseData> => {
  return request<IGetVauldKYCDocsUploadURLResponseData>(
    "/kyc/getUploadUrl",
    payload
  );
};

export const verifyVauldUploadedKYCDoc = (
  payload: IVerifyVauldKYCUploadedDocRequestData
): Promise<IVerifyVauldKYCUploadedDocResponseData> => {
  return request<IVerifyVauldKYCUploadedDocResponseData>(
    "/kyc/verifyDoc",
    payload
  );
};

export const verifyVauldUploadedSelfie = (
  payload: IVerifyVauldKYCUploadedSelfieRequestData
): Promise<IVerifyVauldKYCUploadedSelfieResponseData> => {
  return request<IVerifyVauldKYCUploadedDocResponseData>(
    "/kyc/verifySelfie",
    payload
  );
};

export const approveVauldInstantKYC = (
  payload: IApproveVauldInstantKYCRequestData
): Promise<IApproveVauldInstantKYCResponseData> => {
  return request<IApproveVauldInstantKYCResponseData>(
    "/kyc/instantApproval",
    payload
  );
};

export const initiateVauldManualKYCVerification = (
  payload: IInitiateVauldManualKYCRequestData
): Promise<IInitiateVauldManualKYCResponseData> => {
  return request<IInitiateVauldManualKYCResponseData>(
    "/kyc/initiateManualVerification",
    payload
  );
};

export const getVauldKYCStatus = (
  payload: IGetVauldKYCStatusRequestData
): Promise<IGetVauldKYCStatusResponseData> => {
  return request<IGetVauldKYCStatusResponseData>("/kyc/getKYCStatus", payload);
};
