// Core scientific & architectural datasets for Voice-to-Edge SER Knowledge Distillation

window.SER_DATA = {
  emotions: ["Angry", "Happy", "Sad", "Neutral", "Fearful"],

  // Raw logits from a fine-tuned WavLM-Large teacher for different ambiguous speech samples
  utteranceLogits: {
    angry_tense: {
      label: "High-Arousal Tense Utterance",
      logits: [3.4, 0.3, -1.2, -0.5, 2.2],
      insight: "Notice how Fearful shares high arousal with Angry. Increasing τ reveals this acoustic correlation to the student instead of forcing a brittle 100% Angry target."
    },
    happy_excited: {
      label: "Bright Expressive Utterance",
      logits: [0.6, 3.3, -1.6, 0.9, -0.4],
      insight: "High pitch F0 and energy create secondary probability mass on Neutral and Angry; soft targets prevent the student from collapsing bright voices."
    },
    sad_subdued: {
      label: "Low-Energy Subdued Utterance",
      logits: [-1.8, -1.4, 3.1, 2.1, 0.4],
      insight: "Sad and Neutral share low vocal energy and slower articulation. Dark knowledge preserves the delicate acoustic boundary between calm and melancholic speech."
    },
    sarcastic_mixed: {
      label: "Mixed Prosody Utterance",
      logits: [2.1, 1.8, 0.2, 1.5, -0.6],
      insight: "High-entropy utterances carry maximum dark knowledge—softened KL loss teaches the compact student nuanced emotional uncertainty."
    }
  },

  studentProfiles: {
    tinyconformer: {
      name: "TinyConformer-KD",
      paramsM: 1.8,
      fp32MB: 7.2,
      int8MB: 1.9,
      latencyMs: 4.2,
      baseNoKdUar: 68.9,
      peakKdUar: 73.8,
      optimalTau: 4.0
    },
    mobilenet: {
      name: "MobileNetV3-Spectro",
      paramsM: 2.4,
      fp32MB: 9.6,
      int8MB: 2.5,
      latencyMs: 5.6,
      baseNoKdUar: 67.4,
      peakKdUar: 72.5,
      optimalTau: 4.5
    },
    distilhubert: {
      name: "Distil-HuBERT-SER",
      paramsM: 23.0,
      fp32MB: 92.0,
      int8MB: 24.0,
      latencyMs: 19.4,
      baseNoKdUar: 71.8,
      peakKdUar: 75.6,
      optimalTau: 3.5
    },
    edgegru: {
      name: "EdgeGRU-Lite INT8",
      paramsM: 0.45,
      fp32MB: 1.8,
      int8MB: 0.5,
      latencyMs: 1.8,
      baseNoKdUar: 62.1,
      peakKdUar: 68.4,
      optimalTau: 5.5
    }
  },

  // Acoustic synthesis + model prediction profiles for the Web Audio Sandbox
  acousticPresets: {
    angry: {
      name: "Angry",
      baseF0: 248,
      f0Swing: 62,
      vibratoHz: 9.5,
      energyDb: "-11.4 dB",
      centroidHz: "2,180 Hz",
      speechRate: "5.8 syl/s",
      harmonics: [1.0, 0.85, 0.72, 0.55, 0.42],
      teacherProbs: [0.84, 0.05, 0.01, 0.02, 0.08],
      studentProbs: [0.81, 0.06, 0.02, 0.03, 0.08],
      nokdProbs: [0.64, 0.14, 0.03, 0.06, 0.13]
    },
    happy: {
      name: "Happy",
      baseF0: 215,
      f0Swing: 55,
      vibratoHz: 6.2,
      energyDb: "-13.1 dB",
      centroidHz: "1,940 Hz",
      speechRate: "5.2 syl/s",
      harmonics: [1.0, 0.76, 0.52, 0.34, 0.18],
      teacherProbs: [0.06, 0.82, 0.01, 0.09, 0.02],
      studentProbs: [0.07, 0.79, 0.02, 0.10, 0.02],
      nokdProbs: [0.16, 0.61, 0.03, 0.15, 0.05]
    },
    sad: {
      name: "Sad",
      baseF0: 122,
      f0Swing: -24,
      vibratoHz: 3.1,
      energyDb: "-24.6 dB",
      centroidHz: "780 Hz",
      speechRate: "2.9 syl/s",
      harmonics: [1.0, 0.42, 0.18, 0.08, 0.03],
      teacherProbs: [0.02, 0.01, 0.80, 0.14, 0.03],
      studentProbs: [0.02, 0.02, 0.77, 0.15, 0.04],
      nokdProbs: [0.04, 0.03, 0.58, 0.29, 0.06]
    },
    neutral: {
      name: "Neutral",
      baseF0: 148,
      f0Swing: 10,
      vibratoHz: 4.0,
      energyDb: "-18.8 dB",
      centroidHz: "1,220 Hz",
      speechRate: "4.1 syl/s",
      harmonics: [1.0, 0.55, 0.28, 0.12, 0.06],
      teacherProbs: [0.03, 0.08, 0.11, 0.76, 0.02],
      studentProbs: [0.04, 0.09, 0.12, 0.73, 0.02],
      nokdProbs: [0.08, 0.14, 0.21, 0.53, 0.04]
    },
    fearful: {
      name: "Fearful",
      baseF0: 268,
      f0Swing: 38,
      vibratoHz: 14.0,
      energyDb: "-15.2 dB",
      centroidHz: "2,410 Hz",
      speechRate: "6.1 syl/s",
      harmonics: [1.0, 0.68, 0.58, 0.44, 0.30],
      teacherProbs: [0.16, 0.04, 0.06, 0.03, 0.71],
      studentProbs: [0.17, 0.05, 0.07, 0.04, 0.67],
      nokdProbs: [0.31, 0.09, 0.10, 0.06, 0.44]
    },
    disgusted: {
      name: "Disgusted",
      baseF0: 135,
      f0Swing: -18,
      vibratoHz: 5.0,
      energyDb: "-19.5 dB",
      centroidHz: "1,040 Hz",
      speechRate: "3.4 syl/s",
      harmonics: [1.0, 0.64, 0.49, 0.22, 0.14],
      teacherProbs: [0.24, 0.03, 0.18, 0.42, 0.13],
      studentProbs: [0.25, 0.04, 0.19, 0.39, 0.13],
      nokdProbs: [0.36, 0.09, 0.22, 0.24, 0.09]
    }
  },

  layerStrategies: {
    prosody: {
      title: "Prosody-Weighted Attention & Hidden Transfer",
      desc: "Assigns higher distillation weights to early acoustic-prosodic layers (Layers 3–8: F0, energy, speaking rate) and late affective-semantic layers (Layers 18–24: emotional valence & intent), yielding +3.1% UAR over uniform skip mapping.",
      connections: [
        { teacher: 3, student: 0, weight: 0.92 },
        { teacher: 9, student: 1, weight: 0.78 },
        { teacher: 16, student: 2, weight: 0.88 },
        { teacher: 23, student: 3, weight: 0.98 }
      ],
      stages: [
        ["Student Block 1", "Captures frame energy, pitch F0 & spectral tilt from Teacher L4"],
        ["Student Block 2", "Aligns phonetic & formant transitions from Teacher L10"],
        ["Student Block 3", "Transfers suprasegmental prosody & rhythm from Teacher L17"],
        ["Student Block 4", "Distills utterance-level emotional manifold from Teacher L24"]
      ]
    },
    uniform: {
      title: "Uniform Skip Mapping (6:1 Stride)",
      desc: "Maps every 6th Teacher Transformer layer (L6, L12, L18, L24) directly to Student Blocks 1–4. Simple and effective, though slightly under-samples early raw acoustic cues.",
      connections: [
        { teacher: 5, student: 0, weight: 0.75 },
        { teacher: 11, student: 1, weight: 0.75 },
        { teacher: 17, student: 2, weight: 0.75 },
        { teacher: 23, student: 3, weight: 0.85 }
      ],
      stages: [
        ["Student Block 1", "Matches Teacher L6 intermediate acoustic states"],
        ["Student Block 2", "Matches Teacher L12 mid-level phonetic context"],
        ["Student Block 3", "Matches Teacher L18 contextualized prosody"],
        ["Student Block 4", "Matches Teacher L24 final classification representation"]
      ]
    },
    lastk: {
      title: "Top-Layer Semantic Only (L21–L24)",
      desc: "Aligns only the final four teacher layers. Preserves high-level emotion boundaries on clean studio speech, but degrades more rapidly under background edge noise.",
      connections: [
        { teacher: 20, student: 0, weight: 0.55 },
        { teacher: 21, student: 1, weight: 0.65 },
        { teacher: 22, student: 2, weight: 0.80 },
        { teacher: 23, student: 3, weight: 0.95 }
      ],
      stages: [
        ["Student Block 1", "Receives late semantic features from Teacher L21 (misses early F0)"],
        ["Student Block 2", "Aligns high-level utterance context from Teacher L22"],
        ["Student Block 3", "Transfers emotional valence projections from Teacher L23"],
        ["Student Block 4", "Distills final logit-adjacent embeddings from Teacher L24"]
      ]
    }
  },

  benchmarks: {
    iemocap: [
      { model: "WavLM-Large (Teacher)", method: "Full SOTA Teacher", params: "316M", size: "1,264 MB", latency: 185, uar: 76.5, role: "teacher" },
      { model: "HuBERT-Base", method: "Fine-Tuned", params: "95M", size: "380 MB", latency: 68, uar: 72.1, role: "mid" },
      { model: "Distil-HuBERT-SER", method: "Layer + Logit KD", params: "23M", size: "92 MB", latency: 19.4, uar: 75.6, role: "student" },
      { model: "TinyConformer-KD", method: "Prosody + RKD", params: "1.8M", size: "7.2 MB", latency: 4.2, uar: 73.8, role: "hero" },
      { model: "TinyConformer (INT8)", method: "KD + INT8 Quant", params: "1.8M", size: "1.9 MB", latency: 2.6, uar: 73.1, role: "hero" },
      { model: "EdgeGRU-Lite", method: "Logit KD + INT8", params: "0.45M", size: "0.5 MB", latency: 1.8, uar: 68.4, role: "student" },
      { model: "TinyConformer (No KD)", method: "Supervised Only", params: "1.8M", size: "7.2 MB", latency: 4.2, uar: 68.9, role: "baseline" }
    ],
    ravdess: [
      { model: "WavLM-Large (Teacher)", method: "Full SOTA Teacher", params: "316M", size: "1,264 MB", latency: 185, uar: 84.2, role: "teacher" },
      { model: "HuBERT-Base", method: "Fine-Tuned", params: "95M", size: "380 MB", latency: 68, uar: 79.8, role: "mid" },
      { model: "Distil-HuBERT-SER", method: "Layer + Logit KD", params: "23M", size: "92 MB", latency: 19.4, uar: 82.9, role: "student" },
      { model: "TinyConformer-KD", method: "Prosody + RKD", params: "1.8M", size: "7.2 MB", latency: 4.2, uar: 81.4, role: "hero" },
      { model: "TinyConformer (INT8)", method: "KD + INT8 Quant", params: "1.8M", size: "1.9 MB", latency: 2.6, uar: 80.7, role: "hero" },
      { model: "EdgeGRU-Lite", method: "Logit KD + INT8", params: "0.45M", size: "0.5 MB", latency: 1.8, uar: 75.3, role: "student" },
      { model: "TinyConformer (No KD)", method: "Supervised Only", params: "1.8M", size: "7.2 MB", latency: 4.2, uar: 74.9, role: "baseline" }
    ],
    cremad: [
      { model: "WavLM-Large (Teacher)", method: "Full SOTA Teacher", params: "316M", size: "1,264 MB", latency: 185, uar: 78.9, role: "teacher" },
      { model: "HuBERT-Base", method: "Fine-Tuned", params: "95M", size: "380 MB", latency: 68, uar: 74.6, role: "mid" },
      { model: "Distil-HuBERT-SER", method: "Layer + Logit KD", params: "23M", size: "92 MB", latency: 19.4, uar: 77.4, role: "student" },
      { model: "TinyConformer-KD", method: "Prosody + RKD", params: "1.8M", size: "7.2 MB", latency: 4.2, uar: 76.1, role: "hero" },
      { model: "TinyConformer (INT8)", method: "KD + INT8 Quant", params: "1.8M", size: "1.9 MB", latency: 2.6, uar: 75.5, role: "hero" },
      { model: "EdgeGRU-Lite", method: "Logit KD + INT8", params: "0.45M", size: "0.5 MB", latency: 1.8, uar: 70.8, role: "student" },
      { model: "TinyConformer (No KD)", method: "Supervised Only", params: "1.8M", size: "7.2 MB", latency: 4.2, uar: 70.2, role: "baseline" }
    ]
  }
};
