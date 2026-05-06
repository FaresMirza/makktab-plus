-- Allow ProjectFile to belong to a specific task in addition to a project.
-- Files attached at the task level have taskId set; project-wide files leave it null.
ALTER TABLE "ProjectFile" ADD COLUMN "taskId" INTEGER;
ALTER TABLE "ProjectFile"
  ADD CONSTRAINT "ProjectFile_taskId_fkey"
  FOREIGN KEY ("taskId") REFERENCES "Task"("id") ON DELETE CASCADE ON UPDATE CASCADE;
CREATE INDEX "ProjectFile_taskId_idx" ON "ProjectFile" ("taskId");
