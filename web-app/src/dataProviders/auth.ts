import { httpClient } from "./httpClient";

export const authProvider = {
  async login({ username, password }: { username: string; password: string }) {
    const response = await httpClient("/v1/auth/token", {
      method: "POST",
      body: JSON.stringify({ email: username, password }),
    });
    const auth = response.json;
    localStorage.setItem("auth", JSON.stringify(auth));
  },
  async checkError(error: any) {
    const status = error.status;
    if (status === 401 || status === 403) {
      localStorage.removeItem("auth");
      throw new Error();
    }
  },
  async checkAuth() {
    if (!localStorage.getItem("auth")) {
      throw new Error("login.required");
    }
  },
  async logout() {
    localStorage.removeItem("auth");
  },

  // TODO : add refresh token
};
