import "../App.css";
import React, { useState } from "react";
import { Card, CardBody, CardTitle, CardText } from "reactstrap";

function StatCard(props) {
  const [style, setStyle] = useState({
    backgroundColor: "#faf0e6",
    margin: "20px",
    padding: "5px 10px",
  });
  const showCard = (e) => {
    setStyle({
      backgroundColor: "#1DB954",
      color: "#fff",
      margin: "20px",
      padding: "5px 10px",
    });
  };
  const hideCard = (e) => {
    setStyle({
      backgroundColor: "#faf0e6",
      margin: "20px",
      padding: "5px 10px",
    });
  };

  return (
    <Card style={style}>
      <CardBody
        className="cardTitle"
        onMouseEnter={(e) => showCard(e)}
        onMouseLeave={(e) => hideCard(e)}
      >
        <CardTitle tag="h5">{props.title}</CardTitle>
        <CardText tag="h6">{props.value}</CardText>
      </CardBody>
    </Card>
  );
}

export default StatCard;
