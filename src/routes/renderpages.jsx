import React, { memo, Suspense } from "react";
import { Navigate, useRoutes } from "react-router-dom";
import OfferFunnel from "../pages/OfferFunnel/OfferFunnel";

const RenderPages = () => {
  const routes = [
    {
      path: "/",
      element: <OfferFunnel />,
    },

    {
      path: "*",
      element: <Navigate to={"not found"} />,
    },
  ];

  const element = useRoutes(routes);

  return <Suspense fallback={"loading"}>{element}</Suspense>;
};

export default memo(RenderPages);
