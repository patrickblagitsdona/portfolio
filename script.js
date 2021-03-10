
// Toggle nav menu open and closed
function menuToggle(selector) {
	let tgl = document.querySelector(selector)
	tgl.addEventListener('click', function(e) {
		e.stopPropagation()
		document.body.classList.toggle('menu-active')
	})
}

// Close nav menu when clicking outside of it
function closeMenu(selector) {
	let el = document.querySelector(selector)
	el.addEventListener('click', e => {
		if (!e.target.classList.contains('off_menu') && 
			!e.target.classList.contains('off_menu_link')) {
			document.body.classList.remove('menu-active')	
		}	
	})
}

menuToggle('.toggle') // run menuToggle for the toggle class
closeMenu('body') // run the close when clicking elsewhere in the document body

