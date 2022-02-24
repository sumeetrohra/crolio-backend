import { UploadedDocFace, UploadedKYCDocType } from "../../types/kyc";
import { _vauldBaseRequestData, _vauldBaseResponseData } from "./_baseTypes";

export interface IInitiateVauldKYCRequestData extends _vauldBaseRequestData {
  docType: UploadedKYCDocType;
}

export type IInitiateVauldKYCResponseData = _vauldBaseResponseData;

export type IGetVauldKYCDocsUploadURLRequestData = _vauldBaseRequestData;

export interface IGetVauldKYCDocsUploadURLResponseData
  extends _vauldBaseResponseData {
  data: {
    documentFront: string;
    documentBack: string;
    selfie: string;
    panCard: string;
  };
}

export interface IVerifyVauldKYCUploadedDocRequestData
  extends _vauldBaseRequestData {
  documentType: UploadedKYCDocType;
  frontOrBack?: UploadedDocFace;
}

interface _vauldKYCUploadUrls {
  documentFront: string;
  documentBack: string;
  selfie: string;
  panCard: string;
}

export interface IVerifyVauldKYCUploadedDocResponseData {
  data: _vauldKYCUploadUrls;
}

export type IVerifyVauldKYCUploadedSelfieRequestData = _vauldBaseRequestData;

export type IVerifyVauldKYCUploadedSelfieResponseData =
  IVerifyVauldKYCUploadedDocResponseData;

export type IApproveVauldInstantKYCRequestData = _vauldBaseRequestData;

export type IApproveVauldInstantKYCResponseData = _vauldBaseResponseData;

export type IInitiateVauldManualKYCRequestData = _vauldBaseRequestData;

export type IInitiateVauldManualKYCResponseData = _vauldBaseResponseData;

export enum VauldKYCStatus {
  OPEN = "open",
  PENDING = "pending",
  ACCEPTED = "accepted",
  FAILED = "failed",
  NOT_SUBMITTED = "notSubmitted",
}

export type IGetVauldKYCStatusRequestData = _vauldBaseRequestData;

export interface IGetVauldKYCStatusResponseData {
  status: VauldKYCStatus;
}
