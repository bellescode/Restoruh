/* ============================================================
   FILE: app/data/wellnessGuideData.js
   Symptom tiles, keyword map, and scoring engine for the
   "How Are You Feeling" wellness guide.
   No AI dependency -- pure keyword matching and scoring.
   ============================================================ */

/* ---- SYMPTOM TILES ----------------------------------------
   Shown as selectable cards. Each tile maps to one or more
   internal symptom IDs that drive herb/area recommendations.
   ------------------------------------------------------------ */
export const SYMPTOM_TILES = [
  { id: "fatigue",      icon: "😴", label: "Tired and low energy",           sub: "Constant fatigue, sluggishness, crashing" },
  { id: "digestive",    icon: "🫃", label: "Digestive issues",               sub: "Bloating, gas, constipation, irregular gut" },
  { id: "skin",         icon: "✨", label: "Skin or hair concerns",          sub: "Rashes, eczema, acne, hair thinning" },
  { id: "swelling",     icon: "💧", label: "Swelling or fluid retention",    sub: "Puffy legs, ankles, face, or hands" },
  { id: "inflammation", icon: "🔥", label: "Pain or inflammation",           sub: "Joint pain, muscle aches, stiffness" },
  { id: "hormonal",     icon: "🌙", label: "Hormonal or cycle issues",       sub: "PMS, irregular periods, fibroids, PCOS" },
  { id: "mood",         icon: "🧠", label: "Mood, anxiety, or brain fog",    sub: "Stress, low mood, poor concentration" },
  { id: "sleep",        icon: "🌙", label: "Sleep problems",                  sub: "Insomnia, waking up at night, poor rest" },
  { id: "immunity",     icon: "🛡️", label: "Frequent illness or low immunity", sub: "Always getting sick, slow recovery" },
  { id: "detox",        icon: "🍃", label: "Detox or liver support",         sub: "Feeling toxic, sluggish liver, skin issues" },
  { id: "hair-loss",    icon: "💆", label: "Hair loss or thinning",          sub: "Excessive shedding, thinning at scalp" },
  { id: "respiratory",  icon: "🌬️", label: "Breathing or congestion",        sub: "Coughs, sinus issues, shortness of breath" },
  { id: "oral-health",  icon: "🦷", label: "Dental or oral health",          sub: "Gum issues, bad breath, tooth sensitivity" },
  { id: "nutrition",    icon: "🌾", label: "Nutritional gaps",               sub: "Cravings, deficiencies, poor diet" },
  { id: "urinary",      icon: "💦", label: "Urinary health",                 sub: "Frequent UTIs, bladder discomfort" },
];

/* ---- KEYWORD DETECTION MAP --------------------------------
   Maps free-text keywords to symptom tile IDs.
   Used when user types instead of clicking tiles.
   ------------------------------------------------------------ */
