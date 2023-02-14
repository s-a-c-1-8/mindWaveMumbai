
const socket = io();

function nextPage() {
    console.log(socket.emit);
    var firstname = document.getElementById('firstName').value;
    var secondname = document.getElementById('secondName').value;
    var thirdname = document.getElementById('thirdName').value;
    var fourname = document.getElementById('fourName').value;
    // socket.emit('inputValues', ({ one: firstname, two:secondname,three:thirdname,four:fourname}));
    // window.location = "/guage";
    socket.emit('restart')
}
$(function () {
    $(".logo").draggable();
});