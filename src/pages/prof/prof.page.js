(() => {
    route('/prof',
        {
            templateUrl: './src/pages/prof/prof.page.html',
            styleUrl: './src/pages/prof/prof.page.css',
            guard: {
                canEnter: [ProfGuard],
                redirectTo: '/'
            }
        },
        function () {
            this.username = '';
            this.$onInit = function () {
                this.username = AuthService.getUsername();
            };
        });
})();

this.groups = ['B4','B6'];

function switchVisibleGroup(id){
    document.getElementById('prof-div').style.display = 'none';
    document.getElementById('group'+id).style.display = 'block';
}

function generateRow(studentName, table) {
    table+='<tr>';
    table+='<td>'+studentName+'</td>';

    if(Math.floor(Math.random()*2)+1 == 1)
            {table+='<td width=90px;>M</td>';}
        else{table+='<td width=90px;>S</td>';}

    for(i = 0 ; i < 4 ; i++){
        table+='<td contenteditable=\'true\'>' + (Math.floor(Math.random() * 10) + 1) +'</td>';
    }
    table+='<td contenteditable=\'true\'></td>';
    table+='</tr>';

    return table;
}

function clickGroup(id) {

    var newGroup = document.createElement('div');  //create group table here
    newGroup.classList.add("group-box");
    newGroup.id="group"+id;
    newGroup.innerHTML="<h3>"+id+"</h3>";

    newGroup.innerHTML+='<button id="groupSaveChanges" class="btn btn-submit" onclick="groupSave()">Save Changes</button>';
    newGroup.innerHTML+='<button id="groupBack" class="btn btn-submit" onclick="groupBack()">Back</button>';

    var table = 
        '<table class="studentsTable">\
        <thead>\
        <tr>';

    //HEADER
    table+='<td>Nume</td>\
        <td>Tip Proiect</td>\
        <td>P</td>\
        <td>A</td>\
        <td>S</td>\
        <td>Examen</td>\
        <td>Observatii</td>\
        ';
    //HEADER/

    table+=
        '</tr>\
        </thead>\
        <tbody>';

    //ROWS
    if(id=='B4'){
        table = generateRow("Mihaila Andrei", table);
        table = generateRow("Vericiuc Sergiu", table);
        table = generateRow("Ursu Cristian", table);
        table = generateRow("Stranger Albert", table);
        table = generateRow("Undoi Trei", table);
        table = generateRow("Axinte Gica", table);
    }else{
        table = generateRow("Podar Ioana", table);
        table = generateRow("Bob Vasile", table);
        table = generateRow("Ursu Mihai", table);
        table = generateRow("Bondar Ioan", table);
        table = generateRow("Marian Sergiu", table);
        table = generateRow("Harbuzariu Alexandru Florin", table);
    }
    //ROWS/

    //finish and add to innerHTML
    table+=
        '</tbody>\
        </table>';
    newGroup.innerHTML+=table;

    document.getElementById('prof-main').appendChild(newGroup);
    switchVisibleGroup(id);
}

function groupSave() {
    // ...
    alert('saved');
}

function groupBack() {
    window.location.reload();
}