export const KEYWORD_MAP = {
  // Fatigue
  tired: "fatigue", exhausted: "fatigue", fatigued: "fatigue", "low energy": "fatigue",
  sluggish: "fatigue", lethargic: "fatigue", "no energy": "fatigue", drained: "fatigue",
  weak: "fatigue", crash: "fatigue",
  // Digestive
  bloat: "digestive", bloating: "digestive", gas: "digestive", constipat: "digestive",
  diarrhea: "digestive", ibs: "digestive", stomach: "digestive", gut: "digestive",
  digest: "digestive", nausea: "digestive", reflux: "digestive", heartburn: "digestive",
  indigestion: "digestive", cramps: "digestive",
  // Skin
  skin: "skin", rash: "skin", eczema: "skin", acne: "skin", breakout: "skin",
  psoriasis: "skin", hives: "skin", itchy: "skin", dry: "skin",
  // Swelling
  swelling: "swelling", swollen: "swelling", puffy: "swelling", edema: "swelling",
  "fluid retention": "swelling", "water retention": "swelling", "leg swelling": "swelling",
  ankles: "swelling", puffiness: "swelling",
  // Inflammation
  inflamm: "inflammation", pain: "inflammation", joint: "inflammation", ache: "inflammation",
  arthritis: "inflammation", stiff: "inflammation", sore: "inflammation", tender: "inflammation",
  // Hormonal
  hormone: "hormonal", hormonal: "hormonal", period: "hormonal", cycle: "hormonal",
  pms: "hormonal", fibroid: "hormonal", fibroids: "hormonal", pcos: "hormonal",
  menstrual: "hormonal", menopause: "hormonal", "hot flash": "hormonal", fertility: "hormonal",
  // Mood
  anxiety: "mood", anxious: "mood", stress: "mood", depressed: "mood", depression: "mood",
  mood: "mood", "brain fog": "mood", fog: "mood", focus: "mood", concentrate: "mood",
  panic: "mood", overwhelm: "mood", irritable: "mood",
  // Sleep
  sleep: "sleep", insomnia: "sleep", "can't sleep": "sleep", waking: "sleep",
  "wake up": "sleep", restless: "sleep", "3am": "sleep", "2am": "sleep",
  // Immunity
  immune: "immunity", sick: "immunity", illness: "immunity", cold: "immunity",
  flu: "immunity", infection: "immunity", virus: "immunity", immune: "immunity",
  // Detox
  detox: "detox", cleanse: "detox", liver: "detox", toxin: "detox",
  toxic: "detox", cleansing: "detox", parasit: "detox",
  // Hair
  hair: "hair-loss", thinning: "hair-loss", shedding: "hair-loss", bald: "hair-loss",
  "hair loss": "hair-loss",
  // Respiratory
  cough: "respiratory", congestion: "respiratory", sinus: "respiratory",
  breathing: "respiratory", breath: "respiratory", mucus: "respiratory",
  // Oral
  teeth: "oral-health", gum: "oral-health", dental: "oral-health",
  "bad breath": "oral-health", halitosis: "oral-health", cavity: "oral-health",
  // Nutrition
  craving: "nutrition", deficien: "nutrition", vitamin: "nutrition", mineral: "nutrition",
  // Urinary
  uti: "urinary", bladder: "urinary", urinary: "urinary", "frequent urination": "urinary",
};

/* ---- RESULT MAP -------------------------------------------
   Maps symptom tile IDs to recommended areas, herbs, and
   contextual notes. Drives the results page.
   ------------------------------------------------------------ */
