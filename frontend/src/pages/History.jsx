import React, { useEffect, useState } from "react";

const HistoryPage = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/results`,
          {
            method: "GET",
            credentials: "include",
          }
        );

        const data = await res.json();

        if (data.success) {
          setHistory(data.data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchHistory();
  }, []);

  console.log(history);

  return (
    <div className="historyPage">
      <h1>History</h1>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "20px",
          marginBottom: "20px",
        }}
      >
        {history.length > 0 &&
          history.map((item) => (
            <div
              key={item._id}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                padding: "20px",
                border: "1px solid #ccc",
                borderRadius: "10px",
              }}
            >
              <img
                src={item.predImageURL}
                alt="leaf"
                style={{
                  width: "200px",
                  height: "200px",
                  objectFit: "cover",
                  borderRadius: "10px",
                  placeSelf: "center",
                  border: "1px solid #ccc",
                }}
              />
              <div style={{ display: "flex", flexDirection: "column" }}>
                <span
                  style={{
                    fontWeight: "700",
                    fontSize: "1.2rem",
                    paddingBottom: "5px",
                  }}
                >
                  Prediction Results
                </span>
                <span style={{ fontWeight: "700", color: "white" }}>
                  {
                    item?.predictionOfAllModels
                      ?.sort(
                        (a, b) =>
                          parseFloat(b.confidence) - parseFloat(a.confidence)
                      )[0]
                      ?.message.split("___")[1].split(" with")[0]
                  }
                </span>
                <span>
                  Confidence with the highest prediction:{" "}
                  <span style={{ fontWeight: "700", color: "white" }}>
                    {
                      item?.predictionOfAllModels?.sort(
                        (a, b) =>
                          parseFloat(b.confidence) - parseFloat(a.confidence)
                      )[0]?.confidence
                    }
                  </span>
                </span>
                <span>
                  Date of Prediction:{" "}
                  {new Date(item.createdAt).toLocaleString()}
                </span>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default HistoryPage;