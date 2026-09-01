from evaluations.cases import build_cases


def test_evaluation_inventory_contains_150_cases():
    cases = build_cases()
    assert len(cases) == 150
    assert len({case.case_id for case in cases}) == 150
    assert {case.expected for case in cases} == {"plan", "abstain", "review", "deduplicate"}
