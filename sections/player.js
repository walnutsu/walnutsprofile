
document.getElementById("slot-player").outerHTML = `
<div class="albums" id="albums">

  <div class="row" data-a="2">
    <div class="player">
      <div class="cover c3" role="button" aria-label="Restart song"></div>
      <div class="disc"></div>
    </div>

    <div class="np">
      <div class="t"></div>
      <div class="bar"><i></i></div>
      <div class="sec">
        <span class="cur">0:00</span>
        <span class="dur">-:--</span>
      </div>
    </div>
  </div>

  <div class="row" data-a="0">
    <div class="player">
      <div class="cover" role="button" aria-label="Next song"></div>
      <div class="disc"></div>
    </div>

    <div class="np">
      <div class="t"></div>
      <div class="bar"><i></i></div>
      <div class="sec">
        <span>0:00</span>
        <span>-:--</span>
      </div>
    </div>
  </div>

  <div class="row" data-a="1">
    <div class="player">
      <div class="cover c2" role="button" aria-label="Restart song"></div>
      <div class="disc"></div>
    </div>

    <div class="np">
      <div class="t"></div>
      <div class="bar"><i></i></div>
      <div class="sec">
        <span class="cur">0:00</span>
        <span class="dur">-:--</span>
      </div>
    </div>
  </div>

  <div class="row" data-a="3">
    <div class="player">
      <div class="cover c4" role="button" aria-label="Next song"></div>
      <div class="disc"></div>
    </div>

    <div class="np">
      <div class="t"></div>
      <div class="bar"><i></i></div>
      <div class="sec">
        <span class="cur">0:00</span>
        <span class="dur">-:--</span>
      </div>
    </div>
  </div>

</div>

<div class="adots" id="adots">
  <i class="on"></i>
  <i></i>
  <i></i>
  <i></i>
</div>

<audio id="music" playsinline preload="auto"></audio>
`;
