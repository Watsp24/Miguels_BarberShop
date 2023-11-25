//Alert Box display Success /Failure
window.onload = function(){
	const urlParams = new URLSearchParams(window.location.search)

	if(urlParams.has('success')) {
		alert('Reservation Successful')
	}else if(urlParams.has('error')){
		alert('There was an error in making the reservation. Please call 555-555-5555')
	}
}