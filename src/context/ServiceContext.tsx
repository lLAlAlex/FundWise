import { _SERVICE } from "@/declarations/project_backend/project_backend.did";
import { ActorSubclass, AuthClient, HttpAgent } from "@ic-reactor/react/dist/types";
import { ReactNode, createContext, useState } from "react";

interface Props {
    children: ReactNode;
}

export type ServiceContextType = {
    getProjectService: () => Promise<ActorSubclass<_SERVICE>>;
};

/**
 * ServiceContext for the application
 * @type {React.Context<ServiceContextType>}
 */
export const ServiceContext = createContext<ServiceContextType>({
    getProjectService: null!,
});

export default function ServiceContextProvider({ children }: Props) {
    const [projectService, setprojectService] = useState<ActorSubclass<_SERVICE>>();

    /**
     * getJobService function
     * @returns {Promise<ActorSubclass<_SERVICE_JOB>>} - The job service
     */
    const getprojectService = async () => {

    };
}