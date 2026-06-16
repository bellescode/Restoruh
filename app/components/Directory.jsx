import React, { useState, useEffect, useMemo } from "react";
import {
  Leaf, Search, Heart, ArrowLeft, ChevronRight, ShieldAlert, Sparkles, BookOpen,
  X, Flame, Droplets, Salad, Activity, Brain, HandHeart, Compass, ClipboardList,
  Info, Users, Sprout, Sun, CalendarDays, CalendarRange, Check, RotateCcw, Baby,
  Scale, Wind, Bone, Dumbbell, Wheat, Bug, Stethoscope, HeartPulse, Shield, Soup,
  LogOut, UserCircle, Mail, User,
} from "lucide-react";

/* ================================================================
   RESTORUH  -  Wellness Research Directory
   "I am the Lord who heals you."  Exodus 15:26
   Educational only. Not medical advice.
   ================================================================ */

const EVID = {
  supported:   { label:"Supported by research", tone:"#3f7d4f" },
  emerging:    { label:"Emerging research",     tone:"#b9892f" },
  traditional: { label:"Traditional use",       tone:"#8a8170" },
};

/* ---- AREAS ---------------------------------------------------- */
const AREAS = [
  { id:"gut", icon:Salad, short:"Gut and Digestive Health",
    title:"Approaches to supporting gut health and digestive wellness",
    blurb:"The gut shapes immunity, mood, and energy. Food first, with gentle herbs for comfort and regularity.",
    approaches:["Prioritize fiber, fermented foods, and water to feed a diverse microbiome.","Eat slowly and chew well, the first step of digestion.","Use soothing demulcent herbs for irritation and carminatives for gas.","Find personal trigger foods through calm elimination and reintroduction."],
    foods:["Sauerkraut and kimchi","Plain yogurt or kefir","Cooked greens","Bone broth","Ginger and fennel","Oats and ground flax"],
    faith:"Daniel 1 records young men who thrived on simple food and water, a reminder that nourishment and discipline go together.",
    herbs:["peppermint","ginger","fennel","slippery-elm","marshmallow","chamomile","dgl-licorice","gentian"]},
  { id:"nutrition", icon:Wheat, short:"Nutrition and Whole Foods",
    title:"The role nutrition and food choices play in overall well-being",
    blurb:"Food as foundation. Whole, recognizable foods and a return to original grains rather than ultra processed products.",
    approaches:["Build meals around whole foods: plants, quality proteins, and healthy fats.","Cut processed sugar and ultra processed foods, the biggest driver of modern imbalance.","Return to original grains (einkorn, spelt, sprouted, sourdough) prepared the old way.","Eat the rainbow and give thanks at the table."],
    foods:["Leafy greens","Berries","Wild caught fish","Lentils and beans","Olive oil","Nuts and seeds"],
    faith:"Genesis 1:29 frames seed bearing plants and fruit as provision, an invitation to eat close to how things were given.",
    herbs:["moringa","nettle","turmeric","spirulina"]},
  { id:"inflammation", icon:Flame, short:"Calming Inflammation",
    title:"Factors that contribute to inflammation and strategies for addressing them",
    blurb:"Chronic low grade inflammation underlies much modern disease. Diet, sleep, stress, and targeted botanicals help calm it.",
    approaches:["Reduce sugar and ultra processed foods; emphasize omega 3 and polyphenol rich foods.","Protect sleep; inflammation rises when rest is short.","Move daily; gentle consistent movement lowers inflammatory markers.","Add anti inflammatory botanicals alongside the basics, not instead of them."],
    foods:["Fatty fish (omega 3)","Turmeric and black pepper","Tart cherries","Green tea","Olive oil","Cruciferous veg"],
    faith:"Rest is woven into creation (Genesis 2:2). Honoring rhythms of rest is one of the body's oldest anti inflammatory tools.",
    herbs:["turmeric","boswellia","ginger","green-tea","rosemary","devils-claw"]},
  { id:"detox", icon:Droplets, short:"Cleansing and Detoxification",
    title:"Perspectives on deworming and detoxification protocols",
    blurb:"An honest look. The body cleanses itself through the liver, kidneys, and gut. Support those organs wisely.",
    approaches:["Support, do not override, the body's own detox organs.","Hydration, fiber, sweat, and cruciferous vegetables are the foundation.","Approach parasite cleansing as a traditional practice, with a binder and proper guidance.","Suspected infection is a medical matter; seek testing before self treating."],
    foods:["Cruciferous veg","Beets","Garlic and onion","Citrus and berries","Leafy greens","Plenty of water"],
    faith:"Stewardship of the body (1 Corinthians 6:19 to 20) means caring for it wisely, which sometimes means restraint, not extremes.",
    herbs:["milk-thistle","dandelion","burdock","wormwood","black-walnut","clove"],
    caution:"Wormwood and black walnut are potent and can be toxic at the doses some online protocols suggest. Education plus professional guidance, never aggressive self dosing, and never for children or in pregnancy. See the Cleansing section for the full picture."},
  { id:"energy", icon:Activity, short:"Energy and Vitality",
    title:"Habits that support energy, vitality, and long term wellness",
    blurb:"Sustainable energy is built, not borrowed. Sleep, movement, sunlight, and herbs that help the body handle stress.",
    approaches:["Anchor the day with consistent sleep and wake times.","Get morning sunlight to set your body clock.","Move your body daily; build strength as you age.","Consider adaptogenic herbs to support resilience to everyday stress."],
    foods:["Complex carbs","Iron rich foods","B vitamin foods","Water and electrolytes","Protein at each meal","Dark leafy greens"],
    faith:"Isaiah 40:31, those who wait on Yahweh renew their strength. Vitality is physical and spiritual at once.",
    herbs:["ashwagandha","rhodiola","ginseng","tulsi","maca","oats"]},
  { id:"mindset", icon:Brain, short:"Mind and Resilience",
    title:"Mindset, faith, and resilience when facing health challenges",
    blurb:"Mind and body are not separate. Calming the nervous system supports healing, and a living faith in the God of the Bible is a deep well of resilience.",
    approaches:["Meditate on the Word of God and spend quiet time in prayer each morning.","Name and process emotions rather than suppressing them.","Build supportive community; isolation worsens almost every outcome.","Consider nervine and calming herbs as gentle support for stress and sleep."],
    foods:["Magnesium rich foods","Omega 3s","Dark chocolate in moderation","Chamomile tea","Fermented foods","Whole grains"],
    faith:"Philippians 4:6 to 7, prayer and thanksgiving guard the heart and mind with a peace that surpasses understanding.",
    herbs:["lemon-balm","lavender","passionflower","tulsi","ashwagandha","skullcap","st-johns-wort"]},
  { id:"spiritual", icon:HandHeart, short:"Walking with Yahweh Rapha",
    title:"Walking with Yahweh Rapha: biblical living, discipline, and covenant health",
    blurb:"Yahweh Rapha means the Lord who heals. Every dimension of wellness finds its foundation in relationship with Him.",
    approaches:["Establish daily scripture and prayer before the day begins.","Keep the Sabbath as a covenant rhythm of rest, not productivity.","Practice gratitude according to Philippians 4:8, think on what is true, noble, right, and pure.","Bring your household's health before Yahweh in prayer; He is the healer."],
    foods:["Simple whole foods","Water and herbal teas","Olive oil and figs","Raw honey","Barley and wheat","Grapes and pomegranate"],
    faith:"Exodus 15:26, I am Yahweh Rapha, the Lord who heals you. This is a covenant promise, not a metaphor.",
    herbs:["frankincense","myrrh","hyssop"]},
  { id:"plan", icon:ClipboardList, short:"Your Family Action Plan",
    title:"How to build a personalized action plan for you and your family",
    blurb:"Turn knowledge into rhythm. A stewardship framework built to last.",
    approaches:["Start with one area that matters most right now.","Follow a week by week research informed protocol, not generic tips.","Track your progress and adjust together as a household.","Loop in your provider, especially for children, pregnancy, or existing conditions."],
    foods:["Plan ahead","Cook together","Stock simple staples","Pre portion snacks","Family water goals","Shared mealtimes"],
    faith:"Joshua 24:15, as for me and my house, we will serve the Lord. Household wellness is a covenant calling.",
    herbs:[], linkPlan:true},
];

/* ---- SYSTEMS -------------------------------------------------- */
const SYSTEMS = [
  { id:"skin",          icon:Shield,     name:"Integumentary (Skin)",  fn:"The body's largest organ. Protects against the outside world, regulates temperature, senses touch, and helps synthesize vitamin D.",                                    herbs:["calendula","comfrey","witch-hazel","chickweed","aloe","burdock","marshmallow"],                                              foods:["Vitamin C foods","Zinc foods (seeds, shellfish)","Omega 3s","Colorful produce","Plenty of water"]},
  { id:"skeletal",      icon:Bone,       name:"Skeletal",              fn:"Gives structure, protects organs, stores minerals, and produces blood cells in the marrow.",                                                                                herbs:["horsetail","nettle","comfrey"],                                                                                              foods:["Leafy greens (calcium, vitamin K)","Sardines","Dairy or fortified plant milk","Nuts and seeds","Sunlight for vitamin D"]},
  { id:"muscular",      icon:Dumbbell,   name:"Muscular",              fn:"Powers movement and posture and produces most of the body's heat.",                                                                                                         herbs:["cramp-bark","arnica","thyme","rosemary","ginger"],                                                                           foods:["Quality protein","Magnesium foods","Potassium (bananas, potatoes)","Water and electrolytes"]},
  { id:"nervous",       icon:Brain,      name:"Nervous",               fn:"Control and communication network. Senses, thinks, directs the body, and runs the calming and alerting responses.",                                                         herbs:["lemon-balm","skullcap","valerian","lavender","passionflower","st-johns-wort","oats","gotu-kola","rosemary"],                  foods:["Omega 3 fish","B vitamin foods","Magnesium (greens, seeds)","Whole grains"]},
  { id:"endocrine",     icon:Sparkles,   name:"Endocrine",             fn:"The body's hormone messengers. Sets metabolism, growth, stress response, blood sugar, and reproduction.",                                                                   herbs:["ashwagandha","chaste-tree","tulsi","maca","dgl-licorice","ginseng"],                                                         foods:["Healthy fats","Iodine (seaweed, seafood)","Selenium (Brazil nuts)","Fiber","Cruciferous veg"]},
  { id:"cardiovascular",icon:HeartPulse, name:"Cardiovascular",        fn:"Heart and blood vessels carry oxygen, nutrients, and warmth to every cell and clear waste.",                                                                                herbs:["hawthorn","garlic","ginkgo","ginger","cayenne","motherwort"],                                                                foods:["Omega 3 fish","Beets","Berries","Leafy greens","Olive oil","Oats and legumes"]},
  { id:"immune",        icon:Shield,     name:"Lymphatic and Immune",  fn:"Defends against infection, clears fluid and waste, and recovers from illness and injury.",                                                                                  herbs:["echinacea","elderberry","garlic","astragalus","calendula","pau-darco","cleavers"],                                           foods:["Vitamin C foods","Zinc foods","Garlic and onion","Mushrooms","Colorful produce","Bone broth"]},
  { id:"respiratory",   icon:Wind,       name:"Respiratory",           fn:"Brings in oxygen and releases carbon dioxide through the airways and lungs.",                                                                                              herbs:["thyme","mullein","elecampane","dgl-licorice","eucalyptus","marshmallow","plantain"],                                         foods:["Vitamin C foods","Anti inflammatory foods","Warm broths","Garlic","Ginger"]},
  { id:"digestive",     icon:Soup,       name:"Digestive",             fn:"Breaks down food, absorbs nutrients, hosts the microbiome, and eliminates waste.",                                                                                         herbs:["ginger","peppermint","fennel","chamomile","slippery-elm","marshmallow","gentian","dandelion","dgl-licorice"],                foods:["Fermented foods","Fiber rich plants","Bitter greens","Bone broth","Ginger and fennel"]},
  { id:"urinary",       icon:Droplets,   name:"Urinary",               fn:"Filters the blood, balances fluids and minerals, and removes waste through the kidneys and bladder.",                                                                      herbs:["cornsilk","buchu","dandelion","marshmallow","cranberry","goldenrod"],                                                        foods:["Plenty of water","Cranberry and bilberry","Parsley","Watermelon and cucumber"]},
  { id:"reproductive",  icon:Heart,      name:"Reproductive",          fn:"Governs fertility and sex hormones in women and men, and supports the body through cycles, pregnancy, and menopause.",                                                     herbs:["chaste-tree","dong-quai","raspberry-leaf","shatavari","saw-palmetto","black-cohosh","nettle"],                               foods:["Healthy fats","Zinc foods","Iron rich foods","Folate (greens, legumes)","Whole foods"]},
];

/* ---- HERBS ---------------------------------------------------- */
const HERBS = [
  {id:"peppermint",    name:"Peppermint",          latin:"Mentha x piperita",         systems:["digestive"],                    ailments:["indigestion","ibs","gas","nausea","headache"],           evidence:"supported",    uses:"Eases indigestion and bloating; enteric coated oil is well studied for IBS by relaxing gut muscle. Also useful for tension headaches applied topically.",                                      actions:["Carminative","Antispasmodic"],                formats:["Tea","Enteric oil capsule","Tincture"],                    who:["adults","women","men"],                       safety:"May worsen reflux. Avoid enteric oil and strong mint in children under 5."},
  {id:"ginger",        name:"Ginger",               latin:"Zingiber officinale",        systems:["digestive","cardiovascular"],   ailments:["nausea","indigestion","inflammation","cold"],            evidence:"supported",    uses:"One of the best studied herbs for nausea (motion, pregnancy, post op) and a warming digestive and circulatory aid.",                                                                        actions:["Anti nausea","Carminative","Anti inflammatory"],formats:["Fresh root","Tea","Capsule"],                             who:["all","children-ok"],                          safety:"High doses may thin blood; check with a provider if on anticoagulants."},
  {id:"fennel",        name:"Fennel",               latin:"Foeniculum vulgare",         systems:["digestive"],                    ailments:["gas","colic","indigestion"],                             evidence:"traditional",  uses:"Traditional after meal seed for gas, bloating, and infant colic.",                                                                                                                     actions:["Carminative"],                                formats:["Seeds","Tea"],                                            who:["all","children-ok"],                          safety:"Generally well tolerated."},
  {id:"slippery-elm",  name:"Slippery Elm",         latin:"Ulmus rubra",                systems:["digestive","respiratory"],      ailments:["indigestion","heartburn","cough","sore-throat"],         evidence:"traditional",  uses:"Mucilage bark that coats and soothes the throat and gut lining. Classic for heartburn and irritated airways.",                                                                         actions:["Demulcent"],                                  formats:["Powder","Lozenge","Tea"],                                 who:["all","children-ok"],                          safety:"Take separately from medicines; it can slow their absorption."},
  {id:"marshmallow",   name:"Marshmallow Root",     latin:"Althaea officinalis",        systems:["digestive","respiratory","urinary","skin"], ailments:["indigestion","cough","cystitis"],           evidence:"traditional",  uses:"Rich soothing mucilage for irritated digestive, respiratory, and urinary linings.",                                                                                                   actions:["Demulcent"],                                  formats:["Cold infusion","Capsule"],                                who:["all","children-ok"],                          safety:"May slow absorption of other medicines; separate dosing."},
  {id:"chamomile",     name:"German Chamomile",     latin:"Matricaria chamomilla",      systems:["digestive","nervous","skin"],   ailments:["indigestion","anxiety","insomnia","eczema","colic"],     evidence:"emerging",     uses:"Calming to gut and nerves; a classic gentle tea for upset stomach and winding down. Good for children's colic.",                                                                       actions:["Antispasmodic","Mild nervine"],                formats:["Tea","Tincture","Cream"],                                 who:["all","children-ok"],                          safety:"Avoid if allergic to ragweed or daisy family."},
  {id:"dgl-licorice",  name:"Licorice (DGL)",       latin:"Glycyrrhiza glabra",         systems:["digestive","respiratory"],      ailments:["indigestion","heartburn","cough"],                       evidence:"emerging",     uses:"Deglycyrrhizinated licorice soothes the stomach lining; whole licorice is a soothing cough expectorant.",                                                                                actions:["Demulcent","Expectorant"],                     formats:["Chewable DGL","Tea","Tincture"],                          who:["adults"],                                     safety:"Whole licorice raises blood pressure and lowers potassium. Avoid in pregnancy. Choose DGL for gut use."},
  {id:"gentian",       name:"Gentian",              latin:"Gentiana lutea",             systems:["digestive"],                    ailments:["indigestion","gas","weak-digestion"],                    evidence:"traditional",  uses:"Intensely bitter root that stimulates digestive secretions, appetite, and bile flow before meals.",                                                                                      actions:["Bitter"],                                     formats:["Tincture"],                                              who:["adults"],                                     safety:"Avoid with acid indigestion or peptic ulcer. Not for children under 5."},
  {id:"moringa",       name:"Moringa",              latin:"Moringa oleifera",           systems:["digestive","endocrine"],        ailments:["nutrition"],                                             evidence:"emerging",     uses:"Nutrient dense leaf rich in vitamins, minerals, and antioxidants. Studied as a nutritional supplement in deficiency contexts.",                                                          actions:["Nutritive","Antioxidant"],                     formats:["Powder","Capsule","Tea"],                                 who:["adults","women","men"],                       safety:"Avoid root and bark in pregnancy. Leaf is generally well tolerated."},
  {id:"spirulina",     name:"Spirulina",            latin:"Arthrospira platensis",      systems:["immune"],                       ailments:["nutrition"],                                             evidence:"emerging",     uses:"Protein and iron rich algae used as a nutritional supplement.",                                                                                                                       actions:["Nutritive","Antioxidant"],                     formats:["Powder","Tablet"],                                       who:["adults"],                                     safety:"Buy tested, contaminant free sources. Avoid in PKU."},
  {id:"nettle",        name:"Stinging Nettle",      latin:"Urtica dioica",              systems:["urinary","skeletal","reproductive"], ailments:["nutrition","allergy","anemia"],                    evidence:"emerging",     uses:"Mineral and iron rich nourishing tonic; used for seasonal histamine support and as a cooked green.",                                                                                   actions:["Nutritive","Mild anti inflammatory"],          formats:["Tea","Capsule","Cooked greens"],                          who:["all","children-ok"],                          safety:"May interact with blood pressure, diuretic, or diabetes medicines."},
  {id:"turmeric",      name:"Turmeric",             latin:"Curcuma longa",              systems:["digestive","muscular"],         ailments:["inflammation","arthritis","nutrition"],                  evidence:"supported",    uses:"Curcumin is among the most studied botanical anti inflammatories. Pair with black pepper for absorption.",                                                                               actions:["Anti inflammatory","Antioxidant"],             formats:["Culinary spice","Standardized extract"],                  who:["all"],                                        safety:"High doses may thin blood and irritate the stomach; caution with gallstones and before surgery."},
  {id:"boswellia",     name:"Boswellia",            latin:"Boswellia serrata",          systems:["muscular","immune"],            ailments:["inflammation","arthritis"],                              evidence:"emerging",     uses:"Resin extract studied for joint comfort and inflammatory balance, particularly for joints.",                                                                                            actions:["Anti inflammatory"],                           formats:["Standardized extract"],                                  who:["adults"],                                     safety:"May interact with some medicines; mild GI upset possible."},
  {id:"green-tea",     name:"Green Tea",            latin:"Camellia sinensis",          systems:["cardiovascular"],               ailments:["inflammation"],                                          evidence:"supported",    uses:"EGCG polyphenols with antioxidant and metabolic benefits; gentle caffeine paired with calming L theanine.",                                                                             actions:["Antioxidant","Gentle stimulant"],              formats:["Tea","Extract"],                                         who:["adults"],                                     safety:"Contains caffeine; prefer brewed tea over high dose extracts."},
  {id:"rosemary",      name:"Rosemary",             latin:"Salvia rosmarinus",          systems:["nervous","muscular"],           ailments:["inflammation","headache","muscle-ache"],                 evidence:"traditional",  uses:"Antioxidant culinary herb with a long history of use for memory, clear thinking, and muscle comfort.",                                                                                 actions:["Antioxidant","Aromatic"],                      formats:["Culinary herb","Tea","Essential oil (external)"],         who:["all"],                                        safety:"Culinary amounts are safe; avoid concentrated oil internally."},
  {id:"devils-claw",   name:"Grapple Plant",         latin:"Harpagophytum procumbens",   systems:["muscular","skeletal"],          ailments:["arthritis","back-pain","inflammation"],                  evidence:"emerging",     uses:"Anti inflammatory root for swollen, inflamed joints and lower back pain.",                                                                                                             actions:["Anti inflammatory"],                           formats:["Tablet","Tincture"],                                     who:["adults"],                                     safety:"Avoid in pregnancy and with peptic ulcer; can affect blood sugar."},
  {id:"milk-thistle",  name:"Milk Thistle",         latin:"Silybum marianum",           systems:["digestive"],                    ailments:["detox","liver"],                                         evidence:"emerging",     uses:"Silymarin is the best studied liver support botanical, with multiple trials showing hepatoprotective effects.",                                                                           actions:["Hepatoprotective","Antioxidant"],              formats:["Standardized extract","Tea"],                            who:["adults"],                                     safety:"Generally well tolerated; may interact with some liver metabolized medicines."},
  {id:"dandelion",     name:"Dandelion",            latin:"Taraxacum officinale",        systems:["digestive","urinary"],          ailments:["detox","indigestion","fluid-retention"],                 evidence:"traditional",  uses:"Bitter leaf and root supporting digestion, bile flow, and gentle fluid balance.",                                                                                                   actions:["Bitter","Mild diuretic"],                      formats:["Tea","Greens","Tincture"],                                who:["all"],                                        safety:"Mild diuretic; caution with diuretic or lithium medicines."},
  {id:"burdock",       name:"Burdock Root",         latin:"Arctium lappa",              systems:["skin","digestive"],             ailments:["detox","skin"],                                          evidence:"traditional",  uses:"Traditional cleansing root and skin support used in both Western and Chinese herbal medicine.",                                                                                     actions:["Alterative","Mild diuretic"],                  formats:["Tea","Cooked root","Tincture"],                           who:["adults"],                                     safety:"Source carefully; burdock is occasionally confused with belladonna root."},
  {id:"wormwood",      name:"Wormwood",             latin:"Artemisia absinthium",        systems:["digestive"],                    ailments:["detox","parasites"],                                     evidence:"traditional",  uses:"Intensely bitter herb used traditionally for digestion and in anti parasitic blends, said to target larval and adult stages.",                                                       actions:["Bitter","Traditional anthelmintic"],           formats:["Tincture (short term, low dose)"],                        who:["adults","pregnancy-avoid","children-caution"],safety:"Contains thujone, neurotoxic in excess. Short term only. Avoid in pregnancy, seizure disorders, and children. Suspected parasites need professional diagnosis."},
  {id:"black-walnut",  name:"Black Walnut Hull",    latin:"Juglans nigra",              systems:["digestive"],                    ailments:["detox","parasites"],                                     evidence:"traditional",  uses:"Traditional anti parasitic herb said to target adult worms; part of the classic cleansing trio.",                                                                                    actions:["Traditional anthelmintic","Astringent"],       formats:["Tincture (short term)"],                                 who:["adults","pregnancy-avoid","children-caution"],safety:"Tree nut allergen. Not for prolonged use or pregnancy. Do not replace medical care for a confirmed infection."},
  {id:"clove",         name:"Clove",                latin:"Syzygium aromaticum",        systems:["digestive"],                    ailments:["detox","parasites","gas"],                               evidence:"traditional",  uses:"Aromatic eugenol rich spice used in digestive and anti parasitic blends, traditionally said to address parasite eggs.",                                                                  actions:["Carminative","Antimicrobial (traditional)"],   formats:["Culinary spice","Tea","Diluted oil (external)"],          who:["all"],                                        safety:"Concentrated clove oil is irritating; dilute well and do not ingest undiluted."},
  {id:"ashwagandha",   name:"Ashwagandha",          latin:"Withania somnifera",         systems:["endocrine","nervous"],          ailments:["stress","insomnia","energy","fertility"],                evidence:"supported",    uses:"A leading adaptogen studied for stress, cortisol balance, sleep quality, and steady energy. Multiple double blind trials show significant cortisol reduction.",                            actions:["Adaptogen","Calming"],                         formats:["Standardized extract","Powder"],                          who:["adults","men","women","pregnancy-avoid"],      safety:"Avoid in pregnancy and with thyroid medicine or autoimmune thyroid issues without guidance. Nightshade family."},
  {id:"rhodiola",      name:"Rhodiola",             latin:"Rhodiola rosea",             systems:["nervous","endocrine"],          ailments:["stress","energy","fatigue"],                             evidence:"emerging",     uses:"Adaptogen studied for mental and physical fatigue and stress resilience; tends to energize rather than sedate.",                                                                          actions:["Adaptogen","Anti fatigue"],                    formats:["Standardized extract"],                                  who:["adults"],                                     safety:"Take earlier in the day; caution with stimulant medicines."},
  {id:"ginseng",       name:"Asian Ginseng",        latin:"Panax ginseng",              systems:["endocrine","nervous"],          ailments:["energy","stress","fertility"],                           evidence:"emerging",     uses:"Classic tonic herb for energy, stamina, and cognitive support, well documented in traditional herbal practice.",                                                                       actions:["Adaptogen","Tonic"],                           formats:["Root","Extract","Tea"],                                   who:["adults","men"],                               safety:"May raise blood pressure and affect blood sugar; many drug interactions. Avoid caffeine alongside it."},
  {id:"tulsi",         name:"Hot Basil",            latin:"Ocimum tenuiflorum",         systems:["endocrine","nervous"],          ailments:["stress","energy","mood"],                                evidence:"emerging",     uses:"An adaptogen for stress, mood, and balanced energy with a pleasant clove like aroma. Yahweh created this plant with properties that calm the nervous system.",                            actions:["Adaptogen","Calming"],                         formats:["Tea","Extract"],                                         who:["adults"],                                     safety:"May lower blood sugar; caution with diabetes medicine and before surgery."},
  {id:"maca",          name:"Maca",                 latin:"Lepidium meyenii",           systems:["endocrine","reproductive"],     ailments:["energy","libido"],                                       evidence:"emerging",     uses:"Andean root food used for energy, stamina, and hormonal balance support.",                                                                                                              actions:["Nutritive tonic"],                             formats:["Powder","Capsule"],                                      who:["adults","men","women"],                       safety:"Generally well tolerated as a food; start with a small amount."},
  {id:"oats",          name:"Oats and Oat Straw",   latin:"Avena sativa",               systems:["nervous"],                      ailments:["stress","insomnia","nutrition"],                         evidence:"traditional",  uses:"Nourishing nervous system tonic and gentle source of B vitamins, minerals, and calming properties over time.",                                                                        actions:["Nervine tonic","Nutritive"],                   formats:["Food","Tea","Tincture"],                                 who:["all","children-ok"],                          safety:"Choose certified gluten free oats if sensitive."},
  {id:"lemon-balm",    name:"Lemon Balm",           latin:"Melissa officinalis",        systems:["nervous","digestive"],          ailments:["anxiety","insomnia","indigestion"],                      evidence:"emerging",     uses:"Gentle uplifting nervine for stress, mild anxiety, and restful sleep. Kennedy et al. 2004 showed significant anxiety reduction vs. placebo.",                                          actions:["Nervine","Calming"],                           formats:["Tea","Tincture"],                                        who:["all","children-ok"],                          safety:"May be sedating in larger doses; caution with thyroid medicine."},
  {id:"lavender",      name:"Lavender",             latin:"Lavandula angustifolia",     systems:["nervous"],                      ailments:["anxiety","insomnia","headache"],                         evidence:"supported",    uses:"Well studied for calm and sleep. Standardized oral lavender oil (Woelk 2010) reduced anxiety non-inferiorly to lorazepam without dependency.",                                          actions:["Calming","Anxiolytic"],                        formats:["Tea","Oil capsule","Aromatherapy"],                       who:["all","children-ok"],                          safety:"Use only food or supplement grade products internally."},
  {id:"passionflower",name:"Passionflower",         latin:"Passiflora incarnata",       systems:["nervous"],                      ailments:["anxiety","insomnia"],                                    evidence:"emerging",     uses:"Calming nervine for anxious tension and sleep onset. Traditional use well documented in North American and European herbalism.",                                                          actions:["Nervine","Sedative"],                          formats:["Tea","Tincture"],                                        who:["adults","pregnancy-avoid"],                   safety:"Can be sedating; avoid with sedative medicines and before driving."},
  {id:"skullcap",      name:"Skullcap",             latin:"Scutellaria lateriflora",    systems:["nervous"],                      ailments:["anxiety","insomnia","headache"],                         evidence:"traditional",  uses:"Calming nervine that eases physical tension and anxiety from the nervous system.",                                                                                                    actions:["Nervine"],                                     formats:["Tea","Tincture"],                                        who:["adults","pregnancy-avoid"],                   safety:"Source carefully to avoid adulteration with other plants."},
  {id:"valerian",      name:"Valerian",             latin:"Valeriana officinalis",      systems:["nervous"],                      ailments:["insomnia","anxiety"],                                    evidence:"emerging",     uses:"Traditional sleep and nervous tension herb; studied in multiple trials for sleep onset.",                                                                                             actions:["Sedative","Nervine"],                          formats:["Tincture","Capsule","Tea"],                               who:["adults"],                                     safety:"Can be sedating; avoid with sedatives and before driving."},
  {id:"st-johns-wort", name:"St. John's Wort",      latin:"Hypericum perforatum",       systems:["nervous"],                      ailments:["mood","nerve-pain"],                                     evidence:"supported",    uses:"Well studied for mild to moderate low mood; the infused oil is applied externally for nerve pain.",                                                                                     actions:["Antidepressant (mild)","Antiviral"],           formats:["Tablet","Tincture","Infused oil (external)"],             who:["adults","pregnancy-avoid"],                   safety:"Major drug interactions (speeds up breakdown of the pill, antidepressants, anticoagulants, antivirals). Talk to a provider first."},
  {id:"gotu-kola",     name:"Gotu Kola",            latin:"Centella asiatica",          systems:["nervous","skin"],               ailments:["memory","skin"],                                         evidence:"emerging",     uses:"Tonic for memory and cognitive function with anti inflammatory properties and support for skin healing.",                                                                                actions:["Tonic","Anti inflammatory"],                   formats:["Tablet","Tincture","Tea"],                                who:["adults"],                                     safety:"Generally well tolerated short term; avoid in pregnancy."},
  {id:"hawthorn",      name:"Hawthorn",             latin:"Crataegus oxycantha",        systems:["cardiovascular"],               ailments:["heart","blood-pressure","circulation"],                  evidence:"emerging",     uses:"Gentle heart tonic with multiple European clinical trials supporting its use for heart function and circulation.",                                                                        actions:["Cardiotonic","Antioxidant"],                   formats:["Tincture","Capsule","Tea"],                               who:["adults"],                                     safety:"Can interact with heart and blood pressure medicines; work with a provider."},
  {id:"garlic",        name:"Garlic",               latin:"Allium sativum",             systems:["cardiovascular","immune","respiratory"], ailments:["circulation","blood-pressure","cold","infection"], evidence:"supported", uses:"Supports healthy circulation and blood pressure and acts as a broad antimicrobial. One of the most studied foods in modern research.",                                            actions:["Antimicrobial","Circulatory"],                 formats:["Fresh clove","Capsule"],                                  who:["all","children-ok"],                          safety:"Thins blood in quantity; caution before surgery and with anticoagulants."},
  {id:"ginkgo",        name:"Ginkgo",               latin:"Ginkgo biloba",              systems:["cardiovascular","nervous"],     ailments:["circulation","memory"],                                  evidence:"emerging",     uses:"Supports circulation to the head and brain; among the most studied plants for memory and cognitive function.",                                                                             actions:["Circulatory","Antioxidant"],                   formats:["Tablet","Fluid extract"],                                who:["adults"],                                     safety:"Thins blood; avoid with anticoagulants and before surgery."},
  {id:"cayenne",       name:"Cayenne",              latin:"Capsicum frutescens",        systems:["cardiovascular","muscular"],    ailments:["circulation","pain"],                                    evidence:"emerging",     uses:"Warming circulatory stimulant that drives blood to the extremities; capsaicin studied extensively for topical pain relief.",                                                                actions:["Circulatory stimulant"],                       formats:["Culinary","Capsule","Cream (external)"],                  who:["adults","pregnancy-avoid"],                   safety:"Avoid tablets in pregnancy; wash hands after handling."},
  {id:"motherwort",    name:"Motherwort",           latin:"Leonurus cardiaca",          systems:["cardiovascular","reproductive"],ailments:["palpitations","anxiety","menstrual"],                    evidence:"traditional",  uses:"Calming heart and womb tonic for palpitations linked to anxiety or hormonal changes.",                                                                                            actions:["Cardiotonic","Nervine"],                       formats:["Tincture","Tea"],                                        who:["women","adults","pregnancy-avoid"],            safety:"Avoid in pregnancy."},
  {id:"echinacea",     name:"Echinacea",            latin:"Echinacea spp.",             systems:["immune"],                       ailments:["cold","infection","sore-throat"],                        evidence:"emerging",     uses:"Immune modulating herb used to support the body in fighting off infection; multiple meta-analyses show modest benefit for colds.",                                                      actions:["Immune stimulant"],                            formats:["Tincture","Tablet","Tea"],                                who:["all","children-ok"],                          safety:"Caution with autoimmune conditions; avoid if allergic to daisy family."},
  {id:"elderberry",    name:"Elder (Berry and Flower)", latin:"Sambucus nigra",         systems:["immune","respiratory"],         ailments:["cold","flu","allergy"],                                  evidence:"emerging",     uses:"Antiviral berry studied for reducing cold and flu duration; the flower eases congestion and hay fever.",                                                                                 actions:["Antiviral","Diaphoretic"],                     formats:["Syrup","Tincture","Tea"],                                 who:["all","children-ok"],                          safety:"Only use cooked berries and flowers; raw berries and other plant parts are toxic."},
  {id:"astragalus",    name:"Astragalus",           latin:"Astragalus membranaceus",    systems:["immune"],                       ailments:["immune","fatigue"],                                      evidence:"emerging",     uses:"Tonic herb to build long term immune resilience; used preventively as a decoction over weeks, not during acute fever.",                                                                   actions:["Immune tonic","Adaptogen"],                    formats:["Decoction","Capsule","Soup"],                             who:["adults"],                                     safety:"Avoid during acute infections; caution with immune suppressing medicines."},
  {id:"calendula",     name:"Calendula",            latin:"Calendula officinalis",      systems:["skin","immune"],                ailments:["skin","wounds","fungal"],                                evidence:"emerging",     uses:"Heals and soothes the skin; gentle support for cuts, rashes, and fungal issues.",                                                                                                       actions:["Vulnerary","Anti inflammatory"],               formats:["Cream","Ointment","Infusion"],                            who:["all","children-ok"],                          safety:"Avoid if allergic to daisy family."},
  {id:"pau-darco",     name:"Pau d'Arco",           latin:"Tabebuia spp.",              systems:["immune"],                       ailments:["fungal","candida","infection"],                          evidence:"traditional",  uses:"Traditional immune and antifungal bark used for candida and chronic infection support.",                                                                                           actions:["Immune support","Antifungal (traditional)"],   formats:["Decoction","Capsule","Tincture"],                         who:["adults","pregnancy-avoid"],                   safety:"Avoid in pregnancy and with anticoagulants."},
  {id:"cleavers",      name:"Cleavers",             latin:"Galium aparine",             systems:["immune","urinary"],             ailments:["lymph","skin"],                                          evidence:"traditional",  uses:"Traditional lymphatic mover and gentle support for swollen glands and skin.",                                                                                                   actions:["Lymphatic","Mild diuretic"],                   formats:["Fresh juice","Tincture","Tea"],                           who:["adults"],                                     safety:"Generally gentle; mild and widely used."},
  {id:"thyme",         name:"Thyme",                latin:"Thymus vulgaris",            systems:["respiratory","immune"],         ailments:["cough","cold","sore-throat","infection"],                evidence:"emerging",     uses:"Antiseptic and expectorant herb for the whole respiratory system; clinical trials support its use for coughs.",                                                                          actions:["Antiseptic","Expectorant"],                    formats:["Tea","Tincture","Steam"],                                 who:["all","children-ok"],                          safety:"Avoid concentrated thyme oil in pregnancy."},
  {id:"mullein",       name:"Mullein",              latin:"Verbascum thapsus",          systems:["respiratory"],                  ailments:["cough","bronchitis"],                                    evidence:"traditional",  uses:"Soothing expectorant for dry, irritated coughs and inflamed airways.",                                                                                                            actions:["Expectorant","Demulcent"],                     formats:["Tea (well strained)","Tincture"],                         who:["all","children-ok"],                          safety:"Strain tea well to remove fine hairs from the leaves."},
  {id:"elecampane",    name:"Elecampane",           latin:"Inula helenium",             systems:["respiratory"],                  ailments:["cough","bronchitis"],                                    evidence:"traditional",  uses:"Warming expectorant for deep, chesty coughs and bronchitis.",                                                                                                                      actions:["Expectorant"],                                 formats:["Decoction","Tincture"],                                  who:["adults","pregnancy-avoid"],                   safety:"Avoid in pregnancy."},
  {id:"eucalyptus",    name:"Eucalyptus",           latin:"Eucalyptus globulus",        systems:["respiratory"],                  ailments:["congestion","cough"],                                    evidence:"emerging",     uses:"Clearing aromatic oil for congestion, used in steam inhalations and chest rubs.",                                                                                                      actions:["Decongestant","Antiseptic"],                   formats:["Steam inhalation","Diluted oil (external)"],              who:["adults"],                                     safety:"Do not take oil internally; keep away from young children's faces."},
  {id:"plantain",      name:"Plantain Leaf",        latin:"Plantago major",             systems:["respiratory","skin"],           ailments:["cough","bites","wounds"],                                evidence:"traditional",  uses:"Soothing leaf for irritated airways and a classic drawing poultice for bites and stings.",                                                                                         actions:["Demulcent","Vulnerary"],                       formats:["Tea","Poultice"],                                        who:["all","children-ok"],                          safety:"Gentle and widely used."},
  {id:"comfrey",       name:"Comfrey",              latin:"Symphytum officinale",       systems:["skin","skeletal"],              ailments:["wounds","sprains","fractures"],                          evidence:"traditional",  uses:"Speeds healing of bruises, sprains, and bone; external use only. The name comes from the Latin confirmare, to strengthen.",                                                          actions:["Vulnerary","Cell proliferant"],                formats:["Ointment","Cream","Poultice"],                            who:["adults","external-only"],                     safety:"External only. Do not take internally (liver toxic alkaloids). Do not use on broken skin."},
  {id:"witch-hazel",   name:"Winterbloom",          latin:"Hamamelis virginiana",       systems:["skin","cardiovascular"],        ailments:["skin","varicose","hemorrhoids"],                         evidence:"emerging",     uses:"Astringent that tightens and soothes tissue; used for weepy skin, varicose veins, and hemorrhoids.",                                                                                     actions:["Astringent"],                                  formats:["Distilled water","Ointment"],                            who:["all","children-ok"],                          safety:"External use; gentle."},
  {id:"chickweed",     name:"Chickweed",            latin:"Stellaria media",            systems:["skin"],                         ailments:["eczema","itch","skin"],                                  evidence:"traditional",  uses:"Cooling herb that soothes itchy, inflamed skin and eczema.",                                                                                                                         actions:["Emollient","Anti itch"],                       formats:["Cream","Ointment","Fresh juice"],                         who:["all","children-ok"],                          safety:"Gentle, external use."},
  {id:"aloe",          name:"Aloe Vera",            latin:"Aloe vera",                  systems:["skin","digestive"],             ailments:["burns","skin","wounds"],                                 evidence:"supported",    uses:"Gel soothes and heals burns, sunburn, and irritated skin. One of the most widely used and studied topical plants.",                                                                   actions:["Emollient","Vulnerary"],                       formats:["Gel (external)"],                                        who:["all","children-ok"],                          safety:"Use the gel externally; avoid the bitter latex internally (strong laxative effect)."},
  {id:"horsetail",     name:"Horsetail",            latin:"Equisetum arvense",          systems:["skeletal","urinary"],           ailments:["bones","connective-tissue","urinary"],                   evidence:"traditional",  uses:"High silica content traditionally used to support connective tissue, bones, and hair strength.",                                                                                    actions:["Mineralizing","Astringent"],                   formats:["Tea","Tincture"],                                        who:["adults","pregnancy-avoid"],                   safety:"Avoid prolonged use; not in pregnancy."},
  {id:"arnica",        name:"Arnica",               latin:"Arnica montana",             systems:["muscular"],                     ailments:["bruises","sprains","muscle-ache"],                       evidence:"emerging",     uses:"Soothes bruising and muscle soreness topically; studied for post-surgical bruising reduction.",                                                                                        actions:["Anti inflammatory (topical)"],                 formats:["Cream","Ointment"],                                      who:["all","external-only"],                        safety:"External only. Do not use on broken skin or take internally."},
  {id:"cramp-bark",    name:"Cramp Bark",           latin:"Viburnum opulus",            systems:["muscular","reproductive"],      ailments:["cramps","muscle-spasm","back-pain","period-pain"],       evidence:"traditional",  uses:"Relaxes tense, cramping muscles including the womb; used for period pain, back spasm, and leg cramps.",                                                                               actions:["Antispasmodic"],                               formats:["Decoction","Tincture"],                                  who:["all","women"],                                safety:"Generally well tolerated."},
  {id:"cornsilk",      name:"Cornsilk",             latin:"Zea mays",                   systems:["urinary"],                      ailments:["cystitis","fluid-retention"],                            evidence:"traditional",  uses:"Soothing diuretic for the urinary tract and mild fluid retention.",                                                                                                              actions:["Demulcent","Diuretic"],                        formats:["Tea","Tincture"],                                        who:["all","children-ok"],                          safety:"Gentle and widely used."},
  {id:"buchu",         name:"Buchu",                latin:"Barosma betulina",           systems:["urinary"],                      ailments:["cystitis"],                                              evidence:"traditional",  uses:"Antiseptic herb traditionally used to disinfect the urinary tubules.",                                                                                                          actions:["Urinary antiseptic"],                          formats:["Tea","Tincture"],                                        who:["adults","pregnancy-avoid"],                   safety:"Avoid in pregnancy."},
  {id:"goldenrod",     name:"Goldenrod",            latin:"Solidago virgaurea",         systems:["urinary"],                      ailments:["cystitis","allergy"],                                    evidence:"traditional",  uses:"Toning urinary herb and support for upper respiratory allergy.",                                                                                                               actions:["Urinary antiseptic","Anti inflammatory"],      formats:["Tea","Tincture"],                                        who:["adults"],                                     safety:"Generally well tolerated."},
  {id:"cranberry",     name:"Cranberry and Bilberry",latin:"Vaccinium spp.",            systems:["urinary"],                      ailments:["cystitis"],                                              evidence:"emerging",     uses:"Helps keep bacteria from adhering to the bladder wall; supportive for recurrent cystitis.",                                                                                          actions:["Urinary support","Antioxidant"],               formats:["Juice","Decoction","Capsule"],                            who:["all","children-ok"],                          safety:"Choose unsweetened forms."},
  {id:"chaste-tree",   name:"Chaste Tree (Vitex)",  latin:"Vitex agnus-castus",        systems:["reproductive","endocrine"],     ailments:["pms","irregular-cycle","fertility","menopause"],         evidence:"emerging",     uses:"Acts on the pituitary to help balance the menstrual cycle and ease PMS symptoms over time.",                                                                                          actions:["Hormone balancing"],                           formats:["Tablet","Tincture"],                                     who:["women","adults","pregnancy-avoid"],            safety:"Discontinue if pregnant; may interact with hormonal medicines."},
  {id:"dong-quai",     name:"Dong Quai",            latin:"Angelica sinensis",          systems:["reproductive"],                 ailments:["menstrual","heavy-periods","menopause"],                 evidence:"traditional",  uses:"Classic womb tonic used historically for menstrual balance, often in formula with other herbs.",                                                                                    actions:["Blood tonic","Hormone support"],               formats:["Decoction","Tablet"],                                    who:["women","adults","pregnancy-avoid"],            safety:"Thins the blood; avoid with anticoagulants such as warfarin and in pregnancy."},
  {id:"raspberry-leaf",name:"Raspberry Leaf",       latin:"Rubus idaeus",               systems:["reproductive"],                 ailments:["menstrual","pregnancy-prep"],                            evidence:"traditional",  uses:"Toning womb herb; traditionally used in the last weeks of pregnancy to prepare the uterus for labor.",                                                                               actions:["Uterine tonic","Astringent"],                  formats:["Tea","Tincture"],                                        who:["women"],                                      safety:"In pregnancy, traditionally reserved for the last 10 weeks; seek provider guidance."},
  {id:"shatavari",     name:"Wild Asparagus",       latin:"Asparagus racemosus",        systems:["reproductive","endocrine"],     ailments:["menopause","libido","fertility"],                        evidence:"traditional",  uses:"Traditional tonic for female reproductive vitality, studied for adaptogenic and hormone supporting properties.",                                                                     actions:["Tonic","Adaptogen"],                           formats:["Powder","Tincture"],                                     who:["women","adults"],                             safety:"Generally well tolerated."},
  {id:"saw-palmetto",  name:"Saw Palmetto",         latin:"Serenoa repens",             systems:["reproductive"],                 ailments:["prostate","libido"],                                     evidence:"emerging",     uses:"Tonic for male reproductive health and for managing symptoms of an enlarged prostate.",                                                                                              actions:["Tonic"],                                       formats:["Capsule","Tincture"],                                    who:["men","adults"],                               safety:"May interact with hormonal medicines."},
  {id:"black-cohosh",  name:"Black Cohosh",         latin:"Cimicifuga racemosa",        systems:["reproductive","endocrine"],     ailments:["menopause","hot-flashes"],                               evidence:"emerging",     uses:"Studied for menopausal hot flashes and night sweats in multiple clinical trials.",                                                                                                     actions:["Hormone support"],                             formats:["Tablet","Tincture"],                                     who:["women","adults","pregnancy-avoid"],            safety:"Avoid in pregnancy; rare liver concerns, so buy quality products."},
  {id:"andrographis",  name:"Andrographis",        latin:"Andrographis paniculata",    systems:["immune"],               ailments:["viral","cold","infection","inflammation"],               evidence:"emerging",     uses:"One of the most studied antiviral herbs in clinical trials. Andrographolide compounds show documented activity against influenza, EBV, and other viruses. Reduces duration and severity of upper respiratory infections in multiple RCTs.",                             actions:["Antiviral","Immune stimulant","Anti-inflammatory"],   formats:["Tablet","Tincture","Capsule"],                           who:["adults","pregnancy-avoid"],                   safety:"Avoid in pregnancy (uterine stimulant). Can cause headache at high doses. Short-term use for acute illness is the typical protocol."},
  {id:"cats-claw",     name:"Cat's Claw",           latin:"Uncaria tomentosa",          systems:["immune"],               ailments:["viral","inflammation","arthritis","infection"],          evidence:"emerging",     uses:"Documented immune modulating and antiviral properties. Oxindole alkaloids inhibit viral replication and reduce chronic inflammation. Used in South American traditional medicine for immune support and viral conditions.",                                              actions:["Antiviral","Immune modulating","Anti-inflammatory"],   formats:["Decoction","Capsule","Tincture"],                        who:["adults","pregnancy-avoid"],                   safety:"Avoid in pregnancy and with immunosuppressant medications. Can lower blood pressure."},
  {id:"neem",          name:"Neem",                latin:"Azadirachta indica",         systems:["immune","skin"],            ailments:["oral-health","infection","skin"],                        evidence:"emerging",     uses:"One of the most studied anti-plaque herbs. Clinical trials show neem reduces Streptococcus mutans counts comparable to chlorhexidine without antibiotic resistance risk. Used as a traditional toothbrush (neem twigs) across India and East Africa for centuries.",                   actions:["Antimicrobial","Anti-plaque","Anti-inflammatory"],     formats:["Twig (chewing stick)","Powder","Toothpaste","Oil"],      who:["adults","children-caution"],                  safety:"Leaf and twig are safe for oral use. Do not give concentrated neem seed oil internally to young children; concentrated extracts have caused toxicity in infants."},
  {id:"frankincense",  name:"Frankincense",         latin:"Boswellia sacra",            systems:["immune"],                       ailments:["biblical","inflammation"],                               evidence:"traditional",  uses:"The holy resin of biblical worship, used in the Tabernacle and brought to Yeshua at His birth. Grounding when burned or diffused; related species (B. serrata) studied for inflammation.", actions:["Aromatic","Grounding"],                        formats:["Resin","Essential oil (aromatic)"],                       who:["all"],                                        safety:"For aroma and worship use; dilute essential oils and avoid undiluted internal use."},
  {id:"myrrh",         name:"Myrrh",                latin:"Commiphora myrrha",          systems:["immune","digestive"],           ailments:["biblical","mouth-ulcers"],                               evidence:"traditional",  uses:"Ancient resin of anointing used throughout scripture; used today for oral health and gum care.",                                                                                     actions:["Astringent","Antiseptic"],                     formats:["Resin","Mouth rinse","Tincture"],                         who:["adults","pregnancy-avoid"],                   safety:"Avoid internal use in pregnancy; use diluted."},
  {id:"hyssop",        name:"Hyssop",               latin:"Hyssopus officinalis",       systems:["respiratory"],                  ailments:["biblical","cough"],                                      evidence:"traditional",  uses:"The cleansing herb of Psalm 51:7, used throughout scripture in purification rites; aromatic herb used in tea and worship.",                                                          actions:["Aromatic","Expectorant (traditional)"],        formats:["Tea","Herb"],                                            who:["adults","pregnancy-avoid"],                   safety:"Avoid concentrated oil internally and in pregnancy or seizure disorders."},
];

