import * as React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import { Box, Button } from "@mui/material";
import { useLoaderData, useNavigate } from "react-router-dom";
import { AppJob, Jobs } from "../../interfaces";
import JobInfoModal from "./JobInfoModal";
import { JobStatus } from "../../constants";
import { EventSourcePlus } from "event-source-plus";
import { backendApiUrl } from "../../config";

const columns: GridColDef<AppJob>[] = [
  { field: "id", headerName: "Id", width: 70 },
  { field: "title", headerName: "Title", width: 130 },
  { field: "jobType", headerName: "Type", width: 130 },
  {
    field: "experienceLevel",
    headerName: "Experience",
    width: 90,
  },
  {
    field: "status",
    headerName: "Status",
    width: 130,
  },
];

const paginationModel = { page: 0, pageSize: 50 };

export default function AppJobs() {
  const navigate = useNavigate();
  let jobs = useLoaderData() as Jobs;
  const [currentJob, setCurrentJob] = React.useState<AppJob | null>(null);

  const transformServerJobs = (jobs: Jobs) => {
    return Object.values(jobs).reverse();
  };

  const [appJobs, setAppJobs] = React.useState<AppJob[]>(
    transformServerJobs(jobs)
  );

  React.useEffect(() => {
    const eventSource = new EventSourcePlus(`${backendApiUrl}/jobs/stream`);

    const controller = eventSource.listen({
      onMessage: (event) => {
        const data = JSON.parse(event.data);
        if (data) {
          switch (data.type) {
            case "mutation": {
              // eslint-disable-next-line
              jobs = {
                ...jobs,
                [data.job.id]: data.job,
              };
              setAppJobs(transformServerJobs(jobs));
              break;
            }
            default:
              break;
          }
        }
      },
    });
    return () => {
      controller.abort();
    };
  }, []);

  return (
    <Paper sx={{ height: "100%", width: "100%" }}>
      <Box sx={{ display: "flex" }}>
        <Button
          sx={{ backgroundColor: "black" }}
          onClick={() => navigate("create")}
          variant="contained"
        >
          Create Job
        </Button>
      </Box>
      <DataGrid
        rows={appJobs}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10, 15]}
        autoPageSize
        sx={{ border: 0 }}
        onRowClick={(row) => {
          const job = row.row as AppJob;
          if (job.status === JobStatus.Completed) setCurrentJob(row.row);
        }}
        disableMultipleRowSelection={true}
        hideFooterPagination={true}
      />

      {currentJob && (
        <JobInfoModal job={currentJob} onClose={() => setCurrentJob(null)} />
      )}
    </Paper>
  );
}
