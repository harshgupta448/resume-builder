// === Resume Builder JavaScript ===

// Add More Experience
function addExperience() {
  const container = document.getElementById("experience-section");
  const entry = document.createElement("div");
  entry.className = "experience-entry mb-4";
  entry.innerHTML = `
    <label class="form-label">Company / Organisation</label>
    <input type="text" class="company form-control" placeholder="e.g. Rise Internship" />
    <label class="form-label mt-2">Role</label>
    <input type="text" class="role form-control" placeholder="e.g. Web Developer Intern" />
    <label class="form-label mt-2">Duration</label>
    <input type="text" class="duration form-control" placeholder="e.g. Jan 2024 - March 2024" />
  `;
  container.appendChild(entry);
}

// Add More Education
function addEducation() {
  const container = document.getElementById("education-section");
  const entry = document.createElement("div");
  entry.className = "education-entry mb-4";
  entry.innerHTML = `
    <label class="form-label">Degree</label>
    <input type="text" class="form-control degree" placeholder="e.g. BTech, BCA" required />
    <label class="form-label mt-2">Institution</label>
    <input type="text" class="form-control institution" placeholder="e.g. XYZ University" required />
    <label class="form-label mt-2">Year of Graduation</label>
    <input type="text" class="form-control year" placeholder="e.g. 2024" required />
    <label class="form-label mt-2">Percentage / CGPA</label>
    <input type="text" class="form-control percentage" placeholder="e.g. 8.5 CGPA" required />
  `;
  container.appendChild(entry);
}

// Add More Projects
function addProject() {
  const container = document.getElementById("projects-section");
  const entry = document.createElement("div");
  entry.className = "project-entry mb-4";
  entry.innerHTML = `
    <label class="form-label">Project Title</label>
    <input type="text" class="form-control project-title" placeholder="e.g. Resume Builder">
    <label class="form-label mt-2">Project Link</label>
    <input type="url" class="form-control project-link" placeholder="e.g. https://github.com/project" />
  `;
  container.appendChild(entry);
}

// Generate Resume HTML Content
function generateResumeContent() {
  const name = document.getElementById("fullname").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;
  const linkedin = document.getElementById("linkedin").value;
  const summary = document.getElementById("summary").value;
  const skills = document.getElementById("skills").value;
  const certificates = document.getElementById("certificate").value;

  const educationEntries = Array.from(document.querySelectorAll(".education-entry"))
    .map(entry => {
      const degree = entry.querySelector(".degree").value;
      const institution = entry.querySelector(".institution").value;
      const year = entry.querySelector(".year").value;
      const percentage = entry.querySelector(".percentage").value;
      if (!degree && !institution && !year && !percentage) return "";
      return `${degree} | ${institution} | ${year} | ${percentage}`;
    }).filter(item => item.trim() !== "");

  const experienceEntries = Array.from(document.querySelectorAll(".experience-entry"))
    .map(entry => {
      const role = entry.querySelector(".role").value;
      const company = entry.querySelector(".company").value;
      const duration = entry.querySelector(".duration").value;
      if (!role && !company && !duration) return "";
      return `${role} | ${company} | ${duration}`;
    }).filter(item => item.trim() !== "");

  const projectEntries = Array.from(document.querySelectorAll(".project-entry"))
    .map(entry => {
      const title = entry.querySelector(".project-title").value;
      const link = entry.querySelector(".project-link").value;
      return title && link ? `${title} | <a href='${link}' target='_blank'>${link}</a>` : "";
    }).filter(p => p.trim() !== "");

  const preview = document.getElementById("resume-content");
  preview.innerHTML = `
    <div id="pdf-content" style="min-height: 10.7in; padding: 40px; font-family: Arial, sans-serif;">
      <h2 class="text-center">${name}</h2>
      <p class="text-center">
        ${email} &nbsp;&nbsp; | &nbsp;&nbsp; ${phone} &nbsp;&nbsp; | &nbsp;&nbsp;
        <a href='${linkedin}' target='_blank'>${linkedin}</a>
      </p>
      ${summary ? `<hr/><h4>Professional Summary</h4><p>${summary}</p>` : ""}
      ${experienceEntries.length ? `
        <hr/><h4>Work Experience</h4>
        <div style="display: flex; font-weight: bold; margin-bottom: 8px;">
          <div style="flex: 1;">Role</div>
          <div style="flex: 1;">Company</div>
          <div style="flex: 1;">Duration</div>
        </div>
        ${experienceEntries.map(e => {
          const [role, company, duration] = e.split("|").map(s => s.trim());
          return `
            <div style="display: flex; margin-bottom: 4px;">
              <div style="flex: 1;">${role}</div>
              <div style="flex: 1;">${company}</div>
              <div style="flex: 1;">${duration}</div>
            </div>
          `;
        }).join("")}
      ` : ""}
      ${skills ? `<hr/><h4>Skills</h4><ul>${skills.split(',').map(skill => `<li>${skill.trim()}</li>`).join("")}</ul>` : ""}
      ${educationEntries.length ? `
        <hr/>
        <h4>Education</h4>
        <div style="display: flex; font-weight: bold; margin-bottom: 8px;">
          <div style="flex: 1;">Degree</div>
          <div style="flex: 2;">Institution</div>
          <div style="flex: 1;">Year</div>
          <div style="flex: 1;">Percentage</div>
        </div>
        ${educationEntries.map(e => {
          const [degree, institution, year, percentage] = e.split("|").map(s => s.trim());
          return `
            <div style="display: flex; margin-bottom: 4px;">
              <div style="flex: 1;">${degree}</div>
              <div style="flex: 2;">${institution}</div>
              <div style="flex: 1;">${year}</div>
              <div style="flex: 1;">${percentage}</div>
            </div>
          `;
        }).join("")}
      ` : ""}
      ${certificates ? `<hr/><h4>Certifications / Awards</h4><ul>${certificates.split(',').map(c => `<li>${c.trim()}</li>`).join("")}</ul>` : ""}
      ${projectEntries.length ? `
        <hr/><h4>Projects</h4>
        <div style="display: flex; font-weight: bold; margin-bottom: 8px;">
          <div style="flex: 1;">Project Title</div>
          <div style="flex: 3;">Link</div>
        </div>
        ${projectEntries.map(p => {
          const [title, link] = p.split("|").map(s => s.trim());
          return `
            <div style="display: flex; margin-bottom: 4px;">
              <div style="flex: 1;">${title}</div>
              <div style="flex: 3;">${link}</div>
            </div>
          `;
        }).join("")}
      ` : ""}
    </div>
  `;
}

// Preview Resume in Modal
function previewResume() {
  generateResumeContent();
  const modal = new bootstrap.Modal(document.getElementById('previewModal'));
  modal.show();
}

// Generate PDF
function generatePDF() {
  generateResumeContent();
  const content = document.getElementById("pdf-content");
  html2pdf().from(content).set({
    margin: 0.15,
    filename: `${document.getElementById("fullname").value || "Resume"}.pdf`,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
  }).save();
}

// Reset Form
function resetForm() {
  document.getElementById("resume").reset();
  document.getElementById("resume-content").innerHTML = "";
}

// Hook buttons
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("previewBtn")?.addEventListener("click", previewResume);
  document.getElementById("downloadBtn")?.addEventListener("click", generatePDF);
  document.getElementById("resetBtn")?.addEventListener("click", resetForm);
});