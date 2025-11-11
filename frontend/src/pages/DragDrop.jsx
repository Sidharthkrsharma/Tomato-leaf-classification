import { useEffect, useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { checkToken } from "..";
import upl from "../upload.png";

const DragDropFiles = () => {
  const [files, setFiles] = useState(null);
  const inputRef = useRef();
  const navigate = useNavigate();
  console.log(checkToken("token"));
  const [predictionData, setPredictionData] = useState(null);
  const [openResult, setOpenResult] = useState({ open: false, data: [] });

  useEffect(() => {
    if (!checkToken("token")) {
      navigate("/");
    }
  }, []);

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setFiles(e.dataTransfer.files[0]);
  };

  const clearImage = () => {
    setFiles(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", files);

    try {
      toast.loading("Predicting...");
      const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/predict`, {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      const data = await res.json();

      if (data.success && data.data !== null) {
        setPredictionData(data.data);
        setOpenResult({ open: true, data: data.data });
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      toast.dismiss();
    }
  };

  const handleFileSelect = () => {
    inputRef.current.click();
  };

  const uploadStyle = {
    width: "250px",
    height: "250px",
    top: "314px",
    left: "406px",
    padding: "52.08px",
  };
  const predictBut = () => {
    alert("Please add an image");
  };

  return !openResult.open ? (
    <Form onSubmit={handleSubmit} className="uploads">
      {files !== null ? (
        <div>
          <ul>
            <li>{files.name}</li>
          </ul>
          <div className="actions">
            <img src={URL.createObjectURL(files)} alt={`Uploaded file`} />
            <div className="dragButton">
              <Button variant="success" className="drgn" onClick={clearImage}>
                Cancel
              </Button>
              <Button variant="warning" className="drgn" type="submit">
                Predict
              </Button>
              {
                predictionData !== null && (
                  <Button variant="warning" className="drgn" onClick={() => setOpenResult({ open: true, data: predictionData })}>
                    Go to results
                  </Button>
                )
              }
            </div>
          </div>
        </div>
      ) : (
        <form className="dropping" onSubmit={handleSubmit}>
          <label htmlFor="file" className="dropzone" onDragOver={handleDragOver} onDrop={handleDrop} style={{ cursor: "pointer" }}>
            <img src={upl} alt="uploadIcon" style={uploadStyle} />
            <span className="drag-drop"> Drop images here, or click to upload. {""}</span>
            <input type="file" id="file" onChange={(event) => setFiles(event.target.files[0])} hidden ref={inputRef} />
          </label>
          <div className="predictButton">
            <Button variant="success" className="drgn" onClick={predictBut}>
              Cancel
            </Button>
            <Button variant="warning" className="drgn" onClick={predictBut} type="submit">
              Predict
            </Button>
          </div>
        </form>
      )}
    </Form>
  ) : (
    <ResultPage data={openResult.data} open={openResult.open} setOpen={setOpenResult} />
  );
};

export default DragDropFiles;

const modelNames = ["Novel CNN", "INCEPTIONV3", "MobileNetV2", "AlexNet", "Resnet50", "VGG19", "Essemble Learning Model(based on Novel CNN, MobileNetV and Resnet50)"];

const ResultPage = ({ data, open, setOpen }) => {

  const { predictionOfAllModels, finalPredictedResultOfTheLeaf, predImageURL } =
    data;

  return (
    <div className={`modal ${open ? "open" : ""}`}>
      <div className="modal-overlay" onClick={() => setOpen({ open: false })}></div>
      <div className="modal-content glassmorphism">
        <span className="close-btn" onClick={() => setOpen({ open: false })}>
          X
        </span>
        <h1 className="result-title">Results of the Prediction</h1>

        <div className="image-container">
          <img
            src={predImageURL}
            alt="Predicted Image"
            className="predicted-image"
          />
        </div>

        <div className="table-container">
          <h2>Predictions from All Models:</h2>
          <table className="prediction-table">
            <thead>
              <tr>
                <th>Model Name</th>
                <th>Status of the leaf</th>
                <th>Confidence</th>
              </tr>
            </thead>
            <tbody>
              {predictionOfAllModels.map((prediction, index) => (
                <tr key={index}>
                  <td>{modelNames[index]}</td>
                  <td>{prediction.message.split("___")[1].split(" with")[0]}</td>
                  <td>{prediction.confidence}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="final-prediction-container">
          <h2>Final Predicted Result:</h2>
          <p className="final-message">{finalPredictedResultOfTheLeaf.final_message}</p>
          <h2>About Disease:</h2>
          <p className="about-disease">{finalPredictedResultOfTheLeaf.about_the_final_predicted_disease}</p>
          <h2>Cure:</h2>
          <p className="cure">{finalPredictedResultOfTheLeaf.cure_of_the_final_predicted_disease}</p>
        </div>

        <div className="confidence-info">
          <h2>Confidence Information:</h2>
          <p>Maximum Confidence: {finalPredictedResultOfTheLeaf.maximum_confidence_among_the_common_disease_predicted_by_the_models}</p>
          <p>Models That Made Common Prediction: {finalPredictedResultOfTheLeaf.models_that_made_the_common_prediction_along_with_their_confidence.join(', ')}</p>
        </div>
      </div>
    </div>
  );
};