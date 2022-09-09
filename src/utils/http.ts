import axios from "axios";
import { Job, UserInfo } from "./models";

export function getJobs(): Promise<Job[]> {
    return axios.get<Job[]>('/data.json').then(response => response.data);
}

export function getJobById(jobId: number): Promise<Job | null> {
    return axios.get<Job[]>('/data.json').then(response => {
        return response.data.find(job => job.id === jobId) ?? null;
    });
}

export function authenticate(userInfo: UserInfo) {
    return axios.post<{token: string}>('http://localhost:8080/api/login', userInfo).then(response => response.data);
}

export function checkAuth(token: string | null) {
    return axios.post('http://localhost:8080/api/verify', { token });
}
