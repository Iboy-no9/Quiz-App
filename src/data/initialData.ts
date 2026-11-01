import type { Question, Quiz, StudentSubmission } from '../types/quiz.ts';

export const INITIAL_QUESTIONS: Question[] = [
  {
    "id": "q-cs-01",
    "text": "Which HTML5 element is specifically designed to contain self-contained syndicatable content, such as a blog post or news story?",
    "options": [
      {
        "id": "A",
        "text": "<section>"
      },
      {
        "id": "B",
        "text": "<article>"
      },
      {
        "id": "C",
        "text": "<aside>"
      },
      {
        "id": "D",
        "text": "<main>"
      }
    ],
    "correctOptionId": "B",
    "explanation": "<article> is meant for independent, self-contained content that could be distributed on its own (like blog posts or forum entries). <section> is a thematic grouping.",
    "category": "Computer Science",
    "difficulty": "easy",
    "points": 1,
    "createdAt": "2026-10-01T10:00:00Z"
  },
  {
    "id": "q-cs-02",
    "text": "In JavaScript, what is the value of `typeof null`?",
    "options": [
      {
        "id": "A",
        "text": "\"null\""
      },
      {
        "id": "B",
        "text": "\"undefined\""
      },
      {
        "id": "C",
        "text": "\"object\""
      },
      {
        "id": "D",
        "text": "\"number\""
      }
    ],
    "correctOptionId": "C",
    "explanation": "Due to a historical bug dating back to the first implementation of JavaScript, `typeof null` returns \"object\". Null is a primitive value representing an intentional absence of any object value.",
    "category": "Computer Science",
    "difficulty": "medium",
    "points": 1,
    "createdAt": "2026-10-01T10:05:00Z"
  },
  {
    "id": "q-cs-03",
    "text": "Which data structure follows the Last-In, First-Out (LIFO) operational principle?",
    "options": [
      {
        "id": "A",
        "text": "Queue"
      },
      {
        "id": "B",
        "text": "Stack"
      },
      {
        "id": "C",
        "text": "Binary Search Tree"
      },
      {
        "id": "D",
        "text": "Linked List"
      }
    ],
    "correctOptionId": "B",
    "explanation": "A Stack enforces LIFO (Last In First Out) operations via push and pop. In contrast, a Queue follows FIFO (First In First Out).",
    "category": "Computer Science",
    "difficulty": "easy",
    "points": 1,
    "createdAt": "2026-10-01T10:10:00Z"
  },
  {
    "id": "q-cs-04",
    "text": "What is the average time complexity of searching for an element in a balanced Binary Search Tree (AVL or Red-Black)?",
    "options": [
      {
        "id": "A",
        "text": "O(1)"
      },
      {
        "id": "B",
        "text": "O(n)"
      },
      {
        "id": "C",
        "text": "O(log n)"
      },
      {
        "id": "D",
        "text": "O(n log n)"
      }
    ],
    "correctOptionId": "C",
    "explanation": "A balanced binary search tree guarantees search time proportional to tree height, which is O(log n).",
    "category": "Computer Science",
    "difficulty": "medium",
    "points": 1,
    "createdAt": "2026-10-01T10:15:00Z"
  },
  {
    "id": "q-cs-05",
    "text": "Which HTTP status code signifies that the requested resource has been permanently moved to a new URI?",
    "options": [
      {
        "id": "A",
        "text": "301 Moved Permanently"
      },
      {
        "id": "B",
        "text": "302 Found"
      },
      {
        "id": "C",
        "text": "307 Temporary Redirect"
      },
      {
        "id": "D",
        "text": "404 Not Found"
      }
    ],
    "correctOptionId": "A",
    "explanation": "HTTP 301 is the standard status code for permanent redirection, informing search crawlers and clients to update their bookmarks.",
    "category": "Computer Science",
    "difficulty": "easy",
    "points": 1,
    "createdAt": "2026-10-01T10:20:00Z"
  },
  {
    "id": "q-cs-06",
    "text": "What does the CSS `box-sizing: border-box;` property do?",
    "options": [
      {
        "id": "A",
        "text": "Adds a thick border around the entire element container"
      },
      {
        "id": "B",
        "text": "Includes padding and border within the specified element width and height"
      },
      {
        "id": "C",
        "text": "Excludes padding from the total dimensions calculation"
      },
      {
        "id": "D",
        "text": "Constrains margin collapsing between adjacent elements"
      }
    ],
    "correctOptionId": "B",
    "explanation": "With border-box, the width and height properties include content, padding, and border, avoiding unexpected element expansion.",
    "category": "Computer Science",
    "difficulty": "medium",
    "points": 1,
    "createdAt": "2026-10-01T10:25:00Z"
  },
  {
    "id": "q-sci-01",
    "text": "What is the primary gas found in Earth’s atmosphere by volume?",
    "options": [
      {
        "id": "A",
        "text": "Oxygen (O2)"
      },
      {
        "id": "B",
        "text": "Nitrogen (N2)"
      },
      {
        "id": "C",
        "text": "Carbon Dioxide (CO2)"
      },
      {
        "id": "D",
        "text": "Argon (Ar)"
      }
    ],
    "correctOptionId": "B",
    "explanation": "Nitrogen comprises approximately 78.08% of Earth’s atmosphere, followed by oxygen at approximately 20.95%.",
    "category": "Science",
    "difficulty": "easy",
    "points": 1,
    "createdAt": "2026-10-02T11:00:00Z"
  },
  {
    "id": "q-sci-02",
    "text": "Which organelle is universally referred to as the powerhouse of the eukaryotic cell?",
    "options": [
      {
        "id": "A",
        "text": "Ribosome"
      },
      {
        "id": "B",
        "text": "Endoplasmic Reticulum"
      },
      {
        "id": "C",
        "text": "Mitochondrion"
      },
      {
        "id": "D",
        "text": "Golgi Apparatus"
      }
    ],
    "correctOptionId": "C",
    "explanation": "Mitochondria generate most of the chemical energy needed to power the cell’s biochemical reactions, stored in adenosine triphosphate (ATP).",
    "category": "Science",
    "difficulty": "easy",
    "points": 1,
    "createdAt": "2026-10-02T11:05:00Z"
  },
  {
    "id": "q-sci-03",
    "text": "What is the SI base unit of electric current?",
    "options": [
      {
        "id": "A",
        "text": "Volt"
      },
      {
        "id": "B",
        "text": "Ampere"
      },
      {
        "id": "C",
        "text": "Ohm"
      },
      {
        "id": "D",
        "text": "Watt"
      }
    ],
    "correctOptionId": "B",
    "explanation": "The ampere (symbol: A) is the base unit of electric current in the International System of Units (SI). Volt measures potential difference, and Ohm measures resistance.",
    "category": "Science",
    "difficulty": "medium",
    "points": 1,
    "createdAt": "2026-10-02T11:10:00Z"
  },
  {
    "id": "q-sci-04",
    "text": "Which subatomic particle carries no net electric charge?",
    "options": [
      {
        "id": "A",
        "text": "Proton"
      },
      {
        "id": "B",
        "text": "Electron"
      },
      {
        "id": "C",
        "text": "Neutron"
      },
      {
        "id": "D",
        "text": "Positron"
      }
    ],
    "correctOptionId": "C",
    "explanation": "Neutrons reside in atomic nuclei and have neutral electric charge (zero). Protons are positively charged, and electrons are negatively charged.",
    "category": "Science",
    "difficulty": "easy",
    "points": 1,
    "createdAt": "2026-10-02T11:15:00Z"
  },
  {
    "id": "q-geo-01",
    "text": "What is the capital city of Australia?",
    "options": [
      {
        "id": "A",
        "text": "Sydney"
      },
      {
        "id": "B",
        "text": "Melbourne"
      },
      {
        "id": "C",
        "text": "Canberra"
      },
      {
        "id": "D",
        "text": "Brisbane"
      }
    ],
    "correctOptionId": "C",
    "explanation": "Canberra is the federal capital of Australia, chosen in 1908 as a compromise between rival cities Sydney and Melbourne.",
    "category": "Geography",
    "difficulty": "easy",
    "points": 1,
    "createdAt": "2026-10-03T08:00:00Z"
  },
  {
    "id": "q-geo-02",
    "text": "Which is the longest river in the world by general scientific consensus?",
    "options": [
      {
        "id": "A",
        "text": "Amazon River"
      },
      {
        "id": "B",
        "text": "Nile River"
      },
      {
        "id": "C",
        "text": "Yangtze River"
      },
      {
        "id": "D",
        "text": "Mississippi River"
      }
    ],
    "correctOptionId": "B",
    "explanation": "The Nile River in northeastern Africa is traditionally considered the longest river in the world, spanning approximately 6,650 kilometers.",
    "category": "Geography",
    "difficulty": "easy",
    "points": 1,
    "createdAt": "2026-10-03T08:05:00Z"
  },
  {
    "id": "q-geo-03",
    "text": "Which mountain range separates the European continent from Asia?",
    "options": [
      {
        "id": "A",
        "text": "The Alps"
      },
      {
        "id": "B",
        "text": "The Andes"
      },
      {
        "id": "C",
        "text": "The Ural Mountains"
      },
      {
        "id": "D",
        "text": "The Himalayas"
      }
    ],
    "correctOptionId": "C",
    "explanation": "The Ural Mountains run north to south through western Russia and form the conventional boundary between Europe and Asia.",
    "category": "Geography",
    "difficulty": "medium",
    "points": 1,
    "createdAt": "2026-10-03T08:10:00Z"
  },
  {
    "id": "q-geo-04",
    "text": "What is the largest desert in the world by total land area?",
    "options": [
      {
        "id": "A",
        "text": "Sahara Desert"
      },
      {
        "id": "B",
        "text": "Arabian Desert"
      },
      {
        "id": "C",
        "text": "Antarctic Polar Desert"
      },
      {
        "id": "D",
        "text": "Gobi Desert"
      }
    ],
    "correctOptionId": "C",
    "explanation": "A desert is defined by low precipitation. The Antarctic Polar Desert covers approximately 14.2 million square kilometers, making it the largest.",
    "category": "Geography",
    "difficulty": "medium",
    "points": 1,
    "createdAt": "2026-10-03T08:15:00Z"
  },
  {
    "id": "q-geo-05",
    "text": "The Strait of Gibraltar connects the Atlantic Ocean with which sea?",
    "options": [
      {
        "id": "A",
        "text": "Black Sea"
      },
      {
        "id": "B",
        "text": "Red Sea"
      },
      {
        "id": "C",
        "text": "Mediterranean Sea"
      },
      {
        "id": "D",
        "text": "Baltic Sea"
      }
    ],
    "correctOptionId": "C",
    "explanation": "The Strait of Gibraltar is a narrow waterway connecting the Atlantic Ocean to the Mediterranean Sea and separating Spain from Morocco.",
    "category": "Geography",
    "difficulty": "easy",
    "points": 1,
    "createdAt": "2026-10-03T08:20:00Z"
  },
  {
    "id": "q-geo-06",
    "text": "Which country has the greatest number of natural lakes in the world?",
    "options": [
      {
        "id": "A",
        "text": "United States"
      },
      {
        "id": "B",
        "text": "Canada"
      },
      {
        "id": "C",
        "text": "Russia"
      },
      {
        "id": "D",
        "text": "Finland"
      }
    ],
    "correctOptionId": "B",
    "explanation": "Canada contains over 2 million lakes, containing more lake area than any other country in the world.",
    "category": "Geography",
    "difficulty": "medium",
    "points": 1,
    "createdAt": "2026-10-03T08:25:00Z"
  },
  {
    "id": "q-geo-07",
    "text": "What is the deepest known location in the Earth's oceans?",
    "options": [
      {
        "id": "A",
        "text": "Puerto Rico Trench"
      },
      {
        "id": "B",
        "text": "Java Trench"
      },
      {
        "id": "C",
        "text": "Challenger Deep (Mariana Trench)"
      },
      {
        "id": "D",
        "text": "Sunda Deep"
      }
    ],
    "correctOptionId": "C",
    "explanation": "Challenger Deep, located in the southern end of the Mariana Trench, plunges nearly 11,000 meters (36,000 feet) below sea level.",
    "category": "Geography",
    "difficulty": "easy",
    "points": 1,
    "createdAt": "2026-10-03T08:30:00Z"
  },
  {
    "id": "q-geo-08",
    "text": "Which African nation is completely surrounded by another single country (an enclave)?",
    "options": [
      {
        "id": "A",
        "text": "Swaziland (Eswatini)"
      },
      {
        "id": "B",
        "text": "Lesotho"
      },
      {
        "id": "C",
        "text": "Gambia"
      },
      {
        "id": "D",
        "text": "Djibouti"
      }
    ],
    "correctOptionId": "B",
    "explanation": "The Kingdom of Lesotho is an enclaved country completely surrounded by the Republic of South Africa.",
    "category": "Geography",
    "difficulty": "medium",
    "points": 1,
    "createdAt": "2026-10-03T08:35:00Z"
  },
  {
    "id": "q-geo-09",
    "text": "Which tectonic plate boundary is primarily responsible for the formation of the Himalayan mountain range?",
    "options": [
      {
        "id": "A",
        "text": "Divergent boundary between Pacific and Nazca plates"
      },
      {
        "id": "B",
        "text": "Convergent collision between the Indian Plate and Eurasian Plate"
      },
      {
        "id": "C",
        "text": "Transform fault along the San Andreas system"
      },
      {
        "id": "D",
        "text": "Subduction zone beneath the North American plate"
      }
    ],
    "correctOptionId": "B",
    "explanation": "The ongoing continental collision between the Indian and Eurasian plates creates intense crustal thickening, producing the Himalayas.",
    "category": "Geography",
    "difficulty": "hard",
    "points": 1,
    "createdAt": "2026-10-03T08:40:00Z"
  },
  {
    "id": "q-geo-10",
    "text": "What line of latitude is situated at approximately 23.5 degrees North of the Equator?",
    "options": [
      {
        "id": "A",
        "text": "Tropic of Capricorn"
      },
      {
        "id": "B",
        "text": "Prime Meridian"
      },
      {
        "id": "C",
        "text": "Tropic of Cancer"
      },
      {
        "id": "D",
        "text": "Arctic Circle"
      }
    ],
    "correctOptionId": "C",
    "explanation": "The Tropic of Cancer lies at approximately 23.5° N, marking the most northerly latitude where the sun can appear directly overhead at solar noon.",
    "category": "Geography",
    "difficulty": "easy",
    "points": 1,
    "createdAt": "2026-10-03T08:45:00Z"
  },
  {
    "id": "q-geo-11",
    "text": "Which is the largest island in the world that is not considered a continent?",
    "options": [
      {
        "id": "A",
        "text": "New Guinea"
      },
      {
        "id": "B",
        "text": "Borneo"
      },
      {
        "id": "C",
        "text": "Greenland"
      },
      {
        "id": "D",
        "text": "Madagascar"
      }
    ],
    "correctOptionId": "C",
    "explanation": "Greenland has a total area of approximately 2.16 million square kilometers, making it the largest non-continental island.",
    "category": "Geography",
    "difficulty": "easy",
    "points": 1,
    "createdAt": "2026-10-03T08:50:00Z"
  },
  {
    "id": "q-geo-12",
    "text": "Through which European city does the Prime Meridian (0° longitude) officially pass?",
    "options": [
      {
        "id": "A",
        "text": "Paris, France"
      },
      {
        "id": "B",
        "text": "Greenwich (London), United Kingdom"
      },
      {
        "id": "C",
        "text": "Berlin, Germany"
      },
      {
        "id": "D",
        "text": "Madrid, Spain"
      }
    ],
    "correctOptionId": "B",
    "explanation": "The Prime Meridian passes through the Royal Observatory in Greenwich, London, established by international conference in 1884.",
    "category": "Geography",
    "difficulty": "easy",
    "points": 1,
    "createdAt": "2026-10-03T08:55:00Z"
  },
  {
    "id": "q-geo-13",
    "text": "What is the highest uninterrupted waterfall in the world?",
    "options": [
      {
        "id": "A",
        "text": "Niagara Falls"
      },
      {
        "id": "B",
        "text": "Victoria Falls"
      },
      {
        "id": "C",
        "text": "Angel Falls"
      },
      {
        "id": "D",
        "text": "Iguazu Falls"
      }
    ],
    "correctOptionId": "C",
    "explanation": "Angel Falls (Salto Ángel) in Canaima National Park, Venezuela, has an uninterrupted drop of 807 meters and a total height of 979 meters.",
    "category": "Geography",
    "difficulty": "easy",
    "points": 1,
    "createdAt": "2026-10-03T09:00:00Z"
  },
  {
    "id": "q-geo-14",
    "text": "Which sea is known for having one of the highest salinities in the world, allowing people to float effortlessly?",
    "options": [
      {
        "id": "A",
        "text": "Baltic Sea"
      },
      {
        "id": "B",
        "text": "Dead Sea"
      },
      {
        "id": "C",
        "text": "Caspian Sea"
      },
      {
        "id": "D",
        "text": "Aral Sea"
      }
    ],
    "correctOptionId": "B",
    "explanation": "The Dead Sea is a hypersaline lake between Jordan and Israel with around 34% salinity, creating extreme water density.",
    "category": "Geography",
    "difficulty": "easy",
    "points": 1,
    "createdAt": "2026-10-03T09:05:00Z"
  },
  {
    "id": "q-geo-15",
    "text": "Which country spans eleven different contiguous or territorial time zones?",
    "options": [
      {
        "id": "A",
        "text": "Canada"
      },
      {
        "id": "B",
        "text": "China"
      },
      {
        "id": "C",
        "text": "Russia"
      },
      {
        "id": "D",
        "text": "Brazil"
      }
    ],
    "correctOptionId": "C",
    "explanation": "Russia stretches across northern Eurasia across 11 standard time zones (UTC+2 to UTC+12).",
    "category": "Geography",
    "difficulty": "medium",
    "points": 1,
    "createdAt": "2026-10-03T09:10:00Z"
  },
  {
    "id": "q-geo-16",
    "text": "What is the capital city of Canada?",
    "options": [
      {
        "id": "A",
        "text": "Toronto"
      },
      {
        "id": "B",
        "text": "Vancouver"
      },
      {
        "id": "C",
        "text": "Ottawa"
      },
      {
        "id": "D",
        "text": "Montreal"
      }
    ],
    "correctOptionId": "C",
    "explanation": "Ottawa, situated in eastern Ontario near the Quebec border, was chosen as the capital of Canada by Queen Victoria in 1857.",
    "category": "Geography",
    "difficulty": "easy",
    "points": 1,
    "createdAt": "2026-10-03T09:15:00Z"
  },
  {
    "id": "q-geo-17",
    "text": "Which body of water is situated between Saudi Arabia and Iran?",
    "options": [
      {
        "id": "A",
        "text": "Red Sea"
      },
      {
        "id": "B",
        "text": "Persian Gulf"
      },
      {
        "id": "C",
        "text": "Gulf of Aden"
      },
      {
        "id": "D",
        "text": "Arabian Sea"
      }
    ],
    "correctOptionId": "B",
    "explanation": "The Persian Gulf is a Mediterranean sea in Western Asia extending from the Indian Ocean through the Strait of Hormuz between Iran and the Arabian Peninsula.",
    "category": "Geography",
    "difficulty": "easy",
    "points": 1,
    "createdAt": "2026-10-03T09:20:00Z"
  },
  {
    "id": "q-geo-18",
    "text": "Lake Baikal, the world's oldest and deepest freshwater lake, is located in which country?",
    "options": [
      {
        "id": "A",
        "text": "Mongolia"
      },
      {
        "id": "B",
        "text": "Kazakhstan"
      },
      {
        "id": "C",
        "text": "Russia"
      },
      {
        "id": "D",
        "text": "China"
      }
    ],
    "correctOptionId": "C",
    "explanation": "Lake Baikal is located in southern Siberia, Russia, and contains roughly 22% of the world's surface fresh water.",
    "category": "Geography",
    "difficulty": "easy",
    "points": 1,
    "createdAt": "2026-10-03T09:25:00Z"
  },
  {
    "id": "q-geo-19",
    "text": "Which is the second most populous country on the African continent?",
    "options": [
      {
        "id": "A",
        "text": "Egypt"
      },
      {
        "id": "B",
        "text": "Ethiopia"
      },
      {
        "id": "C",
        "text": "Democratic Republic of the Congo"
      },
      {
        "id": "D",
        "text": "South Africa"
      }
    ],
    "correctOptionId": "B",
    "explanation": "Nigeria is the most populous African country, followed closely by Ethiopia with over 120 million residents.",
    "category": "Geography",
    "difficulty": "hard",
    "points": 1,
    "createdAt": "2026-10-03T09:30:00Z"
  },
  {
    "id": "q-geo-20",
    "text": "The Ring of Fire is a major area in the basin of which ocean where many earthquakes and volcanic eruptions occur?",
    "options": [
      {
        "id": "A",
        "text": "Atlantic Ocean"
      },
      {
        "id": "B",
        "text": "Indian Ocean"
      },
      {
        "id": "C",
        "text": "Pacific Ocean"
      },
      {
        "id": "D",
        "text": "Arctic Ocean"
      }
    ],
    "correctOptionId": "C",
    "explanation": "The Circum-Pacific Belt, commonly known as the Ring of Fire, borders the Pacific Ocean and contains around 75% of the world's active volcanoes.",
    "category": "Geography",
    "difficulty": "easy",
    "points": 1,
    "createdAt": "2026-10-03T09:35:00Z"
  },
  {
    "id": "q-geo-21",
    "text": "What is the official currency of Japan?",
    "options": [
      {
        "id": "A",
        "text": "Won"
      },
      {
        "id": "B",
        "text": "Yuan"
      },
      {
        "id": "C",
        "text": "Yen"
      },
      {
        "id": "D",
        "text": "Baht"
      }
    ],
    "correctOptionId": "C",
    "explanation": "The Japanese Yen (JPY, ¥) is the official currency of Japan and one of the most traded currencies in foreign exchange markets.",
    "category": "General",
    "difficulty": "easy",
    "points": 1,
    "createdAt": "2026-10-03T09:40:00Z"
  },
  {
    "id": "q-geo-22",
    "text": "Which nation has the world's longest coastline?",
    "options": [
      {
        "id": "A",
        "text": "Norway"
      },
      {
        "id": "B",
        "text": "Australia"
      },
      {
        "id": "C",
        "text": "Canada"
      },
      {
        "id": "D",
        "text": "Indonesia"
      }
    ],
    "correctOptionId": "C",
    "explanation": "With its numerous Arctic archipelagos and coastal inlets, Canada boasts the longest coastline in the world at over 243,000 kilometers.",
    "category": "Geography",
    "difficulty": "medium",
    "points": 1,
    "createdAt": "2026-10-03T09:45:00Z"
  },
  {
    "id": "q-geo-23",
    "text": "The historic Silk Road primarily connected which two regions of the world?",
    "options": [
      {
        "id": "A",
        "text": "East Asia and the Mediterranean basin"
      },
      {
        "id": "B",
        "text": "South America and West Africa"
      },
      {
        "id": "C",
        "text": "Scandinavia and Southeast Asia"
      },
      {
        "id": "D",
        "text": "Australia and Central Asia"
      }
    ],
    "correctOptionId": "A",
    "explanation": "The ancient Silk Road was a network of Eurasian trade routes active from the Han dynasty that connected China with Europe and the Mediterranean.",
    "category": "General",
    "difficulty": "easy",
    "points": 1,
    "createdAt": "2026-10-03T09:50:00Z"
  },
  {
    "id": "q-geo-24",
    "text": "What is the largest coral reef system on planet Earth?",
    "options": [
      {
        "id": "A",
        "text": "Mesoamerican Barrier Reef"
      },
      {
        "id": "B",
        "text": "Great Barrier Reef"
      },
      {
        "id": "C",
        "text": "New Caledonia Barrier Reef"
      },
      {
        "id": "D",
        "text": "Red Sea Coral Reef"
      }
    ],
    "correctOptionId": "B",
    "explanation": "The Great Barrier Reef, off the coast of Queensland, Australia, is composed of over 2,900 individual reefs and stretches over 2,300 kilometers.",
    "category": "Geography",
    "difficulty": "easy",
    "points": 1,
    "createdAt": "2026-10-03T09:55:00Z"
  },
  {
    "id": "q-geo-25",
    "text": "Which European city is widely celebrated for its extensive urban network of canals, gondolas, and lack of vehicular roads?",
    "options": [
      {
        "id": "A",
        "text": "Amsterdam"
      },
      {
        "id": "B",
        "text": "Venice"
      },
      {
        "id": "C",
        "text": "Bruges"
      },
      {
        "id": "D",
        "text": "Stockholm"
      }
    ],
    "correctOptionId": "B",
    "explanation": "Venice, built across 118 small islands in the Venetian Lagoon, has no roadways for cars and relies entirely on canals and pedestrian bridges.",
    "category": "General",
    "difficulty": "easy",
    "points": 1,
    "createdAt": "2026-10-03T10:00:00Z"
  },
  {
    "id": "q-geo-26",
    "text": "What is the driest non-polar desert on Earth, receiving almost no measurable annual rainfall?",
    "options": [
      {
        "id": "A",
        "text": "Kalahari Desert"
      },
      {
        "id": "B",
        "text": "Mojave Desert"
      },
      {
        "id": "C",
        "text": "Atacama Desert"
      },
      {
        "id": "D",
        "text": "Thar Desert"
      }
    ],
    "correctOptionId": "C",
    "explanation": "The Atacama Desert in northern Chile is situated in a double rain shadow between the Chilean Coast Range and the Andes, making it hyperarid.",
    "category": "Geography",
    "difficulty": "medium",
    "points": 1,
    "createdAt": "2026-10-03T10:05:00Z"
  },
  {
    "id": "q-geo-27",
    "text": "Which atmospheric gas constitutes approximately 78% of dry air in the Earth's troposphere?",
    "options": [
      {
        "id": "A",
        "text": "Oxygen"
      },
      {
        "id": "B",
        "text": "Carbon Dioxide"
      },
      {
        "id": "C",
        "text": "Nitrogen"
      },
      {
        "id": "D",
        "text": "Argon"
      }
    ],
    "correctOptionId": "C",
    "explanation": "Nitrogen makes up roughly 78.08% of dry atmospheric volume, followed by Oxygen at 20.95% and Argon at 0.93%.",
    "category": "Science",
    "difficulty": "easy",
    "points": 1,
    "createdAt": "2026-10-03T10:10:00Z"
  },
  {
    "id": "q-geo-28",
    "text": "What major trade canal was constructed across Central America in 1914 to connect the Atlantic and Pacific Oceans?",
    "options": [
      {
        "id": "A",
        "text": "Suez Canal"
      },
      {
        "id": "B",
        "text": "Kiel Canal"
      },
      {
        "id": "C",
        "text": "Panama Canal"
      },
      {
        "id": "D",
        "text": "Corinth Canal"
      }
    ],
    "correctOptionId": "C",
    "explanation": "The Panama Canal is an artificial 82 km waterway through the Isthmus of Panama that greatly shortened maritime shipping routes between the two oceans.",
    "category": "General",
    "difficulty": "easy",
    "points": 1,
    "createdAt": "2026-10-03T10:15:00Z"
  },
  {
    "id": "q-1793419814188-0-lad5",
    "text": "Which narrow strait connects the Sea of Marmara to the Aegean Sea, separating European Turkey from Asian Turkey?",
    "options": [
      {
        "id": "A",
        "text": "Bosporus / ബോസ്ഫറസ്"
      },
      {
        "id": "B",
        "text": "Dardanelles / ഡാർഡനെൽസ്"
      },
      {
        "id": "C",
        "text": "Strait of Gibraltar / ജിബ്രാൾട്ടർ കടലിടുക്ക്"
      },
      {
        "id": "D",
        "text": "Strait of Malacca / മലാക്ക കടലിടുക്ക്"
      }
    ],
    "correctOptionId": "B",
    "explanation": "The Dardanelles connects the Sea of Marmara to the Aegean Sea. The Bosporus connects the Black Sea to the Sea of Marmara. / ഡാർഡനെൽസ് കടലിടുക്കാണ് മർമര കടലിനെ ഈജിയൻ കടലുമായി ബന്ധിപ്പിക്കുന്നത്. ബോസ്ഫറസ് കടലിടുക്ക് കരിങ്കടലിനെയാണ് മർമര കടലുമായി ബന്ധിപ്പിക്കുന്നത്.",
    "category": "Geography",
    "difficulty": "medium",
    "points": 1,
    "createdAt": "2026-10-31T04:10:14.188Z"
  },
  {
    "id": "q-1793419814188-1-ld3r",
    "text": "Which mountain peak is the highest in the continent of Europe, located in the Caucasus range rather than the Alps?",
    "options": [
      {
        "id": "A",
        "text": "Mont Blanc / മോണ്ട് ബ്ലാങ്ക്"
      },
      {
        "id": "B",
        "text": "Mount Elbrus / എൽബ്രസ് പർവതം"
      },
      {
        "id": "C",
        "text": "Matterhorn / മാറ്റർഹോൺ"
      },
      {
        "id": "D",
        "text": "Mount Kilimanjaro / കിളിമഞ്ചാരോ പർവതം"
      }
    ],
    "correctOptionId": "B",
    "explanation": "Mount Elbrus in the Caucasus Mountains is the highest peak in Europe (5,642 meters). Mont Blanc is the highest in the Alps but lower than Elbrus. / കോക്കസസ് പർവതനിരയിലെ എൽബ്രസ് പർവതമാണ് (5,642 മീറ്റർ) യൂറോപ്പിലെ ഏറ്റവും ഉയർന്ന കൊടുമുടി. മോണ്ട് ബ്ലാങ്ക് ആൽപ്സ് പർവതനിരയിലെ ഏറ്റവും ഉയർന്നതാണെങ്കിലും എൽബ്രസിനേക്കാൾ ഉയരം കുറവാണ്.",
    "category": "Geography",
    "difficulty": "medium",
    "points": 1,
    "createdAt": "2026-10-31T04:10:14.188Z"
  },
  {
    "id": "q-1793419814188-2-wkjy",
    "text": "Which cold-winter desert occupies a rain-shadow plateau between the Andes Mountains and the Atlantic coast in southern Argentina?",
    "options": [
      {
        "id": "A",
        "text": "Atacama Desert / അറ്റകാമ മരുഭൂമി"
      },
      {
        "id": "B",
        "text": "Patagonian Desert / പറ്റഗോണിയൻ മരുഭൂമി"
      },
      {
        "id": "C",
        "text": "Kalahari Desert / കലഹാരി മരുഭൂമി"
      },
      {
        "id": "D",
        "text": "Mojave Desert / മൊഹാവെ മരുഭൂമി"
      }
    ],
    "correctOptionId": "B",
    "explanation": "The Patagonian Desert is a cold desert in Argentina formed due to the rain shadow of the Andes. The Atacama is a hot, hyper-arid coastal desert in Chile. / ആൻഡീസ് പർവതനിരകളുടെ മഴനിഴൽ പ്രഭാവം കാരണം അർജന്റീനയിൽ രൂപംകൊണ്ട ഒരു തണുത്ത മരുഭൂമിയാണ് പറ്റഗോണിയൻ മരുഭൂമി. ചിലിയിലുള്ള അറ്റകാമ വളരെ വരണ്ട ഒരു തീരദേശ മരുഭൂമിയാണ്.",
    "category": "Geography",
    "difficulty": "medium",
    "points": 1,
    "createdAt": "2026-10-31T04:10:14.188Z"
  },
  {
    "id": "q-1793419814188-3-7twa",
    "text": "Which major African river system flows inland and fans out into the Kalahari Desert, forming a vast seasonal inland delta instead of emptying into an ocean?",
    "options": [
      {
        "id": "A",
        "text": "Zambezi River / സാംബസി നദി"
      },
      {
        "id": "B",
        "text": "Limpopo River / ലിംപോപോ നദി"
      },
      {
        "id": "C",
        "text": "Okavango River / ഓകവാംഗോ നദി"
      },
      {
        "id": "D",
        "text": "Orange River / ഓറഞ്ച് നദി"
      }
    ],
    "correctOptionId": "C",
    "explanation": "The Okavango River forms the famous Okavango Delta inside the Kalahari Basin without reaching the sea. The others empty into the ocean. / ഓകവാംഗോ നദി സമുദ്രത്തിൽ ചേരാതെ കലഹാരി തടത്തിനുള്ളിൽ പ്രസിദ്ധമായ ഓകവാംഗോ ഡെൽറ്റ രൂപീകരിക്കുന്നു. മറ്റ് നദികളെല്ലാം സമുദ്രത്തിലേക്ക് ഒഴുകുന്നവയാണ്.",
    "category": "Geography",
    "difficulty": "medium",
    "points": 1,
    "createdAt": "2026-10-31T04:10:14.188Z"
  },
  {
    "id": "q-1793419814188-4-0tvk",
    "text": "Which famous intellectual centre in Baghdad flourished during the Abbasid Caliphate and became known for translating Greek, Persian, and Indian scientific works into Arabic?",
    "options": [
      {
        "id": "A",
        "text": "House of Wisdom (Bayt al-Hikma) / ബൈത്തുൽ ഹിക്മ"
      },
      {
        "id": "B",
        "text": "Library of Alexandria / ലൈബ്രറി ഓഫ് അലക്സാണ്ട്രിയ"
      },
      {
        "id": "C",
        "text": "Nizamiyya Madrasa / നിസാമിയ്യ മദ്‌റസ"
      },
      {
        "id": "D",
        "text": "Al-Azhar University / അൽ-അസ്ഹർ സർവ്വകലാശാല"
      }
    ],
    "correctOptionId": "A",
    "explanation": "The House of Wisdom was a major intellectual centre in Baghdad during the Abbasid era, associated with the translation and study of scientific and philosophical works from different civilizations. / അബ്ബാസിയ കാലഘട്ടത്തിൽ ബഗ്ദാദിലെ പ്രധാന വിജ്ഞാനകേന്ദ്രമായിരുന്നു ബൈത്തുൽ ഹിക്മ. വിവിധ നാഗരികതകളിലെ ശാസ്ത്രീയവും തത്ത്വചിന്താപരവുമായ ഗ്രന്ഥങ്ങളുടെ വിവർത്തനവും പഠനവുമായി ഇത് ബന്ധപ്പെട്ടിരുന്നു. Answer / ഉത്തരം: A. House of Wisdom (Bayt al-Hikma) / ബൈത്തുൽ ഹിക്മ Explanation (English): The House of Wisdom was a major intellectual hub in Baghdad where ancient Greek, Persian, and Indian scientific texts were translated into Arabic. Explanation (Malayalam): പുരാതന ഗ്രീക്ക്, പേർഷ്യൻ, ഇന്ത്യൻ ശാസ്ത്ര ഗ്രന്ഥങ്ങൾ അറബിയിലേക്ക് വിവർത്തനം ചെയ്യപ്പെട്ടിരുന്ന ബഗ്ദാദിലെ ഏറ്റവും വലിയ വിജ്ഞാന കേന്ദ്രമായിരുന്നു ബൈത്തുൽ ഹിക്മ.",
    "category": "History",
    "difficulty": "medium",
    "points": 1,
    "createdAt": "2026-10-31T04:10:14.188Z"
  },
  {
    "id": "q-1793419814188-5-0toj",
    "text": "Which major early Islamic battle, fought in 624 CE, marked the first decisive military victory for the Muslim community under the leadership of Prophet Muhammad?",
    "options": [
      {
        "id": "A",
        "text": "Battle of Uhud / ഉഹുദ് യുദ്ധം"
      },
      {
        "id": "B",
        "text": "Battle of Badr / ബദ്ർ യുദ്ധം"
      },
      {
        "id": "C",
        "text": "Battle of the Trench (Khandaq) / ഖന്ദഖ് യുദ്ധം"
      },
      {
        "id": "D",
        "text": "Battle of Yarmouk / യർമൂക് യുദ്ധം"
      }
    ],
    "correctOptionId": "B",
    "explanation": "The Battle of Badr was a key turning point in the early history of Islam, where a smaller Muslim force defeated a larger Quraish army. / ഇസ്‌ലാമിന്റെ ആദ്യകാല ചരിത്രത്തിലെ നിർണായകമായ ഒരു വഴിത്തിരിവായിരുന്നു ബദ്ർ യുദ്ധം. ഇതിൽ എണ്ണത്തിൽ കുറവായിരുന്ന മുസ്‌ലിം സൈന്യം ഖുറൈശികളുടെ വലിയ സൈന്യത്തെ പരാജയപ്പെടുത്തി.",
    "category": "History",
    "difficulty": "medium",
    "points": 1,
    "createdAt": "2026-10-31T04:10:14.188Z"
  },
  {
    "id": "q-1793419814188-6-2css",
    "text": "Which fundamental right was famously described by Dr. B.R. Ambedkar as the \"Heart and Soul\" of the Indian Constitution?",
    "options": [
      {
        "id": "A",
        "text": "Right to Equality / സമത്വത്തിനുള്ള അവകാശം"
      },
      {
        "id": "B",
        "text": "Right to Freedom / സ്വാതന്ത്ര്യത്തിനുള്ള അവകാശം"
      },
      {
        "id": "C",
        "text": "Right to Constitutional Remedies / ഭരണഘടനാപരമായ പരിഹാരങ്ങൾക്കുള്ള അവകാശം"
      },
      {
        "id": "D",
        "text": "Right against Exploitation / ചൂഷണത്തിനെതിരെയുള്ള അവകാശം"
      }
    ],
    "correctOptionId": "C",
    "explanation": "Article 32 (Right to Constitutional Remedies) allows citizens to approach the Supreme Court if their fundamental rights are violated. / ഭരണഘടനയുടെ 32-ാം അനുച്ഛേദ പ്രകാരമുള്ള ഈ അവകാശം, ഒരു പൗരന്റെ മൗലികാവകാശങ്ങൾ ലംഘിക്കപ്പെട്ടാൽ സുപ്രീം കോടതിയെ സമീപിക്കാൻ അധികാരം നൽകുന്നു.",
    "category": "General Knowledge",
    "difficulty": "medium",
    "points": 1,
    "createdAt": "2026-10-31T04:10:14.188Z"
  },
  {
    "id": "q-1793419814188-7-e6ft",
    "text": "What is the only deep-sea ocean trench on Earth that drops below 10,000 meters, containing the lowest ocean point known as the Challenger Deep?",
    "options": [
      {
        "id": "A",
        "text": "Puerto Rico Trench / പ്യൂർട്ടോ റിക്കോ ഗർത്തം"
      },
      {
        "id": "B",
        "text": "Java Trench / ജാവ ഗർത്തം"
      },
      {
        "id": "C",
        "text": "Mariana Trench / മരിയാന ഗർത്തം"
      },
      {
        "id": "D",
        "text": "Tonga Trench / ടോംഗ ഗർത്തം"
      }
    ],
    "correctOptionId": "C",
    "explanation": "Located in the western Pacific Ocean, the Mariana Trench reaches a maximum depth of nearly 11,000 meters at the Challenger Deep. / പടിഞ്ഞാറൻ പസഫിക് സമുദ്രത്തിൽ സ്ഥിതി ചെയ്യുന്ന മരിയാന ഗർത്തത്തിലെ ചലഞ്ചർ ഡീപ്പിന് ഏകദേശം 11,000 മീറ്ററോളം ആഴമുണ്ട്.",
    "category": "Geography",
    "difficulty": "medium",
    "points": 1,
    "createdAt": "2026-10-31T04:10:14.188Z"
  },
  {
    "id": "q-1793419814188-8-l0me",
    "text": "Which country successfully hosted the United Nations Climate Change Conference (COP30) in late 2025 in the Amazonian city of Belém?",
    "options": [
      {
        "id": "A",
        "text": "United Arab Emirates / യുണൈറ്റഡ് അറബ് എമിറേറ്റ്സ്"
      },
      {
        "id": "B",
        "text": "Azerbaijan / അസർബൈജാൻ"
      },
      {
        "id": "C",
        "text": "Brazil / ബ്രസീൽ"
      },
      {
        "id": "D",
        "text": "India / ഇന്ത്യ"
      }
    ],
    "correctOptionId": "C",
    "explanation": "Brazil hosted COP30 in Belém in November 2025 to focus heavily on the protection of the Amazon rainforest and global carbon reduction goals. / ആമസോൺ മഴക്കാടുകളുടെ സംരക്ഷണത്തിനും ആഗോള കാർബൺ കുറയ്ക്കൽ ലക്ഷ്യങ്ങൾക്കും മുൻഗണന നൽകിക്കൊണ്ട് 2025 നവംബറിൽ ബ്രസീലാണ് COP30 സമ്മേളനത്തിന് ആതിഥേയത്വം വഹിച്ചത്.",
    "category": "Current Affairs",
    "difficulty": "medium",
    "points": 1,
    "createdAt": "2026-10-31T04:10:14.188Z"
  },
  {
    "id": "q-1793419814188-9-6z6a",
    "text": "In early 2026, which country officially became the 32nd member nation to join the North Atlantic Treaty Organization (NATO) defense alliance after a prolonged ratification process?",
    "options": [
      {
        "id": "A",
        "text": "Finland / ഫിൻലൻഡ്"
      },
      {
        "id": "B",
        "text": "Sweden / സ്വീഡൻ"
      },
      {
        "id": "C",
        "text": "Ukraine / ഉക്രൈൻ"
      },
      {
        "id": "D",
        "text": "Switzerland / സ്വിറ്റ്സർലൻഡ്"
      }
    ],
    "correctOptionId": "B",
    "explanation": "Following Finland's accession, Sweden completed all ratifications to officially join NATO as its 32nd member. / ഫിൻലൻഡിന്റെ പ്രവേശനത്തിന് ശേഷം, സ്വീഡൻ എല്ലാ ഔദ്യോഗിക നടപടികളും പൂർത്തിയാക്കി നാറ്റോയുടെ (NATO) 32-ാമത് അംഗരാജ്യമായി മാറി.",
    "category": "Current Affairs",
    "difficulty": "medium",
    "points": 1,
    "createdAt": "2026-10-31T04:10:14.188Z"
  },
  {
    "id": "q-1793419814188-10-ilc8",
    "text": "Which mountain range forms the traditional natural geographic boundary dividing European Russia from Asian Russia?",
    "options": [
      {
        "id": "A",
        "text": "Caucasus Mountains / കോക്കസസ് പർവതനിരകൾ"
      },
      {
        "id": "B",
        "text": "Ural Mountains / യുറൽ പർവതനിരകൾ"
      },
      {
        "id": "C",
        "text": "Carpathian Mountains / കാർപാത്തിയൻ പർവതനിരകൾ"
      },
      {
        "id": "D",
        "text": "Altai Mountains / അൽതായ് പർവതനിരകൾ"
      }
    ],
    "correctOptionId": "B",
    "explanation": "The Urals run north-south through Russia as its continental divide. / യുറൽ പർവതനിരകൾ റഷ്യയിലൂടെ വടക്ക്-തെക്ക് ദിശയിൽ ഒരു ഭൂഖണ്ഡാന്തര വിഭജനമായി നിലകൊള്ളുന്നു.",
    "category": "Geography",
    "difficulty": "easy",
    "points": 1,
    "createdAt": "2026-10-31T04:10:14.188Z"
  },
  {
    "id": "q-1793419814188-11-tgpc",
    "text": "What is the highest peak in the continent of North America, located in the Alaska Range?",
    "options": [
      {
        "id": "A",
        "text": "Mount Logan / ലോഗൻ പർവതം"
      },
      {
        "id": "B",
        "text": "Mount Mitchell / മിച്ചൽ പർവതം"
      },
      {
        "id": "C",
        "text": "Mount Denali / ഡെനാലി പർവതം"
      },
      {
        "id": "D",
        "text": "Mount Whitney / വിറ്റ്നി പർവതം"
      }
    ],
    "correctOptionId": "C",
    "explanation": "Denali (formerly Mt. McKinley) is the highest peak in North America. / ഡെനാലി (പഴയ പേര് മൗണ്ട് മക്കിൻലി) വടക്കേ അമേരിക്കയിലെ ഏറ്റവും ഉയർന്ന കൊടുമുടിയാണ്.",
    "category": "Geography",
    "difficulty": "easy",
    "points": 1,
    "createdAt": "2026-10-31T04:10:14.188Z"
  },
  {
    "id": "q-1793419814188-12-b04i",
    "text": "Which prominent plateau is often referred to as the \"Roof of the World\" due to its immense altitude?",
    "options": [
      {
        "id": "A",
        "text": "Deccan Plateau / ഡെക്കാൻ പീഠഭൂമി"
      },
      {
        "id": "B",
        "text": "Anatolian Plateau / അനറ്റോളിയൻ പീഠഭൂമി"
      },
      {
        "id": "C",
        "text": "Tibetan Plateau / ടിബറ്റൻ പീഠഭൂമി"
      },
      {
        "id": "D",
        "text": "Colorado Plateau / കൊളറാഡോ പീഠഭൂമി"
      }
    ],
    "correctOptionId": "C",
    "explanation": "The Tibetan Plateau is the highest and largest plateau in the world. / ലോകത്തിലെ ഏറ്റവും ഉയർന്നതും വലുതുമായ പീഠഭൂമിയാണ് ടിബറ്റൻ പീഠഭൂമി.",
    "category": "Geography",
    "difficulty": "easy",
    "points": 1,
    "createdAt": "2026-10-31T04:10:14.188Z"
  },
  {
    "id": "q-1793419814188-13-i0te",
    "text": "Which volcanic mountain is the highest peak in the continent of Africa?",
    "options": [
      {
        "id": "A",
        "text": "Mount Kenya / കെനിയ പർവതം"
      },
      {
        "id": "B",
        "text": "Mount Kilimanjaro / കിളിമഞ്ചാരോ പർവതം"
      },
      {
        "id": "C",
        "text": "Mount Ruwenzori / റുവൻസോറി പർവതം"
      },
      {
        "id": "D",
        "text": "Mount Elgon / എൽഗൺ പർവതം"
      }
    ],
    "correctOptionId": "B",
    "explanation": "Mt. Kilimanjaro in Tanzania is the tallest free-standing mountain in the world. / ടാൻസാനിയയിലെ കിളിമഞ്ചാരോ ലോകത്തിലെ ഏറ്റവും ഉയർന്ന ഫ്രീ-സ്റ്റാൻഡിങ് പർവതമാണ്.",
    "category": "Geography",
    "difficulty": "easy",
    "points": 1,
    "createdAt": "2026-10-31T04:10:14.188Z"
  },
  {
    "id": "q-1793419814188-14-5v33",
    "text": "The Southern Alps mountain range is located in which island country?",
    "options": [
      {
        "id": "A",
        "text": "Switzerland / സ്വിറ്റ്സർലൻഡ്"
      },
      {
        "id": "B",
        "text": "New Zealand / ന്യൂസിലൻഡ്"
      },
      {
        "id": "C",
        "text": "Japan / ജപ്പാൻ"
      },
      {
        "id": "D",
        "text": "Iceland / ഐസ്‌ലൻഡ്"
      }
    ],
    "correctOptionId": "B",
    "explanation": "The Southern Alps run through the South Island of New Zealand. / സതേൺ ആൽപ്സ് ന്യൂസിലൻഡിന്റെ സൗത്ത് ഐലൻഡിലൂടെ കടന്നുപോകുന്നു.",
    "category": "Geography",
    "difficulty": "easy",
    "points": 1,
    "createdAt": "2026-10-31T04:10:14.188Z"
  },
  {
    "id": "q-1793419814188-15-7d6g",
    "text": "Which mountain range is the longest continental mountain range in the world, stretching along the west coast of South America?",
    "options": [
      {
        "id": "A",
        "text": "Rocky Mountains / റോക്കി പർവതനിരകൾ"
      },
      {
        "id": "B",
        "text": "Andes Mountains / ആൻഡീസ് പർവതനിരകൾ"
      },
      {
        "id": "C",
        "text": "Cascade Range / കാസ്കേഡ് പർവതനിരകൾ"
      },
      {
        "id": "D",
        "text": "Atlas Mountains / അറ്റ്ലസ് പർവതനിരകൾ"
      }
    ],
    "correctOptionId": "B",
    "explanation": "The Andes stretch over 7,000 kilometers across seven South American countries. / ആൻഡീസ് പർവതനിരകൾ ഏഴ് തെക്കേ അമേരിക്കൻ രാജ്യങ്ങളിലായി 7,000 കിലോമീറ്ററിലധികം നീളുന്നു.",
    "category": "Geography",
    "difficulty": "medium",
    "points": 1,
    "createdAt": "2026-10-31T04:10:14.188Z"
  },
  {
    "id": "q-1793419814188-16-65lf",
    "text": "Mount Kosciuszko is the highest mountain peak situated on which mainland continent?",
    "options": [
      {
        "id": "A",
        "text": "Antarctica / അന്റാർട്ടിക്ക"
      },
      {
        "id": "B",
        "text": "Europe / യൂറോപ്പ്"
      },
      {
        "id": "C",
        "text": "Australia / ഓസ്‌ട്രേലിയ"
      },
      {
        "id": "D",
        "text": "South America / തെക്കേ അമേരിക്ക"
      }
    ],
    "correctOptionId": "C",
    "explanation": "It is the highest peak on the Australian mainland. / ഇത് ഓസ്‌ട്രേലിയൻ വൻകരയിലെ ഏറ്റവും ഉയർന്ന കൊടുമുടിയാണ്.",
    "category": "Geography",
    "difficulty": "easy",
    "points": 1,
    "createdAt": "2026-10-31T04:10:14.188Z"
  },
  {
    "id": "q-1793419814188-17-r5e6",
    "text": "Which mountain range separates the Iberian Peninsula from the rest of mainland Europe?",
    "options": [
      {
        "id": "A",
        "text": "Apennines / അപെനൈൻസ്"
      },
      {
        "id": "B",
        "text": "Pyrenees / പിരണീസ്"
      },
      {
        "id": "C",
        "text": "Alps / ആൽപ്സ്"
      },
      {
        "id": "D",
        "text": "Balkans / ബാൽക്കൻസ്"
      }
    ],
    "correctOptionId": "B",
    "explanation": "The Pyrenees form a natural border between France and Spain. / പിരണീസ് ഫ്രാൻസിനും സ്പെയിനിനും ഇടയിൽ ഒരു സ്വാഭാവിക അതിർത്തി തീർക്കുന്നു.",
    "category": "Geography",
    "difficulty": "easy",
    "points": 1,
    "createdAt": "2026-10-31T04:10:14.188Z"
  },
  {
    "id": "q-1793419814188-18-5g24",
    "text": "What is the highest peak in the Western Hemisphere, located in the Andes range of Argentina?",
    "options": [
      {
        "id": "A",
        "text": "Mount Vinson / വിൻസൺ പർവതം"
      },
      {
        "id": "B",
        "text": "Mount Aconcagua / അക്കോൺകാഗ്വ പർവതം"
      },
      {
        "id": "C",
        "text": "Chimborazo / ചിംബൊരാസോ"
      },
      {
        "id": "D",
        "text": "Cotopaxi / കോട്ടോപാക്സി"
      }
    ],
    "correctOptionId": "B",
    "explanation": "Aconcagua is the highest point outside of Asia. / ഏഷ്യക്ക് വെളിയിലുള്ള ഏറ്റവും ഉയർന്ന കൊടുമുടിയാണ് അക്കോൺകാഗ്വ.",
    "category": "Geography",
    "difficulty": "medium",
    "points": 1,
    "createdAt": "2026-10-31T04:10:14.188Z"
  },
  {
    "id": "q-1793419814188-19-uncn",
    "text": "The Great Dividing Range is a major geographic feature located in which country?",
    "options": [
      {
        "id": "A",
        "text": "Canada / കാനഡ"
      },
      {
        "id": "B",
        "text": "South Africa / ദക്ഷിണാഫ്രിക്ക"
      },
      {
        "id": "C",
        "text": "Australia / ഓസ്‌ട്രേലിയ"
      },
      {
        "id": "D",
        "text": "China / ചൈന"
      }
    ],
    "correctOptionId": "C",
    "explanation": "It is Australia's most substantial mountain range, running parallel to the east coast. / ഇത് ഓസ്‌ട്രേലിയയുടെ കിഴക്കൻ തീരത്തിന് സമാന്തരമായി സ്ഥിതി ചെയ്യുന്ന പ്രധാന മലനിരയാണ്.",
    "category": "Geography",
    "difficulty": "easy",
    "points": 1,
    "createdAt": "2026-10-31T04:10:14.188Z"
  },
  {
    "id": "q-1793419814188-20-8wx8",
    "text": "Which lake is the world's deepest and oldest freshwater lake, containing about 20% of Earth's unfrozen surface fresh water?",
    "options": [
      {
        "id": "A",
        "text": "Lake Superior / സുപ്പീരിയർ തടാകം"
      },
      {
        "id": "B",
        "text": "Lake Victoria / വിക്ടോറിയ തടാകം"
      },
      {
        "id": "C",
        "text": "Lake Baikal / ബൈക്കൽ തടാകം"
      },
      {
        "id": "D",
        "text": "Lake Tanganyika / ടാംഗനിക്ക തടാകം"
      }
    ],
    "correctOptionId": "C",
    "explanation": "Lake Baikal is located in Siberia, Russia. / ബൈക്കൽ തടാകം റഷ്യയിലെ സൈബീരിയയിലാണ് സ്ഥിതി ചെയ്യുന്നത്.",
    "category": "Geography",
    "difficulty": "medium",
    "points": 1,
    "createdAt": "2026-10-31T04:10:14.188Z"
  },
  {
    "id": "q-1793419814188-21-o1o3",
    "text": "Which river flows through northeastern Africa and is traditionally recognized as the longest river in the world?",
    "options": [
      {
        "id": "A",
        "text": "Amazon River / ആമസോൺ നദി"
      },
      {
        "id": "B",
        "text": "Nile River / നൈൽ നദി"
      },
      {
        "id": "C",
        "text": "Yangtze River / യാങ്‌സി നദി"
      },
      {
        "id": "D",
        "text": "Congo River / കോംഗോ നദി"
      }
    ],
    "correctOptionId": "B",
    "explanation": "The Nile flows northwards into the Mediterranean Sea. / നൈൽ നദി വടക്കോട്ട് ഒഴുകി മെഡിറ്ററേനിയൻ കടലിൽ പതിക്കുന്നു.",
    "category": "Geography",
    "difficulty": "easy",
    "points": 1,
    "createdAt": "2026-10-31T04:10:14.188Z"
  },
  {
    "id": "q-1793419814188-22-v7hv",
    "text": "By water volume discharge, which river is the largest river in the world?",
    "options": [
      {
        "id": "A",
        "text": "Mississippi River / മിസിസിപ്പി നദി"
      },
      {
        "id": "B",
        "text": "Nile River / നൈൽ നദി"
      },
      {
        "id": "C",
        "text": "Amazon River / ആമസോൺ നദി"
      },
      {
        "id": "D",
        "text": "Yenisei River / യെനിസെയ് നദി"
      }
    ],
    "correctOptionId": "C",
    "explanation": "The Amazon carries more water than the next seven largest rivers combined. / ആമസോൺ നദി അടുത്ത 7 വലിയ നദികൾ ചേർന്നതിനേക്കാൾ കൂടുതൽ ജലം വഹിക്കുന്നു.",
    "category": "Geography",
    "difficulty": "easy",
    "points": 1,
    "createdAt": "2026-10-31T04:10:14.188Z"
  },
  {
    "id": "q-1793419814188-23-jfpg",
    "text": "Which massive landlocked body of water is classified as the world's largest lake or inland sea?",
    "options": [
      {
        "id": "A",
        "text": "Caspian Sea / കാസ്പിയൻ കടൽ"
      },
      {
        "id": "B",
        "text": "Aral Sea / ആറൽ കടൽ"
      },
      {
        "id": "C",
        "text": "Dead Sea / ചത്ത കടൽ (ഡെഡ് സീ)"
      },
      {
        "id": "D",
        "text": "Lake Huron / ഹ്യൂറോൺ തടാകം"
      }
    ],
    "correctOptionId": "A",
    "explanation": "The Caspian Sea sits between Europe and Asia. / കാസ്പിയൻ കടൽ യൂറോപ്പിനും ഏഷ്യക്കും ഇടയിലാണ് സ്ഥിതി ചെയ്യുന്നത്.",
    "category": "Geography",
    "difficulty": "easy",
    "points": 1,
    "createdAt": "2026-10-31T04:10:14.188Z"
  },
  {
    "id": "q-1793419814188-24-dd8x",
    "text": "Which river is the longest completely within Europe, emptying into the Caspian Sea?",
    "options": [
      {
        "id": "A",
        "text": "Danube River / ഡാന്യൂബ് നദി"
      },
      {
        "id": "B",
        "text": "Volga River / വോൾഗ നദി"
      },
      {
        "id": "C",
        "text": "Rhine River / റൈൻ നദി"
      },
      {
        "id": "D",
        "text": "Dnieper River / ഡിനൈപ്പർ നദി"
      }
    ],
    "correctOptionId": "B",
    "explanation": "The Volga is Russia's national river and Europe's longest. / വോൾഗ റഷ്യയുടെ ദേശീയ നദിയും യൂറോപ്പിലെ ഏറ്റവും നീളം കൂടിയ നദിയുമാണ്.",
    "category": "Geography",
    "difficulty": "easy",
    "points": 1,
    "createdAt": "2026-10-31T04:10:14.188Z"
  },
  {
    "id": "q-1793419814188-25-3eu2",
    "text": "Which lake is the largest tropical lake in the world and the main reservoir of the Nile River?",
    "options": [
      {
        "id": "A",
        "text": "Lake Chad / ചാഡ് തടാകം"
      },
      {
        "id": "B",
        "text": "Lake Victoria / വിക്ടോറിയ തടാകം"
      },
      {
        "id": "C",
        "text": "Lake Malawi / മലാവി തടാകം"
      },
      {
        "id": "D",
        "text": "Lake Titicaca / ടിറ്റിക്കാക്ക തടാകം"
      }
    ],
    "correctOptionId": "B",
    "explanation": "Lake Victoria is bounded by Uganda, Kenya, and Tanzania. / വിക്ടോറിയ തടാകം ഉഗാണ്ട, കെനിയ, ടാൻസാനിയ എന്നീ രാജ്യങ്ങളാൽ ചുറ്റപ്പെട്ടിരിക്കുന്നു.",
    "category": "Geography",
    "difficulty": "medium",
    "points": 1,
    "createdAt": "2026-10-31T04:10:14.188Z"
  },
  {
    "id": "q-1793419814188-26-dnw8",
    "text": "The dynamic three-step seasonal reversal of river flow occurs between the Mekong River and which Cambodian lake?",
    "options": [
      {
        "id": "A",
        "text": "Tonle Sap / ടോൺലെ സാപ്"
      },
      {
        "id": "B",
        "text": "Lake Maracaibo / മരക്കൈബോ തടാകം"
      },
      {
        "id": "C",
        "text": "Lake Toba / തോബ തടാകം"
      },
      {
        "id": "D",
        "text": "Inle Lake / ഇൻലെ തടാകം"
      }
    ],
    "correctOptionId": "A",
    "explanation": "Tonle Sap changes its flow direction twice a year based on monsoon seasons. / ടോൺലെ സാപ് തടാകം മൺസൂൺ അനുസരിച്ച് വർഷത്തിൽ രണ്ടുതവണ ഒഴുക്കിന്റെ ദിശ മാറ്റുന്നു.",
    "category": "Geography",
    "difficulty": "hard",
    "points": 1,
    "createdAt": "2026-10-31T04:10:14.188Z"
  },
  {
    "id": "q-1793419814188-27-raui",
    "text": "Which river is known as the \"Yellow River\" due to the large amounts of loess sediment it carries?",
    "options": [
      {
        "id": "A",
        "text": "Yangtze River / യാങ്‌സി നദി"
      },
      {
        "id": "B",
        "text": "Pearl River / പേൾ നദി"
      },
      {
        "id": "C",
        "text": "Huang He / ഹുവാങ് ഹെ"
      },
      {
        "id": "D",
        "text": "Mekong River / മേകോങ് നദി"
      }
    ],
    "correctOptionId": "C",
    "explanation": "Huang He is China's second-longest river. / ഹുവാങ് ഹെ ചൈനയിലെ രണ്ടാമത്തെ ഏറ്റവും നീളം കൂടിയ നദിയാണ്.",
    "category": "Geography",
    "difficulty": "medium",
    "points": 1,
    "createdAt": "2026-10-31T04:10:14.188Z"
  },
  {
    "id": "q-1793419814188-28-ehan",
    "text": "Which river is the longest river in Southeast Asia, flowing through six countries before entering the South China Sea?",
    "options": [
      {
        "id": "A",
        "text": "Irrawaddy River / ഇരാവതി നദി"
      },
      {
        "id": "B",
        "text": "Salween River / സാൽവീൻ നദി"
      },
      {
        "id": "C",
        "text": "Mekong River / മേകോങ് നദി"
      },
      {
        "id": "D",
        "text": "Chao Phraya River / ചാവോ ഫ്രായ നദി"
      }
    ],
    "correctOptionId": "C",
    "explanation": "The Mekong is crucial for regional agriculture and fishing. / മേകോങ് നദി ആ പ്രദേശത്തെ കാർഷിക മേഖലയ്ക്കും മത്സ്യബന്ധനത്തിനും അത്യാവശ്യമാണ്.",
    "category": "Geography",
    "difficulty": "medium",
    "points": 1,
    "createdAt": "2026-10-31T04:10:14.188Z"
  },
  {
    "id": "q-1793419814188-29-5lan",
    "text": "Which river cuts through the Grand Canyon in the United States?",
    "options": [
      {
        "id": "A",
        "text": "Missouri River / മിസൗറി നദി"
      },
      {
        "id": "B",
        "text": "Columbia River / കൊളംബിയ നദി"
      },
      {
        "id": "C",
        "text": "Colorado River / കൊളറാഡോ നദി"
      },
      {
        "id": "D",
        "text": "Rio Grande / റിയോ ഗ്രാൻഡെ"
      }
    ],
    "correctOptionId": "C",
    "explanation": "The Colorado River carved the steep canyon over millions of years. / കൊളറാഡോ നദിയാണ് ദശലക്ഷക്കണക്കിന് വർഷങ്ങൾ കൊണ്ട് ഈ താഴ്‌വര രൂപപ്പെടുത്തിയത്.",
    "category": "Geography",
    "difficulty": "easy",
    "points": 1,
    "createdAt": "2026-10-31T04:10:14.188Z"
  },
  {
    "id": "q-1793419814188-30-8z3o",
    "text": "Which hyper-arid coastal desert in South America is widely considered the driest non-polar place on Earth?",
    "options": [
      {
        "id": "A",
        "text": "Patagonian Desert / പറ്റഗോണിയൻ മരുഭൂമി"
      },
      {
        "id": "B",
        "text": "Atacama Desert / അറ്റകാമ മരുഭൂമി"
      },
      {
        "id": "C",
        "text": "Sechura Desert / സെച്ചുറ മരുഭൂമി"
      },
      {
        "id": "D",
        "text": "Sonoran Desert / സൊനോരൻ മരുഭൂമി"
      }
    ],
    "correctOptionId": "B",
    "explanation": "The Atacama occupies a strip of land on the Pacific coast of Chile. / അറ്റകാമ ചിലിയുടെ പസഫിക് തീരത്താണ് സ്ഥിതി ചെയ്യുന്നത്.",
    "category": "Geography",
    "difficulty": "medium",
    "points": 1,
    "createdAt": "2026-10-31T04:10:14.188Z"
  },
  {
    "id": "q-1793419814188-31-dzvf",
    "text": "The vast temperate grasslands covering Eastern Europe and Central Asia are known by what geographic term?",
    "options": [
      {
        "id": "A",
        "text": "Prairies / പ്രയറികൾ"
      },
      {
        "id": "B",
        "text": "Steppes / സ്റ്റെപ്പികൾ"
      },
      {
        "id": "C",
        "text": "Pampas / പമ്പാസ്"
      },
      {
        "id": "D",
        "text": "Savannas / സവാനകൾ"
      }
    ],
    "correctOptionId": "B",
    "explanation": "Steppes stretch from Ukraine all the way through Siberia. / സ്റ്റെപ്പികൾ ഉക്രെയ്ൻ മുതൽ സൈബീരിയ വരെ നീണ്ടുകിടക്കുന്നു.",
    "category": "Geography",
    "difficulty": "medium",
    "points": 1,
    "createdAt": "2026-10-31T04:10:14.188Z"
  },
  {
    "id": "q-1793419814188-32-k6qx",
    "text": "Which large, cold desert basin is situated in northern China and southern Mongolia?",
    "options": [
      {
        "id": "A",
        "text": "Taklamakan Desert / തക്ലമക്കാൻ മരുഭൂമി"
      },
      {
        "id": "B",
        "text": "Gobi Desert / ഗോബി മരുഭൂമി"
      },
      {
        "id": "C",
        "text": "Thar Desert / ഥാർ മരുഭൂമി"
      },
      {
        "id": "D",
        "text": "Kyzylkum Desert / കിസിൽകും മരുഭൂമി"
      }
    ],
    "correctOptionId": "B",
    "explanation": "The Gobi Desert is noted for its dunes, mountains, and rare animals. / മൺകൂനകൾക്കും മലകൾക്കും അപൂർവ മൃഗങ്ങൾക്കും പേരുകേട്ടതാണ് ഗോബി മരുഭൂമി.",
    "category": "Geography",
    "difficulty": "medium",
    "points": 1,
    "createdAt": "2026-10-31T04:10:14.188Z"
  },
  {
    "id": "q-1793419814188-33-p8gl",
    "text": "What term is used to describe the fertile temperate grasslands predominantly found in Argentina and Uruguay?",
    "options": [
      {
        "id": "A",
        "text": "Llanos / ലാനോസ്"
      },
      {
        "id": "B",
        "text": "Cerrado / സെറാഡോ"
      },
      {
        "id": "C",
        "text": "Pampas / പമ്പാസ്"
      },
      {
        "id": "D",
        "text": "Downs / ഡൗൺസ്"
      }
    ],
    "correctOptionId": "C",
    "explanation": "The Pampas have an ideal climate for agriculture and cattle raising. / കൃഷിക്കും കന്നുകാലി വളർത്തലിനും അനുയോജ്യമായ കാലാവസ്ഥയാണ് പമ്പാസിലുള്ളത്.",
    "category": "Geography",
    "difficulty": "easy",
    "points": 1,
    "createdAt": "2026-10-31T04:10:14.188Z"
  },
  {
    "id": "q-1793419814188-34-0prn",
    "text": "The Rub' al Khali, or \"Empty Quarter,\" is the world's largest continuous sand desert, located on which peninsula?",
    "options": [
      {
        "id": "A",
        "text": "Iberian Peninsula / ഐബീരിയൻ ഉപദ്വീപ്"
      },
      {
        "id": "B",
        "text": "Arabian Peninsula / അറേബ്യൻ ഉപദ്വീപ്"
      },
      {
        "id": "C",
        "text": "Balkan Peninsula / ബാൽക്കൻ ഉപദ്വീപ്"
      },
      {
        "id": "D",
        "text": "Sinai Peninsula / സിനായ് ഉപദ്വീപ്"
      }
    ],
    "correctOptionId": "B",
    "explanation": "It covers much of the southern third of the Arabian Peninsula. / ഇത് അറേബ്യൻ ഉപദ്വീപിന്റെ തെക്കൻ ഭാഗത്തിന്റെ ഭൂരിഭാഗവും ഉൾക്കൊള്ളുന്നു.",
    "category": "Geography",
    "difficulty": "medium",
    "points": 1,
    "createdAt": "2026-10-31T04:10:14.188Z"
  },
  {
    "id": "q-1793419814188-35-7cl2",
    "text": "What are the tropical grasslands of the Orinoco River basin in Colombia and Venezuela called?",
    "options": [
      {
        "id": "A",
        "text": "Pampas / പമ്പാസ്"
      },
      {
        "id": "B",
        "text": "Llanos / ലാനോസ്"
      },
      {
        "id": "C",
        "text": "Veld / വെൽഡ്"
      },
      {
        "id": "D",
        "text": "Puszta / പുസ്ത"
      }
    ],
    "correctOptionId": "B",
    "explanation": "The Llanos experience severe seasonal flooding and droughts. / ലാനോസ് പ്രദേശങ്ങളിൽ കടുത്ത പ്രളയവും വരൾച്ചയും മാറിമാറി വരാറുണ്ട്.",
    "category": "Geography",
    "difficulty": "medium",
    "points": 1,
    "createdAt": "2026-10-31T04:10:14.188Z"
  },
  {
    "id": "q-1793419814188-36-x465",
    "text": "The Namib Desert is a coastal desert located along the Atlantic coast of which continent?",
    "options": [
      {
        "id": "A",
        "text": "Australia / ഓസ്‌ട്രേലിയ"
      },
      {
        "id": "B",
        "text": "Africa / ആഫ്രിക്ക"
      },
      {
        "id": "C",
        "text": "South America / തെക്കേ അമേരിക്ക"
      },
      {
        "id": "D",
        "text": "Asia / ഏഷ്യ"
      }
    ],
    "correctOptionId": "B",
    "explanation": "It features some of the highest sand dunes in the world. / ലോകത്തിലെ ഏറ്റവും ഉയർന്ന മൺകൂനകളിൽ ചിലത് ഇവിടെയാണുള്ളത്.",
    "category": "Geography",
    "difficulty": "easy",
    "points": 1,
    "createdAt": "2026-10-31T04:10:14.188Z"
  },
  {
    "id": "q-1793419814188-37-29f0",
    "text": "The open, interior plateau grasslands of South Africa are known by which names?",
    "options": [
      {
        "id": "A",
        "text": "Prairies / പ്രയറികൾ"
      },
      {
        "id": "B",
        "text": "Veld / വെൽഡ്"
      },
      {
        "id": "C",
        "text": "Steppes / സ്റ്റെപ്പികൾ"
      },
      {
        "id": "D",
        "text": "Downs / ഡൗൺസ്"
      }
    ],
    "correctOptionId": "B",
    "explanation": "Veld is a Dutch/Afrikaans word for \"field.\" / 'വെൽഡ്' എന്നാൽ ഡച്ച്/ആഫ്രിക്കാൻസ് ഭാഷകളിൽ 'വയൽ' എന്നാണ് അർത്ഥം.",
    "category": "Geography",
    "difficulty": "medium",
    "points": 1,
    "createdAt": "2026-10-31T04:10:14.188Z"
  }
];

