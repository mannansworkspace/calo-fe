import { backendApiUrl } from "../config";
import { AppJob, Jobs, NewJob } from "../interfaces";
import { axiosInstance } from "../utils/axios";

export const fetchAllJobs = async (): Promise<Jobs | null> => {
  try {
    const {
      data: { jobs },
    } = await axiosInstance.get(`${backendApiUrl}/jobs`);
    return jobs;
  } catch (error) {
    console.log("Error while fetching jobs", error);
    return null;
  }
};

export const createJob = async (body: NewJob): Promise<AppJob | null> => {
  try {
    const {
      data: { job },
    } = await axiosInstance.post(`${backendApiUrl}/jobs`, body);
    return job;
  } catch (error) {
    console.log("Error while creating job", error);
    return null;
  }
};

export const getJobById = async (
  id: string
): Promise<{ job: AppJob } | null> => {
  try {
    const { job } = (await axiosInstance.get(
      `${backendApiUrl}/jobs/${id}`
    )) as {
      job: AppJob;
    };
    return { job };
  } catch (error) {
    console.log("Error while getting job by id", error);
    return null;
  }
};
