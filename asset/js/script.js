/* set radius for all circles */

const socket = io();


var r = 400;
var circles = document.querySelectorAll('.circle');
var total_circles = circles.length;

for (var i = 0; i < total_circles; i++) {
	circles[i].setAttribute('r', r);
}
/* set meter's wrapper dimension */
var meter_dimension = (r * 2) + 100;
var wrapper = document.querySelector('#wrapper');
wrapper.style.width = meter_dimension + 'px';
wrapper.style.height = meter_dimension + 'px';
/* add strokes to circles  */
var cf = 2 * Math.PI * r;
var semi_cf = cf / 2;
var semi_cf_1by3 = semi_cf / 3;
var semi_cf_2by3 = semi_cf_1by3 * 2;
document.querySelector('#outline_curves')
	.setAttribute('stroke-dasharray', semi_cf + ',' + cf);
document.querySelector('#low')
	.setAttribute('stroke-dasharray', semi_cf + ',' + cf);
document.querySelector('#avg')
	.setAttribute('stroke-dasharray', semi_cf_2by3 + ',' + cf);
document.querySelector('#high')
	.setAttribute('stroke-dasharray', semi_cf_1by3 + ',' + cf);
document.querySelector('#outline_ends')
	.setAttribute('stroke-dasharray', 2 + ',' + (semi_cf - 2));
document.querySelector('#mask')
	.setAttribute('stroke-dasharray', semi_cf + ',' + cf);
/*bind range slider event*/
var slider = document.querySelector('#slider');
var lbl = document.querySelector("#lbl");
var mask = document.querySelector('#mask');
var meter_needle = document.querySelector('#meter_needle');
var percent = slider.value;
// slider = 100;

et.on('meditation', function (data) {
	// console.log("meditation",data);
	// var heading = document.getElementById('heading');
	// heading.innerText = data;
	// socket.emit('attention', (data));
	// console.log(socket.emit + 'sending');
	if (data == 0) {
		document.getElementById('red').style.display = 'block';
		document.getElementById('green').style.display = 'none'

	}
	if (data > 0) {
		document.getElementById('red').style.display = 'none'

		document.getElementById('green').style.display = 'block'
	}


	var percent = data;
	var meter_value = semi_cf - ((percent * semi_cf) / 100);
	mask.setAttribute('stroke-dasharray', meter_value + ',' + cf);

	meter_needle.style.transform = 'rotate(' + (270 + ((percent * 180) / 100)) + 'deg)';
	lbl.textContent = percent;
});
function range_change_event() {

}
// slider.addEventListener('input', range_change_event);


// function startTimer(duration, display , display1 ) {
//     var timer = duration, minutes, seconds;
//     setInterval(function () {
//         minutes = parseInt(timer / 60, 10);
//         seconds = parseInt(timer % 60, 10);

//         minutes = minutes < 10 ? "0" + minutes : minutes;
//         seconds = seconds < 10 ? "0" + seconds : seconds;


var user;

socket.emit('newUser')

socket.on("sendNewUser", (e) => {
	console.log("newValue", e);
	user = e;
	var hell = document.getElementById('hi');
	hell.innerText = e.userName;
})

// socket.on('newValues', function (data) {
// 	console.log(data);
// 	var hell = document.getElementById('hi');
// 	// var call = data.firstname;
// 	// console.log(data.userName);
// 	// hell.innerText = data.userName;
// });



var Timer = 0;
var startTimerInterval

socket.on('startValue', function (data) {
	console.log(data)
	if (data == 1) {

		// 	startHere();
		startHere();
		// var stopHere = () => clearInterval(startTimerInterval)
		// window.location = "/winner";
	}
	if (data == 2) {

		// 	startHere();
		stopHere();
		user.userTime = Timer
		socket.emit('timerValue', (user))
		window.location = "/winner";
		// location.href = "http://localhost:7788/winner";

		// var stopHere = () => clearInterval(startTimerInterval)
		// window.location = "/winner";
	}
	if (data == 3) {
		window.location = "/winner";

	}
});

// socket.emit()
document.addEventListener('keypress', (event) => {
	console.log('user', user)
	const keyName = event.key;
	if (keyName == 'n') {
		console.log(event.key);
		stopHere();
		console.log(Timer);
		var hell = document.getElementById('hi');
		var userTime = hell.innerText;
		user.userTime = Timer
		socket.emit('timerValue', (user))
		window.location = "/winner";
	}
	if (keyName == 's') {
		console.log(event.key);
		startHere()
		console.log(Timer);
	}

})

var startHere = () => {
	startTimerInterval = setInterval(() => {
		Timer++
		console.log(Timer);
		document.getElementById('sec').innerHTML = ':' + Timer;
	}, 1000)
}

var stopHere = () => clearInterval(startTimerInterval)


