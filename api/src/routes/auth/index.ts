import getTokenSession from "./getTokenSession";
import resetPassword from "./resetPassword";
import sendResetPasswordMail from "./sendResetPasswordMail";

export default function initAuthRoute() {
  getTokenSession();
  resetPassword();
  sendResetPasswordMail();
}
