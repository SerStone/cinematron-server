import { EEmailActions } from "../enums/email.enum";

export const allTemplates = {
  [EEmailActions.WELCOME]: {
    templateName: "register",
    subject: "Greetings for all who came into this platform",
  },
  [EEmailActions.FORGOT_PASSWORD]: {
    templateName: "forgot-password",
    subject: "Your password are not in danger. So be calm)",
  },
};
