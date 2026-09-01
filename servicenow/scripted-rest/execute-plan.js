(function process(request, response) {
    var security = new IncidentCommandSecurity();
    security.requireRole('x_jana_ica.executor');

    var planId = request.pathParams.id;
    var key = request.getHeader('Idempotency-Key');
    if (!key) {
        throw new sn_ws_err.BadRequestError('Idempotency-Key is required');
    }

    var existing = new GlideRecordSecure('x_jana_ica_trace');
    existing.addQuery('event_key', key);
    existing.query();
    if (existing.next()) {
        response.setStatus(200);
        return { result: 'duplicate', trace_id: existing.getUniqueValue() };
    }

    var plan = new GlideRecordSecure('x_jana_ica_plan');
    if (!plan.get(planId)) {
        throw new sn_ws_err.NotFoundError('Plan not found');
    }

    var approval = new GlideRecordSecure('x_jana_ica_approval');
    approval.addQuery('plan', planId);
    approval.addQuery('decision', 'approved');
    approval.addQuery('plan_fingerprint', plan.getValue('context_fingerprint'));
    approval.setLimit(1);
    approval.query();
    if (!approval.next()) {
        throw new sn_ws_err.ConflictError('Matching approval is required');
    }

    var trace = new GlideRecordSecure('x_jana_ica_trace');
    trace.initialize();
    trace.setValue('plan', planId);
    trace.setValue('event_key', key);
    trace.setValue('actor', gs.getUserID());
    trace.setValue('input_fingerprint', plan.getValue('context_fingerprint'));
    trace.setValue('result', 'executed');
    trace.setValue('detail', 'Synthetic execution accepted; Flow Designer owns downstream task creation.');
    var traceId = trace.insert();

    response.setStatus(201);
    return { result: 'executed', trace_id: traceId };
})(request, response);
