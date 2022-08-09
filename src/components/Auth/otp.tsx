import React, { FormEvent, useState } from "react";
import { NextPage } from "next";
import Input from "components/Input";
import Image from "next/image";
import Link from "next/link";
import { verifyOtp } from "firebase/helper";
import { ConfirmationResult } from "firebase/auth";
import Button from "components/Button";
import { toast } from "react-toastify";
import { useErrorContext } from "context/errorContext";

interface OtpVerificationInterface {
  confirmationResult: ConfirmationResult;
  onClose: Function;
  onSuccess: Function;
}

const OtpVerificationPopup = (props: OtpVerificationInterface) => {
  const { confirmationResult, onClose, onSuccess } = props;
  const [otpCode, setOtpCode] = useState<string>("");

  const { errors, setErrors } = useErrorContext();

  const handlerSubmit = () => {
    if (otpCode?.length < 6) {
      return setErrors({
        ...errors,
        otp: "Enter a valid otp code",
      });
    }

    verifyOtp(confirmationResult, otpCode).then((data) => {
      if (data.success) {
        toast.success("Opt verified");
        onSuccess();
        onClose();
      } else {
        return setErrors({
          ...errors,
          otp: "Incorrect otp entered. Please try again",
        });
      }
    });
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-6 col m-auto account-create-wrap">
          <Link href="/auth/signup">
            <a>
              <Image
                src="/images/Icon ionic-ios-arrow-back.png"
                className="img-fluid"
                width={"10%"}
                height={"10%"}
                alt="ionic-ios-arrow"
              />
            </a>
          </Link>
          <div className="otp-container">
            <h2>Enter OTP send to Your Phone number</h2>

            <p>
              Duis vestibulum elit vel neque pharetra vulputate. Quisque
              scelerisque nisi urna. Duis rutrum non risus in imperdiet. Proin
              molestie accumsan nulla sit amet mattis
            </p>
            <div className="account-create-form">
              <form>
                <div className="form-group">
                  <Input
                    name="otp"
                    onChange={(value: any) => setOtpCode(value)}
                  />
                </div>
                <Button
                  additionalClassName="btn btn-submit mb-2"
                  label="Create account"
                  onClick={handlerSubmit}
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OtpVerificationPopup;
