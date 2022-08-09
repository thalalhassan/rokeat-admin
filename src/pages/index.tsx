import type { NextPage } from "next";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { useStoreReducer } from "redux/hooks/useReducers";
import { storeActions } from "redux/slices/store.slice";
import Input from "components/Input";
import Button from "components/Button";
import { useRouter } from "next/router";
import { commonActions } from "redux/slices/common.slice";
import { useErrorContext } from "context/errorContext";

const Home: NextPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { signupData } = useStoreReducer();

  const { errors, setErrors } = useErrorContext();

  const handleStoreNameChange = (value: string) => {
    const urlValue = `${value.replaceAll(" ", "")}.rokeat.com`;
    dispatch(
      storeActions.updateSignupData({ storeUrl: urlValue, storeName: value })
    );
  };

  const handleStartFree = () => {
    let errMsg = "";
    if (!signupData?.storeName) {
      errMsg = "Please enter the store name";
    } else if (signupData.storeName.length < 4) {
      errMsg = "Should contain atleast 4 letters";
    }

    if (errMsg.length) {
      // return dispatch(
      //   commonActions.setError({
      //     storeName: errMsg,
      //   })
      // );
      setErrors({ ...errors, storeName: errMsg });
      return
    }
    router.push("/auth/signup");
  };

  return (
    <div>
      <section className="">
        <div className="container">
          <div className="row pd-6 banner">
            <div className="col-lg-6 banner-img">
              <Image
                src="/images/banner-main-image.png"
                className="img-fluid"
                width={"100"}
                height={"100"}
                alt="banner-main"
              />
            </div>
            <div className="col-lg-6  banner-right">
              <div>
                <h1>
                  Set up your own online food ordering system in 15 minutes!
                </h1>
                <p>
                  Duis vestibulum elit vel neque pharetra vulputate. Quisque
                  scelerisque nisi urna. Duis rutrum non risus in imperdiet.
                  Proin molestie accumsan nulla sit amet mattis. Ut vel
                  tristique neque. Praesent purus eros, aliquet sit amet{" "}
                </p>
                <div>
                  <div className="button-banner-main">
                    <div className="row">
                      <div className="col-lg-5 col-md-12">
                        <Input
                          name="storeName"
                          placeholder="Enter your store name"
                          onChange={handleStoreNameChange}
                          value={signupData?.storeName}
                        />
                      </div>
                      <div className="col-lg-5 col-md-12">
                        <Button
                          label="Start free trial"
                          onClick={handleStartFree}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
