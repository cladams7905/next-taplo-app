import { createContext, useContext } from "react";

// Create a context to hold the shared props
const ProjectContext = createContext(null);

export const useProjectContext = () => useContext(ProjectContext);
