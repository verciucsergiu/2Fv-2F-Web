var fr = require('../../framework/main');
var app = require('./app.config');

var ExporterService = class {

    static exportStudentListCSV(studentList) {

        let text = "firstName,lastName,group,cnp,id,W0,W0,W1,W1,W2,W2,W3,W3,W4,W4,W5,W5,W6,W6,W7,W7,W8,W8,W9,W9,W10,W10,W11,W11,W12,W12" + "\n";
        let filename = "studentlist.csv";

        for (let student of studentList) {
            text = text + student.firstName + ',' + student.lastName + ',';
            text = text + student.group + ',';
            text = text + student.cnp + ',' + student.id + ',';
            for (let attendance of student.attendanceComments) {
                text = text + attendance.comment + ',' + attendance.value + ',';
            }
            text = text + "\n";
        }

        this.exportThis(text, filename, "csv");
    }

    static exportStudentListXML(studentList) {
        let text = "<list>" + "\n";
        let filename = "studentlist.xml";
        let indent = "  ";
        let xindent = indent + "  ";
        let xxindent = xindent + "  ";

        text = text + indent;
        for (let student of studentList) {
            text = text + indent + "<student>" + "\n"; text = text + xindent;

            text = text + "<firstname>" + student.firstName + "</firstname>" + "\n"; text = text + xindent;
            text = text + "<lastname>" + student.lastName + "</lastname>" + "\n"; text = text + xindent;
            text = text + "<group>" + student.group + "</group>" + "\n"; text = text + xindent;
            text = text + "<cnp>" + student.cnp + "</cnp>" + "\n"; text = text + xindent;
            text = text + "<id>" + student.id + "</id>" + "\n"; text = text + xindent;

            text = text + "<attendance>" + "\n";
            for (let attendance of student.attendanceComments) {
                text = text + xxindent + "<weekNumber>" + attendance.weekNumber + "</weekNumber>" + "\n";
                text = text + xxindent + "<comment>" + attendance.comment + "</comment>" + "\n";
                text = text + xxindent + "<value>" + attendance.value + "</value>" + "\n";
            }
            text = text + xindent + "</attendance>" + "\n";

            text = text + indent + "</student>" + "\n";
        }
        text = text + "</list>"

        this.exportThis(text, filename, "plain");
    }

    static exportStudentListHTML(studentList) {

        let text = this.loadHTMLTemplate();
        let filename = "studentlist.html";
        text = text + "<body>\n\
    <table class=\"student-list\">\n\
        <thead>\n\
            <th>First Name</th>\n\
            <th>Last Name</th>\n\
            <th>Group</th>\n            <th>CNP</th>\n            <th>id</th>\n\
            <th>C-W0</th>\n            <th>N-W0</th>\n\
            <th>C-W1</th>\n            <th>N-W1</th>\n\
            <th>C-W2</th>\n            <th>N-W2</th>\n\
            <th>C-W3</th>\n            <th>N-W3</th>\n\
            <th>C-W4</th>\n            <th>N-W4</th>\n\
            <th>C-W5</th>\n            <th>N-W5</th>\n\
            <th>C-W6</th>\n            <th>N-W6</th>\n\
            <th>C-W7</th>\n            <th>N-W7</th>\n\
            <th>C-W8</th>\n            <th>N-W8</th>\n\
            <th>C-W9</th>\n            <th>N-W9</th>\n\
            <th>C-W10</th>\n            <th>N-W10</th>\n\
            <th>C-W11</th>\n            <th>N-W11</th>\n\
            <th>C-W12</th>\n            <th>N-W12</th>\n\
        </thead>\n\
    <tbody>\n";
        for (let student of studentList) {
            text = text + "\
        <tr>\n\
            <td>" + student.firstName + "</td>\n\
            <td>" + student.lastName + "</td>\n\
            <td>" + student.group + "</td>\n\
            <td>" + student.cnp + "</td>\n\
            <td>" + student.id + "</td>\n";
            for (let attendance of student.attendanceComments) {
                text = text + "\
            <td>" + attendance.comment + "</td>\n\
            <td>" + attendance.value + "</td>\n"
            }
            text = text + "\
        </tr>";
        }

        text = text + "    </tbody>\n  </table>\n</body>\n</html>\n";
        this.exportThis(text, filename, "html");
    }

    static exportThis(text, filename, type) {
        let element = document.createElement('a');
        element.setAttribute('href', 'data:text/' + type + ';charset=utf-8,' + encodeURIComponent(text));
        element.setAttribute('download', filename);
        element.style.display = 'none';

        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    }

    static loadHTMLTemplate() {
        let text = "<!DOCTYPE html>\n\
<html>\n\
<head>\n\
    <meta charset=\"utf-8\">\n\
    <title>Student List</title>\n\
    <style>\n\
        table.student-list {\n\
            border: 1px solid #1C6EA4;\n\
            background-color: #FFFFFF;\n\
            width: 100%;\n\
            text-align: left;\n\
            border-collapse: collapse;\n\
        }\n\
        table.student-list td,\n\
        table.student-list th {\n\
            border: 1px solid #AAAAAA;\n\
            padding: 3px 2px;\n\
        }\n\
        table.student-list tbody td {\n\
            font-size: 13px;\n\
        }\n\
        table.student-list tr:nth-child(even) {\n\
            background: #D0E4F5;\n\
        }\n\
        table.student-list thead {\n\
            background: #1C6EA4;\n\
            background: -moz-linear-gradient(top, #5592bb 0%, #327cad 66%, #1C6EA4 100%);\n\
            background: -webkit-linear-gradient(top, #5592bb 0%, #327cad 66%, #1C6EA4 100%);\n\
            background: linear-gradient(to bottom, #5592bb 0%, #327cad 66%, #1C6EA4 100%);\n\
            border-bottom: 2px solid #444444;\n\
        }\n\
        table.student-list thead th {\n\
            font-size: 15px;\n\
            font-weight: bold;\n\
            color: #FFFFFF;\n\
            border-left: 2px solid #D0E4F5;\n\
        }\n\
        table.student-list thead th:first-child {\n\
            border-left: none;\n\
        }\n\
        table.student-list tfoot td {\n\
            font-size: 14px;\n\
        }\n\
        table.student-list tfoot .links {\n\
            text-align: right;\n\
        }\n\
        table.student-list tfoot .links a {\n\
            display: inline-block;\n\
            background: #1C6EA4;\n\
            color: #FFFFFF; \n\
            padding: 2px 8px;\n\
            border-radius: 5px;\n\
        }\n\
    </style>\n\
</head>\n";

        return text;
    }

    static exportStudentListCSVWithSocialMedia(studentList) {

        let text = "firstName,lastName,group,cnp,id,W0,W0,W1,W1,W2,W2,W3,W3,W4,W4,W5,W5,W6,W6,W7,W7,W8,W8,W9,W9,W10,W10,W11,W11\
        ,W12,W12,GitHub,Twitter,LinkedIn,Facebook,Final,Passing" + "\n";
        let filename = "studentlist.csv";

        for (let student of studentList) {
            text = text + student.firstName + ',' + student.lastName + ',';
            text = text + student.group + ',';
            text = text + student.cnp + ',' + student.id + ',';
            for (let attendance of student.attendanceComments) {
                text = text + attendance.comment + ',' + attendance.value + ',';
            }
            text = text + student.gitMark + ',' + student.twitterMark + ',' + student.linkedinMark + ',' + student.fbMark + ',' + student.finalMark + ',' + student.willPromote;
            text = text + "\n";
        }

        this.exportThis(text, filename, "csv");
    }

    static exportStudentListXMLWithSocialMedia(studentList) {
        let text = "<list>" + "\n";
        let filename = "studentlist.xml";
        let indent = "  ";
        let xindent = indent + "  ";
        let xxindent = xindent + "  ";

        text = text + indent;
        for (let student of studentList) {
            text = text + indent + "<student>" + "\n"; text = text + xindent;

            text = text + "<firstname>" + student.firstName + "</firstname>" + "\n"; text = text + xindent;
            text = text + "<lastname>" + student.lastName + "</lastname>" + "\n"; text = text + xindent;
            text = text + "<group>" + student.group + "</group>" + "\n"; text = text + xindent;
            text = text + "<cnp>" + student.cnp + "</cnp>" + "\n"; text = text + xindent;
            text = text + "<id>" + student.id + "</id>" + "\n"; text = text + xindent;

            text = text + "<attendance>" + "\n";
            for (let attendance of student.attendanceComments) {
                text = text + xxindent + "<weekNumber>" + attendance.weekNumber + "</weekNumber>" + "\n";
                text = text + xxindent + "<comment>" + attendance.comment + "</comment>" + "\n";
                text = text + xxindent + "<value>" + attendance.value + "</value>" + "\n";
            }
            text = text + xindent + "</attendance>" + "\n";

            
            text = text + xindent + "<GitHub>" + student.gitMark + "</GitHub>\n";
            text = text + xindent + "<Twitter>" + student.twitterMark + "</Twitter>\n";
            text = text + xindent + "<LinkedIn>" + student.linkedinMark + "</LinkedIn>\n";
            text = text + xindent + "<FaceBook>" + student.fbMark + "</FaceBook>\n";
            text = text + xindent + "<Final>" + student.finalMark + "</Final>\n";
            text = text + xindent + "<Passing>" + student.willPromote + "</Passing>\n";

            text = text + indent + "</student>" + "\n";
        }
        text = text + "</list>"

        this.exportThis(text, filename, "plain");
    }

    static exportStudentListHTML(studentList) {

        let text = this.loadHTMLTemplate();
        let filename = "studentlist.html";
        text = text + "<body>\n\
    <table class=\"student-list\">\n\
        <thead>\n\
            <th>First Name</th>\n\
            <th>Last Name</th>\n\
            <th>Group</th>\n            <th>CNP</th>\n            <th>id</th>\n\
            <th>C-W0</th>\n            <th>N-W0</th>\n\
            <th>C-W1</th>\n            <th>N-W1</th>\n\
            <th>C-W2</th>\n            <th>N-W2</th>\n\
            <th>C-W3</th>\n            <th>N-W3</th>\n\
            <th>C-W4</th>\n            <th>N-W4</th>\n\
            <th>C-W5</th>\n            <th>N-W5</th>\n\
            <th>C-W6</th>\n            <th>N-W6</th>\n\
            <th>C-W7</th>\n            <th>N-W7</th>\n\
            <th>C-W8</th>\n            <th>N-W8</th>\n\
            <th>C-W9</th>\n            <th>N-W9</th>\n\
            <th>C-W10</th>\n            <th>N-W10</th>\n\
            <th>C-W11</th>\n            <th>N-W11</th>\n\
            <th>C-W12</th>\n            <th>N-W12</th>\n\
        </thead>\n\
    <tbody>\n";
        for (let student of studentList) {
            text = text + "\
        <tr>\n\
            <td>" + student.firstName + "</td>\n\
            <td>" + student.lastName + "</td>\n\
            <td>" + student.group + "</td>\n\
            <td>" + student.cnp + "</td>\n\
            <td>" + student.id + "</td>\n";
            for (let attendance of student.attendanceComments) {
                text = text + "\
            <td>" + attendance.comment + "</td>\n\
            <td>" + attendance.value + "</td>\n"
            }
            text = text + "\
        </tr>";
        }

        text = text + "    </tbody>\n  </table>\n</body>\n</html>\n";
        this.exportThis(text, filename, "html");
    }

    static exportThis(text, filename, type) {
        let element = document.createElement('a');
        element.setAttribute('href', 'data:text/' + type + ';charset=utf-8,' + encodeURIComponent(text));
        element.setAttribute('download', filename);
        element.style.display = 'none';

        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    }

    static loadHTMLTemplate() {
        let text = "<!DOCTYPE html>\n\
<html>\n\
<head>\n\
    <meta charset=\"utf-8\">\n\
    <title>Student List</title>\n\
    <style>\n\
        table.student-list {\n\
            border: 1px solid #1C6EA4;\n\
            background-color: #FFFFFF;\n\
            width: 100%;\n\
            text-align: left;\n\
            border-collapse: collapse;\n\
        }\n\
        table.student-list td,\n\
        table.student-list th {\n\
            border: 1px solid #AAAAAA;\n\
            padding: 3px 2px;\n\
        }\n\
        table.student-list tbody td {\n\
            font-size: 13px;\n\
        }\n\
        table.student-list tr:nth-child(even) {\n\
            background: #D0E4F5;\n\
        }\n\
        table.student-list thead {\n\
            background: #1C6EA4;\n\
            background: -moz-linear-gradient(top, #5592bb 0%, #327cad 66%, #1C6EA4 100%);\n\
            background: -webkit-linear-gradient(top, #5592bb 0%, #327cad 66%, #1C6EA4 100%);\n\
            background: linear-gradient(to bottom, #5592bb 0%, #327cad 66%, #1C6EA4 100%);\n\
            border-bottom: 2px solid #444444;\n\
        }\n\
        table.student-list thead th {\n\
            font-size: 15px;\n\
            font-weight: bold;\n\
            color: #FFFFFF;\n\
            border-left: 2px solid #D0E4F5;\n\
        }\n\
        table.student-list thead th:first-child {\n\
            border-left: none;\n\
        }\n\
        table.student-list tfoot td {\n\
            font-size: 14px;\n\
        }\n\
        table.student-list tfoot .links {\n\
            text-align: right;\n\
        }\n\
        table.student-list tfoot .links a {\n\
            display: inline-block;\n\
            background: #1C6EA4;\n\
            color: #FFFFFF; \n\
            padding: 2px 8px;\n\
            border-radius: 5px;\n\
        }\n\
    </style>\n\
</head>\n";

        return text;
    }

    static exportStudentListHTMLWithSocialMedia(studentList) {

        let text = this.loadHTMLTemplate();
        let filename = "studentlist.html";
        text = text + "<body>\n\
    <table class=\"student-list\">\n\
        <thead>\n\
            <th>First Name</th>\n\
            <th>Last Name</th>\n\
            <th>Group</th>\n            <th>CNP</th>\n            <th>id</th>\n\
            <th>C-W0</th>\n            <th>N-W0</th>\n\
            <th>C-W1</th>\n            <th>N-W1</th>\n\
            <th>C-W2</th>\n            <th>N-W2</th>\n\
            <th>C-W3</th>\n            <th>N-W3</th>\n\
            <th>C-W4</th>\n            <th>N-W4</th>\n\
            <th>C-W5</th>\n            <th>N-W5</th>\n\
            <th>C-W6</th>\n            <th>N-W6</th>\n\
            <th>C-W7</th>\n            <th>N-W7</th>\n\
            <th>C-W8</th>\n            <th>N-W8</th>\n\
            <th>C-W9</th>\n            <th>N-W9</th>\n\
            <th>C-W10</th>\n            <th>N-W10</th>\n\
            <th>C-W11</th>\n            <th>N-W11</th>\n\
            <th>C-W12</th>\n            <th>N-W12</th>\n\
        </thead>\n\
    <tbody>\n";
        for (let student of studentList) {
            text = text + "\
        <tr>\n\
            <td>" + student.firstName + "</td>\n\
            <td>" + student.lastName + "</td>\n\
            <td>" + student.group + "</td>\n\
            <td>" + student.cnp + "</td>\n\
            <td>" + student.id + "</td>\n";
            for (let attendance of student.attendanceComments) {
                text = text + "\
            <td>" + attendance.comment + "</td>\n\
            <td>" + attendance.value + "</td>\n"
            }
            text = text + "\
        </tr>";
        }

        text = text + "    </tbody>\n  </table>\n";

        text = text + "<br><br><br><br>\
<body>\n\
    <table class=\"student-list\">\n\
        <thead>\n\
            <th>GitHub</th>\n\
            <th>LinkedIn</th>\n\
            <th>Twitter</th>\n            <th>Facebook</th>\n\
            <th>Final</th>\n            <th>Passing</th>\n\
        </thead>\n\
    <tbody>\n";

        for (let student of studentList) {
            text = text + "\
    <tr>\n\
        <td>" + student.gitMark + "</td>\n\
        <td>" + student.linkedinMark + "</td>\n\
        <td>" + student.twitterMark + "</td>\n\
        <td>" + student.fbMark + "</td>\n\
        <td>" + student.finalMark + "</td>\n\
        <td>" + student.willPromote + "</td>\n";
            text = text + "\
    </tr>";
        }
        // text = text + student.gitMark + ',' + student.twitterMark + ',' + student.linkedinMark + ',' + student.fbMark + ',' + student.finalMark + ',' + student.willPromote;
        text = text + "    </tbody>\n  </table>\n";

        text = text + "</body>\n</html>\n";
        this.exportThis(text, filename, "html");
    }
}

module.exports.ExporterService = ExporterService;