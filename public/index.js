const dropZone = document.querySelector(".drop-zone");
const fileInput = document.querySelector("#fileinput");
const browseBtn = document.querySelector(".browseBtn");
const bgProgress = document.querySelector(".bg-progress");
const progressBar = document.querySelector(".progress-bar");
const progressContainer = document.querySelector(".progress-container");
const percentEl = document.querySelector("#percent");
const fileURLInput = document.querySelector("#fileURL");
const sharingContainer = document.querySelector(".sharing-container");
const copyBtn = document.querySelector("#copyBtn");
const emailForm = document.querySelector("#email-form");
const submitBtn = document.querySelector("#submitBtn");
const toast = document.querySelector(".toast");

// const host = "https://quicklink-dqxj.onrender.com/";
const host = "http://localhost:3000/";
const uploadURL = `${host}api/files`;
const emailURL = `${host}api/files/send`;

const maxAllowedSize = 100 * 1024 * 1024; //MB

dropZone.addEventListener("dragover", (e) => {
  e.preventDefault();
  // console.log(" ");

  if (!dropZone.classList.contains("dragged")) {
    dropZone.classList.add("dragged");
  }
});

dropZone.addEventListener("dragleave", () => {
  dropZone.classList.remove("dragged");
});

dropZone.addEventListener("drop", (e) => {
  e.preventDefault();
  dropZone.classList.remove("dragged");
  const files = e.dataTransfer.files;
  // console.table(files);
  // console.log(file);

  if (files.length) {
    fileInput.files = files;
    uploadFile();
  }
});

fileInput.addEventListener("change", () => {
  uploadFile();
});

browseBtn.addEventListener("click", () => {
  fileInput.click();
});

emailForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const url = fileURLInput.value;
  const formData = {
    uuid: `${url.split("/")[url.split("/").length - 1]}`,
    emailTo: emailForm.elements["to_email"].value,
    emailFrom: emailForm.elements["from_email"].value,
  };

  submitBtn.setAttribute("disabled", "true");
  console.table(formData);

  fetch(emailURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
    // javascript object to json string
  })
    .then((res) => res.json())
    .then(({ success }) => {
      if (success) {
        sharingContainer.style.display = "none";
        showToast("Email sent");
      }
    });
});

copyBtn.addEventListener("click", () => {
  fileURLInput.select();
  navigator.clipboard.writeText(fileURLInput.value);
  showToast("Link copied");
});

const uploadFile = () => {
  progressContainer.style.display = "block";

  const file = fileInput.files[0];

  console.log(file.size / 1024);

  if (fileInput.files.length > 1) {
    fileInput.value = "";
    showToast("Only one file is allowed");
    return;
  }

  if (file.size > maxAllowedSize) {
    fileInput.value = "";
    showToast("Only upload file less than 100MB");
    return;
  }

  // const file = fileInput.files[0];
  const formData = new FormData();
  formData.append("myfile", file);

  const xhr = new XMLHttpRequest();

  xhr.onreadystatechange = () => {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      console.log(xhr.response);
      uponUploadSuccess(JSON.parse(xhr.response));
    }
  };

  xhr.upload.onprogress = updateProgress;
  xhr.upload.onerror = () => {
    fileInput.value = "";
    showToast(`Error in upload: ${xhr.statusText}`);
  };

  xhr.open("POST", uploadURL, true);
  xhr.send(formData);
};

let print_twice_solution = false;

const updateProgress = (e) => {
  if (print_twice_solution) {
    const percent = Math.round((e.loaded / e.total) * 100);
    // console.log(percent);
    bgProgress.style.width = `${percent}%`;
    progressBar.style.transform = `scaleX(${percent / 100})`;
    percentEl.textContent = percent;
  }

  if (Math.round((e.loaded / e.total) * 100) === 100) {
    print_twice_solution = true;
  }
};

const uponUploadSuccess = ({ file: url }) => {
  console.log(url);
  fileInput.value = "";
  submitBtn.removeAttribute("disabled", "true");
  progressContainer.style.display = "none";
  sharingContainer.style.display = "block";
  fileURLInput.value = url;
};

let toastTimer;

const showToast = (msg) => {
  toast.textContent = msg;
  toast.style.transform = "translate(-50%, 0px)";
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.style.transform = "translate(-50%, 70px)";
  }, 2000);
};
