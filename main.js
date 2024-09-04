// Mega Menu On Click
let linkBtn = document.querySelector(".container .other-links");
let megaMenu = document.querySelector(".mega-menu");

linkBtn.onclick = (event) => {
  event.stopPropagation(); // Prevent click event from propagating to document
  event.preventDefault(); // Prevent Page Refresh
  megaMenu.classList.toggle("active");
};

// Close mega menu when clicking outside of it
document.onclick = (event) => {
  // I Commented This Because Mega Menu Is Large So I want Close when Click On Section
  // if (!megaMenu.contains(event.target) && !linkBtn.contains(event.target)) {
  //   megaMenu.classList.remove("active");
  // }

  megaMenu.classList.remove("active");

};

// Progrss Animation (Variables)
let progresses = document.querySelectorAll(".the-progress span");

let skillsSection = document.querySelector(".our-skills");

// Create Count Up For Number Of State (Variables)
let statsSection = document.querySelector(".stats");
let statsNumbers = document.querySelectorAll(".stats .number");
let started = false;

// Appear Scroll Top Btn (Variables)
let scrollTopBtn = document.querySelector(".scroll-to-top");

// Trigger Here
window.onscroll = () => {
  // Trigger The Progrss Animation
  if (window.scrollY >= skillsSection.offsetTop - 250) {
    progresses.forEach((progress) => {
      progress.style.width = progress.dataset.width;
    });
  }

  // // Trigger Count Up For Number Of State & Used Chat GPT For Reached To Goal Together And Smooth
  if (window.scrollY >= statsSection.offsetTop - 250 && !started) {
    started = true; // Prevent multiple triggers
    statsNumbers.forEach((stat, index) => {
      let goal = +stat.dataset.goal;
      let count = 0;

      // Calculate a duration that feels smooth for each stat
      let duration = 2000; // Total duration for the animation in milliseconds
      let increment = goal / (duration / 16.67); // Number of frames based on 60fps

      const countUp = () => {
        count += increment;
        if (count < goal) {
          stat.textContent = Math.floor(count); // Update the counter
          requestAnimationFrame(countUp); // Continue counting
        } else {
          // Final value to match the goal exactly
          stat.textContent =
            goal + (index === statsNumbers.length - 1 ? "K" : "");
        }
      };

      requestAnimationFrame(countUp); // Start the counting animation
    });
  }

  // Appear Scroll Top Button
  if (window.scrollY > 700) {
    scrollTopBtn.classList.add("show");
  } else {
    scrollTopBtn.classList.remove("show");
  }
};

// Add click event to scroll to top
scrollTopBtn.onclick = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth", // Smooth scrolling to top
  });
};

// Count Down Animation
// Return The Time From 1970 To This Date by milliseconds
let countDown = new Date("Dec 31, 2024 23:59:59").getTime();

let counter = setInterval(() => {
  // Return Now Date
  let dataNow = new Date().getTime();

  //Calculate The Time From Now To countDown Time Using Miliseconds
  let requiredDate = countDown - dataNow;

  // Calculate Time Using Days Hours Minutes Seconds
  let days = Math.floor(requiredDate / (1000 * 60 * 60 * 24));
  let hours = Math.floor(
    (requiredDate % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  let minutes = Math.floor((requiredDate % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((requiredDate % (1000 * 60)) / 1000);

  document.querySelector(".events .days").innerHTML =
    days <= 9 ? `0${days}` : days;
  document.querySelector(".events .hours").innerHTML =
    hours <= 9 ? `0${hours}` : hours;
  document.querySelector(".events .minutes").innerHTML =
    minutes <= 9 ? `0${minutes}` : minutes;
  document.querySelector(".events .seconds").innerHTML =
    seconds <= 9 ? `0${seconds}` : seconds;

  if (requiredDate === 0) {
    clearInterval(counter);
  }
}, 1000);
