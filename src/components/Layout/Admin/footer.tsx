import ButtonLink from "components/ButtonLink";
import Styles from "styles/Layout.module.scss";
/**
 * Footer of all pages
 * @returns
 */
export default function Footer() {
  return (
    <nav className={Styles.mobile_bottom_nav}>
      <div className={Styles.mobile_bottom_nav__item}>
        <div className={Styles.mobile_bottom_nav__item_content}>
          <ButtonLink href="/admin/dashboard" src="/images/store.svg" />
          <i className={Styles.material_icons}>home</i>
        </div>
      </div>
      <div className={Styles.mobile_bottom_nav__item}>
        <div className={Styles.mobile_bottom_nav__item_content}>
          <ButtonLink href="/admin/orders" src="/images/store.svg" />
          <i className={Styles.material_icons}>orders</i>
        </div>
      </div>
      <div className={Styles.mobile_bottom_nav__item}>
        <div className={Styles.mobile_bottom_nav__item_content}>
          <ButtonLink href="/admin/products" src="/images/store.svg" />
          <i className={Styles.material_icons}>products</i>
        </div>
      </div>
    </nav>
  );
}