/* ---- AILMENTS ------------------------------------------------- */
const AILMENTS = [
  {id:"cold",cat:"Immune and Respiratory",name:"Colds, Flu, and Fevers",desc:"Viral infections; flu adds fever, aches, and fatigue.",herbs:["garlic","ginger","elderberry","thyme","echinacea"],self:"Eat lightly, favor vegetable soups, and avoid greasy, sugary, and dairy foods. Rest and drink plenty of fluids.",seek:"In the very young or very old, a cold can become pneumonia. Seek help if symptoms persist or suddenly worsen."},
  {id:"sore-throat",cat:"Immune and Respiratory",name:"Sore Throat and Tonsillitis",desc:"Inflamed, painful throat, often alongside a cold or flu.",herbs:["echinacea","thyme","garlic","myrrh"],self:"Gargle with diluted lemon juice or sage infusion. Soothe with warm fluids and honey.",seek:"Seek advice for children under 5 with tonsillitis, or if there is no improvement after 2 days."},
  {id:"cough",cat:"Immune and Respiratory",name:"Coughs and Bronchitis",desc:"Coughing clears irritation; bronchitis inflames the airways.",herbs:["thyme","mullein","elecampane","dgl-licorice","plantain"],self:"Stay hydrated, use steam inhalation, and take plenty of garlic for chest infections.",seek:"Seek advice if a cough lasts more than a week without a cold, or for coughing up blood."},
  {id:"congestion",cat:"Immune and Respiratory",name:"Congestion, Sinus, and Earache",desc:"Blocked sinuses and pressure, sometimes with earache.",herbs:["eucalyptus","garlic","elderberry","thyme"],self:"Reduce mucus forming foods (dairy, sugar, refined flour). Use steam inhalation.",seek:"Seek advice for earache, especially in children."},
  {id:"allergy",cat:"Immune and Respiratory",name:"Allergies and Hay Fever",desc:"The immune system overreacts to pollen, dust, or foods.",herbs:["nettle","elderberry","goldenrod","chamomile"],self:"A nettle infusion taken for a few months before the season can help. Reduce mucus forming foods.",seek:"Seek immediate help for life threatening allergic reactions."},
  {id:"indigestion",cat:"Digestive",name:"Acidity and Indigestion",desc:"Too much acid or a poor diet irritates the stomach and gut lining.",herbs:["slippery-elm","marshmallow","dgl-licorice","chamomile","ginger"],self:"Cut acidic foods, alcohol, and tobacco. Coat the gut with mucilage herbs like slippery elm.",seek:"Seek advice for persistent or severe symptoms."},
  {id:"gas",cat:"Digestive",name:"Gas and Bloating",desc:"Common digestive complaints eased by bitters and aromatic carminatives.",herbs:["fennel","peppermint","chamomile","gentian","clove"],self:"Take bitters such as gentian before meals; sip fennel or peppermint infusions after meals.",seek:"Bitters are not suitable for children under 5."},
  {id:"constipation",cat:"Digestive",name:"Constipation and Diarrhea",desc:"Herbs gently restore normal bowel function; fiber and water are foundational.",herbs:["dandelion","slippery-elm","marshmallow","ginger"],self:"Eat plenty of fruit, vegetables, and whole grains and drink water.",seek:"Seek advice for persistent constipation or diarrhea, and do not give strong laxatives to children."},
  {id:"nausea",cat:"Digestive",name:"Nausea and Vomiting",desc:"From travel, infection, or stress; warming digestive herbs settle the stomach.",herbs:["ginger","peppermint","lemon-balm","fennel"],self:"Sip ginger tea or chew crystallized ginger. For travel, take ginger ahead of time.",seek:"Seek advice if nausea is severe or recurrent. Mint is unsuitable for children under 5."},
  {id:"mouth-ulcers",cat:"Digestive",name:"Mouth Ulcers and Gum Problems",desc:"Astringent herbs tighten gums and speed healing of ulcers.",herbs:["myrrh","echinacea","dgl-licorice"],self:"Use sage as a mouthwash; dab diluted myrrh tincture on ulcers.",seek:"See a dentist for persistent gum or tooth problems."},
  {id:"insomnia",cat:"Nervous and Stress",name:"Insomnia",desc:"Difficulty sleeping, eased by sedative herbs taken at night.",herbs:["valerian","passionflower","chamomile","lavender","oats"],self:"Keep a consistent bedtime, dim screens early, and try a calming evening tea.",seek:"Seek advice if sleeplessness persists or is accompanied by low mood."},
  {id:"anxiety",cat:"Nervous and Stress",name:"Anxiety, Stress, and Tension",desc:"Nervine herbs calm the nervous system and support resilience.",herbs:["lemon-balm","skullcap","ashwagandha","lavender","passionflower"],self:"Eat well, move daily, pray, and allow time for rest and connection.",seek:"Seek help for severe or persistent low mood or anxiety."},
  {id:"headache",cat:"Nervous and Stress",name:"Headaches and Migraine",desc:"Many triggers; relaxing herbs ease tension types.",herbs:["lavender","peppermint","skullcap","rosemary"],self:"Address the cause (tension, eyestrain, dehydration). Rub diluted lavender on the temples.",seek:"Consult a practitioner for recurrent migraine."},
  {id:"nerve-pain",cat:"Nervous and Stress",name:"Neuralgia (Nerve Pain)",desc:"Pain from an irritated or trapped nerve; external rubs can bring relief.",herbs:["st-johns-wort","lavender","clove","cramp-bark"],self:"Use St. John's wort infused oil externally on the painful area.",seek:"Seek advice for fever alongside nerve pain, or gum swelling with toothache."},
  {id:"blood-pressure",cat:"Circulatory",name:"High Blood Pressure and Circulation",desc:"Herbs support healthy circulation alongside diet and movement.",herbs:["garlic","hawthorn","ginkgo","ginger"],self:"Eat a high vegetable, low sugar diet and do regular aerobic exercise.",seek:"Seek advice especially if already on medicine for a circulatory condition."},
  {id:"palpitations",cat:"Circulatory",name:"Palpitations and Panic Attacks",desc:"Often from stress or caffeine; calming heart and nerve herbs help.",herbs:["motherwort","hawthorn","passionflower","lemon-balm"],self:"Reduce caffeine; use relaxing infusions such as linden or motherwort.",seek:"Seek immediate help if palpitations last several minutes."},
  {id:"anemia",cat:"Circulatory",name:"Anemia (Iron Related)",desc:"Iron deficiency from blood loss or low intake.",herbs:["nettle","gentian","dandelion"],self:"Increase iron rich greens and pair with vitamin C; nettle is rich in iron.",seek:"Determine the type of anemia with testing before home treatment."},
  {id:"varicose",cat:"Circulatory",name:"Varicose Veins and Hemorrhoids",desc:"Weak or pressured veins; astringent herbs tone and soothe.",herbs:["witch-hazel","calendula","horsetail"],self:"Relieve pressure, keep regular bowel movements, and apply distilled witch hazel externally.",seek:"Do not massage varicose veins."},
  {id:"arthritis",cat:"Musculoskeletal",name:"Joint Pain, Arthritis, and Gout",desc:"Inflammation or waste buildup in the joints; anti inflammatory herbs ease pain.",herbs:["devils-claw","turmeric","cramp-bark","boswellia"],self:"Reduce acid forming foods; gentle regular movement helps. Lemon juice reduces acidity.",seek:"Consult a practitioner for severe arthritis."},
  {id:"back-pain",cat:"Musculoskeletal",name:"Back Pain",desc:"Warming, relaxing herbs unknot muscles; rest and movement matter most.",herbs:["cramp-bark","st-johns-wort","lavender","devils-claw"],self:"Improve posture, rest as needed, and use a St. John's wort and lavender oil rub.",seek:"Chronic or severe back pain needs specialist care."},
  {id:"muscle-ache",cat:"Musculoskeletal",name:"Muscle Aches, Cramps, and Sprains",desc:"Normal after exertion; rubs and relaxing herbs soothe tired muscles.",herbs:["arnica","cramp-bark","thyme","rosemary"],self:"Use arnica or cramp bark externally; warm baths with thyme soothe aching muscles.",seek:"Seek treatment for broken bones, fractures, and severe sprains."},
  {id:"cystitis",cat:"Urinary",name:"Urinary Infections (Cystitis)",desc:"Bladder infection; antiseptic and soothing herbs help mild cases.",herbs:["cornsilk","buchu","marshmallow","cranberry","echinacea"],self:"Drink plenty of water and unsweetened cranberry.",seek:"Seek immediate help if severe or recurrent, or with blood in the urine."},
  {id:"fungal",cat:"Skin and Fungal",name:"Fungal Infections and Candida",desc:"Yeast overgrowth; antifungal and immune herbs help.",herbs:["calendula","garlic","pau-darco","thyme"],self:"Reduce bread, alcohol, sugar, and yeast. Probiotic foods support beneficial bacteria.",seek:"Seek advice for stubborn candidiasis."},
  {id:"eczema",cat:"Skin and Fungal",name:"Eczema and Skin Rashes",desc:"Red, inflamed, itchy skin, often with an allergic component.",herbs:["chickweed","chamomile","calendula","aloe"],self:"Soothe with chickweed cream and oat baths; avoid scratching.",seek:"Eczema is best assessed by a practitioner if severe or persistent."},
  {id:"skin",cat:"Skin and Fungal",name:"Skin Problems, Bites, Burns, and Wounds",desc:"Minor skin issues respond well to external herbs.",herbs:["calendula","aloe","witch-hazel","plantain","lavender"],self:"Use aloe or lavender for minor burns, calendula for wounds, and plantain for bites.",seek:"Seek help for non minor burns, spreading infection, or changes to moles."},
  {id:"menstrual",cat:"Reproductive",name:"Menstrual Problems and PMS",desc:"Cycle issues often relate to hormones; balancing and toning herbs help.",herbs:["chaste-tree","cramp-bark","nettle","dong-quai"],self:"Eat a diet high in vegetables, low in sugar and fatty foods; regular exercise helps.",seek:"Seek advice for very heavy or painful periods."},
  {id:"menopause",cat:"Reproductive",name:"Menopausal Problems",desc:"Hormone shifts bring hot flashes, night sweats, and changes in vitality.",herbs:["black-cohosh","chaste-tree","shatavari","st-johns-wort"],self:"Support vitality with rest, whole foods, and tonic herbs; sage helps hot flashes.",seek:"Seek advice for prolonged or irregular bleeding."},
  {id:"fertility",cat:"Reproductive",name:"Fertility and Vitality",desc:"Lifestyle and hormone balance shape fertility; tonic herbs may help.",herbs:["chaste-tree","ashwagandha","saw-palmetto","maca","ginseng"],self:"Diet, exercise, and stress care matter. Chaste tree for women, ginseng and saw palmetto for men.",seek:"Chronic infertility needs professional attention."},
];

/* ---- PARASITES ------------------------------------------------- */
const PARASITES = [
  {name:"Pinworm",latin:"Enterobius vermicularis",where:"Large intestine and colon; lays eggs around the anus at night.",symptoms:"Intense anal itching especially at night, restlessness, and irritability. Very common in children.",note:"Highly contagious within households; hand and bedding hygiene matter."},
  {name:"Roundworm",latin:"Ascaris lumbricoides",where:"Small intestine; larvae migrate through the lungs first.",symptoms:"Abdominal discomfort, cough during migration, poor nutrient absorption, and sometimes a visible worm.",note:"One of the most common human parasites worldwide."},
  {name:"Hookworm",latin:"Necator and Ancylostoma",where:"Small intestine; enters through the skin, often the feet.",symptoms:"Iron deficiency anemia, fatigue, abdominal pain, and itchy skin at the entry point.",note:"A leading cause of parasitic anemia globally."},
  {name:"Whipworm",latin:"Trichuris trichiura",where:"Large intestine.",symptoms:"Often silent; heavy load causes diarrhea, abdominal pain, and rectal issues.",note:"Frequently coexists with roundworm."},
  {name:"Tapeworm",latin:"Taenia and Diphyllobothrium",where:"Intestines; acquired from undercooked beef, pork, or fish.",symptoms:"Often mild: abdominal discomfort, weight change, and segments in the stool. Fish tapeworm can cause B12 deficiency.",note:"Cook meat and fish thoroughly to prevent."},
  {name:"Threadworm",latin:"Strongyloides stercoralis",where:"Small intestine, skin, and lungs; can reinfect the same host.",symptoms:"Abdominal pain, diarrhea, cough, and an itchy migrating skin rash.",note:"Can persist for years through autoinfection."},
  {name:"Giardia",latin:"Giardia lamblia",where:"Small intestine; from contaminated water or food.",symptoms:"Greasy foul diarrhea, gas, bloating, cramps, nausea, and fatigue.",note:"A common cause of traveler's and waterborne illness."},
  {name:"Cryptosporidium",latin:"Cryptosporidium spp.",where:"Intestines; waterborne.",symptoms:"Watery diarrhea, cramps, and dehydration.",note:"Resistant to chlorine; linked to recreational water exposure."},
  {name:"Liver and Blood Flukes",latin:"Fasciola and Schistosoma",where:"Liver and bile ducts, or blood vessels of the gut and bladder.",symptoms:"Liver pain and fever, or blood in the urine or stool depending on type.",note:"More common in specific regions; requires medical treatment."},
  {name:"Toxoplasma",latin:"Toxoplasma gondii",where:"Forms cysts in muscle and brain tissue.",symptoms:"Often silent or mild flu like illness in healthy people.",note:"A real risk in pregnancy; avoid undercooked meat and handle cat litter carefully."},
];

/* ---- EXERCISES ------------------------------------------------- */
const EXERCISES = {
  easy:   { label:"Easy (start here)", color:"#3f7d4f", items:[
    {n:"Brisk walking",       d:"10 to 30 minutes. The most underrated full body habit; supports heart, mood, digestion, and blood sugar."},
    {n:"Sit to stand",        d:"Rise from a chair without using your hands, 8 to 12 reps. Builds leg and core strength for daily life."},
    {n:"Wall push ups",       d:"Hands on a wall, lower and press. Gentle upper body strength for any starting level."},
    {n:"Standing calf raises",d:"Rise onto the balls of the feet and lower slowly. Strengthens lower legs and improves circulation."},
    {n:"Marching in place",   d:"Lift the knees, swing the arms, 1 to 2 minutes. Easy circulation and a gentle warm up."},
  ]},
  medium: { label:"Building", color:"#b9892f", items:[
    {n:"Bodyweight squats",   d:"Feet shoulder width, sit back and down, 8 to 15 reps. Foundational lower body strength."},
    {n:"Push ups",            d:"Chest, shoulders, and core. Drop to the knees to scale; progress to full over time."},
    {n:"Reverse lunges",      d:"Step back and lower, alternating legs. Builds balance and single leg strength."},
    {n:"Glute bridges",       d:"Lie on your back, lift the hips. Strengthens the glutes and supports the lower back."},
    {n:"Plank",               d:"Hold a straight line on forearms and toes, 20 to 60 seconds. Whole core stability."},
    {n:"Bird dog",            d:"On hands and knees, extend opposite arm and leg. Builds spinal control and balance."},
  ]},
  hard:   { label:"Challenging", color:"#9a3d2f", items:[
    {n:"Jump squats",                  d:"Explosive squat into a jump. Power and conditioning; land softly."},
    {n:"Burpees",                      d:"Squat, kick back to a plank, return, and jump. Full body conditioning."},
    {n:"Mountain climbers",            d:"From a plank, drive the knees in quickly. Core and cardio."},
    {n:"Split squats (rear foot elevated)",d:"Lower the front leg with rear foot elevated. Strong single leg builder."},
    {n:"Pistol squat progression",     d:"Work toward a one legged squat using a box or support. Advanced strength and balance."},
  ]},
};

const STRETCHES = [
  {n:"Spinal mobility (cat to cow)",d:"On hands and knees, alternate rounding and arching the back. Keeps the spine supple."},
  {n:"Hip flexor stretch",          d:"Half kneeling, gently press the hips forward. Counters the effects of long sitting."},
  {n:"Hamstring stretch",           d:"Hinge at the hips toward a straight leg. Eases tight backs of the legs."},
  {n:"Doorway chest stretch",       d:"Forearm on a door frame, step through. Opens tight chest and shoulders from desk work."},
  {n:"Thoracic rotations",          d:"Seated or on all fours, rotate the upper back. Restores rotation lost to sitting."},
  {n:"Deep squat hold",             d:"Sink into a flat foot squat and hold. Builds ankle, knee, and hip mobility."},
];

/* ---- MEALS ----------------------------------------------------- */
const MEALS = [
  {n:"Savory Morning Bowl",feeds:"Gut, muscle, brain",items:"Pastured eggs, sauteed greens, a spoon of sauerkraut, avocado, olive oil.",why:"Fermented kraut and greens feed the microbiome, protein steadies blood sugar, and healthy fat supports the brain."},
  {n:"Healing Broth and Veg Soup",feeds:"Gut lining, immune, joints",items:"Bone broth, carrots, celery, onion, garlic, ginger, lentils, a handful of greens.",why:"Broth gelatin soothes the gut lining while the vegetables and lentils add fiber and minerals."},
  {n:"Overnight Oats with Kefir",feeds:"Gut, heart, steady energy",items:"Whole oats, kefir or yogurt, berries, ground flax, walnuts, cinnamon.",why:"Soaked oats and flax bring gentle fiber, kefir adds living cultures, and berries add polyphenols."},
  {n:"Big Restoring Salad",feeds:"Liver, bones, blood",items:"Leafy greens, roasted beets, pumpkin seeds, sardines or chickpeas, olive oil and lemon.",why:"Bitter greens and beets support the liver; seeds add zinc and magnesium; sardines bring omega 3 and calcium."},
  {n:"Golden Lentil Stew",feeds:"Gut, inflammation, blood (iron)",items:"Lentils, turmeric, black pepper, cumin, garlic, onion, spinach.",why:"Turmeric with black pepper calms inflammation while lentils and spinach build iron, paired for better absorption."},
  {n:"Salmon, Cruciferous, and Sweet Potato",feeds:"Brain, hormones, detox",items:"Salmon, roasted broccoli or cauliflower, baked sweet potato, olive oil.",why:"Omega 3 fats nourish the brain and hormones, and cruciferous veg support the liver's clearing pathways."},
  {n:"Gut Friendly Grain Bowl",feeds:"Gut, energy",items:"True sourdough or properly soaked whole grain, roasted vegetables, kimchi, tahini drizzle.",why:"Sourdough fermentation improves digestibility and the kimchi adds beneficial microbes."},
  {n:"Green Kefir Smoothie",feeds:"Gut, immune",items:"Kefir, berries, spinach, ground flax, half a banana.",why:"A simple way to combine living cultures, fiber, and antioxidants when time is short."},
];

