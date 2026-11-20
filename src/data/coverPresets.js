// src/data/coverPresets.js
export const VTU_STYLE = {
  presetId: "vtu",
  accent: "#9b2d2d",  
  font: "times",        // one color the user can change for every "accent" line
  border: "double",
  zones: {
    top: [
      { id: "uni",      on: true, text: "VISVESVARAYA TECHNOLOGICAL UNIVERSITY", size: 22, bold: true, color: "accent" },
      { id: "uniAddr",  on: true, text: "Jnana Sangama, Santhibastawad Road, Machhe\nBelagavi - 590018, Karnataka, India", size: 13, bold: true, color: "text" },
      { id: "logo1",    type: "image", on: true, width: 110 },
    ],
    middle: [
      { id: "reportType", on: true, text: "MINI PROJECT (BIS586) REPORT", size: 14, bold: true, color: "text" },
      { id: "on",         on: true, text: "ON", size: 12, bold: true, color: "text" },
      { id: "title",      on: true, text: "Title of the project", size: 18, bold: true, color: "accent", quotes: true },
      { id: "partial",    on: true, text: "Submitted in the partial fulfilment of the requirements for the award of the degree of", size: 13, bold: true, color: "text" },
      { id: "degree",     off: true, text: "BACHELOR OF ENGINEERING", size: 18, bold: true, color: "accent" },
      { id: "in",         on: true, text: "IN", size: 12, bold: true, color: "text" },
      { id: "branch",     on: true, text: "INFORMATION SCIENCE AND ENGINEERING", size: 18, bold: true, color: "accent" },
      { id: "acYear",     on: true, text: "For the Academic Year 2026-2027", size: 14, bold: true, color: "text" },
      { id: "submitted",  off: true, text: "Submitted by", size: 13, bold: true, color: "text" },
     { id: "students", type: "students", on: true, size: 16, bold: true, color: "accent", showUsn: true, layout: "plain", nameHeading: "Name", usnHeading: "USN", tableBorders: true },
      { id: "guideHead",  on: true, text: "Under the Guidance of", size: 14, bold: true, color: "text" },
      { id: "guide",      on: true, text: "Guide Name\nDesignation,\nDept. of ISE, JSSATE", size: 14, bold: true, color: "text" },
    ],
    bottom: [
      { id: "logo2",   type: "image", on: true, width: 100 },
      { id: "year",    on: true, text: "2026-2027", size: 16, bold: true, color: "text" },
      { id: "dept",    on: true, text: "DEPARTMENT OF INFORMATION SCIENCE AND ENGINEERING", size: 14, bold: true, color: "text" },
      { id: "college", on: true, text: "JSS ACADEMY OF TECHNICAL EDUCATION", size: 20, bold: true, color: "text" },
      { id: "address", on: true, text: "JSS Campus, Dr. Vishnuvardhan Road, Bengaluru-560060", size: 12, bold: true, color: "text" },
    ],
  },
};

export const SIMPLE_STYLE = {
  presetId: "simple",
  accent: "#1e3a8a",
  font: "times",
  border: "double",
  zones: {
    top: [
      { id: "org", on: true, text: "NATIONAL SERVICE SCHEME", size: 20, bold: true, color: "accent" },
      { id: "orgSub", on: true, text: "JSS Academy of Technical Education, Bengaluru", size: 14, bold: true, color: "text" },
      { id: "logo1", type: "image", on: true, width: 110 },
    ],
    middle: [
      { id: "reportType", on: true, text: "ACTIVITY REPORT", size: 18, bold: true, color: "accent" },
      { id: "title", on: true, text: "Title of the activity", size: 20, bold: true, color: "text", quotes: true },
      { id: "event", on: true, text: "Held on: date, venue", size: 13, bold: false, color: "text" },
      { id: "submitted", on: true, text: "Submitted by", size: 13, bold: true, color: "text" },
      { id: "students", type: "students", on: true, size: 14, bold: false, color: "text", showUsn: true, layout: "table", nameHeading: "Name", usnHeading: "USN", tableBorders: true },
      { id: "guideHead", on: true, text: "Under the guidance of", size: 14, bold: true, color: "text" },
      { id: "guide", on: true, text: "Programme Officer Name\nDesignation", size: 14, bold: true, color: "text" },
    ],
    bottom: [
      { id: "dept", on: true, text: "DEPARTMENT OF …", size: 14, bold: true, color: "text" },
      { id: "year", on: true, text: "Academic Year 2026-2027", size: 13, bold: true, color: "text" },
    ],
  },
};

export const COVER_PRESETS = { vtu: VTU_STYLE, simple: SIMPLE_STYLE };