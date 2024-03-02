import { BASE_URL } from "../../ConfigBaseUrl";
import { apiPost } from "../../utils";


export function SignIn(data, header) {
  console.log('getSignIn List request===>', data, header);
  return apiPost(BASE_URL, data, header);
}
