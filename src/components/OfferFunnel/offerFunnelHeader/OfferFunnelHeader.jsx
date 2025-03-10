import React from "react";
import { Typography } from "antd";
import "./OfferFunnelHeader.css"; 

const { Title } = Typography;

const OfferFunnelHeader = () => {
  return (
    <div className="offer-funnel-header">
      <Title level={4} className="offer-title">
        Offer Funnel
      </Title>
      <div className="offer-links">
        <span className="link">Support</span>
        <span className="separator">|</span>
        <span className="link">Talk to an Expert</span>
      </div>
    </div>
  );
};

export default OfferFunnelHeader;