export const RESULT_MAP = {
  fatigue: {
    headline: "Energy and vitality support",
    why: "Fatigue almost always has a root -- poor sleep, nutritional gaps, adrenal stress, or a gut that is not absorbing what you eat. These areas and herbs address the most common roots.",
    areas: ["energy", "nutrition", "gut"],
    herbs: ["ashwagandha", "rhodiola", "nettle", "moringa", "oats", "ginger"],
    startHere: "Start with moringa or nettle tea daily for two weeks. These are the most nutrient-dense pantry-accessible options and address the most common root of fatigue -- mineral and B vitamin deficiency.",
    urgency: null,
  },
  digestive: {
    headline: "Gut healing and digestive support",
    why: "The gut is the root of most chronic conditions. Healing it changes everything downstream -- energy, immunity, mood, skin, and hormonal balance.",
    areas: ["gut", "nutrition"],
    herbs: ["ginger", "peppermint", "slippery-elm", "chamomile", "fennel", "marshmallow"],
    startHere: "Start with ginger and chamomile tea after each meal. Both are in most pantries and immediately calm digestive inflammation.",
    urgency: null,
  },
  skin: {
    headline: "Skin and hair from the inside",
    why: "Skin and hair reflect what is happening inside. Persistent skin issues almost always connect back to the gut, liver, or nutritional gaps. Topicals can help but they do not fix the root.",
    areas: ["gut", "inflammation", "nutrition"],
    herbs: ["burdock", "nettle", "calendula", "milk-thistle", "dandelion", "elderberry"],
    startHere: "Begin with nettle tea (iron and zinc for skin and hair) and dandelion root tea (liver support). Both are grocery store accessible.",
    urgency: null,
  },
  swelling: {
    headline: "Inflammation and lymphatic support",
    why: "Leg and body swelling is the body signaling stalled fluid and inflammation. The gut-inflammation connection is almost always involved. Diet, movement, and specific herbs address this at the root.",
    areas: ["inflammation", "gut", "detox"],
    herbs: ["dandelion", "nettle", "ginkgo", "garlic", "turmeric", "milk-thistle"],
    startHere: "Dandelion tea is a gentle diuretic that reduces fluid retention. Pair with turmeric and black pepper daily. Both are grocery store accessible and address gut-driven inflammation.",
    urgency: "If swelling is sudden, severe, or in one leg only -- please see a provider. Sudden swelling can indicate a blood clot or kidney issue that needs immediate attention.",
    faithNote: "Yahweh Rapha created the dandelion in almost every yard. It is not a weed -- it is medicine hiding in plain sight.",
  },
  inflammation: {
    headline: "Calming systemic inflammation",
    why: "Chronic low-grade inflammation underlies most modern disease. It starts in the gut and spreads. Diet, sleep, and anti-inflammatory botanicals address it from multiple angles.",
    areas: ["inflammation", "gut", "nutrition"],
    herbs: ["turmeric", "ginger", "boswellia", "rosemary", "green-tea", "devils-claw"],
    startHere: "Turmeric with black pepper, every day. This combination is one of the most studied anti-inflammatory tools available. Add ginger tea.",
    urgency: null,
  },
  hormonal: {
    headline: "Hormonal balance and reproductive support",
    why: "Fibroids, PCOS, irregular cycles, and PMS all connect to the same root: estrogen dominance, inflammation, and gut dysbiosis. Healing the gut reduces the hormonal load the liver has to clear.",
    areas: ["inflammation", "nutrition", "gut"],
    herbs: ["chaste-tree", "turmeric", "milk-thistle", "dandelion", "nettle", "ashwagandha"],
    startHere: "Milk thistle and dandelion for liver support (the liver clears excess estrogen). Turmeric for inflammation. Nettle for iron and mineral support. All grocery or health store accessible.",
    urgency: "Fibroids and PCOS benefit from monitoring. Do not stop seeing your provider. Herbs support, they do not replace medical evaluation.",
    faithNote: "Your body was fearfully and wonderfully made. These symptoms are signals, not a life sentence.",
  },
  mood: {
    headline: "Nervous system and mental resilience",
    why: "Mood, anxiety, and brain fog are often rooted in gut dysbiosis (the gut-brain axis), nutritional deficiencies (magnesium, B vitamins, omega 3), and chronic stress loading the adrenals.",
    areas: ["mindset", "gut", "nutrition"],
    herbs: ["ashwagandha", "lemon-balm", "lavender", "passionflower", "tulsi", "oats"],
    startHere: "Lemon balm tea in the morning. Chamomile or passionflower in the evening. Both are grocery store accessible and have genuine clinical evidence for anxiety reduction.",
    urgency: null,
    faithNote: "Philippians 4:6-7 -- prayer and thanksgiving guard the heart and mind with a peace that surpasses understanding. The herbs support the body while the Word guards the spirit.",
  },
  sleep: {
    headline: "Restful sleep and nervous system calm",
    why: "Poor sleep drives almost every chronic health issue. The body heals during sleep. Nervine herbs calm the nervous system at bedtime without dependency.",
    areas: ["mindset", "nutrition"],
    herbs: ["valerian", "passionflower", "lavender", "chamomile", "oats", "lemon-balm"],
    startHere: "Chamomile and passionflower tea 30 to 45 minutes before bed. Start here before adding stronger nervines. Both are grocery store accessible.",
    urgency: null,
  },
  immunity: {
    headline: "Immune system strengthening",
    why: "A strong immune system is built in the gut (70% of immune tissue lives there) and maintained through consistent nutrition and targeted botanicals -- not emergency measures when illness arrives.",
    areas: ["gut", "nutrition", "inflammation"],
    herbs: ["elderberry", "echinacea", "garlic", "astragalus", "thyme", "ginger"],
    startHere: "Garlic is the most accessible and most studied broad-spectrum immune herb available. One raw clove daily or as food is genuinely powerful.",
    faithNote: "Exodus 15:26 -- I am the Lord who heals you. Garlic was part of the Egyptian diet that sustained Israel before the exodus. God hid medicine in the most common places.",
  },
  detox: {
    headline: "Liver support and gentle cleansing",
    why: "The liver processes everything you eat, breathe, and absorb. When it is sluggish, toxins recirculate and symptoms appear systemically. Support the liver before aggressive cleansing.",
    areas: ["detox", "gut", "nutrition"],
    herbs: ["milk-thistle", "dandelion", "burdock", "ginger", "garlic", "clove"],
    startHere: "Dandelion root tea (roasted) before meals. Milk thistle seed, cracked not powdered. Both are grocery or health store accessible. Do NOT begin a parasite cleanse before supporting the liver.",
    urgency: null,
  },
  "hair-loss": {
    headline: "Hair and scalp support",
    why: "Hair loss is almost always a nutritional or hormonal signal -- iron deficiency, zinc deficiency, thyroid issues, or chronic stress. The gut must absorb nutrients for any supplement to work.",
    areas: ["nutrition", "gut", "inflammation"],
    herbs: ["nettle", "moringa", "horsetail", "ashwagandha", "dandelion"],
    startHere: "Nettle tea and moringa daily. These are the highest food-form sources of iron, zinc, and silica -- the three nutrients most tied to hair growth and retention.",
    urgency: null,
  },
  respiratory: {
    headline: "Respiratory and breathing support",
    why: "Respiratory conditions often involve both the mucous membranes and the immune system. Anti-inflammatory and expectorant herbs clear the airway and reduce recurrence.",
    areas: ["inflammation", "immunity"],
    herbs: ["thyme", "mullein", "elecampane", "garlic", "ginger", "slippery-elm"],
    startHere: "Fresh thyme steeped in hot water with honey and lemon. Thyme has genuine clinical evidence for cough and respiratory infection. It is in every grocery store.",
    urgency: null,
  },
  "oral-health": {
    headline: "Oral health and gut microbiome connection",
    why: "Oral health is gut health. What lives in your mouth seeds your gut with every swallow. Periodontal bacteria have been found in arthritis joints and Alzheimer's plaques.",
    areas: ["gut", "inflammation"],
    herbs: ["myrrh", "clove", "peppermint", "neem", "chamomile", "garlic"],
    startHere: "Oil pulling with coconut oil (1 tablespoon, 10 to 20 minutes) reduces Streptococcus mutans comparable to commercial mouthwash. Start here.",
    urgency: null,
  },
  nutrition: {
    headline: "Nutritional foundation and deficiency support",
    why: "Most chronic symptoms trace back to deficiency. The gut must be healed before supplements absorb properly. Start with food, then add targeted herbs.",
    areas: ["nutrition", "gut"],
    herbs: ["moringa", "nettle", "spirulina", "ginger", "turmeric", "dandelion"],
    startHere: "Moringa powder in a smoothie or warm water daily. The broadest nutritional profile available in a plant form. Grocery store or health food store.",
    urgency: null,
  },
  urinary: {
    headline: "Urinary tract and bladder support",
    why: "Recurrent UTIs indicate the bladder's natural defenses are compromised. Soothing and antiseptic herbs address both the acute issue and the tendency to recur.",
    areas: ["gut", "inflammation"],
    herbs: ["cranberry", "cornsilk", "marshmallow", "dandelion", "echinacea", "garlic"],
    startHere: "Unsweetened cranberry juice or cranberry supplement with plenty of water. Cornsilk tea for soothing. Both are grocery store accessible.",
    urgency: "Seek immediate care for a UTI with fever, back pain, or blood in urine. These indicate kidney involvement.",
  },
};

