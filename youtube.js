// Pula/acelera anúncios de vídeo no YouTube
let estavaEmAnuncio = false;
let mudoAntes = false;
let velocidadeAntes = 1;

const BOTOES_PULAR = [
  ".ytp-skip-ad-button",
  ".ytp-ad-skip-button",
  ".ytp-ad-skip-button-modern",
  ".ytp-ad-skip-button-slot button"
];

function tratarAnuncio() {
  const player = document.querySelector(".html5-video-player");
  const video = document.querySelector("video.html5-main-video");
  if (!player || !video) return;

  const emAnuncio = player.classList.contains("ad-showing");

  if (emAnuncio) {
    if (!estavaEmAnuncio) {
      mudoAntes = video.muted;
      velocidadeAntes = video.playbackRate || 1;
      estavaEmAnuncio = true;
    }
    video.muted = true;
    video.playbackRate = 16;
    if (isFinite(video.duration) && video.duration > 0) {
      video.currentTime = video.duration;
    }
    for (const sel of BOTOES_PULAR) {
      const botao = document.querySelector(sel);
      if (botao) botao.click();
    }
  } else if (estavaEmAnuncio) {
    video.muted = mudoAntes;
    video.playbackRate = velocidadeAntes;
    estavaEmAnuncio = false;
  }
}

new MutationObserver(tratarAnuncio).observe(document.documentElement, {
  childList: true,
  subtree: true,
  attributes: true,
  attributeFilter: ["class"]
});
setInterval(tratarAnuncio, 500);
