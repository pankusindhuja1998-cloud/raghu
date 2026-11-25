(() => {
  "use strict";

  const DATA = window.SER_DATA;
  if (!DATA) return;

  // =========================================================
  // 1. HERO ANIMATED DISTILLATION TOPOLOGY CANVAS
  // =========================================================
  const heroCanvas = document.getElementById("heroTopologyCanvas");
  const heroCtx = heroCanvas ? heroCanvas.getContext("2d") : null;
  let heroPhase = 0;

  function drawHeroTopology() {
    if (!heroCtx || !heroCanvas) return;
    const w = heroCanvas.width;
    const h = heroCanvas.height;
    heroCtx.clearRect(0, 0, w, h);

    // Subtle background grid
    heroCtx.strokeStyle = "rgba(148,163,184,0.06)";
    heroCtx.lineWidth = 1;
    for (let x = 0; x < w; x += 30) {
      heroCtx.beginPath();
      heroCtx.moveTo(x, 0);
      heroCtx.lineTo(x, h);
      heroCtx.stroke();
    }
    for (let y = 0; y < h; y += 30) {
      heroCtx.beginPath();
      heroCtx.moveTo(0, y);
      heroCtx.lineTo(w, y);
      heroCtx.stroke();
    }

    // Input Audio Waveform Box
    drawRoundBox(heroCtx, 18, 130, 86, 100, "rgba(255,255,255,0.04)", "rgba(148,163,184,0.28)");
    heroCtx.fillStyle = "#cbd5e1";
    heroCtx.font = "700 10px monospace";
    heroCtx.fillText("16kHz AUDIO", 28, 150);
    heroCtx.strokeStyle = "#00e5ff";
    heroCtx.lineWidth = 1.8;
    heroCtx.beginPath();
    for (let i = 0; i <= 66; i++) {
      const px = 28 + i;
      const py = 186 + Math.sin(i * 0.35 + heroPhase * 3) * 14 * Math.sin((i / 66) * Math.PI);
      if (i === 0) heroCtx.moveTo(px, py);
      else heroCtx.lineTo(px, py);
    }
    heroCtx.stroke();

    // Teacher Transformer Stack (Top)
    drawRoundBox(heroCtx, 148, 28, 224, 114, "rgba(255,122,51,0.09)", "rgba(255,122,51,0.45)");
    heroCtx.fillStyle = "#ff7a33";
    heroCtx.font = "700 11px monospace";
    heroCtx.fillText("TEACHER: WavLM-Large (316M)", 162, 50);

    for (let i = 0; i < 12; i++) {
      const lx = 162 + i * 16.5;
      const pulse = 0.55 + 0.45 * Math.sin(heroPhase * 2.2 - i * 0.35);
      heroCtx.fillStyle = `rgba(255, 122, 51, ${pulse.toFixed(2)})`;
      heroCtx.fillRect(lx, 66, 11, 48);
    }
    heroCtx.fillStyle = "#94a3b8";
    heroCtx.font = "10px monospace";
    heroCtx.fillText("24 Transformer Layers • 185 ms", 162, 131);

    // Student Stack (Bottom)
    drawRoundBox(heroCtx, 148, 222, 224, 110, "rgba(0,229,255,0.09)", "rgba(0,229,255,0.48)");
    heroCtx.fillStyle = "#00e5ff";
    heroCtx.font = "700 11px monospace";
    heroCtx.fillText("STUDENT: TinyConformer (1.8M)", 162, 244);

    for (let i = 0; i < 4; i++) {
      const lx = 166 + i * 48;
      const pulse = 0.6 + 0.4 * Math.sin(heroPhase * 3.0 - i * 0.5);
      heroCtx.fillStyle = `rgba(0, 229, 255, ${pulse.toFixed(2)})`;
      heroCtx.fillRect(lx, 258, 34, 46);
    }
    heroCtx.fillStyle = "#94a3b8";
    heroCtx.font = "10px monospace";
    heroCtx.fillText("4 Conformer Blocks • 4.2 ms", 162, 320);

    // Distillation Transfer Arrows (Teacher -> Student)
    const tapX = [195, 255, 315, 355];
    tapX.forEach((x, idx) => {
      heroCtx.strokeStyle = "rgba(168, 85, 247, 0.5)";
      heroCtx.lineWidth = 1.6;
      heroCtx.setLineDash([4, 4]);
      heroCtx.beginPath();
      heroCtx.moveTo(x, 142);
      heroCtx.lineTo(x, 222);
      heroCtx.stroke();
      heroCtx.setLineDash([]);

      // Animated knowledge packet
      const t = (heroPhase * 0.7 + idx * 0.23) % 1;
      const py = 142 + t * 80;
      heroCtx.beginPath();
      heroCtx.arc(x, py, 3.6, 0, Math.PI * 2);
      heroCtx.fillStyle = "#a855f7";
      heroCtx.fill();
    });

    // Center Badge for KD Loss
    drawRoundBox(heroCtx, 198, 168, 134, 28, "rgba(15,23,42,0.95)", "rgba(168,85,247,0.65)");
    heroCtx.fillStyle = "#e9d5ff";
    heroCtx.font = "700 10px monospace";
    heroCtx.fillText("KL(τ) + LAYER ALIGN", 209, 186);

    // Input arrows to Teacher & Student
    drawFlowLine(heroCtx, 104, 165, 148, 88, "#ff7a33", heroPhase);
    drawFlowLine(heroCtx, 104, 195, 148, 276, "#00e5ff", heroPhase);

    // Output Box (Edge Emotion Prediction)
    drawRoundBox(heroCtx, 412, 222, 110, 110, "rgba(16,185,129,0.09)", "rgba(16,185,129,0.45)");
    heroCtx.fillStyle = "#10b981";
    heroCtx.font = "700 10px monospace";
    heroCtx.fillText("EDGE OUTPUT", 428, 244);

    const bars = [
      { label: "ANG", v: 0.81, c: "#00e5ff" },
      { label: "FEA", v: 0.12, c: "#a855f7" },
      { label: "HAP", v: 0.05, c: "#64748b" }
    ];
    bars.forEach((b, idx) => {
      const y = 264 + idx * 21;
      heroCtx.fillStyle = "#cbd5e1";
      heroCtx.font = "10px monospace";
      heroCtx.fillText(b.label, 422, y + 8);
      heroCtx.fillStyle = "rgba(255,255,255,0.08)";
      heroCtx.fillRect(450, y, 60, 8);
      heroCtx.fillStyle = b.c;
      heroCtx.fillRect(450, y, 60 * b.v, 8);
    });

    drawFlowLine(heroCtx, 372, 276, 412, 276, "#10b981", heroPhase);

    heroPhase += 0.025;
    requestAnimationFrame(drawHeroTopology);
  }

  function drawRoundBox(ctx, x, y, w, h, fill, stroke) {
    ctx.beginPath();
    if (typeof ctx.roundRect === "function") {
      ctx.roundRect(x, y, w, h, 10);
    } else {
      ctx.rect(x, y, w, h);
    }
    ctx.fillStyle = fill;
    ctx.fill();
    ctx.strokeStyle = stroke;
    ctx.lineWidth = 1.2;
    ctx.stroke();
  }

  function drawFlowLine(ctx, x1, y1, x2, y2, color, phase) {
    ctx.strokeStyle = color;
    ctx.globalAlpha = 0.55;
    ctx.lineWidth = 1.6;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
    ctx.globalAlpha = 1;

    const t = phase % 1;
    const px = x1 + (x2 - x1) * t;
    const py = y1 + (y2 - y1) * t;
    ctx.beginPath();
    ctx.arc(px, py, 3, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
  }

  if (heroCanvas) requestAnimationFrame(drawHeroTopology);

  // =========================================================
  // 2. TEMPERATURE (τ) & LOSS WEIGHT (α) KD SIMULATOR
  // =========================================================
  const tempSlider = document.getElementById("tempSlider");
  const alphaSlider = document.getElementById("alphaSlider");
  const studentSelect = document.getElementById("studentSelect");
  const utterancePreset = document.getElementById("utterancePreset");
  const tempValue = document.getElementById("tempValue");
  const alphaValue = document.getElementById("alphaValue");
  const liveEquationText = document.getElementById("liveEquationText");
  const projectedUar = document.getElementById("projectedUar");
  const uarDelta = document.getElementById("uarDelta");
  const compressionRatio = document.getElementById("compressionRatio");
  const footprintSub = document.getElementById("footprintSub");
  const entropyReadout = document.getElementById("entropyReadout");
  const tempInsight = document.getElementById("tempInsight");
  const distChart = document.getElementById("distillationChart");
  const distCtx = distChart ? distChart.getContext("2d") : null;
  const pytorchSnippet = document.getElementById("pytorchSnippet");

  function softmax(logits, tau = 1) {
    const scaled = logits.map((z) => z / tau);
    const maxVal = Math.max(...scaled);
    const exps = scaled.map((v) => Math.exp(v - maxVal));
    const sum = exps.reduce((a, b) => a + b, 0);
    return exps.map((e) => e / sum);
  }

  function shannonEntropy(probs) {
    return -probs.reduce((acc, p) => (p > 1e-6 ? acc + p * Math.log2(p) : acc), 0);
  }

  function updateSimulator() {
    if (!tempSlider || !alphaSlider) return;

    const tau = parseFloat(tempSlider.value);
    const alpha = parseFloat(alphaSlider.value);
    const studentKey = studentSelect.value;
    const uttKey = utterancePreset.value;

    const profile = DATA.studentProfiles[studentKey];
    const utt = DATA.utteranceLogits[uttKey];

    tempValue.textContent = tau.toFixed(1);
    alphaValue.textContent = alpha.toFixed(2);

    const ceWeight = (1 - alpha).toFixed(2);
    const kdWeight = alpha.toFixed(2);
    liveEquationText.textContent = `L = ${ceWeight} · L_CE(y, p_S) + ${kdWeight} · (${tau.toFixed(1)})² · D_KL(p_T^τ ‖ p_S^τ)`;

    // Softened Teacher distribution & simulated Student distribution
    const teacherSoft = softmax(utt.logits, tau);
    const teacherHard = softmax(utt.logits, 1.0);

    // Student learns blend of hard labels and softened teacher depending on alpha & capacity
    const capacityFactor = Math.min(1, 0.72 + Math.log10(profile.paramsM + 1) * 0.18);
    const studentLogits = utt.logits.map((z, idx) => {
      const noisePenalty = idx % 2 === 0 ? 0.12 : -0.14;
      return z * (0.75 + alpha * 0.23 * capacityFactor) + (1 - alpha) * noisePenalty;
    });
    const studentProbs = softmax(studentLogits, tau);

    const entropy = shannonEntropy(teacherSoft);
    entropyReadout.textContent = `Entropy: ${entropy.toFixed(2)} bits`;

    // Projected UAR estimation based on tau & alpha closeness to sweet spot
    const tauPenalty = Math.abs(tau - profile.optimalTau) * 0.24;
    const alphaGain = alpha === 0 ? 0 : Math.sin(Math.min(1, alpha / 0.85) * (Math.PI / 2)) * (profile.peakKdUar - profile.baseNoKdUar);
    const estUar = Math.max(profile.baseNoKdUar, profile.baseNoKdUar + alphaGain - (alpha > 0 ? tauPenalty : 0));
    const gain = estUar - profile.baseNoKdUar;

    projectedUar.textContent = `${estUar.toFixed(1)}%`;
    uarDelta.textContent = `${gain >= 0 ? "+" : ""}${gain.toFixed(1)}% over No-KD`;

    const ratio = 316 / profile.paramsM;
    compressionRatio.textContent = `${ratio.toFixed(1)}×`;
    footprintSub.textContent = `${profile.fp32MB} MB FP32 / ${profile.int8MB} MB INT8`;

    tempInsight.innerHTML = `<strong>${utt.label} (τ = ${tau.toFixed(1)}):</strong> ${utt.insight}`;

    drawDistillationChart(DATA.emotions, teacherHard, teacherSoft, studentProbs, tau);
    updatePytorchSnippet(tau, alpha, profile);
  }

  function drawDistillationChart(labels, teacherHard, teacherSoft, studentProbs, tau) {
    if (!distCtx || !distChart) return;
    const w = distChart.width;
    const h = distChart.height;
    distCtx.clearRect(0, 0, w, h);

    const pad = { top: 40, right: 24, bottom: 48, left: 48 };
    const plotW = w - pad.left - pad.right;
    const plotH = h - pad.top - pad.bottom;

    // Grid lines
    distCtx.strokeStyle = "rgba(148,163,184,0.12)";
    distCtx.fillStyle = "#64748b";
    distCtx.font = "11px monospace";
    for (let g = 0; g <= 4; g++) {
      const y = pad.top + (plotH * g) / 4;
      const pct = (100 - g * 25) + "%";
      distCtx.beginPath();
      distCtx.moveTo(pad.left, y);
      distCtx.lineTo(w - pad.right, y);
      distCtx.stroke();
      distCtx.fillText(pct, 10, y + 4);
    }

    // Legend
    const legendItems = [
      { label: "Teacher Hard (τ=1)", color: "rgba(255,122,51,0.45)" },
      { label: `Teacher Soft (τ=${tau.toFixed(1)})`, color: "#ff7a33" },
      { label: "Distilled Student", color: "#00e5ff" }
    ];
    let lx = pad.left;
    legendItems.forEach((item) => {
      distCtx.fillStyle = item.color;
      distCtx.fillRect(lx, 14, 12, 10);
      distCtx.fillStyle = "#cbd5e1";
      distCtx.font = "11px sans-serif";
      distCtx.fillText(item.label, lx + 17, 23);
      lx += 155;
    });

    const groupW = plotW / labels.length;
    const barW = Math.min(24, groupW * 0.22);

    labels.forEach((label, i) => {
      const cx = pad.left + i * groupW + groupW / 2;
      const vals = [teacherHard[i], teacherSoft[i], studentProbs[i]];
      const colors = ["rgba(255,122,51,0.38)", "#ff7a33", "#00e5ff"];

      vals.forEach((v, bIdx) => {
        const bh = v * plotH;
        const bx = cx - (barW * 1.65) + bIdx * (barW + 4);
        const by = pad.top + plotH - bh;
        distCtx.fillStyle = colors[bIdx];
        distCtx.fillRect(bx, by, barW, bh);

        if (v >= 0.04) {
          distCtx.fillStyle = "#e2e8f0";
          distCtx.font = "10px monospace";
          distCtx.fillText((v * 100).toFixed(0) + "%", bx - 1, by - 5);
        }
      });

      distCtx.fillStyle = "#cbd5e1";
      distCtx.font = "600 12px sans-serif";
      distCtx.textAlign = "center";
      distCtx.fillText(label, cx, h - 18);
      distCtx.textAlign = "left";
    });
  }

  function updatePytorchSnippet(tau, alpha, profile) {
    if (!pytorchSnippet) return;
    const ceW = (1 - alpha).toFixed(2);
    const kdW = alpha.toFixed(2);
    pytorchSnippet.textContent = `import torch
import torch.nn as nn
import torch.nn.functional as F

class SERDistillationLoss(nn.Module):
    """Knowledge Distillation for ${profile.name} (${profile.paramsM}M params)"""
    def __init__(self, tau=${tau.toFixed(1)}, alpha=${kdW}, beta_feat=0.25):
        super().__init__()
        self.tau = tau
        self.alpha = alpha
        self.beta_feat = beta_feat

    def forward(self, s_logits, t_logits, s_feats, t_feats, labels):
        # 1. Ground-truth Cross Entropy
        l_ce = F.cross_entropy(s_logits, labels)

        # 2. Softened Dark-Knowledge KL Divergence
        p_s = F.log_softmax(s_logits / self.tau, dim=-1)
        p_t = F.softmax(t_logits.detach() / self.tau, dim=-1)
        l_kl = F.kl_div(p_s, p_t, reduction="batchmean") * (self.tau ** 2)

        # 3. Prosodic Hidden-State Cosine Alignment
        l_feat = 1.0 - F.cosine_similarity(s_feats, t_feats.detach(), dim=-1).mean()

        return ${ceW} * l_ce + self.alpha * l_kl + self.beta_feat * l_feat`;
  }

  [tempSlider, alphaSlider, studentSelect, utterancePreset].forEach((el) => {
    if (el) el.addEventListener("input", updateSimulator);
  });
  updateSimulator();

  // =========================================================
  // 3. WEB AUDIO API + LIVE MIC ACOUSTIC EMOTION SANDBOX
  // =========================================================
  const emotionButtons = document.querySelectorAll(".emotion-btn");
  const playSynthBtn = document.getElementById("playSynthBtn");
  const micToggleBtn = document.getElementById("micToggleBtn");
  const audioStatusPill = document.getElementById("audioStatusPill");

  const teleF0 = document.getElementById("teleF0");
  const teleEnergy = document.getElementById("teleEnergy");
  const teleCentroid = document.getElementById("teleCentroid");
  const teleRate = document.getElementById("teleRate");

  const waveCanvas = document.getElementById("waveformCanvas");
  const waveCtx = waveCanvas ? waveCanvas.getContext("2d") : null;
  const specCanvas = document.getElementById("spectrogramCanvas");
  const specCtx = specCanvas ? specCanvas.getContext("2d") : null;

  let currentEmotion = "angry";
  let audioCtx = null;
  let analyser = null;
  let micStream = null;
  let isMicActive = false;
  let isSynthPlaying = false;
  let rafAudioId = null;

  function ensureAudioContext() {
    if (!audioCtx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      audioCtx = new AudioContextClass();
      analyser = audioCtx.createAnalyser();
      analyser.fftSize = 1024;
      analyser.smoothingTimeConstant = 0.78;
    }
    if (audioCtx.state === "suspended") {
      audioCtx.resume();
    }
  }

  function renderProbBars(containerId, probs, color) {
    const el = document.getElementById(containerId);
    if (!el) return;
    el.innerHTML = DATA.emotions
      .map((emo, idx) => {
        const pct = Math.round(probs[idx] * 100);
        return `
          <div class="prob-row">
            <div class="prob-label-line">
              <span>${emo}</span>
              <span>${pct}%</span>
            </div>
            <div class="prob-track">
              <div class="prob-fill" style="width:${pct}%; background:${color};"></div>
            </div>
          </div>
        `;
      })
      .join("");
  }

  function selectEmotionPreset(emoKey) {
    currentEmotion = emoKey;
    const preset = DATA.acousticPresets[emoKey];
    if (!preset) return;

    emotionButtons.forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.emotion === emoKey);
    });

    teleF0.textContent = `${preset.baseF0} Hz`;
    teleEnergy.textContent = preset.energyDb;
    teleCentroid.textContent = preset.centroidHz;
    teleRate.textContent = preset.speechRate;

    renderProbBars("teacherBars", preset.teacherProbs, "#ff7a33");
    renderProbBars("studentBars", preset.studentProbs, "#00e5ff");
    renderProbBars("nokdBars", preset.nokdProbs, "#94a3b8");

    if (!isMicActive && !isSynthPlaying) {
      drawStaticPreview(preset);
    }
  }

  function drawStaticPreview(preset) {
    if (waveCtx && waveCanvas) {
      const w = waveCanvas.width;
      const h = waveCanvas.height;
      waveCtx.clearRect(0, 0, w, h);
      waveCtx.strokeStyle = "#00e5ff";
      waveCtx.lineWidth = 1.8;
      waveCtx.beginPath();
      const freqScale = preset.baseF0 / 120;
      for (let x = 0; x < w; x++) {
        const env = Math.sin((x / w) * Math.PI);
        const y = h / 2 + Math.sin(x * 0.08 * freqScale) * (h * 0.34) * env * (0.7 + 0.3 * Math.cos(x * 0.03));
        if (x === 0) waveCtx.moveTo(x, y);
        else waveCtx.lineTo(x, y);
      }
      waveCtx.stroke();
    }

    if (specCtx && specCanvas) {
      const w = specCanvas.width;
      const h = specCanvas.height;
      specCtx.clearRect(0, 0, w, h);
      const cols = 75;
      const rows = 24;
      const cw = w / cols;
      const rh = h / rows;

      for (let c = 0; c < cols; c++) {
        const env = Math.sin((c / cols) * Math.PI);
        for (let r = 0; r < rows; r++) {
          const band = rows - 1 - r;
          const harmonicMatch = preset.harmonics[Math.min(preset.harmonics.length - 1, Math.floor(band / 4))] || 0.05;
          const intensity = Math.min(1, env * harmonicMatch * (0.65 + 0.35 * Math.sin(c * 0.35 + band)));
          specCtx.fillStyle = heatColor(intensity);
          specCtx.fillRect(c * cw, r * rh, cw + 0.5, rh + 0.5);
        }
      }
    }
  }

  function heatColor(val) {
    const v = Math.max(0, Math.min(1, val));
    if (v < 0.33) return `rgba(14, 116, 144, ${0.25 + v * 1.5})`;
    if (v < 0.66) return `rgba(0, 229, 255, ${0.45 + v * 0.5})`;
    return `rgba(255, 122, 51, ${0.7 + v * 0.3})`;
  }

  function synthesizeEmotionalVoice(emoKey) {
    stopMicIfActive();
    ensureAudioContext();
    const preset = DATA.acousticPresets[emoKey];
    if (!preset) return;

    const now = audioCtx.currentTime;
    const duration = 1.6;

    const masterGain = audioCtx.createGain();
    masterGain.gain.setValueAtTime(0.001, now);
    masterGain.gain.exponentialRampToValueAtTime(0.22, now + 0.08);
    masterGain.gain.setValueAtTime(0.22, now + duration - 0.25);
    masterGain.gain.exponentialRampToValueAtTime(0.001, now + duration);

    const formantFilter = audioCtx.createBiquadFilter();
    formantFilter.type = "bandpass";
    formantFilter.frequency.setValueAtTime(preset.baseF0 * 3.2, now);
    formantFilter.Q.setValueAtTime(2.6, now);

    // Vibrato / prosodic jitter LFO
    const lfo = audioCtx.createOscillator();
    const lfoGain = audioCtx.createGain();
    lfo.frequency.setValueAtTime(preset.vibratoHz, now);
    lfoGain.gain.setValueAtTime(Math.abs(preset.f0Swing) * 0.35, now);
    lfo.connect(lfoGain);

    const oscs = [];
    preset.harmonics.forEach((amp, idx) => {
      const osc = audioCtx.createOscillator();
      const g = audioCtx.createGain();
      osc.type = idx === 0 ? "sawtooth" : "triangle";
      const harmonicMult = idx + 1;
      osc.frequency.setValueAtTime(preset.baseF0 * harmonicMult, now);
      osc.frequency.linearRampToValueAtTime(
        Math.max(70, (preset.baseF0 + preset.f0Swing) * harmonicMult),
        now + duration * 0.75
      );
      lfoGain.connect(osc.frequency);
      g.gain.setValueAtTime(amp * 0.22, now);
      osc.connect(g);
      g.connect(formantFilter);
      osc.start(now);
      osc.stop(now + duration);
      oscs.push(osc);
    });

    lfo.start(now);
    lfo.stop(now + duration);

    formantFilter.connect(masterGain);
    masterGain.connect(analyser);
    masterGain.connect(audioCtx.destination);

    isSynthPlaying = true;
    audioStatusPill.textContent = `SYNTHESIZING: ${preset.name.toUpperCase()}`;
    if (specCtx && specCanvas) specCtx.clearRect(0, 0, specCanvas.width, specCanvas.height);

    startLiveAnalyserLoop();

    setTimeout(() => {
      if (!isMicActive) {
        isSynthPlaying = false;
        audioStatusPill.textContent = `ANALYZED: ${preset.name.toUpperCase()}`;
        cancelAnimationFrame(rafAudioId);
      }
    }, duration * 1000 + 80);
  }

  function startLiveAnalyserLoop() {
    if (!analyser || !waveCtx || !specCtx) return;
    const timeData = new Uint8Array(analyser.fftSize);
    const freqData = new Uint8Array(analyser.frequencyBinCount);

    function frame() {
      analyser.getByteTimeDomainData(timeData);
      analyser.getByteFrequencyData(freqData);

      // Draw Waveform
      const ww = waveCanvas.width;
      const wh = waveCanvas.height;
      waveCtx.clearRect(0, 0, ww, wh);
      waveCtx.strokeStyle = "#00e5ff";
      waveCtx.lineWidth = 2;
      waveCtx.beginPath();
      const slice = ww / timeData.length;
      for (let i = 0; i < timeData.length; i++) {
        const v = timeData[i] / 128.0;
        const y = (v * wh) / 2;
        if (i === 0) waveCtx.moveTo(0, y);
        else waveCtx.lineTo(i * slice, y);
      }
      waveCtx.stroke();

      // Scroll Spectrogram left by 3px and draw new column
      const sw = specCanvas.width;
      const sh = specCanvas.height;
      const img = specCtx.getImageData(3, 0, sw - 3, sh);
      specCtx.putImageData(img, 0, 0);

      const bins = 48;
      const bh = sh / bins;
      for (let b = 0; b < bins; b++) {
        const val = freqData[b * 2] / 255;
        specCtx.fillStyle = heatColor(val);
        specCtx.fillRect(sw - 3, sh - (b + 1) * bh, 3, bh + 0.5);
      }

      // Live mic telemetry update
      if (isMicActive) {
        let sumSq = 0;
        let maxBin = 1;
        let maxVal = 0;
        let weightedFreq = 0;
        let magSum = 0;

        for (let i = 0; i < timeData.length; i++) {
          const norm = (timeData[i] - 128) / 128;
          sumSq += norm * norm;
        }
        const rms = Math.sqrt(sumSq / timeData.length);
        const db = rms > 0.001 ? 20 * Math.log10(rms) : -60;

        const nyquist = audioCtx.sampleRate / 2;
        for (let i = 1; i < freqData.length / 2; i++) {
          const mag = freqData[i];
          const freq = (i * nyquist) / freqData.length;
          if (freq >= 80 && freq <= 420 && mag > maxVal) {
            maxVal = mag;
            maxBin = i;
          }
          weightedFreq += freq * mag;
          magSum += mag;
        }
        const estF0 = Math.round((maxBin * nyquist) / freqData.length);
        const centroid = magSum > 10 ? Math.round(weightedFreq / magSum) : 0;

        teleF0.textContent = maxVal > 20 ? `${estF0} Hz` : "-- Hz";
        teleEnergy.textContent = `${db.toFixed(1)} dB`;
        teleCentroid.textContent = centroid ? `${centroid} Hz` : "-- Hz";
        teleRate.textContent = rms > 0.04 ? "Active Voice" : "Quiet";

        // Dynamic live classification heuristic from energy & pitch
        if (rms > 0.025) {
          const angryP = Math.min(0.85, Math.max(0.08, (estF0 / 300) * 0.45 + Math.max(0, (db + 35) / 35) * 0.4));
          const happyP = Math.min(0.75, Math.max(0.08, (centroid / 2800) * 0.55));
          const sadP = Math.min(0.75, Math.max(0.05, 1 - angryP - happyP * 0.5));
          const raw = [angryP, happyP, sadP * 0.4, 0.25, angryP * 0.35];
          const sum = raw.reduce((a, b) => a + b, 0);
          const normProbs = raw.map((v) => v / sum);
          const teacherProbs = normProbs.map((v, i) => (i === 0 ? v * 1.02 : v));
          renderProbBars("teacherBars", teacherProbs, "#ff7a33");
          renderProbBars("studentBars", normProbs, "#00e5ff");
          renderProbBars("nokdBars", [0.22, 0.20, 0.20, 0.22, 0.16], "#94a3b8");
        }
      }

      if (isMicActive || isSynthPlaying) {
        rafAudioId = requestAnimationFrame(frame);
      }
    }

    cancelAnimationFrame(rafAudioId);
    rafAudioId = requestAnimationFrame(frame);
  }

  async function toggleMicrophone() {
    if (isMicActive) {
      stopMicIfActive();
      selectEmotionPreset(currentEmotion);
      return;
    }

    try {
      ensureAudioContext();
      micStream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const src = audioCtx.createMediaStreamSource(micStream);
      src.connect(analyser);
      isMicActive = true;
      isSynthPlaying = false;
      micToggleBtn.classList.add("active-mic");
      micToggleBtn.textContent = "Stop Microphone";
      audioStatusPill.textContent = "LIVE MIC STREAMING";
      if (specCtx && specCanvas) specCtx.clearRect(0, 0, specCanvas.width, specCanvas.height);
      startLiveAnalyserLoop();
    } catch (err) {
      audioStatusPill.textContent = "MIC UNAVAILABLE — USING SYNTH";
      synthesizeEmotionalVoice(currentEmotion);
    }
  }

  function stopMicIfActive() {
    if (micStream) {
      micStream.getTracks().forEach((t) => t.stop());
      micStream = null;
    }
    isMicActive = false;
    micToggleBtn.classList.remove("active-mic");
    micToggleBtn.textContent = "Use Live Microphone";
  }

  emotionButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      stopMicIfActive();
      selectEmotionPreset(btn.dataset.emotion);
      synthesizeEmotionalVoice(btn.dataset.emotion);
    });
  });

  if (playSynthBtn) {
    playSynthBtn.addEventListener("click", () => synthesizeEmotionalVoice(currentEmotion));
  }
  if (micToggleBtn) {
    micToggleBtn.addEventListener("click", toggleMicrophone);
  }
  selectEmotionPreset("angry");

  // =========================================================
  // 4. LAYER-WISE ACOUSTIC DISTILLATION EXPLORER
  // =========================================================
  const layerCanvas = document.getElementById("layerMapCanvas");
  const layerCtx = layerCanvas ? layerCanvas.getContext("2d") : null;
  const strategyTabs = document.querySelectorAll(".tab-btn");
  const strategyTitle = document.getElementById("strategyTitle");
  const strategyDesc = document.getElementById("strategyDesc");
  const layerStagesWrap = document.querySelector(".layer-stages");

  function renderLayerMapping(strategyKey) {
    const strat = DATA.layerStrategies[strategyKey];
    if (!strat) return;

    strategyTabs.forEach((t) => {
      const active = t.dataset.strategy === strategyKey;
      t.classList.toggle("active", active);
      t.setAttribute("aria-selected", active ? "true" : "false");
    });

    strategyTitle.textContent = strat.title;
    strategyDesc.textContent = strat.desc;
    layerStagesWrap.innerHTML = strat.stages
      .map(
        ([tag, text]) => `
        <div class="stage-row">
          <span class="stage-tag">${tag}</span>
          <span>${text}</span>
        </div>`
      )
      .join("");

    if (!layerCtx || !layerCanvas) return;
    const w = layerCanvas.width;
    const h = layerCanvas.height;
    layerCtx.clearRect(0, 0, w, h);

    // Titles
    layerCtx.fillStyle = "#ff7a33";
    layerCtx.font = "700 11px monospace";
    layerCtx.fillText("TEACHER: 24 TRANSFORMER LAYERS", 24, 28);

    layerCtx.fillStyle = "#00e5ff";
    layerCtx.fillText("STUDENT: 4 CONFORMER BLOCKS", 24, 240);

    const teacherY = 54;
    const teacherH = 54;
    const tStartX = 24;
    const tWidth = (w - 48) / 24;

    // Draw 24 Teacher Layers
    const mappedTeachers = new Set(strat.connections.map((c) => c.teacher));
    for (let i = 0; i < 24; i++) {
      const x = tStartX + i * tWidth;
      const isMapped = mappedTeachers.has(i);
      layerCtx.fillStyle = isMapped ? "#ff7a33" : "rgba(255,122,51,0.22)";
      layerCtx.fillRect(x, teacherY, tWidth - 3, teacherH);
      if (i % 3 === 0 || isMapped) {
        layerCtx.fillStyle = isMapped ? "#fff" : "#64748b";
        layerCtx.font = "9px monospace";
        layerCtx.fillText(`L${i + 1}`, x + 1, teacherY + teacherH + 13);
      }
    }

    // Draw 4 Student Blocks
    const studentY = 252;
    const studentH = 34;
    const sGap = 24;
    const sBlockW = (w - 48 - sGap * 3) / 4;

    for (let s = 0; s < 4; s++) {
      const sx = 24 + s * (sBlockW + sGap);
      layerCtx.fillStyle = "rgba(0, 229, 255, 0.16)";
      layerCtx.strokeStyle = "#00e5ff";
      layerCtx.lineWidth = 1.4;
      layerCtx.beginPath();
      if (typeof layerCtx.roundRect === "function") {
        layerCtx.roundRect(sx, studentY, sBlockW, studentH, 8);
      } else {
        layerCtx.rect(sx, studentY, sBlockW, studentH);
      }
      layerCtx.fill();
      layerCtx.stroke();

      layerCtx.fillStyle = "#e0f2fe";
      layerCtx.font = "700 11px monospace";
      layerCtx.fillText(`Block ${s + 1}`, sx + 26, studentY + 21);
    }

    // Draw Curved Mapping Connectors
    strat.connections.forEach((conn) => {
      const tx = tStartX + conn.teacher * tWidth + (tWidth - 3) / 2;
      const ty = teacherY + teacherH + 18;
      const sx = 24 + conn.student * (sBlockW + sGap) + sBlockW / 2;
      const sy = studentY;

      layerCtx.strokeStyle = `rgba(168, 85, 247, ${conn.weight})`;
      layerCtx.lineWidth = 1.5 + conn.weight * 2.2;
      layerCtx.beginPath();
      layerCtx.moveTo(tx, ty);
      layerCtx.bezierCurveTo(tx, (ty + sy) / 2, sx, (ty + sy) / 2, sx, sy);
      layerCtx.stroke();

      // Weight pill
      const mx = (tx + sx) / 2;
      const my = (ty + sy) / 2;
      layerCtx.fillStyle = "#0f172a";
      layerCtx.fillRect(mx - 18, my - 9, 36, 16);
      layerCtx.fillStyle = "#e9d5ff";
      layerCtx.font = "10px monospace";
      layerCtx.fillText(`w=${conn.weight.toFixed(2)}`, mx - 15, my + 3);
    });
  }

  strategyTabs.forEach((tab) => {
    tab.addEventListener("click", () => renderLayerMapping(tab.dataset.strategy));
  });
  renderLayerMapping("prosody");

  // =========================================================
  // 5. PARETO BENCHMARK CHART & TABLE + COPY BUTTON
  // =========================================================
  const datasetFilter = document.getElementById("datasetFilter");
  const benchTableBody = document.getElementById("benchTableBody");
  const paretoCanvas = document.getElementById("paretoCanvas");
  const paretoCtx = paretoCanvas ? paretoCanvas.getContext("2d") : null;
  const copyCodeBtn = document.getElementById("copyCodeBtn");

  function renderBenchmarks(datasetKey) {
    const rows = DATA.benchmarks[datasetKey] || [];
    if (benchTableBody) {
      benchTableBody.innerHTML = rows
        .map(
          (r) => `
          <tr class="${r.role === "hero" ? "highlight-row" : ""}">
            <td><strong>${r.model}</strong></td>
            <td>${r.method}</td>
            <td>${r.params}</td>
            <td>${r.size}</td>
            <td>${r.latency} ms</td>
            <td><strong class="${r.role === "hero" ? "cyan" : ""}">${r.uar.toFixed(1)}%</strong></td>
          </tr>`
        )
        .join("");
    }

    if (!paretoCtx || !paretoCanvas) return;
    const w = paretoCanvas.width;
    const h = paretoCanvas.height;
    paretoCtx.clearRect(0, 0, w, h);

    const pad = { top: 28, right: 28, bottom: 42, left: 52 };
    const plotW = w - pad.left - pad.right;
    const plotH = h - pad.top - pad.bottom;

    const uars = rows.map((r) => r.uar);
    const minUar = Math.floor(Math.min(...uars) - 2);
    const maxUar = Math.ceil(Math.max(...uars) + 2);

    // Log-scale latency axis: 1 ms to 250 ms
    const mapX = (lat) => pad.left + (Math.log10(lat) / Math.log10(250)) * plotW;
    const mapY = (uar) => pad.top + plotH - ((uar - minUar) / (maxUar - minUar)) * plotH;

    // Grid
    paretoCtx.strokeStyle = "rgba(148,163,184,0.12)";
    paretoCtx.fillStyle = "#64748b";
    paretoCtx.font = "10px monospace";
    for (let i = 0; i <= 4; i++) {
      const u = minUar + ((maxUar - minUar) * i) / 4;
      const y = mapY(u);
      paretoCtx.beginPath();
      paretoCtx.moveTo(pad.left, y);
      paretoCtx.lineTo(w - pad.right, y);
      paretoCtx.stroke();
      paretoCtx.fillText(`${u.toFixed(0)}%`, 10, y + 3);
    }

    [2, 5, 10, 25, 75, 200].forEach((lat) => {
      const x = mapX(lat);
      paretoCtx.beginPath();
      paretoCtx.moveTo(x, pad.top);
      paretoCtx.lineTo(x, pad.top + plotH);
      paretoCtx.stroke();
      paretoCtx.fillText(`${lat}ms`, x - 12, h - 18);
    });

    // Edge Real-Time Zone (< 10ms)
    const tenMsX = mapX(10);
    paretoCtx.fillStyle = "rgba(0, 229, 255, 0.05)";
    paretoCtx.fillRect(pad.left, pad.top, tenMsX - pad.left, plotH);
    paretoCtx.fillStyle = "rgba(0, 229, 255, 0.65)";
    paretoCtx.font = "700 10px monospace";
    paretoCtx.fillText("REAL-TIME EDGE ZONE (<10ms)", pad.left + 8, pad.top + 16);

    // Pareto Curve connecting Teacher -> Distil-HuBERT -> TinyConformer -> EdgeGRU
    const frontierOrder = rows
      .filter((r) => r.role !== "baseline" && r.role !== "mid")
      .sort((a, b) => a.latency - b.latency);

    paretoCtx.strokeStyle = "rgba(168,85,247,0.6)";
    paretoCtx.setLineDash([5, 4]);
    paretoCtx.lineWidth = 1.6;
    paretoCtx.beginPath();
    frontierOrder.forEach((pt, idx) => {
      const px = mapX(pt.latency);
      const py = mapY(pt.uar);
      if (idx === 0) paretoCtx.moveTo(px, py);
      else paretoCtx.lineTo(px, py);
    });
    paretoCtx.stroke();
    paretoCtx.setLineDash([]);

    // Plot points
    rows.forEach((r) => {
      const x = mapX(r.latency);
      const y = mapY(r.uar);
      const color =
        r.role === "teacher" ? "#ff7a33" : r.role === "hero" ? "#00e5ff" : r.role === "baseline" ? "#64748b" : "#a855f7";

      paretoCtx.beginPath();
      paretoCtx.arc(x, y, r.role === "hero" ? 6.5 : 5, 0, Math.PI * 2);
      paretoCtx.fillStyle = color;
      paretoCtx.fill();
      paretoCtx.strokeStyle = "#070b14";
      paretoCtx.lineWidth = 1.5;
      paretoCtx.stroke();

      paretoCtx.fillStyle = "#e2e8f0";
      paretoCtx.font = "10px sans-serif";
      let labelOffset = x > w - 150 ? -115 : 9;
      let yOffset = -8;
      if (r.model.includes("INT8")) {
        yOffset = 14;
      } else if (r.model.includes("No KD")) {
        yOffset = 15;
      } else if (r.model.includes("EdgeGRU")) {
        yOffset = -10;
      }
      paretoCtx.fillText(r.model, x + labelOffset, y + yOffset);
    });
  }

  if (datasetFilter) {
    datasetFilter.addEventListener("change", () => renderBenchmarks(datasetFilter.value));
  }
  renderBenchmarks("iemocap");

  if (copyCodeBtn && pytorchSnippet) {
    copyCodeBtn.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(pytorchSnippet.textContent);
        copyCodeBtn.textContent = "Copied!";
        setTimeout(() => (copyCodeBtn.textContent = "Copy Snippet"), 1600);
      } catch {
        copyCodeBtn.textContent = "Select & Copy";
      }
    });
  }
})();
