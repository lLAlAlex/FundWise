import { useContext } from "react";
import { ServiceContext } from "../context/ServiceContext";

export default function useService() {
    return useContext(ServiceContext);
}