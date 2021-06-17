import React, { useState } from "react";
import { Card, CardBody, CardTitle, CardText } from "reactstrap";

function StatCard(props) {
  const [textStatus, setTextStatus] = useState("hideText");
  const [style, setStyle] = useState("primary");
  const showCard = (e) => {
    setTextStatus("showText");
    setStyle("success");
  };
  const hideCard = (e) => {
    setTextStatus("hideText");
    setStyle("primary");
  };

  return (
    <div>
      <Card color={style}>
        <CardBody
          className="cardTitle"
          onMouseEnter={(e) => showCard(e)}
          onMouseLeave={(e) => hideCard(e)}
        >
          <CardTitle>{props.title}</CardTitle>
          <CardText className={textStatus}>{props.value}</CardText>
        </CardBody>
      </Card>
    </div>
  );
}

export default StatCard;
