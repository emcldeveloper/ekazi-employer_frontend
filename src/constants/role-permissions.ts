export const PERMISSIONS = {
  // Dashboard
  VIEW_DAHSBOARD: "view-dashboard",

  // Profile
  VIEW_PROFILE: "view-profile",
  UPDATE_PROFILE: "update-profile",

  // Jobs
  VIEW_JOBS: "view-jobs",
  POST_JOB: "post-job",
  EDIT_JOB: "edit-job",
  PUBLISH_JOB: "publish-job",
  JOB_SETTINGS: "job-settings",
  DELETE_JOB: "delete-job",

  // Job seekers
  VIEW_JOBSEEKERS: "view-jobseekers",
  VIEW_JOBSEEKER_DETAILS: "view-jobseeker-details",
  SHORTLIST_JOBSEEKER: "shortlist-jobseeker",
  COLLECT_JOBSEEKER_CV: "collect-jobseeker-cv",

  // Applicants
  VIEW_APPLICANTS: "view-applicants",
  VIEW_APPLICANT_DETAILS: "view-applicant-details",
  SHORTLIST_APPLICANTS: "shortlist-applicant",

  // Tasks
  VIEW_TASKS: "view-tasks",
  CREATE_TASK: "create-task",
  EDIT_TASK: "edit-task",
  DELETE_TASK: "delete-task",

  // Clients
  VIEW_CLIENT: "view-clients",
  CREATE_CLIENT: "create-client",
  EDIT_CLIENT: "edit-client",
  DELETE_CLIENT: "delete-client",

  // Staff
  VIEW_STAFF: "view-staff",
  CREATE_STAFF: "create-staff",
  EDIT_STAFF: "edit-staff",
  DELETE_STAFF: "delete-staff",

  // Subscription
  VIEW_SUBSCRIPTION: "view-subscription",
  UPGRADE_PLAN: "upgrade-subscription",

  // Settings
  VIEW_SETTINGS: "view-settings",
  CHANGE_PASSWORD: "change-password",
} as const;

export type Permission = (typeof PERMISSIONS)[keyof typeof PERMISSIONS];