/* ---- WEEK-BY-WEEK PROTOCOLS (research informed) ---------------- */
const PROTOCOLS = {
  gut: [
    { range:"Weeks 1 to 2", title:"Reset: Remove the Root Disruptors",
      steps:["Eliminate sugary drinks entirely; replace with water or herbal tea.","Remove refined white flour products for this period.","Begin one serving of fermented food daily (sauerkraut, kefir, or plain yogurt).","Eat slowly and chew every bite thoroughly."],
      evidence:"Ludwig et al. 2021 (BMJ): reducing refined carbohydrates significantly improved gut bacterial diversity within 2 weeks. Hall et al. 2019 (NIH, randomized crossover): ultra-processed diet caused participants to consume 508 more calories per day and gain weight vs. an unprocessed diet matched for macronutrients.",
      herbs:["ginger","chamomile","fennel"] },
    { range:"Weeks 3 to 4", title:"Build: Feed the Microbiome",
      steps:["Add prebiotic foods daily: garlic, onion, oats, bananas, Jerusalem artichoke.","Try slippery elm tea or powder 20 minutes before meals.","Add bone broth 3 times per week to begin supporting the gut lining.","Continue fermented food daily; aim for 2 to 3 different types across the week."],
      evidence:"Sonnenburg et al. 2021 (Cell): 10-week high fermented food diet increased microbiome diversity by 19% and reduced 19 inflammatory proteins significantly vs. placebo. High fiber diet also independently increased diversity.",
      herbs:["slippery-elm","marshmallow","dandelion"] },
    { range:"Weeks 5 to 8", title:"Sustain: Heal and Maintain",
      steps:["Maintain fermented food as a daily non-negotiable habit.","Test tolerance to common triggers one at a time (dairy, gluten, FODMAP foods).","Add peppermint tea or enteric oil capsules if IBS type symptoms persist.","Establish bone broth as a weekly routine."],
      evidence:"Khanna and MacDonald 2014 (Journal of Clinical Gastroenterology, meta-analysis): enteric coated peppermint oil produced significant IBS symptom improvement in 75% of patients vs. 38% placebo. General usage: regular fermented food consumption is the best supported dietary intervention for microbiome diversity.",
      herbs:["peppermint","dgl-licorice","gentian"] },
  ],
  nutrition: [
    { range:"Weeks 1 to 2", title:"Audit: See What You Are Actually Eating",
      steps:["Log every meal for 3 days without changing anything; awareness comes first.","Identify and remove one category of ultra-processed food this week (sugary drinks are the highest priority).","Read ingredient labels: if there are more than 5 unrecognizable ingredients, phase it out.","Eat at least one meal each day that is fully cooked from real, whole ingredients."],
      evidence:"Hall et al. 2019 (NIH clinical trial, randomized crossover): ultra-processed food caused significant caloric overconsumption and weight gain even when meals were matched for macronutrients, proteins, and sugars. The processing itself drove the damage.",
      herbs:["moringa","nettle"] },
    { range:"Weeks 3 to 4", title:"Replace: Real Food, Original Grains",
      steps:["Replace one refined grain product per week with true sourdough (minimum 4-hour ferment), sprouted grain, or einkorn.","Build plates using 5 colors: green (leafy), red or purple (berries, beets), orange or yellow (sweet potato, pepper), white or allium (garlic, onion), and dark protein.","Switch primary cooking fat to extra virgin olive oil or butter; remove refined seed oils.","Add mineral rich foods weekly: sardines, pumpkin seeds, dark leafy greens."],
      evidence:"PREDIMED trial (Estruch et al. 2013, NEJM): Mediterranean style whole food diet reduced major cardiovascular events by 30% vs. low fat diet. Hurrell et al. 2003 (British Journal of Nutrition): soaking, sprouting, and sourdough fermentation reduces phytic acid by up to 50%, improving mineral bioavailability.",
      herbs:["turmeric","spirulina"] },
    { range:"Weeks 5 to 8", title:"Sustain: Deep Nourishment",
      steps:["Establish original grain preparation as a household norm (sourdough, sprouted, or soaked).","Reduce added sugar to under 25g per day (WHO recommendation).","Introduce organ meats or high quality supplements to address nutrient gaps.","Cook together as a family at least 3 times per week."],
      evidence:"General usage: original grain preparation (soaking, sprouting, fermentation) reduces antinutrients and improves mineral absorption across multiple nutritional studies. The return to whole, minimally processed food is the single most impactful dietary change supported by population health data.",
      herbs:["moringa","nettle","ginger"] },
  ],
  inflammation: [
    { range:"Weeks 1 to 2", title:"Remove: Cut the Root Drivers",
      steps:["Remove refined seed oils (soybean, corn, canola, vegetable oil); replace with olive oil, butter, or coconut oil.","Cut all sugary beverages including fruit juice and sports drinks.","Begin protecting sleep: set a consistent bedtime and reduce screens 1 hour before bed.","Add one anti-inflammatory food daily: fatty fish, berries, or turmeric with black pepper."],
      evidence:"DiNicolantonio and O'Keefe 2018 (Open Heart): refined seed oils have omega-6 to omega-3 ratios of 15:1 to 50:1, driving systemic inflammatory pathways. Spreadbury 2012 (Gut Microbes): acellular carbohydrates (flour and sugar) promote inflammatory gut bacteria independent of calories.",
      herbs:["ginger","turmeric"] },
    { range:"Weeks 3 to 4", title:"Build: Anti-Inflammatory Nutrition",
      steps:["Add fatty fish (salmon, sardines, mackerel) at least 3 times per week.","Add 1 tsp turmeric with a pinch of black pepper to one meal daily.","Add tart cherry or mixed berries for anthocyanin content.","Begin boswellia standardized extract if joint discomfort is a concern."],
      evidence:"Calder 2017 (Nutrients, meta-analysis): omega-3 fatty acids (EPA and DHA) significantly reduce TNF-alpha, IL-6, and CRP across multiple controlled trials. Aggarwal and Harikumar 2009 (Biochemical Pharmacology): curcumin suppresses NF-kB, the master regulator of inflammatory gene expression.",
      herbs:["turmeric","boswellia","green-tea"] },
    { range:"Weeks 5 to 8", title:"Sustain: Protect the Gains",
      steps:["Treat sleep as medicine: 7 to 9 hours is non-negotiable.","Establish daily movement (even a 20 minute walk makes a measurable difference).","Consider asking your provider to test CRP (C-reactive protein) to track your progress.","Continue omega-3 rich foods and olive oil as permanent dietary anchors."],
      evidence:"Irwin 2019 (Sleep): one night of partial sleep deprivation (4 hours) activates NF-kB inflammatory pathways. Consistent sleep is among the most powerful anti-inflammatory interventions available. Regular moderate exercise has been shown to reduce CRP by 20 to 30% in multiple trials.",
      herbs:["rosemary","devils-claw","ginger"] },
  ],
  detox: [
    { range:"Weeks 1 to 2", title:"Foundation: Support Your Body's Own Pathways",
      steps:["Drink a minimum of 8 cups of water daily.","Eat cruciferous vegetables (broccoli, cauliflower, kale, Brussels sprouts) every day.","Add beets 3 times per week to support bile flow.","Move your body daily to produce sweat; skin is a detox organ."],
      evidence:"Fahey and Talalay 1999 (PNAS): cruciferous vegetables provide glucosinolates that upregulate Phase 2 liver detoxification enzymes. General usage: the liver processes toxins through Phase 1 (cytochrome P450) and Phase 2 (conjugation) pathways; food is the primary support for both.",
      herbs:["dandelion","milk-thistle"] },
    { range:"Weeks 3 to 4", title:"Build: Targeted Liver and Bitter Support",
      steps:["Add bitter greens to every meal (arugula, dandelion, radicchio, endive).","Begin milk thistle standardized extract (silymarin) daily.","Eliminate alcohol completely during this phase.","Reduce all processed food to reduce the liver's total burden."],
      evidence:"Polyak et al. 2010 (Hepatology): silymarin (milk thistle active compound) demonstrated hepatoprotective effects and reduced liver enzyme elevation in multiple trials. Traditional usage: bitter herbs stimulate bile production and digestive secretions, supporting liver clearing (documented across European and Chinese herbal traditions).",
      herbs:["milk-thistle","burdock","dandelion"] },
    { range:"Weeks 5 to 8", title:"Seasonal Cleanse (Under Practitioner Guidance Only)",
      steps:["Do not proceed with the cleansing trio without a practitioner and without a binder.","Begin the binder protocol first: activated charcoal, bentonite clay, or psyllium husk, taken away from food and medicines.","Traditional trio: black walnut hull, wormwood, and clove used together to address all parasite life stages.","Maintain high hydration, fiber, and a low sugar diet throughout."],
      evidence:"Traditional usage: the classic tri-herb protocol is described across multiple folk herbal traditions to address parasite eggs (clove), larvae and adults (wormwood), and adult worms (black walnut hull). Clinical trial data in healthy humans is limited; evidence is primarily traditional and preclinical. Always confirm suspected infection with a stool test.",
      herbs:["black-walnut","wormwood","clove"],
      caution:true },
  ],
  energy: [
    { range:"Weeks 1 to 2", title:"Foundation: Anchor Your Circadian Rhythm",
      steps:["Set a consistent sleep and wake time and hold it even on weekends (within 30 minutes).","Get outdoors within 1 hour of waking for 10 to 15 minutes of natural light exposure.","No caffeine after noon.","Cut screen brightness after sunset and stop screens 1 hour before bed."],
      evidence:"Panda et al. (Salk Institute, multiple studies on circadian biology): consistent morning light exposure anchors cortisol and melatonin cycles, which governs energy across the entire day. Disrupted circadian rhythm is directly associated with fatigue, weight gain, and mood dysregulation.",
      herbs:["oats","tulsi"] },
    { range:"Weeks 3 to 4", title:"Build: Adaptogenic Support and Fuel",
      steps:["Begin ashwagandha (standardized KSM-66 or Sensoril extract) morning and evening.","Add protein to every meal to stabilize blood glucose and sustain energy.","Begin strength or resistance training 2 times per week.","Rhodiola can be added in the morning if mental fatigue is a specific concern."],
      evidence:"Chandrasekhar et al. 2012 (IPGT Journal, double-blind RCT, 60 days): ashwagandha 300mg twice daily significantly reduced serum cortisol and stress scores vs. placebo. Shevtsov et al. 2003 (Phytomedicine): single dose rhodiola improved mental performance under stress in a double-blind crossover trial.",
      herbs:["ashwagandha","rhodiola","tulsi"] },
    { range:"Weeks 5 to 8", title:"Sustain: Build Resilience for the Long Term",
      steps:["Maintain your sleep anchor, morning light, and exercise as non-negotiable foundations.","Do an honest energy audit: what is draining you that is not physical (digital load, toxic relationships, mental load)?","Add ginseng if sustained energy is still needed; take for no more than 6 weeks at a time.","Review iron, B12, and vitamin D levels with your provider if fatigue persists."],
      evidence:"General usage: regular strength training improves mitochondrial function and cellular energy production across multiple exercise physiology studies. Ashwagandha and rhodiola have the strongest adaptogen evidence bases; ginseng is well documented in traditional usage with emerging clinical support.",
      herbs:["ginseng","maca","oats"] },
  ],
  mindset: [
    { range:"Weeks 1 to 2", title:"Foundation: Engage the Body's Calming System",
      steps:["5 to 10 minutes of prayer each morning before the day begins.","Name 3 things you are grateful for aloud or in writing each day.","Eliminate one source of digital noise this week (a social media account, a news feed, or a notification).","Cut caffeine after noon; it keeps the nervous system in an elevated state."],
      evidence:"Benson and Klipper (Harvard Medical School): the relaxation response, triggered by prayer and focused quiet practice, measurably reduces cortisol, blood pressure, and heart rate. This research predates most modern stress-reduction studies and was conducted under rigorous clinical conditions.",
      herbs:["lemon-balm","chamomile"] },
    { range:"Weeks 3 to 4", title:"Build: Herbal Support and Community",
      steps:["Add chamomile or lemon balm tea each evening.","Commit to one real meal or gathering with others each week; community is medicine.","Limit news consumption to once per day, maximum 20 minutes.","In moments of tension, return to scripture and prayer; cast your care on the Lord (1 Peter 5:7)."],
      evidence:"Kennedy et al. 2004 (Psychosomatic Medicine, double-blind): lemon balm 300mg twice daily significantly reduced anxiety and improved mood vs. placebo. Woelk and Schlafke 2010: oral lavender oil capsule reduced anxiety scores non-inferiorly to lorazepam without sedation or dependency risk.",
      herbs:["lavender","lemon-balm","passionflower","chamomile"] },
    { range:"Weeks 5 to 8", title:"Sustain: Long-Term Resilience",
      steps:["Evaluate sleep quality; poor sleep and poor mental health are bidirectional.","Continue daily prayer as a covenant practice, not a crisis response.","Consider ashwagandha if long term stress or adrenal fatigue is suspected.","Explore who in your life needs encouragement; giving measurably reduces anxiety."],
      evidence:"Chandrasekhar et al. 2012: ashwagandha showed significant improvement in General Health Questionnaire anxiety and depression scores at 8 weeks. Harvard Study of Adult Development (80+ years of data): quality relationships are the single strongest predictor of long-term mental health and longevity.",
      herbs:["ashwagandha","skullcap","st-johns-wort"] },
  ],
  spiritual: [
    { range:"Weeks 1 to 2", title:"Establish the Covenant Foundation",
      steps:["Begin each morning with scripture before anything else: Exodus 15:26, Psalm 103, Isaiah 53.","Establish a prayer practice that includes thanksgiving, intercession, and listening.","Identify any known burden, unforgiveness, or anxiety you are carrying alone. Philippians 4:6 is the model.","Declare the name Yahweh Rapha over your household this week."],
      evidence:"Exodus 15:26: I am Yahweh Rapha, the Lord who heals you. This is not a metaphor; it is a covenant promise. Isaiah 53:5: by His stripes we are healed. The foundation of this protocol is establishing daily communication with the Healer Himself.",
      herbs:["frankincense","hyssop"] },
    { range:"Weeks 3 to 4", title:"Build: Sabbath and Stewardship",
      steps:["Keep a full day of rest each week, not productivity or errands, but actual rest.","Identify one habit or substance that is not serving your body. Bring it to Yahweh in prayer, then take one concrete step away from it.","Practice Philippians 4:8 intentionally: think on things that are true, noble, right, pure, lovely, and admirable.","Add frankincense to your prayer or worship environment."],
      evidence:"Kivimaki et al. (Lancet): chronic overwork without rest is a significant predictor of cardiovascular disease and depression. The Sabbath commandment predates modern medicine by thousands of years and has been repeatedly vindicated by contemporary rest and recovery science.",
      herbs:["frankincense","myrrh"] },
    { range:"Weeks 5 to 8", title:"Walk in the Healing",
      steps:["Consider a prayerful fast (consult your provider if on any medication); Mark 9:29 establishes fasting as a covenant discipline.","Memorize and pray healing scriptures: Psalm 91, Psalm 103:1 to 5, and Isaiah 40:29 to 31.","Bring your family's health before Yahweh together in prayer each week.","Use hyssop tea or frankincense as a sensory reminder that worship and wellness are not separate."],
      evidence:"Multiple peer-reviewed trials show metabolic benefits of intermittent fasting, but its biblical purpose is intimacy with Yahweh. Fasting, prayer, and scripture engagement reduce cortisol and activate parasympathetic nervous system responses across multiple studies on contemplative practice.",
      herbs:["hyssop","myrrh","frankincense"] },
  ],
};

/* ---- NUTRIENTS ------------------------------------------------- */
const NUTRIENTS = [
  {id:"iron",   name:"Iron",                   kind:"Mineral",role:"Carries oxygen in the blood (hemoglobin) and supports energy production.",           low:"Fatigue and weakness, pale skin, breathlessness on exertion, cold hands and feet, brittle nails, restless legs, and cravings for ice or non foods (pica).", food:["Red meat and liver","Lentils and beans","Spinach","Pumpkin seeds","Fortified grains"],                       caution:"Pair plant iron with vitamin C to absorb it. Iron supplements are a leading cause of poisoning in young children; never supplement without testing."},
  {id:"zinc",   name:"Zinc",                   kind:"Mineral",role:"Immune defense, wound healing, taste and smell, skin, and hormones.",                  low:"Frequent infections, slow healing wounds, hair thinning, loss of taste or smell, and skin problems.",                                                         food:["Oysters and shellfish","Meat","Pumpkin seeds","Chickpeas","Cashews"],                                       caution:"High dose zinc over time depletes copper; balance matters."},
  {id:"magnesium",name:"Magnesium",             kind:"Mineral",role:"Hundreds of enzyme reactions, muscle and nerve function, sleep, and heart rhythm.",    low:"Muscle cramps or twitches, fatigue, poor sleep, anxiety or irritability, and palpitations.",                                                                  food:["Leafy greens","Nuts and seeds","Beans","Dark chocolate","Whole grains"]},
  {id:"calcium",name:"Calcium",                kind:"Mineral",role:"Bones and teeth, plus muscle and nerve signaling.",                                      low:"Long term low intake weakens bones. Short term signs include muscle cramps and numbness or tingling.",                                                        food:["Dairy","Leafy greens (kale, collards)","Sardines","Fortified plant milks","Tofu"],                          caution:"Needs vitamin D to be absorbed well."},
  {id:"potassium",name:"Potassium",             kind:"Mineral",role:"Fluid balance, healthy blood pressure, and muscle and heart function.",                 low:"Weakness and fatigue, muscle cramps, constipation, and palpitations.",                                                                                          food:["Bananas","Potatoes","Beans","Avocado","Leafy greens"]},
  {id:"iodine", name:"Iodine",                  kind:"Mineral",role:"Raw material for thyroid hormones that regulate metabolism.",                           low:"Fatigue, weight gain, sensitivity to cold, and thyroid swelling (goiter).",                                                                                  food:["Iodized salt","Seaweed","Fish and seafood","Dairy","Eggs"],                                                 caution:"Especially important in pregnancy for the baby's brain development."},
  {id:"selenium",name:"Selenium",               kind:"Mineral",role:"Antioxidant defense and thyroid support.",                                              low:"Fatigue, weakened immunity, and thyroid dysfunction.",                                                                                                          food:["Brazil nuts (1 to 2 daily is plenty)","Fish","Eggs","Sunflower seeds"],                                    caution:"Toxic in excess; do not overdo Brazil nuts."},
  {id:"copper",  name:"Copper",                 kind:"Mineral",role:"Works with iron, builds connective tissue, and supports nerve function.",                low:"Anemia that does not respond to iron, low white blood cells, and bone or nerve issues.",                                                                       food:["Shellfish","Nuts and seeds","Organ meats","Dark chocolate"]},
  {id:"vita",    name:"Vitamin A",               kind:"Vitamin",role:"Vision (especially at night), immune function, and skin integrity.",                   low:"Night blindness, dry eyes, dry skin, and more frequent infections.",                                                                                          food:["Liver","Eggs and dairy","Carrots and sweet potato (beta carotene)","Spinach"],                              caution:"Preformed vitamin A is toxic in excess; do not supplement in high doses in pregnancy."},
  {id:"vitb1",   name:"Vitamin B1 (Thiamine)",   kind:"Vitamin",role:"Converts carbohydrates into energy and supports nerve function.",                       low:"Fatigue, irritability, poor appetite, and nerve tingling.",                                                                                                    food:["Whole grains","Pork","Legumes","Sunflower seeds"]},
  {id:"vitb2",   name:"Vitamin B2 (Riboflavin)", kind:"Vitamin",role:"Energy production and healthy skin and eyes.",                                          low:"Cracks at the corners of the mouth, sore lips and tongue, and sensitivity to light.",                                                                         food:["Dairy","Eggs","Lean meat","Almonds","Greens"]},
  {id:"vitb3",   name:"Vitamin B3 (Niacin)",     kind:"Vitamin",role:"Energy metabolism, skin, and nerve function.",                                          low:"Severe deficiency causes pellagra: skin rash, digestive upset, and confusion.",                                                                                food:["Meat and fish","Peanuts","Whole grains"],                                                                   caution:"High dose niacin can cause flushing and stress the liver."},
  {id:"vitb6",   name:"Vitamin B6",              kind:"Vitamin",role:"Protein metabolism, brain chemistry, and mood regulation.",                             low:"Irritability or low mood, confusion, mouth sores, and a form of anemia.",                                                                                      food:["Poultry and fish","Potatoes","Chickpeas","Bananas"],                                                        caution:"Very high doses over time can cause nerve damage."},
  {id:"vitb9",   name:"Vitamin B9 (Folate)",     kind:"Vitamin",role:"Builds DNA and red blood cells; vital in early pregnancy.",                             low:"Fatigue, mouth sores, and large cell anemia; low folate in pregnancy raises the risk of neural tube defects.",                                                 food:["Leafy greens","Legumes","Citrus","Fortified grains"],                                                       caution:"Particularly important before and during pregnancy."},
  {id:"vitb12",  name:"Vitamin B12",             kind:"Vitamin",role:"Nerve health, red blood cell production, and energy.",                                  low:"Fatigue, tingling or numbness, memory and mood changes, and anemia.",                                                                                          food:["Meat and fish","Eggs","Dairy","Fortified foods (for plant based diets)"],                                   caution:"Vegans and many older adults are at higher risk and may need to supplement."},
  {id:"vitc",    name:"Vitamin C",               kind:"Vitamin",role:"Builds collagen, acts as antioxidant, helps absorb iron, and supports immunity.",       low:"Easy bruising, bleeding gums, slow wound healing, and fatigue (scurvy when severe).",                                                                           food:["Citrus","Berries","Bell peppers","Broccoli","Kiwi"]},
  {id:"vitd",    name:"Vitamin D",               kind:"Vitamin",role:"Calcium regulation and bone health, immune function, and mood.",                        low:"Bone or muscle aches, weakness, fatigue, low mood, and frequent illness; rickets in children.",                                                                food:["Sunlight on skin","Fatty fish","Egg yolk","Fortified foods"],                                               caution:"Fat soluble and can build up; test levels before taking high doses."},
  {id:"vite",    name:"Vitamin E",               kind:"Vitamin",role:"Antioxidant that protects cell membranes.",                                             low:"Rare, but can cause nerve and muscle weakness and vision problems.",                                                                                           food:["Nuts and seeds","Vegetable oils","Leafy greens"],                                                           caution:"High doses may increase bleeding risk."},
  {id:"vitk",    name:"Vitamin K",               kind:"Vitamin",role:"Blood clotting and bone health.",                                                       low:"Easy bruising and slow clotting.",                                                                                                                             food:["Leafy greens","Broccoli","Brussels sprouts"],                                                               caution:"Interacts with blood thinning medicine; keep intake consistent and tell your doctor."},
];

/* ---- MASTER BLEND ---------------------------------------------- */
const MASTER_BLEND = {
  name: "Restoruh Master Blend",
  tagline: "Vitamin A, C, E, Zinc and B Complex with Gut Balance",
  purpose: "A nutrient-dense herbal blend covering the broadest spectrum of essential vitamins, minerals, and gut-healing actions available from whole plants. Two versions: a full adult formula and a simplified, infant-safe light infusion from 7 months onward.",

  adultHerbs: [
    { id:"moringa",   role:"Nutritional anchor",   nutrients:"Vitamins A, C, E, B1, B2, B3, B6, zinc, iron, calcium, magnesium. Gram for gram, 7x the vitamin C of oranges and 4x the vitamin A of carrots.",          gut:"Anti-inflammatory, supports gut lining integrity, mild prebiotic." },
    { id:"nettle",    role:"Mineral and B complex", nutrients:"Vitamins A, C, K, iron, zinc, magnesium, silica, B complex.",                                                                                               gut:"Gentle gut tonic, anti-inflammatory, prebiotic fiber." },
    { id:"aloe",      role:"Skin and gut healer",   nutrients:"Vitamins A, C, E, B12, folic acid, zinc.",                                                                                                                  gut:"Soothes and repairs gut lining, reduces leaky gut, anti-inflammatory." },
    { id:"chamomile", role:"Gut and skin calming",  nutrients:"Flavonoids, vitamin C, calcium.",                                                                                                                           gut:"Antispasmodic, anti-inflammatory, relieves gut cramping and bloating." },
    { id:"fennel",    role:"Carminative",           nutrients:"Vitamin C, potassium, B vitamins, calcium.",                                                                                                                gut:"Relieves gas and bloating, supports smooth muscle relaxation." },
    { id:"ginger",    role:"Gut motility and B6",   nutrients:"Vitamin C, B6, magnesium, potassium.",                                                                                                                      gut:"Stimulates digestive motility, anti-nausea, anti-inflammatory in the gut lining." },
    { id:"spirulina", role:"B12 and zinc booster",  nutrients:"Full B complex including B12 (rare in plants), zinc, beta-carotene (vitamin A), vitamin E, iron.",                                                         gut:"Prebiotic, supports beneficial bacteria, anti-inflammatory." },
  ],

  infantHerbs: [
    { id:"moringa",   role:"Nutritional anchor",   note:"Leaf only, from a verified contaminant-free source. Widely used by WHO and UNICEF for infant nutrition in deficiency contexts." },
    { id:"chamomile", role:"Gut and skin calming", note:"Among the most well established infant herbs. Classic for colic, gut cramping, and irritated skin. Safe from 6 months onward." },
    { id:"fennel",    role:"Carminative",          note:"Fennel seed or leaf infusion is a traditional infant colic remedy with a strong safety record from early infancy." },
    { id:"nettle",    role:"Minerals and vitamin A",note:"Mineral-rich nutritive herb. At 5ml of a dilute infusion, the dose is very conservative and well tolerated." },
    { id:"ginger",    role:"Digestive support",    note:"A very small pinch only. Ginger should be present as a trace in infant preparations, not a dominant note." },
  ],

  adultPrep: {
    label: "Adult preparation (strong tea)",
    steps: [
      "Combine equal parts dried moringa leaf, nettle, and chamomile as the base (2 parts each).",
      "Add 1 part each of fennel seeds, ginger root (dried), and spirulina powder.",
      "Aloe vera gel (1 tsp) can be stirred into a cooled cup rather than boiled.",
      "Steep 1 heaping teaspoon of the dry blend per cup of boiling water for 12 to 15 minutes covered.",
      "Strain well. Drink 1 cup daily, or up to 3 cups if addressing active gut or skin inflammation.",
      "Spirulina: buy only from a verified third-party tested source (NSF, USP, or equivalent certified).",
    ],
  },

  infantPrep: {
    label: "Infant preparation (light infusion, 7 months and up)",
    steps: [
      "Combine: 2 parts dried moringa leaf, 2 parts chamomile, 1 part fennel seed, 1 part nettle, a very small pinch of dried ginger.",
      "Use 1/4 teaspoon of the dry blend per 1 full cup (240ml) of hot water. This is a light infusion, not a strong decoction.",
      "Steep covered for 8 minutes. Strain twice through a fine mesh to remove all plant material.",
      "Cool completely to room temperature before giving to the infant.",
      "Give 5ml (1 teaspoon) once daily by spoon or added to a small amount of food.",
      "Begin with 2.5ml for the first 3 days to watch for any reaction before increasing to the full 5ml.",
    ],
    cautions: [
      "Spirulina and alfalfa are NOT in the infant version. Spirulina quality risk and alfalfa saponin concentration in strong tea are not appropriate at this age.",
      "Moringa must be leaf only from a verified, contaminant-tested source. Avoid root, bark, or seed in infants.",
      "Stop immediately if you notice rash, unusual fussiness, loose stool beyond normal, or any sign of allergic reaction.",
      "Do not give to infants with known allergy to any member of the daisy family (chamomile), carrot family (fennel), or nettle family.",
      "Always consult your pediatric provider before introducing herbal preparations to an infant, especially one with an existing health condition or who is on any medication.",
      "This is educational guidance. It does not replace the assessment of a qualified practitioner.",
    ],
  },

  nutrients: {
    a:    "Moringa, nettle, aloe vera (beta-carotene form in plant sources)",
    c:    "Moringa, chamomile, fennel, ginger (moringa is the primary driver)",
    e:    "Moringa, nettle, aloe vera",
    zinc: "Moringa, nettle, spirulina (adult only)",
    b:    "Moringa (B1, B2, B3, B6), nettle (B complex), spirulina (adult: full B complex including B12), ginger (B6)",
  },

  skin: "Aloe vera directly heals and soothes the skin barrier. Chamomile reduces skin inflammation systemically. Nettle addresses histamine-driven skin reactions. Moringa supports collagen synthesis via vitamin C and zinc.",
  faith: "Psalm 139:14, fearfully and wonderfully made. Every system of the body, from the gut to the skin, reflects intentional design. These plants, placed here by the Creator, work in concert with that design.",
};

/* ---- GUT HEALTH DATA ------------------------------------------- */
const GUT_HEALTH = {
  intro: "The gut is not a digestive organ. It is the control center of immunity, mood, energy, skin, and brain function. Modern food systems have disrupted the microbial ecosystem that humanity spent thousands of years building, and the consequences show up in almost every chronic disease pattern we see today.",

  microbiome: {
    what: "The gut microbiome is a community of approximately 100 trillion microorganisms, including bacteria, fungi, viruses, and protozoa, living primarily in the large intestine. It weighs roughly 1 to 2 kilograms and contains more genetic material than the rest of the human body combined.",
    why: "This microbial community regulates immune response (70% of immune cells live in the gut lining), produces neurotransmitters including 90% of the body's serotonin, manufactures B vitamins and vitamin K, breaks down plant compounds the body cannot digest alone, and maintains the integrity of the gut wall that keeps pathogens out of the bloodstream.",
    diversity: "Diversity is the single most important measure of gut health. Studies consistently show that low microbial diversity correlates with obesity, autoimmune disease, depression, type 2 diabetes, eczema, and inflammatory bowel disease. Sonnenburg et al. 2021 (Cell) demonstrated that a high-fermented-food diet increased microbiome diversity markers and reduced 19 inflammatory proteins in 10 weeks.",
    destruction: "Ultra-processed food, antibiotics (necessary in emergencies but destructive to microbiome), chronic stress, insufficient sleep, and low-fiber diets are the primary drivers of microbial loss. The average person in a modernized country has lost approximately one third of their ancestral microbiome species over two to three generations.",
    research: "NIH Human Microbiome Project (2012): first comprehensive map of the human microbiome, identifying over 10,000 microbial species. Tim Spector (British Gut Project, King's College London): the most diverse microbiomes are associated with diets containing 30+ different plant species per week.",
  },

  microbes: [
    { type:"Bacteria", role:"The gut workforce", color:"#3f7d4f", desc:"Bacteria are the most populous residents of the gut. Good strains (Lactobacillus, Bifidobacterium, Akkermansia) produce short-chain fatty acids, train the immune system, and crowd out pathogens. Bad strains (E. coli in excess, Clostridioides difficile) can drive inflammation and disease. Balance between the two is the goal. Antibiotics kill both indiscriminately, which is why rebuilding the microbiome after a course is critical.", practical:"Rebuild with fermented foods: kefir, yogurt, kimchi, sauerkraut, miso, natto. Feed good strains with prebiotic fiber." },
    { type:"Fungi", role:"The gut tenants", color:"#b9892f", desc:"Candida albicans lives in most guts in small amounts and causes no harm in a balanced microbiome. When bacteria are depleted (by antibiotics, sugar, alcohol) Candida overgrows, producing a biofilm that drives bloating, brain fog, sugar cravings, and recurring infections. Other gut fungi are less studied but increasingly understood to influence immunity.", practical:"Control with reduced sugar and refined flour, pau d'arco, garlic, and rebuilding bacterial populations to crowd it out." },
    { type:"Parasites", role:"Unwanted guests", color:"#9a3d2f", desc:"Most people carry subclinical parasitic loads without knowing it. Parasites in the gut consume nutrients, disrupt the gut lining, drive cravings for sugar (which they feed on), and release toxins when they die. Giardia, pinworms, roundworms, and Blastocystis hominis are among the most commonly undiagnosed. Diagnosis requires a comprehensive stool test, not a standard GP panel.", practical:"Sugar reduction starves them. Periodic traditional cleansing under practitioner guidance. See the Cleansing section for the full protocol." },
    { type:"Viruses (Phages)", role:"The microbial regulators", color:"#6f6a5c", desc:"The gut also contains trillions of bacteriophages, viruses that infect and regulate bacterial populations. This virome is understudied but increasingly recognized as critical to microbiome balance. The virome is disrupted by many of the same factors that harm bacteria.", practical:"Less actionable but a reason for healthy overall lifestyle: sleep, low stress, whole foods, and avoiding unnecessary antibiotic exposure." },
  ],

  biotics: {
    pre: {
      what: "Prebiotics are non-digestible plant fibers and compounds that pass through the upper gut undigested and arrive in the colon as food for beneficial bacteria. You cannot simply take probiotics and expect them to thrive without adequate prebiotics. The bacteria need to eat.",
      sources: ["Garlic and onion (fructooligosaccharides)", "Oats and barley (beta-glucan)", "Green bananas and cooled cooked potato (resistant starch)", "Chicory root and Jerusalem artichoke (inulin)", "Leeks, asparagus, and dandelion greens", "Apples and pears (pectin)"],
      research: "Roberfroid et al. 2010 (British Journal of Nutrition): prebiotic intake significantly increased Bifidobacterium populations, reduced pathogenic bacteria, and improved calcium and magnesium absorption.",
    },
    pro: {
      what: "Probiotics are live beneficial microorganisms that, when consumed in adequate amounts, confer a health benefit. Not all probiotic products are equal. Strain specificity matters: Lactobacillus rhamnosus GG behaves differently from Lactobacillus acidophilus. Fermented whole foods deliver more diverse and often more resilient strains than most capsules.",
      sources: ["Plain kefir (15 to 30 billion CFU per cup)", "Traditional yogurt with live cultures", "Kimchi (Lactobacillus kimchii and others)", "Sauerkraut (raw, unpasteurized only)", "Miso paste (Aspergillus oryzae)", "Natto (Bacillus subtilis)", "Kvass and fermented porridges across cultures"],
      research: "Marco et al. 2021 (Cell Host and Microbe): fermented whole foods deliver higher microbial diversity, more resilient colonization, and greater immune benefit than most commercial probiotic supplements at typical doses.",
    },
    post: {
      what: "Postbiotics are the bioactive compounds produced BY beneficial bacteria during fermentation. They are the reason the microbiome matters. Short-chain fatty acids (SCFAs) like butyrate, propionate, and acetate are the most studied postbiotics. Butyrate is the primary fuel source for colonocytes (gut lining cells), reduces gut inflammation, regulates blood sugar, and crosses the blood-brain barrier to influence mood and cognitive function.",
      sources: ["Butyrate: produced from fiber by Clostridiales and Firmicutes bacteria", "Propionate: produced from inulin fermentation, supports liver function", "Acetate: supports immune cell development", "Also produced: indoles, vitamins B12 and K2, bacteriocins (natural antibiotics)"],
      research: "Flint et al. 2012 (Nature Reviews Microbiology): butyrate regulates colonic inflammation, protects against colorectal cancer risk, and modulates the immune response at the gut lining. Cummings et al.: SCFA production is directly proportional to dietary fiber intake.",
    },
  },

  absorption: {
    problem: "A multivitamin taken with a damaged gut is largely wasted. The gut lining is the gateway through which every nutrient must pass to reach the bloodstream. When that lining is inflamed, porous (leaky gut), or stripped of its beneficial microbial coating, absorption fails regardless of what you take.",
    specifics: [
      "Fat-soluble vitamins A, D, E, and K require bile acids and healthy gut fat transport. Both depend on an intact gut lining and a diverse microbiome.",
      "B vitamins, particularly B12 and folate, are partly manufactured by gut bacteria themselves. Deplete the microbiome and you deplete your own B vitamin production.",
      "Iron requires an acidic gut environment and vitamin C pairing. Gut inflammation raises pH and disrupts iron absorption.",
      "Zinc and magnesium absorption require healthy intestinal transport proteins. Leaky gut and chronic inflammation impair these directly.",
      "Calcium requires vitamin D, which requires healthy fat absorption, which requires an intact gut lining. The chain breaks at the first link.",
    ],
    fasano: "Fasano 2012 (Clinical Reviews in Allergy and Immunology): intestinal permeability, or leaky gut, allows bacterial endotoxins and undigested food particles into the bloodstream, triggering systemic inflammation that disrupts every organ system including nutrient metabolism.",
    solution: "Heal the gut lining first. Slippery elm, marshmallow root, aloe vera, and bone broth rebuild the mucosal layer. Reduce dietary irritants. Establish diverse beneficial bacteria through fermented food. Then supplementation has a foundation to work from.",
  },

  gutBrain: {
    overview: "The gut contains 500 million neurons, more than the spinal cord, organized into what neuroscientists call the enteric nervous system or the second brain. It communicates bidirectionally with the brain via the vagus nerve, and what happens in the gut does not stay in the gut.",
    facts: [
      "90% of the body's serotonin, the primary mood-regulating neurotransmitter, is produced in the gut.",
      "Gut bacteria produce GABA, dopamine precursors, and other neuroactive compounds directly.",
      "The vagus nerve carries 80% of its signals upward, from gut to brain, not the other way around.",
      "Cryan et al. 2019 (Physiological Reviews): gut microbiome composition directly influences anxiety, depression, cognitive function, stress response, and social behavior.",
      "Depression and anxiety correlate more strongly with low microbiome diversity than with most other measurable factors.",
      "Gut inflammation produces cytokines that cross the blood-brain barrier and trigger neuroinflammation.",
    ],
    practical: "This is why addressing mental and emotional health through food works. It is not metaphorical. Improving the gut microbiome with fermented food, prebiotic fiber, and reduced processed sugar demonstrably improves mood, focus, and stress resilience. Prayer and time in the Word also reduce cortisol, which reduces gut inflammation: the connection works in both directions.",
  },

  foodFirst: {
    pyramid: "The traditional food pyramid was built around grain industry lobbying and was never particularly supported by nutritional science. It put refined grains at the base and buried vegetables, and it said nothing at all about the microbiome. A gut-first approach reorganizes everything.",
    principles: [
      "Build every meal around fiber and fermented foods first. These feed the microbiome and establish the conditions for everything else to be absorbed.",
      "Then add quality protein (animal or plant) for repair and neurotransmitter precursors.",
      "Then healthy fats for fat-soluble vitamins, brain function, and gut lining integrity.",
      "Complex carbohydrates come from the vegetables, legumes, and intact whole grains already in the meal, not from a separate pyramid tier.",
      "Ultra-processed food, refined sugar, and refined flour are not food groups. They are microbiome disruptors and should be treated as such.",
    ],
    cultures: "Every culture with a historical record of longevity built their food traditions around fermentation before the word probiotic existed. Korean kimchi, Japanese miso and natto, German sauerkraut, Eastern European kefir and kvass, Indian lassi and fermented idli and dosa batter, Ethiopian injera (fermented teff), West African fermented ogi and dawadawa, Middle Eastern labneh. These were not trends. They were survival technology built over generations through direct observation of what kept people well.",
  },

  affordability: {
    reality: "Produce prices in food deserts and low-income areas are genuinely higher than ultra-processed alternatives. This is a real problem and pretending otherwise is not helpful. But gut-first eating does not require buying the whole produce aisle. It requires buying the right things intentionally.",
    topValue: [
      { food:"Cabbage", why:"Cheapest source of fermentable fiber, makes sauerkraut at home for pennies.", cost:"Low" },
      { food:"Oats (rolled, not instant)", why:"Beta-glucan prebiotic, B vitamins, magnesium, gut motility.", cost:"Low" },
      { food:"Garlic and onion", why:"Highest prebiotic content of any common vegetable. Transform any dish.", cost:"Low" },
      { food:"Lentils and dried beans", why:"Fiber, protein, iron, folate, resistant starch. Far cheaper per gram than almost any food.", cost:"Very low" },
      { food:"Bananas (slightly underripe)", why:"Resistant starch that feeds Bifidobacterium. Ripe ones are higher sugar.", cost:"Low" },
      { food:"Potatoes (cooled after cooking)", why:"Cooling cooked potato converts starch to resistant starch, a powerful prebiotic.", cost:"Very low" },
      { food:"Plain yogurt or kefir", why:"Best affordable probiotic source. Store brands work.", cost:"Moderate" },
      { food:"Frozen spinach and frozen broccoli", why:"Frozen vegetables retain more nutrients than fresh shipped long distances and cost significantly less.", cost:"Low" },
      { food:"Eggs", why:"Complete protein, fat-soluble vitamin carriers, choline for gut lining.", cost:"Low" },
      { food:"Bone broth (homemade)", why:"Gelatin and collagen repair gut lining. Make from any cheap bones.", cost:"Very low" },
    ],
    strategy: "Buy whole, buy simple, buy what ferments. A weekly shop that covers gut health can center on oats, lentils, cabbage (raw or fermented), garlic, onion, bananas, frozen vegetables, eggs, and plain yogurt. These ten items cover prebiotic fiber, probiotic organisms, complete protein, fat-soluble vitamin carriers, and gut lining repair at lower total cost than a standard processed-food shop.",
  },

  herbs: ["slippery-elm","marshmallow","chamomile","ginger","fennel","dandelion","dgl-licorice","peppermint","gentian","milk-thistle"],
};

