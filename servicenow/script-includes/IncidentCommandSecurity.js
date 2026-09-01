var IncidentCommandSecurity = Class.create();
IncidentCommandSecurity.prototype = {
    initialize: function() {},

    requireRole: function(role) {
        if (!gs.hasRole(role)) {
            throw new sn_ws_err.ForbiddenError('Required role is missing');
        }
    },

    requireSyntheticIncident: function(incident) {
        if (!incident.isValidRecord() || incident.getValue('u_synthetic_demo') !== 'true') {
            throw new sn_ws_err.BadRequestError('Only labeled synthetic demonstration records are supported');
        }
    },

    type: 'IncidentCommandSecurity'
};
