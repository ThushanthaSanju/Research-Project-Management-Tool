import { Grid, Typography, CircularProgress } from "@mui/material";
import React, { useEffect, useState, useContext } from "react";

// context
import GlobalContext from "../../../context/global-context";

// service
import service from "../../../services/student-service";

const Templates = () => {
  const { loading, onLoading } = useContext(GlobalContext);

  const [templates, setTemplates] = useState([]);

  const onClickHandler = (file) => {
    // download file
    window.open(`http://localhost:5000/images/${file}`, "_blank");
  };

  // fetch all templates
  const fetchTemplates = async () => {
    try {
      onLoading(true);
      const response = await service.getTemplates();

      if (response.status === 200) {
        const arr = [...response.data.body.templates];
        const tempArr = [];

        // convert response
        for (let i = 0; i < arr.length; i++) {
          const index = tempArr.findIndex(
            (item) => item.type === arr[i].submission_type.name
          );
          if (index > 0) {
            tempArr[index] = {
              type: tempArr[index].type,
              files: [...tempArr[index].files, arr[i].file_name],
            };
          } else {
            const obj = {
              type: arr[i].submission_type.name,
              files: [arr[i].file_name],
            };
            tempArr.push(obj);
          }
        }
        setTemplates(tempArr);
      }
      onLoading(false);
    } catch (error) {
      onLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTemplates();
  }, []);

  return (
    <Grid container spacing={2} sx={{ minHeight: "400px" }}>
      {loading && (
        <CircularProgress sx={{ marginLeft: "50%", marginTop: "10%" }} />
      )}
      {!loading && templates.map((template, index) => (
        <>
          <Grid key={index} item xs={12}>
            <Typography variant="subtitle1">{template.type}</Typography>
          </Grid>
          {template.files.map((file) => (
            <>
              <Grid key={file} xs={1} />
              <Grid key={file} item xs={11}>
                <span onClick={onClickHandler.bind(null, file)}>
                  <Typography
                    variant="subtitle2"
                    sx={{ color: "blue", cursor: "pointer" }}
                  >
                    {file}
                  </Typography>
                </span>
              </Grid>
            </>
          ))}
        </>
      ))}
    </Grid>
  );
};

export default Templates;
