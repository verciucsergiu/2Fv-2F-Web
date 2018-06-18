var lg = require('./login.model');
var pf = require('./professor.model');
var rg = require('./register.model');
var st = require('./student.model');
var us = require('./user.model');

module.exports.LoginModel = lg.LoginModel;
module.exports.ProfessorModel = pf.ProfessorModel;
module.exports.RegisterModel = rg.RegisterModel;
module.exports.ProfRegisterModel = rg.ProfRegisterModel;
module.exports.Student = st.Student;
module.exports.UserModel = us.UserModel;