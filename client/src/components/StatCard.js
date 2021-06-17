import "../App.css";
import React, { useState } from "react";
import { Card, CardBody, CardTitle, CardText } from "reactstrap";

function StatCard(props) {
  const [textStatus, setTextStatus] = useState("hideText");
  const [style, setStyle] = useState({
    backgroundColor: "#faf0e6",
    margin: "20px",
  });
  const showCard = (e) => {
    setTextStatus("showText");
    setStyle({ backgroundColor: "#1DB954", color: "#fff", margin: "20px" });
  };
  const hideCard = (e) => {
    setTextStatus("hideText");
    setStyle({ backgroundColor: "#faf0e6", margin: "20px" });
  };

  return (
    <Card style={style}>
      <CardBody
        className="cardTitle"
        onMouseEnter={(e) => showCard(e)}
        onMouseLeave={(e) => hideCard(e)}
      >
        <CardTitle tag="h5">{props.title}</CardTitle>
        <CardText className={textStatus} tag="h6">
          {props.value}
        </CardText>
      </CardBody>
    </Card>
  );
}

export default StatCard;
