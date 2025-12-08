import Cookies from "js-cookie"

export const auth = {
  getToken: () => Cookies.get("token"),
  setToken: (token: string) => Cookies.set("token", token),
  removeToken: () => Cookies.remove("token"),
  getAdminToken: () => Cookies.get("adminAccessToken"),
  setAdminToken: (token: string) => Cookies.set("adminAccessToken", token),
  removeAdminToken: () => Cookies.remove("adminAccessToken"),
}