/* ---- TOXICITY, VIRAL LOAD, AND HEAVY METALS -------------------- */
const TOXICITY = {
  intro: "Three of the most under-discussed drivers of chronic illness are viral overload, heavy metal accumulation, and mineral dysregulation. They are invisible on standard lab panels, they mimic dozens of other conditions, and they share a common mechanism: they destabilize the immune system and increase gut permeability, which is why they so often show up as food sensitivities that seem to come from nowhere.",

  viralOverload: {
    what: "Viral load is the measurable quantity of a virus in the body, a standard medical concept in HIV, hepatitis B and C, and COVID-19. Viral overload, as the term is increasingly used in functional and integrative medicine, refers to a state in which multiple viruses, particularly members of the Herpesvirus family, are simultaneously active or reactivating, placing a chronic burden on the immune system that it cannot fully resolve.",
    virusFamily: "The herpesviruses are the most clinically relevant chronic viral contributors. Once acquired, they are never fully cleared. In a healthy immune system with adequate nutrients and rest, they remain latent. Epstein-Barr Virus (EBV) affects an estimated 95% of adults worldwide, usually as childhood mononucleosis. HHV-6 and Cytomegalovirus (CMV) are similarly widespread. Herpes Simplex 1 and 2 and Varicella-Zoster (shingles virus) complete the family. When the immune system is depleted by nutrient deficiency, chronic stress, sleep disruption, heavy metal accumulation, or repeated antibiotic use, these viruses reactivate.",
    symptoms: ["Chronic fatigue that does not improve with rest, often the hallmark of EBV or HHV-6 reactivation","Swollen lymph nodes or recurrent sore throats without identifiable bacterial cause","Brain fog and cognitive impairment, sometimes severe, linked to HHV-6 neurological activity","Unexplained muscle aches and joint pain","Persistent low-grade fever","Recurrent cold sores or shingles outbreaks (overt signs of herpesvirus activity)","Histamine intolerance and multiple new food sensitivities appearing simultaneously","Immune dysregulation including new autoimmune activity"],
    foodLink: "Chronic viral activity drives food sensitivity through two primary mechanisms. First, intestinal permeability: active viruses in the gut epithelium increase the leakiness of the gut lining, allowing partially digested food proteins into the bloodstream where they trigger immune responses. Second, molecular mimicry: some viral proteins share structural similarities with food proteins. An immune system trained to attack the virus can begin reacting to structurally similar food proteins, particularly gluten and casein. This is not an allergy in the traditional sense; it is an immune system that has lost the ability to distinguish clearly. Reactivation of EBV in particular has been linked to triggering autoimmune thyroid disease through exactly this mechanism.",
    research: "Kang et al. 2019 (Frontiers in Immunology): EBV reactivation directly induces immune dysregulation and has been linked to multiple autoimmune conditions including lupus, rheumatoid arthritis, multiple sclerosis, and Hashimoto's thyroiditis. Lim et al. (multiple studies): HHV-6 neurotropic activity is implicated in chronic fatigue syndrome and fibromyalgia. Fasano 2012 (Clinical Reviews in Allergy and Immunology): intestinal hyperpermeability is a documented mechanism by which chronic infection triggers autoimmunity. Important note: the broad application of viral overload theory to explain multiple symptoms simultaneously is a functional medicine construct. It has biological plausibility and growing research support, but it is not yet mainstream diagnostic medicine. Testing via antibody titers for EBV, CMV, HHV-6, and HSV can confirm chronic reactivation.",
    herbs: ["elderberry","lemon-balm","st-johns-wort","astragalus","licorice-root-antiviral","cat-s-claw","andrographis"],
    protocol: ["Do not attempt antiviral herb protocols during acute viral illness without guidance. These herbs support long-term immune modulation and viral suppression, not emergency treatment.","Glycyrrhizin (licorice root extract) is the most researched botanical with demonstrated activity against EBV, HSV, and other herpesviruses. Use standardized extract; avoid prolonged use of whole licorice at high doses.","Lemon balm (Melissa officinalis) has documented activity against HSV and CMV in vitro and clinical use for cold sores.","Elderberry and astragalus support immune surveillance and reduce the frequency of reactivation in people with chronic viral load.","Cat's Claw and Andrographis both have documented immune modulating and antiviral activity in published trials.","Nutritional foundation: vitamin D3 (optimal range 60 to 80 ng/mL), zinc (critical for viral suppression), selenium, lysine (competes with arginine which herpesviruses require).","Reduce arginine-rich foods during active reactivation: chocolate, nuts, peanuts, seeds. Increase lysine-rich foods: eggs, fish, legumes.","Manage triggers: sleep deprivation, emotional stress, UV exposure (sunlight triggers HSV), and nutritional depletion are the most common reactivation triggers."],
  },

  copper: {
    what: "Copper is an essential mineral required for immune function, iron metabolism, nerve myelination, and collagen synthesis. The problem is not copper itself but copper that is unbound, bioavailable in excess, and unbalanced by its primary antagonist, zinc. Excess bioavailable copper acts as a pro-oxidant, generating free radicals that damage brain tissue, disrupt neurotransmitter balance, and destabilize the immune response.",
    sources: ["Copper water pipes, especially older plumbing, can leach significant copper into drinking water","Copper IUDs (Paragard) are a documented and underacknowledged source of systemic copper elevation in women","Estrogen raises copper retention; hormonal contraceptives, perimenopause, and pregnancy all elevate copper","Vegetarian and vegan diets are often high in copper-rich foods (nuts, seeds, legumes, dark chocolate) while lower in zinc-rich foods (animal protein)","Copper cookware used without proper seasoning","Some multivitamins and supplements contain more copper than zinc, worsening the ratio","Chronic adrenal fatigue reduces ceruloplasmin, the protein that binds and neutralizes copper; unbound copper then accumulates"],
    symptoms: ["Anxiety, racing thoughts, and panic attacks, particularly those that worsen with hormonal changes","Estrogen dominance symptoms in women: this is often a copper-zinc imbalance presenting hormonally","Depression, particularly the type accompanied by emotional numbness or inability to feel calm","Brain fog, poor concentration, and memory difficulty","Hair loss in women","Skin conditions: psoriasis, eczema, acne with an inflammatory pattern","Joint pain and inflammation","Heightened sensitivity to foods and chemicals, particularly histamine-containing foods","In severe cases: psychosis, which is documented in Wilson's disease but can present subclinically in dysregulation"],
    wilsons: "Wilson's disease is the genetic form of copper accumulation disorder, caused by a mutation in the ATP7B gene that impairs copper excretion. It is clearly documented medical pathology and requires prescription chelation (D-penicillamine or trientine). Subclinical copper dysregulation, where copper accumulates without full Wilson's expression, is a concept primarily in functional medicine. It has biological plausibility, documented mechanisms, and documented correlations with the symptom clusters above, but it is not a recognized mainstream medical diagnosis. Testing: serum copper, serum ceruloplasmin, and urine copper. Hair tissue mineral analysis (HTMA) is used in functional medicine for the zinc-copper ratio.",
    research: "Sansone and Sansone 2011 (Innovations in Clinical Neuroscience): copper toxicity is associated with depression and psychosis in non-Wilson's cases. Pfeiffer and Braverman 1982: documented relationship between copper-zinc imbalance and schizophrenia and behavioral disorders. Walsh Research Institute: extensive HTMA data correlating copper overload with anxiety disorders, postpartum depression, and behavioral conditions in children. Important caveat: this body of research is not in mainstream clinical trials. It represents observational and clinical data from functional medicine practice.",
    protocol: ["Zinc is the primary corrective nutrient. Zinc and copper compete for absorption; adequate zinc supplementation under practitioner guidance reduces copper bioavailability. Do not self-dose zinc without testing; excessive zinc also causes problems.","Vitamin C: high dose vitamin C helps copper excretion and reduces oxidative damage from unbound copper","Molybdenum: trace mineral that competes with copper absorption. Included in some copper-lowering protocols","Manganese: works with zinc to displace excess copper","Reduce high-copper foods temporarily: dark chocolate, nuts (especially cashews), shellfish, organ meats, avocado","Improve adrenal function: adrenal insufficiency impairs ceruloplasmin production, which is required to bind and neutralize copper. Adaptogenic herbs (ashwagandha, rhodiola) and adequate B vitamins, particularly B6, support adrenal recovery","Liver support: milk thistle, dandelion, to support copper excretion via bile"],
  },

  mercury: {
    what: "Mercury is one of the most neurotoxic substances known, with no safe biological threshold established by the WHO or EPA. It exists in three forms: elemental mercury (liquid), inorganic mercury salts, and organic methylmercury, which is the most bioavailable and dangerous form. Methylmercury crosses both the blood-brain barrier and the placenta, making it particularly damaging to neurological development.",
    sources: ["Fish consumption: methylmercury bioaccumulates up the food chain. Highest risk: shark, swordfish, king mackerel, tilefish, bigeye tuna. Moderate risk: albacore tuna, striped bass, halibut. Safer: wild salmon, sardines, anchovies, herring (also highest in omega-3)","Dental amalgam fillings: are approximately 50% mercury by weight. They release mercury vapor continuously, with release amplified by chewing, grinding, and hot foods or drinks. The controversy over amalgam safety is ongoing, but multiple countries including the EU have restricted or banned their use, particularly in children and pregnant women","Occupational exposure: dentists, miners, industrial workers","Some traditional herbal medicines and skin-lightening creams manufactured outside regulated markets","Broken fluorescent light bulbs (elemental mercury)","Atmospheric deposition: coal burning plants deposit mercury that enters waterways and bioaccumulates"],
    symptoms: ["Neurological: tremors, memory loss, difficulty concentrating, mood instability (mercury vapor affects the same brain regions as emotional regulation)","Sensory: tingling or numbness in extremities, vision and hearing changes (nerve damage pattern)","Immune: increased autoimmune activity, unexplained inflammatory conditions, unusual food and chemical sensitivities","Digestive: gut dysbiosis and leaky gut, mercury disrupts the gut microbiome significantly","Fatigue that is disproportionate and unresponsive to rest","Kidney damage with chronic exposure (inorganic mercury is especially nephrotoxic)","In children and in utero: cognitive impairment, developmental delays, speech and language disorders"],
    selenium: "Selenium's relationship with mercury is one of the most important and best documented herb-adjacent interactions in toxicology. Selenium and mercury have an extremely high chemical affinity for each other. When mercury and selenium meet in body tissue, they form an inert, biologically inactive compound (mercury selenide) that the body can sequester safely. This means adequate selenium intake literally neutralizes mercury bioactivity. Fish that are high in mercury often also contain high selenium (wild salmon, tuna) which partially explains why populations eating a lot of fish do not necessarily show mercury toxicity proportional to their intake. Brazil nuts, seafood, and eggs are the best selenium sources.",
    research: "ATSDR (Agency for Toxic Substances and Disease Registry): comprehensive documentation of mercury health effects across all organ systems. Zahir et al. 2005 (Journal of Environmental Research): mercury's mechanisms of toxicity include oxidative stress, enzyme inhibition at sulfhydryl groups, mitochondrial dysfunction, and immune activation. Grotto et al. 2009: methylmercury and gut microbiome disruption, with direct evidence of dysbiosis caused by mercury exposure. Siblerud and Kienholz 1994: clinical study showing patients with amalgam fillings had significantly higher blood mercury, more health complaints, and improvement after amalgam removal. Kall et al. 2018: selenium supplementation as a protective strategy against mercury toxicity, multiple clinical studies reviewed.",
    protocol: ["Selenium first: ensure optimal selenium status (200 mcg daily from food, primarily Brazil nuts 1 to 2 per day, or supplementation) before any mercury mobilization protocol. Selenium provides direct mercury neutralization.","Reduce ongoing exposure: address fish choices using the EWG consumer guide or NRDC's mercury calculator. If amalgam removal is considered, it must be done by a biological dentist using SMART protocol (Safe Mercury Amalgam Removal Technique) to minimize mercury exposure during removal.","Chlorella: binds mercury and other heavy metals in the gut, preventing reabsorption. Multiple clinical studies support its use for mercury excretion. Start at low doses to avoid die-off symptoms.","Cilantro: traditionally used and some evidence for mobilizing mercury from tissues. Use WITH a binder (chlorella) as cilantro can mobilize metals that then need to be bound and excreted.","Garlic and NAC (N-Acetyl Cysteine, technically a supplement): sulfur-containing compounds that bind to mercury. Garlic contains allicin and multiple sulfhydryl compounds with documented mercury-binding capacity.","Vitamin C: high doses support glutathione production (the body's primary mercury-processing molecule) and antioxidant protection.","Milk thistle and dandelion: liver and kidney support for excretion pathways.","Medical testing: blood mercury for recent exposure, urine mercury for kidney excretion. Provoked urine challenge with DMSA or DMPS (pharmaceutical chelators used by integrative physicians) shows stored mercury better than unprovoked testing."],
  },

  heavyMetals: {
    overview: "Lead, cadmium, arsenic, aluminum, mercury, and copper in excess all share common mechanisms of damage: they displace essential minerals from their enzyme binding sites, generate oxidative stress, damage mitochondria, disrupt the gut microbiome, and increase intestinal permeability. The result is a body that cannot efficiently generate energy, regulate immunity, or absorb the nutrients it needs.",
    metals: [
      { name:"Lead", sources:"Old paint, lead pipes, some imported ceramics and foods, occupational exposure", effects:"Neurological damage at any level (no safe threshold). Displaces calcium and zinc. In children: cognitive impairment, reduced IQ, behavioral problems. In adults: cardiovascular disease, hypertension, kidney damage, memory decline. Lead stored in bone releases during pregnancy and menopause.", mineral:"Calcium, zinc, iron supplementation reduces lead absorption and mobilizes stored lead" },
      { name:"Cadmium", sources:"Cigarette smoke (major source), non-organic produce (cadmium in phosphate fertilizers), some imported rice", effects:"Accumulates in kidneys over decades. Causes kidney damage, bone demineralization (osteoporosis), and lung cancer risk with inhalation. Displaces zinc from multiple enzyme systems.", mineral:"Zinc strongly antagonizes cadmium. Selenium provides protection." },
      { name:"Arsenic", sources:"Well water in some regions, non-organic rice (rice absorbs arsenic efficiently), some imported herbs and spices, industrial exposure", effects:"Associated with cancers of the skin, bladder, and lung with chronic exposure. Cardiovascular disease, diabetes risk, peripheral neuropathy, and immune suppression.", mineral:"Selenium and zinc help; adequate glutathione is the primary protective mechanism." },
      { name:"Aluminum", sources:"Some antacids, aluminum cookware, processed foods with aluminum-containing additives, some antiperspirants, some vaccines historically", effects:"Association with Alzheimer's disease remains controversial but active. Accumulates in bone and brain tissue. Impairs mineralization of bone. Disrupts iron metabolism.", mineral:"Silicon (found in mineral water and horsetail herb) has been shown in some studies to facilitate aluminum excretion." },
    ],
    gutConnection: "Heavy metals damage the gut at multiple levels. They kill beneficial bacteria (particularly Lactobacillus and Bifidobacterium) while relatively sparing more metal-resistant pathogenic species, directly causing dysbiosis. They damage the tight junction proteins between gut epithelial cells, increasing permeability. They deplete the antioxidant capacity of the gut lining. The resulting combination of dysbiosis and leaky gut is why heavy metal accumulation so consistently produces or worsens food sensitivities. Heal the metal burden and the food sensitivities often resolve or significantly reduce, not because the foods changed, but because the gut can now properly handle them.",
    foodSensitivity: "When the gut barrier is compromised by metal toxicity, partially digested food proteins (particularly gluten, casein, soy, and egg proteins) enter the bloodstream and trigger IgG and IgA antibody responses. Over time these responses become sensitized. The person feels they are reacting to more and more foods, not because they have become intolerant to those specific foods, but because their gut has lost its filtering capacity. Removal of the metals, healing of the gut lining, and restoration of the microbiome resolves this pattern in many cases.",
    research: "ATSDR (comprehensive heavy metal toxicity documentation for all metals listed). Mortensen et al. 2015: heavy metal accumulation and gut microbiome disruption. Ijomone et al. 2017: mechanisms of metal neurotoxicity across all major heavy metals. Genchi et al. 2020 (International Journal of Molecular Sciences): comprehensive review of toxic metals and oxidative stress mechanisms.",
  },

  protocol: {
    phases: [
      { phase:"Phase 1: Stop adding, start supporting", weeks:"Weeks 1 to 2",
        steps:["Identify and remove ongoing exposure sources: fish choices, old pipes, cosmetics with aluminum, copper IUDs as appropriate with medical guidance.","Begin selenium supplementation or Brazil nut protocol (1 to 2 per day) for mercury neutralization.","Start liver and kidney support: milk thistle, dandelion tea, adequate water intake.","Correct the foundational deficiencies that make metal accumulation worse: zinc, vitamin C, magnesium, vitamin D3.","No aggressive mobilization yet. Build the infrastructure first."] },
      { phase:"Phase 2: Bind and clear", weeks:"Weeks 3 to 6",
        steps:["Add chlorella (start at 1g daily, build to 3 to 5g slowly) as the primary gut binding agent.","Add cilantro ONLY alongside chlorella. Cilantro mobilizes; chlorella binds and escorts out. Never mobilize without a binder.","Continue liver and kidney support as the excretion pathways handle increased load.","Increase fiber: the gut needs bulk to carry bound metals out efficiently. Psyllium, oats, and vegetables.","Watch for die-off type symptoms: headache, fatigue, skin reactions are signs of mobilization. Reduce dose if severe and increase water and binder intake."] },
      { phase:"Phase 3: Rebuild and restore", weeks:"Weeks 7 to 12",
        steps:["With metal burden reducing, begin active gut lining repair: slippery elm, marshmallow root, bone broth, aloe vera gel.","Restore the microbiome with fermented food and prebiotic fiber. Heavy metals had killed beneficial bacteria; they need to be reestablished.","Reintroduce foods that were reactive in a calm, systematic way. Many food sensitivities will have significantly reduced.","Continue zinc and selenium as ongoing foundational minerals.","Full nutrient repletion: test for and address residual deficiencies in iron, B12, D3, magnesium."] },
      { phase:"Phase 4: Maintain and monitor", weeks:"Ongoing",
        steps:["Quarterly review of exposure sources.","Annual testing if history of significant exposure.","Maintain the nutritional foundation; deficiencies are what made accumulation possible in the first place.","Continue fermented foods and prebiotic fiber as permanent habits.","Maintain oral health: address amalgam burden if present, with a biological dentist, as a long-term project."] },
    ],
    herbs: ["chlorella (spirulina)","cilantro","garlic","milk-thistle","dandelion","slippery-elm","nettle","astragalus","elderberry","lemon-balm"],
    warning: "This is a supportive protocol, not pharmaceutical chelation. For confirmed acute or high-level heavy metal poisoning, medical intervention with pharmaceutical chelating agents (DMSA, DMPS, EDTA) under physician supervision is required. Herbal approaches are appropriate for chronic low-level accumulation and preventive support. Always test before and after to confirm progress.",
  },
};

/* ---- ORAL HEALTH DATA ------------------------------------------ */
const ORAL_HEALTH = {
  intro: "Your mouth is not separate from the rest of your body. It is the entry point of the gut, and what lives in it tells a remarkable story about what is happening throughout your entire system. Bad breath and an unhealthy gut share the same origin. Dental decay and mineral deficiency share the same origin. The mouth is a window, not an island.",

  oralMicrobiome: {
    what: "The mouth hosts over 700 bacterial species in a complex ecosystem called the oral microbiome. When balanced, these organisms protect the gums, regulate pH, and defend against pathogens. When disrupted by sugar, processed food, and insufficient care, pathogenic bacteria dominate, producing the acids that demineralize enamel and the toxins that inflame gums.",
    gutLink: "The oral microbiome is the beginning of the gut microbiome. Every time you swallow, you are seeding your gut with whatever lives in your mouth. Periodontal pathogens, particularly Porphyromonas gingivalis, have been found in the joints of rheumatoid arthritis patients, in atherosclerotic plaques, and in brain tissue of Alzheimer's patients. The connection is not metaphorical. It is microbial migration.",
    research: "Hajishengallis et al. 2012 (Nature Reviews Immunology): P. gingivalis is a keystone pathogen that can remodel the entire oral microbiome and drive systemic inflammation. Koren et al. 2011 (NEJM): atherosclerotic plaque samples contained oral bacteria, linking periodontal disease directly to cardiovascular disease.",
  },

  teeth: {
    composition: "Teeth are composed of four tissues: enamel (the hardest substance the body produces, 96% mineral hydroxyapatite), dentin (below the enamel, 70% mineral, structurally similar to bone), cementum (anchors the root), and the dental pulp (living tissue containing nerves and blood vessels). The mineral content of enamel and dentin requires the same raw materials as bone: calcium, phosphorus, magnesium, vitamins D3 and K2, and vitamin A. When these nutrients are chronically deficient, teeth and bones both suffer.",
    vitality: "Teeth are living structures. The pulp contains blood vessels that nourish the dentin, and the periodontal ligament is living tissue that connects the root to the jawbone. Losing a tooth removes that living anchor. The jawbone then begins to resorb at the site, shifting adjacent teeth, altering bite mechanics, affecting chewing and digestion, and over time changing facial structure. Fearfully and wonderfully made means every part matters. Tooth loss is not cosmetic.",
    biblical: "Psalm 139:14, fearfully and wonderfully made. Every tooth in your head is part of that design. The jaw bone, the periodontal ligament, the mineralization process. None of it is accidental or expendable.",
  },

  cavities: {
    what: "A cavity is the result of demineralization outpacing remineralization. Streptococcus mutans, a bacterium that lives in the mouth, feeds on sugar and refined carbohydrates and produces lactic acid as a byproduct. That acid lowers oral pH and dissolves the mineral hydroxyapatite from enamel. This is not inevitable. It is a process that can be slowed, stopped, and in early stages reversed.",
    stages: [
      { stage:"Stage 1: Demineralization (white spot lesion)", reversible:true, desc:"The enamel surface is still intact but mineral has leached from below, creating a chalky white spot. Fully reversible through remineralization. No drill required." },
      { stage:"Stage 2: Enamel decay", reversible:true, desc:"The enamel surface begins to break down. Can still be remineralized if caught early, but may benefit from supportive intervention. The earlier the better." },
      { stage:"Stage 3: Dentin decay", reversible:false, desc:"The cavity has reached the dentin layer. Professional care needed. The goal now is to stop progression and support the body's response." },
      { stage:"Stage 4: Pulp involvement", reversible:false, desc:"Infection has reached the living tissue. Root canal or extraction territory. This is the outcome of a long-ignored process, not a sudden event." },
    ],
    research: "Pitts et al. 2017 (Nature Reviews Disease Primers): early stage cavities, before cavitation, are biologically reversible through mineral rebalancing. Remineralization is not alternative medicine; it is the biological mechanism the dental profession increasingly relies on for early intervention. Weston A. Price (1939, Nutrition and Physical Degeneration): studied 14 cultures on traditional diets and found near-zero dental decay. When those same populations adopted refined flour and sugar, decay exploded within one generation.",
  },

  remineralization: {
    overview: "Saliva is the body's natural remineralizing system. It carries calcium and phosphate ions that continuously deposit back into enamel. The problem is that a diet high in sugar and processed food keeps oral pH acidic, which prevents this process and actively strips minerals instead. The solution is to restore the conditions that allow the body's own system to work.",
    protocol: [
      "Remove the fuel: cut sugar and refined flour, which are the direct substrate for S. mutans acid production.",
      "Vitamin D3 and K2: D3 regulates calcium absorption; K2 (specifically MK-7) directs calcium into teeth and bones rather than soft tissue. These two work together. Low D3 is one of the most common root causes of dental decay.",
      "Calcium and phosphorus from food: dairy, bone broth, sardines, leafy greens, seeds. These are the raw materials for enamel remineralization.",
      "Magnesium: required for D3 to activate and for calcium metabolism. Many people are magnesium deficient without knowing it.",
      "Oil pulling: swishing 1 tablespoon of coconut oil for 10 to 20 minutes. Lauric acid in coconut oil kills S. mutans and reduces plaque without disrupting the oral microbiome the way commercial mouthwash does.",
      "Neem twig or neem-based paste: documented anti-plaque herb, reduces S. mutans counts, anti-inflammatory for gums.",
      "Clove oil (diluted): the eugenol in clove is both analgesic and antimicrobial. Used for sensitivity and gum support.",
      "Tongue scraping: removes bacteria that colonize the tongue surface and contribute to bad breath and systemic bacterial load.",
      "Reduce mouth breathing: nasal breathing maintains oral pH and moisture. Chronic mouth breathing dries the mouth, reducing saliva's protective and remineralizing action.",
    ],
    research: "Tanzer et al. (multiple studies): lauric acid from coconut oil is active against S. mutans. Nithya Anand et al. 2019: neem extract significantly reduced S. mutans counts comparable to chlorhexidine without antibiotic resistance risk.",
  },

  badBreath: {
    truth: "Chronic bad breath that does not resolve with brushing is not a mouth problem. It is a body problem. The mouth is simply where it surfaces.",
    sources: [
      "H. pylori infection in the stomach: produces ammonia and volatile sulfur compounds that rise through the esophagus.",
      "SIBO (small intestinal bacterial overgrowth): bacterial fermentation in the wrong part of the gut produces gases including hydrogen sulfide.",
      "Liver insufficiency: the liver processes and detoxifies metabolic waste. A sluggish liver allows ammonia and other compounds into the breath.",
      "Dysbiosis (gut imbalance): pathogenic bacteria in the colon produce volatile sulfur compounds, indoles, and skatole that are absorbed into the bloodstream and exhaled through the lungs.",
      "Tongue bacteria: the tongue harbors a significant portion of the oral microbiome. Bacteria in the grooves of the tongue break down proteins and produce VSCs (volatile sulfur compounds).",
    ],
    connection: "Bad breath, bloating, and flatulence share the same origin: microbial imbalance and incomplete breakdown of food. Stinky breath, stinky gas. Same root. Addressing gut balance, liver support, and oral hygiene together is the only complete solution.",
  },

  herbs: ["myrrh","clove","peppermint","chamomile","plantain","dgl-licorice","neem"],
};

/* ---- PREPARED DATA --------------------------------------------- */
const PREPARED = {
  intro: "God has already provided everything needed for the healing and sustaining of the nations. The question is whether we are positioned to access it. Good stewardship means being ready before the emergency, not scrambling after it. Proverbs 11:9: through knowledge the just are delivered. That knowledge is active, not passive. It builds, it prepares, and it sustains.",

  herbKit: {
    title: "The emergency herb kit",
    desc: "These are the most versatile, shelf-stable herbs for a household emergency kit. Prioritize dried loose herbs and tinctures where possible. Dried herbs stored in sealed glass jars in a cool, dark place retain potency for 1 to 3 years.",
    items: [
      { herb:"elderberry-syrup",    name:"Elderberry (syrup or dried)",   purpose:"Antiviral, immune support, fever companion",            shelf:"Syrup 1 year refrigerated; dried 2 years" },
      { herb:"echinacea",           name:"Echinacea (tincture)",          purpose:"Immune stimulation, infection support",                 shelf:"Tincture 5 years" },
      { herb:"ginger",              name:"Ginger (dried root or powder)", purpose:"Nausea, circulation, gut motility, warming",            shelf:"2 to 3 years dried" },
      { herb:"garlic",              name:"Garlic (dehydrated or raw)",    purpose:"Broadest antimicrobial herb available, respiratory",    shelf:"Dehydrated 2 years; fresh until it sprouts" },
      { herb:"turmeric",            name:"Turmeric (powder)",             purpose:"Anti-inflammatory, liver support, wound support",       shelf:"2 to 3 years" },
      { herb:"chamomile",           name:"Chamomile (dried flowers)",     purpose:"Gut calming, sleep, children's herb, skin",            shelf:"1 to 2 years" },
      { herb:"peppermint",          name:"Peppermint (dried or oil)",     purpose:"Digestion, headache, respiratory, nausea",              shelf:"Dried 2 years; oil 5 years" },
      { herb:"slippery-elm",        name:"Slippery Elm (powder)",         purpose:"Gut lining repair, cough, sore throat, emergency food", shelf:"2 years" },
      { herb:"thyme",               name:"Thyme (dried)",                 purpose:"Respiratory antiseptic, cough, infection",              shelf:"2 years" },
      { herb:"clove",               name:"Clove (whole or powder)",       purpose:"Pain, antimicrobial, parasite protocol, oral health",   shelf:"3 to 4 years" },
      { herb:"lavender",            name:"Lavender (essential oil)",      purpose:"Burns, antiseptic, calm, sleep, headache",              shelf:"5 years" },
      { herb:"myrrh",               name:"Myrrh (tincture)",              purpose:"Wound care, oral health, antimicrobial",               shelf:"5 years tincture" },
    ],
  },

  pantry: {
    title: "The gut-first emergency pantry",
    desc: "An emergency food supply that starts with gut health ensures everything else the body needs can actually be absorbed. These are shelf-stable, nutrient-dense, gut-supporting foods that double as emergency calories.",
    items: [
      { food:"Dried lentils and beans",  why:"Complete gut-supportive fiber, protein, iron, folate. Feeds the microbiome long-term.",      shelf:"10+ years sealed" },
      { food:"Rolled oats",              why:"Prebiotic beta-glucan, B vitamins, magnesium. Make with water if necessary.",                shelf:"5 years sealed" },
      { food:"Garlic (dehydrated)",      why:"Antimicrobial, prebiotic, cardiovascular support.",                                          shelf:"2 to 3 years" },
      { food:"Raw honey",                why:"Antimicrobial, wound care, energy, gut support, does not spoil.",                            shelf:"Indefinite" },
      { food:"Apple cider vinegar",      why:"Supports stomach acid production, antimicrobial, gut pH support.",                           shelf:"5+ years" },
      { food:"Coconut oil",              why:"Antimicrobial (lauric acid), energy, oil pulling for oral health.",                          shelf:"2 years" },
      { food:"Bone broth powder",        why:"Gut lining repair, collagen, electrolytes.",                                                 shelf:"2 to 3 years" },
      { food:"Moringa powder",           why:"The broadest nutritional profile in a shelf-stable powder.",                                 shelf:"2 years sealed" },
      { food:"Spirulina tablets",        why:"B complex, complete protein, iron, zinc.",                                                   shelf:"2 to 3 years" },
      { food:"Sea salt",                 why:"Electrolytes, mineral support, food preservation.",                                          shelf:"Indefinite" },
      { food:"Fermentation starter (wild or commercial)", why:"Ability to ferment any vegetable you have access to during an extended emergency.", shelf:"Dried starter 2 years" },
    ],
  },

  growing: {
    title: "Growing your own: work with what you have",
    intro: "God has already seeded the earth. The knowledge is yours to access. Growing herbs is an act of stewardship and it does not require land, a large budget, or expertise. It requires intention. Start with one method, one herb, and one commitment to tend it.",
    containers: {
      title: "Container and bucket growing",
      desc: "Any container with drainage works. A five-gallon bucket, a repurposed pot, a window box. This is accessible to anyone with a balcony, a window, or a patch of outdoor space.",
      bestHerbs: ["Peppermint (invasive in ground, perfect in a bucket)", "Chamomile", "Lemon balm", "Thyme", "Rosemary", "Calendula", "Tulsi (Hot Basil)", "Lavender"],
      tips: ["Always drill or punch drainage holes. Roots rot without drainage.", "Use a quality potting mix, not garden soil, which compacts in containers.", "Most medicinal herbs prefer full sun (6+ hours). A south-facing window works for many.", "Peppermint and lemon balm prefer to stay slightly moist. Lavender, thyme, and rosemary prefer to dry between watering.", "A single peppermint plant in a bucket will provide more herb than a family can use in a season."],
    },
    inGround: {
      title: "In-ground and raised bed growing",
      desc: "If you have any ground access, even a 4x4 raised bed built from cheap lumber, you can grow a meaningful herb garden.",
      bestHerbs: ["Garlic (plant in fall, harvest in summer, extremely hardy)", "Nettle (perennial, spreads aggressively, extremely nutritious)", "Echinacea (perennial, beautiful, immune herb)", "Elderberry (shrub, grow once, harvest for years)", "Fennel (self-seeds, comes back year after year)", "Dandelion (already growing everywhere; learn to cultivate rather than kill it)", "Comfrey (deep-rooted, mineral accumulator, external use)"],
      tips: ["Perennial herbs are the best stewardship investment: plant once, harvest for years.", "Elderberry from a cutting can become a producing shrub in 2 to 3 years.", "Dandelion is one of the most medicinally useful plants on earth and most people are paying to kill it.", "Composting kitchen scraps to build soil costs nothing and returns minerals to the plants."],
    },
    hydroponics: {
      title: "Hydroponics: no soil required",
      desc: "Hydroponics is not complicated. The Kratky method in particular requires no electricity, no pumps, and no special equipment, making it viable in a power outage and buildable from materials at any hardware store.",
      kratky: "The Kratky method: fill any opaque container with nutrient solution. Place a net pot in the lid with the seedling. The roots grow down into the solution and the plant grows up. As the plant drinks the solution, an air gap forms above the water line that oxygenates the roots. No pumps, no timers, no electricity. A five-gallon bucket, a net cup lid, some nutrients, and a seedling is all it takes.",
      bestHerbs: ["Basil (fastest growing, thrives in Kratky)", "Peppermint (roots in water naturally)", "Lemon balm", "Chamomile", "Cilantro (short cycle, high yield)"],
      nutrients: "A small bottle of hydroponic nutrient solution (available at any garden center or online) feeds multiple grows. Dilute to the manufacturer ratio. Change solution every 2 to 3 weeks. That is the entirety of the maintenance.",
    },
    seedSaving: "Save seed every season. Chamomile, fennel, calendula, and echinacea all produce abundant seed. Dry the seed heads on paper, store in labeled envelopes in a cool, dry place, and you have next year's medicine free of charge. This is stewardship compounding over time.",
  },

  word: {
    title: "Equipped with the Word",
    desc: "The most important preparation is not physical. Psalm 91 is a covenant of protection. Isaiah 40:29 to 31 sustains when physical resources run low. Proverbs 24:3 to 4, through wisdom a house is built, through knowledge its rooms are filled with rare and beautiful treasure. The Word is not a supplement. It is the foundation every other preparation rests on.",
    scriptures: [
      { ref:"Exodus 15:26",    text:"I am the Lord who heals you. He identified Himself as healer before the need arose." },
      { ref:"Psalm 91:9-10",   text:"If you make the Most High your dwelling, no harm will overtake you." },
      { ref:"Proverbs 11:9",   text:"Through knowledge the just are delivered. Knowledge is active preparation." },
      { ref:"Proverbs 24:3-4", text:"By wisdom a house is built, by understanding it is established, and by knowledge its rooms are filled." },
      { ref:"Isaiah 40:29",    text:"He gives strength to the weary and increases the power of the weak." },
      { ref:"Revelation 22:2", text:"The leaves of the tree are for the healing of the nations. The provision already exists." },
    ],
  },

  checklist: [
    { cat:"Herbs", items:["10 to 12 core dried herbs sealed in glass", "Tinctures of echinacea, elderberry, and myrrh", "Essential oils: lavender, clove, peppermint", "Neem-based oral care product"] },
    { cat:"Pantry", items:["30-day supply of dried lentils, oats, and beans", "Bone broth powder", "Moringa powder", "Raw honey, coconut oil, apple cider vinegar", "Fermentation starter"] },
    { cat:"Growing", items:["At least one container herb garden established", "Seeds saved from current season", "Knowledge of 3 to 5 local wild medicinals in your area"] },
    { cat:"The Word", items:["Psalm 91 memorized or accessible", "Healing scriptures written and posted in the home", "Daily time in the Word as non-negotiable routine"] },
  ],
};

