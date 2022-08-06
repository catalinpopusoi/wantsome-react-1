import axios from "axios";
import { Job } from "./models";

export function getJobs(): Promise<Job[]> {
    return axios.get<Job[]>('/data.json').then(response => response.data);
}

export function getJobById(jobId: number): Promise<Job | null> {
    return axios.get<Job[]>('/data.json').then(response => {
        return response.data.find(job => job.id === jobId) ?? null;
    });
}
