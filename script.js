// COLLAPSE ABOUT
if (document.querySelector('.home') && document.querySelector('.right') && document.querySelector('#about')) {
	function debounce(func, wait, immediate) {
		let timeout
		return function() {
			let context = this, args = arguments
			let later = function() {
				timeout = null
				if (!immediate) func.apply(context, args)
			}
		var callNow = immediate && !timeout
		clearTimeout(timeout)
		timeout = setTimeout(later, wait)
		if (callNow) func.apply(context, args)
	}
}
let about = document.querySelector('#about').offsetTop
let right = document.querySelector('.right')
let aboutScrollWatcher = debounce(function() {
	if (window.pageYOffset >= about) {
		right.classList.add('collapse-about')
	} else if (window.pageYOffset < about) {
		right.classList.remove('collapse-about')
	}
}, 250)
window.addEventListener('scroll', aboutScrollWatcher)
}

// Loader
if (document.querySelector('.transition')) {
	let prevLoaded = window.sessionStorage.getItem('prev-loaded')
	if (!prevLoaded) {
	 	document.body.classList.add('wait')
		window.addEventListener('load', ()=> {
			document.body.classList.remove('wait')
		})
		window.sessionStorage.setItem('prev-loaded', true)
	} else {
		document.querySelector('.transition').style.display = 'none'
		document.body.classList.remove('wait')
	}
}


// // Smooth scroll to on page anchors with specified selector

function anchorscroll(speed = 0.1025, selector = '.anchorscroll', offset = 30) {

  // Request animation frame prefixes and fallback
  window.raf = (function() {
    return window.requestAnimationFrame    ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame    ||
      function (callback) {
        window.setTimeout(callback, 1000 / 60)
      }
  })()

  // Get all requested selectors, and all links that are on-page hashes
  let anchors = [].slice.apply(document.querySelectorAll(selector)),
      links   = [].slice.apply(document.querySelectorAll('a')),
      hashes  = links.filter(x => x.getAttribute('href').charAt(0) === '#')

  // Add event listeners to all selectors on page
  for (let i = 0; i < hashes.length; i++) {

    ((num) => {
      hashes[num].addEventListener('click', (e) => {
      	console.log(e)
        e.preventDefault()
        let hash     = hashes[num].getAttribute('href'),
            match    = anchors.filter(x => `#${x.id}` === hash),
            position = window.pageYOffset,
            top      = match[0].offsetTop


        function scrollDown() {
          // Handle scrolling down to anchor
          if (top >= position + offset) {
            window.scrollTo(0, position)
            position += speed * 50
            raf(scrollDown)
          }                    
        }

        function scrollUp() {
          // Handle scrolling up to anchor
          if (top <= position  + offset) {
            window.scrollTo(0, position)
            position -= speed * 50
            raf(scrollUp)
          }                    
        }

        top >= position ? scrollDown() : scrollUp()

      }, false)

    })(i)
  }
} 

// Call the function!
anchorscroll(1, '.scroll', 50)




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
			!e.target.parentNode.classList.contains('off_menu') &&
			!e.target.parentNode.parentNode.classList.contains('off_menu') &&
			!e.target.parentNode.parentNode.parentNode.classList.contains('off_menu')) {
			document.body.classList.remove('menu-active')	
		}	
	})
}



menuToggle('.toggle') // run menuToggle for the toggle class
closeMenu('body') // run the close when clicking elsewhere in the document body





