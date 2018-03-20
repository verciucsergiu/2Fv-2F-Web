(() => {
    route('/prof',
        {
            templateUrl: './src/pages/prof/prof.page.html',
            styleUrl: './src/pages/prof/prof.page.css'
        },
        function () {
            
        });
})();

this.groups = ['B4','B6'];

function switchVisibleGroup(id){
    document.getElementById('prof-div').style.display = 'none';
    document.getElementById('group'+id).style.display = 'block';
}

function clickGroup(id) {

    var newGroup = document.createElement('div');  //create group table here
    newGroup.class="group-box";
    newGroup.id="group"+id;
    newGroup.innerHTML="<h3>"+id+"</h3>";

    document.getElementById('prof-main').appendChild(newGroup);
    switchVisibleGroup(id);
}

