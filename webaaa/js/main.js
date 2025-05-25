import "../css/resume.css";
import "../css/sliderstyles.css";
import "./sliderjs.js";
import html2pdf from "html2pdf.js";

document.querySelector("#app").innerHTML = `
  <div class="center-container">
    <div class="main-grid">
<div class="profile-pic-container">
  <div class="profile-pic" id="profilePic"></div>
  <input type="file" id="photoUpload" accept="image/*" class="photo-upload-input no-print">
  <label for="photoUpload" class="upload-label no-print">New photo</label>
</div>

      <div class="name-spec">
        <p class="name-head">Hello 👋 I'm</p>
        <form class="name-form">
          <input type="text" id="name" class="form-name" placeholder="Alena">
          <input type="text" id="speciality" class="form-spec" placeholder="Barboskina">
        </form>
      </div>

      <div class="languages">
        <div class="lang-title"><h2 id="lang_title">Languages</h2></div>
        <div class="lang-textlabel">
          <form class="name-form">
            <input type="text" class="form-lang" placeholder="English">
            <input type="text" class="form-lang" placeholder="Russian">
            <input type="text" class="form-lang" placeholder="Spanish">
          </form>
        </div>

        <div class="containers">
          ${[1, 2, 3]
            .map(
              (i) => `
            <div class="slider-container">
              <div class="slider-track" onclick="handleTrackClick(event, 'slider${i}')">
                <div class="slider-fill" id="sliderFill${i}"></div>
                <input type="range" min="0" max="100" value="0" class="slider-input" id="rangeSlider${i}">
              </div>
            </div>
          `
            )
            .join("")}
        </div>
      </div>

      <div class="experience">
        <div class="exp-title"><h2 id = "exp_title">Experience</h2></div>
        ${[
          {
            date: "Aug. 2020",
            role: "bodyguard",
            location: "Novosibirsk. | Full-time",
            desc: "I was killed",
          },
          {
            date: "Dec. 2022",
            role: "Santa Claus",
            location: "Africa' | Kind of alive",
            desc: "I don't like children.",
          },
          {
            date: "Sep. 2023",
            role: "counselor",
            location: "Novosibirsk | Full-time",
            desc: "I like children",
          },
        ]
          .map(
            (exp, i) => `
          <div class="${i === 0 ? "exp-space green-bg" : "exp-space gray-bg"}">
            <div class="exp-textlabel">
              <form class="exp-form">
                <input type="text" class="form-exp" placeholder="${exp.date}">
                <input type="text" class="form-expmain" placeholder="${
                  exp.role
                }">
                <input type="text" class="form-exp1" placeholder="${
                  exp.location
                }">
              </form>
              <form class="exp-form2">
                <textarea class="form-exp2" placeholder="${
                  exp.desc
                }"></textarea>
              </form>
            </div>
          </div>
        `
          )
          .join("")}
      </div>

      <div class="tools">
        <h2>Tools</h2>
        <div class="tools-grid" id="toolsGrid">
        </div>
        <div class="icon-selector" id="iconSelector">
          ${[
            "chat",
            "deepseek",
            "figma",
            "git",
            "krita",
            "lab",
            "pr",
            "ps",
            "ubuntu",
            "vs",
          ]
            .map(
              (name) => `
            <img src="../icons/${name}.png" class="icon-option" data-name="${name}" title="${name}">
          `
            )
            .join("")}
        </div>
      </div>

      <div class="education">
        <h2>Education</h2>
        <div class="education-grid">
          ${[
            {
              year: "2013 – 2024",
              major: "Licey 159",
              tags: "#-_- #",
            },
            {
              year: "2024 – nowdays",
              major: "Sibsutis",
              tags: "#Friends #WEB #C",
            },
          ]
            .map(
              (ed, i) => `
            <div class="edu-card ${i === 0 ? "green-bg" : "gray-bg"}">
              <div class="edu-textlabel">
                <form class="edu-form">
                  <input type="text" class="form-exp edu-year" value="${
                    ed.year
                  }">
                  <input type="text" class="form-expmain edu-major" value="${
                    ed.major
                  }">
                  <input type="text" class="form-exp1 edu-tags" value="${
                    ed.tags
                  }">
                </form>
              </div>
            </div>
          `
            )
            .join("")}
        </div>
      </div>

      <div class="interests">
        <h2>Interests</h2>
        <div class="input-container">
          <span class="size-helper" id="sizeHelper"></span>
          <input type="text" class="auto-expand-input" id="textInput" placeholder="gaming">
        </div>
                <div class="input-container">
          <span class="size-helper" id="sizeHelper"></span>
          <input type="text" class="auto-expand-input" id="textInput" placeholder="reading">
        </div>
      </div>

      <!-- Кнопка для сохранения в PDF -->
<div class="save-pdf-container no-print">
  <button id="savePdfButton" class="save-pdf-btn">Save as PDF</button>
</div>
    </div>
  </div>
`;

const setupPhotoUpload = () => {
  const profilePic = document.getElementById("profilePic");
  const photoUpload = document.getElementById("photoUpload");

  photoUpload.addEventListener("change", (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        profilePic.dataset.originalBg = profilePic.style.backgroundImage;
        profilePic.dataset.originalSize = profilePic.style.backgroundSize;
        profilePic.dataset.originalPosition =
          profilePic.style.backgroundPosition;

        profilePic.style.backgroundImage = `url(${e.target.result})`;
        profilePic.style.backgroundSize = "cover";
        profilePic.style.backgroundPosition = "center";
      };
      reader.readAsDataURL(file);
    }
  });
};

const saveAsPDF = () => {
  document
    .querySelectorAll(".interests .auto-expand-input")
    .forEach((input) => {
      const span = document.createElement("span");
      span.textContent = input.value || input.placeholder;
      span.style.display = "inline-block";
      span.style.margin = "5px";
      span.style.padding = "8px 12px";
      span.style.backgroundColor = "white";
      span.style.borderRadius = "12px";
      input.parentNode.replaceChild(span, input);
    });

  document.querySelectorAll(".no-print").forEach((el) => {
    el.style.display = "none";
  });

  document.querySelectorAll(".size-helper").forEach((el) => {
    el.remove();
  });

  const element = document.querySelector(".main-grid");
  const opt = {
    margin: 0,
    filename: "resume.pdf",
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: {
      scale: 5,
      useCORS: true,
      allowTaint: true,
      logging: true,
      letterRendering: true,
      background: "#FFFFFF",
      scrollX: 0,
      scrollY: 0,
      windowWidth: element.scrollWidth,
      windowHeight: element.scrollHeight,
    },
    jsPDF: {
      unit: "mm",
      format: "a4",
      orientation: "portrait",
      hotfixes: ["px_scaling"],
    },
  };

  const style = document.createElement("style");
  style.innerHTML = `
    @media print {
      .interests span {
        display: inline-block !important;
        margin: 5px !important;
        padding: 8px 12px !important;
        background: white !important;
        border-radius: 12px !important;
        color: black !important;
      }
      input, textarea {
        border: 1px solid #ccc !important;
        background: white !important;
        color: black !important;
        padding: 5px;
      }
    }
  `;
  document.head.appendChild(style);

  html2pdf()
    .set(opt)
    .from(element)
    .save()
    .finally(() => {
      document.head.removeChild(style);

      document.querySelectorAll(".no-print").forEach((el) => {
        el.style.display = "";
      });
    });
  setTimeout(() => {
    location.reload();
  }, 1000);
};

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("savePdfButton").addEventListener("click", saveAsPDF);
  setupPhotoUpload();
  styleSaveButton();
});
