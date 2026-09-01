from __future__ import annotations

from datetime import UTC, datetime, timedelta

from .models import EvidenceRecord, IncidentContext, RecordKind


def demo_context() -> IncidentContext:
    now = datetime.now(UTC)
    return IncidentContext(
        incident_id="INC-1047",
        severity="SEV-1",
        service="Citizen Services Portal",
        opened_at=now - timedelta(minutes=18),
        summary="Authentication failures increased after a gateway routing change.",
        evidence=[
            EvidenceRecord(
                evidence_id="EV-01",
                record_kind=RecordKind.INCIDENT,
                record_id="INC-1047",
                observed_at=now - timedelta(minutes=18),
                statement="Login failures rose from the synthetic baseline to 37 percent.",
                source_field="short_description",
                trust="authoritative",
            ),
            EvidenceRecord(
                evidence_id="EV-02",
                record_kind=RecordKind.CHANGE,
                record_id="CHG-0284",
                observed_at=now - timedelta(minutes=31),
                statement="Gateway route weights changed from 50/50 to 90/10.",
                source_field="implementation_plan",
                trust="authoritative",
            ),
            EvidenceRecord(
                evidence_id="EV-03",
                record_kind=RecordKind.CONFIGURATION_ITEM,
                record_id="CI-AUTH-07",
                observed_at=now - timedelta(minutes=3),
                statement="Identity gateway is upstream of web, permits, and payments.",
                source_field="dependency",
                trust="authoritative",
            ),
            EvidenceRecord(
                evidence_id="EV-04",
                record_kind=RecordKind.WORK_NOTE,
                record_id="NOTE-191",
                observed_at=now - timedelta(minutes=6),
                statement="Operator reproduced the failure only on the newly weighted route.",
                source_field="work_notes",
                trust="operator",
            ),
        ],
    )
