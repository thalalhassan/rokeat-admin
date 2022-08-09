import { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import { StoreSignupInterfaceKeys } from "types/store.interface";
import Input from "components/Input";
import Button from "components/Button";
import { toast } from "react-toastify";
import { useErrorContext } from "context/errorContext";
import { isValid } from "utils/validator";
import { trpc } from "utils/trpc";

const Signin = () => {
  const router = useRouter();

  const { errors, setErrors } = useErrorContext();

  const [signinData, setSigninData] = useState<any>({
    email: "",
    password: "",
  });

  const signinMutation = trpc.useMutation(["auth.signin"], {
    onSuccess: (data: any) => {
      if (data.success) {
        localStorage.setItem("jwt", data.token);
        router.push("/admin/dashboard");
      } else {
        toast.error(data.message);
      }
    },
    onError: (err: any) => {
      toast.error("Something went wrong");
    },
  });

  const handleChange = (value: string, name: StoreSignupInterfaceKeys) => {
    setSigninData({ ...signinData, [name]: value });
  };

  const handleSignIn = () => {
    const { valid, errorData } = isValid(signinData);

    if (!valid) {
      setErrors({ ...errorData, ...errors });
      console.log({ signinData, valid, errorData });
      return;
    }

    const signinMutatueData: any = {
      ...signinData,
    };

    signinMutation.mutate(signinMutatueData);
  };

  if (signinMutation.isLoading) {
    <div className="container">loading..........</div>;
  }

  if (signinMutation.isError) {
    <div className="container">{JSON.stringify(signinMutation.error)}</div>;
  }

  return (
    <>
      <div className={`container`}>
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
              <div className="">
                <form>
                  <div className="form-group">
                    <Input
                      onChange={handleChange}
                      name="email"
                      value={signinData?.email}
                    />
                  </div>
                  <div className="form-group">
                    <Input
                      type="password"
                      onChange={handleChange}
                      name="password"
                      value={signinData?.password}
                    />
                  </div>
                </form>
              </div>
              <Button
                id="singup-continue-button"
                additionalClassName="btn btn-main  btn-cont "
                label="Sign In"
                onClick={handleSignIn}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

Signin.layout = "LD"

export default Signin;