/* ---- FOLLOW-UP QUESTIONS ----------------------------------
   Shown after tile selection. Quick 3-4 questions that
   refine the recommendation (like the user asked their friend).
   ------------------------------------------------------------ */
export const FOLLOW_UP_QUESTIONS = [
  {
    id: "isWoman",
    question: "Are you a woman?",
    options: [
      { value: "yes",  label: "Yes" },
      { value: "no",   label: "No" },
    ],
  },
  {
    id: "pregnantNursing",
    question: "Are you currently pregnant or nursing?",
    options: [
      { value: "yes",  label: "Yes" },
      { value: "no",   label: "No" },
    ],
    showIf: (answers) => answers.isWoman === "yes",
  },
  {
    id: "diet",
    question: "How is your diet primarily?",
    options: [
      { value: "processed", label: "Mostly processed foods" },
      { value: "mixed",     label: "A mix of both" },
      { value: "whole",     label: "Mostly whole foods" },
    ],
  },
  {
    id: "water",
    question: "How is your water intake?",
    options: [
      { value: "poor",     label: "Poor (less than 4 glasses)" },
      { value: "moderate", label: "Moderate (4 to 6 glasses)" },
      { value: "good",     label: "Good (8 or more glasses)" },
    ],
  },
  {
    id: "stress",
    question: "How is your stress level right now?",
    options: [
      { value: "high",   label: "High -- very stressed" },
      { value: "medium", label: "Moderate" },
      { value: "low",    label: "Low -- pretty calm" },
    ],
  },
];