export const INITIAL_QUIZZES: Quiz[] = [
  {
    "id": "quiz-1793419841941",
    "title": "UX35_GEO_GIANT",
    "description": "Assessment containing 38 questions.",
    "category": "General",
    "accessCode": "QZ-355",
    "questionIds": [
      "q-1793419814188-0-lad5",
      "q-1793419814188-1-ld3r",
      "q-1793419814188-2-wkjy",
      "q-1793419814188-3-7twa",
      "q-1793419814188-4-0tvk",
      "q-1793419814188-5-0toj",
      "q-1793419814188-6-2css",
      "q-1793419814188-7-e6ft",
      "q-1793419814188-8-l0me",
      "q-1793419814188-9-6z6a",
      "q-1793419814188-10-ilc8",
      "q-1793419814188-11-tgpc",
      "q-1793419814188-12-b04i",
      "q-1793419814188-13-i0te",
      "q-1793419814188-14-5v33",
      "q-1793419814188-15-7d6g",
      "q-1793419814188-16-65lf",
      "q-1793419814188-17-r5e6",
      "q-1793419814188-18-5g24",
      "q-1793419814188-19-uncn",
      "q-1793419814188-20-8wx8",
      "q-1793419814188-21-o1o3",
      "q-1793419814188-22-v7hv",
      "q-1793419814188-23-jfpg",
      "q-1793419814188-24-dd8x",
      "q-1793419814188-25-3eu2",
      "q-1793419814188-26-dnw8",
      "q-1793419814188-27-raui",
      "q-1793419814188-28-ehan",
      "q-1793419814188-29-5lan",
      "q-1793419814188-30-8z3o",
      "q-1793419814188-31-dzvf",
      "q-1793419814188-32-k6qx",
      "q-1793419814188-33-p8gl",
      "q-1793419814188-34-0prn",
      "q-1793419814188-35-7cl2",
      "q-1793419814188-36-x465",
      "q-1793419814188-37-29f0"
    ],
    "timeLimitMinutes": 76,
    "passingScorePercent": 70,
    "shuffleQuestions": false,
    "shuffleOptions": false,
    "allowReview": true,
    "status": "active",
    "createdAt": "2026-10-31T04:10:41.941Z",
    "updatedAt": "2026-10-31T04:10:41.941Z"
  }
];

