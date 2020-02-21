import React from "react";

export default () => {
  const [loading, setLoading] = React.useState(false);
  const [widgets, setWidgets] = React.useState([]);

  React.useEffect(() => {
    setLoading(true);
    fetch(
      "https://8703b7e2-39a9-46c9-888e-71d05385ced9.mock.pstmn.io/_services/topics/sidebar/widgets?target=website",
      {
        method: "GET"
      }
    )
      .then(response => response.json())
      .then(data => {
        setLoading(false);
        setWidgets(data);
      });
  }, []);

  return { loading, widgets };
};
