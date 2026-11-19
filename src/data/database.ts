export interface Pair {
  nd: string;
  en: string;
}

const zip = (nd: string[], en: string[]): Pair[] =>
  nd.map((n, i) => ({ nd: n, en: en[i] ?? "" }));

export const seasons = zip(
  ["iHlobo", "isiruthwana", "uBusika", "isilimela"],
  ["Summer", "Autumn", "Winter", "Spring"],
).map((p, i) => ({
  ...p,
  image: `/img/${["summer", "autumn", "winter", "spring"][i]}.png`,
}));

export const days = zip(
  ["uMvulo", "uLesibili", "Lesithathu", "uLesine", "uLesihlanu", "uMgqibelo", "uSonto/do"],
  ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
);

export const directions = zip(
  ["eTlhagwini", "ePumalanga", "eSewula", "eTjhingalanga"],
  ["North", "East", "South", "West"],
);

export const months = zip(
  [
    "Utjhirhweni",
    "Umhlolanja",
    "uNtaka",
    "Usihlabantangana",
    "uMrhayili",
    "Umgwengweni",
    "Uvelabahlinza",
    "Urhoboyi",
    "uKhukhulamungu",
    "uSewula",
    "Usinyikhaba",
    "Unobayeni",
  ],
  [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ],
);

export const numbers = zip(
  [
    "kuNye",
    "kuBili",
    "kuThathu",
    "kuNe",
    "kuHlanu",
    "siThandathu",
    "LiKhomba",
    "buNane",
    "liThoba",
    "liTjhumi",
    "liKhulu",
    "Kulungwana",
    "Gidi",
  ],
  [
    "One - 1",
    "Two - 2",
    "Three - 3",
    "Four - 4",
    "Five - 5",
    "Six - 6",
    "Seven - 7",
    "Eight - 8",
    "Nine - 9",
    "Ten - 10",
    "Hundred - 100",
    "Thousand - 1000",
    "Million - 1000000",
  ],
);

export const time = zip(
  [
    "umzuzwana",
    "umzuzu",
    "iri",
    "Ilanga",
    "eBusuku",
    "eKuseni",
    "Ngamadina/emini yekuseni",
    "NgamaRhwaqela",
    "Namhlanjesi",
    "ebusuku Namhlangesi",
    "eBusuku bayizolo",
    "kusasa",
    "Izolo",
  ],
  [
    "Seconds",
    "Minute",
    "Hour",
    "Day",
    "Night",
    "Morning",
    "Noon",
    "Afternoon",
    "Today",
    "Tonight",
    "Last night",
    "Tomorrow",
    "Yesterday",
  ],
);

export const intangaNzunza = zip(
  [
    "AmaSinya",
    "AmoPhogo",
    "AmaRhorha",
    "AmaNghana",
    "AmaDube",
    "AmaDlowu",
    "AmaDlari",
    "AmaNyathi",
    "AmaRudla",
    "AmaGawu",
    "AmaDzibha",
    "AmaThula",
    "AmaDlaza",
    "AmaRhasa",
    "AmaDugu",
  ],
  [
    "yiFasimb'enzima",
    "maLinga",
    "yiNyon'emhlophe",
    "yiNtangenzima",
    "maSwaswa",
    "maGanadla",
    "maBasa",
    "yimBevu",
    "maSebelanga",
    "maDlambuzi",
    "zimBavumana",
    "maMagwa",
    "maVimba ngemikhonto",
    "zim'Pakoma",
    "miHlwazi",
  ],
);

export const intangaManala = zip(
  [
    "amaThebe",
    "amaDzibha",
    "amaGawu",
    "amaSwele",
    "amaRhasa",
    "amaDingwana",
    "amaPhaswana",
    "amaNghana",
    "amaDube",
    "amaDlowu",
    "amaDlari",
    "amaLinga",
    "amaRudla",
  ],
  [
    "Amahlehle",
    "Imbharumane",
    "Mphongolo",
    "Masotja",
    "yiNdlondlo, yiPakama yensiba ezibomvu.",
    "madlambuzi",
    "Maqothandethe",
    "yiNyoni emhlophe.",
    "Ikungu emnyama",
    "maBhode",
    "Malisa amkhonyana",
    "Inyathi",
    "Masebelanga",
  ],
);

export const abantazana = [
  "Ndlelehle",
  "Silinga",
  "Nofanezile",
  "Mngetjani",
  "Ncema",
  "Juguja",
  "S'phenge",
  "Vamuhle",
  "Phephelaphi",
  "Mfitjhani",
  "Nobanyaziwe",
  "Nomhlekhabo",
  "Dlhamaga",
  "Nciliba",
  "Nophakamile",
  "Norhatjhekile",
];

export const abalobokazi = ["Mzangoma", "Baphathele", "Kumbuza", "Maphangela"];

export const abesegwabo = [
  "Latjhaza",
  "Gebisa",
  "Dlalisa",
  "Delisa",
  "Ditjhisa",
  "Qomisa",
  "Fahlazana",
];

export const amasokana = [
  "Singhalela",
  "Maduma",
  "Slaki",
  "Madzela",
  "Msweswe",
  "Sgwadi",
  "Lidziya",
  "Paphana",
  "Thisana",
  "Thisila",
  "Nomasela",
  "Mahlabelela",
  "Mahlabezwe",
  "Ruli",
  "Mrube",
];

export const colours = [
  { nd: "Bomvu", en: "Red", hex: "#f44336" },
  { nd: "Hlaza", en: "Green", hex: "#4caf50" },
  { nd: "iliJuba/ihlaza (samkayi/kwesibhakabhaka)", en: "Blue", hex: "#2196f3" },
  { nd: "Sarulani", en: "Yellow", hex: "#ffeb3b" },
  { nd: "Nzotho", en: "Brown", hex: "#795548" },
  { nd: "Mhlope", en: "White", hex: "#ffffff" },
  { nd: "Nzima", en: "Black", hex: "#000000" },
  { nd: "Bukhwebe", en: "Pink", hex: "#e91e63" },
  { nd: "Tshetlha/Imlotha", en: "Grey", hex: "#9e9e9e" },
];

export const planets = [
  { nd: "uMhlaba", en: "Earth", image: "/img/earth.png" },
  { nd: "Inyezi", en: "Moon", image: "/img/moon.png" },
  { nd: "iLanga", en: "Sun", image: "/img/sun.PNG" },
  { nd: "iCephe", en: "Mercury", image: "/img/mercury.png" },
  { nd: "NoKwezi", en: "Venus", image: "/img/venus.PNG" },
  { nd: "NoZinyezi", en: "Saturn", image: "/img/saturn.PNG" },
  { nd: "uBomvana", en: "Mars", image: "/img/mars.png" },
  { nd: "uNyezizine", en: "Jupiter", image: "/img/jupitar.PNG" },
  { nd: "uRhwaba", en: "Uranus", image: "/img/uran.PNG" },
  { nd: "uZuba", en: "Neptune", image: "/img/neptune.png" },
  { nd: "uMbethe", en: "Pluto", image: "/img/pluto.PNG" },
];
