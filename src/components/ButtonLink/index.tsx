import Image from "next/image";
import Link from "next/link";
import { ButtonLinkInterface } from "types/components.interface";

/**
 * Common theme Button
 * @param props
 * @returns
 */
const ButtonLink = (props: ButtonLinkInterface) => {
  const { label, src, href, additionalClassName, ...defaultPropsData } = props;

  return (
    <div className={`${additionalClassName} capitalize button-banner`}>
      <Link href={href}>
        {src ? (
          <div className="w-7 h-7">
            <a className="">
              <Image src={src} width="100%" height="100%" alt={label} />
            </a>
          </div>
        ) : (
          <a className="btn btn-main">{label}</a>
        )}
      </Link>
    </div>
  );
};

const defaultProps: ButtonLinkInterface = {
  label: "link",
  href: "/",
  additionalClassName: "",
};

ButtonLink.defaultProps = defaultProps;
export default ButtonLink;
