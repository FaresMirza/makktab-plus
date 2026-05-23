-- Records when a task was marked DONE. Set by the API on the status transition;
-- cleared if the task is reopened. Existing DONE tasks remain NULL — going
-- forward this column is the source of truth for "when did the assignee
-- finish this task" displayed in the project progress report.
ALTER TABLE "Task" ADD COLUMN "completedAt" TIMESTAMP(3);
