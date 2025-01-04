document.addEventListener("DOMContentLoaded", () => {
    const section = document.getElementById("artist-turul");
  
    const handleScroll = () => {
      const sectionPosition = section.getBoundingClientRect().top;
      const screenPosition = window.innerHeight / 1.2;
  
      if (sectionPosition < screenPosition) {
        section.classList.add("visible");
      }
    };
  
    window.addEventListener("scroll", handleScroll);
  });
  