import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import {
  TextField,
  Button,
  Autocomplete,
  Box,
  FormHelperText,
} from "@mui/material";
import * as Yup from "yup";
import { JobType, JobStatus, ExperienceLevel } from "../../constants";
import { NewJob } from "../../interfaces";
import { createJob } from "../../services/jobs.service";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const initialValues: NewJob = {
  title: "",
  description: "",
  jobType: JobType.Remote,
  experienceLevel: ExperienceLevel.Junior,
  status: JobStatus.Pending,
};

const validationSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  description: Yup.string(),
  jobType: Yup.string().required("Job type is required"),
  experienceLevel: Yup.string().required("Experience level is required"),
  status: Yup.string().required("Status is required"),
});

const JobForm: React.FC = () => {
  const navigate = useNavigate();

  const handleSubmit = async (values: NewJob) => {
    const newJob = await createJob(values);
    if (!newJob) {
      toast("Something went wrong Please try again", { type: "error" });
      return;
    }
    toast("New Job has been successfully created", { type: "success" });
    navigate("/jobs");
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ values, setFieldValue, touched, errors }) => (
        <Form>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              width: 300,
            }}
          >
            {/* Title Field */}
            <Field
              name="title"
              as={TextField}
              label="Title"
              variant="outlined"
              fullWidth
              error={!!(touched.title && errors.title)}
              helperText={<ErrorMessage name="title" />}
            />

            {/* Description Field */}
            <Field
              name="description"
              as={TextField}
              label="Description"
              variant="outlined"
              fullWidth
              multiline
              rows={4}
              error={!!(touched.description && errors.description)}
              helperText={<ErrorMessage name="description" />}
            />

            {/* Job Type Autocomplete */}
            <Autocomplete
              id="jobType"
              options={Object.values(JobType)}
              value={values.jobType || ""}
              onChange={(_, value) => setFieldValue("jobType", value)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Job Type"
                  variant="outlined"
                  fullWidth
                  error={!!(touched.jobType && errors.jobType)}
                />
              )}
            />
            {touched.jobType && errors.jobType && (
              <FormHelperText error>{errors.jobType}</FormHelperText>
            )}

            {/* Experience Level Autocomplete */}
            <Autocomplete
              id="experienceLevel"
              options={Object.values(ExperienceLevel)}
              value={values.experienceLevel || ""}
              onChange={(_, value) => setFieldValue("experienceLevel", value)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Experience Level"
                  variant="outlined"
                  fullWidth
                  error={!!(touched.experienceLevel && errors.experienceLevel)}
                />
              )}
            />
            {touched.experienceLevel && errors.experienceLevel && (
              <FormHelperText error>{errors.experienceLevel}</FormHelperText>
            )}

            {/* Status Autocomplete */}
            <Autocomplete
              id="status"
              options={Object.values(JobStatus)}
              value={values.status || ""}
              onChange={(_, value) => setFieldValue("status", value)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Status"
                  variant="outlined"
                  fullWidth
                  error={!!(touched.status && errors.status)}
                />
              )}
            />
            {touched.status && errors.status && (
              <FormHelperText error>{errors.status}</FormHelperText>
            )}

            {/* Submit Button */}
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default JobForm;
