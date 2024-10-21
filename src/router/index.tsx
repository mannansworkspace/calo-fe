import { createBrowserRouter } from "react-router-dom";
import AppJobs from "../components/job";
import JobForm from "../components/job/JobForm";
import { RootLayout } from "../components/layouts";
import { fetchAllJobs } from "../services/jobs.service";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "jobs",
        children: [
          {
            loader: fetchAllJobs,
            element: <AppJobs />,
            index: true,
          },
          {
            element: <JobForm />,
            path: "create",
          },
        ],
      },
    ],
  },
]);

export default appRouter;
