import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { useStoreReducer } from "redux/hooks/useReducers";
import { storeActions } from "redux/slices/store.slice";
import { StoreSignupInterfaceKeys } from "types/store.interface";
import Input from "components/Input";
import Button from "components/Button";
import { sendVerificationCode } from "firebase/helper";
import { toast } from "react-toastify";
import OtpVerification from "components/Auth/otp";
import { useErrorContext } from "context/errorContext";
import { isValid } from "utils/validator";
import { trpc } from "utils/trpc";

declare const window: any;

const Signup = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { signupData } = useStoreReducer();

  const { errors, setErrors } = useErrorContext();

  const [showOtpPopup, setShowOtpPopup] = useState<boolean>(false);
  const [confirmationResult, setConfirmationResult] = useState<any>();

  useEffect(() => {
    setConfirmationResult(window.confirmationResult);
  }, []);

  const signupMutation = trpc.useMutation(["auth.signup"], {
    onSuccess: (data: any) => {
      if (data.token) {
        localStorage.setItem("jwt", data.token);
        router.push("/admin/dashboard");
      }
    },
    onError: (err: any) => {
      toast.error("Something went wrong");
    },
  });

  const handleChange = (value: string, name: StoreSignupInterfaceKeys) => {
    dispatch(storeActions.updateSignupData({ [name]: value }));
  };

  const handleContinue = () => {
    const { valid, errorData } = isValid(signupData);

    if (!valid && errorData) {
      setErrors({ ...errorData, ...errors });
    }

    if (!signupData) return;
    handleSaveStore();
    // sendVerificationCode(`+91 ${signupData.mobile}`).then(
    //   (data: { success: boolean; error?: Error; confirmationResult?: any }) => {
    //     if (!data.success) toast(data.error);
    //     else {
    //       setShowOtpPopup(true);
    //       setConfirmationResult(data.confirmationResult);
    //     }
    //   }
    // );
  };

  const handleSaveStore = () => {
    const signupCreateData: any = {
      ...signupData,
      avatar: "avatar",
    };

    signupMutation.mutate(signupCreateData);
  };

  if (signupMutation.isLoading) {
    <div className="container">loading..........</div>;
  }

  if (signupMutation.isError) {
    <div className="container">{JSON.stringify(signupMutation.error)}</div>;
  }

  return (
    <>
      <div className={`container ${showOtpPopup ? "hidden" : ""}`}>
        <div className="row">
          <div className="col-lg-6 m-auto account-create-wrap">
            <Link href="/">
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
            <div className="create-account-container">
              <h2>
                Start your free 14-day <br /> trial of Rokeat
              </h2>
              <div className="edit-url-main ">
                <div> {signupData?.storeUrl} </div>
                <div className="edit-icon ms-auto">
                  <i className="bi bi-pencil-fill"></i>
                </div>
              </div>
              <p>
                Duis vestibulum elit vel neque pharetra vulputate. Quisque
                scelerisque nisi urna. Duis rutrum non risus in imperdiet. Proin
                molestie accumsan nulla sit amet mattis
              </p>
              <div className="">
                <form>
                  <div className="form-group">
                    <Input
                      onChange={handleChange}
                      name="name"
                      value={signupData?.name}
                    />
                  </div>
                  <div className="form-group">
                    <Input
                      onChange={handleChange}
                      name="email"
                      value={signupData?.email}
                    />
                  </div>
                  <div className="form-group">
                    <Input
                      onChange={handleChange}
                      name="mobile"
                      value={signupData?.mobile}
                    />
                  </div>
                  <div className="form-group">
                    <Input
                      type="password"
                      onChange={handleChange}
                      name="password"
                      value={signupData?.password}
                    />
                  </div>
                </form>
              </div>
              <p>
                Duis vestibulum elit vel neque pharetra vulputate. Quisque
                scelerisque nisi urna. Duis rutrum non risus in imperdiet. Proin
                molestie
              </p>
              <Button
                id="singup-continue-button"
                additionalClassName="btn btn-main  btn-cont "
                label="Continue"
                onClick={handleContinue}
              />
            </div>
          </div>
        </div>
      </div>
      {showOtpPopup && (
        <OtpVerification
          onClose={() => {
            setShowOtpPopup(false);
          }}
          onSuccess={handleSaveStore}
          confirmationResult={confirmationResult}
        />
      )}
    </>
  );
};
Signup.layout = "LD";

export default Signup;
