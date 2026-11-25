document.getElementById("slot-posts").outerHTML = `
<div class="postwrap" id="posts"><div class="postin"><div class="feed"><div class="pcard" role="button" tabindex="0"><div class="ph"><i class="pfp"></i><div class="pn"><b>walnuts</b><span class="date">August 17, 2024</span></div></div><div class="media"><div class="slides"><img class="slide" alt="" src="photos/posts/post1-slide1.jpg"><img class="slide" alt="" src="photos/posts/post1-slide2.jpg"><img class="slide" alt="" src="photos/posts/post1-slide3.jpg"></div><div class="dots"><i></i><i></i><i></i></div></div></div></div></div></div>
`;

document.body.insertAdjacentHTML("beforeend", `
<div class="pview" id="pview"><div class="pvbar"><button class="pvback" id="pvback" aria-label="Back"><svg viewBox="0 0 24 24"><path d="M15 5l-7 7 7 7"/></svg></button><div class="pvt"><small>walnuts</small><b>Posts</b></div></div><div class="pvlist" id="pvlist"></div></div>
`);