export const INITIAL_SUBMISSIONS: StudentSubmission[] = [
  {
    "id": "sub-01",
    "quizId": "quiz-cs-fundamentals",
    "quizTitle": "Web & Programming Fundamentals",
    "studentName": "Alex Mercer",
    "studentEmailOrId": "alex.m@college.edu",
    "totalQuestions": 6,
    "correctCount": 4,
    "incorrectCount": 2,
    "skippedCount": 0,
    "scorePercent": 67,
    "passed": false,
    "totalTimeSpentSeconds": 312,
    "submittedAt": "2026-10-12T14:22:00Z",
    "attempts": [
      {
        "questionId": "q-cs-01",
        "selectedOptionId": "B",
        "isCorrect": true,
        "timeSpentSeconds": 32
      },
      {
        "questionId": "q-cs-02",
        "selectedOptionId": "A",
        "isCorrect": false,
        "timeSpentSeconds": 68
      },
      {
        "questionId": "q-cs-03",
        "selectedOptionId": "B",
        "isCorrect": true,
        "timeSpentSeconds": 24
      },
      {
        "questionId": "q-cs-04",
        "selectedOptionId": "C",
        "isCorrect": true,
        "timeSpentSeconds": 52
      },
      {
        "questionId": "q-cs-05",
        "selectedOptionId": "B",
        "isCorrect": false,
        "timeSpentSeconds": 76
      },
      {
        "questionId": "q-cs-06",
        "selectedOptionId": "B",
        "isCorrect": true,
        "timeSpentSeconds": 60
      }
    ],
    "studentRegNo": "alex.m@college.edu"
  },
  {
    "id": "sub-02",
    "quizId": "quiz-cs-fundamentals",
    "quizTitle": "Web & Programming Fundamentals",
    "studentName": "Beatriz Chen",
    "studentEmailOrId": "bchen@college.edu",
    "totalQuestions": 6,
    "correctCount": 6,
    "incorrectCount": 0,
    "skippedCount": 0,
    "scorePercent": 100,
    "passed": true,
    "totalTimeSpentSeconds": 245,
    "submittedAt": "2026-10-12T14:45:00Z",
    "attempts": [
      {
        "questionId": "q-cs-01",
        "selectedOptionId": "B",
        "isCorrect": true,
        "timeSpentSeconds": 28
      },
      {
        "questionId": "q-cs-02",
        "selectedOptionId": "C",
        "isCorrect": true,
        "timeSpentSeconds": 42
      },
      {
        "questionId": "q-cs-03",
        "selectedOptionId": "B",
        "isCorrect": true,
        "timeSpentSeconds": 19
      },
      {
        "questionId": "q-cs-04",
        "selectedOptionId": "C",
        "isCorrect": true,
        "timeSpentSeconds": 48
      },
      {
        "questionId": "q-cs-05",
        "selectedOptionId": "A",
        "isCorrect": true,
        "timeSpentSeconds": 51
      },
      {
        "questionId": "q-cs-06",
        "selectedOptionId": "B",
        "isCorrect": true,
        "timeSpentSeconds": 57
      }
    ],
    "studentRegNo": "bchen@college.edu"
  },
  {
    "id": "sub-03",
    "quizId": "quiz-cs-fundamentals",
    "quizTitle": "Web & Programming Fundamentals",
    "studentName": "Carlos Rivera",
    "studentEmailOrId": "carlos.r@college.edu",
    "totalQuestions": 6,
    "correctCount": 3,
    "incorrectCount": 3,
    "skippedCount": 0,
    "scorePercent": 50,
    "passed": false,
    "totalTimeSpentSeconds": 420,
    "submittedAt": "2026-10-12T15:10:00Z",
    "attempts": [
      {
        "questionId": "q-cs-01",
        "selectedOptionId": "A",
        "isCorrect": false,
        "timeSpentSeconds": 65
      },
      {
        "questionId": "q-cs-02",
        "selectedOptionId": "B",
        "isCorrect": false,
        "timeSpentSeconds": 84
      },
      {
        "questionId": "q-cs-03",
        "selectedOptionId": "B",
        "isCorrect": true,
        "timeSpentSeconds": 35
      },
      {
        "questionId": "q-cs-04",
        "selectedOptionId": "B",
        "isCorrect": false,
        "timeSpentSeconds": 98
      },
      {
        "questionId": "q-cs-05",
        "selectedOptionId": "A",
        "isCorrect": true,
        "timeSpentSeconds": 68
      },
      {
        "questionId": "q-cs-06",
        "selectedOptionId": "B",
        "isCorrect": true,
        "timeSpentSeconds": 70
      }
    ],
    "studentRegNo": "carlos.r@college.edu"
  },
  {
    "id": "sub-04",
    "quizId": "quiz-cs-fundamentals",
    "quizTitle": "Web & Programming Fundamentals",
    "studentName": "Daria Petrova",
    "studentEmailOrId": "daria.p@college.edu",
    "totalQuestions": 6,
    "correctCount": 5,
    "incorrectCount": 1,
    "skippedCount": 0,
    "scorePercent": 83,
    "passed": true,
    "totalTimeSpentSeconds": 290,
    "submittedAt": "2026-10-12T15:35:00Z",
    "attempts": [
      {
        "questionId": "q-cs-01",
        "selectedOptionId": "B",
        "isCorrect": true,
        "timeSpentSeconds": 30
      },
      {
        "questionId": "q-cs-02",
        "selectedOptionId": "A",
        "isCorrect": false,
        "timeSpentSeconds": 64
      },
      {
        "questionId": "q-cs-03",
        "selectedOptionId": "B",
        "isCorrect": true,
        "timeSpentSeconds": 22
      },
      {
        "questionId": "q-cs-04",
        "selectedOptionId": "C",
        "isCorrect": true,
        "timeSpentSeconds": 58
      },
      {
        "questionId": "q-cs-05",
        "selectedOptionId": "A",
        "isCorrect": true,
        "timeSpentSeconds": 54
      },
      {
        "questionId": "q-cs-06",
        "selectedOptionId": "B",
        "isCorrect": true,
        "timeSpentSeconds": 62
      }
    ],
    "studentRegNo": "daria.p@college.edu"
  },
  {
    "id": "sub-05",
    "quizId": "quiz-cs-fundamentals",
    "quizTitle": "Web & Programming Fundamentals",
    "studentName": "Evan Patel",
    "studentEmailOrId": "evan.p@college.edu",
    "totalQuestions": 6,
    "correctCount": 4,
    "incorrectCount": 2,
    "skippedCount": 0,
    "scorePercent": 67,
    "passed": false,
    "totalTimeSpentSeconds": 360,
    "submittedAt": "2026-10-13T09:12:00Z",
    "attempts": [
      {
        "questionId": "q-cs-01",
        "selectedOptionId": "A",
        "isCorrect": false,
        "timeSpentSeconds": 55
      },
      {
        "questionId": "q-cs-02",
        "selectedOptionId": "C",
        "isCorrect": true,
        "timeSpentSeconds": 50
      },
      {
        "questionId": "q-cs-03",
        "selectedOptionId": "B",
        "isCorrect": true,
        "timeSpentSeconds": 26
      },
      {
        "questionId": "q-cs-04",
        "selectedOptionId": "D",
        "isCorrect": false,
        "timeSpentSeconds": 88
      },
      {
        "questionId": "q-cs-05",
        "selectedOptionId": "A",
        "isCorrect": true,
        "timeSpentSeconds": 61
      },
      {
        "questionId": "q-cs-06",
        "selectedOptionId": "B",
        "isCorrect": true,
        "timeSpentSeconds": 80
      }
    ],
    "studentRegNo": "evan.p@college.edu"
  },
  {
    "id": "sub-06",
    "quizId": "quiz-cs-fundamentals",
    "quizTitle": "Web & Programming Fundamentals",
    "studentName": "Fatima Al-Mansoor",
    "studentEmailOrId": "fatima.m@college.edu",
    "totalQuestions": 6,
    "correctCount": 5,
    "incorrectCount": 1,
    "skippedCount": 0,
    "scorePercent": 83,
    "passed": true,
    "totalTimeSpentSeconds": 310,
    "submittedAt": "2026-10-13T10:05:00Z",
    "attempts": [
      {
        "questionId": "q-cs-01",
        "selectedOptionId": "B",
        "isCorrect": true,
        "timeSpentSeconds": 34
      },
      {
        "questionId": "q-cs-02",
        "selectedOptionId": "A",
        "isCorrect": false,
        "timeSpentSeconds": 65
      },
      {
        "questionId": "q-cs-03",
        "selectedOptionId": "B",
        "isCorrect": true,
        "timeSpentSeconds": 25
      },
      {
        "questionId": "q-cs-04",
        "selectedOptionId": "C",
        "isCorrect": true,
        "timeSpentSeconds": 60
      },
      {
        "questionId": "q-cs-05",
        "selectedOptionId": "A",
        "isCorrect": true,
        "timeSpentSeconds": 56
      },
      {
        "questionId": "q-cs-06",
        "selectedOptionId": "B",
        "isCorrect": true,
        "timeSpentSeconds": 70
      }
    ],
    "studentRegNo": "fatima.m@college.edu"
  },
  {
    "id": "sub-07",
    "quizId": "quiz-cs-fundamentals",
    "quizTitle": "Web & Programming Fundamentals",
    "studentName": "George Washington K.",
    "studentEmailOrId": "gw.k@college.edu",
    "totalQuestions": 6,
    "correctCount": 3,
    "incorrectCount": 3,
    "skippedCount": 0,
    "scorePercent": 50,
    "passed": false,
    "totalTimeSpentSeconds": 480,
    "submittedAt": "2026-10-13T11:20:00Z",
    "attempts": [
      {
        "questionId": "q-cs-01",
        "selectedOptionId": "D",
        "isCorrect": false,
        "timeSpentSeconds": 75
      },
      {
        "questionId": "q-cs-02",
        "selectedOptionId": "B",
        "isCorrect": false,
        "timeSpentSeconds": 95
      },
      {
        "questionId": "q-cs-03",
        "selectedOptionId": "B",
        "isCorrect": true,
        "timeSpentSeconds": 40
      },
      {
        "questionId": "q-cs-04",
        "selectedOptionId": "C",
        "isCorrect": true,
        "timeSpentSeconds": 110
      },
      {
        "questionId": "q-cs-05",
        "selectedOptionId": "B",
        "isCorrect": false,
        "timeSpentSeconds": 85
      },
      {
        "questionId": "q-cs-06",
        "selectedOptionId": "B",
        "isCorrect": true,
        "timeSpentSeconds": 75
      }
    ],
    "studentRegNo": "gw.k@college.edu"
  },
  {
    "id": "sub-08",
    "quizId": "quiz-cs-fundamentals",
    "quizTitle": "Web & Programming Fundamentals",
    "studentName": "Hannah Lee",
    "studentEmailOrId": "hannah.lee@college.edu",
    "totalQuestions": 6,
    "correctCount": 5,
    "incorrectCount": 1,
    "skippedCount": 0,
    "scorePercent": 83,
    "passed": true,
    "totalTimeSpentSeconds": 260,
    "submittedAt": "2026-10-13T13:00:00Z",
    "attempts": [
      {
        "questionId": "q-cs-01",
        "selectedOptionId": "B",
        "isCorrect": true,
        "timeSpentSeconds": 26
      },
      {
        "questionId": "q-cs-02",
        "selectedOptionId": "A",
        "isCorrect": false,
        "timeSpentSeconds": 52
      },
      {
        "questionId": "q-cs-03",
        "selectedOptionId": "B",
        "isCorrect": true,
        "timeSpentSeconds": 21
      },
      {
        "questionId": "q-cs-04",
        "selectedOptionId": "C",
        "isCorrect": true,
        "timeSpentSeconds": 49
      },
      {
        "questionId": "q-cs-05",
        "selectedOptionId": "A",
        "isCorrect": true,
        "timeSpentSeconds": 50
      },
      {
        "questionId": "q-cs-06",
        "selectedOptionId": "B",
        "isCorrect": true,
        "timeSpentSeconds": 62
      }
    ],
    "studentRegNo": "hannah.lee@college.edu"
  },
  {
    "id": "sub-sim-1793419300806-0-w8qf",
    "quizId": "quiz-cs-fundamentals",
    "quizTitle": "Web & Programming Fundamentals",
    "studentName": "Isabella Jones",
    "studentEmailOrId": "isabella.jones@school.edu",
    "totalQuestions": 6,
    "correctCount": 5,
    "incorrectCount": 1,
    "skippedCount": 0,
    "scorePercent": 83,
    "passed": true,
    "totalTimeSpentSeconds": 183,
    "submittedAt": "2026-10-30T13:59:06.959Z",
    "attempts": [
      {
        "questionId": "q-cs-01",
        "selectedOptionId": "B",
        "isCorrect": true,
        "timeSpentSeconds": 13
      },
      {
        "questionId": "q-cs-02",
        "selectedOptionId": "A",
        "isCorrect": false,
        "timeSpentSeconds": 41
      },
      {
        "questionId": "q-cs-03",
        "selectedOptionId": "B",
        "isCorrect": true,
        "timeSpentSeconds": 13
      },
      {
        "questionId": "q-cs-04",
        "selectedOptionId": "C",
        "isCorrect": true,
        "timeSpentSeconds": 52
      },
      {
        "questionId": "q-cs-05",
        "selectedOptionId": "A",
        "isCorrect": true,
        "timeSpentSeconds": 14
      },
      {
        "questionId": "q-cs-06",
        "selectedOptionId": "B",
        "isCorrect": true,
        "timeSpentSeconds": 50
      }
    ],
    "studentRegNo": "isabella.jones@school.edu"
  },
  {
    "id": "sub-sim-1793419300806-1-z66z",
    "quizId": "quiz-cs-fundamentals",
    "quizTitle": "Web & Programming Fundamentals",
    "studentName": "Henry Lopez",
    "studentEmailOrId": "henry.lopez@school.edu",
    "totalQuestions": 6,
    "correctCount": 6,
    "incorrectCount": 0,
    "skippedCount": 0,
    "scorePercent": 100,
    "passed": true,
    "totalTimeSpentSeconds": 233,
    "submittedAt": "2026-10-31T01:36:04.195Z",
    "attempts": [
      {
        "questionId": "q-cs-01",
        "selectedOptionId": "B",
        "isCorrect": true,
        "timeSpentSeconds": 38
      },
      {
        "questionId": "q-cs-02",
        "selectedOptionId": "C",
        "isCorrect": true,
        "timeSpentSeconds": 49
      },
      {
        "questionId": "q-cs-03",
        "selectedOptionId": "B",
        "isCorrect": true,
        "timeSpentSeconds": 27
      },
      {
        "questionId": "q-cs-04",
        "selectedOptionId": "C",
        "isCorrect": true,
        "timeSpentSeconds": 43
      },
      {
        "questionId": "q-cs-05",
        "selectedOptionId": "A",
        "isCorrect": true,
        "timeSpentSeconds": 38
      },
      {
        "questionId": "q-cs-06",
        "selectedOptionId": "B",
        "isCorrect": true,
        "timeSpentSeconds": 38
      }
    ],
    "studentRegNo": "henry.lopez@school.edu"
  },
  {
    "id": "sub-sim-1793419300806-2-wd9q",
    "quizId": "quiz-cs-fundamentals",
    "quizTitle": "Web & Programming Fundamentals",
    "studentName": "Charlotte Wilson",
    "studentEmailOrId": "charlotte.wilson@school.edu",
    "totalQuestions": 6,
    "correctCount": 6,
    "incorrectCount": 0,
    "skippedCount": 0,
    "scorePercent": 100,
    "passed": true,
    "totalTimeSpentSeconds": 201,
    "submittedAt": "2026-10-29T14:33:39.547Z",
    "attempts": [
      {
        "questionId": "q-cs-01",
        "selectedOptionId": "B",
        "isCorrect": true,
        "timeSpentSeconds": 23
      },
      {
        "questionId": "q-cs-02",
        "selectedOptionId": "C",
        "isCorrect": true,
        "timeSpentSeconds": 37
      },
      {
        "questionId": "q-cs-03",
        "selectedOptionId": "B",
        "isCorrect": true,
        "timeSpentSeconds": 31
      },
      {
        "questionId": "q-cs-04",
        "selectedOptionId": "C",
        "isCorrect": true,
        "timeSpentSeconds": 40
      },
      {
        "questionId": "q-cs-05",
        "selectedOptionId": "A",
        "isCorrect": true,
        "timeSpentSeconds": 26
      },
      {
        "questionId": "q-cs-06",
        "selectedOptionId": "B",
        "isCorrect": true,
        "timeSpentSeconds": 44
      }
    ],
    "studentRegNo": "charlotte.wilson@school.edu"
  },
  {
    "id": "sub-sim-1793419300806-3-s99c",
    "quizId": "quiz-cs-fundamentals",
    "quizTitle": "Web & Programming Fundamentals",
    "studentName": "Liam Williams",
    "studentEmailOrId": "liam.williams@school.edu",
    "totalQuestions": 6,
    "correctCount": 5,
    "incorrectCount": 1,
    "skippedCount": 0,
    "scorePercent": 83,
    "passed": true,
    "totalTimeSpentSeconds": 186,
    "submittedAt": "2026-10-30T19:57:16.404Z",
    "attempts": [
      {
        "questionId": "q-cs-01",
        "selectedOptionId": "B",
        "isCorrect": true,
        "timeSpentSeconds": 24
      },
      {
        "questionId": "q-cs-02",
        "selectedOptionId": "C",
        "isCorrect": true,
        "timeSpentSeconds": 41
      },
      {
        "questionId": "q-cs-03",
        "selectedOptionId": "B",
        "isCorrect": true,
        "timeSpentSeconds": 24
      },
      {
        "questionId": "q-cs-04",
        "selectedOptionId": "C",
        "isCorrect": true,
        "timeSpentSeconds": 54
      },
      {
        "questionId": "q-cs-05",
        "selectedOptionId": "B",
        "isCorrect": false,
        "timeSpentSeconds": 14
      },
      {
        "questionId": "q-cs-06",
        "selectedOptionId": "B",
        "isCorrect": true,
        "timeSpentSeconds": 29
      }
    ],
    "studentRegNo": "liam.williams@school.edu"
  },
  {
    "id": "sub-sim-1793419300806-4-ke6q",
    "quizId": "quiz-cs-fundamentals",
    "quizTitle": "Web & Programming Fundamentals",
    "studentName": "Noah Davis",
    "studentEmailOrId": "noah.davis@school.edu",
    "totalQuestions": 6,
    "correctCount": 1,
    "incorrectCount": 5,
    "skippedCount": 0,
    "scorePercent": 17,
    "passed": false,
    "totalTimeSpentSeconds": 190,
    "submittedAt": "2026-10-28T07:07:03.719Z",
    "attempts": [
      {
        "questionId": "q-cs-01",
        "selectedOptionId": "B",
        "isCorrect": true,
        "timeSpentSeconds": 19
      },
      {
        "questionId": "q-cs-02",
        "selectedOptionId": "B",
        "isCorrect": false,
        "timeSpentSeconds": 48
      },
      {
        "questionId": "q-cs-03",
        "selectedOptionId": "C",
        "isCorrect": false,
        "timeSpentSeconds": 12
      },
      {
        "questionId": "q-cs-04",
        "selectedOptionId": "B",
        "isCorrect": false,
        "timeSpentSeconds": 35
      },
      {
        "questionId": "q-cs-05",
        "selectedOptionId": "D",
        "isCorrect": false,
        "timeSpentSeconds": 32
      },
      {
        "questionId": "q-cs-06",
        "selectedOptionId": "D",
        "isCorrect": false,
        "timeSpentSeconds": 44
      }
    ],
    "studentRegNo": "noah.davis@school.edu"
  },
  {
    "id": "sub-sim-1793419300806-5-6qqm",
    "quizId": "quiz-cs-fundamentals",
    "quizTitle": "Web & Programming Fundamentals",
    "studentName": "Isabella Brown",
    "studentEmailOrId": "isabella.brown@school.edu",
    "totalQuestions": 6,
    "correctCount": 3,
    "incorrectCount": 3,
    "skippedCount": 0,
    "scorePercent": 50,
    "passed": false,
    "totalTimeSpentSeconds": 186,
    "submittedAt": "2026-10-28T20:21:21.124Z",
    "attempts": [
      {
        "questionId": "q-cs-01",
        "selectedOptionId": "B",
        "isCorrect": true,
        "timeSpentSeconds": 11
      },
      {
        "questionId": "q-cs-02",
        "selectedOptionId": "D",
        "isCorrect": false,
        "timeSpentSeconds": 42
      },
      {
        "questionId": "q-cs-03",
        "selectedOptionId": "B",
        "isCorrect": true,
        "timeSpentSeconds": 31
      },
      {
        "questionId": "q-cs-04",
        "selectedOptionId": "B",
        "isCorrect": false,
        "timeSpentSeconds": 26
      },
      {
        "questionId": "q-cs-05",
        "selectedOptionId": "A",
        "isCorrect": true,
        "timeSpentSeconds": 29
      },
      {
        "questionId": "q-cs-06",
        "selectedOptionId": "C",
        "isCorrect": false,
        "timeSpentSeconds": 47
      }
    ],
    "studentRegNo": "isabella.brown@school.edu"
  },
  {
    "id": "sub-sim-1793419300806-6-h3cs",
    "quizId": "quiz-cs-fundamentals",
    "quizTitle": "Web & Programming Fundamentals",
    "studentName": "Noah Wilson",
    "studentEmailOrId": "noah.wilson@school.edu",
    "totalQuestions": 6,
    "correctCount": 4,
    "incorrectCount": 2,
    "skippedCount": 0,
    "scorePercent": 67,
    "passed": false,
    "totalTimeSpentSeconds": 174,
    "submittedAt": "2026-10-29T17:35:57.691Z",
    "attempts": [
      {
        "questionId": "q-cs-01",
        "selectedOptionId": "B",
        "isCorrect": true,
        "timeSpentSeconds": 23
      },
      {
        "questionId": "q-cs-02",
        "selectedOptionId": "C",
        "isCorrect": true,
        "timeSpentSeconds": 40
      },
      {
        "questionId": "q-cs-03",
        "selectedOptionId": "C",
        "isCorrect": false,
        "timeSpentSeconds": 35
      },
      {
        "questionId": "q-cs-04",
        "selectedOptionId": "C",
        "isCorrect": true,
        "timeSpentSeconds": 26
      },
      {
        "questionId": "q-cs-05",
        "selectedOptionId": "D",
        "isCorrect": false,
        "timeSpentSeconds": 17
      },
      {
        "questionId": "q-cs-06",
        "selectedOptionId": "B",
        "isCorrect": true,
        "timeSpentSeconds": 33
      }
    ],
    "studentRegNo": "noah.wilson@school.edu"
  },
  {
    "id": "sub-sim-1793419300806-7-xbsb",
    "quizId": "quiz-cs-fundamentals",
    "quizTitle": "Web & Programming Fundamentals",
    "studentName": "Ethan Smith",
    "studentEmailOrId": "ethan.smith@school.edu",
    "totalQuestions": 6,
    "correctCount": 5,
    "incorrectCount": 1,
    "skippedCount": 0,
    "scorePercent": 83,
    "passed": true,
    "totalTimeSpentSeconds": 166,
    "submittedAt": "2026-10-30T13:03:09.303Z",
    "attempts": [
      {
        "questionId": "q-cs-01",
        "selectedOptionId": "B",
        "isCorrect": true,
        "timeSpentSeconds": 14
      },
      {
        "questionId": "q-cs-02",
        "selectedOptionId": "C",
        "isCorrect": true,
        "timeSpentSeconds": 34
      },
      {
        "questionId": "q-cs-03",
        "selectedOptionId": "B",
        "isCorrect": true,
        "timeSpentSeconds": 26
      },
      {
        "questionId": "q-cs-04",
        "selectedOptionId": "C",
        "isCorrect": true,
        "timeSpentSeconds": 34
      },
      {
        "questionId": "q-cs-05",
        "selectedOptionId": "A",
        "isCorrect": true,
        "timeSpentSeconds": 16
      },
      {
        "questionId": "q-cs-06",
        "selectedOptionId": "C",
        "isCorrect": false,
        "timeSpentSeconds": 42
      }
    ],
    "studentRegNo": "ethan.smith@school.edu"
  },
  {
    "id": "sub-sim-1793419300446-0-j4o2",
    "quizId": "quiz-cs-fundamentals",
    "quizTitle": "Web & Programming Fundamentals",
    "studentName": "Ava Smith",
    "studentEmailOrId": "ava.smith@school.edu",
    "totalQuestions": 6,
    "correctCount": 5,
    "incorrectCount": 1,
    "skippedCount": 0,
    "scorePercent": 83,
    "passed": true,
    "totalTimeSpentSeconds": 183,
    "submittedAt": "2026-10-30T13:27:35.568Z",
    "attempts": [
      {
        "questionId": "q-cs-01",
        "selectedOptionId": "B",
        "isCorrect": true,
        "timeSpentSeconds": 26
      },
      {
        "questionId": "q-cs-02",
        "selectedOptionId": "C",
        "isCorrect": true,
        "timeSpentSeconds": 48
      },
      {
        "questionId": "q-cs-03",
        "selectedOptionId": "B",
        "isCorrect": true,
        "timeSpentSeconds": 12
      },
      {
        "questionId": "q-cs-04",
        "selectedOptionId": "C",
        "isCorrect": true,
        "timeSpentSeconds": 42
      },
      {
        "questionId": "q-cs-05",
        "selectedOptionId": "A",
        "isCorrect": true,
        "timeSpentSeconds": 13
      },
      {
        "questionId": "q-cs-06",
        "selectedOptionId": "C",
        "isCorrect": false,
        "timeSpentSeconds": 42
      }
    ],
    "studentRegNo": "ava.smith@school.edu"
  },
  {
    "id": "sub-sim-1793419300446-1-nuq3",
    "quizId": "quiz-cs-fundamentals",
    "quizTitle": "Web & Programming Fundamentals",
    "studentName": "Mia Williams",
    "studentEmailOrId": "mia.williams@school.edu",
    "totalQuestions": 6,
    "correctCount": 5,
    "incorrectCount": 1,
    "skippedCount": 0,
    "scorePercent": 83,
    "passed": true,
    "totalTimeSpentSeconds": 184,
    "submittedAt": "2026-10-29T01:21:32.496Z",
    "attempts": [
      {
        "questionId": "q-cs-01",
        "selectedOptionId": "C",
        "isCorrect": false,
        "timeSpentSeconds": 34
      },
      {
        "questionId": "q-cs-02",
        "selectedOptionId": "C",
        "isCorrect": true,
        "timeSpentSeconds": 28
      },
      {
        "questionId": "q-cs-03",
        "selectedOptionId": "B",
        "isCorrect": true,
        "timeSpentSeconds": 17
      },
      {
        "questionId": "q-cs-04",
        "selectedOptionId": "C",
        "isCorrect": true,
        "timeSpentSeconds": 36
      },
      {
        "questionId": "q-cs-05",
        "selectedOptionId": "A",
        "isCorrect": true,
        "timeSpentSeconds": 17
      },
      {
        "questionId": "q-cs-06",
        "selectedOptionId": "B",
        "isCorrect": true,
        "timeSpentSeconds": 52
      }
    ],
    "studentRegNo": "mia.williams@school.edu"
  },
  {
    "id": "sub-sim-1793419300446-2-ymdt",
    "quizId": "quiz-cs-fundamentals",
    "quizTitle": "Web & Programming Fundamentals",
    "studentName": "Emma Hernandez",
    "studentEmailOrId": "emma.hernandez@school.edu",
    "totalQuestions": 6,
    "correctCount": 4,
    "incorrectCount": 2,
    "skippedCount": 0,
    "scorePercent": 67,
    "passed": false,
    "totalTimeSpentSeconds": 185,
    "submittedAt": "2026-10-30T12:24:44.650Z",
    "attempts": [
      {
        "questionId": "q-cs-01",
        "selectedOptionId": "D",
        "isCorrect": false,
        "timeSpentSeconds": 20
      },
      {
        "questionId": "q-cs-02",
        "selectedOptionId": "C",
        "isCorrect": true,
        "timeSpentSeconds": 31
      },
      {
        "questionId": "q-cs-03",
        "selectedOptionId": "B",
        "isCorrect": true,
        "timeSpentSeconds": 36
      },
      {
        "questionId": "q-cs-04",
        "selectedOptionId": "D",
        "isCorrect": false,
        "timeSpentSeconds": 34
      },
      {
        "questionId": "q-cs-05",
        "selectedOptionId": "A",
        "isCorrect": true,
        "timeSpentSeconds": 14
      },
      {
        "questionId": "q-cs-06",
        "selectedOptionId": "B",
        "isCorrect": true,
        "timeSpentSeconds": 50
      }
    ],
    "studentRegNo": "emma.hernandez@school.edu"
  },
  {
    "id": "sub-sim-1793419300446-3-a0v4",
    "quizId": "quiz-cs-fundamentals",
    "quizTitle": "Web & Programming Fundamentals",
    "studentName": "Olivia Smith",
    "studentEmailOrId": "olivia.smith@school.edu",
    "totalQuestions": 6,
    "correctCount": 6,
    "incorrectCount": 0,
    "skippedCount": 0,
    "scorePercent": 100,
    "passed": true,
    "totalTimeSpentSeconds": 207,
    "submittedAt": "2026-10-28T16:42:46.717Z",
    "attempts": [
      {
        "questionId": "q-cs-01",
        "selectedOptionId": "B",
        "isCorrect": true,
        "timeSpentSeconds": 30
      },
      {
        "questionId": "q-cs-02",
        "selectedOptionId": "C",
        "isCorrect": true,
        "timeSpentSeconds": 46
      },
      {
        "questionId": "q-cs-03",
        "selectedOptionId": "B",
        "isCorrect": true,
        "timeSpentSeconds": 31
      },
      {
        "questionId": "q-cs-04",
        "selectedOptionId": "C",
        "isCorrect": true,
        "timeSpentSeconds": 53
      },
      {
        "questionId": "q-cs-05",
        "selectedOptionId": "A",
        "isCorrect": true,
        "timeSpentSeconds": 11
      },
      {
        "questionId": "q-cs-06",
        "selectedOptionId": "B",
        "isCorrect": true,
        "timeSpentSeconds": 36
      }
    ],
    "studentRegNo": "olivia.smith@school.edu"
  },
  {
    "id": "sub-sim-1793419300446-4-cgtv",
    "quizId": "quiz-cs-fundamentals",
    "quizTitle": "Web & Programming Fundamentals",
    "studentName": "Sophia Martinez",
    "studentEmailOrId": "sophia.martinez@school.edu",
    "totalQuestions": 6,
    "correctCount": 6,
    "incorrectCount": 0,
    "skippedCount": 0,
    "scorePercent": 100,
    "passed": true,
    "totalTimeSpentSeconds": 209,
    "submittedAt": "2026-10-29T09:35:31.045Z",
    "attempts": [
      {
        "questionId": "q-cs-01",
        "selectedOptionId": "B",
        "isCorrect": true,
        "timeSpentSeconds": 26
      },
      {
        "questionId": "q-cs-02",
        "selectedOptionId": "C",
        "isCorrect": true,
        "timeSpentSeconds": 40
      },
      {
        "questionId": "q-cs-03",
        "selectedOptionId": "B",
        "isCorrect": true,
        "timeSpentSeconds": 31
      },
      {
        "questionId": "q-cs-04",
        "selectedOptionId": "C",
        "isCorrect": true,
        "timeSpentSeconds": 48
      },
      {
        "questionId": "q-cs-05",
        "selectedOptionId": "A",
        "isCorrect": true,
        "timeSpentSeconds": 39
      },
      {
        "questionId": "q-cs-06",
        "selectedOptionId": "B",
        "isCorrect": true,
        "timeSpentSeconds": 25
      }
    ],
    "studentRegNo": "sophia.martinez@school.edu"
  },
  {
    "id": "sub-sim-1793419300446-5-pdpo",
    "quizId": "quiz-cs-fundamentals",
    "quizTitle": "Web & Programming Fundamentals",
    "studentName": "Lucas Martinez",
    "studentEmailOrId": "lucas.martinez@school.edu",
    "totalQuestions": 6,
    "correctCount": 5,
    "incorrectCount": 1,
    "skippedCount": 0,
    "scorePercent": 83,
    "passed": true,
    "totalTimeSpentSeconds": 214,
    "submittedAt": "2026-10-29T04:31:22.134Z",
    "attempts": [
      {
        "questionId": "q-cs-01",
        "selectedOptionId": "B",
        "isCorrect": true,
        "timeSpentSeconds": 24
      },
      {
        "questionId": "q-cs-02",
        "selectedOptionId": "C",
        "isCorrect": true,
        "timeSpentSeconds": 45
      },
      {
        "questionId": "q-cs-03",
        "selectedOptionId": "B",
        "isCorrect": true,
        "timeSpentSeconds": 30
      },
      {
        "questionId": "q-cs-04",
        "selectedOptionId": "A",
        "isCorrect": false,
        "timeSpentSeconds": 53
      },
      {
        "questionId": "q-cs-05",
        "selectedOptionId": "A",
        "isCorrect": true,
        "timeSpentSeconds": 22
      },
      {
        "questionId": "q-cs-06",
        "selectedOptionId": "B",
        "isCorrect": true,
        "timeSpentSeconds": 40
      }
    ],
    "studentRegNo": "lucas.martinez@school.edu"
  },
  {
    "id": "sub-sim-1793419300446-6-5piq",
    "quizId": "quiz-cs-fundamentals",
    "quizTitle": "Web & Programming Fundamentals",
    "studentName": "Charlotte Williams",
    "studentEmailOrId": "charlotte.williams@school.edu",
    "totalQuestions": 6,
    "correctCount": 5,
    "incorrectCount": 1,
    "skippedCount": 0,
    "scorePercent": 83,
    "passed": true,
    "totalTimeSpentSeconds": 153,
    "submittedAt": "2026-10-29T19:24:13.456Z",
    "attempts": [
      {
        "questionId": "q-cs-01",
        "selectedOptionId": "B",
        "isCorrect": true,
        "timeSpentSeconds": 10
      },
      {
        "questionId": "q-cs-02",
        "selectedOptionId": "C",
        "isCorrect": true,
        "timeSpentSeconds": 31
      },
      {
        "questionId": "q-cs-03",
        "selectedOptionId": "B",
        "isCorrect": true,
        "timeSpentSeconds": 11
      },
      {
        "questionId": "q-cs-04",
        "selectedOptionId": "D",
        "isCorrect": false,
        "timeSpentSeconds": 34
      },
      {
        "questionId": "q-cs-05",
        "selectedOptionId": "A",
        "isCorrect": true,
        "timeSpentSeconds": 14
      },
      {
        "questionId": "q-cs-06",
        "selectedOptionId": "B",
        "isCorrect": true,
        "timeSpentSeconds": 53
      }
    ],
    "studentRegNo": "charlotte.williams@school.edu"
  },
  {
    "id": "sub-sim-1793419300446-7-7bx0",
    "quizId": "quiz-cs-fundamentals",
    "quizTitle": "Web & Programming Fundamentals",
    "studentName": "Sophia Martinez",
    "studentEmailOrId": "sophia.martinez@school.edu",
    "totalQuestions": 6,
    "correctCount": 3,
    "incorrectCount": 3,
    "skippedCount": 0,
    "scorePercent": 50,
    "passed": false,
    "totalTimeSpentSeconds": 229,
    "submittedAt": "2026-10-28T19:56:14.655Z",
    "attempts": [
      {
        "questionId": "q-cs-01",
        "selectedOptionId": "B",
        "isCorrect": true,
        "timeSpentSeconds": 25
      },
      {
        "questionId": "q-cs-02",
        "selectedOptionId": "B",
        "isCorrect": false,
        "timeSpentSeconds": 53
      },
      {
        "questionId": "q-cs-03",
        "selectedOptionId": "B",
        "isCorrect": true,
        "timeSpentSeconds": 14
      },
      {
        "questionId": "q-cs-04",
        "selectedOptionId": "B",
        "isCorrect": false,
        "timeSpentSeconds": 52
      },
      {
        "questionId": "q-cs-05",
        "selectedOptionId": "C",
        "isCorrect": false,
        "timeSpentSeconds": 32
      },
      {
        "questionId": "q-cs-06",
        "selectedOptionId": "B",
        "isCorrect": true,
        "timeSpentSeconds": 53
      }
    ],
    "studentRegNo": "sophia.martinez@school.edu"
  },
  {
    "id": "sub-sim-1793419300014-0-eee6",
    "quizId": "quiz-cs-fundamentals",
    "quizTitle": "Web & Programming Fundamentals",
    "studentName": "Henry Johnson",
    "studentEmailOrId": "henry.johnson@school.edu",
    "totalQuestions": 6,
    "correctCount": 6,
    "incorrectCount": 0,
    "skippedCount": 0,
    "scorePercent": 100,
    "passed": true,
    "totalTimeSpentSeconds": 205,
    "submittedAt": "2026-10-30T03:04:34.731Z",
    "attempts": [
      {
        "questionId": "q-cs-01",
        "selectedOptionId": "B",
        "isCorrect": true,
        "timeSpentSeconds": 18
      },
      {
        "questionId": "q-cs-02",
        "selectedOptionId": "C",
        "isCorrect": true,
        "timeSpentSeconds": 46
      },
      {
        "questionId": "q-cs-03",
        "selectedOptionId": "B",
        "isCorrect": true,
        "timeSpentSeconds": 32
      },
      {
        "questionId": "q-cs-04",
        "selectedOptionId": "C",
        "isCorrect": true,
        "timeSpentSeconds": 52
      },
      {
        "questionId": "q-cs-05",
        "selectedOptionId": "A",
        "isCorrect": true,
        "timeSpentSeconds": 27
      },
      {
        "questionId": "q-cs-06",
        "selectedOptionId": "B",
        "isCorrect": true,
        "timeSpentSeconds": 30
      }
    ],
    "studentRegNo": "henry.johnson@school.edu"
  },
  {
    "id": "sub-sim-1793419300014-1-3f8j",
    "quizId": "quiz-cs-fundamentals",
    "quizTitle": "Web & Programming Fundamentals",
    "studentName": "Emma Wilson",
    "studentEmailOrId": "emma.wilson@school.edu",
    "totalQuestions": 6,
    "correctCount": 5,
    "incorrectCount": 1,
    "skippedCount": 0,
    "scorePercent": 83,
    "passed": true,
    "totalTimeSpentSeconds": 208,
    "submittedAt": "2026-10-28T20:59:34.691Z",
    "attempts": [
      {
        "questionId": "q-cs-01",
        "selectedOptionId": "B",
        "isCorrect": true,
        "timeSpentSeconds": 25
      },
      {
        "questionId": "q-cs-02",
        "selectedOptionId": "D",
        "isCorrect": false,
        "timeSpentSeconds": 30
      },
      {
        "questionId": "q-cs-03",
        "selectedOptionId": "B",
        "isCorrect": true,
        "timeSpentSeconds": 39
      },
      {
        "questionId": "q-cs-04",
        "selectedOptionId": "C",
        "isCorrect": true,
        "timeSpentSeconds": 43
      },
      {
        "questionId": "q-cs-05",
        "selectedOptionId": "A",
        "isCorrect": true,
        "timeSpentSeconds": 22
      },
      {
        "questionId": "q-cs-06",
        "selectedOptionId": "B",
        "isCorrect": true,
        "timeSpentSeconds": 49
      }
    ],
    "studentRegNo": "emma.wilson@school.edu"
  },
  {
    "id": "sub-sim-1793419300014-2-48xa",
    "quizId": "quiz-cs-fundamentals",
    "quizTitle": "Web & Programming Fundamentals",
    "studentName": "James Davis",
    "studentEmailOrId": "james.davis@school.edu",
    "totalQuestions": 6,
    "correctCount": 3,
    "incorrectCount": 3,
    "skippedCount": 0,
    "scorePercent": 50,
    "passed": false,
    "totalTimeSpentSeconds": 223,
    "submittedAt": "2026-10-28T12:26:14.632Z",
    "attempts": [
      {
        "questionId": "q-cs-01",
        "selectedOptionId": "A",
        "isCorrect": false,
        "timeSpentSeconds": 36
      },
      {
        "questionId": "q-cs-02",
        "selectedOptionId": "A",
        "isCorrect": false,
        "timeSpentSeconds": 38
      },
      {
        "questionId": "q-cs-03",
        "selectedOptionId": "B",
        "isCorrect": true,
        "timeSpentSeconds": 33
      },
      {
        "questionId": "q-cs-04",
        "selectedOptionId": "C",
        "isCorrect": true,
        "timeSpentSeconds": 44
      },
      {
        "questionId": "q-cs-05",
        "selectedOptionId": "A",
        "isCorrect": true,
        "timeSpentSeconds": 19
      },
      {
        "questionId": "q-cs-06",
        "selectedOptionId": "C",
        "isCorrect": false,
        "timeSpentSeconds": 53
      }
    ],
    "studentRegNo": "james.davis@school.edu"
  },
  {
    "id": "sub-sim-1793419300014-3-0eaa",
    "quizId": "quiz-cs-fundamentals",
    "quizTitle": "Web & Programming Fundamentals",
    "studentName": "Emma Brown",
    "studentEmailOrId": "emma.brown@school.edu",
    "totalQuestions": 6,
    "correctCount": 5,
    "incorrectCount": 1,
    "skippedCount": 0,
    "scorePercent": 83,
    "passed": true,
    "totalTimeSpentSeconds": 194,
    "submittedAt": "2026-10-31T02:45:56.569Z",
    "attempts": [
      {
        "questionId": "q-cs-01",
        "selectedOptionId": "B",
        "isCorrect": true,
        "timeSpentSeconds": 28
      },
      {
        "questionId": "q-cs-02",
        "selectedOptionId": "D",
        "isCorrect": false,
        "timeSpentSeconds": 32
      },
      {
        "questionId": "q-cs-03",
        "selectedOptionId": "B",
        "isCorrect": true,
        "timeSpentSeconds": 36
      },
      {
        "questionId": "q-cs-04",
        "selectedOptionId": "C",
        "isCorrect": true,
        "timeSpentSeconds": 40
      },
      {
        "questionId": "q-cs-05",
        "selectedOptionId": "A",
        "isCorrect": true,
        "timeSpentSeconds": 16
      },
      {
        "questionId": "q-cs-06",
        "selectedOptionId": "B",
        "isCorrect": true,
        "timeSpentSeconds": 42
      }
    ],
    "studentRegNo": "emma.brown@school.edu"
  },
  {
    "id": "sub-sim-1793419300014-4-vpgu",
    "quizId": "quiz-cs-fundamentals",
    "quizTitle": "Web & Programming Fundamentals",
    "studentName": "Sophia Hernandez",
    "studentEmailOrId": "sophia.hernandez@school.edu",
    "totalQuestions": 6,
    "correctCount": 5,
    "incorrectCount": 1,
    "skippedCount": 0,
    "scorePercent": 83,
    "passed": true,
    "totalTimeSpentSeconds": 195,
    "submittedAt": "2026-10-29T21:37:05.881Z",
    "attempts": [
      {
        "questionId": "q-cs-01",
        "selectedOptionId": "B",
        "isCorrect": true,
        "timeSpentSeconds": 39
      },
      {
        "questionId": "q-cs-02",
        "selectedOptionId": "C",
        "isCorrect": true,
        "timeSpentSeconds": 37
      },
      {
        "questionId": "q-cs-03",
        "selectedOptionId": "B",
        "isCorrect": true,
        "timeSpentSeconds": 23
      },
      {
        "questionId": "q-cs-04",
        "selectedOptionId": "C",
        "isCorrect": true,
        "timeSpentSeconds": 39
      },
      {
        "questionId": "q-cs-05",
        "selectedOptionId": "A",
        "isCorrect": true,
        "timeSpentSeconds": 18
      },
      {
        "questionId": "q-cs-06",
        "selectedOptionId": "A",
        "isCorrect": false,
        "timeSpentSeconds": 39
      }
    ],
    "studentRegNo": "sophia.hernandez@school.edu"
  },
  {
    "id": "sub-sim-1793419300014-5-dpox",
    "quizId": "quiz-cs-fundamentals",
    "quizTitle": "Web & Programming Fundamentals",
    "studentName": "Lucas Garcia",
    "studentEmailOrId": "lucas.garcia@school.edu",
    "totalQuestions": 6,
    "correctCount": 4,
    "incorrectCount": 2,
    "skippedCount": 0,
    "scorePercent": 67,
    "passed": false,
    "totalTimeSpentSeconds": 194,
    "submittedAt": "2026-10-28T17:59:20.189Z",
    "attempts": [
      {
        "questionId": "q-cs-01",
        "selectedOptionId": "D",
        "isCorrect": false,
        "timeSpentSeconds": 13
      },
      {
        "questionId": "q-cs-02",
        "selectedOptionId": "A",
        "isCorrect": false,
        "timeSpentSeconds": 46
      },
      {
        "questionId": "q-cs-03",
        "selectedOptionId": "B",
        "isCorrect": true,
        "timeSpentSeconds": 25
      },
      {
        "questionId": "q-cs-04",
        "selectedOptionId": "C",
        "isCorrect": true,
        "timeSpentSeconds": 47
      },
      {
        "questionId": "q-cs-05",
        "selectedOptionId": "A",
        "isCorrect": true,
        "timeSpentSeconds": 18
      },
      {
        "questionId": "q-cs-06",
        "selectedOptionId": "B",
        "isCorrect": true,
        "timeSpentSeconds": 45
      }
    ],
    "studentRegNo": "lucas.garcia@school.edu"
  },
  {
    "id": "sub-sim-1793419300014-6-e1cz",
    "quizId": "quiz-cs-fundamentals",
    "quizTitle": "Web & Programming Fundamentals",
    "studentName": "Mia Miller",
    "studentEmailOrId": "mia.miller@school.edu",
    "totalQuestions": 6,
    "correctCount": 5,
    "incorrectCount": 1,
    "skippedCount": 0,
    "scorePercent": 83,
    "passed": true,
    "totalTimeSpentSeconds": 167,
    "submittedAt": "2026-10-30T02:33:11.451Z",
    "attempts": [
      {
        "questionId": "q-cs-01",
        "selectedOptionId": "B",
        "isCorrect": true,
        "timeSpentSeconds": 14
      },
      {
        "questionId": "q-cs-02",
        "selectedOptionId": "C",
        "isCorrect": true,
        "timeSpentSeconds": 28
      },
      {
        "questionId": "q-cs-03",
        "selectedOptionId": "B",
        "isCorrect": true,
        "timeSpentSeconds": 20
      },
      {
        "questionId": "q-cs-04",
        "selectedOptionId": "C",
        "isCorrect": true,
        "timeSpentSeconds": 43
      },
      {
        "questionId": "q-cs-05",
        "selectedOptionId": "A",
        "isCorrect": true,
        "timeSpentSeconds": 11
      },
      {
        "questionId": "q-cs-06",
        "selectedOptionId": "A",
        "isCorrect": false,
        "timeSpentSeconds": 51
      }
    ],
    "studentRegNo": "mia.miller@school.edu"
  },
  {
    "id": "sub-sim-1793419300014-7-x1l6",
    "quizId": "quiz-cs-fundamentals",
    "quizTitle": "Web & Programming Fundamentals",
    "studentName": "Ethan Johnson",
    "studentEmailOrId": "ethan.johnson@school.edu",
    "totalQuestions": 6,
    "correctCount": 2,
    "incorrectCount": 4,
    "skippedCount": 0,
    "scorePercent": 33,
    "passed": false,
    "totalTimeSpentSeconds": 168,
    "submittedAt": "2026-10-29T23:50:34.398Z",
    "attempts": [
      {
        "questionId": "q-cs-01",
        "selectedOptionId": "C",
        "isCorrect": false,
        "timeSpentSeconds": 18
      },
      {
        "questionId": "q-cs-02",
        "selectedOptionId": "A",
        "isCorrect": false,
        "timeSpentSeconds": 47
      },
      {
        "questionId": "q-cs-03",
        "selectedOptionId": "B",
        "isCorrect": true,
        "timeSpentSeconds": 34
      },
      {
        "questionId": "q-cs-04",
        "selectedOptionId": "D",
        "isCorrect": false,
        "timeSpentSeconds": 28
      },
      {
        "questionId": "q-cs-05",
        "selectedOptionId": "D",
        "isCorrect": false,
        "timeSpentSeconds": 13
      },
      {
        "questionId": "q-cs-06",
        "selectedOptionId": "B",
        "isCorrect": true,
        "timeSpentSeconds": 28
      }
    ],
    "studentRegNo": "ethan.johnson@school.edu"
  },
  {
    "id": "sub-sim-1793419299597-0-hzhn",
    "quizId": "quiz-cs-fundamentals",
    "quizTitle": "Web & Programming Fundamentals",
    "studentName": "Sophia Miller",
    "studentEmailOrId": "sophia.miller@school.edu",
    "totalQuestions": 6,
    "correctCount": 3,
    "incorrectCount": 3,
    "skippedCount": 0,
    "scorePercent": 50,
    "passed": false,
    "totalTimeSpentSeconds": 217,
    "submittedAt": "2026-10-29T00:59:00.195Z",
    "attempts": [
      {
        "questionId": "q-cs-01",
        "selectedOptionId": "B",
        "isCorrect": true,
        "timeSpentSeconds": 35
      },
      {
        "questionId": "q-cs-02",
        "selectedOptionId": "C",
        "isCorrect": true,
        "timeSpentSeconds": 25
      },
      {
        "questionId": "q-cs-03",
        "selectedOptionId": "B",
        "isCorrect": true,
        "timeSpentSeconds": 33
      },
      {
        "questionId": "q-cs-04",
        "selectedOptionId": "A",
        "isCorrect": false,
        "timeSpentSeconds": 53
      },
      {
        "questionId": "q-cs-05",
        "selectedOptionId": "D",
        "isCorrect": false,
        "timeSpentSeconds": 25
      },
      {
        "questionId": "q-cs-06",
        "selectedOptionId": "C",
        "isCorrect": false,
        "timeSpentSeconds": 46
      }
    ],
    "studentRegNo": "sophia.miller@school.edu"
  },
  {
    "id": "sub-sim-1793419299597-1-k2h6",
    "quizId": "quiz-cs-fundamentals",
    "quizTitle": "Web & Programming Fundamentals",
    "studentName": "Ethan Johnson",
    "studentEmailOrId": "ethan.johnson@school.edu",
    "totalQuestions": 6,
    "correctCount": 5,
    "incorrectCount": 1,
    "skippedCount": 0,
    "scorePercent": 83,
    "passed": true,
    "totalTimeSpentSeconds": 215,
    "submittedAt": "2026-10-28T11:01:42.427Z",
    "attempts": [
      {
        "questionId": "q-cs-01",
        "selectedOptionId": "B",
        "isCorrect": true,
        "timeSpentSeconds": 37
      },
      {
        "questionId": "q-cs-02",
        "selectedOptionId": "C",
        "isCorrect": true,
        "timeSpentSeconds": 36
      },
      {
        "questionId": "q-cs-03",
        "selectedOptionId": "B",
        "isCorrect": true,
        "timeSpentSeconds": 32
      },
      {
        "questionId": "q-cs-04",
        "selectedOptionId": "C",
        "isCorrect": true,
        "timeSpentSeconds": 53
      },
      {
        "questionId": "q-cs-05",
        "selectedOptionId": "A",
        "isCorrect": true,
        "timeSpentSeconds": 14
      },
      {
        "questionId": "q-cs-06",
        "selectedOptionId": "C",
        "isCorrect": false,
        "timeSpentSeconds": 43
      }
    ],
    "studentRegNo": "ethan.johnson@school.edu"
  },
  {
    "id": "sub-sim-1793419299597-2-ozxm",
    "quizId": "quiz-cs-fundamentals",
    "quizTitle": "Web & Programming Fundamentals",
    "studentName": "Olivia Lopez",
    "studentEmailOrId": "olivia.lopez@school.edu",
    "totalQuestions": 6,
    "correctCount": 4,
    "incorrectCount": 2,
    "skippedCount": 0,
    "scorePercent": 67,
    "passed": false,
    "totalTimeSpentSeconds": 212,
    "submittedAt": "2026-10-30T05:32:49.812Z",
    "attempts": [
      {
        "questionId": "q-cs-01",
        "selectedOptionId": "D",
        "isCorrect": false,
        "timeSpentSeconds": 23
      },
      {
        "questionId": "q-cs-02",
        "selectedOptionId": "C",
        "isCorrect": true,
        "timeSpentSeconds": 54
      },
      {
        "questionId": "q-cs-03",
        "selectedOptionId": "B",
        "isCorrect": true,
        "timeSpentSeconds": 26
      },
      {
        "questionId": "q-cs-04",
        "selectedOptionId": "C",
        "isCorrect": true,
        "timeSpentSeconds": 51
      },
      {
        "questionId": "q-cs-05",
        "selectedOptionId": "A",
        "isCorrect": true,
        "timeSpentSeconds": 27
      },
      {
        "questionId": "q-cs-06",
        "selectedOptionId": "C",
        "isCorrect": false,
        "timeSpentSeconds": 31
      }
    ],
    "studentRegNo": "olivia.lopez@school.edu"
  },
  {
    "id": "sub-sim-1793419299597-3-n00f",
    "quizId": "quiz-cs-fundamentals",
    "quizTitle": "Web & Programming Fundamentals",
    "studentName": "Mia Martinez",
    "studentEmailOrId": "mia.martinez@school.edu",
    "totalQuestions": 6,
    "correctCount": 2,
    "incorrectCount": 4,
    "skippedCount": 0,
    "scorePercent": 33,
    "passed": false,
    "totalTimeSpentSeconds": 185,
    "submittedAt": "2026-10-29T21:30:53.270Z",
    "attempts": [
      {
        "questionId": "q-cs-01",
        "selectedOptionId": "B",
        "isCorrect": true,
        "timeSpentSeconds": 11
      },
      {
        "questionId": "q-cs-02",
        "selectedOptionId": "A",
        "isCorrect": false,
        "timeSpentSeconds": 52
      },
      {
        "questionId": "q-cs-03",
        "selectedOptionId": "B",
        "isCorrect": true,
        "timeSpentSeconds": 16
      },
      {
        "questionId": "q-cs-04",
        "selectedOptionId": "B",
        "isCorrect": false,
        "timeSpentSeconds": 35
      },
      {
        "questionId": "q-cs-05",
        "selectedOptionId": "C",
        "isCorrect": false,
        "timeSpentSeconds": 39
      },
      {
        "questionId": "q-cs-06",
        "selectedOptionId": "C",
        "isCorrect": false,
        "timeSpentSeconds": 32
      }
    ],
    "studentRegNo": "mia.martinez@school.edu"
  },
  {
    "id": "sub-sim-1793419299597-4-5p1v",
    "quizId": "quiz-cs-fundamentals",
    "quizTitle": "Web & Programming Fundamentals",
    "studentName": "William Jones",
    "studentEmailOrId": "william.jones@school.edu",
    "totalQuestions": 6,
    "correctCount": 3,
    "incorrectCount": 3,
    "skippedCount": 0,
    "scorePercent": 50,
    "passed": false,
    "totalTimeSpentSeconds": 204,
    "submittedAt": "2026-10-28T05:51:15.384Z",
    "attempts": [
      {
        "questionId": "q-cs-01",
        "selectedOptionId": "B",
        "isCorrect": true,
        "timeSpentSeconds": 11
      },
      {
        "questionId": "q-cs-02",
        "selectedOptionId": "C",
        "isCorrect": true,
        "timeSpentSeconds": 26
      },
      {
        "questionId": "q-cs-03",
        "selectedOptionId": "A",
        "isCorrect": false,
        "timeSpentSeconds": 39
      },
      {
        "questionId": "q-cs-04",
        "selectedOptionId": "A",
        "isCorrect": false,
        "timeSpentSeconds": 51
      },
      {
        "questionId": "q-cs-05",
        "selectedOptionId": "A",
        "isCorrect": true,
        "timeSpentSeconds": 37
      },
      {
        "questionId": "q-cs-06",
        "selectedOptionId": "C",
        "isCorrect": false,
        "timeSpentSeconds": 40
      }
    ],
    "studentRegNo": "william.jones@school.edu"
  },
  {
    "id": "sub-sim-1793419299597-5-dsaf",
    "quizId": "quiz-cs-fundamentals",
    "quizTitle": "Web & Programming Fundamentals",
    "studentName": "Liam Anderson",
    "studentEmailOrId": "liam.anderson@school.edu",
    "totalQuestions": 6,
    "correctCount": 4,
    "incorrectCount": 2,
    "skippedCount": 0,
    "scorePercent": 67,
    "passed": false,
    "totalTimeSpentSeconds": 237,
    "submittedAt": "2026-10-28T20:18:28.439Z",
    "attempts": [
      {
        "questionId": "q-cs-01",
        "selectedOptionId": "B",
        "isCorrect": true,
        "timeSpentSeconds": 39
      },
      {
        "questionId": "q-cs-02",
        "selectedOptionId": "A",
        "isCorrect": false,
        "timeSpentSeconds": 54
      },
      {
        "questionId": "q-cs-03",
        "selectedOptionId": "C",
        "isCorrect": false,
        "timeSpentSeconds": 37
      },
      {
        "questionId": "q-cs-04",
        "selectedOptionId": "C",
        "isCorrect": true,
        "timeSpentSeconds": 36
      },
      {
        "questionId": "q-cs-05",
        "selectedOptionId": "A",
        "isCorrect": true,
        "timeSpentSeconds": 35
      },
      {
        "questionId": "q-cs-06",
        "selectedOptionId": "B",
        "isCorrect": true,
        "timeSpentSeconds": 36
      }
    ],
    "studentRegNo": "liam.anderson@school.edu"
  },
  {
    "id": "sub-sim-1793419299597-6-ltlp",
    "quizId": "quiz-cs-fundamentals",
    "quizTitle": "Web & Programming Fundamentals",
    "studentName": "Ethan Smith",
    "studentEmailOrId": "ethan.smith@school.edu",
    "totalQuestions": 6,
    "correctCount": 6,
    "incorrectCount": 0,
    "skippedCount": 0,
    "scorePercent": 100,
    "passed": true,
    "totalTimeSpentSeconds": 197,
    "submittedAt": "2026-10-28T23:25:56.979Z",
    "attempts": [
      {
        "questionId": "q-cs-01",
        "selectedOptionId": "B",
        "isCorrect": true,
        "timeSpentSeconds": 15
      },
      {
        "questionId": "q-cs-02",
        "selectedOptionId": "C",
        "isCorrect": true,
        "timeSpentSeconds": 39
      },
      {
        "questionId": "q-cs-03",
        "selectedOptionId": "B",
        "isCorrect": true,
        "timeSpentSeconds": 35
      },
      {
        "questionId": "q-cs-04",
        "selectedOptionId": "C",
        "isCorrect": true,
        "timeSpentSeconds": 44
      },
      {
        "questionId": "q-cs-05",
        "selectedOptionId": "A",
        "isCorrect": true,
        "timeSpentSeconds": 13
      },
      {
        "questionId": "q-cs-06",
        "selectedOptionId": "B",
        "isCorrect": true,
        "timeSpentSeconds": 51
      }
    ],
    "studentRegNo": "ethan.smith@school.edu"
  },
  {
    "id": "sub-sim-1793419299597-7-nosv",
    "quizId": "quiz-cs-fundamentals",
    "quizTitle": "Web & Programming Fundamentals",
    "studentName": "Ethan Davis",
    "studentEmailOrId": "ethan.davis@school.edu",
    "totalQuestions": 6,
    "correctCount": 6,
    "incorrectCount": 0,
    "skippedCount": 0,
    "scorePercent": 100,
    "passed": true,
    "totalTimeSpentSeconds": 188,
    "submittedAt": "2026-10-29T18:11:22.488Z",
    "attempts": [
      {
        "questionId": "q-cs-01",
        "selectedOptionId": "B",
        "isCorrect": true,
        "timeSpentSeconds": 17
      },
      {
        "questionId": "q-cs-02",
        "selectedOptionId": "C",
        "isCorrect": true,
        "timeSpentSeconds": 43
      },
      {
        "questionId": "q-cs-03",
        "selectedOptionId": "B",
        "isCorrect": true,
        "timeSpentSeconds": 22
      },
      {
        "questionId": "q-cs-04",
        "selectedOptionId": "C",
        "isCorrect": true,
        "timeSpentSeconds": 29
      },
      {
        "questionId": "q-cs-05",
        "selectedOptionId": "A",
        "isCorrect": true,
        "timeSpentSeconds": 35
      },
      {
        "questionId": "q-cs-06",
        "selectedOptionId": "B",
        "isCorrect": true,
        "timeSpentSeconds": 42
      }
    ],
    "studentRegNo": "ethan.davis@school.edu"
  },
  {
    "id": "sub-sim-1793419299269-0-c4bw",
    "quizId": "quiz-cs-fundamentals",
    "quizTitle": "Web & Programming Fundamentals",
    "studentName": "Olivia Lopez",
    "studentEmailOrId": "olivia.lopez@school.edu",
    "totalQuestions": 6,
    "correctCount": 2,
    "incorrectCount": 4,
    "skippedCount": 0,
    "scorePercent": 33,
    "passed": false,
    "totalTimeSpentSeconds": 205,
    "submittedAt": "2026-10-28T13:03:56.418Z",
    "attempts": [
      {
        "questionId": "q-cs-01",
        "selectedOptionId": "D",
        "isCorrect": false,
        "timeSpentSeconds": 31
      },
      {
        "questionId": "q-cs-02",
        "selectedOptionId": "D",
        "isCorrect": false,
        "timeSpentSeconds": 48
      },
      {
        "questionId": "q-cs-03",
        "selectedOptionId": "B",
        "isCorrect": true,
        "timeSpentSeconds": 22
      },
      {
        "questionId": "q-cs-04",
        "selectedOptionId": "A",
        "isCorrect": false,
        "timeSpentSeconds": 51
      },
      {
        "questionId": "q-cs-05",
        "selectedOptionId": "A",
        "isCorrect": true,
        "timeSpentSeconds": 20
      },
      {
        "questionId": "q-cs-06",
        "selectedOptionId": "D",
        "isCorrect": false,
        "timeSpentSeconds": 33
      }
    ],
    "studentRegNo": "olivia.lopez@school.edu"
  },
  {
    "id": "sub-sim-1793419299269-1-fhb8",
    "quizId": "quiz-cs-fundamentals",
    "quizTitle": "Web & Programming Fundamentals",
    "studentName": "Charlotte Smith",
    "studentEmailOrId": "charlotte.smith@school.edu",
    "totalQuestions": 6,
    "correctCount": 4,
    "incorrectCount": 2,
    "skippedCount": 0,
    "scorePercent": 67,
    "passed": false,
    "totalTimeSpentSeconds": 184,
    "submittedAt": "2026-10-30T20:44:54.031Z",
    "attempts": [
      {
        "questionId": "q-cs-01",
        "selectedOptionId": "B",
        "isCorrect": true,
        "timeSpentSeconds": 22
      },
      {
        "questionId": "q-cs-02",
        "selectedOptionId": "B",
        "isCorrect": false,
        "timeSpentSeconds": 35
      },
      {
        "questionId": "q-cs-03",
        "selectedOptionId": "B",
        "isCorrect": true,
        "timeSpentSeconds": 17
      },
      {
        "questionId": "q-cs-04",
        "selectedOptionId": "C",
        "isCorrect": true,
        "timeSpentSeconds": 34
      },
      {
        "questionId": "q-cs-05",
        "selectedOptionId": "A",
        "isCorrect": true,
        "timeSpentSeconds": 30
      },
      {
        "questionId": "q-cs-06",
        "selectedOptionId": "C",
        "isCorrect": false,
        "timeSpentSeconds": 46
      }
    ],
    "studentRegNo": "charlotte.smith@school.edu"
  },
  {
    "id": "sub-sim-1793419299269-2-2sl6",
    "quizId": "quiz-cs-fundamentals",
    "quizTitle": "Web & Programming Fundamentals",
    "studentName": "Isabella Hernandez",
    "studentEmailOrId": "isabella.hernandez@school.edu",
    "totalQuestions": 6,
    "correctCount": 5,
    "incorrectCount": 1,
    "skippedCount": 0,
    "scorePercent": 83,
    "passed": true,
    "totalTimeSpentSeconds": 207,
    "submittedAt": "2026-10-29T13:27:15.660Z",
    "attempts": [
      {
        "questionId": "q-cs-01",
        "selectedOptionId": "B",
        "isCorrect": true,
        "timeSpentSeconds": 26
      },
      {
        "questionId": "q-cs-02",
        "selectedOptionId": "D",
        "isCorrect": false,
        "timeSpentSeconds": 29
      },
      {
        "questionId": "q-cs-03",
        "selectedOptionId": "B",
        "isCorrect": true,
        "timeSpentSeconds": 38
      },
      {
        "questionId": "q-cs-04",
        "selectedOptionId": "C",
        "isCorrect": true,
        "timeSpentSeconds": 45
      },
      {
        "questionId": "q-cs-05",
        "selectedOptionId": "A",
        "isCorrect": true,
        "timeSpentSeconds": 28
      },
      {
        "questionId": "q-cs-06",
        "selectedOptionId": "B",
        "isCorrect": true,
        "timeSpentSeconds": 41
      }
    ],
    "studentRegNo": "isabella.hernandez@school.edu"
  },
  {
    "id": "sub-sim-1793419299269-3-yx0g",
    "quizId": "quiz-cs-fundamentals",
    "quizTitle": "Web & Programming Fundamentals",
    "studentName": "Olivia Gonzalez",
    "studentEmailOrId": "olivia.gonzalez@school.edu",
    "totalQuestions": 6,
    "correctCount": 4,
    "incorrectCount": 2,
    "skippedCount": 0,
    "scorePercent": 67,
    "passed": false,
    "totalTimeSpentSeconds": 147,
    "submittedAt": "2026-10-30T03:01:12.619Z",
    "attempts": [
      {
        "questionId": "q-cs-01",
        "selectedOptionId": "C",
        "isCorrect": false,
        "timeSpentSeconds": 10
      },
      {
        "questionId": "q-cs-02",
        "selectedOptionId": "C",
        "isCorrect": true,
        "timeSpentSeconds": 27
      },
      {
        "questionId": "q-cs-03",
        "selectedOptionId": "B",
        "isCorrect": true,
        "timeSpentSeconds": 15
      },
      {
        "questionId": "q-cs-04",
        "selectedOptionId": "A",
        "isCorrect": false,
        "timeSpentSeconds": 42
      },
      {
        "questionId": "q-cs-05",
        "selectedOptionId": "A",
        "isCorrect": true,
        "timeSpentSeconds": 27
      },
      {
        "questionId": "q-cs-06",
        "selectedOptionId": "B",
        "isCorrect": true,
        "timeSpentSeconds": 26
      }
    ],
    "studentRegNo": "olivia.gonzalez@school.edu"
  },
  {
    "id": "sub-sim-1793419299269-4-q7kt",
    "quizId": "quiz-cs-fundamentals",
    "quizTitle": "Web & Programming Fundamentals",
    "studentName": "Ethan Gonzalez",
    "studentEmailOrId": "ethan.gonzalez@school.edu",
    "totalQuestions": 6,
    "correctCount": 4,
    "incorrectCount": 2,
    "skippedCount": 0,
    "scorePercent": 67,
    "passed": false,
    "totalTimeSpentSeconds": 205,
    "submittedAt": "2026-10-28T15:07:59.787Z",
    "attempts": [
      {
        "questionId": "q-cs-01",
        "selectedOptionId": "B",
        "isCorrect": true,
        "timeSpentSeconds": 39
      },
      {
        "questionId": "q-cs-02",
        "selectedOptionId": "D",
        "isCorrect": false,
        "timeSpentSeconds": 44
      },
      {
        "questionId": "q-cs-03",
        "selectedOptionId": "B",
        "isCorrect": true,
        "timeSpentSeconds": 23
      },
      {
        "questionId": "q-cs-04",
        "selectedOptionId": "A",
        "isCorrect": false,
        "timeSpentSeconds": 35
      },
      {
        "questionId": "q-cs-05",
        "selectedOptionId": "A",
        "isCorrect": true,
        "timeSpentSeconds": 20
      },
      {
        "questionId": "q-cs-06",
        "selectedOptionId": "B",
        "isCorrect": true,
        "timeSpentSeconds": 44
      }
    ],
    "studentRegNo": "ethan.gonzalez@school.edu"
  },
  {
    "id": "sub-sim-1793419299269-5-77w2",
    "quizId": "quiz-cs-fundamentals",
    "quizTitle": "Web & Programming Fundamentals",
    "studentName": "Ava Wilson",
    "studentEmailOrId": "ava.wilson@school.edu",
    "totalQuestions": 6,
    "correctCount": 3,
    "incorrectCount": 3,
    "skippedCount": 0,
    "scorePercent": 50,
    "passed": false,
    "totalTimeSpentSeconds": 197,
    "submittedAt": "2026-10-28T12:29:50.939Z",
    "attempts": [
      {
        "questionId": "q-cs-01",
        "selectedOptionId": "B",
        "isCorrect": true,
        "timeSpentSeconds": 18
      },
      {
        "questionId": "q-cs-02",
        "selectedOptionId": "C",
        "isCorrect": true,
        "timeSpentSeconds": 27
      },
      {
        "questionId": "q-cs-03",
        "selectedOptionId": "D",
        "isCorrect": false,
        "timeSpentSeconds": 28
      },
      {
        "questionId": "q-cs-04",
        "selectedOptionId": "B",
        "isCorrect": false,
        "timeSpentSeconds": 45
      },
      {
        "questionId": "q-cs-05",
        "selectedOptionId": "A",
        "isCorrect": true,
        "timeSpentSeconds": 35
      },
      {
        "questionId": "q-cs-06",
        "selectedOptionId": "A",
        "isCorrect": false,
        "timeSpentSeconds": 44
      }
    ],
    "studentRegNo": "ava.wilson@school.edu"
  },
  {
    "id": "sub-sim-1793419299269-6-pw40",
    "quizId": "quiz-cs-fundamentals",
    "quizTitle": "Web & Programming Fundamentals",
    "studentName": "Olivia Wilson",
    "studentEmailOrId": "olivia.wilson@school.edu",
    "totalQuestions": 6,
    "correctCount": 3,
    "incorrectCount": 3,
    "skippedCount": 0,
    "scorePercent": 50,
    "passed": false,
    "totalTimeSpentSeconds": 196,
    "submittedAt": "2026-10-30T00:06:18.022Z",
    "attempts": [
      {
        "questionId": "q-cs-01",
        "selectedOptionId": "B",
        "isCorrect": true,
        "timeSpentSeconds": 13
      },
      {
        "questionId": "q-cs-02",
        "selectedOptionId": "A",
        "isCorrect": false,
        "timeSpentSeconds": 49
      },
      {
        "questionId": "q-cs-03",
        "selectedOptionId": "D",
        "isCorrect": false,
        "timeSpentSeconds": 33
      },
      {
        "questionId": "q-cs-04",
        "selectedOptionId": "A",
        "isCorrect": false,
        "timeSpentSeconds": 39
      },
      {
        "questionId": "q-cs-05",
        "selectedOptionId": "A",
        "isCorrect": true,
        "timeSpentSeconds": 23
      },
      {
        "questionId": "q-cs-06",
        "selectedOptionId": "B",
        "isCorrect": true,
        "timeSpentSeconds": 39
      }
    ],
    "studentRegNo": "olivia.wilson@school.edu"
  },
  {
    "id": "sub-sim-1793419299269-7-qjw2",
    "quizId": "quiz-cs-fundamentals",
    "quizTitle": "Web & Programming Fundamentals",
    "studentName": "Mia Lopez",
    "studentEmailOrId": "mia.lopez@school.edu",
    "totalQuestions": 6,
    "correctCount": 6,
    "incorrectCount": 0,
    "skippedCount": 0,
    "scorePercent": 100,
    "passed": true,
    "totalTimeSpentSeconds": 192,
    "submittedAt": "2026-10-30T06:34:48.048Z",
    "attempts": [
      {
        "questionId": "q-cs-01",
        "selectedOptionId": "B",
        "isCorrect": true,
        "timeSpentSeconds": 10
      },
      {
        "questionId": "q-cs-02",
        "selectedOptionId": "C",
        "isCorrect": true,
        "timeSpentSeconds": 52
      },
      {
        "questionId": "q-cs-03",
        "selectedOptionId": "B",
        "isCorrect": true,
        "timeSpentSeconds": 39
      },
      {
        "questionId": "q-cs-04",
        "selectedOptionId": "C",
        "isCorrect": true,
        "timeSpentSeconds": 31
      },
      {
        "questionId": "q-cs-05",
        "selectedOptionId": "A",
        "isCorrect": true,
        "timeSpentSeconds": 25
      },
      {
        "questionId": "q-cs-06",
        "selectedOptionId": "B",
        "isCorrect": true,
        "timeSpentSeconds": 35
      }
    ],
    "studentRegNo": "mia.lopez@school.edu"
  },
  {
    "id": "sub-sim-1793419298845-0-5ndg",
    "quizId": "quiz-cs-fundamentals",
    "quizTitle": "Web & Programming Fundamentals",
    "studentName": "Emma Rodriguez",
    "studentEmailOrId": "emma.rodriguez@school.edu",
    "totalQuestions": 6,
    "correctCount": 6,
    "incorrectCount": 0,
    "skippedCount": 0,
    "scorePercent": 100,
    "passed": true,
    "totalTimeSpentSeconds": 218,
    "submittedAt": "2026-10-29T01:15:14.892Z",
    "attempts": [
      {
        "questionId": "q-cs-01",
        "selectedOptionId": "B",
        "isCorrect": true,
        "timeSpentSeconds": 30
      },
      {
        "questionId": "q-cs-02",
        "selectedOptionId": "C",
        "isCorrect": true,
        "timeSpentSeconds": 41
      },
      {
        "questionId": "q-cs-03",
        "selectedOptionId": "B",
        "isCorrect": true,
        "timeSpentSeconds": 34
      },
      {
        "questionId": "q-cs-04",
        "selectedOptionId": "C",
        "isCorrect": true,
        "timeSpentSeconds": 49
      },
      {
        "questionId": "q-cs-05",
        "selectedOptionId": "A",
        "isCorrect": true,
        "timeSpentSeconds": 38
      },
      {
        "questionId": "q-cs-06",
        "selectedOptionId": "B",
        "isCorrect": true,
        "timeSpentSeconds": 26
      }
    ],
    "studentRegNo": "emma.rodriguez@school.edu"
  },
  {
    "id": "sub-sim-1793419298845-1-3eju",
    "quizId": "quiz-cs-fundamentals",
    "quizTitle": "Web & Programming Fundamentals",
    "studentName": "Charlotte Johnson",
    "studentEmailOrId": "charlotte.johnson@school.edu",
    "totalQuestions": 6,
    "correctCount": 3,
    "incorrectCount": 3,
    "skippedCount": 0,
    "scorePercent": 50,
    "passed": false,
    "totalTimeSpentSeconds": 170,
    "submittedAt": "2026-10-28T13:33:17.447Z",
    "attempts": [
      {
        "questionId": "q-cs-01",
        "selectedOptionId": "B",
        "isCorrect": true,
        "timeSpentSeconds": 26
      },
      {
        "questionId": "q-cs-02",
        "selectedOptionId": "A",
        "isCorrect": false,
        "timeSpentSeconds": 26
      },
      {
        "questionId": "q-cs-03",
        "selectedOptionId": "B",
        "isCorrect": true,
        "timeSpentSeconds": 15
      },
      {
        "questionId": "q-cs-04",
        "selectedOptionId": "B",
        "isCorrect": false,
        "timeSpentSeconds": 30
      },
      {
        "questionId": "q-cs-05",
        "selectedOptionId": "A",
        "isCorrect": true,
        "timeSpentSeconds": 22
      },
      {
        "questionId": "q-cs-06",
        "selectedOptionId": "A",
        "isCorrect": false,
        "timeSpentSeconds": 51
      }
    ],
    "studentRegNo": "charlotte.johnson@school.edu"
  },
  {
    "id": "sub-sim-1793419298845-2-61vy",
    "quizId": "quiz-cs-fundamentals",
    "quizTitle": "Web & Programming Fundamentals",
    "studentName": "James Williams",
    "studentEmailOrId": "james.williams@school.edu",
    "totalQuestions": 6,
    "correctCount": 5,
    "incorrectCount": 1,
    "skippedCount": 0,
    "scorePercent": 83,
    "passed": true,
    "totalTimeSpentSeconds": 231,
    "submittedAt": "2026-10-28T19:23:27.205Z",
    "attempts": [
      {
        "questionId": "q-cs-01",
        "selectedOptionId": "B",
        "isCorrect": true,
        "timeSpentSeconds": 37
      },
      {
        "questionId": "q-cs-02",
        "selectedOptionId": "C",
        "isCorrect": true,
        "timeSpentSeconds": 38
      },
      {
        "questionId": "q-cs-03",
        "selectedOptionId": "B",
        "isCorrect": true,
        "timeSpentSeconds": 27
      },
      {
        "questionId": "q-cs-04",
        "selectedOptionId": "C",
        "isCorrect": true,
        "timeSpentSeconds": 44
      },
      {
        "questionId": "q-cs-05",
        "selectedOptionId": "A",
        "isCorrect": true,
        "timeSpentSeconds": 36
      },
      {
        "questionId": "q-cs-06",
        "selectedOptionId": "C",
        "isCorrect": false,
        "timeSpentSeconds": 49
      }
    ],
    "studentRegNo": "james.williams@school.edu"
  },
  {
    "id": "sub-sim-1793419298845-3-yrs7",
    "quizId": "quiz-cs-fundamentals",
    "quizTitle": "Web & Programming Fundamentals",
    "studentName": "Mia Jones",
    "studentEmailOrId": "mia.jones@school.edu",
    "totalQuestions": 6,
    "correctCount": 5,
    "incorrectCount": 1,
    "skippedCount": 0,
    "scorePercent": 83,
    "passed": true,
    "totalTimeSpentSeconds": 205,
    "submittedAt": "2026-10-28T12:32:45.520Z",
    "attempts": [
      {
        "questionId": "q-cs-01",
        "selectedOptionId": "B",
        "isCorrect": true,
        "timeSpentSeconds": 37
      },
      {
        "questionId": "q-cs-02",
        "selectedOptionId": "A",
        "isCorrect": false,
        "timeSpentSeconds": 35
      },
      {
        "questionId": "q-cs-03",
        "selectedOptionId": "B",
        "isCorrect": true,
        "timeSpentSeconds": 17
      },
      {
        "questionId": "q-cs-04",
        "selectedOptionId": "C",
        "isCorrect": true,
        "timeSpentSeconds": 35
      },
      {
        "questionId": "q-cs-05",
        "selectedOptionId": "A",
        "isCorrect": true,
        "timeSpentSeconds": 31
      },
      {
        "questionId": "q-cs-06",
        "selectedOptionId": "B",
        "isCorrect": true,
        "timeSpentSeconds": 50
      }
    ],
    "studentRegNo": "mia.jones@school.edu"
  },
  {
    "id": "sub-sim-1793419298846-4-c9b6",
    "quizId": "quiz-cs-fundamentals",
    "quizTitle": "Web & Programming Fundamentals",
    "studentName": "Mia Williams",
    "studentEmailOrId": "mia.williams@school.edu",
    "totalQuestions": 6,
    "correctCount": 6,
    "incorrectCount": 0,
    "skippedCount": 0,
    "scorePercent": 100,
    "passed": true,
    "totalTimeSpentSeconds": 193,
    "submittedAt": "2026-10-29T11:43:34.376Z",
    "attempts": [
      {
        "questionId": "q-cs-01",
        "selectedOptionId": "B",
        "isCorrect": true,
        "timeSpentSeconds": 14
      },
      {
        "questionId": "q-cs-02",
        "selectedOptionId": "C",
        "isCorrect": true,
        "timeSpentSeconds": 44
      },
      {
        "questionId": "q-cs-03",
        "selectedOptionId": "B",
        "isCorrect": true,
        "timeSpentSeconds": 32
      },
      {
        "questionId": "q-cs-04",
        "selectedOptionId": "C",
        "isCorrect": true,
        "timeSpentSeconds": 49
      },
      {
        "questionId": "q-cs-05",
        "selectedOptionId": "A",
        "isCorrect": true,
        "timeSpentSeconds": 26
      },
      {
        "questionId": "q-cs-06",
        "selectedOptionId": "B",
        "isCorrect": true,
        "timeSpentSeconds": 28
      }
    ],
    "studentRegNo": "mia.williams@school.edu"
  },
  {
    "id": "sub-sim-1793419298846-5-48w4",
    "quizId": "quiz-cs-fundamentals",
    "quizTitle": "Web & Programming Fundamentals",
    "studentName": "James Jones",
    "studentEmailOrId": "james.jones@school.edu",
    "totalQuestions": 6,
    "correctCount": 3,
    "incorrectCount": 3,
    "skippedCount": 0,
    "scorePercent": 50,
    "passed": false,
    "totalTimeSpentSeconds": 171,
    "submittedAt": "2026-10-29T11:27:43.886Z",
    "attempts": [
      {
        "questionId": "q-cs-01",
        "selectedOptionId": "C",
        "isCorrect": false,
        "timeSpentSeconds": 31
      },
      {
        "questionId": "q-cs-02",
        "selectedOptionId": "D",
        "isCorrect": false,
        "timeSpentSeconds": 26
      },
      {
        "questionId": "q-cs-03",
        "selectedOptionId": "B",
        "isCorrect": true,
        "timeSpentSeconds": 13
      },
      {
        "questionId": "q-cs-04",
        "selectedOptionId": "C",
        "isCorrect": true,
        "timeSpentSeconds": 36
      },
      {
        "questionId": "q-cs-05",
        "selectedOptionId": "B",
        "isCorrect": false,
        "timeSpentSeconds": 21
      },
      {
        "questionId": "q-cs-06",
        "selectedOptionId": "B",
        "isCorrect": true,
        "timeSpentSeconds": 44
      }
    ],
    "studentRegNo": "james.jones@school.edu"
  },
  {
    "id": "sub-sim-1793419298846-6-l46s",
    "quizId": "quiz-cs-fundamentals",
    "quizTitle": "Web & Programming Fundamentals",
    "studentName": "James Brown",
    "studentEmailOrId": "james.brown@school.edu",
    "totalQuestions": 6,
    "correctCount": 5,
    "incorrectCount": 1,
    "skippedCount": 0,
    "scorePercent": 83,
    "passed": true,
    "totalTimeSpentSeconds": 184,
    "submittedAt": "2026-10-29T09:40:29.473Z",
    "attempts": [
      {
        "questionId": "q-cs-01",
        "selectedOptionId": "C",
        "isCorrect": false,
        "timeSpentSeconds": 10
      },
      {
        "questionId": "q-cs-02",
        "selectedOptionId": "C",
        "isCorrect": true,
        "timeSpentSeconds": 34
      },
      {
        "questionId": "q-cs-03",
        "selectedOptionId": "B",
        "isCorrect": true,
        "timeSpentSeconds": 32
      },
      {
        "questionId": "q-cs-04",
        "selectedOptionId": "C",
        "isCorrect": true,
        "timeSpentSeconds": 31
      },
      {
        "questionId": "q-cs-05",
        "selectedOptionId": "A",
        "isCorrect": true,
        "timeSpentSeconds": 36
      },
      {
        "questionId": "q-cs-06",
        "selectedOptionId": "B",
        "isCorrect": true,
        "timeSpentSeconds": 41
      }
    ],
    "studentRegNo": "james.brown@school.edu"
  },
  {
    "id": "sub-sim-1793419298846-7-s7r2",
    "quizId": "quiz-cs-fundamentals",
    "quizTitle": "Web & Programming Fundamentals",
    "studentName": "Henry Brown",
    "studentEmailOrId": "henry.brown@school.edu",
    "totalQuestions": 6,
    "correctCount": 3,
    "incorrectCount": 3,
    "skippedCount": 0,
    "scorePercent": 50,
    "passed": false,
    "totalTimeSpentSeconds": 185,
    "submittedAt": "2026-10-30T06:36:32.939Z",
    "attempts": [
      {
        "questionId": "q-cs-01",
        "selectedOptionId": "C",
        "isCorrect": false,
        "timeSpentSeconds": 19
      },
      {
        "questionId": "q-cs-02",
        "selectedOptionId": "C",
        "isCorrect": true,
        "timeSpentSeconds": 31
      },
      {
        "questionId": "q-cs-03",
        "selectedOptionId": "B",
        "isCorrect": true,
        "timeSpentSeconds": 12
      },
      {
        "questionId": "q-cs-04",
        "selectedOptionId": "B",
        "isCorrect": false,
        "timeSpentSeconds": 54
      },
      {
        "questionId": "q-cs-05",
        "selectedOptionId": "A",
        "isCorrect": true,
        "timeSpentSeconds": 22
      },
      {
        "questionId": "q-cs-06",
        "selectedOptionId": "C",
        "isCorrect": false,
        "timeSpentSeconds": 47
      }
    ],
    "studentRegNo": "henry.brown@school.edu"
  },
  {
    "id": "sub-sim-1793419298469-0-5w7l",
    "quizId": "quiz-cs-fundamentals",
    "quizTitle": "Web & Programming Fundamentals",
    "studentName": "Olivia Wilson",
    "studentEmailOrId": "olivia.wilson@school.edu",
    "totalQuestions": 6,
    "correctCount": 6,
    "incorrectCount": 0,
    "skippedCount": 0,
    "scorePercent": 100,
    "passed": true,
    "totalTimeSpentSeconds": 200,
    "submittedAt": "2026-10-28T16:46:57.320Z",
    "attempts": [
      {
        "questionId": "q-cs-01",
        "selectedOptionId": "B",
        "isCorrect": true,
        "timeSpentSeconds": 13
      },
      {
        "questionId": "q-cs-02",
        "selectedOptionId": "C",
        "isCorrect": true,
        "timeSpentSeconds": 44
      },
      {
        "questionId": "q-cs-03",
        "selectedOptionId": "B",
        "isCorrect": true,
        "timeSpentSeconds": 34
      },
      {
        "questionId": "q-cs-04",
        "selectedOptionId": "C",
        "isCorrect": true,
        "timeSpentSeconds": 39
      },
      {
        "questionId": "q-cs-05",
        "selectedOptionId": "A",
        "isCorrect": true,
        "timeSpentSeconds": 18
      },
      {
        "questionId": "q-cs-06",
        "selectedOptionId": "B",
        "isCorrect": true,
        "timeSpentSeconds": 52
      }
    ],
    "studentRegNo": "olivia.wilson@school.edu"
  },
  {
    "id": "sub-sim-1793419298469-1-5kfq",
    "quizId": "quiz-cs-fundamentals",
    "quizTitle": "Web & Programming Fundamentals",
    "studentName": "William Gonzalez",
    "studentEmailOrId": "william.gonzalez@school.edu",
    "totalQuestions": 6,
    "correctCount": 3,
    "incorrectCount": 3,
    "skippedCount": 0,
    "scorePercent": 50,
    "passed": false,
    "totalTimeSpentSeconds": 161,
    "submittedAt": "2026-10-28T20:21:15.478Z",
    "attempts": [
      {
        "questionId": "q-cs-01",
        "selectedOptionId": "C",
        "isCorrect": false,
        "timeSpentSeconds": 21
      },
      {
        "questionId": "q-cs-02",
        "selectedOptionId": "C",
        "isCorrect": true,
        "timeSpentSeconds": 35
      },
      {
        "questionId": "q-cs-03",
        "selectedOptionId": "B",
        "isCorrect": true,
        "timeSpentSeconds": 13
      },
      {
        "questionId": "q-cs-04",
        "selectedOptionId": "C",
        "isCorrect": true,
        "timeSpentSeconds": 31
      },
      {
        "questionId": "q-cs-05",
        "selectedOptionId": "D",
        "isCorrect": false,
        "timeSpentSeconds": 14
      },
      {
        "questionId": "q-cs-06",
        "selectedOptionId": "D",
        "isCorrect": false,
        "timeSpentSeconds": 47
      }
    ],
    "studentRegNo": "william.gonzalez@school.edu"
  },
  {
    "id": "sub-sim-1793419298469-2-l0p3",
    "quizId": "quiz-cs-fundamentals",
    "quizTitle": "Web & Programming Fundamentals",
    "studentName": "William Anderson",
    "studentEmailOrId": "william.anderson@school.edu",
    "totalQuestions": 6,
    "correctCount": 6,
    "incorrectCount": 0,
    "skippedCount": 0,
    "scorePercent": 100,
    "passed": true,
    "totalTimeSpentSeconds": 192,
    "submittedAt": "2026-10-29T07:25:10.614Z",
    "attempts": [
      {
        "questionId": "q-cs-01",
        "selectedOptionId": "B",
        "isCorrect": true,
        "timeSpentSeconds": 13
      },
      {
        "questionId": "q-cs-02",
        "selectedOptionId": "C",
        "isCorrect": true,
        "timeSpentSeconds": 32
      },
      {
        "questionId": "q-cs-03",
        "selectedOptionId": "B",
        "isCorrect": true,
        "timeSpentSeconds": 34
      },
      {
        "questionId": "q-cs-04",
        "selectedOptionId": "C",
        "isCorrect": true,
        "timeSpentSeconds": 48
      },
      {
        "questionId": "q-cs-05",
        "selectedOptionId": "A",
        "isCorrect": true,
        "timeSpentSeconds": 25
      },
      {
        "questionId": "q-cs-06",
        "selectedOptionId": "B",
        "isCorrect": true,
        "timeSpentSeconds": 40
      }
    ],
    "studentRegNo": "william.anderson@school.edu"
  },
  {
    "id": "sub-sim-1793419298469-3-eq34",
    "quizId": "quiz-cs-fundamentals",
    "quizTitle": "Web & Programming Fundamentals",
    "studentName": "Ava Johnson",
    "studentEmailOrId": "ava.johnson@school.edu",
    "totalQuestions": 6,
    "correctCount": 4,
    "incorrectCount": 2,
    "skippedCount": 0,
    "scorePercent": 67,
    "passed": false,
    "totalTimeSpentSeconds": 197,
    "submittedAt": "2026-10-29T23:44:48.659Z",
    "attempts": [
      {
        "questionId": "q-cs-01",
        "selectedOptionId": "B",
        "isCorrect": true,
        "timeSpentSeconds": 39
      },
      {
        "questionId": "q-cs-02",
        "selectedOptionId": "C",
        "isCorrect": true,
        "timeSpentSeconds": 45
      },
      {
        "questionId": "q-cs-03",
        "selectedOptionId": "B",
        "isCorrect": true,
        "timeSpentSeconds": 16
      },
      {
        "questionId": "q-cs-04",
        "selectedOptionId": "B",
        "isCorrect": false,
        "timeSpentSeconds": 40
      },
      {
        "questionId": "q-cs-05",
        "selectedOptionId": "A",
        "isCorrect": true,
        "timeSpentSeconds": 27
      },
      {
        "questionId": "q-cs-06",
        "selectedOptionId": "D",
        "isCorrect": false,
        "timeSpentSeconds": 30
      }
    ],
    "studentRegNo": "ava.johnson@school.edu"
  },
  {
    "id": "sub-sim-1793419298469-4-hj67",
    "quizId": "quiz-cs-fundamentals",
    "quizTitle": "Web & Programming Fundamentals",
    "studentName": "Mason Williams",
    "studentEmailOrId": "mason.williams@school.edu",
    "totalQuestions": 6,
    "correctCount": 4,
    "incorrectCount": 2,
    "skippedCount": 0,
    "scorePercent": 67,
    "passed": false,
    "totalTimeSpentSeconds": 190,
    "submittedAt": "2026-10-29T03:49:21.188Z",
    "attempts": [
      {
        "questionId": "q-cs-01",
        "selectedOptionId": "B",
        "isCorrect": true,
        "timeSpentSeconds": 15
      },
      {
        "questionId": "q-cs-02",
        "selectedOptionId": "C",
        "isCorrect": true,
        "timeSpentSeconds": 44
      },
      {
        "questionId": "q-cs-03",
        "selectedOptionId": "B",
        "isCorrect": true,
        "timeSpentSeconds": 18
      },
      {
        "questionId": "q-cs-04",
        "selectedOptionId": "C",
        "isCorrect": true,
        "timeSpentSeconds": 53
      },
      {
        "questionId": "q-cs-05",
        "selectedOptionId": "D",
        "isCorrect": false,
        "timeSpentSeconds": 11
      },
      {
        "questionId": "q-cs-06",
        "selectedOptionId": "D",
        "isCorrect": false,
        "timeSpentSeconds": 49
      }
    ],
    "studentRegNo": "mason.williams@school.edu"
  },
  {
    "id": "sub-sim-1793419298469-5-xle7",
    "quizId": "quiz-cs-fundamentals",
    "quizTitle": "Web & Programming Fundamentals",
    "studentName": "Isabella Davis",
    "studentEmailOrId": "isabella.davis@school.edu",
    "totalQuestions": 6,
    "correctCount": 6,
    "incorrectCount": 0,
    "skippedCount": 0,
    "scorePercent": 100,
    "passed": true,
    "totalTimeSpentSeconds": 202,
    "submittedAt": "2026-10-29T21:19:09.373Z",
    "attempts": [
      {
        "questionId": "q-cs-01",
        "selectedOptionId": "B",
        "isCorrect": true,
        "timeSpentSeconds": 35
      },
      {
        "questionId": "q-cs-02",
        "selectedOptionId": "C",
        "isCorrect": true,
        "timeSpentSeconds": 52
      },
      {
        "questionId": "q-cs-03",
        "selectedOptionId": "B",
        "isCorrect": true,
        "timeSpentSeconds": 25
      },
      {
        "questionId": "q-cs-04",
        "selectedOptionId": "C",
        "isCorrect": true,
        "timeSpentSeconds": 35
      },
      {
        "questionId": "q-cs-05",
        "selectedOptionId": "A",
        "isCorrect": true,
        "timeSpentSeconds": 13
      },
      {
        "questionId": "q-cs-06",
        "selectedOptionId": "B",
        "isCorrect": true,
        "timeSpentSeconds": 42
      }
    ],
    "studentRegNo": "isabella.davis@school.edu"
  },
  {
    "id": "sub-sim-1793419298469-6-hpxq",
    "quizId": "quiz-cs-fundamentals",
    "quizTitle": "Web & Programming Fundamentals",
    "studentName": "Mason Davis",
    "studentEmailOrId": "mason.davis@school.edu",
    "totalQuestions": 6,
    "correctCount": 3,
    "incorrectCount": 3,
    "skippedCount": 0,
    "scorePercent": 50,
    "passed": false,
    "totalTimeSpentSeconds": 198,
    "submittedAt": "2026-10-28T12:01:31.183Z",
    "attempts": [
      {
        "questionId": "q-cs-01",
        "selectedOptionId": "D",
        "isCorrect": false,
        "timeSpentSeconds": 15
      },
      {
        "questionId": "q-cs-02",
        "selectedOptionId": "C",
        "isCorrect": true,
        "timeSpentSeconds": 47
      },
      {
        "questionId": "q-cs-03",
        "selectedOptionId": "B",
        "isCorrect": true,
        "timeSpentSeconds": 35
      },
      {
        "questionId": "q-cs-04",
        "selectedOptionId": "A",
        "isCorrect": false,
        "timeSpentSeconds": 31
      },
      {
        "questionId": "q-cs-05",
        "selectedOptionId": "B",
        "isCorrect": false,
        "timeSpentSeconds": 38
      },
      {
        "questionId": "q-cs-06",
        "selectedOptionId": "B",
        "isCorrect": true,
        "timeSpentSeconds": 32
      }
    ],
    "studentRegNo": "mason.davis@school.edu"
  },
  {
    "id": "sub-sim-1793419298469-7-bspr",
    "quizId": "quiz-cs-fundamentals",
    "quizTitle": "Web & Programming Fundamentals",
    "studentName": "Ethan Lopez",
    "studentEmailOrId": "ethan.lopez@school.edu",
    "totalQuestions": 6,
    "correctCount": 3,
    "incorrectCount": 3,
    "skippedCount": 0,
    "scorePercent": 50,
    "passed": false,
    "totalTimeSpentSeconds": 194,
    "submittedAt": "2026-10-29T06:26:31.636Z",
    "attempts": [
      {
        "questionId": "q-cs-01",
        "selectedOptionId": "D",
        "isCorrect": false,
        "timeSpentSeconds": 24
      },
      {
        "questionId": "q-cs-02",
        "selectedOptionId": "C",
        "isCorrect": true,
        "timeSpentSeconds": 42
      },
      {
        "questionId": "q-cs-03",
        "selectedOptionId": "D",
        "isCorrect": false,
        "timeSpentSeconds": 39
      },
      {
        "questionId": "q-cs-04",
        "selectedOptionId": "A",
        "isCorrect": false,
        "timeSpentSeconds": 37
      },
      {
        "questionId": "q-cs-05",
        "selectedOptionId": "A",
        "isCorrect": true,
        "timeSpentSeconds": 11
      },
      {
        "questionId": "q-cs-06",
        "selectedOptionId": "B",
        "isCorrect": true,
        "timeSpentSeconds": 41
      }
    ],
    "studentRegNo": "ethan.lopez@school.edu"
  },
  {
    "id": "sub-sim-1793419298037-0-2vv2",
    "quizId": "quiz-cs-fundamentals",
    "quizTitle": "Web & Programming Fundamentals",
    "studentName": "Sophia Jones",
    "studentEmailOrId": "sophia.jones@school.edu",
    "totalQuestions": 6,
    "correctCount": 3,
    "incorrectCount": 3,
    "skippedCount": 0,
    "scorePercent": 50,
    "passed": false,
    "totalTimeSpentSeconds": 200,
    "submittedAt": "2026-10-30T00:35:25.983Z",
    "attempts": [
      {
        "questionId": "q-cs-01",
        "selectedOptionId": "C",
        "isCorrect": false,
        "timeSpentSeconds": 32
      },
      {
        "questionId": "q-cs-02",
        "selectedOptionId": "C",
        "isCorrect": true,
        "timeSpentSeconds": 46
      },
      {
        "questionId": "q-cs-03",
        "selectedOptionId": "A",
        "isCorrect": false,
        "timeSpentSeconds": 39
      },
      {
        "questionId": "q-cs-04",
        "selectedOptionId": "D",
        "isCorrect": false,
        "timeSpentSeconds": 36
      },
      {
        "questionId": "q-cs-05",
        "selectedOptionId": "A",
        "isCorrect": true,
        "timeSpentSeconds": 11
      },
      {
        "questionId": "q-cs-06",
        "selectedOptionId": "B",
        "isCorrect": true,
        "timeSpentSeconds": 36
      }
    ],
    "studentRegNo": "sophia.jones@school.edu"
  },
  {
    "id": "sub-sim-1793419298037-1-72v4",
    "quizId": "quiz-cs-fundamentals",
    "quizTitle": "Web & Programming Fundamentals",
    "studentName": "Mia Johnson",
    "studentEmailOrId": "mia.johnson@school.edu",
    "totalQuestions": 6,
    "correctCount": 2,
    "incorrectCount": 4,
    "skippedCount": 0,
    "scorePercent": 33,
    "passed": false,
    "totalTimeSpentSeconds": 176,
    "submittedAt": "2026-10-29T14:07:03.521Z",
    "attempts": [
      {
        "questionId": "q-cs-01",
        "selectedOptionId": "B",
        "isCorrect": true,
        "timeSpentSeconds": 27
      },
      {
        "questionId": "q-cs-02",
        "selectedOptionId": "B",
        "isCorrect": false,
        "timeSpentSeconds": 26
      },
      {
        "questionId": "q-cs-03",
        "selectedOptionId": "D",
        "isCorrect": false,
        "timeSpentSeconds": 33
      },
      {
        "questionId": "q-cs-04",
        "selectedOptionId": "C",
        "isCorrect": true,
        "timeSpentSeconds": 29
      },
      {
        "questionId": "q-cs-05",
        "selectedOptionId": "C",
        "isCorrect": false,
        "timeSpentSeconds": 28
      },
      {
        "questionId": "q-cs-06",
        "selectedOptionId": "D",
        "isCorrect": false,
        "timeSpentSeconds": 33
      }
    ],
    "studentRegNo": "mia.johnson@school.edu"
  },
  {
    "id": "sub-sim-1793419298037-2-pu5g",
    "quizId": "quiz-cs-fundamentals",
    "quizTitle": "Web & Programming Fundamentals",
    "studentName": "Ethan Jones",
    "studentEmailOrId": "ethan.jones@school.edu",
    "totalQuestions": 6,
    "correctCount": 6,
    "incorrectCount": 0,
    "skippedCount": 0,
    "scorePercent": 100,
    "passed": true,
    "totalTimeSpentSeconds": 175,
    "submittedAt": "2026-10-31T01:49:33.750Z",
    "attempts": [
      {
        "questionId": "q-cs-01",
        "selectedOptionId": "B",
        "isCorrect": true,
        "timeSpentSeconds": 23
      },
      {
        "questionId": "q-cs-02",
        "selectedOptionId": "C",
        "isCorrect": true,
        "timeSpentSeconds": 40
      },
      {
        "questionId": "q-cs-03",
        "selectedOptionId": "B",
        "isCorrect": true,
        "timeSpentSeconds": 12
      },
      {
        "questionId": "q-cs-04",
        "selectedOptionId": "C",
        "isCorrect": true,
        "timeSpentSeconds": 53
      },
      {
        "questionId": "q-cs-05",
        "selectedOptionId": "A",
        "isCorrect": true,
        "timeSpentSeconds": 14
      },
      {
        "questionId": "q-cs-06",
        "selectedOptionId": "B",
        "isCorrect": true,
        "timeSpentSeconds": 33
      }
    ],
    "studentRegNo": "ethan.jones@school.edu"
  },
  {
    "id": "sub-sim-1793419298037-3-smjf",
    "quizId": "quiz-cs-fundamentals",
    "quizTitle": "Web & Programming Fundamentals",
    "studentName": "Ethan Johnson",
    "studentEmailOrId": "ethan.johnson@school.edu",
    "totalQuestions": 6,
    "correctCount": 0,
    "incorrectCount": 6,
    "skippedCount": 0,
    "scorePercent": 0,
    "passed": false,
    "totalTimeSpentSeconds": 187,
    "submittedAt": "2026-10-28T17:39:33.118Z",
    "attempts": [
      {
        "questionId": "q-cs-01",
        "selectedOptionId": "D",
        "isCorrect": false,
        "timeSpentSeconds": 24
      },
      {
        "questionId": "q-cs-02",
        "selectedOptionId": "A",
        "isCorrect": false,
        "timeSpentSeconds": 52
      },
      {
        "questionId": "q-cs-03",
        "selectedOptionId": "C",
        "isCorrect": false,
        "timeSpentSeconds": 20
      },
      {
        "questionId": "q-cs-04",
        "selectedOptionId": "B",
        "isCorrect": false,
        "timeSpentSeconds": 45
      },
      {
        "questionId": "q-cs-05",
        "selectedOptionId": "B",
        "isCorrect": false,
        "timeSpentSeconds": 21
      },
      {
        "questionId": "q-cs-06",
        "selectedOptionId": "A",
        "isCorrect": false,
        "timeSpentSeconds": 25
      }
    ],
    "studentRegNo": "ethan.johnson@school.edu"
  },
  {
    "id": "sub-sim-1793419298037-4-b0bk",
    "quizId": "quiz-cs-fundamentals",
    "quizTitle": "Web & Programming Fundamentals",
    "studentName": "Mia Johnson",
    "studentEmailOrId": "mia.johnson@school.edu",
    "totalQuestions": 6,
    "correctCount": 6,
    "incorrectCount": 0,
    "skippedCount": 0,
    "scorePercent": 100,
    "passed": true,
    "totalTimeSpentSeconds": 183,
    "submittedAt": "2026-10-30T20:31:03.873Z",
    "attempts": [
      {
        "questionId": "q-cs-01",
        "selectedOptionId": "B",
        "isCorrect": true,
        "timeSpentSeconds": 20
      },
      {
        "questionId": "q-cs-02",
        "selectedOptionId": "C",
        "isCorrect": true,
        "timeSpentSeconds": 42
      },
      {
        "questionId": "q-cs-03",
        "selectedOptionId": "B",
        "isCorrect": true,
        "timeSpentSeconds": 11
      },
      {
        "questionId": "q-cs-04",
        "selectedOptionId": "C",
        "isCorrect": true,
        "timeSpentSeconds": 45
      },
      {
        "questionId": "q-cs-05",
        "selectedOptionId": "A",
        "isCorrect": true,
        "timeSpentSeconds": 36
      },
      {
        "questionId": "q-cs-06",
        "selectedOptionId": "B",
        "isCorrect": true,
        "timeSpentSeconds": 29
      }
    ],
    "studentRegNo": "mia.johnson@school.edu"
  },
  {
    "id": "sub-sim-1793419298037-5-t1dt",
    "quizId": "quiz-cs-fundamentals",
    "quizTitle": "Web & Programming Fundamentals",
    "studentName": "Olivia Gonzalez",
    "studentEmailOrId": "olivia.gonzalez@school.edu",
    "totalQuestions": 6,
    "correctCount": 3,
    "incorrectCount": 3,
    "skippedCount": 0,
    "scorePercent": 50,
    "passed": false,
    "totalTimeSpentSeconds": 219,
    "submittedAt": "2026-10-29T23:06:53.188Z",
    "attempts": [
      {
        "questionId": "q-cs-01",
        "selectedOptionId": "D",
        "isCorrect": false,
        "timeSpentSeconds": 20
      },
      {
        "questionId": "q-cs-02",
        "selectedOptionId": "C",
        "isCorrect": true,
        "timeSpentSeconds": 51
      },
      {
        "questionId": "q-cs-03",
        "selectedOptionId": "A",
        "isCorrect": false,
        "timeSpentSeconds": 39
      },
      {
        "questionId": "q-cs-04",
        "selectedOptionId": "D",
        "isCorrect": false,
        "timeSpentSeconds": 42
      },
      {
        "questionId": "q-cs-05",
        "selectedOptionId": "A",
        "isCorrect": true,
        "timeSpentSeconds": 27
      },
      {
        "questionId": "q-cs-06",
        "selectedOptionId": "B",
        "isCorrect": true,
        "timeSpentSeconds": 40
      }
    ],
    "studentRegNo": "olivia.gonzalez@school.edu"
  },
  {
    "id": "sub-sim-1793419298037-6-j0ax",
    "quizId": "quiz-cs-fundamentals",
    "quizTitle": "Web & Programming Fundamentals",
    "studentName": "Henry Smith",
    "studentEmailOrId": "henry.smith@school.edu",
    "totalQuestions": 6,
    "correctCount": 6,
    "incorrectCount": 0,
    "skippedCount": 0,
    "scorePercent": 100,
    "passed": true,
    "totalTimeSpentSeconds": 137,
    "submittedAt": "2026-10-30T16:50:29.715Z",
    "attempts": [
      {
        "questionId": "q-cs-01",
        "selectedOptionId": "B",
        "isCorrect": true,
        "timeSpentSeconds": 14
      },
      {
        "questionId": "q-cs-02",
        "selectedOptionId": "C",
        "isCorrect": true,
        "timeSpentSeconds": 28
      },
      {
        "questionId": "q-cs-03",
        "selectedOptionId": "B",
        "isCorrect": true,
        "timeSpentSeconds": 10
      },
      {
        "questionId": "q-cs-04",
        "selectedOptionId": "C",
        "isCorrect": true,
        "timeSpentSeconds": 42
      },
      {
        "questionId": "q-cs-05",
        "selectedOptionId": "A",
        "isCorrect": true,
        "timeSpentSeconds": 18
      },
      {
        "questionId": "q-cs-06",
        "selectedOptionId": "B",
        "isCorrect": true,
        "timeSpentSeconds": 25
      }
    ],
    "studentRegNo": "henry.smith@school.edu"
  },
  {
    "id": "sub-sim-1793419298037-7-8v05",
    "quizId": "quiz-cs-fundamentals",
    "quizTitle": "Web & Programming Fundamentals",
    "studentName": "Noah Johnson",
    "studentEmailOrId": "noah.johnson@school.edu",
    "totalQuestions": 6,
    "correctCount": 6,
    "incorrectCount": 0,
    "skippedCount": 0,
    "scorePercent": 100,
    "passed": true,
    "totalTimeSpentSeconds": 188,
    "submittedAt": "2026-10-30T04:30:56.352Z",
    "attempts": [
      {
        "questionId": "q-cs-01",
        "selectedOptionId": "B",
        "isCorrect": true,
        "timeSpentSeconds": 32
      },
      {
        "questionId": "q-cs-02",
        "selectedOptionId": "C",
        "isCorrect": true,
        "timeSpentSeconds": 46
      },
      {
        "questionId": "q-cs-03",
        "selectedOptionId": "B",
        "isCorrect": true,
        "timeSpentSeconds": 21
      },
      {
        "questionId": "q-cs-04",
        "selectedOptionId": "C",
        "isCorrect": true,
        "timeSpentSeconds": 35
      },
      {
        "questionId": "q-cs-05",
        "selectedOptionId": "A",
        "isCorrect": true,
        "timeSpentSeconds": 19
      },
      {
        "questionId": "q-cs-06",
        "selectedOptionId": "B",
        "isCorrect": true,
        "timeSpentSeconds": 35
      }
    ],
    "studentRegNo": "noah.johnson@school.edu"
  },
  {
    "id": "sub-sim-1793419297614-0-q94z",
    "quizId": "quiz-cs-fundamentals",
    "quizTitle": "Web & Programming Fundamentals",
    "studentName": "Sophia Brown",
    "studentEmailOrId": "sophia.brown@school.edu",
    "totalQuestions": 6,
    "correctCount": 5,
    "incorrectCount": 1,
    "skippedCount": 0,
    "scorePercent": 83,
    "passed": true,
    "totalTimeSpentSeconds": 199,
    "submittedAt": "2026-10-28T05:02:41.548Z",
    "attempts": [
      {
        "questionId": "q-cs-01",
        "selectedOptionId": "B",
        "isCorrect": true,
        "timeSpentSeconds": 28
      },
      {
        "questionId": "q-cs-02",
        "selectedOptionId": "C",
        "isCorrect": true,
        "timeSpentSeconds": 41
      },
      {
        "questionId": "q-cs-03",
        "selectedOptionId": "B",
        "isCorrect": true,
        "timeSpentSeconds": 13
      },
      {
        "questionId": "q-cs-04",
        "selectedOptionId": "D",
        "isCorrect": false,
        "timeSpentSeconds": 44
      },
      {
        "questionId": "q-cs-05",
        "selectedOptionId": "A",
        "isCorrect": true,
        "timeSpentSeconds": 26
      },
      {
        "questionId": "q-cs-06",
        "selectedOptionId": "B",
        "isCorrect": true,
        "timeSpentSeconds": 47
      }
    ],
    "studentRegNo": "sophia.brown@school.edu"
  },
  {
    "id": "sub-sim-1793419297614-1-rfpe",
    "quizId": "quiz-cs-fundamentals",
    "quizTitle": "Web & Programming Fundamentals",
    "studentName": "Olivia Brown",
    "studentEmailOrId": "olivia.brown@school.edu",
    "totalQuestions": 6,
    "correctCount": 3,
    "incorrectCount": 3,
    "skippedCount": 0,
    "scorePercent": 50,
    "passed": false,
    "totalTimeSpentSeconds": 201,
    "submittedAt": "2026-10-29T00:03:51.767Z",
    "attempts": [
      {
        "questionId": "q-cs-01",
        "selectedOptionId": "C",
        "isCorrect": false,
        "timeSpentSeconds": 24
      },
      {
        "questionId": "q-cs-02",
        "selectedOptionId": "A",
        "isCorrect": false,
        "timeSpentSeconds": 26
      },
      {
        "questionId": "q-cs-03",
        "selectedOptionId": "B",
        "isCorrect": true,
        "timeSpentSeconds": 38
      },
      {
        "questionId": "q-cs-04",
        "selectedOptionId": "C",
        "isCorrect": true,
        "timeSpentSeconds": 44
      },
      {
        "questionId": "q-cs-05",
        "selectedOptionId": "C",
        "isCorrect": false,
        "timeSpentSeconds": 25
      },
      {
        "questionId": "q-cs-06",
        "selectedOptionId": "B",
        "isCorrect": true,
        "timeSpentSeconds": 44
      }
    ],
    "studentRegNo": "olivia.brown@school.edu"
  },
  {
    "id": "sub-sim-1793419297614-2-dv3b",
    "quizId": "quiz-cs-fundamentals",
    "quizTitle": "Web & Programming Fundamentals",
    "studentName": "Isabella Martinez",
    "studentEmailOrId": "isabella.martinez@school.edu",
    "totalQuestions": 6,
    "correctCount": 2,
    "incorrectCount": 4,
    "skippedCount": 0,
    "scorePercent": 33,
    "passed": false,
    "totalTimeSpentSeconds": 175,
    "submittedAt": "2026-10-30T07:51:25.188Z",
    "attempts": [
      {
        "questionId": "q-cs-01",
        "selectedOptionId": "B",
        "isCorrect": true,
        "timeSpentSeconds": 29
      },
      {
        "questionId": "q-cs-02",
        "selectedOptionId": "B",
        "isCorrect": false,
        "timeSpentSeconds": 35
      },
      {
        "questionId": "q-cs-03",
        "selectedOptionId": "A",
        "isCorrect": false,
        "timeSpentSeconds": 32
      },
      {
        "questionId": "q-cs-04",
        "selectedOptionId": "A",
        "isCorrect": false,
        "timeSpentSeconds": 37
      },
      {
        "questionId": "q-cs-05",
        "selectedOptionId": "A",
        "isCorrect": true,
        "timeSpentSeconds": 15
      },
      {
        "questionId": "q-cs-06",
        "selectedOptionId": "A",
        "isCorrect": false,
        "timeSpentSeconds": 27
      }
    ],
    "studentRegNo": "isabella.martinez@school.edu"
  },
  {
    "id": "sub-sim-1793419297614-3-wrxe",
    "quizId": "quiz-cs-fundamentals",
    "quizTitle": "Web & Programming Fundamentals",
    "studentName": "Henry Smith",
    "studentEmailOrId": "henry.smith@school.edu",
    "totalQuestions": 6,
    "correctCount": 6,
    "incorrectCount": 0,
    "skippedCount": 0,
    "scorePercent": 100,
    "passed": true,
    "totalTimeSpentSeconds": 181,
    "submittedAt": "2026-10-30T22:38:52.283Z",
    "attempts": [
      {
        "questionId": "q-cs-01",
        "selectedOptionId": "B",
        "isCorrect": true,
        "timeSpentSeconds": 28
      },
      {
        "questionId": "q-cs-02",
        "selectedOptionId": "C",
        "isCorrect": true,
        "timeSpentSeconds": 26
      },
      {
        "questionId": "q-cs-03",
        "selectedOptionId": "B",
        "isCorrect": true,
        "timeSpentSeconds": 11
      },
      {
        "questionId": "q-cs-04",
        "selectedOptionId": "C",
        "isCorrect": true,
        "timeSpentSeconds": 47
      },
      {
        "questionId": "q-cs-05",
        "selectedOptionId": "A",
        "isCorrect": true,
        "timeSpentSeconds": 31
      },
      {
        "questionId": "q-cs-06",
        "selectedOptionId": "B",
        "isCorrect": true,
        "timeSpentSeconds": 38
      }
    ],
    "studentRegNo": "henry.smith@school.edu"
  },
  {
    "id": "sub-sim-1793419297614-4-fvj9",
    "quizId": "quiz-cs-fundamentals",
    "quizTitle": "Web & Programming Fundamentals",
    "studentName": "Mia Hernandez",
    "studentEmailOrId": "mia.hernandez@school.edu",
    "totalQuestions": 6,
    "correctCount": 2,
    "incorrectCount": 4,
    "skippedCount": 0,
    "scorePercent": 33,
    "passed": false,
    "totalTimeSpentSeconds": 215,
    "submittedAt": "2026-10-28T22:30:59.242Z",
    "attempts": [
      {
        "questionId": "q-cs-01",
        "selectedOptionId": "D",
        "isCorrect": false,
        "timeSpentSeconds": 36
      },
      {
        "questionId": "q-cs-02",
        "selectedOptionId": "C",
        "isCorrect": true,
        "timeSpentSeconds": 47
      },
      {
        "questionId": "q-cs-03",
        "selectedOptionId": "B",
        "isCorrect": true,
        "timeSpentSeconds": 15
      },
      {
        "questionId": "q-cs-04",
        "selectedOptionId": "A",
        "isCorrect": false,
        "timeSpentSeconds": 29
      },
      {
        "questionId": "q-cs-05",
        "selectedOptionId": "D",
        "isCorrect": false,
        "timeSpentSeconds": 35
      },
      {
        "questionId": "q-cs-06",
        "selectedOptionId": "A",
        "isCorrect": false,
        "timeSpentSeconds": 53
      }
    ],
    "studentRegNo": "mia.hernandez@school.edu"
  },
  {
    "id": "sub-sim-1793419297614-5-detk",
    "quizId": "quiz-cs-fundamentals",
    "quizTitle": "Web & Programming Fundamentals",
    "studentName": "Ethan Davis",
    "studentEmailOrId": "ethan.davis@school.edu",
    "totalQuestions": 6,
    "correctCount": 2,
    "incorrectCount": 4,
    "skippedCount": 0,
    "scorePercent": 33,
    "passed": false,
    "totalTimeSpentSeconds": 230,
    "submittedAt": "2026-10-30T05:43:19.244Z",
    "attempts": [
      {
        "questionId": "q-cs-01",
        "selectedOptionId": "B",
        "isCorrect": true,
        "timeSpentSeconds": 35
      },
      {
        "questionId": "q-cs-02",
        "selectedOptionId": "A",
        "isCorrect": false,
        "timeSpentSeconds": 44
      },
      {
        "questionId": "q-cs-03",
        "selectedOptionId": "B",
        "isCorrect": true,
        "timeSpentSeconds": 19
      },
      {
        "questionId": "q-cs-04",
        "selectedOptionId": "D",
        "isCorrect": false,
        "timeSpentSeconds": 54
      },
      {
        "questionId": "q-cs-05",
        "selectedOptionId": "C",
        "isCorrect": false,
        "timeSpentSeconds": 33
      },
      {
        "questionId": "q-cs-06",
        "selectedOptionId": "C",
        "isCorrect": false,
        "timeSpentSeconds": 45
      }
    ],
    "studentRegNo": "ethan.davis@school.edu"
  },
  {
    "id": "sub-sim-1793419297614-6-u2p4",
    "quizId": "quiz-cs-fundamentals",
    "quizTitle": "Web & Programming Fundamentals",
    "studentName": "Olivia Hernandez",
    "studentEmailOrId": "olivia.hernandez@school.edu",
    "totalQuestions": 6,
    "correctCount": 6,
    "incorrectCount": 0,
    "skippedCount": 0,
    "scorePercent": 100,
    "passed": true,
    "totalTimeSpentSeconds": 185,
    "submittedAt": "2026-10-29T03:01:08.789Z",
    "attempts": [
      {
        "questionId": "q-cs-01",
        "selectedOptionId": "B",
        "isCorrect": true,
        "timeSpentSeconds": 31
      },
      {
        "questionId": "q-cs-02",
        "selectedOptionId": "C",
        "isCorrect": true,
        "timeSpentSeconds": 44
      },
      {
        "questionId": "q-cs-03",
        "selectedOptionId": "B",
        "isCorrect": true,
        "timeSpentSeconds": 13
      },
      {
        "questionId": "q-cs-04",
        "selectedOptionId": "C",
        "isCorrect": true,
        "timeSpentSeconds": 37
      },
      {
        "questionId": "q-cs-05",
        "selectedOptionId": "A",
        "isCorrect": true,
        "timeSpentSeconds": 28
      },
      {
        "questionId": "q-cs-06",
        "selectedOptionId": "B",
        "isCorrect": true,
        "timeSpentSeconds": 32
      }
    ],
    "studentRegNo": "olivia.hernandez@school.edu"
  },
  {
    "id": "sub-sim-1793419297614-7-7m7x",
    "quizId": "quiz-cs-fundamentals",
    "quizTitle": "Web & Programming Fundamentals",
    "studentName": "Liam Anderson",
    "studentEmailOrId": "liam.anderson@school.edu",
    "totalQuestions": 6,
    "correctCount": 4,
    "incorrectCount": 2,
    "skippedCount": 0,
    "scorePercent": 67,
    "passed": false,
    "totalTimeSpentSeconds": 220,
    "submittedAt": "2026-10-30T10:15:21.648Z",
    "attempts": [
      {
        "questionId": "q-cs-01",
        "selectedOptionId": "B",
        "isCorrect": true,
        "timeSpentSeconds": 33
      },
      {
        "questionId": "q-cs-02",
        "selectedOptionId": "C",
        "isCorrect": true,
        "timeSpentSeconds": 51
      },
      {
        "questionId": "q-cs-03",
        "selectedOptionId": "B",
        "isCorrect": true,
        "timeSpentSeconds": 17
      },
      {
        "questionId": "q-cs-04",
        "selectedOptionId": "B",
        "isCorrect": false,
        "timeSpentSeconds": 53
      },
      {
        "questionId": "q-cs-05",
        "selectedOptionId": "A",
        "isCorrect": true,
        "timeSpentSeconds": 36
      },
      {
        "questionId": "q-cs-06",
        "selectedOptionId": "C",
        "isCorrect": false,
        "timeSpentSeconds": 30
      }
    ],
    "studentRegNo": "liam.anderson@school.edu"
  },
  {
    "id": "sub-sim-1793419297190-0-6bt3",
    "quizId": "quiz-cs-fundamentals",
    "quizTitle": "Web & Programming Fundamentals",
    "studentName": "Isabella Garcia",
    "studentEmailOrId": "isabella.garcia@school.edu",
    "totalQuestions": 6,
    "correctCount": 3,
    "incorrectCount": 3,
    "skippedCount": 0,
    "scorePercent": 50,
    "passed": false,
    "totalTimeSpentSeconds": 185,
    "submittedAt": "2026-10-28T10:33:37.185Z",
    "attempts": [
      {
        "questionId": "q-cs-01",
        "selectedOptionId": "B",
        "isCorrect": true,
        "timeSpentSeconds": 21
      },
      {
        "questionId": "q-cs-02",
        "selectedOptionId": "B",
        "isCorrect": false,
        "timeSpentSeconds": 36
      },
      {
        "questionId": "q-cs-03",
        "selectedOptionId": "C",
        "isCorrect": false,
        "timeSpentSeconds": 24
      },
      {
        "questionId": "q-cs-04",
        "selectedOptionId": "C",
        "isCorrect": true,
        "timeSpentSeconds": 41
      },
      {
        "questionId": "q-cs-05",
        "selectedOptionId": "A",
        "isCorrect": true,
        "timeSpentSeconds": 13
      },
      {
        "questionId": "q-cs-06",
        "selectedOptionId": "C",
        "isCorrect": false,
        "timeSpentSeconds": 50
      }
    ],
    "studentRegNo": "isabella.garcia@school.edu"
  },
  {
    "id": "sub-sim-1793419297190-1-rf6b",
    "quizId": "quiz-cs-fundamentals",
    "quizTitle": "Web & Programming Fundamentals",
    "studentName": "Henry Johnson",
    "studentEmailOrId": "henry.johnson@school.edu",
    "totalQuestions": 6,
    "correctCount": 3,
    "incorrectCount": 3,
    "skippedCount": 0,
    "scorePercent": 50,
    "passed": false,
    "totalTimeSpentSeconds": 208,
    "submittedAt": "2026-10-29T07:26:00.273Z",
    "attempts": [
      {
        "questionId": "q-cs-01",
        "selectedOptionId": "B",
        "isCorrect": true,
        "timeSpentSeconds": 12
      },
      {
        "questionId": "q-cs-02",
        "selectedOptionId": "A",
        "isCorrect": false,
        "timeSpentSeconds": 52
      },
      {
        "questionId": "q-cs-03",
        "selectedOptionId": "D",
        "isCorrect": false,
        "timeSpentSeconds": 22
      },
      {
        "questionId": "q-cs-04",
        "selectedOptionId": "B",
        "isCorrect": false,
        "timeSpentSeconds": 51
      },
      {
        "questionId": "q-cs-05",
        "selectedOptionId": "A",
        "isCorrect": true,
        "timeSpentSeconds": 31
      },
      {
        "questionId": "q-cs-06",
        "selectedOptionId": "B",
        "isCorrect": true,
        "timeSpentSeconds": 40
      }
    ],
    "studentRegNo": "henry.johnson@school.edu"
  },
  {
    "id": "sub-sim-1793419297190-2-r8ew",
    "quizId": "quiz-cs-fundamentals",
    "quizTitle": "Web & Programming Fundamentals",
    "studentName": "Liam Davis",
    "studentEmailOrId": "liam.davis@school.edu",
    "totalQuestions": 6,
    "correctCount": 4,
    "incorrectCount": 2,
    "skippedCount": 0,
    "scorePercent": 67,
    "passed": false,
    "totalTimeSpentSeconds": 196,
    "submittedAt": "2026-10-30T17:08:40.451Z",
    "attempts": [
      {
        "questionId": "q-cs-01",
        "selectedOptionId": "B",
        "isCorrect": true,
        "timeSpentSeconds": 33
      },
      {
        "questionId": "q-cs-02",
        "selectedOptionId": "D",
        "isCorrect": false,
        "timeSpentSeconds": 48
      },
      {
        "questionId": "q-cs-03",
        "selectedOptionId": "B",
        "isCorrect": true,
        "timeSpentSeconds": 17
      },
      {
        "questionId": "q-cs-04",
        "selectedOptionId": "C",
        "isCorrect": true,
        "timeSpentSeconds": 42
      },
      {
        "questionId": "q-cs-05",
        "selectedOptionId": "A",
        "isCorrect": true,
        "timeSpentSeconds": 22
      },
      {
        "questionId": "q-cs-06",
        "selectedOptionId": "A",
        "isCorrect": false,
        "timeSpentSeconds": 34
      }
    ],
    "studentRegNo": "liam.davis@school.edu"
  },
  {
    "id": "sub-sim-1793419297190-3-zeq1",
    "quizId": "quiz-cs-fundamentals",
    "quizTitle": "Web & Programming Fundamentals",
    "studentName": "Sophia Johnson",
    "studentEmailOrId": "sophia.johnson@school.edu",
    "totalQuestions": 6,
    "correctCount": 5,
    "incorrectCount": 1,
    "skippedCount": 0,
    "scorePercent": 83,
    "passed": true,
    "totalTimeSpentSeconds": 190,
    "submittedAt": "2026-10-30T05:14:56.991Z",
    "attempts": [
      {
        "questionId": "q-cs-01",
        "selectedOptionId": "D",
        "isCorrect": false,
        "timeSpentSeconds": 20
      },
      {
        "questionId": "q-cs-02",
        "selectedOptionId": "C",
        "isCorrect": true,
        "timeSpentSeconds": 27
      },
      {
        "questionId": "q-cs-03",
        "selectedOptionId": "B",
        "isCorrect": true,
        "timeSpentSeconds": 21
      },
      {
        "questionId": "q-cs-04",
        "selectedOptionId": "C",
        "isCorrect": true,
        "timeSpentSeconds": 42
      },
      {
        "questionId": "q-cs-05",
        "selectedOptionId": "A",
        "isCorrect": true,
        "timeSpentSeconds": 33
      },
      {
        "questionId": "q-cs-06",
        "selectedOptionId": "B",
        "isCorrect": true,
        "timeSpentSeconds": 47
      }
    ],
    "studentRegNo": "sophia.johnson@school.edu"
  },
  {
    "id": "sub-sim-1793419297190-4-cd3r",
    "quizId": "quiz-cs-fundamentals",
    "quizTitle": "Web & Programming Fundamentals",
    "studentName": "William Davis",
    "studentEmailOrId": "william.davis@school.edu",
    "totalQuestions": 6,
    "correctCount": 4,
    "incorrectCount": 2,
    "skippedCount": 0,
    "scorePercent": 67,
    "passed": false,
    "totalTimeSpentSeconds": 190,
    "submittedAt": "2026-10-29T20:46:13.814Z",
    "attempts": [
      {
        "questionId": "q-cs-01",
        "selectedOptionId": "B",
        "isCorrect": true,
        "timeSpentSeconds": 35
      },
      {
        "questionId": "q-cs-02",
        "selectedOptionId": "D",
        "isCorrect": false,
        "timeSpentSeconds": 25
      },
      {
        "questionId": "q-cs-03",
        "selectedOptionId": "B",
        "isCorrect": true,
        "timeSpentSeconds": 23
      },
      {
        "questionId": "q-cs-04",
        "selectedOptionId": "D",
        "isCorrect": false,
        "timeSpentSeconds": 54
      },
      {
        "questionId": "q-cs-05",
        "selectedOptionId": "A",
        "isCorrect": true,
        "timeSpentSeconds": 12
      },
      {
        "questionId": "q-cs-06",
        "selectedOptionId": "B",
        "isCorrect": true,
        "timeSpentSeconds": 41
      }
    ],
    "studentRegNo": "william.davis@school.edu"
  },
  {
    "id": "sub-sim-1793419297190-5-zmf6",
    "quizId": "quiz-cs-fundamentals",
    "quizTitle": "Web & Programming Fundamentals",
    "studentName": "Sophia Davis",
    "studentEmailOrId": "sophia.davis@school.edu",
    "totalQuestions": 6,
    "correctCount": 6,
    "incorrectCount": 0,
    "skippedCount": 0,
    "scorePercent": 100,
    "passed": true,
    "totalTimeSpentSeconds": 193,
    "submittedAt": "2026-10-30T04:56:23.206Z",
    "attempts": [
      {
        "questionId": "q-cs-01",
        "selectedOptionId": "B",
        "isCorrect": true,
        "timeSpentSeconds": 15
      },
      {
        "questionId": "q-cs-02",
        "selectedOptionId": "C",
        "isCorrect": true,
        "timeSpentSeconds": 48
      },
      {
        "questionId": "q-cs-03",
        "selectedOptionId": "B",
        "isCorrect": true,
        "timeSpentSeconds": 32
      },
      {
        "questionId": "q-cs-04",
        "selectedOptionId": "C",
        "isCorrect": true,
        "timeSpentSeconds": 40
      },
      {
        "questionId": "q-cs-05",
        "selectedOptionId": "A",
        "isCorrect": true,
        "timeSpentSeconds": 26
      },
      {
        "questionId": "q-cs-06",
        "selectedOptionId": "B",
        "isCorrect": true,
        "timeSpentSeconds": 32
      }
    ],
    "studentRegNo": "sophia.davis@school.edu"
  },
  {
    "id": "sub-sim-1793419297190-6-umec",
    "quizId": "quiz-cs-fundamentals",
    "quizTitle": "Web & Programming Fundamentals",
    "studentName": "Charlotte Martinez",
    "studentEmailOrId": "charlotte.martinez@school.edu",
    "totalQuestions": 6,
    "correctCount": 5,
    "incorrectCount": 1,
    "skippedCount": 0,
    "scorePercent": 83,
    "passed": true,
    "totalTimeSpentSeconds": 182,
    "submittedAt": "2026-10-29T04:27:33.023Z",
    "attempts": [
      {
        "questionId": "q-cs-01",
        "selectedOptionId": "B",
        "isCorrect": true,
        "timeSpentSeconds": 11
      },
      {
        "questionId": "q-cs-02",
        "selectedOptionId": "C",
        "isCorrect": true,
        "timeSpentSeconds": 35
      },
      {
        "questionId": "q-cs-03",
        "selectedOptionId": "B",
        "isCorrect": true,
        "timeSpentSeconds": 29
      },
      {
        "questionId": "q-cs-04",
        "selectedOptionId": "C",
        "isCorrect": true,
        "timeSpentSeconds": 50
      },
      {
        "questionId": "q-cs-05",
        "selectedOptionId": "A",
        "isCorrect": true,
        "timeSpentSeconds": 20
      },
      {
        "questionId": "q-cs-06",
        "selectedOptionId": "D",
        "isCorrect": false,
        "timeSpentSeconds": 37
      }
    ],
    "studentRegNo": "charlotte.martinez@school.edu"
  },
  {
    "id": "sub-sim-1793419297190-7-g9wf",
    "quizId": "quiz-cs-fundamentals",
    "quizTitle": "Web & Programming Fundamentals",
    "studentName": "Olivia Johnson",
    "studentEmailOrId": "olivia.johnson@school.edu",
    "totalQuestions": 6,
    "correctCount": 3,
    "incorrectCount": 3,
    "skippedCount": 0,
    "scorePercent": 50,
    "passed": false,
    "totalTimeSpentSeconds": 172,
    "submittedAt": "2026-10-29T08:31:11.199Z",
    "attempts": [
      {
        "questionId": "q-cs-01",
        "selectedOptionId": "B",
        "isCorrect": true,
        "timeSpentSeconds": 31
      },
      {
        "questionId": "q-cs-02",
        "selectedOptionId": "C",
        "isCorrect": true,
        "timeSpentSeconds": 40
      },
      {
        "questionId": "q-cs-03",
        "selectedOptionId": "B",
        "isCorrect": true,
        "timeSpentSeconds": 24
      },
      {
        "questionId": "q-cs-04",
        "selectedOptionId": "D",
        "isCorrect": false,
        "timeSpentSeconds": 35
      },
      {
        "questionId": "q-cs-05",
        "selectedOptionId": "B",
        "isCorrect": false,
        "timeSpentSeconds": 17
      },
      {
        "questionId": "q-cs-06",
        "selectedOptionId": "D",
        "isCorrect": false,
        "timeSpentSeconds": 25
      }
    ],
    "studentRegNo": "olivia.johnson@school.edu"
  },
  {
    "id": "sub-sim-1793419296797-0-t78p",
    "quizId": "quiz-cs-fundamentals",
    "quizTitle": "Web & Programming Fundamentals",
    "studentName": "William Miller",
    "studentEmailOrId": "william.miller@school.edu",
    "totalQuestions": 6,
    "correctCount": 5,
    "incorrectCount": 1,
    "skippedCount": 0,
    "scorePercent": 83,
    "passed": true,
    "totalTimeSpentSeconds": 177,
    "submittedAt": "2026-10-28T08:58:16.026Z",
    "attempts": [
      {
        "questionId": "q-cs-01",
        "selectedOptionId": "B",
        "isCorrect": true,
        "timeSpentSeconds": 13
      },
      {
        "questionId": "q-cs-02",
        "selectedOptionId": "C",
        "isCorrect": true,
        "timeSpentSeconds": 28
      },
      {
        "questionId": "q-cs-03",
        "selectedOptionId": "B",
        "isCorrect": true,
        "timeSpentSeconds": 14
      },
      {
        "questionId": "q-cs-04",
        "selectedOptionId": "C",
        "isCorrect": true,
        "timeSpentSeconds": 51
      },
      {
        "questionId": "q-cs-05",
        "selectedOptionId": "C",
        "isCorrect": false,
        "timeSpentSeconds": 39
      },
      {
        "questionId": "q-cs-06",
        "selectedOptionId": "B",
        "isCorrect": true,
        "timeSpentSeconds": 32
      }
    ],
    "studentRegNo": "william.miller@school.edu"
  },
  {
    "id": "sub-sim-1793419296797-1-k4p8",
    "quizId": "quiz-cs-fundamentals",
    "quizTitle": "Web & Programming Fundamentals",
    "studentName": "Liam Martinez",
    "studentEmailOrId": "liam.martinez@school.edu",
    "totalQuestions": 6,
    "correctCount": 5,
    "incorrectCount": 1,
    "skippedCount": 0,
    "scorePercent": 83,
    "passed": true,
    "totalTimeSpentSeconds": 161,
    "submittedAt": "2026-10-30T10:57:01.610Z",
    "attempts": [
      {
        "questionId": "q-cs-01",
        "selectedOptionId": "C",
        "isCorrect": false,
        "timeSpentSeconds": 12
      },
      {
        "questionId": "q-cs-02",
        "selectedOptionId": "C",
        "isCorrect": true,
        "timeSpentSeconds": 26
      },
      {
        "questionId": "q-cs-03",
        "selectedOptionId": "B",
        "isCorrect": true,
        "timeSpentSeconds": 18
      },
      {
        "questionId": "q-cs-04",
        "selectedOptionId": "C",
        "isCorrect": true,
        "timeSpentSeconds": 32
      },
      {
        "questionId": "q-cs-05",
        "selectedOptionId": "A",
        "isCorrect": true,
        "timeSpentSeconds": 36
      },
      {
        "questionId": "q-cs-06",
        "selectedOptionId": "B",
        "isCorrect": true,
        "timeSpentSeconds": 37
      }
    ],
    "studentRegNo": "liam.martinez@school.edu"
  },
  {
    "id": "sub-sim-1793419296797-2-ahqq",
    "quizId": "quiz-cs-fundamentals",
    "quizTitle": "Web & Programming Fundamentals",
    "studentName": "Charlotte Brown",
    "studentEmailOrId": "charlotte.brown@school.edu",
    "totalQuestions": 6,
    "correctCount": 4,
    "incorrectCount": 2,
    "skippedCount": 0,
    "scorePercent": 67,
    "passed": false,
    "totalTimeSpentSeconds": 170,
    "submittedAt": "2026-10-30T16:24:55.690Z",
    "attempts": [
      {
        "questionId": "q-cs-01",
        "selectedOptionId": "B",
        "isCorrect": true,
        "timeSpentSeconds": 30
      },
      {
        "questionId": "q-cs-02",
        "selectedOptionId": "C",
        "isCorrect": true,
        "timeSpentSeconds": 25
      },
      {
        "questionId": "q-cs-03",
        "selectedOptionId": "A",
        "isCorrect": false,
        "timeSpentSeconds": 23
      },
      {
        "questionId": "q-cs-04",
        "selectedOptionId": "C",
        "isCorrect": true,
        "timeSpentSeconds": 44
      },
      {
        "questionId": "q-cs-05",
        "selectedOptionId": "C",
        "isCorrect": false,
        "timeSpentSeconds": 13
      },
      {
        "questionId": "q-cs-06",
        "selectedOptionId": "B",
        "isCorrect": true,
        "timeSpentSeconds": 35
      }
    ],
    "studentRegNo": "charlotte.brown@school.edu"
  },
  {
    "id": "sub-sim-1793419296797-3-zayh",
    "quizId": "quiz-cs-fundamentals",
    "quizTitle": "Web & Programming Fundamentals",
    "studentName": "Henry Rodriguez",
    "studentEmailOrId": "henry.rodriguez@school.edu",
    "totalQuestions": 6,
    "correctCount": 6,
    "incorrectCount": 0,
    "skippedCount": 0,
    "scorePercent": 100,
    "passed": true,
    "totalTimeSpentSeconds": 198,
    "submittedAt": "2026-10-29T04:46:27.293Z",
    "attempts": [
      {
        "questionId": "q-cs-01",
        "selectedOptionId": "B",
        "isCorrect": true,
        "timeSpentSeconds": 15
      },
      {
        "questionId": "q-cs-02",
        "selectedOptionId": "C",
        "isCorrect": true,
        "timeSpentSeconds": 36
      },
      {
        "questionId": "q-cs-03",
        "selectedOptionId": "B",
        "isCorrect": true,
        "timeSpentSeconds": 21
      },
      {
        "questionId": "q-cs-04",
        "selectedOptionId": "C",
        "isCorrect": true,
        "timeSpentSeconds": 41
      },
      {
        "questionId": "q-cs-05",
        "selectedOptionId": "A",
        "isCorrect": true,
        "timeSpentSeconds": 32
      },
      {
        "questionId": "q-cs-06",
        "selectedOptionId": "B",
        "isCorrect": true,
        "timeSpentSeconds": 53
      }
    ],
    "studentRegNo": "henry.rodriguez@school.edu"
  },
  {
    "id": "sub-sim-1793419296797-4-uqqz",
    "quizId": "quiz-cs-fundamentals",
    "quizTitle": "Web & Programming Fundamentals",
    "studentName": "James Martinez",
    "studentEmailOrId": "james.martinez@school.edu",
    "totalQuestions": 6,
    "correctCount": 4,
    "incorrectCount": 2,
    "skippedCount": 0,
    "scorePercent": 67,
    "passed": false,
    "totalTimeSpentSeconds": 224,
    "submittedAt": "2026-10-29T17:32:30.912Z",
    "attempts": [
      {
        "questionId": "q-cs-01",
        "selectedOptionId": "B",
        "isCorrect": true,
        "timeSpentSeconds": 24
      },
      {
        "questionId": "q-cs-02",
        "selectedOptionId": "C",
        "isCorrect": true,
        "timeSpentSeconds": 38
      },
      {
        "questionId": "q-cs-03",
        "selectedOptionId": "B",
        "isCorrect": true,
        "timeSpentSeconds": 38
      },
      {
        "questionId": "q-cs-04",
        "selectedOptionId": "B",
        "isCorrect": false,
        "timeSpentSeconds": 40
      },
      {
        "questionId": "q-cs-05",
        "selectedOptionId": "A",
        "isCorrect": true,
        "timeSpentSeconds": 35
      },
      {
        "questionId": "q-cs-06",
        "selectedOptionId": "A",
        "isCorrect": false,
        "timeSpentSeconds": 49
      }
    ],
    "studentRegNo": "james.martinez@school.edu"
  },
  {
    "id": "sub-sim-1793419296797-5-gtf5",
    "quizId": "quiz-cs-fundamentals",
    "quizTitle": "Web & Programming Fundamentals",
    "studentName": "Sophia Rodriguez",
    "studentEmailOrId": "sophia.rodriguez@school.edu",
    "totalQuestions": 6,
    "correctCount": 2,
    "incorrectCount": 4,
    "skippedCount": 0,
    "scorePercent": 33,
    "passed": false,
    "totalTimeSpentSeconds": 210,
    "submittedAt": "2026-10-28T13:07:30.641Z",
    "attempts": [
      {
        "questionId": "q-cs-01",
        "selectedOptionId": "A",
        "isCorrect": false,
        "timeSpentSeconds": 15
      },
      {
        "questionId": "q-cs-02",
        "selectedOptionId": "B",
        "isCorrect": false,
        "timeSpentSeconds": 45
      },
      {
        "questionId": "q-cs-03",
        "selectedOptionId": "B",
        "isCorrect": true,
        "timeSpentSeconds": 33
      },
      {
        "questionId": "q-cs-04",
        "selectedOptionId": "C",
        "isCorrect": true,
        "timeSpentSeconds": 51
      },
      {
        "questionId": "q-cs-05",
        "selectedOptionId": "B",
        "isCorrect": false,
        "timeSpentSeconds": 33
      },
      {
        "questionId": "q-cs-06",
        "selectedOptionId": "C",
        "isCorrect": false,
        "timeSpentSeconds": 33
      }
    ],
    "studentRegNo": "sophia.rodriguez@school.edu"
  },
  {
    "id": "sub-sim-1793419296797-6-oiy6",
    "quizId": "quiz-cs-fundamentals",
    "quizTitle": "Web & Programming Fundamentals",
    "studentName": "Noah Anderson",
    "studentEmailOrId": "noah.anderson@school.edu",
    "totalQuestions": 6,
    "correctCount": 2,
    "incorrectCount": 4,
    "skippedCount": 0,
    "scorePercent": 33,
    "passed": false,
    "totalTimeSpentSeconds": 215,
    "submittedAt": "2026-10-29T23:13:33.420Z",
    "attempts": [
      {
        "questionId": "q-cs-01",
        "selectedOptionId": "D",
        "isCorrect": false,
        "timeSpentSeconds": 15
      },
      {
        "questionId": "q-cs-02",
        "selectedOptionId": "C",
        "isCorrect": true,
        "timeSpentSeconds": 47
      },
      {
        "questionId": "q-cs-03",
        "selectedOptionId": "C",
        "isCorrect": false,
        "timeSpentSeconds": 25
      },
      {
        "questionId": "q-cs-04",
        "selectedOptionId": "B",
        "isCorrect": false,
        "timeSpentSeconds": 51
      },
      {
        "questionId": "q-cs-05",
        "selectedOptionId": "A",
        "isCorrect": true,
        "timeSpentSeconds": 37
      },
      {
        "questionId": "q-cs-06",
        "selectedOptionId": "A",
        "isCorrect": false,
        "timeSpentSeconds": 40
      }
    ],
    "studentRegNo": "noah.anderson@school.edu"
  },
  {
    "id": "sub-sim-1793419296797-7-l066",
    "quizId": "quiz-cs-fundamentals",
    "quizTitle": "Web & Programming Fundamentals",
    "studentName": "Mia Miller",
    "studentEmailOrId": "mia.miller@school.edu",
    "totalQuestions": 6,
    "correctCount": 6,
    "incorrectCount": 0,
    "skippedCount": 0,
    "scorePercent": 100,
    "passed": true,
    "totalTimeSpentSeconds": 211,
    "submittedAt": "2026-10-29T05:46:39.833Z",
    "attempts": [
      {
        "questionId": "q-cs-01",
        "selectedOptionId": "B",
        "isCorrect": true,
        "timeSpentSeconds": 31
      },
      {
        "questionId": "q-cs-02",
        "selectedOptionId": "C",
        "isCorrect": true,
        "timeSpentSeconds": 40
      },
      {
        "questionId": "q-cs-03",
        "selectedOptionId": "B",
        "isCorrect": true,
        "timeSpentSeconds": 12
      },
      {
        "questionId": "q-cs-04",
        "selectedOptionId": "C",
        "isCorrect": true,
        "timeSpentSeconds": 51
      },
      {
        "questionId": "q-cs-05",
        "selectedOptionId": "A",
        "isCorrect": true,
        "timeSpentSeconds": 34
      },
      {
        "questionId": "q-cs-06",
        "selectedOptionId": "B",
        "isCorrect": true,
        "timeSpentSeconds": 43
      }
    ],
    "studentRegNo": "mia.miller@school.edu"
  },
  {
    "id": "sub-sim-1793419296350-0-n30q",
    "quizId": "quiz-cs-fundamentals",
    "quizTitle": "Web & Programming Fundamentals",
    "studentName": "Ava Rodriguez",
    "studentEmailOrId": "ava.rodriguez@school.edu",
    "totalQuestions": 6,
    "correctCount": 6,
    "incorrectCount": 0,
    "skippedCount": 0,
    "scorePercent": 100,
    "passed": true,
    "totalTimeSpentSeconds": 192,
    "submittedAt": "2026-10-29T11:54:40.138Z",
    "attempts": [
      {
        "questionId": "q-cs-01",
        "selectedOptionId": "B",
        "isCorrect": true,
        "timeSpentSeconds": 30
      },
      {
        "questionId": "q-cs-02",
        "selectedOptionId": "C",
        "isCorrect": true,
        "timeSpentSeconds": 26
      },
      {
        "questionId": "q-cs-03",
        "selectedOptionId": "B",
        "isCorrect": true,
        "timeSpentSeconds": 26
      },
      {
        "questionId": "q-cs-04",
        "selectedOptionId": "C",
        "isCorrect": true,
        "timeSpentSeconds": 26
      },
      {
        "questionId": "q-cs-05",
        "selectedOptionId": "A",
        "isCorrect": true,
        "timeSpentSeconds": 32
      },
      {
        "questionId": "q-cs-06",
        "selectedOptionId": "B",
        "isCorrect": true,
        "timeSpentSeconds": 52
      }
    ],
    "studentRegNo": "ava.rodriguez@school.edu"
  },
  {
    "id": "sub-sim-1793419296350-1-uhmf",
    "quizId": "quiz-cs-fundamentals",
    "quizTitle": "Web & Programming Fundamentals",
    "studentName": "Olivia Gonzalez",
    "studentEmailOrId": "olivia.gonzalez@school.edu",
    "totalQuestions": 6,
    "correctCount": 5,
    "incorrectCount": 1,
    "skippedCount": 0,
    "scorePercent": 83,
    "passed": true,
    "totalTimeSpentSeconds": 218,
    "submittedAt": "2026-10-31T00:19:46.126Z",
    "attempts": [
      {
        "questionId": "q-cs-01",
        "selectedOptionId": "B",
        "isCorrect": true,
        "timeSpentSeconds": 22
      },
      {
        "questionId": "q-cs-02",
        "selectedOptionId": "C",
        "isCorrect": true,
        "timeSpentSeconds": 38
      },
      {
        "questionId": "q-cs-03",
        "selectedOptionId": "B",
        "isCorrect": true,
        "timeSpentSeconds": 36
      },
      {
        "questionId": "q-cs-04",
        "selectedOptionId": "C",
        "isCorrect": true,
        "timeSpentSeconds": 52
      },
      {
        "questionId": "q-cs-05",
        "selectedOptionId": "A",
        "isCorrect": true,
        "timeSpentSeconds": 36
      },
      {
        "questionId": "q-cs-06",
        "selectedOptionId": "A",
        "isCorrect": false,
        "timeSpentSeconds": 34
      }
    ],
    "studentRegNo": "olivia.gonzalez@school.edu"
  },
  {
    "id": "sub-sim-1793419296350-2-tq1e",
    "quizId": "quiz-cs-fundamentals",
    "quizTitle": "Web & Programming Fundamentals",
    "studentName": "Ava Davis",
    "studentEmailOrId": "ava.davis@school.edu",
    "totalQuestions": 6,
    "correctCount": 4,
    "incorrectCount": 2,
    "skippedCount": 0,
    "scorePercent": 67,
    "passed": false,
    "totalTimeSpentSeconds": 204,
    "submittedAt": "2026-10-29T17:38:09.681Z",
    "attempts": [
      {
        "questionId": "q-cs-01",
        "selectedOptionId": "D",
        "isCorrect": false,
        "timeSpentSeconds": 13
      },
      {
        "questionId": "q-cs-02",
        "selectedOptionId": "C",
        "isCorrect": true,
        "timeSpentSeconds": 43
      },
      {
        "questionId": "q-cs-03",
        "selectedOptionId": "B",
        "isCorrect": true,
        "timeSpentSeconds": 28
      },
      {
        "questionId": "q-cs-04",
        "selectedOptionId": "A",
        "isCorrect": false,
        "timeSpentSeconds": 39
      },
      {
        "questionId": "q-cs-05",
        "selectedOptionId": "A",
        "isCorrect": true,
        "timeSpentSeconds": 39
      },
      {
        "questionId": "q-cs-06",
        "selectedOptionId": "B",
        "isCorrect": true,
        "timeSpentSeconds": 42
      }
    ],
    "studentRegNo": "ava.davis@school.edu"
  },
  {
    "id": "sub-sim-1793419296350-3-5zs9",
    "quizId": "quiz-cs-fundamentals",
    "quizTitle": "Web & Programming Fundamentals",
    "studentName": "Mia Williams",
    "studentEmailOrId": "mia.williams@school.edu",
    "totalQuestions": 6,
    "correctCount": 5,
    "incorrectCount": 1,
    "skippedCount": 0,
    "scorePercent": 83,
    "passed": true,
    "totalTimeSpentSeconds": 173,
    "submittedAt": "2026-10-29T01:42:30.671Z",
    "attempts": [
      {
        "questionId": "q-cs-01",
        "selectedOptionId": "B",
        "isCorrect": true,
        "timeSpentSeconds": 23
      },
      {
        "questionId": "q-cs-02",
        "selectedOptionId": "C",
        "isCorrect": true,
        "timeSpentSeconds": 26
      },
      {
        "questionId": "q-cs-03",
        "selectedOptionId": "B",
        "isCorrect": true,
        "timeSpentSeconds": 24
      },
      {
        "questionId": "q-cs-04",
        "selectedOptionId": "C",
        "isCorrect": true,
        "timeSpentSeconds": 36
      },
      {
        "questionId": "q-cs-05",
        "selectedOptionId": "A",
        "isCorrect": true,
        "timeSpentSeconds": 35
      },
      {
        "questionId": "q-cs-06",
        "selectedOptionId": "C",
        "isCorrect": false,
        "timeSpentSeconds": 29
      }
    ],
    "studentRegNo": "mia.williams@school.edu"
  },
  {
    "id": "sub-sim-1793419296350-4-bh7h",
    "quizId": "quiz-cs-fundamentals",
    "quizTitle": "Web & Programming Fundamentals",
    "studentName": "Emma Smith",
    "studentEmailOrId": "emma.smith@school.edu",
    "totalQuestions": 6,
    "correctCount": 5,
    "incorrectCount": 1,
    "skippedCount": 0,
    "scorePercent": 83,
    "passed": true,
    "totalTimeSpentSeconds": 199,
    "submittedAt": "2026-10-30T20:51:04.056Z",
    "attempts": [
      {
        "questionId": "q-cs-01",
        "selectedOptionId": "B",
        "isCorrect": true,
        "timeSpentSeconds": 32
      },
      {
        "questionId": "q-cs-02",
        "selectedOptionId": "C",
        "isCorrect": true,
        "timeSpentSeconds": 45
      },
      {
        "questionId": "q-cs-03",
        "selectedOptionId": "B",
        "isCorrect": true,
        "timeSpentSeconds": 19
      },
      {
        "questionId": "q-cs-04",
        "selectedOptionId": "A",
        "isCorrect": false,
        "timeSpentSeconds": 45
      },
      {
        "questionId": "q-cs-05",
        "selectedOptionId": "A",
        "isCorrect": true,
        "timeSpentSeconds": 13
      },
      {
        "questionId": "q-cs-06",
        "selectedOptionId": "B",
        "isCorrect": true,
        "timeSpentSeconds": 45
      }
    ],
    "studentRegNo": "emma.smith@school.edu"
  },
  {
    "id": "sub-sim-1793419296350-5-2611",
    "quizId": "quiz-cs-fundamentals",
    "quizTitle": "Web & Programming Fundamentals",
    "studentName": "Ava Garcia",
    "studentEmailOrId": "ava.garcia@school.edu",
    "totalQuestions": 6,
    "correctCount": 6,
    "incorrectCount": 0,
    "skippedCount": 0,
    "scorePercent": 100,
    "passed": true,
    "totalTimeSpentSeconds": 197,
    "submittedAt": "2026-10-28T13:00:54.492Z",
    "attempts": [
      {
        "questionId": "q-cs-01",
        "selectedOptionId": "B",
        "isCorrect": true,
        "timeSpentSeconds": 34
      },
      {
        "questionId": "q-cs-02",
        "selectedOptionId": "C",
        "isCorrect": true,
        "timeSpentSeconds": 45
      },
      {
        "questionId": "q-cs-03",
        "selectedOptionId": "B",
        "isCorrect": true,
        "timeSpentSeconds": 30
      },
      {
        "questionId": "q-cs-04",
        "selectedOptionId": "C",
        "isCorrect": true,
        "timeSpentSeconds": 42
      },
      {
        "questionId": "q-cs-05",
        "selectedOptionId": "A",
        "isCorrect": true,
        "timeSpentSeconds": 13
      },
      {
        "questionId": "q-cs-06",
        "selectedOptionId": "B",
        "isCorrect": true,
        "timeSpentSeconds": 33
      }
    ],
    "studentRegNo": "ava.garcia@school.edu"
  },
  {
    "id": "sub-sim-1793419296350-6-a9vr",
    "quizId": "quiz-cs-fundamentals",
    "quizTitle": "Web & Programming Fundamentals",
    "studentName": "Charlotte Martinez",
    "studentEmailOrId": "charlotte.martinez@school.edu",
    "totalQuestions": 6,
    "correctCount": 6,
    "incorrectCount": 0,
    "skippedCount": 0,
    "scorePercent": 100,
    "passed": true,
    "totalTimeSpentSeconds": 191,
    "submittedAt": "2026-10-30T08:38:10.018Z",
    "attempts": [
      {
        "questionId": "q-cs-01",
        "selectedOptionId": "B",
        "isCorrect": true,
        "timeSpentSeconds": 20
      },
      {
        "questionId": "q-cs-02",
        "selectedOptionId": "C",
        "isCorrect": true,
        "timeSpentSeconds": 33
      },
      {
        "questionId": "q-cs-03",
        "selectedOptionId": "B",
        "isCorrect": true,
        "timeSpentSeconds": 36
      },
      {
        "questionId": "q-cs-04",
        "selectedOptionId": "C",
        "isCorrect": true,
        "timeSpentSeconds": 29
      },
      {
        "questionId": "q-cs-05",
        "selectedOptionId": "A",
        "isCorrect": true,
        "timeSpentSeconds": 28
      },
      {
        "questionId": "q-cs-06",
        "selectedOptionId": "B",
        "isCorrect": true,
        "timeSpentSeconds": 45
      }
    ],
    "studentRegNo": "charlotte.martinez@school.edu"
  },
  {
    "id": "sub-sim-1793419296350-7-bwm5",
    "quizId": "quiz-cs-fundamentals",
    "quizTitle": "Web & Programming Fundamentals",
    "studentName": "Ethan Johnson",
    "studentEmailOrId": "ethan.johnson@school.edu",
    "totalQuestions": 6,
    "correctCount": 5,
    "incorrectCount": 1,
    "skippedCount": 0,
    "scorePercent": 83,
    "passed": true,
    "totalTimeSpentSeconds": 186,
    "submittedAt": "2026-10-28T22:19:38.435Z",
    "attempts": [
      {
        "questionId": "q-cs-01",
        "selectedOptionId": "D",
        "isCorrect": false,
        "timeSpentSeconds": 18
      },
      {
        "questionId": "q-cs-02",
        "selectedOptionId": "C",
        "isCorrect": true,
        "timeSpentSeconds": 42
      },
      {
        "questionId": "q-cs-03",
        "selectedOptionId": "B",
        "isCorrect": true,
        "timeSpentSeconds": 24
      },
      {
        "questionId": "q-cs-04",
        "selectedOptionId": "C",
        "isCorrect": true,
        "timeSpentSeconds": 54
      },
      {
        "questionId": "q-cs-05",
        "selectedOptionId": "A",
        "isCorrect": true,
        "timeSpentSeconds": 20
      },
      {
        "questionId": "q-cs-06",
        "selectedOptionId": "B",
        "isCorrect": true,
        "timeSpentSeconds": 28
      }
    ],
    "studentRegNo": "ethan.johnson@school.edu"
  },
  {
    "id": "sub-sim-1793419295869-0-ppnv",
    "quizId": "quiz-cs-fundamentals",
    "quizTitle": "Web & Programming Fundamentals",
    "studentName": "Mason Garcia",
    "studentEmailOrId": "mason.garcia@school.edu",
    "totalQuestions": 6,
    "correctCount": 6,
    "incorrectCount": 0,
    "skippedCount": 0,
    "scorePercent": 100,
    "passed": true,
    "totalTimeSpentSeconds": 171,
    "submittedAt": "2026-10-29T11:22:53.532Z",
    "attempts": [
      {
        "questionId": "q-cs-01",
        "selectedOptionId": "B",
        "isCorrect": true,
        "timeSpentSeconds": 27
      },
      {
        "questionId": "q-cs-02",
        "selectedOptionId": "C",
        "isCorrect": true,
        "timeSpentSeconds": 30
      },
      {
        "questionId": "q-cs-03",
        "selectedOptionId": "B",
        "isCorrect": true,
        "timeSpentSeconds": 12
      },
      {
        "questionId": "q-cs-04",
        "selectedOptionId": "C",
        "isCorrect": true,
        "timeSpentSeconds": 46
      },
      {
        "questionId": "q-cs-05",
        "selectedOptionId": "A",
        "isCorrect": true,
        "timeSpentSeconds": 11
      },
      {
        "questionId": "q-cs-06",
        "selectedOptionId": "B",
        "isCorrect": true,
        "timeSpentSeconds": 45
      }
    ],
    "studentRegNo": "mason.garcia@school.edu"
  },
  {
    "id": "sub-sim-1793419295869-1-9m31",
    "quizId": "quiz-cs-fundamentals",
    "quizTitle": "Web & Programming Fundamentals",
    "studentName": "Ethan Johnson",
    "studentEmailOrId": "ethan.johnson@school.edu",
    "totalQuestions": 6,
    "correctCount": 6,
    "incorrectCount": 0,
    "skippedCount": 0,
    "scorePercent": 100,
    "passed": true,
    "totalTimeSpentSeconds": 176,
    "submittedAt": "2026-10-29T02:24:48.688Z",
    "attempts": [
      {
        "questionId": "q-cs-01",
        "selectedOptionId": "B",
        "isCorrect": true,
        "timeSpentSeconds": 15
      },
      {
        "questionId": "q-cs-02",
        "selectedOptionId": "C",
        "isCorrect": true,
        "timeSpentSeconds": 33
      },
      {
        "questionId": "q-cs-03",
        "selectedOptionId": "B",
        "isCorrect": true,
        "timeSpentSeconds": 18
      },
      {
        "questionId": "q-cs-04",
        "selectedOptionId": "C",
        "isCorrect": true,
        "timeSpentSeconds": 44
      },
      {
        "questionId": "q-cs-05",
        "selectedOptionId": "A",
        "isCorrect": true,
        "timeSpentSeconds": 34
      },
      {
        "questionId": "q-cs-06",
        "selectedOptionId": "B",
        "isCorrect": true,
        "timeSpentSeconds": 32
      }
    ],
    "studentRegNo": "ethan.johnson@school.edu"
  },
  {
    "id": "sub-sim-1793419295869-2-qudm",
    "quizId": "quiz-cs-fundamentals",
    "quizTitle": "Web & Programming Fundamentals",
    "studentName": "Mia Anderson",
    "studentEmailOrId": "mia.anderson@school.edu",
    "totalQuestions": 6,
    "correctCount": 6,
    "incorrectCount": 0,
    "skippedCount": 0,
    "scorePercent": 100,
    "passed": true,
    "totalTimeSpentSeconds": 166,
    "submittedAt": "2026-10-30T23:42:47.787Z",
    "attempts": [
      {
        "questionId": "q-cs-01",
        "selectedOptionId": "B",
        "isCorrect": true,
        "timeSpentSeconds": 16
      },
      {
        "questionId": "q-cs-02",
        "selectedOptionId": "C",
        "isCorrect": true,
        "timeSpentSeconds": 37
      },
      {
        "questionId": "q-cs-03",
        "selectedOptionId": "B",
        "isCorrect": true,
        "timeSpentSeconds": 16
      },
      {
        "questionId": "q-cs-04",
        "selectedOptionId": "C",
        "isCorrect": true,
        "timeSpentSeconds": 37
      },
      {
        "questionId": "q-cs-05",
        "selectedOptionId": "A",
        "isCorrect": true,
        "timeSpentSeconds": 10
      },
      {
        "questionId": "q-cs-06",
        "selectedOptionId": "B",
        "isCorrect": true,
        "timeSpentSeconds": 50
      }
    ],
    "studentRegNo": "mia.anderson@school.edu"
  },
  {
    "id": "sub-sim-1793419295869-3-483p",
    "quizId": "quiz-cs-fundamentals",
    "quizTitle": "Web & Programming Fundamentals",
    "studentName": "Olivia Johnson",
    "studentEmailOrId": "olivia.johnson@school.edu",
    "totalQuestions": 6,
    "correctCount": 6,
    "incorrectCount": 0,
    "skippedCount": 0,
    "scorePercent": 100,
    "passed": true,
    "totalTimeSpentSeconds": 166,
    "submittedAt": "2026-10-30T17:36:45.665Z",
    "attempts": [
      {
        "questionId": "q-cs-01",
        "selectedOptionId": "B",
        "isCorrect": true,
        "timeSpentSeconds": 13
      },
      {
        "questionId": "q-cs-02",
        "selectedOptionId": "C",
        "isCorrect": true,
        "timeSpentSeconds": 44
      },
      {
        "questionId": "q-cs-03",
        "selectedOptionId": "B",
        "isCorrect": true,
        "timeSpentSeconds": 23
      },
      {
        "questionId": "q-cs-04",
        "selectedOptionId": "C",
        "isCorrect": true,
        "timeSpentSeconds": 30
      },
      {
        "questionId": "q-cs-05",
        "selectedOptionId": "A",
        "isCorrect": true,
        "timeSpentSeconds": 19
      },
      {
        "questionId": "q-cs-06",
        "selectedOptionId": "B",
        "isCorrect": true,
        "timeSpentSeconds": 37
      }
    ],
    "studentRegNo": "olivia.johnson@school.edu"
  },
  {
    "id": "sub-sim-1793419295869-4-rlvu",
    "quizId": "quiz-cs-fundamentals",
    "quizTitle": "Web & Programming Fundamentals",
    "studentName": "Ava Garcia",
    "studentEmailOrId": "ava.garcia@school.edu",
    "totalQuestions": 6,
    "correctCount": 6,
    "incorrectCount": 0,
    "skippedCount": 0,
    "scorePercent": 100,
    "passed": true,
    "totalTimeSpentSeconds": 155,
    "submittedAt": "2026-10-30T21:38:11.721Z",
    "attempts": [
      {
        "questionId": "q-cs-01",
        "selectedOptionId": "B",
        "isCorrect": true,
        "timeSpentSeconds": 10
      },
      {
        "questionId": "q-cs-02",
        "selectedOptionId": "C",
        "isCorrect": true,
        "timeSpentSeconds": 50
      },
      {
        "questionId": "q-cs-03",
        "selectedOptionId": "B",
        "isCorrect": true,
        "timeSpentSeconds": 15
      },
      {
        "questionId": "q-cs-04",
        "selectedOptionId": "C",
        "isCorrect": true,
        "timeSpentSeconds": 35
      },
      {
        "questionId": "q-cs-05",
        "selectedOptionId": "A",
        "isCorrect": true,
        "timeSpentSeconds": 11
      },
      {
        "questionId": "q-cs-06",
        "selectedOptionId": "B",
        "isCorrect": true,
        "timeSpentSeconds": 34
      }
    ],
    "studentRegNo": "ava.garcia@school.edu"
  },
  {
    "id": "sub-sim-1793419295869-5-bgtw",
    "quizId": "quiz-cs-fundamentals",
    "quizTitle": "Web & Programming Fundamentals",
    "studentName": "Henry Johnson",
    "studentEmailOrId": "henry.johnson@school.edu",
    "totalQuestions": 6,
    "correctCount": 5,
    "incorrectCount": 1,
    "skippedCount": 0,
    "scorePercent": 83,
    "passed": true,
    "totalTimeSpentSeconds": 168,
    "submittedAt": "2026-10-30T07:37:10.199Z",
    "attempts": [
      {
        "questionId": "q-cs-01",
        "selectedOptionId": "B",
        "isCorrect": true,
        "timeSpentSeconds": 15
      },
      {
        "questionId": "q-cs-02",
        "selectedOptionId": "C",
        "isCorrect": true,
        "timeSpentSeconds": 37
      },
      {
        "questionId": "q-cs-03",
        "selectedOptionId": "B",
        "isCorrect": true,
        "timeSpentSeconds": 20
      },
      {
        "questionId": "q-cs-04",
        "selectedOptionId": "C",
        "isCorrect": true,
        "timeSpentSeconds": 44
      },
      {
        "questionId": "q-cs-05",
        "selectedOptionId": "A",
        "isCorrect": true,
        "timeSpentSeconds": 15
      },
      {
        "questionId": "q-cs-06",
        "selectedOptionId": "D",
        "isCorrect": false,
        "timeSpentSeconds": 37
      }
    ],
    "studentRegNo": "henry.johnson@school.edu"
  },
  {
    "id": "sub-sim-1793419295869-6-0b1m",
    "quizId": "quiz-cs-fundamentals",
    "quizTitle": "Web & Programming Fundamentals",
    "studentName": "Emma Jones",
    "studentEmailOrId": "emma.jones@school.edu",
    "totalQuestions": 6,
    "correctCount": 5,
    "incorrectCount": 1,
    "skippedCount": 0,
    "scorePercent": 83,
    "passed": true,
    "totalTimeSpentSeconds": 169,
    "submittedAt": "2026-10-29T18:21:18.584Z",
    "attempts": [
      {
        "questionId": "q-cs-01",
        "selectedOptionId": "B",
        "isCorrect": true,
        "timeSpentSeconds": 21
      },
      {
        "questionId": "q-cs-02",
        "selectedOptionId": "C",
        "isCorrect": true,
        "timeSpentSeconds": 46
      },
      {
        "questionId": "q-cs-03",
        "selectedOptionId": "B",
        "isCorrect": true,
        "timeSpentSeconds": 10
      },
      {
        "questionId": "q-cs-04",
        "selectedOptionId": "C",
        "isCorrect": true,
        "timeSpentSeconds": 32
      },
      {
        "questionId": "q-cs-05",
        "selectedOptionId": "D",
        "isCorrect": false,
        "timeSpentSeconds": 32
      },
      {
        "questionId": "q-cs-06",
        "selectedOptionId": "B",
        "isCorrect": true,
        "timeSpentSeconds": 28
      }
    ],
    "studentRegNo": "emma.jones@school.edu"
  },
  {
    "id": "sub-sim-1793419295869-7-zq3l",
    "quizId": "quiz-cs-fundamentals",
    "quizTitle": "Web & Programming Fundamentals",
    "studentName": "Noah Williams",
    "studentEmailOrId": "noah.williams@school.edu",
    "totalQuestions": 6,
    "correctCount": 2,
    "incorrectCount": 4,
    "skippedCount": 0,
    "scorePercent": 33,
    "passed": false,
    "totalTimeSpentSeconds": 209,
    "submittedAt": "2026-10-28T22:27:04.512Z",
    "attempts": [
      {
        "questionId": "q-cs-01",
        "selectedOptionId": "B",
        "isCorrect": true,
        "timeSpentSeconds": 27
      },
      {
        "questionId": "q-cs-02",
        "selectedOptionId": "B",
        "isCorrect": false,
        "timeSpentSeconds": 25
      },
      {
        "questionId": "q-cs-03",
        "selectedOptionId": "A",
        "isCorrect": false,
        "timeSpentSeconds": 30
      },
      {
        "questionId": "q-cs-04",
        "selectedOptionId": "B",
        "isCorrect": false,
        "timeSpentSeconds": 39
      },
      {
        "questionId": "q-cs-05",
        "selectedOptionId": "A",
        "isCorrect": true,
        "timeSpentSeconds": 36
      },
      {
        "questionId": "q-cs-06",
        "selectedOptionId": "A",
        "isCorrect": false,
        "timeSpentSeconds": 52
      }
    ],
    "studentRegNo": "noah.williams@school.edu"
  },
  {
    "id": "sub-sim-1793419295158-0-0fy5",
    "quizId": "quiz-cs-fundamentals",
    "quizTitle": "Web & Programming Fundamentals",
    "studentName": "Lucas Smith",
    "studentEmailOrId": "lucas.smith@school.edu",
    "totalQuestions": 6,
    "correctCount": 5,
    "incorrectCount": 1,
    "skippedCount": 0,
    "scorePercent": 83,
    "passed": true,
    "totalTimeSpentSeconds": 176,
    "submittedAt": "2026-10-31T00:50:32.821Z",
    "attempts": [
      {
        "questionId": "q-cs-01",
        "selectedOptionId": "B",
        "isCorrect": true,
        "timeSpentSeconds": 11
      },
      {
        "questionId": "q-cs-02",
        "selectedOptionId": "C",
        "isCorrect": true,
        "timeSpentSeconds": 34
      },
      {
        "questionId": "q-cs-03",
        "selectedOptionId": "B",
        "isCorrect": true,
        "timeSpentSeconds": 14
      },
      {
        "questionId": "q-cs-04",
        "selectedOptionId": "C",
        "isCorrect": true,
        "timeSpentSeconds": 39
      },
      {
        "questionId": "q-cs-05",
        "selectedOptionId": "A",
        "isCorrect": true,
        "timeSpentSeconds": 31
      },
      {
        "questionId": "q-cs-06",
        "selectedOptionId": "D",
        "isCorrect": false,
        "timeSpentSeconds": 47
      }
    ],
    "studentRegNo": "lucas.smith@school.edu"
  },
  {
    "id": "sub-sim-1793419295158-1-pfds",
    "quizId": "quiz-cs-fundamentals",
    "quizTitle": "Web & Programming Fundamentals",
    "studentName": "Emma Miller",
    "studentEmailOrId": "emma.miller@school.edu",
    "totalQuestions": 6,
    "correctCount": 6,
    "incorrectCount": 0,
    "skippedCount": 0,
    "scorePercent": 100,
    "passed": true,
    "totalTimeSpentSeconds": 212,
    "submittedAt": "2026-10-30T17:57:25.198Z",
    "attempts": [
      {
        "questionId": "q-cs-01",
        "selectedOptionId": "B",
        "isCorrect": true,
        "timeSpentSeconds": 27
      },
      {
        "questionId": "q-cs-02",
        "selectedOptionId": "C",
        "isCorrect": true,
        "timeSpentSeconds": 39
      },
      {
        "questionId": "q-cs-03",
        "selectedOptionId": "B",
        "isCorrect": true,
        "timeSpentSeconds": 17
      },
      {
        "questionId": "q-cs-04",
        "selectedOptionId": "C",
        "isCorrect": true,
        "timeSpentSeconds": 50
      },
      {
        "questionId": "q-cs-05",
        "selectedOptionId": "A",
        "isCorrect": true,
        "timeSpentSeconds": 33
      },
      {
        "questionId": "q-cs-06",
        "selectedOptionId": "B",
        "isCorrect": true,
        "timeSpentSeconds": 46
      }
    ],
    "studentRegNo": "emma.miller@school.edu"
  },
  {
    "id": "sub-sim-1793419295158-2-7eiq",
    "quizId": "quiz-cs-fundamentals",
    "quizTitle": "Web & Programming Fundamentals",
    "studentName": "Ava Garcia",
    "studentEmailOrId": "ava.garcia@school.edu",
    "totalQuestions": 6,
    "correctCount": 5,
    "incorrectCount": 1,
    "skippedCount": 0,
    "scorePercent": 83,
    "passed": true,
    "totalTimeSpentSeconds": 183,
    "submittedAt": "2026-10-28T15:14:56.636Z",
    "attempts": [
      {
        "questionId": "q-cs-01",
        "selectedOptionId": "B",
        "isCorrect": true,
        "timeSpentSeconds": 17
      },
      {
        "questionId": "q-cs-02",
        "selectedOptionId": "C",
        "isCorrect": true,
        "timeSpentSeconds": 33
      },
      {
        "questionId": "q-cs-03",
        "selectedOptionId": "B",
        "isCorrect": true,
        "timeSpentSeconds": 34
      },
      {
        "questionId": "q-cs-04",
        "selectedOptionId": "C",
        "isCorrect": true,
        "timeSpentSeconds": 47
      },
      {
        "questionId": "q-cs-05",
        "selectedOptionId": "A",
        "isCorrect": true,
        "timeSpentSeconds": 17
      },
      {
        "questionId": "q-cs-06",
        "selectedOptionId": "C",
        "isCorrect": false,
        "timeSpentSeconds": 35
      }
    ],
    "studentRegNo": "ava.garcia@school.edu"
  },
  {
    "id": "sub-sim-1793419295158-3-ahxp",
    "quizId": "quiz-cs-fundamentals",
    "quizTitle": "Web & Programming Fundamentals",
    "studentName": "Charlotte Garcia",
    "studentEmailOrId": "charlotte.garcia@school.edu",
    "totalQuestions": 6,
    "correctCount": 5,
    "incorrectCount": 1,
    "skippedCount": 0,
    "scorePercent": 83,
    "passed": true,
    "totalTimeSpentSeconds": 185,
    "submittedAt": "2026-10-30T23:53:47.883Z",
    "attempts": [
      {
        "questionId": "q-cs-01",
        "selectedOptionId": "B",
        "isCorrect": true,
        "timeSpentSeconds": 21
      },
      {
        "questionId": "q-cs-02",
        "selectedOptionId": "C",
        "isCorrect": true,
        "timeSpentSeconds": 44
      },
      {
        "questionId": "q-cs-03",
        "selectedOptionId": "B",
        "isCorrect": true,
        "timeSpentSeconds": 24
      },
      {
        "questionId": "q-cs-04",
        "selectedOptionId": "B",
        "isCorrect": false,
        "timeSpentSeconds": 40
      },
      {
        "questionId": "q-cs-05",
        "selectedOptionId": "A",
        "isCorrect": true,
        "timeSpentSeconds": 14
      },
      {
        "questionId": "q-cs-06",
        "selectedOptionId": "B",
        "isCorrect": true,
        "timeSpentSeconds": 42
      }
    ],
    "studentRegNo": "charlotte.garcia@school.edu"
  },
  {
    "id": "sub-sim-1793419295158-4-viz7",
    "quizId": "quiz-cs-fundamentals",
    "quizTitle": "Web & Programming Fundamentals",
    "studentName": "Charlotte Hernandez",
    "studentEmailOrId": "charlotte.hernandez@school.edu",
    "totalQuestions": 6,
    "correctCount": 5,
    "incorrectCount": 1,
    "skippedCount": 0,
    "scorePercent": 83,
    "passed": true,
    "totalTimeSpentSeconds": 185,
    "submittedAt": "2026-10-28T22:10:19.705Z",
    "attempts": [
      {
        "questionId": "q-cs-01",
        "selectedOptionId": "B",
        "isCorrect": true,
        "timeSpentSeconds": 23
      },
      {
        "questionId": "q-cs-02",
        "selectedOptionId": "C",
        "isCorrect": true,
        "timeSpentSeconds": 25
      },
      {
        "questionId": "q-cs-03",
        "selectedOptionId": "B",
        "isCorrect": true,
        "timeSpentSeconds": 39
      },
      {
        "questionId": "q-cs-04",
        "selectedOptionId": "D",
        "isCorrect": false,
        "timeSpentSeconds": 45
      },
      {
        "questionId": "q-cs-05",
        "selectedOptionId": "A",
        "isCorrect": true,
        "timeSpentSeconds": 15
      },
      {
        "questionId": "q-cs-06",
        "selectedOptionId": "B",
        "isCorrect": true,
        "timeSpentSeconds": 38
      }
    ],
    "studentRegNo": "charlotte.hernandez@school.edu"
  },
  {
    "id": "sub-sim-1793419295158-5-2674",
    "quizId": "quiz-cs-fundamentals",
    "quizTitle": "Web & Programming Fundamentals",
    "studentName": "Isabella Anderson",
    "studentEmailOrId": "isabella.anderson@school.edu",
    "totalQuestions": 6,
    "correctCount": 5,
    "incorrectCount": 1,
    "skippedCount": 0,
    "scorePercent": 83,
    "passed": true,
    "totalTimeSpentSeconds": 174,
    "submittedAt": "2026-10-28T05:46:57.817Z",
    "attempts": [
      {
        "questionId": "q-cs-01",
        "selectedOptionId": "B",
        "isCorrect": true,
        "timeSpentSeconds": 12
      },
      {
        "questionId": "q-cs-02",
        "selectedOptionId": "C",
        "isCorrect": true,
        "timeSpentSeconds": 31
      },
      {
        "questionId": "q-cs-03",
        "selectedOptionId": "B",
        "isCorrect": true,
        "timeSpentSeconds": 27
      },
      {
        "questionId": "q-cs-04",
        "selectedOptionId": "C",
        "isCorrect": true,
        "timeSpentSeconds": 40
      },
      {
        "questionId": "q-cs-05",
        "selectedOptionId": "A",
        "isCorrect": true,
        "timeSpentSeconds": 21
      },
      {
        "questionId": "q-cs-06",
        "selectedOptionId": "D",
        "isCorrect": false,
        "timeSpentSeconds": 43
      }
    ],
    "studentRegNo": "isabella.anderson@school.edu"
  },
  {
    "id": "sub-sim-1793419295158-6-kp72",
    "quizId": "quiz-cs-fundamentals",
    "quizTitle": "Web & Programming Fundamentals",
    "studentName": "Ethan Davis",
    "studentEmailOrId": "ethan.davis@school.edu",
    "totalQuestions": 6,
    "correctCount": 5,
    "incorrectCount": 1,
    "skippedCount": 0,
    "scorePercent": 83,
    "passed": true,
    "totalTimeSpentSeconds": 219,
    "submittedAt": "2026-10-30T14:55:25.611Z",
    "attempts": [
      {
        "questionId": "q-cs-01",
        "selectedOptionId": "B",
        "isCorrect": true,
        "timeSpentSeconds": 20
      },
      {
        "questionId": "q-cs-02",
        "selectedOptionId": "C",
        "isCorrect": true,
        "timeSpentSeconds": 36
      },
      {
        "questionId": "q-cs-03",
        "selectedOptionId": "A",
        "isCorrect": false,
        "timeSpentSeconds": 29
      },
      {
        "questionId": "q-cs-04",
        "selectedOptionId": "C",
        "isCorrect": true,
        "timeSpentSeconds": 51
      },
      {
        "questionId": "q-cs-05",
        "selectedOptionId": "A",
        "isCorrect": true,
        "timeSpentSeconds": 36
      },
      {
        "questionId": "q-cs-06",
        "selectedOptionId": "B",
        "isCorrect": true,
        "timeSpentSeconds": 47
      }
    ],
    "studentRegNo": "ethan.davis@school.edu"
  },
  {
    "id": "sub-sim-1793419295158-7-ys48",
    "quizId": "quiz-cs-fundamentals",
    "quizTitle": "Web & Programming Fundamentals",
    "studentName": "Mia Williams",
    "studentEmailOrId": "mia.williams@school.edu",
    "totalQuestions": 6,
    "correctCount": 4,
    "incorrectCount": 2,
    "skippedCount": 0,
    "scorePercent": 67,
    "passed": false,
    "totalTimeSpentSeconds": 195,
    "submittedAt": "2026-10-30T13:30:51.676Z",
    "attempts": [
      {
        "questionId": "q-cs-01",
        "selectedOptionId": "B",
        "isCorrect": true,
        "timeSpentSeconds": 15
      },
      {
        "questionId": "q-cs-02",
        "selectedOptionId": "D",
        "isCorrect": false,
        "timeSpentSeconds": 36
      },
      {
        "questionId": "q-cs-03",
        "selectedOptionId": "B",
        "isCorrect": true,
        "timeSpentSeconds": 34
      },
      {
        "questionId": "q-cs-04",
        "selectedOptionId": "A",
        "isCorrect": false,
        "timeSpentSeconds": 36
      },
      {
        "questionId": "q-cs-05",
        "selectedOptionId": "A",
        "isCorrect": true,
        "timeSpentSeconds": 35
      },
      {
        "questionId": "q-cs-06",
        "selectedOptionId": "B",
        "isCorrect": true,
        "timeSpentSeconds": 39
      }
    ],
    "studentRegNo": "mia.williams@school.edu"
  }
];
