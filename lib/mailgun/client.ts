import Mailgun from "mailgun.js";
import FormData from "form-data";

export function createClient() {
  const mg = new Mailgun(FormData);
  return mg.client({ username: "api", key: process.env.MAILGUN_SECRET_KEY! });
}
