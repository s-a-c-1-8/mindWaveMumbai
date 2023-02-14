const socket = io();

socket.on('meditation',function(data){
    console.log(data);
    var heading = document.getElementById('heading');
    heading.innerText = data;
	socket.emit('attention', (data));
	console.log(socket.emit + 'sending');
	if(data <= 10){
	var img1 = document.getElementById('img1');
	img1.style.display = 'block';
		var imgs = document.getElementById('img2');
		imgs.style.display = 'block';
	}
		if(data >= 11){
	var img1 = document.getElementById('img2');
		img1.style.display = 'block';
			var imgs = document.getElementById('img1');
	imgs.style.display = 'none';
	}
})