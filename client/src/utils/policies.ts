import { Project, User } from "../types";

export function isManager(managerID: Project['manager'], userID: User['_id']){
    return managerID === userID;
}