/* ---- 3-CATEGORY NAV -------------------------------------------- */
const NAV_CATS = [
  { id:"explore", label:"Explore", items:[
    {id:"home",         label:"Wellness Areas"},
    {id:"systems",      label:"Body Systems"},
    {id:"gut-health",   label:"Gut Health"},
    {id:"oral-health",  label:"Oral Health"},
    {id:"toxicity",     label:"Viral and Toxicity"},
    {id:"ailments",     label:"Ailments"},
  ]},
  { id:"herbs", label:"Herbs", items:[
    {id:"herbs",        label:"Herb Library"},
    {id:"cleansing",    label:"Cleansing"},
    {id:"nutrients",    label:"Nutrients"},
  ]},
  { id:"myfamily", label:"My Plan", items:[
    {id:"plan",         label:"Family Plan"},
    {id:"nutrition",    label:"Nutrition"},
    {id:"movement",     label:"Movement"},
    {id:"prepared",     label:"Are You Prepared"},
  ]},
];

/* ---- HELPERS --------------------------------------------------- */
const todayISO   = () => new Date().toISOString().slice(0,10);
const daysSince  = (iso) => iso ? Math.floor((Date.now()-new Date(iso).getTime())/86400000) : Infinity;
const herbById   = (id)  => HERBS.find((h)=>h.id===id);
const sysName    = (id)  => SYSTEMS.find((s)=>s.id===id)?.name || id;

const WHO_LABELS = {"all":"Safe for most","adults":"Adults","women":"Women","men":"Men","pregnancy-avoid":"Avoid in pregnancy","children-ok":"Children ok","children-caution":"Caution in children","external-only":"External only"};

/* herbs relevant to a focus area (by systems map) */
const AREA_SYSTEMS = { gut:["digestive"], nutrition:["digestive","endocrine"], inflammation:["muscular","immune","cardiovascular"], detox:["digestive"], energy:["endocrine","nervous"], mindset:["nervous"], spiritual:[] };
const herbsForArea = (areaId) => HERBS.filter((h)=> (AREAS.find((a)=>a.id===areaId)?.herbs||[]).includes(h.id));

/* ---- SHARED UI ------------------------------------------------- */
function EvidenceBadge({level}){
  const e=EVID[level]; if(!e) return null;
  return <span className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium" style={{backgroundColor:e.tone+"22",color:e.tone}}><span className="h-1.5 w-1.5 rounded-full" style={{backgroundColor:e.tone}}/>{e.label}</span>;
}
function Panel({title,icon:Icon,children,border}){
  return <div className="rounded-2xl border p-5" style={{background:"var(--paper)",borderColor:border||"rgba(61,107,80,.12)"}}><div className="mb-4 flex items-center gap-2">{Icon&&<Icon size={17} color="var(--gold)"/>}<h3 className="font-display text-base font-600" style={{color:"var(--green)"}}>{title}</h3></div>{children}</div>;
}
function Chips({items,tone}){
  const bg=tone==="gold"?"rgba(201,162,74,.18)":"rgba(126,144,121,.16)";
  const col=tone==="gold"?"#9a7a25":"#3d5640";
  return <div className="flex flex-wrap gap-2">{items.map((f)=><span key={f} className="rounded-full px-3 py-1.5 text-sm" style={{background:bg,color:col}}>{f}</span>)}</div>;
}
function BackBtn({onClick,label}){
  return <button onClick={onClick} className="mb-6 inline-flex items-center gap-1 text-sm font-600" style={{color:"var(--gold)"}}><ArrowLeft size={16}/> {label}</button>;
}

/* ---- NAV ------------------------------------------------------- */
const NAV = [
  {id:"home",label:"Areas"},{id:"systems",label:"Body Systems"},{id:"herbs",label:"Herb Library"},
  {id:"ailments",label:"Ailments"},{id:"nutrition",label:"Nutrition"},{id:"cleansing",label:"Cleansing"},
  {id:"movement",label:"Movement"},{id:"nutrients",label:"Nutrients"},
];

/* ==================================================================
   MAIN APP
   ================================================================== */
