
const highlights = [
  {
    cover: "photos/highlight-cover.jpg",
    story: "photos/highlight-story.jpg"
    story: "photos/highlight-story-1.jpg"
  }
];

document.getElementById("slot-highlight").outerHTML = `
<div class="hl" id="highlights">
  <button class="hl-i" type="button" aria-label="Highlight">
    <i style="background-image:url(${highlights[0].cover})"></i>
  </button>
</div>
`;

document.body.insertAdjacentHTML("beforeend", `
<div class="story" id="story" aria-hidden="true">
  <div class="sbar"><i></i></div>
  <div class="shead"><i class="pfp"></i><b>walnuts</b></div>
  <button class="sx" id="storyX" type="button" aria-label="Close">
    <svg viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18"/></svg>
  </button>
  <img class="simg" alt="" src="${highlights[0].story}">
</div>
`);
