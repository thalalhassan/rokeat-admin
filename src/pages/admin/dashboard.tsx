import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState } from "react";
import GoogleMap from "components/GoogleMap";
import Slider from "rc-slider";
import ImageUpload from "components/ImageUpload";
import ColorPicker from "components/ColorPicker";
import Button from "components/Button";
import Input from "components/Input";
import RadioButton from "components/RadioButton";
import { decamelize } from "utils/helper";
import { trpc } from "utils/trpc";
import { useUserReducer } from "redux/hooks/useReducers";
import DeliveryCharge from "components/DeliveryCharge";

export default function AdminDashboard() {
  const { userData } = useUserReducer();

  const [accodian, setAccodian] = useState<string | null>(null);
  const router = useRouter();

  const [shopData, setShopData] = useState<any>({
    logo: "",
    deliveryChargeType: "dynamic",
  });

  const [deliveryChargeData, setDeliveryChargeData] = useState<any>();

  const [shopColorData, setShopColorData] = useState<any>({
    primary: "#2877c6",
    secondary: "#1b2026",
  });

  const updateStoresMutation = trpc.useMutation(["stores.update"], {
    onError: (err: any) => {
      console.log("Something went wrong");
    },
  });

  // useEffect(() => {
  //   navigator.geolocation.getCurrentPosition(
  //     function (position) {
  //       console.log("Latitude is :", position);
  //       console.log("Latitude is :", position.coords.latitude);
  //       console.log("Longitude is :", position.coords.longitude);
  //     },
  //     function error(msg) {
  //       alert("Please enable your GPS position feature.");
  //     },
  //     { maximumAge: 10000, timeout: 5000, enableHighAccuracy: true }
  //   );
  // }, []);

  const handleInputChange = (value: any, name: string) => {
    setShopData({ ...shopColorData, [name]: value });
  };

  const handleDeliveryChargeData = (value: string, name: string) => {
    setDeliveryChargeData({ ...deliveryChargeData, [name]: value });
  };

  const handleColorChange = (value: string, name: string) => {
    setShopColorData({ ...shopColorData, [name]: value });
  };

  const saveStoreChanges = () => {
    const saveData = {
      ...shopData,
      deliveryChargeData,
      id: userData?.storeId,
      colors: shopColorData,
    };
    updateStoresMutation.mutate(saveData);
  };

  return (
    <div>
      <div className="dashboard-one-body  container">
        <section className="dashbord-first-main ">
          <div className="container">
            <h2>Dashboard</h2>
          </div>
        </section>
        <section>
          <div className="container">
            <div className="row">
              <div className="col-lg-6">
                <div className="welcome-section">
                  <h5>Welcome to Rokeat</h5>
                  <p>
                    Complete the store setup and start selling your awesome
                    products in no time!
                  </p>
                </div>
                <div className="task-main">
                  <div
                    className="task mb-3"
                    onClick={() => {
                      setAccodian(
                        accodian === "customiseStore" ? null : "customiseStore"
                      );
                    }}
                  >
                    Customize Your online Store
                    <div className="ms-auto">
                      <Image
                        src="/images/tutorial-preview-large.png"
                        width={"18%"}
                        height={"18%"}
                        alt="ionic-ios-arrow"
                      />
                    </div>
                  </div>
                  {accodian === "customiseStore" && (
                    <div className="">
                      <div className="modal-dialog modal-dialog-centered  modal-dialog-scrollable">
                        <div className="modal-content px-3">
                          <div className="modal-header border-0">
                            <button type="button"></button>
                          </div>
                          <div className="modal-body border-0">
                            <div className="row">
                              <div className="col-6 img-upload">
                                <h4>Upload your restaurant logo</h4>
                                <span>(Minimum 320kb)</span>
                              </div>
                              <ImageUpload
                                onChange={({ url }: { url: string }) => {
                                  setShopData({ ...shopData, logo: url });
                                }}
                                value={shopData.logo}
                              />
                              <div className="row">
                                <div className="select-color-main">
                                  <h4>Select Color theme for your store</h4>
                                  <div className="d-flex colo-pickers">
                                    <ColorPicker
                                      name="primary"
                                      label="Primary"
                                      defaultValue={shopData.primary}
                                      onChange={handleColorChange}
                                    />
                                    <ColorPicker
                                      name="secondary"
                                      label="Secondary"
                                      defaultValue={shopData.secondary}
                                      onChange={handleColorChange}
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                            <Button
                              additionalClassName="btn btn-main w-100"
                              label="Save changes"
                              onClick={saveStoreChanges}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  <div
                    className="task mb-3"
                    onClick={() => {
                      setAccodian(
                        accodian === "restaurantDetails"
                          ? null
                          : "restaurantDetails"
                      );
                    }}
                  >
                    Add Restaurant details
                    <div className="ms-auto">
                      <Image
                        src="/images/tutorial-preview-large.png"
                        width={"18%"}
                        height={"18%"}
                        alt="ionic-ios-arrow"
                      />
                    </div>
                  </div>
                  {accodian === "restaurantDetails" && (
                    <div className="">
                      <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                        <div className="modal-content">
                          <div className="modal-body rest-datails-modal">
                            <div className="mb-3">
                              <Input
                                name="address"
                                onChange={handleInputChange}
                              />
                            </div>
                            <div className="shop-map">
                              <GoogleMap
                                options={{
                                  center: { lat: -33.8569, lng: 151.2152 },
                                  zoom: 8,
                                }}
                              />
                            </div>
                            <div className="area-slider py-2">
                              Serviceble area
                              <Slider
                                onChange={(value) => {
                                  handleInputChange(value, "serviceableArea");
                                }}
                              />
                            </div>
                            <div>
                              Delivery charge
                              <div className="dlvry-charge-btns-firstrow d-flex">
                                {["dynamic", "fixed", "free", "freeAbove"].map(
                                  (value) => (
                                    <RadioButton
                                      key={value}
                                      value={value}
                                      defaultChecked={
                                        shopData.deliveryChargeType === value
                                      }
                                      label={decamelize(value)}
                                      name="deliveryChargeType"
                                      onChange={handleInputChange}
                                    />
                                  )
                                )}
                              </div>
                            </div>
                            <DeliveryCharge
                              type={shopData.deliveryChargeType}
                              onChange={handleDeliveryChargeData}
                            />
                            <Button
                              additionalClassName="btn btn-main w-100"
                              label="Save changes"
                              onClick={saveStoreChanges}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  <div
                    className="task"
                    onClick={() => {
                      router.push("/admin/products");
                    }}
                  >
                    Add Products
                    <div className="ms-auto">
                      <Image
                        src="/images/tutorial-preview-large.png"
                        width={"18%"}
                        height={"18%"}
                        alt="ionic-ios-arrow"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-6  d-none  d-lg-block">
                <div className="dashboard-one-img">
                  <Image
                    src="/images/1st-dashboard-img.png"
                    width={"18%"}
                    height={"18%"}
                    alt="ionic-ios-arrow"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
