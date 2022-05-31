import React, { useContext, useEffect, useState } from "react";
import { Grid, Typography, CircularProgress } from "@mui/material";

// context
import GlobalContext from "../../../context/global-context";

// service
import service from "../../../services/staff-service";

const Documents = () => {
  const { loading, onLoading } = useContext(GlobalContext);

  const [groupSubmissions, setGroupSubmission] = useState([]);

  const fetchSubmissions = async () => {
    try {
      onLoading(true);
      const response = await service.getGroupSubmissions();

      if (response.status === 200) {
        setGroupSubmission(response.data.body.groups);
      }
      onLoading(false);
    } catch (error) {
      onLoading(false);
      console.log(error);
    }
  };

  const onClickHandler = (file) => {
    window.open(`http://localhost:5000/images/${file}`, "_blank");
  };

  useEffect(() => {
    fetchSubmissions();
  }, []);

  return (
    <div style={{ minHeight: "400px" }}>
      {loading && <CircularProgress sx={{ marginLeft: "50%" }} />}
      {!loading && (
        <Grid container spacing={2}>
          {groupSubmissions.map((item, index) => (
            <React.Fragment key={index}>
              <Grid item xs={12}>
                <Typography variant="subtitle1">{item.name}</Typography>
              </Grid>
              {item.submissions.map((submission) => (
                <React.Fragment key={submission._id}>
                  <Grid item xs={1} />
                  <Grid item xs={11}>
                    <span
                      onClick={onClickHandler.bind(null, submission.file_name)}
                    >
                      <Typography
                        variant="subtitle2"
                        sx={{ color: "blue", cursor: "pointer" }}
                        on
                      >
                        {submission.file_name}
                      </Typography>
                    </span>
                  </Grid>
                </React.Fragment>
              ))}
            </React.Fragment>
          ))}
        </Grid>
      )}
    </div>
  );
};

export default Documents;
