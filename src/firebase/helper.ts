import {
  ConfirmationResult,
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";

const auth = getAuth();

declare const window: any;

export const configCaptcha = (): void => {
  window.recaptchaVerifier = new RecaptchaVerifier(
    "singup-continue-button",
    {
      size: "invisible",
      callback: () => {
        console.log("reCaptch success");
      },
      defaultCountry: "IN",
    },
    auth
  );
};

export const sendVerificationCode = (
  phoneNumber: string
): Promise<{ success: boolean; error?: Error; confirmationResult?: any }> => {
  return new Promise(async (resolve) => {
    try {
      // Remove old recaptchaVerifier
      if (!window.recaptchaVerifier) window.recaptchaVerifier = undefined;

      //create new recaptchaVerifier
      await configCaptcha();

      const appVerifier = window.recaptchaVerifier;

      // Send OTP
      signInWithPhoneNumber(auth, phoneNumber, appVerifier)
        .then((confirmationResult) => {
          // SMS sent. Prompt user to type the code from the message, then sign the
          // user in with confirmationResult.confirm(code).
          window.confirmationResult = confirmationResult;
          return resolve({ confirmationResult, success: true });
          // ...
        })
        .catch((error) => {
          return resolve({ error, success: false });
        });
    } catch (error: any) {
      return resolve({ error, success: false });
    }
  });
};

export const verifyOtp = (
  confirmationResult: ConfirmationResult,
  code: string
): Promise<{ success: boolean; error?: Error }> => {
  return new Promise(async (resolve) => {
    confirmationResult
      .confirm(code)
      .then(() => {
        return resolve({ success: true });
      })
      .catch((error) => {
        return resolve({ error, success: false });
      });
  });
};
