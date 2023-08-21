document.addEventListener("DOMContentLoaded", function () {
  function showMode(mode) {
    var contentDiv = document.getElementById("content");
    
    // Based on the mode, update the content
    if (mode === "mode1") {
      set_menu(3);
    } else if (mode === "mode2") {
      set_menu(3);
    } else if (mode === "mode3") {
      set_menu(3);
    } else {
      set_menu(3);
    }
  }

  function handleHashChange() {
    var hash = window.location.hash.substr(1); // Remove the '#' from the hash
    showMode(hash);

    // Call set_menu with the current hash value
    console.log("HASH:   ", hash);
    set_menu(hash);
  }

  // Initial page load
  handleHashChange();

  // Listen for hash changes
  window.addEventListener("hashchange", handleHashChange);
});