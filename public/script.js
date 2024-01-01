function changeView() {
  var home = document.getElementById("home");
  var addImg = document.getElementById("addImg");

  home.classList.toggle("d-none");
  addImg.classList.toggle("d-none");
}

// (imge preive script)
function previewImage(event) {
  const fileInput = event.target;
  const alwaysVisibleImage = document.getElementById('alwaysVisibleImage');

  if (fileInput.files && fileInput.files[0]) {
    const reader = new FileReader();

    reader.onload = function(e) {
      alwaysVisibleImage.src = e.target.result;
    }

    reader.readAsDataURL(fileInput.files[0]);
  } else {
    alwaysVisibleImage.src = 'default-image.jpg';
  }
}

// (previous modal and script code remains unchanged)

document
  .getElementById("uploadForm")
  .addEventListener("submit", async function (e) {
    e.preventDefault();

    const formData = new FormData(this);
    const response = await fetch("/upload", {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      const description = await response.text();
      document.getElementById("descriptionText").innerText = description;
      const modal = new bootstrap.Modal(
        document.getElementById("descriptionModal")
      );
      modal.show();

      document
        .getElementById("copyButton")
        .addEventListener("click", function () {
          const descriptionText = document.getElementById("descriptionText");

          if (navigator.clipboard) {
            navigator.clipboard
              .writeText(descriptionText.innerText)
              .then(() => alert("Description copied!"))
              .catch((err) => console.error("Unable to copy:", err));
          } else {
            const tempTextarea = document.createElement("textarea");
            tempTextarea.value = descriptionText.innerText;
            document.body.appendChild(tempTextarea);
            tempTextarea.select();
            document.execCommand("copy");
            document.body.removeChild(tempTextarea);
            alert("Description copied!");
          }
        });
    } else {
      alert("Error uploading the image.");
    }
  });

// Display loader function
function showLoader() {
  document.getElementById("loading").classList.remove("d-none");
}

// Hide loader function
function hideLoader() {
  document.getElementById("loading").classList.add("d-none");
}

document
  .getElementById("uploadForm")
  .addEventListener("submit", async function (e) {
    e.preventDefault();

    showLoader(); // Show loader on form submit

    const formData = new FormData(this);
    try {
      const response = await fetch("/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const description = await response.text();
        document.getElementById("descriptionText").innerText = description;
        const modal = new bootstrap.Modal(
          document.getElementById("descriptionModal")
        );
        modal.show();
      } else {
        alert("Error uploading the image.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
    } finally {
      hideLoader(); // Hide loader when processing is done
    }
  });
