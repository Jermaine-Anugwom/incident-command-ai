# ServiceNow scoped application

This directory contains the clean-room source blueprint for the `Incident Command AI` scoped application (`x_2214142_ica`). It targets a free, non-production Personal Developer Instance and uses only synthetic records.

The public companion and FastAPI service run without ServiceNow. The PDI is used to prove the native integration path: context ingestion, plan creation, approval, execution trace, and rollback request.

## Roles

- `x_2214142_ica.viewer`: read synthetic contexts, plans, and traces.
- `x_2214142_ica.commander`: approve or reject an exact plan fingerprint.
- `x_2214142_ica.executor`: execute a previously approved, unchanged plan.

## Source-control path

1. Create a new scoped application named `Incident Command AI` in ServiceNow Studio.
2. Create the tables and fields in `app-manifest.json`.
3. Add the Script Include and Scripted REST resources in this directory.
4. Create the listed roles and ACLs. Writes require `GlideRecordSecure` and the narrow role for the operation.
5. Add the ATF tests before enabling the integration user.
6. Link the scoped app to this repository only after a clean-room review.

No PDI URL, credential, session, or exported real record belongs in this repository.
