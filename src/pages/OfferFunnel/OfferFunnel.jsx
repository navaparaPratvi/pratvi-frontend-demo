import React from "react";
import OfferFunnelHeader from "../../components/OfferFunnel/offerFunnelHeader/OfferFunnelHeader";
import BundleProductsInfo from "../../components/OfferFunnel/bundleProductList/BundleProductsInfo";
import ProductList from "../../components/ProductList/ProductList";
import "./offerFunnel.css";
import ApplyDiscount from "../../components/OfferFunnel/applyDiscount/ApplyDiscount";
const OfferFunnel = () => {
  return (
    <div>
      <OfferFunnelHeader />
      <div className="content-wrapper">
        <BundleProductsInfo />
        <ProductList />
        <ApplyDiscount />
      </div>
    </div>
  );
};

export default OfferFunnel;
