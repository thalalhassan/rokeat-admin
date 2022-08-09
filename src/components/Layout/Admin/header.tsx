import Image from "next/image";
import Styles from "styles/Layout.module.scss";
/**
 * Header of all pages
 * @returns
 */
export default function Header() {
  return (
    <>
      <nav className={Styles.mobile_top_nav}>
        <div className={Styles.mobile_bottom_nav__item}>
          <div className={Styles.mobile_bottom_nav__item_content}>
            <Image
              onClick={() => {}}
              src="/images/Icon ionic-ios-menu.png"
              className="btn-toggle"
              width={"15%"}
              height={"15%"}
              alt="ionic-ios-arrow"
            />
          </div>
        </div>
        <div className={Styles.mobile_bottom_nav__item}>
          <div className={Styles.mobile_bottom_nav__item_content}>
            <div className={Styles.mobile_bottom_nav__item_content}>
              <Image
                src="/images/logo.png"
                className="img-fluid"
                width={"70%"}
                height={"30%"}
                alt="ionic-ios-arrow"
              />
            </div>
          </div>
        </div>
        <div className={Styles.mobile_bottom_nav__item}>
          <div className={Styles.mobile_bottom_nav__item_content}>
            <div className={Styles.mobile_bottom_nav__item_content}>
              <Image
                onClick={() => {}}
                src="/images/store.svg"
                className="btn-toggle"
                width={"15%"}
                height={"15%"}
                alt="ionic-ios-arrow"
              />
            </div>
          </div>
        </div>
      </nav>
      <div className="side-menu">
        <div className="admin-details-main">
          <h4>Dan Valdez</h4>
          Trail Plan
        </div>
        <div className="side-menu-wrapper">
          <div className="side-menu-items pt-2">
            <ul className="list-unstyled">
              <li>
                <a href=""> Dashboard</a>
              </li>
              <li>
                <a href=""> Orders</a>
              </li>
              <li>
                <a href=""> Products</a>
              </li>
              <li>
                <a href=""> Categories</a>
              </li>
              <li>
                <a href=""> Delivery boys</a>
              </li>
              <li>
                <a href=""> Offers and coupons</a>
              </li>
              <li>
                <a href=""> User profile</a>
              </li>
            </ul>
          </div>
        </div>
        <div>
          <div className="btn-logout">
            <a href="index.html">Log out</a>
          </div>
        </div>
      </div>
    </>
  );
}
