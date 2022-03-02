import axios from "axios";
// import * as functions from "firebase-functions";
import { createVauldPayload, signRequest } from "../utils/vauld";

const request = async <T>(
  url: string,
  payload: Record<any, any>
): Promise<T> => {
  const data = createVauldPayload(payload);
  const result = await axios.post(
    `{functions.config().vauld.endpoint}{url}`,
    data,
    {
      headers: { hmac: signRequest(data) },
    }
  );
  return result.data;
};

export default request;