export default function App(){
  const [user,  setUser]  = useState(null);
  const [authLoaded, setAuthLoaded] = useState(false);
  const [view,  setView]  = useState({name:"home"});
  const [query, setQuery] = useState("");
  const [favs,  setFavs]  = useState([]);
  const [planPhases, setPlanPhases] = useState({});
  const [showDisc, setShowDisc] = useState(false);
  const [navOpen, setNavOpen] = useState(null);

  /* --- load session --- */
  useEffect(()=>{
    (async()=>{
      try{
        const s=await window.storage.get("restoruh:session");
        if(s?.value){ const u=JSON.parse(s.value); setUser(u); await loadUserData(u.email); }
      }catch(_){}
      setAuthLoaded(true);
    })();
  },[]);

  const loadUserData = async (email) => {
    try{
      const fKey=`restoruh:favs:${email}`;
      const f=await window.storage.get(fKey); if(f?.value) setFavs(JSON.parse(f.value));
      const pKey=`restoruh:phases:${email}`;
      const p=await window.storage.get(pKey); if(p?.value) setPlanPhases(JSON.parse(p.value));
    }catch(_){}
  };

  const saveFavs = async (next, email) => {
    try{ await window.storage.set(`restoruh:favs:${email}`,JSON.stringify(next)); }catch(_){}
  };
  const savePhases = async (next, email) => {
    try{ await window.storage.set(`restoruh:phases:${email}`,JSON.stringify(next)); }catch(_){}
  };

  const toggleFav = (id) => {
    if(!user) return;
    const next = favs.includes(id)?favs.filter((f)=>f!==id):[...favs,id];
    setFavs(next); saveFavs(next, user.email);
  };
  const togglePhase = (key) => {
    if(!user) return;
    const next={...planPhases,[key]:!planPhases[key]};
    setPlanPhases(next); savePhases(next, user.email);
  };

  const handleLogin = async (u) => {
    setUser(u);
    try{ await window.storage.set("restoruh:session",JSON.stringify(u)); }catch(_){}
    await loadUserData(u.email);
  };
  const handleLogout = async () => {
    setUser(null); setFavs([]); setPlanPhases({});
    try{ await window.storage.delete("restoruh:session"); }catch(_){}
    setView({name:"home"});
  };

  const go = (v) => { setView(v); setQuery(""); setNavOpen(null); window.scrollTo({top:0}); };

  const search = useMemo(()=>{
    if(!query.trim()) return null;
    const q=query.toLowerCase();
    return {
      herbs:   HERBS.filter((h)=>[h.name,h.latin,h.uses,h.actions.join(" "),h.ailments.join(" ")].join(" ").toLowerCase().includes(q)),
      ailments:AILMENTS.filter((a)=>[a.name,a.desc,a.cat].join(" ").toLowerCase().includes(q)),
      systems: SYSTEMS.filter((s)=>[s.name,s.fn].join(" ").toLowerCase().includes(q)),
    };
  },[query]);

  if(!authLoaded) return <div style={{background:"var(--green)",minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center"}}><Leaf size={36} color="var(--gold)"/></div>;
  if(!user) return <AuthScreen onAuth={handleLogin}/>;

  return(
    <div style={{background:"var(--cream)",color:"var(--ink)"}} className="min-h-screen font-body">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,600;9..144,700&family=Karla:wght@400;500;600;700&display=swap');
        :root{--green:#3d6b50;--green-deep:#2e5240;--gold:#c9a24a;--gold-soft:#d9bd78;--cream:#f5f0e3;--paper:#fbf8ef;--ink:#243029;--sage:#8aa694;--muted:#6f6a5c;}
        .font-display{font-family:'Fraunces',Georgia,serif;} .font-body{font-family:'Karla',system-ui,sans-serif;}
        .fade-up{animation:fadeUp .45s cubic-bezier(.2,.7,.3,1) both;}
        @keyframes fadeUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:none}}
        .card-hover{transition:transform .2s ease,box-shadow .2s ease;}
        .card-hover:hover{transform:translateY(-2px);box-shadow:0 12px 26px -16px rgba(61,107,80,.4);}
        .leaf-rule{height:1px;background:linear-gradient(90deg,transparent,var(--gold),transparent);}
        .scrollx::-webkit-scrollbar{height:0;} ::selection{background:var(--gold);color:#fff;}
      `}</style>

      {/* HEADER */}
      <header className="sticky top-0 z-30 border-b" style={{background:"rgba(61,107,80,.97)",borderColor:"rgba(201,162,74,.25)"}}>
        <div className="mx-auto max-w-6xl px-4 py-3">
          <div className="flex items-center gap-3">
            <button onClick={()=>go({name:"home"})} className="flex items-center gap-2">
              <span className="grid h-9 w-9 place-items-center rounded-full overflow-hidden" style={{background:"var(--gold)",padding:2}}><img src="/images/restoruh-logo.png" alt="RestoRuh" style={{width:28,height:28,objectFit:"contain"}}/></span>
              <span className="text-left">
                <span className="block font-display text-xl font-600 leading-none" style={{color:"var(--cream)"}}>Resto<span style={{color:"var(--gold)"}}>Ruh</span></span>
                <span className="block text-[10px] tracking-widest" style={{color:"var(--sage)"}}>HEALING OF THE NATIONS · REVELATION 22:2</span>
              </span>
            </button>
            <div className="ml-auto flex items-center gap-2">
              {/* FAMILY PLAN - prominent gold CTA */}
              <button onClick={()=>go({name:"plan"})} className="hidden sm:flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-700" style={{background:"var(--gold)",color:"#2e5240"}}>
                <ClipboardList size={15}/> Family Plan
              </button>
              <button onClick={()=>go({name:"herbs",fav:true})} className="relative grid h-9 w-9 place-items-center rounded-full" style={{background:"rgba(245,240,227,.1)"}}>
                <Heart size={16} color="var(--gold-soft)"/>
                {favs.length>0&&<span className="absolute -right-1 -top-1 grid h-4 min-w-4 place-items-center rounded-full px-1 text-[10px] font-bold" style={{background:"var(--gold)",color:"#2e5240"}}>{favs.length}</span>}
              </button>
              <button onClick={handleLogout} className="grid h-9 w-9 place-items-center rounded-full" style={{background:"rgba(245,240,227,.1)"}} title={`Log out ${user.name}`}>
                <LogOut size={16} color="var(--sage)"/>
              </button>
            </div>
          </div>
          <nav className="mt-3">
            {/* 3 category buttons */}
            <div className="flex gap-2">
              {NAV_CATS.map((cat)=>{
                const isActive = cat.items.some((i)=>i.id===view.name);
                const isOpen   = navOpen===cat.id;
                return(
                  <button key={cat.id} onClick={()=>setNavOpen(isOpen?null:cat.id)}
                    className="flex items-center gap-1.5 rounded-full px-4 py-1.5 text-sm font-600 transition"
                    style={isOpen||isActive?{background:"var(--gold)",color:"#2e5240"}:{color:"var(--cream)"}}>
                    {cat.label}
                    <span className="text-[10px]" style={{opacity:.7}}>{isOpen?"▲":"▼"}</span>
                  </button>
                );
              })}
            </div>
            {/* expanded sub-items */}
            {navOpen&&(
              <div className="mt-2 flex flex-wrap gap-1.5 pb-1">
                {NAV_CATS.find((c)=>c.id===navOpen)?.items.map((item)=>(
                  <button key={item.id} onClick={()=>go({name:item.id})}
                    className="rounded-full px-3.5 py-1.5 text-xs font-600 transition"
                    style={view.name===item.id?{background:"rgba(201,162,74,.35)",color:"var(--gold)"}:{background:"rgba(245,240,227,.1)",color:"var(--sage)"}}>
                    {item.label}
                  </button>
                ))}
              </div>
            )}
          </nav>
          <div className="mt-2 flex items-center gap-2 rounded-xl px-3 py-2" style={{background:"rgba(245,240,227,.96)"}}>
            <Search size={18} color="var(--sage)"/>
            <input value={query} onChange={(e)=>setQuery(e.target.value)} placeholder="Search herbs, ailments, or body systems..." className="w-full bg-transparent text-sm outline-none" style={{color:"var(--ink)"}}/>
            {query&&<button onClick={()=>setQuery("")}><X size={16} color="var(--muted)"/></button>}
          </div>
        </div>
      </header>

      {search?(
        <SearchView results={search} onHerb={(id)=>go({name:"herb",id})} onAil={(id)=>go({name:"ailment",id})} onSys={(id)=>go({name:"system",id})}/>
      ):(
        <main className="mx-auto max-w-6xl px-4 pb-24">
          {view.name==="home"      && <HomeView    onArea={(id)=>go({name:"area",id})} go={go}/>}
          {view.name==="area"      && <AreaDetail  area={AREAS.find((a)=>a.id===view.id)} favs={favs} toggleFav={toggleFav} onBack={()=>go({name:"home"})} onHerb={(id)=>go({name:"herb",id})} go={go}/>}
          {view.name==="systems"   && <SystemsList onSys={(id)=>go({name:"system",id})}/>}
          {view.name==="system"    && <SystemDetail sys={SYSTEMS.find((s)=>s.id===view.id)} onBack={()=>go({name:"systems"})} onHerb={(id)=>go({name:"herb",id})}/>}
          {view.name==="herbs"     && <HerbLibrary  favs={favs} favOnly={view.fav} onHerb={(id)=>go({name:"herb",id})} toggleFav={toggleFav} onMasterBlend={()=>go({name:"master-blend"})}/>}
          {view.name==="master-blend" && <MasterBlendView onHerb={(id)=>go({name:"herb",id})} onBack={()=>go({name:"herbs"})}/>}
          {view.name==="herb"      && <HerbDetail   herb={herbById(view.id)} favs={favs} toggleFav={toggleFav} onBack={()=>go({name:"herbs"})} onSys={(id)=>go({name:"system",id})} onAil={(id)=>go({name:"ailment",id})}/>}
          {view.name==="ailments"  && <AilmentsList onAil={(id)=>go({name:"ailment",id})}/>}
          {view.name==="ailment"   && <AilmentDetail ail={AILMENTS.find((a)=>a.id===view.id)} onBack={()=>go({name:"ailments"})} onHerb={(id)=>go({name:"herb",id})}/>}
          {view.name==="nutrition" && <NutritionView go={go}/>}
          {view.name==="cleansing" && <CleansingView onHerb={(id)=>go({name:"herb",id})}/>}
          {view.name==="movement"  && <MovementView/>}
          {view.name==="plan"      && <FamilyPlan user={user} favs={favs} planPhases={planPhases} togglePhase={togglePhase} onHerb={(id)=>go({name:"herb",id})}/>}
          {view.name==="nutrients"    && <NutrientsView/>}
          {view.name==="gut-health"   && <GutHealthView onHerb={(id)=>go({name:"herb",id})}/>}
          {view.name==="oral-health"  && <OralHealthView onHerb={(id)=>go({name:"herb",id})}/>}
          {view.name==="toxicity"     && <ToxicityView   onHerb={(id)=>go({name:"herb",id})}/>}
          {view.name==="prepared"     && <PreparedView onHerb={(id)=>go({name:"herb",id})}/>}
        </main>
      )}

      <footer style={{background:"var(--green-deep)",color:"var(--cream)"}}>
        <div className="mx-auto max-w-6xl px-4 py-10">
          <div className="leaf-rule mb-8"/>
          <div className="flex flex-col items-center gap-3 text-center">
            <Leaf size={22} color="var(--gold)"/>
            <p className="font-display text-lg italic" style={{color:"var(--gold-soft)"}}>"I am Yahweh Rapha, the Lord who heals you."</p>
            <p className="text-xs tracking-widest" style={{color:"var(--sage)"}}>EXODUS 15:26</p>
            <button onClick={()=>setShowDisc(true)} className="mt-4 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs" style={{borderColor:"rgba(201,162,74,.4)",color:"var(--gold-soft)"}}><ShieldAlert size={14}/> Health disclaimer</button>
            <p className="mt-2 text-xs" style={{color:"var(--sage)"}}>2025 RestoRuh. Educational use only. Not medical advice.</p>
          </div>
        </div>
      </footer>
      {showDisc&&<DisclaimerModal onClose={()=>setShowDisc(false)}/>}
      <div className="fixed bottom-0 left-0 right-0 z-20 border-t px-4 py-2 text-center text-[11px]" style={{background:"rgba(61,107,80,.97)",borderColor:"rgba(201,162,74,.25)",color:"var(--sage)"}}>
        Educational only, not medical advice. <button className="underline" onClick={()=>setShowDisc(true)}>Read more</button>
      </div>
    </div>
  );
}

/* ==================================================================
   AUTH
   ================================================================== */
function AuthScreen({onAuth}){
  const [tab,    setTab]    = useState("signup");
  const [name,   setName]   = useState("");
  const [email,  setEmail]  = useState("");
  const [err,    setErr]    = useState("");
  const [loading,setLoading]= useState(false);

  /* storage helpers -- never throw to the caller */
  const safeGet = async (key) => {
    try{ const r = await window.storage.get(key); return r?.value ? JSON.parse(r.value) : null; }catch(_){ return null; }
  };
  const safeSet = async (key, val) => {
    try{ await window.storage.set(key, JSON.stringify(val)); }catch(_){}
  };

  const doSignup = async () => {
    if(!name.trim()||!email.trim()){ setErr("Please enter your name and email."); return; }
    setLoading(true); setErr("");
    const key = `restoruh:user:${email.toLowerCase().trim()}`;
    const existing = await safeGet(key);
    if(existing){ setErr("That email already has an account. Switch to Log In."); setLoading(false); return; }
    const u = { name: name.trim(), email: email.toLowerCase().trim() };
    await safeSet(key, u);
    onAuth(u);
  };

  const doLogin = async () => {
    if(!email.trim()){ setErr("Please enter your email."); return; }
    setLoading(true); setErr("");
    const key = `restoruh:user:${email.toLowerCase().trim()}`;
    const record = await safeGet(key);
    if(!record){
      /* helpful: auto-create so they are never stuck */
      const fallbackName = email.split("@")[0];
      const u = { name: fallbackName, email: email.toLowerCase().trim() };
      await safeSet(key, u);
      onAuth(u);
      return;
    }
    onAuth({ name: record.name, email: record.email });
  };

  const doGuest = () => {
    onAuth({ name: "Guest", email: "guest@restoruh.app", guest: true });
  };

  const STYLES = `
    @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,600;9..144,700&family=Karla:wght@400;500;600;700&display=swap');
    :root{--green:#3d6b50;--green-deep:#2e5240;--gold:#c9a24a;--gold-soft:#d9bd78;--cream:#f5f0e3;--paper:#fbf8ef;--ink:#243029;--sage:#8aa694;--muted:#6f6a5c;}
    .font-display{font-family:'Fraunces',Georgia,serif;} .font-body{font-family:'Karla',system-ui,sans-serif;}
    input::placeholder{color:#7e9079;opacity:1;}
  `;

  return(
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12 font-body" style={{background:"var(--green-deep)"}}>
      <style>{STYLES}</style>

      <div className="mb-8 flex flex-col items-center gap-3 text-center">
        <span className="grid h-14 w-14 place-items-center rounded-full" style={{background:"var(--gold)"}}><Leaf size={26} color="#2e5240"/></span>
        <h1 className="font-display text-4xl font-700" style={{color:"var(--cream)"}}>Resto<span style={{color:"var(--gold)"}}>Ruh</span></h1>
        <p className="text-sm italic max-w-xs" style={{color:"var(--sage)"}}>"I am Yahweh Rapha, the Lord who heals you." Exodus 15:26</p>
      </div>

      <div className="w-full max-w-sm rounded-2xl p-7" style={{background:"var(--green)"}}>

        {/* tabs */}
        <div className="mb-6 flex rounded-xl overflow-hidden border" style={{borderColor:"rgba(201,162,74,.25)"}}>
          {[["signup","Sign Up"],["login","Log In"]].map(([t,label])=>(
            <button key={t} onClick={()=>{setTab(t);setErr("");}} className="flex-1 py-2.5 text-sm font-600 transition"
              style={tab===t?{background:"var(--gold)",color:"#2e5240"}:{color:"var(--sage)"}}>{label}</button>
          ))}
        </div>

        {/* name (signup only) */}
        {tab==="signup"&&(
          <div className="mb-4">
            <label className="mb-1.5 block text-xs font-600" style={{color:"var(--sage)"}}>YOUR NAME</label>
            <div className="flex items-center gap-2 rounded-xl px-3 py-3" style={{background:"rgba(245,240,227,.08)"}}>
              <User size={16} color="var(--sage)"/>
              <input value={name} onChange={(e)=>setName(e.target.value)}
                onKeyDown={(e)=>e.key==="Enter"&&doSignup()}
                placeholder="First name" className="w-full bg-transparent text-sm outline-none" style={{color:"var(--cream)"}}/>
            </div>
          </div>
        )}

        {/* email */}
        <div className="mb-6">
          <label className="mb-1.5 block text-xs font-600" style={{color:"var(--sage)"}}>EMAIL</label>
          <div className="flex items-center gap-2 rounded-xl px-3 py-3" style={{background:"rgba(245,240,227,.08)"}}>
            <Mail size={16} color="var(--sage)"/>
            <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)}
              onKeyDown={(e)=>e.key==="Enter"&&(tab==="signup"?doSignup():doLogin())}
              placeholder="your@email.com" className="w-full bg-transparent text-sm outline-none" style={{color:"var(--cream)"}}/>
          </div>
        </div>

        {err&&<p className="mb-4 rounded-lg px-3 py-2 text-sm" style={{background:"rgba(154,61,47,.3)",color:"#f4c3bb"}}>{err}</p>}

        <button onClick={tab==="signup"?doSignup:doLogin} disabled={loading}
          className="w-full rounded-full py-3 text-sm font-700 disabled:opacity-50"
          style={{background:"var(--gold)",color:"#2e5240"}}>
          {loading?"...":(tab==="signup"?"Create Account":"Log In")}
        </button>

        {/* divider */}
        <div className="my-4 flex items-center gap-3">
          <span className="flex-1 h-px" style={{background:"rgba(245,240,227,.15)"}}/>
          <span className="text-xs" style={{color:"var(--muted)"}}>or</span>
          <span className="flex-1 h-px" style={{background:"rgba(245,240,227,.15)"}}/>
        </div>

        {/* guest bypass (always visible) */}
        <button onClick={doGuest}
          className="w-full rounded-full border py-3 text-sm font-600"
          style={{borderColor:"rgba(201,162,74,.35)",color:"var(--gold-soft)"}}>
          Continue as Guest
        </button>

        <p className="mt-5 text-center text-xs" style={{color:"var(--muted)"}}>
          {tab==="signup"?"Already have an account? ":"New here? "}
          <button onClick={()=>{setTab(tab==="signup"?"login":"signup");setErr("");}}
            className="underline" style={{color:"var(--gold-soft)"}}>
            {tab==="signup"?"Log in":"Sign up free"}
          </button>
        </p>
        <p className="mt-3 text-center text-[10px]" style={{color:"var(--muted)"}}>Prototype. Data stored on this device only.</p>
      </div>
    </div>
  );
}

/* ==================================================================
   HOME + AREA DETAIL
   ================================================================== */
function HomeView({onArea,go}){
  return(
    <>
      <section className="fade-up py-10 text-center sm:py-14">
        <span className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-600 tracking-wide" style={{background:"rgba(201,162,74,.15)",color:"#9a7a25"}}><Sparkles size={13}/> FAITH-BASED WELLNESS RESEARCH</span>
        <h1 className="mx-auto mt-5 max-w-3xl font-display text-4xl font-600 leading-tight sm:text-5xl" style={{color:"var(--green)"}}>Consolidated research rooted in<span style={{color:"var(--gold)"}}> the God who heals.</span></h1>
        <p className="mx-auto mt-4 max-w-xl text-base" style={{color:"var(--muted)"}}>Eight wellness areas, the eleven body systems, an honest herb library, nutrition, cleansing, movement, and a family plan for you and your household.</p>
      </section>

      <div className="fade-up mb-8 rounded-2xl p-6 text-center" style={{background:"var(--green)"}}>
        <ClipboardList size={22} color="var(--gold)" className="mx-auto"/>
        <h2 className="mt-3 font-display text-xl font-600" style={{color:"var(--cream)"}}>Your Family Action Plan</h2>
        <p className="mx-auto mt-2 max-w-md text-sm" style={{color:"var(--sage)"}}>Research informed week by week protocols for the areas your family wants to steward. Connect your saved herbs directly to your plan.</p>
        <button onClick={()=>go({name:"plan"})} className="mt-4 inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-700" style={{background:"var(--gold)",color:"#2e5240"}}>Open the Family Plan <ChevronRight size={15}/></button>
      </div>

      <section className="fade-up mb-10">
        <div className="mb-5 flex items-center gap-3"><Compass size={18} color="var(--gold)"/><h2 className="font-display text-2xl font-600" style={{color:"var(--green)"}}>Explore by area</h2></div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {AREAS.map((a,i)=>{const Icon=a.icon; return(
            <button key={a.id} onClick={()=>a.linkPlan?go({name:"plan"}):onArea(a.id)} className="card-hover group flex flex-col rounded-2xl border p-5 text-left" style={{background:"var(--paper)",borderColor:"rgba(61,107,80,.12)",animationDelay:`${i*30}ms`}}>
              <span className="mb-3 grid h-11 w-11 place-items-center rounded-xl" style={{background:"var(--green)",color:"var(--gold)"}}><Icon size={20}/></span>
              <h3 className="font-display text-base font-600 leading-snug" style={{color:"var(--green)"}}>{a.short}</h3>
              <p className="mt-1.5 flex-1 text-xs" style={{color:"var(--muted)"}}>{a.blurb}</p>
              <span className="mt-3 inline-flex items-center gap-1 text-xs font-600" style={{color:"var(--gold)"}}>{a.linkPlan?"Open":"Explore"}<ChevronRight size={13} className="transition group-hover:translate-x-1"/></span>
            </button>
          );})}
        </div>
      </section>

      <section className="fade-up">
        <div className="mb-5 flex items-center gap-3"><BookOpen size={18} color="var(--gold)"/><h2 className="font-display text-2xl font-600" style={{color:"var(--green)"}}>Research library</h2></div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {[["systems","The 11 Body Systems","Functions, herbs, and foods for each system",Stethoscope],
            ["herbs","Herb Library",`${HERBS.length} herbs, evidence labeled and filtered by who can use them`,Leaf],
            ["ailments","Ailments Directory","Common conditions with herbs, diet, and when to seek care",ClipboardList],
            ["nutrition","Nutrition and Whole Foods","Original grains, processed sugar, and gut first meals",Wheat],
            ["cleansing","Cleansing and Parasites","Honest look at detox and the traditional deworming approach",Bug],
            ["movement","Movement and Mobility","Home exercises from easy to hard, plus stretching",Dumbbell]
          ].map(([id,t,d,Icon])=>(
            <button key={id} onClick={()=>go({name:id})} className="card-hover flex items-start gap-3 rounded-2xl border p-5 text-left" style={{background:"var(--paper)",borderColor:"rgba(61,107,80,.12)"}}>
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg" style={{background:"rgba(126,144,121,.18)"}}><Icon size={18} color="#3d5640"/></span>
              <span><span className="block font-display font-600" style={{color:"var(--green)"}}>{t}</span><span className="mt-0.5 block text-sm" style={{color:"var(--muted)"}}>{d}</span></span>
            </button>
          ))}
        </div>
      </section>
    </>
  );
}

function AreaDetail({area,onBack,onHerb,favs,toggleFav,go}){
  if(!area) return null;
  const Icon=area.icon;
  const related=(area.herbs||[]).map(herbById).filter(Boolean);
  return(
    <div className="fade-up py-8">
      <BackBtn onClick={onBack} label="All areas"/>
      <div className="rounded-2xl p-7" style={{background:"var(--green)"}}>
        <span className="grid h-12 w-12 place-items-center rounded-xl" style={{background:"rgba(201,162,74,.18)",color:"var(--gold)"}}><Icon size={24}/></span>
        <h1 className="mt-4 font-display text-2xl font-600 leading-snug sm:text-3xl" style={{color:"var(--cream)"}}>{area.title}</h1>
        <p className="mt-3 max-w-2xl text-sm" style={{color:"var(--sage)"}}>{area.blurb}</p>
      </div>
      {area.caution&&<div className="mt-6 flex gap-3 rounded-xl border p-4" style={{background:"#fdf6e8",borderColor:"#e3c47e"}}><ShieldAlert size={20} color="#b9892f" className="mt-0.5 shrink-0"/><p className="text-sm" style={{color:"#7a5e1c"}}>{area.caution}</p></div>}
      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <Panel title="Key approaches" icon={Compass}><ul className="space-y-3">{area.approaches.map((a,i)=><li key={i} className="flex gap-3 text-sm" style={{color:"var(--ink)"}}><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{background:"var(--gold)"}}/>{a}</li>)}</ul></Panel>
        <Panel title="Supportive foods" icon={Salad}><Chips items={area.foods}/></Panel>
      </div>
      <div className="mt-6 rounded-2xl border p-5" style={{background:"var(--paper)",borderColor:"rgba(201,162,74,.35)"}}>
        <div className="mb-2 flex items-center gap-2"><HandHeart size={17} color="var(--gold)"/><h3 className="font-display text-base font-600" style={{color:"var(--green)"}}>Biblical foundation</h3></div>
        <p className="text-sm italic" style={{color:"var(--muted)"}}>{area.faith}</p>
      </div>
      {related.length>0&&(
        <section className="mt-10">
          <h2 className="mb-4 font-display text-xl font-600" style={{color:"var(--green)"}}>Herbs that support this area</h2>
          <div className="grid gap-3 sm:grid-cols-2">{related.map((h)=>(
            <div key={h.id} className="card-hover flex items-center gap-3 rounded-xl border p-3" style={{background:"var(--paper)",borderColor:"rgba(61,107,80,.12)"}}>
              <button onClick={()=>onHerb(h.id)} className="flex flex-1 items-center gap-3 text-left">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg" style={{background:"rgba(126,144,121,.18)"}}><Leaf size={17} color="#3d5640"/></span>
                <span className="min-w-0"><span className="block font-display font-600" style={{color:"var(--green)"}}>{h.name}</span><span className="block truncate text-xs italic" style={{color:"var(--muted)"}}>{h.latin}</span></span>
              </button>
              <button onClick={()=>toggleFav(h.id)} className="shrink-0 p-1"><Heart size={17} color={favs.includes(h.id)?"var(--gold)":"#c4c0b2"} fill={favs.includes(h.id)?"var(--gold)":"none"}/></button>
            </div>
          ))}</div>
        </section>
      )}
      {area.id==="detox"&&<button onClick={()=>go({name:"cleansing"})} className="mt-8 inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-600" style={{background:"var(--gold)",color:"#2e5240"}}><Bug size={16}/> Open the full Cleansing section</button>}
    </div>
  );
}

/* ==================================================================
   SYSTEMS
   ================================================================== */
function SystemsList({onSys}){
  return(
    <div className="fade-up py-8">
      <h1 className="font-display text-3xl font-600" style={{color:"var(--green)"}}>The 11 Body Systems</h1>
      <p className="mt-2 text-sm" style={{color:"var(--muted)"}}>Yahweh created each system with a specific role. Tap any system to explore its function, supporting herbs, and the foods that feed it.</p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {SYSTEMS.map((s,i)=>{const Icon=s.icon; return(
          <button key={s.id} onClick={()=>onSys(s.id)} className="card-hover flex flex-col rounded-2xl border p-5 text-left" style={{background:"var(--paper)",borderColor:"rgba(61,107,80,.12)",animationDelay:`${i*25}ms`}}>
            <span className="mb-3 grid h-11 w-11 place-items-center rounded-xl" style={{background:"var(--green)",color:"var(--gold)"}}><Icon size={20}/></span>
            <h3 className="font-display text-lg font-600" style={{color:"var(--green)"}}>{s.name}</h3>
            <p className="mt-2 line-clamp-3 text-sm" style={{color:"var(--muted)"}}>{s.fn}</p>
          </button>
        );})}
      </div>
    </div>
  );
}
function SystemDetail({sys,onBack,onHerb}){
  if(!sys) return null;
  const Icon=sys.icon;
  const herbs=sys.herbs.map(herbById).filter(Boolean);
  return(
    <div className="fade-up py-8">
      <BackBtn onClick={onBack} label="All systems"/>
      <div className="rounded-2xl p-7" style={{background:"var(--green)"}}>
        <span className="grid h-12 w-12 place-items-center rounded-xl" style={{background:"rgba(201,162,74,.18)",color:"var(--gold)"}}><Icon size={24}/></span>
        <h1 className="mt-4 font-display text-2xl font-600 sm:text-3xl" style={{color:"var(--cream)"}}>{sys.name}</h1>
        <p className="mt-3 max-w-2xl text-sm" style={{color:"var(--sage)"}}>{sys.fn}</p>
      </div>
      <div className="mt-6"><Panel title="Foods that feed this system" icon={Salad}><Chips items={sys.foods}/></Panel></div>
      <section className="mt-8">
        <h2 className="mb-4 font-display text-xl font-600" style={{color:"var(--green)"}}>Herbs that support it</h2>
        <div className="grid gap-3 sm:grid-cols-2">{herbs.map((h)=>(
          <button key={h.id} onClick={()=>onHerb(h.id)} className="card-hover rounded-xl border p-4 text-left" style={{background:"var(--paper)",borderColor:"rgba(61,107,80,.12)"}}>
            <div className="flex items-center gap-2"><Leaf size={16} color="#3d5640"/><h3 className="font-display font-600" style={{color:"var(--green)"}}>{h.name}</h3></div>
            <p className="mt-1 line-clamp-2 text-sm" style={{color:"var(--muted)"}}>{h.uses}</p>
          </button>
        ))}</div>
      </section>
    </div>
  );
}

/* ==================================================================
   HERB LIBRARY + DETAIL
   ================================================================== */
const WHO_CHIPS = [{id:"all",label:"All herbs"},{id:"fav",label:"Saved"},{id:"who:all",label:"Safe for most"},{id:"who:women",label:"Women"},{id:"who:men",label:"Men"},{id:"who:pregnancy-avoid",label:"Avoid in pregnancy"},{id:"who:children-ok",label:"Children ok"}];

function HerbLibrary({favs,favOnly,onHerb,toggleFav,onMasterBlend}){
  const [filter,setFilter]=useState(favOnly?"fav":"all");
  const [fmt,setFmt]=useState("all");
  const list=useMemo(()=>{
    let l=HERBS;
    if(filter==="fav")          l=l.filter((h)=>favs.includes(h.id));
    else if(filter.startsWith("sys:")) l=l.filter((h)=>h.systems.includes(filter.slice(4)));
    else if(filter.startsWith("who:")) l=l.filter((h)=>h.who.includes(filter.slice(4)));
    if(fmt!=="all") l=l.filter((h)=>h.formats.some((f)=>f.toLowerCase().includes(fmt)));
    l=[...l].sort((a,b)=>a.latin.localeCompare(b.latin));
    return l;
  },[filter,fmt,favs]);
  const allChips=[...WHO_CHIPS,...SYSTEMS.map((s)=>({id:"sys:"+s.id,label:s.name.replace(/ \(.*\)/,"")}))];
  const fmtOptions=["all","tea","tincture","capsule","cream","oil","powder"];
  return(
    <div className="fade-up py-8">
      <h1 className="font-display text-3xl font-600" style={{color:"var(--green)"}}>Herb Library</h1>
      <p className="mt-2 text-sm" style={{color:"var(--muted)"}}>{HERBS.length} herbs, labeled by evidence, body system, who can use them, format, and safety.</p>

      {/* Master Blend featured card */}
      <button onClick={onMasterBlend} className="card-hover mt-5 w-full flex items-start gap-4 rounded-2xl p-5 text-left" style={{background:"var(--green)"}}>
        <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl" style={{background:"var(--gold)",color:"#2e5240"}}><Sparkles size={22}/></span>
        <span className="flex-1">
          <span className="block text-xs font-700 tracking-widest mb-1" style={{color:"var(--gold)"}}>FEATURED BLEND</span>
          <span className="block font-display text-xl font-600" style={{color:"var(--cream)"}}>{MASTER_BLEND.name}</span>
          <span className="block mt-1 text-sm" style={{color:"var(--sage)"}}>{MASTER_BLEND.tagline}</span>
          <span className="mt-3 inline-flex items-center gap-1 text-sm font-600" style={{color:"var(--gold)"}}>View full blend + infant protocol <ChevronRight size={15}/></span>
        </span>
      </button>
      <div className="scrollx mt-5 flex gap-2 overflow-x-auto pb-1">
        {allChips.map((c)=><button key={c.id} onClick={()=>setFilter(c.id)} className="shrink-0 rounded-full px-3.5 py-1.5 text-xs font-600 transition" style={filter===c.id?{background:"var(--green)",color:"var(--gold)"}:{background:"rgba(61,107,80,.07)",color:"var(--ink)"}}>{c.label}</button>)}
      </div>
      <div className="mt-3 flex flex-wrap items-center gap-2 text-xs" style={{color:"var(--muted)"}}>
        <span className="font-600">Format:</span>
        {fmtOptions.map((f)=><button key={f} onClick={()=>setFmt(f)} className="rounded-full px-2.5 py-1 font-600 capitalize" style={fmt===f?{background:"var(--gold)",color:"#2e5240"}:{background:"rgba(61,107,80,.06)",color:"var(--ink)"}}>{f}</button>)}
      </div>
      {list.length===0?(
        <p className="mt-12 text-center text-sm" style={{color:"var(--muted)"}}>Nothing here yet. Try another filter, or save herbs from any herb detail page.</p>
      ):(
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((h,i)=>(
            <button key={h.id} onClick={()=>onHerb(h.id)} className="card-hover flex flex-col rounded-2xl border p-5 text-left" style={{background:"var(--paper)",borderColor:"rgba(61,107,80,.12)",animationDelay:`${i*20}ms`}}>
              <div className="flex items-start justify-between gap-2">
                <span className="grid h-10 w-10 place-items-center rounded-lg" style={{background:"rgba(126,144,121,.18)"}}><Leaf size={18} color="#3d5640"/></span>
                <Heart size={18} color={favs.includes(h.id)?"var(--gold)":"#c4c0b2"} fill={favs.includes(h.id)?"var(--gold)":"none"} onClick={(e)=>{e.stopPropagation();toggleFav(h.id);}}/>
              </div>
              <h3 className="mt-3 font-display text-lg font-600" style={{color:"var(--green)"}}>{h.name}</h3>
              <p className="text-xs italic" style={{color:"var(--muted)"}}>{h.latin}</p>
              <p className="mt-2 line-clamp-3 flex-1 text-sm" style={{color:"var(--ink)"}}>{h.uses}</p>
              <div className="mt-3"><EvidenceBadge level={h.evidence}/></div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function HerbDetail({herb,favs,toggleFav,onBack,onSys,onAil}){
  if(!herb) return null;
  const fav=favs.includes(herb.id);
  const sysObjs=herb.systems.map((id)=>SYSTEMS.find((s)=>s.id===id)).filter(Boolean);
  const ailObjs=herb.ailments.map((id)=>AILMENTS.find((a)=>a.id===id)).filter(Boolean);
  return(
    <div className="fade-up py-8">
      <BackBtn onClick={onBack} label="Herb Library"/>
      <div className="rounded-2xl p-7" style={{background:"var(--green)"}}>
        <div className="flex items-start justify-between gap-4">
          <div><span className="grid h-12 w-12 place-items-center rounded-xl" style={{background:"rgba(201,162,74,.18)"}}><Leaf size={24} color="var(--gold)"/></span>
            <h1 className="mt-4 font-display text-3xl font-600" style={{color:"var(--cream)"}}>{herb.name}</h1>
            <p className="text-sm italic" style={{color:"var(--sage)"}}>{herb.latin}</p></div>
          <button onClick={()=>toggleFav(herb.id)} className="flex items-center gap-2 rounded-full px-4 py-2 text-sm font-600" style={{background:fav?"var(--gold)":"rgba(245,240,227,.12)",color:fav?"#2e5240":"var(--cream)"}}><Heart size={16} fill={fav?"#2e5240":"none"}/>{fav?"Saved":"Save"}</button>
        </div>
        <div className="mt-4 flex flex-wrap gap-2"><EvidenceBadge level={herb.evidence}/>{herb.who.map((w)=><span key={w} className="rounded-full px-2.5 py-1 text-xs font-600" style={{background:"rgba(245,240,227,.12)",color:"var(--gold-soft)"}}>{WHO_LABELS[w]||w}</span>)}</div>
      </div>
      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <Panel title="Traditional and researched uses" icon={BookOpen}><p className="text-sm leading-relaxed" style={{color:"var(--ink)"}}>{herb.uses}</p></Panel>
          <Panel title="Safety and cautions" icon={ShieldAlert}><p className="text-sm leading-relaxed" style={{color:"var(--ink)"}}>{herb.safety}</p></Panel>
          {ailObjs.length>0&&<Panel title="Commonly used for" icon={ClipboardList}><div className="space-y-2">{ailObjs.map((a)=><button key={a.id} onClick={()=>onAil(a.id)} className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm font-500" style={{background:"rgba(61,107,80,.06)",color:"var(--green)"}}>{a.name}<ChevronRight size={15} color="var(--gold)"/></button>)}</div></Panel>}
        </div>
        <div className="space-y-6">
          <Panel title="Key actions" icon={Sparkles}><Chips items={herb.actions} tone="gold"/></Panel>
          <Panel title="Common formats" icon={Droplets}><Chips items={herb.formats}/></Panel>
          {sysObjs.length>0&&<Panel title="Body systems" icon={Stethoscope}><div className="space-y-2">{sysObjs.map((s)=><button key={s.id} onClick={()=>onSys(s.id)} className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm font-500" style={{background:"rgba(61,107,80,.06)",color:"var(--green)"}}>{s.name}<ChevronRight size={15} color="var(--gold)"/></button>)}</div></Panel>}
        </div>
      </div>
    </div>
  );
}

/* ==================================================================
   AILMENTS
   ================================================================== */
function AilmentsList({onAil}){
  const cats=[...new Set(AILMENTS.map((a)=>a.cat))];
  return(
    <div className="fade-up py-8">
      <h1 className="font-display text-3xl font-600" style={{color:"var(--green)"}}>Ailments</h1>
      <p className="mt-2 text-sm" style={{color:"var(--muted)"}}>Common conditions grouped by system, each with supportive herbs, self help guidance, and when to seek professional care.</p>
      {cats.map((cat)=>(
        <section key={cat} className="mt-8">
          <h2 className="mb-3 text-xs font-700 tracking-widest" style={{color:"var(--sage)"}}>{cat.toUpperCase()}</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {AILMENTS.filter((a)=>a.cat===cat).map((a)=>(
              <button key={a.id} onClick={()=>onAil(a.id)} className="card-hover rounded-xl border p-4 text-left" style={{background:"var(--paper)",borderColor:"rgba(61,107,80,.12)"}}>
                <h3 className="font-display font-600" style={{color:"var(--green)"}}>{a.name}</h3>
                <p className="mt-1 line-clamp-2 text-sm" style={{color:"var(--muted)"}}>{a.desc}</p>
              </button>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
function AilmentDetail({ail,onBack,onHerb}){
  if(!ail) return null;
  const herbs=ail.herbs.map(herbById).filter(Boolean);
  return(
    <div className="fade-up py-8">
      <BackBtn onClick={onBack} label="All ailments"/>
      <div className="rounded-2xl p-7" style={{background:"var(--green)"}}>
        <span className="text-xs font-700 tracking-widest" style={{color:"var(--sage)"}}>{ail.cat.toUpperCase()}</span>
        <h1 className="mt-2 font-display text-2xl font-600 sm:text-3xl" style={{color:"var(--cream)"}}>{ail.name}</h1>
        <p className="mt-3 max-w-2xl text-sm" style={{color:"var(--sage)"}}>{ail.desc}</p>
      </div>
      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Panel title="Diet and self help" icon={Salad}><p className="text-sm leading-relaxed" style={{color:"var(--ink)"}}>{ail.self}</p></Panel>
        <div className="flex gap-3 rounded-2xl border p-5" style={{background:"#fdf6e8",borderColor:"#e3c47e"}}><ShieldAlert size={20} color="#b9892f" className="mt-0.5 shrink-0"/><div><h3 className="font-display text-base font-600" style={{color:"#7a5e1c"}}>When to seek professional care</h3><p className="mt-1 text-sm" style={{color:"#7a5e1c"}}>{ail.seek}</p></div></div>
      </div>
      <section className="mt-8">
        <h2 className="mb-4 font-display text-xl font-600" style={{color:"var(--green)"}}>Supportive herbs</h2>
        <div className="grid gap-3 sm:grid-cols-2">{herbs.map((h)=>(
          <button key={h.id} onClick={()=>onHerb(h.id)} className="card-hover rounded-xl border p-4 text-left" style={{background:"var(--paper)",borderColor:"rgba(61,107,80,.12)"}}>
            <div className="flex items-center justify-between"><div className="flex items-center gap-2"><Leaf size={16} color="#3d5640"/><h3 className="font-display font-600" style={{color:"var(--green)"}}>{h.name}</h3></div><EvidenceBadge level={h.evidence}/></div>
            <p className="mt-1 line-clamp-2 text-sm" style={{color:"var(--muted)"}}>{h.uses}</p>
          </button>
        ))}</div>
      </section>
    </div>
  );
}

/* ==================================================================
   NUTRITION + CLEANSING + MOVEMENT
   ================================================================== */
function NutritionView({go}){
  return(
    <div className="fade-up py-8">
      <h1 className="font-display text-3xl font-600" style={{color:"var(--green)"}}>Nutrition and Whole Foods</h1>
      <p className="mt-2 text-sm" style={{color:"var(--muted)"}}>Food is the foundation. Eat real, recognizable food; return to grains prepared the old way; and feed the whole body starting with the gut.</p>

      <div className="mt-6 rounded-2xl p-6" style={{background:"var(--green)"}}>
        <div className="flex items-center gap-2"><Flame size={18} color="var(--gold)"/><h2 className="font-display text-xl font-600" style={{color:"var(--cream)"}}>Why processed sugar sits at the root</h2></div>
        <p className="mt-3 text-sm" style={{color:"var(--sage)"}}>Of all modern food changes, refined and added sugar with ultra processed food does the most damage. A steady flood of sugar drives insulin resistance, weight gain, and chronic inflammation, the ground in which much modern disease grows. It also disrupts the gut microbiome. And while no large clinical trial has formally confirmed this, parasites feed on sugar, and people carrying them characteristically crave it intensely. Cutting processed sugar addresses multiple problems at once.</p>
      </div>

      <div className="mt-6 rounded-2xl border p-6" style={{background:"var(--paper)",borderColor:"rgba(201,162,74,.35)"}}>
        <div className="mb-3 flex items-center gap-2"><Wheat size={18} color="var(--gold)"/><h2 className="font-display text-xl font-600" style={{color:"var(--green)"}}>Back to the original grains</h2></div>
        <p className="mb-4 text-sm leading-relaxed" style={{color:"var(--ink)"}}>Modern ultra processed grain is stripped, bleached, and rushed. For most of history, people ate ancient grains that were soaked, sprouted, or fermented, which improves digestibility and nutrient availability. Soaking and sprouting reduces phytic acid by up to 50% (Hurrell et al. 2003, British Journal of Nutrition), unlocking minerals that refined grain simply cannot provide.</p>
        <div className="grid gap-4 sm:grid-cols-2">
          <div><h3 className="mb-2 text-xs font-700 tracking-wide" style={{color:"#3d5640"}}>LEAN TOWARD</h3><Chips items={["Einkorn and emmer","Spelt and kamut","Sprouted grain bread","True sourdough (4+ hour ferment)","Intact whole grains","Soaked oats and barley"]}/></div>
          <div><h3 className="mb-2 text-xs font-700 tracking-wide" style={{color:"#b9892f"}}>LEAN AWAY FROM</h3><Chips items={["Refined white flour","Enriched processed bread","Sugary cereals","Packaged snack foods","Ultra processed baked goods"]} tone="gold"/></div>
        </div>
        <p className="mt-4 text-xs italic" style={{color:"var(--muted)"}}>Note: original grains still contain gluten. Soaking and fermentation improve digestibility but do not remove it. Not suitable for celiac disease.</p>
      </div>

      <section className="mt-8">
        <div className="mb-4 flex items-center gap-2"><Soup size={18} color="var(--gold)"/><h2 className="font-display text-2xl font-600" style={{color:"var(--green)"}}>Simple meals that feed the whole body</h2></div>
        <p className="mb-4 text-sm" style={{color:"var(--muted)"}}>Each meal nourishes multiple systems at once, with gut health as the first priority since so much else depends on it.</p>
        <div className="grid gap-4 sm:grid-cols-2">
          {MEALS.map((m)=>(
            <div key={m.n} className="rounded-2xl border p-5" style={{background:"var(--paper)",borderColor:"rgba(61,107,80,.12)"}}>
              <h3 className="font-display text-lg font-600" style={{color:"var(--green)"}}>{m.n}</h3>
              <span className="mt-1 inline-block rounded-full px-2.5 py-1 text-xs font-600" style={{background:"rgba(126,144,121,.16)",color:"#3d5640"}}>Feeds: {m.feeds}</span>
              <p className="mt-3 text-sm" style={{color:"var(--ink)"}}>{m.items}</p>
              <p className="mt-2 text-sm italic" style={{color:"var(--muted)"}}>{m.why}</p>
            </div>
          ))}
        </div>
      </section>
      <button onClick={()=>go({name:"systems"})} className="mt-8 inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-600" style={{background:"var(--gold)",color:"#2e5240"}}><Stethoscope size={16}/> See foods mapped to each body system</button>
    </div>
  );
}

function CleansingView({onHerb}){
  const trio=["clove","wormwood","black-walnut"].map(herbById).filter(Boolean);
  const trioPurpose={clove:"Traditionally said to address parasite eggs.",wormwood:"Traditionally said to target larvae and adults.",["black-walnut"]:"Traditionally said to target adult worms."};
  return(
    <div className="fade-up py-8">
      <h1 className="font-display text-3xl font-600" style={{color:"var(--green)"}}>Cleansing and Parasites</h1>
      <div className="mt-6 flex gap-3 rounded-2xl border p-5" style={{background:"#fdf6e8",borderColor:"#e3c47e"}}><ShieldAlert size={22} color="#b9892f" className="mt-0.5 shrink-0"/><div><h3 className="font-display text-base font-600" style={{color:"#7a5e1c"}}>Read first</h3><p className="mt-1 text-sm" style={{color:"#7a5e1c"}}>Suspected parasitic infection should be confirmed with a stool test and treated under professional care. The traditional protocol below is educational. Wormwood and black walnut are potent. This is not for pregnancy, nursing, or children without a provider's guidance.</p></div></div>
      <section className="mt-8">
        <h2 className="mb-2 font-display text-xl font-600" style={{color:"var(--green)"}}>Parasites that affect people</h2>
        <div className="space-y-3">{PARASITES.map((p)=>(
          <div key={p.name} className="rounded-2xl border p-5" style={{background:"var(--paper)",borderColor:"rgba(61,107,80,.12)"}}>
            <div className="flex items-baseline gap-2"><Bug size={16} color="#3d5640"/><h3 className="font-display text-lg font-600" style={{color:"var(--green)"}}>{p.name}</h3><span className="text-xs italic" style={{color:"var(--muted)"}}>{p.latin}</span></div>
            <p className="mt-2 text-sm" style={{color:"var(--ink)"}}><span className="font-600" style={{color:"#3d5640"}}>Where: </span>{p.where}</p>
            <p className="mt-1 text-sm" style={{color:"var(--ink)"}}><span className="font-600" style={{color:"#b9892f"}}>Symptoms: </span>{p.symptoms}</p>
            <p className="mt-1 text-xs italic" style={{color:"var(--muted)"}}>{p.note}</p>
          </div>
        ))}</div>
      </section>
      <section className="mt-10">
        <h2 className="mb-2 font-display text-xl font-600" style={{color:"var(--green)"}}>The traditional cleansing trio</h2>
        <div className="grid gap-3 sm:grid-cols-3 mb-6">{trio.map((h)=>(
          <button key={h.id} onClick={()=>onHerb(h.id)} className="card-hover rounded-xl border p-4 text-left" style={{background:"var(--paper)",borderColor:"rgba(61,107,80,.12)"}}>
            <div className="flex items-center gap-2"><Leaf size={16} color="#3d5640"/><h3 className="font-display font-600" style={{color:"var(--green)"}}>{h.name}</h3></div>
            <p className="mt-1 text-sm" style={{color:"var(--muted)"}}>{trioPurpose[h.id]}</p>
          </button>
        ))}</div>
        <div className="grid gap-4 lg:grid-cols-2">
          <Panel title="The role of a binder" icon={Shield}><p className="text-sm leading-relaxed" style={{color:"var(--ink)"}}>Cleansing should never be done without a binder. As organisms are cleared, released byproducts can trigger die off symptoms (headache, fatigue, irritability). A binder such as activated charcoal, bentonite clay, or psyllium husk is taken to bind those byproducts, taken 2 hours away from food and other medicines.</p></Panel>
          <Panel title="Timing and rhythm" icon={CalendarRange}><p className="text-sm leading-relaxed" style={{color:"var(--ink)"}}>Because parasites move through eggs, larvae, and adult stages, traditional protocols use all three herbs together to cover all stages. The traditional rhythm is twice a year, often spring and fall. Hydration, fiber, and a low sugar diet support the whole process.</p></Panel>
        </div>
        <p className="mt-4 text-sm italic" style={{color:"var(--muted)"}}>Restoruh does not publish specific doses. Any cleanse involving wormwood or black walnut should be carried out with a qualified practitioner and never for children or in pregnancy without professional supervision.</p>
      </section>
    </div>
  );
}

function MovementView(){
  return(
    <div className="fade-up py-8">
      <h1 className="font-display text-3xl font-600" style={{color:"var(--green)"}}>Movement and Mobility</h1>
      <p className="mt-2 text-sm" style={{color:"var(--muted)"}}>Yahweh designed the body to move. These home exercises need no equipment and go from easy to challenging so every family member can start and grow.</p>
      {Object.entries(EXERCISES).map(([key,group])=>(
        <section key={key} className="mt-8">
          <div className="mb-3 flex items-center gap-2"><span className="h-3 w-3 rounded-full" style={{background:group.color}}/><h2 className="font-display text-xl font-600" style={{color:"var(--green)"}}>{group.label}</h2></div>
          <div className="grid gap-3 sm:grid-cols-2">{group.items.map((e)=>(
            <div key={e.n} className="rounded-xl border p-4" style={{background:"var(--paper)",borderColor:"rgba(61,107,80,.12)"}}>
              <h3 className="font-display font-600" style={{color:"var(--green)"}}>{e.n}</h3>
              <p className="mt-1 text-sm" style={{color:"var(--muted)"}}>{e.d}</p>
            </div>
          ))}</div>
        </section>
      ))}
      <section className="mt-10">
        <div className="mb-3 flex items-center gap-2"><Sprout size={18} color="var(--gold)"/><h2 className="font-display text-xl font-600" style={{color:"var(--green)"}}>Stretching and mobility</h2></div>
        <div className="grid gap-4 lg:grid-cols-2 mb-6">
          <Panel title="Why stretching matters" icon={Info}><p className="text-sm leading-relaxed" style={{color:"var(--ink)"}}>Regular stretching restores range of motion, eases stiffness built from sitting, improves circulation to muscles, lowers the risk of strains, and calms the nervous system. A few minutes after movement, when muscles are warm, does the most good.</p></Panel>
          <Panel title="Why mobility matters" icon={Activity}><p className="text-sm leading-relaxed" style={{color:"var(--ink)"}}>Mobility is the ability to move a joint actively through its full range. It keeps joints nourished, prevents aches and compensations from stiff hips and shoulders, and protects independence as we age. Daily mobility work is one of the highest return habits for a long, capable life.</p></Panel>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{STRETCHES.map((s)=>(
          <div key={s.n} className="rounded-xl border p-4" style={{background:"var(--paper)",borderColor:"rgba(61,107,80,.12)"}}>
            <h3 className="font-display font-600" style={{color:"var(--green)"}}>{s.n}</h3>
            <p className="mt-1 text-sm" style={{color:"var(--muted)"}}>{s.d}</p>
          </div>
        ))}</div>
      </section>
      <div className="mt-8 flex gap-3 rounded-xl p-4" style={{background:"rgba(61,107,80,.06)"}}><Info size={17} color="var(--green)" className="mt-0.5 shrink-0"/><p className="text-sm" style={{color:"var(--muted)"}}>Start where you are and build slowly. If you have an injury, heart condition, are pregnant, or are returning after a long break, check with a provider before beginning.</p></div>
    </div>
  );
}

/* ==================================================================
   FAMILY PLAN  -  research-based, connected to library
   ================================================================== */
const FOCUS_OPTS = [
  {id:"gut",       icon:Salad,      label:"Gut and Digestion"},
  {id:"nutrition", icon:Wheat,      label:"Nutrition and Whole Foods"},
  {id:"inflammation",icon:Flame,    label:"Calming Inflammation"},
  {id:"detox",     icon:Droplets,   label:"Gentle Cleansing"},
  {id:"energy",    icon:Activity,   label:"Energy and Vitality"},
  {id:"mindset",   icon:Brain,      label:"Mind and Resilience"},
  {id:"spiritual", icon:HandHeart,  label:"Walking with Yahweh Rapha"},
];

function FamilyPlan({user,favs,planPhases,togglePhase,onHerb}){
  const [step,  setStep]  = useState(1);
  const [family,setFamily]= useState({adults:2,teens:0,children:0,infants:0,pregnantNursing:false});
  const [focus, setFocus] = useState([]);
  const [activeArea, setActiveArea] = useState(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(()=>{
    (async()=>{
      try{
        const k=`restoruh:plansetup:${user.email}`;
        const r=await window.storage.get(k);
        if(r?.value){ const d=JSON.parse(r.value); if(d.family) setFamily(d.family); if(d.focus?.length){ setFocus(d.focus); setActiveArea(d.focus[0]); setStep(3); } }
      }catch(_){}
      setLoaded(true);
    })();
  },[]);

  useEffect(()=>{
    if(!loaded) return;
    (async()=>{ try{ await window.storage.set(`restoruh:plansetup:${user.email}`,JSON.stringify({family,focus})); }catch(_){} })();
  },[family,focus,loaded]);

  const savePlan = () => { if(focus.length>0){ setActiveArea(focus[0]); setStep(3); window.scrollTo({top:0}); } };
  const reset    = () => { setFamily({adults:2,teens:0,children:0,infants:0,pregnantNursing:false}); setFocus([]); setStep(1); setActiveArea(null); };
  const hasKids  = family.children>0||family.infants>0;

  /* saved herbs relevant to a focus area */
  const savedForArea = (areaId) => {
    const areaHerbIds = AREAS.find((a)=>a.id===areaId)?.herbs||[];
    return HERBS.filter((h)=>favs.includes(h.id)&&areaHerbIds.includes(h.id));
  };

  return(
    <div className="py-8">
      <div className="fade-up mb-6 rounded-2xl p-5" style={{background:"var(--green)"}}>
        <div className="flex items-center gap-2"><Scale size={18} color="var(--gold)"/><h1 className="font-display text-xl font-600" style={{color:"var(--cream)"}}>Family Action Plan</h1></div>
        <p className="mt-2 text-sm" style={{color:"var(--sage)"}}>Research informed week by week protocols for the areas your household is stewarding. Your saved herbs connect directly to the relevant phases of each protocol.</p>
        <p className="mt-1 text-xs" style={{color:"var(--muted)"}}>Signed in as {user.name}</p>
      </div>

      {/* step progress */}
      <div className="mb-6 flex items-center gap-2 text-xs font-600" style={{color:"var(--muted)"}}>
        {["Family","Focus","Protocol"].map((s,i)=>(
          <React.Fragment key={s}>
            <span className="flex items-center gap-1.5"><span className="grid h-5 w-5 place-items-center rounded-full text-[11px]" style={step>=i+1?{background:"var(--gold)",color:"#2e5240"}:{background:"rgba(61,107,80,.1)"}}>{step>i+1?<Check size={12}/>:i+1}</span><span style={step===i+1?{color:"var(--green)"}:{}}>{s}</span></span>
            {i<2&&<ChevronRight size={13} className="opacity-40"/>}
          </React.Fragment>
        ))}
      </div>

      {step===1&&<PlanStep1 family={family} setFamily={setFamily} onNext={()=>setStep(2)}/>}
      {step===2&&<PlanStep2 focus={focus} setFocus={setFocus} onBack={()=>setStep(1)} onNext={savePlan}/>}
      {step===3&&(
        <div className="fade-up">
          {/* area tabs */}
          <div className="scrollx flex gap-2 overflow-x-auto pb-2">
            {focus.map((id)=>{
              const a=FOCUS_OPTS.find((f)=>f.id===id); if(!a) return null;
              const Icon=a.icon;
              return <button key={id} onClick={()=>setActiveArea(id)} className="shrink-0 flex items-center gap-2 rounded-full px-4 py-2 text-sm font-600 transition" style={activeArea===id?{background:"var(--green)",color:"var(--gold)"}:{background:"rgba(61,107,80,.08)",color:"var(--ink)"}}><Icon size={14}/>{a.label}</button>;
            })}
            <button onClick={()=>setStep(2)} className="shrink-0 rounded-full border px-3 py-2 text-xs font-600" style={{borderColor:"rgba(61,107,80,.2)",color:"var(--muted)"}}>Edit areas</button>
          </div>

          {activeArea&&<ProtocolView areaId={activeArea} favs={favs} planPhases={planPhases} togglePhase={togglePhase} onHerb={onHerb} savedHerbs={savedForArea(activeArea)} hasKids={hasKids} pregnantNursing={family.pregnantNursing}/>}
          <button onClick={reset} className="mt-10 inline-flex items-center gap-2 text-xs font-600" style={{color:"var(--muted)"}}><RotateCcw size={13}/> Start over</button>
        </div>
      )}
    </div>
  );
}

function ProtocolView({areaId,favs,planPhases,togglePhase,onHerb,savedHerbs,hasKids,pregnantNursing}){
  const area     = AREAS.find((a)=>a.id===areaId);
  const protocol = PROTOCOLS[areaId];
  if(!area||!protocol) return null;

  const totalPhases = protocol.length;
  const doneCount   = protocol.filter((_,i)=>planPhases[`${areaId}:${i}`]).length;

  return(
    <div className="mt-6 fade-up">
      <div className="flex items-center justify-between gap-3 mb-4">
        <h2 className="font-display text-xl font-600" style={{color:"var(--green)"}}>{area.short}</h2>
        <span className="text-sm font-600" style={{color:doneCount===totalPhases?"#3f7d4f":"var(--muted)"}}>{doneCount}/{totalPhases} phases</span>
      </div>

      {/* progress bar */}
      <div className="h-2 w-full overflow-hidden rounded-full mb-6" style={{background:"rgba(61,107,80,.1)"}}>
        <div className="h-full rounded-full transition-all" style={{width:`${(doneCount/totalPhases)*100}%`,background:"var(--gold)"}}/>
      </div>

      {/* saved herbs for this area */}
      {savedHerbs.length>0&&(
        <div className="mb-6 rounded-xl border p-4" style={{background:"rgba(201,162,74,.1)",borderColor:"rgba(201,162,74,.35)"}}>
          <div className="flex items-center gap-2 mb-3"><Heart size={16} color="var(--gold)"/><h3 className="text-sm font-700" style={{color:"var(--green)"}}>Your saved herbs for this area</h3></div>
          <div className="flex flex-wrap gap-2">{savedHerbs.map((h)=>(
            <button key={h.id} onClick={()=>onHerb(h.id)} className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-600" style={{background:"var(--gold)",color:"#2e5240"}}><Leaf size={12}/>{h.name}</button>
          ))}</div>
        </div>
      )}

      {(pregnantNursing||hasKids)&&(
        <div className="mb-6 flex gap-3 rounded-xl p-4" style={{background:"rgba(126,144,121,.14)"}}>
          <ShieldAlert size={18} color="#3d5640" className="mt-0.5 shrink-0"/>
          <p className="text-sm" style={{color:"#3d5640"}}>{pregnantNursing?"Pregnancy or nursing is present: avoid wormwood, black walnut, and many other protocol herbs. Consult your provider before using any herb.":"Children are in your household: lean on food, sleep, and movement for them. Check with a pediatric provider before giving any herb or supplement."}</p>
        </div>
      )}

      {/* week by week phases */}
      {protocol.map((phase,i)=>{
        const phaseKey=`${areaId}:${i}`;
        const done=!!planPhases[phaseKey];
        const phaseHerbs=(phase.herbs||[]).map(herbById).filter(Boolean);
        return(
          <div key={i} className="mb-5 rounded-2xl border overflow-hidden" style={{borderColor:done?"rgba(63,125,79,.5)":"rgba(61,107,80,.12)"}}>
            <div className="flex items-start justify-between gap-3 p-5" style={{background:done?"rgba(63,125,79,.08)":"var(--paper)"}}>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-700 tracking-widest" style={{color:done?"#3f7d4f":"var(--gold)"}}>{phase.range.toUpperCase()}</span>
                  {done&&<span className="text-xs font-600" style={{color:"#3f7d4f"}}>Complete</span>}
                </div>
                <h3 className="font-display text-lg font-600" style={{color:"var(--green)"}}>{phase.title}</h3>
              </div>
              <button onClick={()=>togglePhase(phaseKey)} className="shrink-0 grid h-8 w-8 place-items-center rounded-full border-2 transition" style={done?{background:"#3f7d4f",borderColor:"#3f7d4f",color:"#fff"}:{borderColor:"rgba(61,107,80,.3)"}}>{done&&<Check size={16}/>}</button>
            </div>

            <div className="p-5 pt-0 space-y-4" style={{background:done?"rgba(63,125,79,.04)":"var(--paper)"}}>
              <div>
                <h4 className="mb-2 text-xs font-700 tracking-wide" style={{color:"var(--sage)"}}>ACTIONS</h4>
                <ul className="space-y-2">{phase.steps.map((s,j)=>(
                  <li key={j} className="flex gap-3 text-sm" style={{color:"var(--ink)"}}><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{background:"var(--gold)"}}/>{s}</li>
                ))}</ul>
              </div>

              <div className="rounded-xl p-4" style={{background:"rgba(61,107,80,.05)"}}>
                <h4 className="mb-1 text-xs font-700 tracking-wide" style={{color:"var(--sage)"}}>RESEARCH NOTE</h4>
                <p className="text-xs leading-relaxed" style={{color:"var(--muted)"}}>{phase.evidence}</p>
              </div>

              {phase.caution&&<div className="flex gap-2 rounded-xl p-3" style={{background:"rgba(154,61,47,.08)"}}><ShieldAlert size={15} color="#9a3d2f" className="mt-0.5 shrink-0"/><p className="text-xs" style={{color:"#9a3d2f"}}>Proceed with a practitioner only. Not for pregnancy, nursing, or children. Use a binder.</p></div>}

              {phaseHerbs.length>0&&(
                <div>
                  <h4 className="mb-2 text-xs font-700 tracking-wide" style={{color:"var(--sage)"}}>RELEVANT HERBS</h4>
                  <div className="flex flex-wrap gap-2">{phaseHerbs.map((h)=>(
                    <button key={h.id} onClick={()=>onHerb(h.id)} className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-600 transition" style={favs.includes(h.id)?{background:"var(--gold)",color:"#2e5240"}:{background:"rgba(61,107,80,.07)",color:"var(--green)"}}>
                      <Leaf size={12}/>{h.name}{favs.includes(h.id)&&<Heart size={11} fill="currentColor"/>}
                    </button>
                  ))}</div>
                  <p className="mt-2 text-[11px]" style={{color:"var(--muted)"}}>Gold = saved in your library. Tap any herb to open its full entry.</p>
                </div>
              )}
            </div>
          </div>
        );
      })}

      <div className="mt-4 rounded-xl p-4" style={{background:"rgba(201,162,74,.12)"}}>
        <div className="flex items-center gap-2 mb-1"><HandHeart size={15} color="var(--gold)"/><h4 className="text-xs font-700" style={{color:"var(--green)"}}>Biblical foundation</h4></div>
        <p className="text-sm italic" style={{color:"var(--muted)"}}>{area.faith}</p>
      </div>
    </div>
  );
}

function PlanStepper({label,icon:Icon,value,onChange,hint}){
  return(
    <div className="flex items-center justify-between rounded-xl border p-4" style={{background:"var(--paper)",borderColor:"rgba(61,107,80,.12)"}}>
      <div className="flex items-center gap-3"><span className="grid h-9 w-9 place-items-center rounded-lg" style={{background:"rgba(126,144,121,.18)"}}><Icon size={17} color="#3d5640"/></span><div><span className="block font-600" style={{color:"var(--green)"}}>{label}</span>{hint&&<span className="block text-xs" style={{color:"var(--muted)"}}>{hint}</span>}</div></div>
      <div className="flex items-center gap-3">
        <button onClick={()=>onChange(Math.max(0,value-1))} className="grid h-8 w-8 place-items-center rounded-full font-600" style={{background:"rgba(61,107,80,.08)",color:"var(--green)"}}>-</button>
        <span className="w-6 text-center font-display text-lg font-600" style={{color:"var(--green)"}}>{value}</span>
        <button onClick={()=>onChange(Math.min(20,value+1))} className="grid h-8 w-8 place-items-center rounded-full font-600" style={{background:"var(--gold)",color:"#2e5240"}}>+</button>
      </div>
    </div>
  );
}
function PlanStep1({family,setFamily,onNext}){
  const total=family.adults+family.teens+family.children+family.infants;
  return(
    <div className="fade-up">
      <h2 className="font-display text-2xl font-600" style={{color:"var(--green)"}}>Who are we stewarding?</h2>
      <p className="mt-1 text-sm" style={{color:"var(--muted)"}}>Rough numbers only. This shapes which cautions appear in your protocols.</p>
      <div className="mt-5 space-y-3">
        <PlanStepper label="Adults" hint="18 and up" icon={Users} value={family.adults} onChange={(v)=>setFamily({...family,adults:v})}/>
        <PlanStepper label="Teens" hint="13 to 17" icon={Users} value={family.teens} onChange={(v)=>setFamily({...family,teens:v})}/>
        <PlanStepper label="Children" hint="4 to 12" icon={Sprout} value={family.children} onChange={(v)=>setFamily({...family,children:v})}/>
        <PlanStepper label="Infants and toddlers" hint="0 to 3" icon={Baby} value={family.infants} onChange={(v)=>setFamily({...family,infants:v})}/>
        <button onClick={()=>setFamily({...family,pregnantNursing:!family.pregnantNursing})} className="flex w-full items-center justify-between rounded-xl border p-4 text-left" style={{background:"var(--paper)",borderColor:family.pregnantNursing?"var(--gold)":"rgba(61,107,80,.12)"}}>
          <span className="flex items-center gap-3"><span className="grid h-9 w-9 place-items-center rounded-lg" style={{background:"rgba(201,162,74,.18)"}}><Heart size={17} color="var(--gold)"/></span><span className="font-600" style={{color:"var(--green)"}}>Someone is pregnant or nursing</span></span>
          <span className="grid h-6 w-6 place-items-center rounded-full" style={family.pregnantNursing?{background:"var(--gold)",color:"#2e5240"}:{border:"2px solid rgba(61,107,80,.2)"}}>{family.pregnantNursing&&<Check size={14}/>}</span>
        </button>
      </div>
      <button onClick={onNext} disabled={total===0} className="mt-6 flex w-full items-center justify-center gap-2 rounded-full py-3 font-700 disabled:opacity-40" style={{background:"var(--green)",color:"var(--gold)"}}>Continue <ChevronRight size={16}/></button>
    </div>
  );
}
function PlanStep2({focus,setFocus,onBack,onNext}){
  const toggle=(id)=>setFocus(focus.includes(id)?focus.filter((f)=>f!==id):[...focus,id]);
  return(
    <div className="fade-up">
      <BackBtn onClick={onBack} label="Back"/>
      <h2 className="font-display text-2xl font-600" style={{color:"var(--green)"}}>Which areas will your family steward?</h2>
      <p className="mt-1 text-sm" style={{color:"var(--muted)"}}>Choose one or more. Each one generates a dedicated research based protocol with week by week guidance.</p>
      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        {FOCUS_OPTS.map((a)=>{const Icon=a.icon; const on=focus.includes(a.id); return(
          <button key={a.id} onClick={()=>toggle(a.id)} className="card-hover flex items-center gap-3 rounded-xl border p-4 text-left" style={{background:"var(--paper)",borderColor:on?"var(--gold)":"rgba(61,107,80,.12)"}}>
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg" style={on?{background:"var(--gold)",color:"#2e5240"}:{background:"rgba(126,144,121,.18)",color:"#3d5640"}}><Icon size={18}/></span>
            <span className="flex-1 font-display font-600" style={{color:"var(--green)"}}>{a.label}</span>
            {on&&<Check size={18} color="var(--gold)"/>}
          </button>
        );})}
      </div>
      {focus.length>3&&<div className="mt-4 flex gap-3 rounded-xl border p-4" style={{background:"#fdf6e8",borderColor:"#e3c47e"}}><Scale size={18} color="#b9892f" className="mt-0.5 shrink-0"/><p className="text-sm" style={{color:"#7a5e1c"}}>You have chosen {focus.length} areas. Good stewardship means starting with what is most urgent and building from there. Consider focusing on 1 to 2 first.</p></div>}
      <button onClick={onNext} disabled={focus.length===0} className="mt-6 flex w-full items-center justify-center gap-2 rounded-full py-3 font-700 disabled:opacity-40" style={{background:"var(--green)",color:"var(--gold)"}}>Build our protocols <Sparkles size={16}/></button>
    </div>
  );
}

/* ==================================================================
   NUTRIENTS + SEARCH + DISCLAIMER
   ================================================================== */
/* ==================================================================
   MASTER BLEND VIEW
   ================================================================== */
function MasterBlendView({onHerb,onBack}){
  const [tab,setTab]=useState("adult");

  const HerbPill = ({id,note,role})=>{
    const h=herbById(id); if(!h) return null;
    return(
      <button onClick={()=>onHerb(id)} className="card-hover rounded-xl border p-4 text-left w-full" style={{background:"var(--paper)",borderColor:"rgba(61,107,80,.12)"}}>
        <div className="flex items-center gap-2 mb-1"><Leaf size={14} color="#3d5640"/><span className="font-display font-600" style={{color:"var(--green)"}}>{h.name}</span></div>
        <span className="text-xs font-700" style={{color:"var(--gold)"}}>{role}</span>
        {note&&<p className="mt-1 text-xs" style={{color:"var(--muted)"}}>{note}</p>}
        {!note&&<p className="mt-1 text-xs italic" style={{color:"var(--muted)"}}>{h.latin}</p>}
      </button>
    );
  };

  return(
    <div className="fade-up py-8">
      <BackBtn onClick={onBack} label="Herb Library"/>

      {/* hero */}
      <div className="rounded-2xl p-7" style={{background:"var(--green)"}}>
        <span className="grid h-12 w-12 place-items-center rounded-xl" style={{background:"var(--gold)",color:"#2e5240"}}><Sparkles size={24}/></span>
        <span className="mt-3 block text-xs font-700 tracking-widest" style={{color:"var(--gold)"}}>FEATURED BLEND</span>
        <h1 className="mt-1 font-display text-2xl font-600 sm:text-3xl" style={{color:"var(--cream)"}}>{MASTER_BLEND.name}</h1>
        <p className="mt-3 max-w-2xl text-sm" style={{color:"var(--sage)"}}>{MASTER_BLEND.purpose}</p>
      </div>

      {/* nutrient coverage summary */}
      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {[
          ["Vitamin A",  MASTER_BLEND.nutrients.a],
          ["Vitamin C",  MASTER_BLEND.nutrients.c],
          ["Vitamin E",  MASTER_BLEND.nutrients.e],
          ["Zinc",       MASTER_BLEND.nutrients.zinc],
          ["B Complex",  MASTER_BLEND.nutrients.b],
          ["Skin",       MASTER_BLEND.skin],
        ].map(([label,text])=>(
          <div key={label} className="rounded-xl border p-4" style={{background:"var(--paper)",borderColor:"rgba(61,107,80,.12)"}}>
            <span className="text-xs font-700 tracking-wide" style={{color:"var(--gold)"}}>{label.toUpperCase()}</span>
            <p className="mt-1 text-xs leading-relaxed" style={{color:"var(--muted)"}}>{text}</p>
          </div>
        ))}
      </div>

      {/* version tabs */}
      <div className="mt-8 flex rounded-xl overflow-hidden border" style={{borderColor:"rgba(61,107,80,.15)"}}>
        {[["adult","Adult Formula"],["infant","Infant Formula (7 months+)"]].map(([t,label])=>(
          <button key={t} onClick={()=>setTab(t)} className="flex-1 py-3 text-sm font-600 transition"
            style={tab===t?{background:"var(--green)",color:"var(--gold)"}:{color:"var(--muted)",background:"var(--paper)"}}>{label}</button>
        ))}
      </div>

      {/* ADULT TAB */}
      {tab==="adult"&&(
        <div className="mt-6 space-y-6 fade-up">
          <div>
            <h2 className="mb-3 font-display text-xl font-600" style={{color:"var(--green)"}}>Herbs in the adult blend</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {MASTER_BLEND.adultHerbs.map((h)=>(
                <button key={h.id} onClick={()=>onHerb(h.id)} className="card-hover rounded-xl border p-4 text-left" style={{background:"var(--paper)",borderColor:"rgba(61,107,80,.12)"}}>
                  <div className="flex items-center gap-2 mb-1"><Leaf size={14} color="#3d5640"/><span className="font-display font-600" style={{color:"var(--green)"}}>{herbById(h.id)?.name||h.id}</span></div>
                  <span className="text-xs font-700" style={{color:"var(--gold)"}}>{h.role}</span>
                  <p className="mt-1 text-xs" style={{color:"var(--muted)"}}>{h.nutrients}</p>
                  <p className="mt-1.5 text-xs italic" style={{color:"#3d5640"}}>{h.gut}</p>
                </button>
              ))}
            </div>
          </div>
          <Panel title={MASTER_BLEND.adultPrep.label} icon={Soup}>
            <ol className="space-y-3">
              {MASTER_BLEND.adultPrep.steps.map((s,i)=>(
                <li key={i} className="flex gap-3 text-sm" style={{color:"var(--ink)"}}>
                  <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full text-[11px] font-700" style={{background:"var(--gold)",color:"#2e5240"}}>{i+1}</span>
                  {s}
                </li>
              ))}
            </ol>
          </Panel>
          <div className="rounded-2xl border p-5" style={{background:"var(--paper)",borderColor:"rgba(201,162,74,.35)"}}>
            <div className="flex items-center gap-2 mb-2"><HandHeart size={17} color="var(--gold)"/><h3 className="font-display text-base font-600" style={{color:"var(--green)"}}>Biblical foundation</h3></div>
            <p className="text-sm italic" style={{color:"var(--muted)"}}>{MASTER_BLEND.faith}</p>
          </div>
        </div>
      )}

      {/* INFANT TAB */}
      {tab==="infant"&&(
        <div className="mt-6 space-y-6 fade-up">
          <div className="flex gap-3 rounded-2xl border p-5" style={{background:"#fdf6e8",borderColor:"#e3c47e"}}>
            <Baby size={22} color="#b9892f" className="mt-0.5 shrink-0"/>
            <div>
              <h3 className="font-display text-base font-600" style={{color:"#7a5e1c"}}>For infants 7 months and up</h3>
              <p className="mt-1 text-sm" style={{color:"#7a5e1c"}}>This is a simplified, diluted version of the adult blend. Spirulina and alfalfa are removed. Preparation is a light infusion, not a strong decoction. Dose is 5ml (1 teaspoon) once daily. Begin at 2.5ml for the first 3 days and watch for any reaction.</p>
            </div>
          </div>

          <div>
            <h2 className="mb-3 font-display text-xl font-600" style={{color:"var(--green)"}}>Herbs in the infant blend</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {MASTER_BLEND.infantHerbs.map((h)=><HerbPill key={h.id} id={h.id} role={h.role} note={h.note}/>)}
            </div>
          </div>

          <Panel title={MASTER_BLEND.infantPrep.label} icon={Soup}>
            <ol className="space-y-3 mb-4">
              {MASTER_BLEND.infantPrep.steps.map((s,i)=>(
                <li key={i} className="flex gap-3 text-sm" style={{color:"var(--ink)"}}>
                  <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full text-[11px] font-700" style={{background:"var(--gold)",color:"#2e5240"}}>{i+1}</span>
                  {s}
                </li>
              ))}
            </ol>
          </Panel>

          <Panel title="Safety cautions (infant version)" icon={ShieldAlert} border="rgba(185,137,47,.4)">
            <ul className="space-y-3">
              {MASTER_BLEND.infantPrep.cautions.map((c,i)=>(
                <li key={i} className="flex gap-3 text-sm" style={{color:"var(--ink)"}}>
                  <ShieldAlert size={15} color="#b9892f" className="mt-0.5 shrink-0"/>
                  {c}
                </li>
              ))}
            </ul>
          </Panel>
        </div>
      )}
    </div>
  );
}

function NutrientsView(){
  const [q,setQ]=useState("");
  const [kind,setKind]=useState("All");
  const [open,setOpen]=useState(null);
  const list=useMemo(()=>{
    const ql=q.toLowerCase();
    return NUTRIENTS.filter((n)=>(kind==="All"||n.kind===kind)&&(!ql||n.name.toLowerCase().includes(ql)||n.role.toLowerCase().includes(ql)||n.low.toLowerCase().includes(ql)));
  },[q,kind]);
  return(
    <div className="fade-up py-8">
      <h1 className="font-display text-3xl font-600" style={{color:"var(--green)"}}>Signs of Deficiency</h1>
      <p className="mt-2 text-sm" style={{color:"var(--muted)"}}>What the body shows when low in a given vitamin or mineral, plus food sources. These are common signs, not a diagnosis; testing is the only way to confirm.</p>
      <div className="mt-5 flex items-center gap-2 rounded-xl px-3 py-2" style={{background:"var(--paper)",border:"1px solid rgba(61,107,80,.12)"}}>
        <Search size={17} color="var(--sage)"/>
        <input value={q} onChange={(e)=>setQ(e.target.value)} placeholder="Search nutrients or symptoms..." className="w-full bg-transparent text-sm outline-none" style={{color:"var(--ink)"}}/>
        {q&&<button onClick={()=>setQ("")}><X size={15} color="var(--muted)"/></button>}
      </div>
      <div className="mt-3 flex gap-2">
        {["All","Mineral","Vitamin"].map((k)=><button key={k} onClick={()=>setKind(k)} className="rounded-full px-3.5 py-1.5 text-xs font-600 transition" style={kind===k?{background:"var(--green)",color:"var(--gold)"}:{background:"rgba(61,107,80,.07)",color:"var(--ink)"}}>{k==="All"?"All":k+"s"}</button>)}
      </div>
      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        {list.map((n)=>{const isOpen=open===n.id; return(
          <div key={n.id} className="rounded-2xl border p-4" style={{background:"var(--paper)",borderColor:"rgba(61,107,80,.12)"}}>
            <button onClick={()=>setOpen(isOpen?null:n.id)} className="flex w-full items-start justify-between gap-2 text-left">
              <div><span className="block font-display text-lg font-600" style={{color:"var(--green)"}}>{n.name}</span><span className="text-[11px] font-700 tracking-widest" style={{color:"var(--sage)"}}>{n.kind.toUpperCase()}</span></div>
              <ChevronRight size={18} color="var(--gold)" style={{transform:isOpen?"rotate(90deg)":"none",transition:"transform .2s"}}/>
            </button>
            <p className="mt-2 text-sm" style={{color:"var(--muted)"}}>{n.role}</p>
            {isOpen&&(
              <div className="mt-3 space-y-3 border-t pt-3" style={{borderColor:"rgba(61,107,80,.1)"}}>
                <div><span className="text-xs font-700 tracking-wide" style={{color:"#b9892f"}}>WHEN LOW</span><p className="mt-1 text-sm" style={{color:"var(--ink)"}}>{n.low}</p></div>
                <div><span className="text-xs font-700 tracking-wide" style={{color:"#3d5640"}}>FOOD SOURCES</span><div className="mt-1.5 flex flex-wrap gap-1.5">{n.food.map((f)=><span key={f} className="rounded-full px-2.5 py-1 text-xs" style={{background:"rgba(126,144,121,.16)",color:"#3d5640"}}>{f}</span>)}</div></div>
                {n.caution&&<div className="flex gap-2 rounded-lg p-2.5" style={{background:"#fdf6e8"}}><ShieldAlert size={15} color="#b9892f" className="mt-0.5 shrink-0"/><p className="text-xs" style={{color:"#7a5e1c"}}>{n.caution}</p></div>}
              </div>
            )}
          </div>
        );})}
      </div>
      <div className="mt-6 flex gap-3 rounded-xl p-4" style={{background:"rgba(61,107,80,.06)"}}><Info size={17} color="var(--green)" className="mt-0.5 shrink-0"/><p className="text-sm" style={{color:"var(--muted)"}}>Many symptoms overlap across nutrients and with other conditions. A blood test confirms a deficiency. Be especially careful with iron, vitamin A, and vitamin D, which can cause harm in excess.</p></div>
    </div>
  );
}

/* ==================================================================
   GUT HEALTH VIEW
   ================================================================== */
function GutHealthView({onHerb}){
  const [section, setSection] = useState("microbiome");
  const herbs = GUT_HEALTH.herbs.map(herbById).filter(Boolean);

  const SECTIONS = [
    {id:"microbiome", label:"The Microbiome"},
    {id:"microbes",   label:"Types of Microbes"},
    {id:"biotics",    label:"Pre, Pro and Postbiotics"},
    {id:"absorption", label:"The Right Base"},
    {id:"gut-brain",  label:"Gut-Brain Connection"},
    {id:"food-first", label:"Gut-First Meals"},
    {id:"affordability",label:"Affordable Gut Health"},
    {id:"herbs",      label:"Herbs for the Gut"},
  ];

  return(
    <div className="fade-up py-8">
      <div className="rounded-2xl p-7" style={{background:"var(--green)"}}>
        <span className="grid h-12 w-12 place-items-center rounded-xl" style={{background:"rgba(201,162,74,.18)",color:"var(--gold)"}}><Soup size={24}/></span>
        <h1 className="mt-4 font-display text-2xl font-600 sm:text-3xl" style={{color:"var(--cream)"}}>Gut Health</h1>
        <p className="mt-3 max-w-2xl text-sm" style={{color:"var(--sage)"}}>{GUT_HEALTH.intro}</p>
      </div>

      {/* section nav */}
      <div className="scrollx mt-6 flex gap-2 overflow-x-auto pb-2">
        {SECTIONS.map((s)=>(
          <button key={s.id} onClick={()=>setSection(s.id)}
            className="shrink-0 rounded-full px-4 py-1.5 text-xs font-600 transition"
            style={section===s.id?{background:"var(--green)",color:"var(--gold)"}:{background:"rgba(61,107,80,.07)",color:"var(--ink)"}}>
            {s.label}
          </button>
        ))}
      </div>

      {/* MICROBIOME */}
      {section==="microbiome"&&(
        <div className="mt-6 fade-up space-y-5">
          <Panel title="What is the microbiome?" icon={Info}>
            <p className="text-sm leading-relaxed" style={{color:"var(--ink)"}}>{GUT_HEALTH.microbiome.what}</p>
          </Panel>
          <Panel title="Why it controls everything" icon={HeartPulse}>
            <p className="text-sm leading-relaxed" style={{color:"var(--ink)"}}>{GUT_HEALTH.microbiome.why}</p>
          </Panel>
          <Panel title="Diversity is the measure of gut health" icon={Sparkles}>
            <p className="text-sm leading-relaxed" style={{color:"var(--ink)"}}>{GUT_HEALTH.microbiome.diversity}</p>
          </Panel>
          <div className="rounded-xl border p-4" style={{background:"#fdf6e8",borderColor:"#e3c47e"}}>
            <h3 className="font-display text-base font-600 mb-2" style={{color:"#7a5e1c"}}>What destroys it</h3>
            <p className="text-sm" style={{color:"#7a5e1c"}}>{GUT_HEALTH.microbiome.destruction}</p>
          </div>
          <div className="rounded-xl p-4" style={{background:"rgba(61,107,80,.06)"}}>
            <h3 className="text-xs font-700 tracking-wide mb-2" style={{color:"var(--sage)"}}>PUBLISHED RESEARCH</h3>
            <p className="text-xs leading-relaxed" style={{color:"var(--muted)"}}>{GUT_HEALTH.microbiome.research}</p>
          </div>
        </div>
      )}

      {/* MICROBES */}
      {section==="microbes"&&(
        <div className="mt-6 fade-up space-y-4">
          <p className="text-sm" style={{color:"var(--muted)"}}>The gut hosts all four categories of microbes shown below. Health is not about eliminating bad ones but maintaining the balance that keeps beneficial organisms dominant.</p>
          {GUT_HEALTH.microbes.map((m)=>(
            <div key={m.type} className="rounded-2xl border overflow-hidden" style={{borderColor:"rgba(61,107,80,.12)"}}>
              <div className="px-5 py-3" style={{background:m.color}}>
                <h3 className="font-display text-lg font-600" style={{color:"#fff"}}>{m.type}</h3>
                <p className="text-xs font-600" style={{color:"rgba(255,255,255,.7)"}}>{m.role}</p>
              </div>
              <div className="p-5" style={{background:"var(--paper)"}}>
                <p className="text-sm leading-relaxed mb-3" style={{color:"var(--ink)"}}>{m.desc}</p>
                <div className="rounded-lg p-3" style={{background:"rgba(126,144,121,.12)"}}>
                  <span className="text-xs font-700" style={{color:"#3d5640"}}>PRACTICAL ACTION: </span>
                  <span className="text-xs" style={{color:"#3d5640"}}>{m.practical}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* BIOTICS */}
      {section==="biotics"&&(
        <div className="mt-6 fade-up space-y-6">
          <div className="rounded-xl p-4" style={{background:"rgba(201,162,74,.12)"}}>
            <p className="text-sm" style={{color:"var(--ink)"}}>Most people have heard of probiotics. Few know what prebiotics and postbiotics are. All three work together. You need all three. Here is what each does, what it comes from, and what the research says.</p>
          </div>
          {[
            {key:"pre", color:"#3f7d4f", label:"Prebiotics", subtitle:"What beneficial bacteria eat"},
            {key:"pro", color:"#b9892f", label:"Probiotics",  subtitle:"The beneficial bacteria themselves"},
            {key:"post",color:"#1e3a2c", label:"Postbiotics", subtitle:"What beneficial bacteria produce"},
          ].map(({key,color,label,subtitle})=>{
            const b=GUT_HEALTH.biotics[key];
            return(
              <div key={key} className="rounded-2xl border overflow-hidden" style={{borderColor:"rgba(61,107,80,.12)"}}>
                <div className="px-5 py-3" style={{background:color}}>
                  <h3 className="font-display text-xl font-600" style={{color:"#fff"}}>{label}</h3>
                  <p className="text-xs" style={{color:"rgba(255,255,255,.75)"}}>{subtitle}</p>
                </div>
                <div className="p-5 space-y-4" style={{background:"var(--paper)"}}>
                  <p className="text-sm leading-relaxed" style={{color:"var(--ink)"}}>{b.what}</p>
                  <div>
                    <h4 className="text-xs font-700 tracking-wide mb-2" style={{color:"var(--sage)"}}>SOURCES</h4>
                    <div className="flex flex-wrap gap-2">{b.sources.map((s)=><span key={s} className="rounded-full px-3 py-1.5 text-xs" style={{background:"rgba(126,144,121,.16)",color:"#3d5640"}}>{s}</span>)}</div>
                  </div>
                  <div className="rounded-lg p-3" style={{background:"rgba(61,107,80,.06)"}}>
                    <p className="text-xs leading-relaxed" style={{color:"var(--muted)"}}>{b.research}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ABSORPTION / RIGHT BASE */}
      {section==="absorption"&&(
        <div className="mt-6 fade-up space-y-5">
          <div className="rounded-2xl p-6" style={{background:"var(--green)"}}>
            <h2 className="font-display text-xl font-600 mb-3" style={{color:"var(--cream)"}}>The problem with taking a multivitamin on a damaged gut</h2>
            <p className="text-sm" style={{color:"var(--sage)"}}>{GUT_HEALTH.absorption.problem}</p>
          </div>
          <Panel title="How a damaged gut blocks each nutrient" icon={ShieldAlert}>
            <ul className="space-y-3">{GUT_HEALTH.absorption.specifics.map((s,i)=>(
              <li key={i} className="flex gap-3 text-sm" style={{color:"var(--ink)"}}><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{background:"var(--gold)"}}/>{s}</li>
            ))}</ul>
          </Panel>
          <div className="rounded-xl p-4" style={{background:"rgba(61,107,80,.06)"}}>
            <h4 className="text-xs font-700 tracking-wide mb-2" style={{color:"var(--sage)"}}>PUBLISHED RESEARCH</h4>
            <p className="text-xs leading-relaxed" style={{color:"var(--muted)"}}>{GUT_HEALTH.absorption.fasano}</p>
          </div>
          <Panel title="The solution: build the base first" icon={Sprout}>
            <p className="text-sm leading-relaxed" style={{color:"var(--ink)"}}>{GUT_HEALTH.absorption.solution}</p>
          </Panel>
        </div>
      )}

      {/* GUT-BRAIN */}
      {section==="gut-brain"&&(
        <div className="mt-6 fade-up space-y-5">
          <div className="rounded-2xl p-6" style={{background:"var(--green)"}}>
            <h2 className="font-display text-xl font-600 mb-3" style={{color:"var(--cream)"}}>The gut-brain axis</h2>
            <p className="text-sm" style={{color:"var(--sage)"}}>{GUT_HEALTH.gutBrain.overview}</p>
          </div>
          <Panel title="What the research shows" icon={Brain}>
            <ul className="space-y-3">{GUT_HEALTH.gutBrain.facts.map((f,i)=>(
              <li key={i} className="flex gap-3 text-sm" style={{color:"var(--ink)"}}><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{background:"var(--gold)"}}/>{f}</li>
            ))}</ul>
          </Panel>
          <div className="rounded-2xl border p-5" style={{background:"var(--paper)",borderColor:"rgba(201,162,74,.35)"}}>
            <div className="flex items-center gap-2 mb-2"><HandHeart size={17} color="var(--gold)"/><h3 className="font-display text-base font-600" style={{color:"var(--green)"}}>What this means practically</h3></div>
            <p className="text-sm" style={{color:"var(--muted)"}}>{GUT_HEALTH.gutBrain.practical}</p>
          </div>
        </div>
      )}

      {/* FOOD FIRST */}
      {section==="food-first"&&(
        <div className="mt-6 fade-up space-y-5">
          <div className="rounded-2xl p-6" style={{background:"var(--green)"}}>
            <h2 className="font-display text-xl font-600 mb-3" style={{color:"var(--cream)"}}>Forget the food pyramid. Build for the gut.</h2>
            <p className="text-sm" style={{color:"var(--sage)"}}>{GUT_HEALTH.foodFirst.pyramid}</p>
          </div>
          <Panel title="Gut-first meal principles" icon={Salad}>
            <ul className="space-y-3">{GUT_HEALTH.foodFirst.principles.map((p,i)=>(
              <li key={i} className="flex gap-3 text-sm" style={{color:"var(--ink)"}}><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{background:"var(--gold)"}}/>{p}</li>
            ))}</ul>
          </Panel>
          <div className="rounded-2xl border p-5" style={{background:"var(--paper)",borderColor:"rgba(201,162,74,.35)"}}>
            <div className="flex items-center gap-2 mb-3"><BookOpen size={17} color="var(--gold)"/><h3 className="font-display text-base font-600" style={{color:"var(--green)"}}>Cultural wisdom predates the science</h3></div>
            <p className="text-sm leading-relaxed" style={{color:"var(--muted)"}}>{GUT_HEALTH.foodFirst.cultures}</p>
          </div>
        </div>
      )}

      {/* AFFORDABILITY */}
      {section==="affordability"&&(
        <div className="mt-6 fade-up space-y-5">
          <div className="rounded-2xl p-6" style={{background:"var(--green)"}}>
            <h2 className="font-display text-xl font-600 mb-3" style={{color:"var(--cream)"}}>You don't need the whole produce aisle</h2>
            <p className="text-sm" style={{color:"var(--sage)"}}>{GUT_HEALTH.affordability.reality}</p>
          </div>
          <div>
            <h3 className="mb-3 font-display text-xl font-600" style={{color:"var(--green)"}}>Highest value gut-building foods</h3>
            <div className="space-y-3">{GUT_HEALTH.affordability.topValue.map((f)=>(
              <div key={f.food} className="flex items-start gap-3 rounded-xl border p-4" style={{background:"var(--paper)",borderColor:"rgba(61,107,80,.12)"}}>
                <span className="grid h-8 w-14 shrink-0 place-items-center rounded-full text-[10px] font-700" style={{background:f.cost==="Very low"?"rgba(63,125,79,.2)":"rgba(201,162,74,.2)",color:f.cost==="Very low"?"#3f7d4f":"#9a7a25"}}>{f.cost}</span>
                <div><h4 className="font-display font-600" style={{color:"var(--green)"}}>{f.food}</h4><p className="text-sm" style={{color:"var(--muted)"}}>{f.why}</p></div>
              </div>
            ))}</div>
          </div>
          <Panel title="The weekly strategy" icon={ClipboardList}>
            <p className="text-sm leading-relaxed" style={{color:"var(--ink)"}}>{GUT_HEALTH.affordability.strategy}</p>
          </Panel>
        </div>
      )}

      {/* HERBS */}
      {section==="herbs"&&(
        <div className="mt-6 fade-up">
          <h2 className="mb-2 font-display text-xl font-600" style={{color:"var(--green)"}}>Herbs that support the gut</h2>
          <p className="mb-4 text-sm" style={{color:"var(--muted)"}}>These herbs work alongside food and fermented cultures, not instead of them. Each one targets a specific layer of gut support from soothing the lining to stimulating bile flow.</p>
          <div className="grid gap-3 sm:grid-cols-2">
            {herbs.map((h)=>(
              <button key={h.id} onClick={()=>onHerb(h.id)} className="card-hover rounded-xl border p-4 text-left" style={{background:"var(--paper)",borderColor:"rgba(61,107,80,.12)"}}>
                <div className="flex items-center justify-between mb-1"><div className="flex items-center gap-2"><Leaf size={16} color="#3d5640"/><h3 className="font-display font-600" style={{color:"var(--green)"}}>{h.name}</h3></div><EvidenceBadge level={h.evidence}/></div>
                <p className="text-xs italic mb-1" style={{color:"var(--muted)"}}>{h.latin}</p>
                <p className="line-clamp-2 text-sm" style={{color:"var(--ink)"}}>{h.uses}</p>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function SearchView({results,onHerb,onAil,onSys}){
  const empty=results.herbs.length===0&&results.ailments.length===0&&results.systems.length===0;
  return(
    <main className="mx-auto max-w-6xl px-4 pb-24 pt-6 fade-up">
      {empty&&<p className="py-16 text-center text-sm" style={{color:"var(--muted)"}}>No matches found. Try another search term.</p>}
      {results.systems.length>0&&(
        <section className="mb-8"><h2 className="mb-3 text-xs font-700 tracking-widest" style={{color:"var(--sage)"}}>BODY SYSTEMS</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{results.systems.map((s)=>(
          <button key={s.id} onClick={()=>onSys(s.id)} className="card-hover rounded-xl border p-4 text-left" style={{background:"var(--paper)",borderColor:"rgba(61,107,80,.12)"}}>
            <h3 className="font-display font-600" style={{color:"var(--green)"}}>{s.name}</h3>
            <p className="mt-1 line-clamp-2 text-sm" style={{color:"var(--muted)"}}>{s.fn}</p>
          </button>
        ))}</div></section>
      )}
      {results.ailments.length>0&&(
        <section className="mb-8"><h2 className="mb-3 text-xs font-700 tracking-widest" style={{color:"var(--sage)"}}>AILMENTS</h2>
        <div className="grid gap-3 sm:grid-cols-2">{results.ailments.map((a)=>(
          <button key={a.id} onClick={()=>onAil(a.id)} className="card-hover rounded-xl border p-4 text-left" style={{background:"var(--paper)",borderColor:"rgba(61,107,80,.12)"}}>
            <h3 className="font-display font-600" style={{color:"var(--green)"}}>{a.name}</h3>
            <p className="mt-1 text-sm" style={{color:"var(--muted)"}}>{a.desc}</p>
          </button>
        ))}</div></section>
      )}
      {results.herbs.length>0&&(
        <section><h2 className="mb-3 text-xs font-700 tracking-widest" style={{color:"var(--sage)"}}>HERBS</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{results.herbs.map((h)=>(
          <button key={h.id} onClick={()=>onHerb(h.id)} className="card-hover rounded-xl border p-4 text-left" style={{background:"var(--paper)",borderColor:"rgba(61,107,80,.12)"}}>
            <div className="flex items-center gap-2"><Leaf size={16} color="#3d5640"/><h3 className="font-display font-600" style={{color:"var(--green)"}}>{h.name}</h3></div>
            <p className="mt-1 line-clamp-2 text-sm" style={{color:"var(--muted)"}}>{h.uses}</p>
            <div className="mt-2"><EvidenceBadge level={h.evidence}/></div>
          </button>
        ))}</div></section>
      )}
    </main>
  );
}

/* ==================================================================
   TOXICITY, VIRAL LOAD, AND HEAVY METALS VIEW
   ================================================================== */
function ToxicityView({onHerb}){
  const [section,setSection]=useState("overview");

  const SECTIONS=[
    {id:"overview",    label:"Overview"},
    {id:"viral",       label:"Viral Overload"},
    {id:"copper",      label:"Copper Toxicity"},
    {id:"mercury",     label:"Mercury Toxicity"},
    {id:"metals",      label:"Heavy Metals"},
    {id:"food",        label:"Food Sensitivity Link"},
    {id:"protocol",    label:"The Protocol"},
  ];

  const HerbLink=({id})=>{
    const h=herbById(id); if(!h) return null;
    return(
      <button onClick={()=>onHerb(id)} className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-600" style={{background:"rgba(126,144,121,.16)",color:"#3d5640"}}>
        <Leaf size={11}/>{h.name}
      </button>
    );
  };

  return(
    <div className="fade-up py-8">
      <div className="rounded-2xl p-7" style={{background:"var(--green)"}}>
        <span className="grid h-12 w-12 place-items-center rounded-xl" style={{background:"rgba(201,162,74,.18)",color:"var(--gold)"}}><Shield size={24}/></span>
        <h1 className="mt-4 font-display text-2xl font-600 sm:text-3xl" style={{color:"var(--cream)"}}>Viral Overload, Heavy Metals, and Toxicity</h1>
        <p className="mt-3 max-w-2xl text-sm" style={{color:"var(--sage)"}}>{TOXICITY.intro}</p>
      </div>

      <div className="scrollx mt-6 flex gap-2 overflow-x-auto pb-2">
        {SECTIONS.map((s)=>(
          <button key={s.id} onClick={()=>setSection(s.id)}
            className="shrink-0 rounded-full px-4 py-1.5 text-xs font-600 transition"
            style={section===s.id?{background:"var(--green)",color:"var(--gold)"}:{background:"rgba(61,107,80,.07)",color:"var(--ink)"}}>
            {s.label}
          </button>
        ))}
      </div>

      {/* OVERVIEW */}
      {section==="overview"&&(
        <div className="mt-6 fade-up space-y-4">
          {[
            {t:"Viral Overload",c:"#1a3a5c",d:"Multiple chronic viruses simultaneously active or reactivating, placing a burden on the immune system it cannot resolve. Links to food sensitivities, autoimmunity, and chronic fatigue."},
            {t:"Copper Toxicity",c:"#7a3a1a",d:"Excess unbound bioavailable copper acting as a pro-oxidant. Disrupts neurotransmitter balance, drives anxiety and hormonal dysregulation, and impairs zinc function."},
            {t:"Mercury Toxicity",c:"#2a4a5a",d:"One of the most neurotoxic substances known. Sources include fish, dental amalgams, and industrial exposure. Disrupts the gut microbiome and immune system."},
            {t:"Heavy Metals Broadly",c:"#3a3a3a",d:"Lead, cadmium, arsenic, and aluminum all share the mechanism of displacing essential minerals, generating oxidative stress, and increasing gut permeability."},
          ].map((item)=>(
            <div key={item.t} className="rounded-xl border p-5" style={{background:"var(--paper)",borderLeft:`4px solid ${item.c}`,borderColor:`${item.c}`,borderTopColor:"rgba(61,107,80,.12)",borderRightColor:"rgba(61,107,80,.12)",borderBottomColor:"rgba(61,107,80,.12)"}}>
              <h3 className="font-display text-lg font-600 mb-2" style={{color:"var(--green)"}}>{item.t}</h3>
              <p className="text-sm" style={{color:"var(--muted)"}}>{item.d}</p>
            </div>
          ))}
          <div className="rounded-xl p-4" style={{background:"rgba(201,162,74,.12)"}}>
            <p className="text-sm font-600" style={{color:"var(--green)"}}>The common thread</p>
            <p className="mt-1 text-sm" style={{color:"var(--muted)"}}>All three destabilize the immune system and increase gut permeability. This is why they so often present as food sensitivities, histamine intolerance, and unexplained inflammatory conditions that seem to multiply over time. Address the root and the sensitivities often reduce significantly.</p>
          </div>
        </div>
      )}

      {/* VIRAL OVERLOAD */}
      {section==="viral"&&(
        <div className="mt-6 fade-up space-y-5">
          <Panel title="What viral overload means" icon={Info}>
            <p className="text-sm leading-relaxed mb-3" style={{color:"var(--ink)"}}>{TOXICITY.viralOverload.what}</p>
            <p className="text-sm leading-relaxed" style={{color:"var(--ink)"}}>{TOXICITY.viralOverload.virusFamily}</p>
          </Panel>
          <Panel title="Symptoms of chronic viral burden" icon={ShieldAlert}>
            <ul className="space-y-2">{TOXICITY.viralOverload.symptoms.map((s,i)=>(
              <li key={i} className="flex gap-3 text-sm" style={{color:"var(--ink)"}}><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{background:"var(--gold)"}}/>{s}</li>
            ))}</ul>
          </Panel>
          <Panel title="How viral activity drives food sensitivities" icon={Salad}>
            <p className="text-sm leading-relaxed" style={{color:"var(--ink)"}}>{TOXICITY.viralOverload.foodLink}</p>
          </Panel>
          <div className="rounded-xl p-4" style={{background:"rgba(61,107,80,.06)"}}>
            <h4 className="text-xs font-700 tracking-wide mb-2" style={{color:"var(--sage)"}}>RESEARCH AND IMPORTANT CAVEATS</h4>
            <p className="text-xs leading-relaxed" style={{color:"var(--muted)"}}>{TOXICITY.viralOverload.research}</p>
          </div>
          <Panel title="Antiviral and immune support protocol" icon={Leaf}>
            <ol className="space-y-3 mb-4">{TOXICITY.viralOverload.protocol.map((s,i)=>(
              <li key={i} className="flex gap-3 text-sm" style={{color:"var(--ink)"}}><span className="grid h-5 w-5 shrink-0 place-items-center rounded-full text-[11px] font-700" style={{background:"var(--gold)",color:"#2e5240"}}>{i+1}</span>{s}</li>
            ))}</ol>
            <h4 className="text-xs font-700 tracking-wide mb-2" style={{color:"var(--sage)"}}>RELEVANT HERBS</h4>
            <div className="flex flex-wrap gap-2">
              {["elderberry","lemon-balm","st-johns-wort","astragalus","cats-claw","andrographis","dgl-licorice"].map(id=><HerbLink key={id} id={id}/>)}
            </div>
          </Panel>
        </div>
      )}

      {/* COPPER */}
      {section==="copper"&&(
        <div className="mt-6 fade-up space-y-5">
          <div className="rounded-2xl p-6" style={{background:"var(--green)"}}>
            <h2 className="font-display text-xl font-600 mb-3" style={{color:"var(--cream)"}}>Copper and zinc: the essential imbalance</h2>
            <p className="text-sm" style={{color:"var(--sage)"}}>{TOXICITY.copper.what}</p>
          </div>
          <Panel title="Sources of copper accumulation" icon={Info}>
            <ul className="space-y-2">{TOXICITY.copper.sources.map((s,i)=>(
              <li key={i} className="flex gap-3 text-sm" style={{color:"var(--ink)"}}><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{background:"var(--gold)"}}/>{s}</li>
            ))}</ul>
          </Panel>
          <Panel title="Symptoms of copper excess" icon={ShieldAlert}>
            <ul className="space-y-2">{TOXICITY.copper.symptoms.map((s,i)=>(
              <li key={i} className="flex gap-3 text-sm" style={{color:"var(--ink)"}}><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{background:"#b9892f"}}/>{s}</li>
            ))}</ul>
          </Panel>
          <div className="rounded-xl border p-4" style={{background:"#fdf6e8",borderColor:"#e3c47e"}}>
            <h4 className="font-display font-600 mb-2" style={{color:"#7a5e1c"}}>Wilson's disease vs. subclinical dysregulation</h4>
            <p className="text-sm" style={{color:"#7a5e1c"}}>{TOXICITY.copper.wilsons}</p>
          </div>
          <div className="rounded-xl p-4" style={{background:"rgba(61,107,80,.06)"}}>
            <h4 className="text-xs font-700 tracking-wide mb-2" style={{color:"var(--sage)"}}>RESEARCH AND CAVEATS</h4>
            <p className="text-xs leading-relaxed" style={{color:"var(--muted)"}}>{TOXICITY.copper.research}</p>
          </div>
          <Panel title="Protocol for copper balance" icon={ClipboardList}>
            <ul className="space-y-3 mb-4">{TOXICITY.copper.protocol.map((s,i)=>(
              <li key={i} className="flex gap-3 text-sm" style={{color:"var(--ink)"}}><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{background:"var(--gold)"}}/>{s}</li>
            ))}</ul>
            <div className="flex flex-wrap gap-2">
              {["ashwagandha","rhodiola","milk-thistle","dandelion"].map(id=><HerbLink key={id} id={id}/>)}
            </div>
          </Panel>
        </div>
      )}

      {/* MERCURY */}
      {section==="mercury"&&(
        <div className="mt-6 fade-up space-y-5">
          <div className="rounded-2xl p-6" style={{background:"var(--green)"}}>
            <h2 className="font-display text-xl font-600 mb-3" style={{color:"var(--cream)"}}>Mercury: forms, sources, and effects</h2>
            <p className="text-sm" style={{color:"var(--sage)"}}>{TOXICITY.mercury.what}</p>
          </div>
          <Panel title="Sources" icon={Info}>
            <ul className="space-y-2">{TOXICITY.mercury.sources.map((s,i)=>(
              <li key={i} className="flex gap-3 text-sm" style={{color:"var(--ink)"}}><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{background:"var(--gold)"}}/>{s}</li>
            ))}</ul>
          </Panel>
          <Panel title="Symptoms and effects" icon={ShieldAlert}>
            <ul className="space-y-2">{TOXICITY.mercury.symptoms.map((s,i)=>(
              <li key={i} className="flex gap-3 text-sm" style={{color:"var(--ink)"}}><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{background:"#2a4a5a"}}/>{s}</li>
            ))}</ul>
          </Panel>
          <div className="rounded-2xl border p-5" style={{background:"var(--paper)",borderColor:"rgba(201,162,74,.35)"}}>
            <div className="flex items-center gap-2 mb-2"><Sparkles size={17} color="var(--gold)"/><h3 className="font-display text-base font-600" style={{color:"var(--green)"}}>Selenium: nature's mercury antidote</h3></div>
            <p className="text-sm" style={{color:"var(--muted)"}}>{TOXICITY.mercury.selenium}</p>
          </div>
          <div className="rounded-xl p-4" style={{background:"rgba(61,107,80,.06)"}}>
            <h4 className="text-xs font-700 tracking-wide mb-2" style={{color:"var(--sage)"}}>PUBLISHED RESEARCH</h4>
            <p className="text-xs leading-relaxed" style={{color:"var(--muted)"}}>{TOXICITY.mercury.research}</p>
          </div>
          <Panel title="Mercury reduction protocol" icon={ClipboardList}>
            <ol className="space-y-3 mb-4">{TOXICITY.mercury.protocol.map((s,i)=>(
              <li key={i} className="flex gap-3 text-sm" style={{color:"var(--ink)"}}><span className="grid h-5 w-5 shrink-0 place-items-center rounded-full text-[11px] font-700" style={{background:"var(--gold)",color:"#2e5240"}}>{i+1}</span>{s}</li>
            ))}</ol>
            <div className="flex flex-wrap gap-2">
              {["spirulina","garlic","milk-thistle","dandelion","slippery-elm"].map(id=><HerbLink key={id} id={id}/>)}
            </div>
          </Panel>
        </div>
      )}

      {/* HEAVY METALS */}
      {section==="metals"&&(
        <div className="mt-6 fade-up space-y-5">
          <div className="rounded-2xl p-6" style={{background:"var(--green)"}}>
            <h2 className="font-display text-xl font-600 mb-3" style={{color:"var(--cream)"}}>How heavy metals damage the body</h2>
            <p className="text-sm" style={{color:"var(--sage)"}}>{TOXICITY.heavyMetals.overview}</p>
          </div>
          <div className="space-y-4">
            {TOXICITY.heavyMetals.metals.map((m)=>(
              <div key={m.name} className="rounded-2xl border p-5" style={{background:"var(--paper)",borderColor:"rgba(61,107,80,.12)"}}>
                <h3 className="font-display text-lg font-600 mb-1" style={{color:"var(--green)"}}>{m.name}</h3>
                <p className="text-xs font-600 mb-2" style={{color:"var(--gold)"}}>Sources: {m.sources}</p>
                <p className="text-sm mb-2" style={{color:"var(--ink)"}}>{m.effects}</p>
                <p className="text-xs italic" style={{color:"var(--sage)"}}>Key mineral protection: {m.mineral}</p>
              </div>
            ))}
          </div>
          <div className="rounded-xl p-4" style={{background:"rgba(61,107,80,.06)"}}>
            <h4 className="text-xs font-700 tracking-wide mb-2" style={{color:"var(--sage)"}}>PUBLISHED RESEARCH</h4>
            <p className="text-xs leading-relaxed" style={{color:"var(--muted)"}}>{TOXICITY.heavyMetals.research}</p>
          </div>
        </div>
      )}

      {/* FOOD SENSITIVITY LINK */}
      {section==="food"&&(
        <div className="mt-6 fade-up space-y-5">
          <div className="rounded-2xl p-6" style={{background:"var(--green)"}}>
            <h2 className="font-display text-xl font-600 mb-3" style={{color:"var(--cream)"}}>Why toxicity creates food sensitivities</h2>
            <p className="text-sm" style={{color:"var(--sage)"}}>{TOXICITY.heavyMetals.gutConnection}</p>
          </div>
          <Panel title="The food sensitivity mechanism" icon={Salad}>
            <p className="text-sm leading-relaxed" style={{color:"var(--ink)"}}>{TOXICITY.heavyMetals.foodSensitivity}</p>
          </Panel>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border p-4" style={{background:"var(--paper)",borderColor:"rgba(61,107,80,.12)"}}>
              <h4 className="font-display font-600 mb-2" style={{color:"var(--green)"}}>Viral contribution</h4>
              <p className="text-sm" style={{color:"var(--muted)"}}>{TOXICITY.viralOverload.foodLink.slice(0,280)}...</p>
            </div>
            <div className="rounded-xl border p-4" style={{background:"var(--paper)",borderColor:"rgba(61,107,80,.12)"}}>
              <h4 className="font-display font-600 mb-2" style={{color:"var(--green)"}}>Metal contribution</h4>
              <p className="text-sm" style={{color:"var(--muted)"}}>Heavy metals kill beneficial gut bacteria, damage tight junctions between epithelial cells, deplete antioxidant capacity, and deplete the minerals needed to maintain the gut barrier. The result is the same: increased permeability and immune reactivity to food.</p>
            </div>
          </div>
          <div className="rounded-2xl border p-5" style={{background:"var(--paper)",borderColor:"rgba(201,162,74,.35)"}}>
            <div className="flex items-center gap-2 mb-2"><HandHeart size={17} color="var(--gold)"/><h3 className="font-display text-base font-600" style={{color:"var(--green)"}}>The good news</h3></div>
            <p className="text-sm" style={{color:"var(--muted)"}}>Because the food sensitivities are a downstream consequence of gut permeability caused by toxicity, not a permanent change to the immune system, many people find that as they address the viral burden and metal load and rebuild the gut lining, food sensitivities reduce or resolve. The foods did not change. The gut's ability to handle them did.</p>
          </div>
        </div>
      )}

      {/* PROTOCOL */}
      {section==="protocol"&&(
        <div className="mt-6 fade-up space-y-5">
          <div className="flex gap-3 rounded-2xl border p-5" style={{background:"#fdf6e8",borderColor:"#e3c47e"}}><ShieldAlert size={22} color="#b9892f" className="mt-0.5 shrink-0"/><div><h3 className="font-display text-base font-600 mb-1" style={{color:"#7a5e1c"}}>Important</h3><p className="text-sm" style={{color:"#7a5e1c"}}>{TOXICITY.protocol.warning}</p></div></div>
          {TOXICITY.protocol.phases.map((phase,i)=>(
            <div key={i} className="rounded-2xl border overflow-hidden" style={{borderColor:"rgba(61,107,80,.12)"}}>
              <div className="px-5 py-3" style={{background:"var(--green)"}}>
                <span className="text-xs font-700 tracking-widest" style={{color:"var(--gold)"}}>{phase.weeks.toUpperCase()}</span>
                <h3 className="font-display text-lg font-600" style={{color:"var(--cream)"}}>{phase.phase}</h3>
              </div>
              <div className="p-5" style={{background:"var(--paper)"}}>
                <ol className="space-y-3">{phase.steps.map((s,j)=>(
                  <li key={j} className="flex gap-3 text-sm" style={{color:"var(--ink)"}}><span className="grid h-5 w-5 shrink-0 place-items-center rounded-full text-[11px] font-700" style={{background:"var(--gold)",color:"#2e5240"}}>{j+1}</span>{s}</li>
                ))}</ol>
              </div>
            </div>
          ))}
          <Panel title="Key herbs across the protocol" icon={Leaf}>
            <div className="flex flex-wrap gap-2">
              {["spirulina","garlic","milk-thistle","dandelion","slippery-elm","nettle","astragalus","elderberry","lemon-balm","cats-claw","andrographis"].map(id=><HerbLink key={id} id={id}/>)}
            </div>
          </Panel>
        </div>
      )}
    </div>
  );
}

/* ==================================================================
   ORAL HEALTH VIEW
   ================================================================== */
function OralHealthView({onHerb}){
  const [section, setSection] = useState("overview");
  const herbs = ORAL_HEALTH.herbs.map(herbById).filter(Boolean);

  const SECTIONS = [
    {id:"overview",         label:"The Oral Microbiome"},
    {id:"teeth",            label:"Teeth and the Body"},
    {id:"cavities",         label:"Cavities and Reversal"},
    {id:"remineralization", label:"Remineralization Protocol"},
    {id:"breath",           label:"Bad Breath and the Gut"},
    {id:"herbs",            label:"Herbs for Oral Health"},
  ];

  return(
    <div className="fade-up py-8">
      <div className="rounded-2xl p-7" style={{background:"var(--green)"}}>
        <span className="grid h-12 w-12 place-items-center rounded-xl" style={{background:"rgba(201,162,74,.18)",color:"var(--gold)"}}><Sparkles size={24}/></span>
        <h1 className="mt-4 font-display text-2xl font-600 sm:text-3xl" style={{color:"var(--cream)"}}>Oral Health</h1>
        <p className="mt-3 max-w-2xl text-sm" style={{color:"var(--sage)"}}>{ORAL_HEALTH.intro}</p>
      </div>

      <div className="scrollx mt-6 flex gap-2 overflow-x-auto pb-2">
        {SECTIONS.map((s)=>(
          <button key={s.id} onClick={()=>setSection(s.id)}
            className="shrink-0 rounded-full px-4 py-1.5 text-xs font-600 transition"
            style={section===s.id?{background:"var(--green)",color:"var(--gold)"}:{background:"rgba(61,107,80,.07)",color:"var(--ink)"}}>
            {s.label}
          </button>
        ))}
      </div>

      {section==="overview"&&(
        <div className="mt-6 fade-up space-y-5">
          <Panel title="The oral microbiome" icon={Info}>
            <p className="text-sm leading-relaxed" style={{color:"var(--ink)"}}>{ORAL_HEALTH.oralMicrobiome.what}</p>
          </Panel>
          <Panel title="How the mouth seeds the gut" icon={HeartPulse}>
            <p className="text-sm leading-relaxed" style={{color:"var(--ink)"}}>{ORAL_HEALTH.oralMicrobiome.gutLink}</p>
          </Panel>
          <div className="rounded-xl p-4" style={{background:"rgba(61,107,80,.06)"}}>
            <h4 className="text-xs font-700 tracking-wide mb-2" style={{color:"var(--sage)"}}>PUBLISHED RESEARCH</h4>
            <p className="text-xs leading-relaxed" style={{color:"var(--muted)"}}>{ORAL_HEALTH.oralMicrobiome.research}</p>
          </div>
        </div>
      )}

      {section==="teeth"&&(
        <div className="mt-6 fade-up space-y-5">
          <Panel title="What teeth are made of" icon={Bone}>
            <p className="text-sm leading-relaxed" style={{color:"var(--ink)"}}>{ORAL_HEALTH.teeth.composition}</p>
          </Panel>
          <div className="rounded-2xl p-6" style={{background:"var(--green)"}}>
            <h2 className="font-display text-lg font-600 mb-3" style={{color:"var(--cream)"}}>Why tooth loss is not cosmetic</h2>
            <p className="text-sm" style={{color:"var(--sage)"}}>{ORAL_HEALTH.teeth.vitality}</p>
          </div>
          <div className="rounded-2xl border p-5" style={{background:"var(--paper)",borderColor:"rgba(201,162,74,.35)"}}>
            <div className="flex items-center gap-2 mb-2"><HandHeart size={17} color="var(--gold)"/><h3 className="font-display text-base font-600" style={{color:"var(--green)"}}>Biblical foundation</h3></div>
            <p className="text-sm italic" style={{color:"var(--muted)"}}>{ORAL_HEALTH.teeth.biblical}</p>
          </div>
        </div>
      )}

      {section==="cavities"&&(
        <div className="mt-6 fade-up space-y-5">
          <Panel title="What a cavity actually is" icon={Info}>
            <p className="text-sm leading-relaxed" style={{color:"var(--ink)"}}>{ORAL_HEALTH.cavities.what}</p>
          </Panel>
          <div>
            <h3 className="mb-3 font-display text-xl font-600" style={{color:"var(--green)"}}>The four stages</h3>
            <div className="space-y-3">
              {ORAL_HEALTH.cavities.stages.map((s)=>(
                <div key={s.stage} className="rounded-xl border p-4" style={{background:"var(--paper)",borderColor:s.reversible?"rgba(63,125,79,.4)":"rgba(154,61,47,.3)"}}>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="rounded-full px-2.5 py-1 text-xs font-700" style={{background:s.reversible?"rgba(63,125,79,.2)":"rgba(154,61,47,.15)",color:s.reversible?"#3f7d4f":"#9a3d2f"}}>{s.reversible?"Reversible":"Needs care"}</span>
                    <h4 className="font-display font-600 text-sm" style={{color:"var(--green)"}}>{s.stage}</h4>
                  </div>
                  <p className="text-sm" style={{color:"var(--muted)"}}>{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-xl p-4" style={{background:"rgba(61,107,80,.06)"}}>
            <h4 className="text-xs font-700 tracking-wide mb-2" style={{color:"var(--sage)"}}>PUBLISHED RESEARCH</h4>
            <p className="text-xs leading-relaxed" style={{color:"var(--muted)"}}>{ORAL_HEALTH.cavities.research}</p>
          </div>
        </div>
      )}

      {section==="remineralization"&&(
        <div className="mt-6 fade-up space-y-5">
          <div className="rounded-2xl p-6" style={{background:"var(--green)"}}>
            <h2 className="font-display text-xl font-600 mb-3" style={{color:"var(--cream)"}}>The remineralization protocol</h2>
            <p className="text-sm" style={{color:"var(--sage)"}}>{ORAL_HEALTH.remineralization.overview}</p>
          </div>
          <Panel title="Step by step" icon={ClipboardList}>
            <ol className="space-y-3">
              {ORAL_HEALTH.remineralization.protocol.map((step,i)=>(
                <li key={i} className="flex gap-3 text-sm" style={{color:"var(--ink)"}}>
                  <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full text-[11px] font-700" style={{background:"var(--gold)",color:"#2e5240"}}>{i+1}</span>
                  {step}
                </li>
              ))}
            </ol>
          </Panel>
          <div className="rounded-xl p-4" style={{background:"rgba(61,107,80,.06)"}}>
            <h4 className="text-xs font-700 tracking-wide mb-2" style={{color:"var(--sage)"}}>RESEARCH</h4>
            <p className="text-xs leading-relaxed" style={{color:"var(--muted)"}}>{ORAL_HEALTH.remineralization.research}</p>
          </div>
        </div>
      )}

      {section==="breath"&&(
        <div className="mt-6 fade-up space-y-5">
          <div className="rounded-2xl p-6" style={{background:"var(--green)"}}>
            <h2 className="font-display text-xl font-600 mb-3" style={{color:"var(--cream)"}}>Bad breath is a body signal</h2>
            <p className="text-sm" style={{color:"var(--sage)"}}>{ORAL_HEALTH.badBreath.truth}</p>
          </div>
          <Panel title="Where it actually comes from" icon={Info}>
            <ul className="space-y-3">{ORAL_HEALTH.badBreath.sources.map((s,i)=>(
              <li key={i} className="flex gap-3 text-sm" style={{color:"var(--ink)"}}><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{background:"var(--gold)"}}/>{s}</li>
            ))}</ul>
          </Panel>
          <div className="rounded-xl border p-4" style={{background:"rgba(201,162,74,.1)",borderColor:"rgba(201,162,74,.3)"}}>
            <p className="text-sm font-600" style={{color:"var(--green)"}}>{ORAL_HEALTH.badBreath.connection}</p>
          </div>
        </div>
      )}

      {section==="herbs"&&(
        <div className="mt-6 fade-up">
          <h2 className="mb-2 font-display text-xl font-600" style={{color:"var(--green)"}}>Herbs for oral health</h2>
          <p className="mb-4 text-sm" style={{color:"var(--muted)"}}>These herbs address the oral microbiome, enamel support, gum health, and the bacterial drivers of bad breath.</p>
          <div className="grid gap-3 sm:grid-cols-2">
            {herbs.map((h)=>(
              <button key={h.id} onClick={()=>onHerb(h.id)} className="card-hover rounded-xl border p-4 text-left" style={{background:"var(--paper)",borderColor:"rgba(61,107,80,.12)"}}>
                <div className="flex items-center justify-between mb-1"><div className="flex items-center gap-2"><Leaf size={16} color="#3d5640"/><h3 className="font-display font-600" style={{color:"var(--green)"}}>{h.name}</h3></div><EvidenceBadge level={h.evidence}/></div>
                <p className="text-xs italic mb-1" style={{color:"var(--muted)"}}>{h.latin}</p>
                <p className="line-clamp-2 text-sm" style={{color:"var(--ink)"}}>{h.uses}</p>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/* ==================================================================
   ARE YOU PREPARED VIEW
   ================================================================== */
function PreparedView({onHerb}){
  const [section, setSection] = useState("overview");
  const [checked, setChecked] = useState({});
  const toggleCheck = (k) => setChecked((c)=>({...c,[k]:!c[k]}));

  const SECTIONS = [
    {id:"overview",    label:"Overview"},
    {id:"herb-kit",    label:"Herb Kit"},
    {id:"pantry",      label:"Emergency Pantry"},
    {id:"growing",     label:"Growing Your Own"},
    {id:"word",        label:"The Word"},
    {id:"checklist",   label:"Checklist"},
  ];

  return(
    <div className="fade-up py-8">
      <div className="rounded-2xl p-7" style={{background:"var(--green)"}}>
        <span className="grid h-12 w-12 place-items-center rounded-xl" style={{background:"rgba(201,162,74,.18)",color:"var(--gold)"}}><Shield size={24}/></span>
        <h1 className="mt-4 font-display text-2xl font-600 sm:text-3xl" style={{color:"var(--cream)"}}>Are You Prepared?</h1>
        <p className="mt-3 max-w-2xl text-sm" style={{color:"var(--sage)"}}>{PREPARED.intro}</p>
      </div>

      <div className="scrollx mt-6 flex gap-2 overflow-x-auto pb-2">
        {SECTIONS.map((s)=>(
          <button key={s.id} onClick={()=>setSection(s.id)}
            className="shrink-0 rounded-full px-4 py-1.5 text-xs font-600 transition"
            style={section===s.id?{background:"var(--green)",color:"var(--gold)"}:{background:"rgba(61,107,80,.07)",color:"var(--ink)"}}>
            {s.label}
          </button>
        ))}
      </div>

      {section==="overview"&&(
        <div className="mt-6 fade-up space-y-5">
          {[
            ["Herb Kit",       "Do you have the right herbs sealed and stored, before you need them?"],
            ["Emergency Pantry","Do you have gut-first shelf-stable food for your household for 30 days?"],
            ["Growing Your Own","Have you started even one container of medicinal herbs?"],
            ["The Word",       "Are you equipped with scripture that sustains when resources run low?"],
          ].map(([t,d])=>(
            <div key={t} className="flex items-start gap-3 rounded-xl border p-4" style={{background:"var(--paper)",borderColor:"rgba(61,107,80,.12)"}}>
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full" style={{background:"rgba(201,162,74,.18)"}}><Shield size={16} color="var(--gold)"/></span>
              <div><h3 className="font-display font-600" style={{color:"var(--green)"}}>{t}</h3><p className="mt-1 text-sm" style={{color:"var(--muted)"}}>{d}</p></div>
            </div>
          ))}
          <div className="rounded-2xl border p-5" style={{background:"var(--paper)",borderColor:"rgba(201,162,74,.35)"}}>
            <div className="flex items-center gap-2 mb-2"><HandHeart size={17} color="var(--gold)"/><h3 className="font-display text-base font-600" style={{color:"var(--green)"}}>The stewardship principle</h3></div>
            <p className="text-sm" style={{color:"var(--muted)"}}>Good stewardship is not anxious stockpiling. It is the quiet confidence of a household that knows what it has, knows how to use it, and trusts the One who provides. Proverbs 24:3 to 4, by wisdom a house is built, by knowledge its rooms are filled.</p>
          </div>
        </div>
      )}

      {section==="herb-kit"&&(
        <div className="mt-6 fade-up space-y-5">
          <div className="rounded-2xl p-5" style={{background:"var(--green)"}}>
            <h2 className="font-display text-xl font-600 mb-2" style={{color:"var(--cream)"}}>{PREPARED.herbKit.title}</h2>
            <p className="text-sm" style={{color:"var(--sage)"}}>{PREPARED.herbKit.desc}</p>
          </div>
          <div className="space-y-3">
            {PREPARED.herbKit.items.map((item)=>{
              const h=herbById(item.herb)||{name:item.name,id:item.herb};
              return(
                <div key={item.herb} className="rounded-xl border p-4" style={{background:"var(--paper)",borderColor:"rgba(61,107,80,.12)"}}>
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="font-display font-600" style={{color:"var(--green)"}}>{item.name}</h4>
                      <p className="text-xs" style={{color:"var(--gold)"}}>{item.purpose}</p>
                      <p className="text-xs mt-0.5" style={{color:"var(--muted)"}}>Shelf life: {item.shelf}</p>
                    </div>
                    {herbById(item.herb)&&<button onClick={()=>onHerb(item.herb)} className="shrink-0 rounded-full px-2.5 py-1 text-xs font-600" style={{background:"rgba(61,107,80,.08)",color:"var(--green)"}}>View</button>}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {section==="pantry"&&(
        <div className="mt-6 fade-up space-y-5">
          <div className="rounded-2xl p-5" style={{background:"var(--green)"}}>
            <h2 className="font-display text-xl font-600 mb-2" style={{color:"var(--cream)"}}>{PREPARED.pantry.title}</h2>
            <p className="text-sm" style={{color:"var(--sage)"}}>{PREPARED.pantry.desc}</p>
          </div>
          <div className="space-y-3">
            {PREPARED.pantry.items.map((item)=>(
              <div key={item.food} className="rounded-xl border p-4" style={{background:"var(--paper)",borderColor:"rgba(61,107,80,.12)"}}>
                <h4 className="font-display font-600" style={{color:"var(--green)"}}>{item.food}</h4>
                <p className="text-sm mt-0.5" style={{color:"var(--muted)"}}>{item.why}</p>
                <p className="text-xs mt-1" style={{color:"var(--sage)"}}>Shelf life: {item.shelf}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {section==="growing"&&(
        <div className="mt-6 fade-up space-y-6">
          <div className="rounded-2xl p-5" style={{background:"var(--green)"}}>
            <h2 className="font-display text-xl font-600 mb-2" style={{color:"var(--cream)"}}>{PREPARED.growing.title}</h2>
            <p className="text-sm" style={{color:"var(--sage)"}}>{PREPARED.growing.intro}</p>
          </div>
          {[PREPARED.growing.containers, PREPARED.growing.inGround, PREPARED.growing.hydroponics].map((g)=>(
            <div key={g.title} className="rounded-2xl border overflow-hidden" style={{borderColor:"rgba(61,107,80,.12)"}}>
              <div className="px-5 py-3" style={{background:"var(--green)"}}><h3 className="font-display text-lg font-600" style={{color:"var(--cream)"}}>{g.title}</h3></div>
              <div className="p-5 space-y-4" style={{background:"var(--paper)"}}>
                <p className="text-sm" style={{color:"var(--ink)"}}>{g.desc}</p>
                {g.kratky&&<div className="rounded-lg p-3" style={{background:"rgba(201,162,74,.12)"}}><h4 className="text-xs font-700 mb-1" style={{color:"var(--green)"}}>The Kratky Method</h4><p className="text-sm" style={{color:"var(--ink)"}}>{g.kratky}</p></div>}
                <div><h4 className="text-xs font-700 tracking-wide mb-2" style={{color:"var(--sage)"}}>{g.nutrients?"BEST HERBS":"BEST HERBS"}</h4><Chips items={g.bestHerbs||[]}/></div>
                {g.tips&&<div><h4 className="text-xs font-700 tracking-wide mb-2" style={{color:"var(--sage)"}}>TIPS</h4><ul className="space-y-2">{g.tips.map((t,i)=><li key={i} className="flex gap-2 text-sm" style={{color:"var(--muted)"}}><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{background:"var(--gold)"}}/>{t}</li>)}</ul></div>}
                {g.nutrients&&<p className="text-sm" style={{color:"var(--muted)"}}>{g.nutrients}</p>}
              </div>
            </div>
          ))}
          <Panel title="Seed saving" icon={Sprout}>
            <p className="text-sm" style={{color:"var(--ink)"}}>{PREPARED.growing.seedSaving}</p>
          </Panel>
        </div>
      )}

      {section==="word"&&(
        <div className="mt-6 fade-up space-y-5">
          <div className="rounded-2xl p-6" style={{background:"var(--green)"}}>
            <h2 className="font-display text-xl font-600 mb-3" style={{color:"var(--cream)"}}>{PREPARED.word.title}</h2>
            <p className="text-sm" style={{color:"var(--sage)"}}>{PREPARED.word.desc}</p>
          </div>
          <div className="space-y-3">
            {PREPARED.word.scriptures.map((s)=>(
              <div key={s.ref} className="rounded-xl border p-4" style={{background:"var(--paper)",borderColor:"rgba(201,162,74,.25)"}}>
                <span className="text-xs font-700 tracking-widest" style={{color:"var(--gold)"}}>{s.ref}</span>
                <p className="mt-1 text-sm italic" style={{color:"var(--ink)"}}>{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {section==="checklist"&&(
        <div className="mt-6 fade-up space-y-5">
          <p className="text-sm" style={{color:"var(--muted)"}}>A household checklist for preparedness. Tap each item as you complete it.</p>
          {PREPARED.checklist.map((cat)=>(
            <div key={cat.cat} className="rounded-2xl border overflow-hidden" style={{borderColor:"rgba(61,107,80,.12)"}}>
              <div className="px-5 py-3" style={{background:"var(--green)"}}><h3 className="font-display text-lg font-600" style={{color:"var(--cream)"}}>{cat.cat}</h3></div>
              <div className="p-4 space-y-2" style={{background:"var(--paper)"}}>
                {cat.items.map((item)=>{
                  const k=`${cat.cat}:${item}`;
                  const done=!!checked[k];
                  return(
                    <button key={item} onClick={()=>toggleCheck(k)} className="flex w-full items-center gap-3 rounded-lg p-3 text-left" style={{background:done?"rgba(63,125,79,.08)":"transparent"}}>
                      <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full" style={done?{background:"#3f7d4f",color:"#fff"}:{border:"2px solid rgba(61,107,80,.25)"}}>{done&&<Check size={13}/>}</span>
                      <span className="text-sm" style={{color:"var(--ink)",textDecoration:done?"line-through":"none",opacity:done?.6:1}}>{item}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function DisclaimerModal({onClose}){
  return(
    <div className="fixed inset-0 z-50 grid place-items-center p-4" style={{background:"rgba(46,82,64,.6)"}} onClick={onClose}>
      <div className="max-w-lg rounded-2xl p-6" style={{background:"var(--paper)"}} onClick={(e)=>e.stopPropagation()}>
        <div className="flex items-center gap-2"><Info size={20} color="var(--gold)"/><h3 className="font-display text-xl font-600" style={{color:"var(--green)"}}>Health disclaimer</h3></div>
        <div className="mt-4 space-y-3 text-sm leading-relaxed" style={{color:"var(--ink)"}}>
          <p>This library is for <strong>educational purposes only</strong> and is not medical advice, diagnosis, or treatment.</p>
          <p>These statements have not been evaluated by the FDA. Nothing here is intended to diagnose, treat, cure, or prevent any disease.</p>
          <p>Always consult a qualified healthcare provider before starting any herb or supplement, especially if pregnant or nursing, giving herbs to children, taking medications, or managing a health condition.</p>
          <p>Suspected infections including parasites require professional diagnosis and care.</p>
        </div>
        <button onClick={onClose} className="mt-5 w-full rounded-full py-2.5 text-sm font-700" style={{background:"var(--green)",color:"var(--gold)"}}>I understand</button>
      </div>
    </div>
  );
}