/* ---- SCORE ENGINE -----------------------------------------
   Takes selected symptom IDs and follow-up answers and
   returns ranked areas and herbs.
   ------------------------------------------------------------ */
export function scoreResults(symptomIds, answers = {}) {
  const areaScore  = {};
  const herbScore  = {};
  const notes      = [];
  const urgencies  = [];

  symptomIds.forEach((sid) => {
    const r = RESULT_MAP[sid];
    if (!r) return;

    r.areas.forEach((a, i) => {
      areaScore[a] = (areaScore[a] || 0) + (3 - i);
    });
    r.herbs.forEach((h, i) => {
      herbScore[h] = (herbScore[h] || 0) + (6 - i);
    });
    if (r.urgency)   urgencies.push(r.urgency);
    if (r.faithNote) notes.push(r.faithNote);
  });

  /* Adjust for diet/water/stress */
  if (answers.diet === "processed") {
    areaScore["gut"] = (areaScore["gut"] || 0) + 3;
    areaScore["nutrition"] = (areaScore["nutrition"] || 0) + 2;
    herbScore["ginger"]    = (herbScore["ginger"] || 0) + 2;
    herbScore["dandelion"] = (herbScore["dandelion"] || 0) + 2;
  }
  if (answers.water === "poor") {
    areaScore["detox"] = (areaScore["detox"] || 0) + 2;
    herbScore["dandelion"] = (herbScore["dandelion"] || 0) + 2;
  }
  if (answers.stress === "high") {
    areaScore["mindset"]  = (areaScore["mindset"] || 0) + 3;
    herbScore["ashwagandha"] = (herbScore["ashwagandha"] || 0) + 3;
    herbScore["tulsi"]       = (herbScore["tulsi"] || 0) + 2;
  }

  /* Pregnancy/nursing -- add urgent note */
  if (answers.pregnantNursing === "yes") {
    urgencies.unshift("Because you are pregnant or nursing, please confirm any herb with your provider before use. Many herbs that are safe in general are not appropriate during pregnancy or nursing.");
  }

  const topAreas = Object.entries(areaScore)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([id]) => id);

  const topHerbs = Object.entries(herbScore)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6)
    .map(([id]) => id);

  /* Start-here from top symptom */
  const topSymptom = symptomIds[0];
  const startHere  = RESULT_MAP[topSymptom]?.startHere || null;
  const headline   = symptomIds.length === 1
    ? RESULT_MAP[topSymptom]?.headline
    : "Your personalized wellness pathway";

  return { topAreas, topHerbs, startHere, headline, urgencies, faithNotes: notes };
}

/* ---- KEYWORD DETECTOR -------------------------------------
   Takes a free-text string and returns matched symptom IDs.
   ------------------------------------------------------------ */
export function detectKeywords(text) {
  const lower   = text.toLowerCase();
  const matched = new Set();
  Object.entries(KEYWORD_MAP).forEach(([kw, symptomId]) => {
    if (lower.includes(kw)) matched.add(symptomId);
  });
  return [...matched];
}
