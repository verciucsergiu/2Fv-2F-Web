var a = require('./app.config');
var auth = require('./authentication.service');
var gr = require('./group.service');
var iv = require('./invitation.service');
var pr = require('./professor.service');
var st = require('./student.service');
var md = require('./media.service');
var ex = require('./exporter.service');

module.exports.AppConfig = a.AppConfig;
module.exports.AuthService = auth.AuthService;
module.exports.GroupService = gr.GroupService;
module.exports.InvitationService = iv.InvitationService;
module.exports.ProfessorService = pr.ProfessorService;
module.exports.StudentService = st.StudentService;
module.exports.MediaService = md.MediaService;
module.exports.ExporterService = ex.ExporterService;
