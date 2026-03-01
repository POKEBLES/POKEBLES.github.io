const navLinks = document.querySelectorAll('.nav-link2');

navLinks.forEach(link => {
    link.addEventListener('click', function () {
        navLinks.forEach(nav => nav.classList.remove('active'));
        this.classList.add('active');
    });
});


function openPopup(popupId) {
    document.getElementById(popupId).style.display = "flex";
}


function closePopup(popupId) {
    document.getElementById(popupId).style.display = "none";
}


document.getElementById("featured").addEventListener("click", function() {
    document.getElementById("featuredPopup").style.display = "flex";
});

//EVENT LISTENERS FOR COINS POP UP
document.getElementById("coin-items1").addEventListener("click", function(event) {
    if (!event.target.closest('.button-container')) { 
        openPopup("coins1Popup"); 
    }
});

document.getElementById("coin-items2").addEventListener("click", function(event) {
    if (!event.target.closest('.button-container')) { 
        openPopup("coins2Popup"); 
    }
});

document.getElementById("coin-items3").addEventListener("click", function(event) {
    if (!event.target.closest('.button-container')) { 
        openPopup("coins3Popup"); 
    }
});

document.getElementById("coin-items4").addEventListener("click", function(event) {
    if (!event.target.closest('.button-container')) { 
        openPopup("coins4Popup"); 
    }
});

document.getElementById("coin-items5").addEventListener("click", function(event) {
    if (!event.target.closest('.button-container')) { 
        openPopup("coins5Popup"); 
    }
});

document.getElementById("coin-items6").addEventListener("click", function(event) {
    if (!event.target.closest('.button-container')) { 
        openPopup("coins6Popup"); 
    }
});


// EVENT LISTENER FOR BUNDLES
document.getElementById("bundlebox1").addEventListener("click", function(event) {
    if (!event.target.closest('.button-containerB')) { 
        openPopup("bundle1Popup"); 
    }
});
document.getElementById("bundlebox2").addEventListener("click", function(event) {
    if (!event.target.closest('.button-containerB')) { 
        openPopup("bundle2Popup"); 
    }
});
document.getElementById("bundlebox3").addEventListener("click", function(event) {
    if (!event.target.closest('.button-containerB')) { 
        openPopup("bundle3Popup"); 
    }
});

//FLIPPING CARD ANIMATION
document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".flip-card").forEach(card => {
        card.addEventListener("click", function () {
            this.classList.toggle("flipped");
        });
    });


    document.querySelectorAll(".close-btn").forEach(btn => {
        btn.addEventListener("click", function (event) {
            event.stopPropagation(); 
            this.closest(".flip-card").classList.remove("flipped");
        });
    });
});

//TO CLICK BUTTONS WITH SHINE
document.querySelectorAll('.price').forEach(button => {
    button.addEventListener('click', (event) => {
        event.stopPropagation(); 
    });
});

document.querySelectorAll('.discount-btn2').forEach(button => {
    button.addEventListener('click', (event) => {
        event.stopPropagation(); 
    });
});
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', (event) => {
        event.stopPropagation(); 
    });
});

//TO SCROLL UP TO TOP
window.onscroll = function() {
    const scrollToTopBtn = document.getElementById("scrollToTopBtn");
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        scrollToTopBtn.style.display = "flex"; // Show the button
    } else {
        scrollToTopBtn.style.display = "none"; // Hide the button
    }
};

// Scroll to the top of the document
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth' // Smooth scrolling
    });
}

AOS.init();