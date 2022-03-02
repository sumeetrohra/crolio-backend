// import * as functions from "firebase-functions";
import cryptoJS from "crypto-js";

const _jsonToURI = (jsonObj: { [x: string]: string }) => {
  let output: string = "";
  const keys = Object.keys(jsonObj);
  keys.forEach(function (key) {
    output = output + key + "=" + jsonObj[key] + "&";
  });
  return output.slice(0, -1);
};

export const createVauldPayload = (payload: {
  [key: string]: any;
}): { [key: string]: any } => ({
  ...payload,
  // orgID: functions.config().vauld.orgid as string,
  orgID: process.env.VAULD_ORG_ID,
});

export const signRequest = (payload: { [key: string]: any }): string => {
  const URIencodedPayload = _jsonToURI(JSON.parse(JSON.stringify(payload)));
  const hmac = cryptoJS.HmacSHA256(
    URIencodedPayload,
    process.env.VAULD_SECRET_KEY
  );
  const hash = hmac.toString(cryptoJS.enc.Hex);
  return hash;
};
