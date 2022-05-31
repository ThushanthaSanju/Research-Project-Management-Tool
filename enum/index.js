const SUBMISSION_TYPES = {
  INITIAL: "initial",
  PROPOSAL: "proposal",
  PROGRESS_REVIEW_ONE: "progress_review_one",
  PROGRESS_REVIEW_TWO: "progress_review_two",
  FINAL: "final",
};

const USER_ROLES = {
  ADMIN: 'admin',
  STUDENT: 'student',
  STAFF: 'staff'
};

const REQUEST_STATUS_TYPES = {
  PENDING: 'pending',
  ACCEPTED: 'accepted',
  REJECTED: 'rejected'
};

const RESEARCH_TOPIC_STATUS = {
  PENDING: 'pending',
  ACCEPTED: 'accepted',
  REJECTED: 'rejected'
};

const RESEARCH_ROLES = {
  SUPERVISOR: 'supervisor',
  CO_SUPERVISOR: 'coSupervisor'
};

module.exports = {
  SUBMISSION_TYPES,
  USER_ROLES,
  REQUEST_STATUS_TYPES,
  RESEARCH_TOPIC_STATUS,
  RESEARCH_ROLES
};
