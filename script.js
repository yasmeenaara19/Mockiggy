function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition, showError, { enableHighAccuracy: true });
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}


function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;

  // Use reverse geocoding API (like OpenStreetMap Nominatim) to convert lat/lon → address
  fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`)
    .then(response => response.json())
    .then(data => {
      document.getElementById("locationInput").value = data.display_name;
    })
    .catch(err => {
      alert("Unable to fetch location details.");
    });
}

function showError(error) {
  switch(error.code) {
    case error.PERMISSION_DENIED:
      alert("User denied the request for Geolocation.");
      break;
    case error.POSITION_UNAVAILABLE:
      alert("Location information is unavailable.");
      break;
    case error.TIMEOUT:
      alert("The request to get user location timed out.");
      break;
    case error.UNKNOWN_ERROR:
      alert("An unknown error occurred.");
      break;
  }
}
function goToPage(page) {
  window.location.href = page;
}
function scrollLeft(id) {
  document.getElementById(id).scrollBy({ left: -300, behavior: 'smooth' });
}

function scrollRight(id) {
  document.getElementById(id).scrollBy({ left: 300, behavior: 'smooth' });
}


// Function to add scrolling functionality for a wrapper
// JS (put at end of body or run on DOMContentLoaded)
function setupScroll(wrapperSelector, contentSelector) {
  const wrapper = document.querySelector(wrapperSelector);
  if (!wrapper) return;
  const content = wrapper.querySelector(contentSelector);
  if (!content) return;
  const leftArrow = wrapper.querySelector('.arrow.left');
  const rightArrow = wrapper.querySelector('.arrow.right');
  const scrollAmount = 300;
  if (leftArrow) leftArrow.addEventListener('click', () => content.scrollBy({ left: -scrollAmount, behavior: 'smooth' }));
  if (rightArrow) rightArrow.addEventListener('click', () => content.scrollBy({ left: scrollAmount, behavior: 'smooth' }));
}

setupScroll('.categories .scroll-wrapper', '.category-list');
setupScroll('.groceries .scroll-wrapper', '.grocery-list');
setupScroll('.restaurants .scroll-wrapper', '.restaurant-list');


  // GPS option
const manualInput = document.getElementById('manualLocation');
const locateBtn = document.getElementById('locateBtn');

// GPS option
locateBtn.addEventListener('click', () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      position => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}`)
          .then(res => res.json())
          .then(data => {
            const address = data.display_name || `${lat.toFixed(5)}, ${lon.toFixed(5)}`;
            manualInput.value = address; // fill input box with detected location
          })
          .catch(() => {
            manualInput.value = `${lat.toFixed(5)}, ${lon.toFixed(5)}`;
          });
      },
      () => {
        manualInput.value = "Location access denied";
      },
      { enableHighAccuracy: true }
    );
  } else {
    manualInput.value = "Geolocation not supported";
  }
});

// Manual typing option
manualInput.addEventListener('input', () => {
  console.log("User entered:", manualInput.value);
  // 👉 You can send this to backend for search suggestions
});

function toggleCities(id, btn) {
  const grid = document.getElementById(id);
  grid.classList.toggle("expanded");

  // toggle button text
  if (grid.classList.contains("expanded")) {
    btn.innerText = "Show Less ⌃";
  } else {
    btn.innerText = "Show More ⌄";
  }
}
