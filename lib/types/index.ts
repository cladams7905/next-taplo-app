import { Enums } from "../supabase/types";

export type FilterBuilder = {
  importanceFilter: Enums<"Importance">[] | [];
  statusFilter: Enums<"RequestStatus">[] | [];
  typeFilter: Enums<"FeatureType">[] | [];
};
