# Automated Test Framework coverage

The PDI test suite must prove:

1. Viewer can read a labeled synthetic context and cannot write.
2. Commander can approve an unchanged plan and cannot execute it.
3. Executor cannot execute without a matching approval.
4. A changed plan fingerprint invalidates the approval.
5. Repeated `Idempotency-Key` values return the first trace and create no second task.
6. A non-synthetic incident is rejected.
7. Rollback flow creates a single synthetic task and captures the Flow Context ID.
8. Unauthorized direct writes to plan, approval, action, and trace tables fail.

ATF export artifacts will be added after the live PDI run. This file does not claim that those tests have run.
