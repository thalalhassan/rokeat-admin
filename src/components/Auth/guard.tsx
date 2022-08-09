import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import jwt_decode from "jwt-decode";
import { userActions } from "redux/slices/user.slice";
import { useDispatch } from "react-redux";

export { RouteGuard };

function RouteGuard({ children }: { children: any }) {
  const router = useRouter();
  const dispatch = useDispatch();

  const [authorized, setAuthorized] = useState<{ [key: string]: any } | null>(
    null
  );

  useEffect(() => {
    // on initial load - run auth check
    authCheck(router.asPath);

    // on route change start - hide page content by setting authorized to false
    const hideContent = () => setAuthorized(null);
    router.events.on("routeChangeStart", hideContent);

    // on route change complete - run auth check
    router.events.on("routeChangeComplete", authCheck);

    // unsubscribe from events in useEffect return function
    return () => {
      router.events.off("routeChangeStart", hideContent);
      router.events.off("routeChangeComplete", authCheck);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    dispatch(userActions.setUserData(authorized));
  }, [authorized]);

  function authCheck(url: any) {
    let user: any = null;

    const token = localStorage.getItem("jwt");
    // redirect to login page if accessing a private page and not logged in
    if (token != null) {
      user = jwt_decode(token);
    }

    const publicPaths = ["/", "/auth/signin", "/auth/signup"];
    const path = url.split("?")[0];

    if (publicPaths.includes(path)) {
      if (user?.id) {
        router.push({
          pathname: "/admin/dashboard",
        });
      }
      setAuthorized(user || {});
      return;
    }

    if (!user?.id) {
      setAuthorized(null);
      router.push({
        pathname: "/auth/signin",
        // query: { returnUrl: router.asPath },
      });
      return;
    }

    setAuthorized(user);
  }

  return authorized && children;
}
