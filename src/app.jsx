import React, { useState } from 'react';
import { ChevronDown, MapPin, Calendar, Wallet, Phone, Info, Clock, Train, Navigation2, Building2 } from 'lucide-react';

const Accordion = ({ children, title, icon }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="border rounded-lg mb-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-4 flex items-center justify-between bg-white hover:bg-gray-50 rounded-lg"
      >
        <div className="flex items-center gap-2 text-xl font-semibold">
          {icon}
          {title}
        </div>
        <ChevronDown className={`transform transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      {isOpen && <div className="p-4 border-t">{children}</div>}
    </div>
  );
};

const Tab = ({ children, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 rounded-lg ${
      isActive 
        ? 'bg-blue-600 text-white' 
        : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
    }`}
  >
    {children}
  </button>
);

const Card = ({ title, icon, children }) => (
  <div className="border rounded-lg p-4 mb-4">
    {title && (
      <div className="flex items-center gap-2 text-lg font-semibold mb-4">
        {icon}
        {title}
      </div>
    )}
    {children}
  </div>
);

const ItineraryDay = ({ day, content }) => (
  <Card title={`Jour ${day}`}>
    {Object.entries(content).map(([time, activities], idx) => (
      <div key={idx} className="mb-4">
        <div className="font-medium text-blue-600">{time}</div>
        <ul className="list-disc ml-6">
          {Array.isArray(activities) ? (
            activities.map((activity, i) => (
              <li key={i} className="text-gray-700">{activity}</li>
            ))
          ) : (
            <li className="text-gray-700">{activities}</li>
          )}
        </ul>
      </div>
    ))}
  </Card>
);

const JapanItinerary = () => {
  const [activeTab, setActiveTab] = useState('preparation');

  const preTrip = {
    documents: [
      "Passeport valide 6 mois après retour",
      "Japan Rail Pass à commander avant départ",
      "Réservations musée Ghibli / Katsura Villa imprimées",
      "Copies numériques de tous les documents"
    ],
    apps: [
      "Google Maps (+ télécharger cartes hors-ligne)",
      "Hyperdia (horaires trains)",
      "Japan Official Travel App",
      "Google Translate (+ télécharger pack japonais)",
      "Application météo fiable"
    ]
  };
  
const TransportInfo = ({ transport }) => {
  if (!transport) return null;
  
  if (typeof transport === 'string') {
    return (
      <div className="ml-4 flex items-start gap-2 text-gray-600">
        <Train className="h-4 w-4 mt-1 flex-shrink-0" />
        <span>{transport}</span>
      </div>
    );
  }

  return (
    <div className="ml-4 flex items-start gap-2">
      <Train className="h-4 w-4 mt-1 flex-shrink-0 text-gray-600" />
      <div className="w-full">
        {transport.Options && (
          <div>
            <span className="font-medium">Options:</span>
            <ul className="list-disc ml-5 space-y-1">
              {transport.Options.map((option, index) => (
                <li key={index}>{option}</li>
              ))}
            </ul>
          </div>
        )}
        {transport.Notes && (
          <div className="mt-1 text-gray-600">
            {Array.isArray(transport.Notes) ? (
              <ul className="list-disc ml-5 space-y-1 italic">
                {transport.Notes.map((note, index) => (
                  <li key={index}>{note}</li>
                ))}
              </ul>
            ) : (
              <span className="italic">{transport.Notes}</span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const LocationInfo = ({ quartier, stations }) => {
  if (!quartier && !stations) return null;

  return (
    <div className="mt-4 space-y-2 border-t pt-3 text-gray-600">
      {quartier && (
        <div className="flex items-start gap-2">
          <Building2 className="h-4 w-4 mt-1 flex-shrink-0" />
          <span>
            <span className="font-medium">Quartier: </span>
            {quartier}
          </span>
        </div>
      )}
      {stations && (
        <div className="flex items-start gap-2">
          <Train className="h-4 w-4 mt-1 flex-shrink-0" />
          <div>
            <span className="font-medium">Stations: </span>
            <ul className="list-disc ml-5 space-y-1">
              {stations.map((station, index) => (
                <li key={index}>{station}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

const renderSubActivity = (content) => {
  // Si c'est une simple chaîne de caractères
  if (typeof content === 'string') {
    return <span>{content}</span>;
  }
  
  // Si c'est un tableau
  if (Array.isArray(content)) {
    return (
      <ul className="list-disc ml-5 space-y-1">
        {content.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    );
  }

  // Si c'est un objet avec des sous-propriétés
  return (
    <div className="space-y-2">
      {Object.entries(content).map(([key, value]) => (
        <div key={key}>
          <span className="font-medium">{key}:</span>
          {Array.isArray(value) ? (
            <ul className="list-disc ml-5 space-y-1">
              {value.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          ) : (
            <span className="ml-2">{value}</span>
          )}
        </div>
      ))}
    </div>
  );
};

const TimeSlot = ({ time, activities }) => {
  if (time === "Transport") {
    return <TransportInfo transport={activities} />;
  }

  if (typeof activities === 'string') {
    return (
      <div className="ml-4 flex items-start gap-2">
        <Clock className="h-4 w-4 mt-1 text-gray-500 flex-shrink-0" />
        <div>
          <span className="font-medium">{time}: </span>
          <span>{activities}</span>
        </div>
      </div>
    );
  }

  if (Array.isArray(activities)) {
    return (
      <div className="ml-4">
        <div className="flex items-start gap-2">
          <Clock className="h-4 w-4 mt-1 text-gray-500 flex-shrink-0" />
          <div>
            <span className="font-medium">{time}:</span>
            <ul className="list-disc ml-5 space-y-1">
              {activities.map((activity, index) => (
                <li key={index}>{activity}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }

  // Handle nested activities
  return (
    <div className="ml-4">
      <div className="flex items-start gap-2">
        <Clock className="h-4 w-4 mt-1 text-gray-500 flex-shrink-0" />
        <div className="w-full">
          <span className="font-medium">{time}:</span>
          <div className="ml-4 mt-2 space-y-2">
            {Object.entries(activities).map(([subTime, subActivity]) => (
              <div key={subTime} className="flex items-start gap-2">
                {subTime !== "Suggestions" && subTime !== "Notes" && subTime !== "Spécialités" ? (
                  <>
                    <span className="font-medium text-sm text-gray-600 min-w-[80px]">{subTime}:</span>
                    <div className="flex-1">
                      {renderSubActivity(subActivity)}
                    </div>
                  </>
                ) : (
                  <div className="w-full space-y-1">
                    <span className="font-medium text-sm text-gray-600 block">{subTime}:</span>
                    <div className="ml-4">
                      {renderSubActivity(subActivity)}
                    </div>
                  </div>
                )}
              </div>
            ))}

          </div>
        </div>
      </div>
    </div>
  );
};

const ItineraryDay = ({ day, content }) => {
  // Handle special case for rest/free days
  if (content.Repos || content.Journée === "Journée libre pour explorer plus tranquillement") {
    return (
      <div className="p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center gap-2 mb-2">
          <Calendar className="h-5 w-5 text-gray-600" />
          <h3 className="font-medium">Jour {day}</h3>
        </div>
        <div className="ml-7 text-gray-600">
          {content.Repos || content.Journée}
          {(content.Suggestions || content["Suggestions de quartiers"]) && (
            <div className="mt-2">
              <p className="font-medium">Suggestions:</p>
              <ul className="list-disc ml-5">
                {(content.Suggestions || content["Suggestions de quartiers"]).map((suggestion, index) => (
                  <li key={index}>{suggestion}<br/></li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 bg-gray-50 rounded-lg">
      <div className="flex items-center gap-2 mb-3">
        <Calendar className="h-5 w-5 text-gray-600" />
        <h3 className="font-medium">Jour {day}</h3>
      </div>
      <div className="space-y-3">
        {Object.entries(content)
          .filter(([key]) => !['Options', 'Suggestions', 'Quartier', 'Stations'].includes(key))
          .map(([time, activities]) => (
            <TimeSlot key={time} time={time} activities={activities} />
          ))}
        {(content.Quartier || content.Stations) && (
          <LocationInfo quartier={content.Quartier} stations={content.Stations} />
        )}
        {content.Options && (
          <div className="ml-4 mt-4">
            <p className="font-medium">Options:</p>
            <ul className="list-disc ml-5">
              {content.Options.map((option, index) => (
                <li key={index}>{option}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

const ItineraryView = ({ cityData }) => {
  return (
    <div className="space-y-4">
      {Object.entries(cityData).map(([key, city]) => (
        <Accordion 
          key={key} 
          title={city.title}
          icon={<Navigation2 className="h-5 w-5" />}
        >
          <div className="space-y-4">
            {Object.entries(city.days).map(([day, content]) => (
              <ItineraryDay key={day} day={day} content={content} />
            ))}
          </div>
        </Accordion>
      ))}
    </div>
  );
};


const cityData = {
tokyo1: {
    title: "Tokyo Première Partie",
    days: {
        1: {
            "Matin (7h-12h)": "Arrivée Narita/Haneda",
            "Transport (12h-14h)": {
                "Options": [
                    "Keisei Skyliner (40 min, plus rapide) - De Narita à Ueno, puis transfert JR",
                    "Narita Express (1h30, JR Pass) - De Narita Terminal 1 à Shinjuku Station",
                    "Limousine Bus (2h, plus reposant) - De Narita/Haneda directement à votre hôtel",
                ],
                "Notes": [
                    "Selon votre hôtel, choisir la station la plus proche (Shinjuku/Shibuya recommandées)",
                    "Activer le JR Pass à l'aéroport si ce n'est pas fait avant",
                    "Retirer l'argent aux ATM 7-Eleven ou JP Post",
                    "Option de carte SUICA/PASMO virtuelle pour gagner de la place si le téléphone est compatible"
                ]
            },
            "Après-midi (14h-17h)": [
                "Check-in hôtel et repos",
                "Achat carte PASMO/SUICA pour transports locaux (2000¥ conseillé)"
            ],
            "Soir (17h-20h)": ["Balade tranquille dans le quartier", "Conbini pour essentiels", "Dîner léger et adaptation au décalage horaire"],
            "Quartier": "Shinjuku/Shibuya (selon hôtel)",
            "Budget": {
                "Transport": "3000-4000¥",
                "Dîner": "1000-1500¥",
                "PASMO/SUICA": "2000¥"
            }
        },
        2: {
            "Transport": "Départ depuis hôtel vers Shinjuku Station (5-10min à pied)",
            "Matin (9h-12h)": {
                "9h-10h30": "Tokyo Metropolitan Building (5 min à pied de Shinjuku Station West Exit)",
                "10h30-12h": "Shinjuku Gyoen (10 min à pied)"
            },
            "Déjeuner (12h-13h30)": "Restaurant dans Shinjuku",
            "Après-midi (13h30-17h)": ["Exploration tranquille de Shinjuku", "Don Quijote (shopping)"],
            "Soir (18h-21h)": "Memory Lane (Omoide Yokocho)",
            "Quartier": "Shinjuku (新宿)",
            "Stations": ["Base: Shinjuku Station (JR, Metro)"],
          
            "Budget": {
                "Déjeuner": "1000-1500¥",
                "Dîner": "2000-3000¥"
            }
        },
        3: {
            "Transport": "Départ hôtel → Asakusa (Metro direct depuis Shinjuku/Shibuya, 30min)",
            "Matin (7h-11h)": {  // Horaire avancé
                "7h-9h": "Sanctuaire Sensoji (moins de monde le matin)",
                "9h-11h": "Nakamise Shopping Street"
            },
            "Déjeuner (11h-12h30)": "Restaurant local Asakusa",
            "Après-midi (12h30-17h)": [
                "Option: Croisière Sumida River vers Skytree (720¥)",
                "Alternative: Asahi Building (15 min à pied)",
                "Promenade Sumida Park"
            ],
            "Soir (17h-21h)": [
                "Skytree (timing idéal pour coucher de soleil)",
                "Dîner Solamachi mall"
            ],
            "Quartier": "Asakusa (浅草) → Oshiage (押上)",
            "Stations": [
                "Asakusa Station (Metro)",
                "Tokyo Skytree Station"
            ],
            "Budget": {
                "Transport": "800¥ (plus 720¥ si croisière)",
                "Sensoji": "Gratuit",
                "Skytree": "3200¥",
                "Repas": "2000-3000¥/repas"
            }
        },
        4: {
            "Transport": "Départ hôtel → Shibuya (direct si hôtel Shinjuku, 5min)",
            "Matin (9h-12h)": ["Shibuya Sky", "Nintendo Shop (Parco)"],
            "Déjeuner (12h-13h30)": "Restaurant dans Shibuya",
            "Après-midi (13h30-17h)": {
                "Transport": "Shibuya → Harajuku (JR, 2min)",
                "Activités": ["Harajuku exploration (Takeshita Street)", "Marion Crêpes", "Taiyaki Hiiragi"]
            },
            "Soir (18h-21h)": "Shibuya Yokocho pour le dîner",
            "Quartier": "Shibuya (渋谷) → Harajuku (原宿)",
            "Stations": [
                "Shibuya Station",
                "Harajuku Station"
            ],
          
            "Budget": {
                "Shibuya Sky": "2000¥",
                "Transport": "800¥",
                "Repas": "2000-3000¥/repas"
            }
        },
        5: {
            "Transport": "Départ hôtel → Mitaka (JR Chuo Line direct depuis Shinjuku, 30min)",
            "Matin (10h-13h)": [
                "Musée Ghibli (navette depuis Mitaka Station)",
                "Parc Inokashira"
            ],
            "Notes": [
                "Réservation Ghibli OBLIGATOIRE 3 mois à l'avance",
                "Prix: 1000¥ adulte",
                "Site officiel pour réservation: ghibli-museum.jp"
            ],
            "Déjeuner (13h-14h30)": "Restaurant près du parc",
            "Après-midi (14h30-18h)": {
                "Transport": "Mitaka → Ikebukuro (JR, 25min)",
                "Activités": ["Ikebukuro exploration", "Pokemon Center", "Furifu"]
            },
            "Soir (18h-21h)": {
                "Transport": "Ikebukuro → Ebisu (JR Yamanote Line, 15min)",
                "Activités": "Ebisu Yokocho"
            },
            "Quartier": "Mitaka (三鷹) → Ikebukuro (池袋) → Ebisu (恵比寿)",
            "Stations": [
                "Mitaka Station",
                "Ikebukuro Station",
                "Ebisu Station"
            ],
          
            "Budget": {
                "Musée": "1000¥",
                "Transport": "1000¥",
                "Repas": "2000-3000¥/repas"
            }
        },
        6: {
            "Repos": "Journée libre pour se reposer ou rattraper des activités manquées",
            "Suggestions de quartiers": ["Shimokitazawa (下北沢)", "Daikanyama (代官山)", "Nakameguro (中目黒)"]
        },
        7: {
            "Transport": "Départ hôtel → Ueno (Metro direct, 25min)",
            "Matin (9h30-12h)": ["Ueno Park", "Musée National de Tokyo"],
            "Déjeuner (12h-13h30)": "Restaurant dans Ueno",
            "Après-midi (13h30-17h)": {
                "Transport": "Ueno → Kiyosumi-Shirakawa (Metro, 20min)",
                "Activités": ["Kiyosumi Teien", "Marché Tsukiji"]
            },
            "Soir (17h-21h)": {
                "Transport": "Tsukiji → Ginza (Metro, 5min)",
                "Activités": ["Ginza exploration", "Uniqlo", "Starbucks Reserve Roastery"]
            },
            "Quartier": "Ueno (上野) → Kiyosumi (清澄) → Ginza (銀座)",
            "Stations": [
                "Ueno Station",
                "Kiyosumi-Shirakawa Station",
                "Ginza Station"
            ]
        },
        8: {
            "Transport": "Départ hôtel → Akihabara (Metro direct, 20min)",
            "Matin (10h-12h)": "Akihabara Electric Town",
            "Déjeuner (12h-13h30)": "Restaurant thématique",
            "Après-midi (13h30-17h)": ["Mandarake Complex", "@Home cafe ou Cat cafe Nyankoto"],
            "Soir (17h-21h)": "Shopping geek Akihabara",
            "Quartier": "Akihabara (秋葉原)",
            "Stations": ["Akihabara Station"]
        }
    }
},
fuji: {
    title: "Mont Fuji & Kawaguchiko",
    days: {
        9: {
            "Transport": {
                "Options": [
                    "Train: Shinjuku Station > Kawaguchiko (2h, JR Pass + bus local)",
                ],
                "Notes": [
                    "Départ depuis Shinjuku Station (新宿駅)",
                    "Réservation ryokan OBLIGATOIRE plusieurs mois à l'avance",
                    "Vérifier météo pour visibilité du Mont Fuji"
                ]
            },
            "Matin (8h-11h)": {
                "8h00": "Départ de Shinjuku",
                "10h00": "Arrivée à Kawaguchiko",
                "10h30": "Check-in ryokan si possible ou dépôt bagages"
            },
            "Déjeuner (11h-12h30)": "Restaurant local",
            "Après-midi (13h-16h)": {
                "Transport": "Bus local depuis Kawaguchiko Station",
                "Activités": [
                    "Chureito Pagoda",
                    "Retour à Kawaguchiko",
                    "Installation ryokan"
                ]
            },
            "Soir (16h-21h)": ["Onsen avec vue Fuji", "Dîner kaiseki au ryokan"],
            "Quartier": "Kawaguchiko (河口湖)",
            "Stations": ["Kawaguchiko Station"],
          
            "Budget": {
                "Transport": "4000¥ (si pas JR Pass)",
                "Ryokan": "20000-30000¥/nuit avec repas",
                "Bus local": "1500¥ pass journée"
            }
        },
        10: {
            "Transport": {
                "Options": [
                    "Bus local Red/Green Line (1300¥ pour pass journée)",
                    "Possibilité location vélo (1000¥/jour)"
                ]
            },
            "Matin (9h-12h)": {
                "Transport": "Bus vers Kachi Kachi Ropeway",
                "Activités": [
                    "Tour du lac en bus (Red Line)",
                    "Télécabine Mont Kachi Kachi"
                ]
            },
            "Déjeuner (12h-13h30)": "Restaurant avec vue sur le Fuji",
            "Après-midi (13h30-17h)": {
                "Transport": "Green Line Bus Circuit",
                "Activités": [
                    "Point de vue Nagasaki Park",
                    "Point de vue Kawaguchiko Music Forest",
                    "Point de vue Nord du lac"
                ]
            },
            "Soir (17h-20h)": "Dîner et nuit en hôtel standard près de la station",
            "Quartier": "Kawaguchiko (河口湖)",
            "Stations": ["Utilisation des bus locaux"]
        },
        11: {
            "Transport": {
                "Options": [
                    "9h00-11h00 : Kawaguchiko → Shinjuku",
                    "11h00-11h30: Transfert vers Tokyo Station",
                    "12h00-14h45: Shinkansen vers Kyoto"
                ],
                "Notes": "Réserver siège Shinkansen la veille"
            },
            "Matin (7h-9h)": {
                "7h00": "Photos lever du soleil sur le Fuji",
                "9h00": "Départ pour Kyoto",
            },
            "Après-midi": "Arrivée et installation à Kyoto",
            "Soir": "Exploration tranquille quartier de l'hôtel",
            "Quartier": "Kawaguchiko → Kyoto",
            "Stations": [
                "Départ: Kawaguchiko Station",
                "Transit: Shinjuku Station",
                "Arrivée: Kyoto Station"
            ]
        }
    }
},
kyoto: {
    title: "Kyoto",
    days: {
        12: {
            "Transport": {
              "Options": [
                    "Bus Pass 1 jour recommandé (600¥)",
                    "Alternative: Vélo location journée (1000¥)"
              ],
                "Notes": [
                    "Déjà arrivé la veille, départ depuis l'hôtel",
                ]
            },
            "Matin (9h-12h)": {
                "Transport": "Bus 101 depuis l'hôtel vers Nijojo-mae",
                "Activités": [
                    "Nijo-jo (entrée 1000¥)",
                    "Marché Nishiki (15 min à pied depuis Nijo-jo)"
                ]
            },
            "Déjeuner (12h-13h30)": "Restaurant dans le marché Nishiki",
            "Après-midi (13h30-17h)": {
                "Transport": "À pied dans le quartier",
                "Activités": [
                    "Exploration du marché Nishiki",
                    "Boutiques traditionnelles"
                ]
            },
            "Soir (17h-21h)": "Pontocho",
            "Quartier": "Centre de Kyoto (京都市内)",
            "Stations": [
                "Nijojo-mae Station (métro)",
                "Sanjo Station pour Pontocho"
            ]
        },
        13: {
            "Transport": {
                "Matin": "Bus 205 depuis Kyoto Station vers Kinkakuji-michi (230¥)",
                "Notes": "Pass bus journée recommandé (600¥) pour les multiples trajets"
            },
            "Matin (9h-12h)": {
                "9h00-10h30": "Kinkaku-ji (Temple d'Or - entrée 400¥)",
                "Transport": "Bus 59 vers Ryoanji (15min)",
                "10h45-12h00": "Temple Ryoan-ji (entrée 500¥)"
            },
            "Déjeuner (12h-13h30)": "Restaurant local près de Ryoan-ji",
            "Après-midi (13h30-17h)": {
                "Transport": "Bus 59 puis JR vers Arashiyama (40min total)",
                "Activités": [
                    "Arashiyama exploration",
                    "Forêt de bambous (gratuit)",
                    "Option: Temple Tenryu-ji (500¥)"
                ]
            },
            "Soir (17h-21h)": {
                "Transport": "JR vers Kyoto puis métro vers Gion-Shijo",
                "Activités": "Gion exploration"
            },
            "Quartier": "Nord-Ouest → Arashiyama → Gion",
            "Stations": [
                "Saga-Arashiyama Station (JR)",
                "Gion-Shijo Station (Keihan Line)"
            ]
        },
        14: {
            "Transport": {
                "Options": [
                    "JR Nara Line jusqu'à Inari Station (5min, gratuit avec JR Pass)",
                    "Keihan Line jusqu'à Fushimi Inari (10min, 150¥)"
                ],
                "Notes": "Prévoir eau et snacks, peu de magasins en montant"
            },
            "Matin (7h-11h)": {
                "7h00": "Départ vers Fushimi Inari (moins de monde)",
                "7h15-11h00": "Fushimi Inari-taisha (gratuit, 2-3h pour montée partielle)",
            },
            "Déjeuner (11h-12h30)": "Restaurant près du temple (spécialités Inari Sushi)",
            "Après-midi (13h-17h)": {
                "Transport": "Keihan Line vers Kiyomizu-Gojo (20min)",
                "Activités": [
                    "Ghibli shop (Kiyomizu-Gojo)",
                    "Marche vers Kiyomizu-dera (15min en montée)",
                    "Kiyomizu-dera (entrée 400¥)"
                ]
            },
            "Soir (17h-21h)": {
                "Transport": "15 min à pied",
                "Activités": "Yasaka Shrine (gratuit) et rues traditionnelles"
            },
            "Quartier": "Fushimi → Higashiyama",
            "Stations": [
                "Inari Station (JR)",
                "Kiyomizu-Gojo Station (Keihan Line)"
            ]
        },
        15: {
            "Journée": "Journée libre pour explorer plus tranquillement",
            "Suggestions": [
                "Shopping à Kawaramachi (地下鉄烏丸線)",
                "Cafés traditionnels dans Gion",
                "Nishiki Market en détail",
                "Musée International du Manga (1000¥)"
            ],
            "Transport": {
                "Options": [
                    "Pass bus journée (600¥)",
                    "Pass métro journée (800¥)",
                    "Vélo en location (1000¥/jour)"
                ]
            },
            "Quartier": "Au choix",
            "Stations": ["Selon activités choisies"]
        },
        16: {
            "Transport": {
                "Options": [
                    "Bus 33 vers Katsura Rikyu-mae (230¥)",
                    "Taxi recommandé car accès complexe (environ 2000¥)"
                ],
                "Notes": "Réservation Katsura Villa obligatoire via l'Imperial Household Agency (gratuit)"
            },
            "Matin (9h-12h)": {
                "9h00": "Katsura Imperial Villa (visite guidée 1h30)",
                "Transport": "Bus vers Ginkakuji-michi"
            },
            "Déjeuner (12h-13h30)": "Restaurant traditionnel secteur Ginkakuji",
            "Après-midi (13h30-17h)": {
                "Transport": "À pied le long du Philosopher's Path",
                "Activités": [
                    "Philosopher's Path (gratuit, 2km)",
                    "Nanzen-ji (entrée temple 500¥, jardins 300¥)"
                ]
            },
            "Soir (17h-21h)": {
                "Transport": "Bus 100 vers Gion",
                "Activités": "Dîner et exploration finale de Gion"
            },
            "Quartier": "Ouest → Higashiyama Nord → Gion",
            "Stations": [
                "Katsura Station (Hankyu Line)",
                "Bus Ginkakuji-michi",
                "Keihan Sanjo Station pour Gion"
            ]
        }
    }
},
  
himeji: {
    title: "Himeji",
    days: {
        17: {
            "Transport": {
                "Options": [
                    "Shinkansen depuis Kyoto (JR Pass valide):",
                    "- Hikari: 30min (meilleure option)"
                ],
                "Notes": "Départ depuis Kyoto Station avec bagages (consigne à Himeji)"
            },
            "Matin (8h-12h)": {
                "8h00": "Départ de Kyoto",
                "8h30": "Arrivée et dépôt bagages à Himeji Station",
                "9h00-12h00": "Château Himeji et jardins Koko-en"
            },
            "Déjeuner (12h-13h30)": "Restaurant dans la rue commerçante Miyuki-dori",
            "Après-midi (13h30-16h)": {
                "Transport": "Shinkansen Himeji → Osaka (30min)",
                "Activités": "Installation hôtel Osaka"
            },
            "Soir (16h-21h)": "Exploration Dotonbori et dîner",
            "Quartier": "Himeji → Osaka",
            "Stations": [
                "Himeji Station (matin)",
                "Osaka/Umeda Station (après-midi)"
            ]
        }
    }
},
osaka: {
    title: "Osaka",
    days: {
        18: {
            "Transport": {
                "Options": [
                    "Métro + Chuo Line vers Osakako (320¥)",
                    "Pass journée métro recommandé (800¥)"
                ],
                "Notes": [
                    "Réservation en ligne Kaiyukan recommandée",
                    "Pokemon Café: Réservation OBLIGATOIRE 3 mois avant"
                ]
            },
            "Matin (10h-13h)": {
                "Transport": "Métro depuis hôtel vers Osakako Station",
                "Activités": [
                    "Aquarium Kaiyukan (2300¥) (Réservation en ligne possible pour éviter la file)"
                ],
            },
            "Déjeuner (13h-14h30)": {
                "Suggestions": [
                    "Restaurant Tempozan Marketplace",
                    "Restaurants avec vue sur la baie (2000-3000¥)"
                ]
            },
            "Après-midi (14h30-17h)": {
                "Transport": "Métro vers Nipponbashi",
                "Activités": [
                    "Baie d'Osaka (Option: Santa Maria Cruise 1600¥)",
                    "Kuromon Market"
                ]
            },
            "Soir (17h-21h)": {
                "Transport": "10 min à pied vers Dotonbori",
                "Activités": [
                    "Dotonbori illuminations",
                    "Pokemon Café (réservation obligatoire)",
                    "Shopping Shinsaibashi"
                ]
            },
            "Quartier": "Osaka Bay (大阪湾) → Minami (南)",
            "Stations": [
                "Osakako Station",
                "Nipponbashi Station",
                "Namba Station"
            ]
        },
        19: {
            "Transport": {
                "Options": [
                    "Hankyu Line: Umeda → Minoh (30min, 280¥)",
                    "Express recommandé pour gain de temps"
                ]
            },
            "Matin (9h-12h)": {
                "9h00": "Départ vers Minoh",
                "Activités": [
                    "Minoh Park",
                    "Cascade de Minoo",
                    "Spécialité: Momiji tempura"
                ]
            },
            "Déjeuner (12h-13h30)": "Restaurant local près de la cascade",
            "Après-midi (13h30-17h)": {
                "Transport": "Retour vers Umeda",
                "Activités": [
                    "Shopping Umeda",
                    "Grand Front Osaka",
                    "Umeda Sky Building (1500¥)"
                ]
            },
            "Soir (17h-21h)": {
                "Transport": "Métro vers Namba",
                "Activités": "Dotonbori et dîner",
                "Suggestions": ["Crabe chez Kani Doraku", "Okonomiyaki chez Mizuno"]
            },
            "Quartier": "Minoh (箕面) → Umeda (梅田)",
            "Stations": ["Minoh Station", "Umeda Station"]
        },
        20: {
            "Transport": {
                "Options": [
                    "Métro vers Tanimachi 4-chome (180¥)",
                    "Pass journée métro recommandé (800¥)"
                ]
            },
            "Matin (9h-12h)": [
                "Château d'Osaka (entrée 600¥)",
                "Parc du château",
                "Option: Musée du château"
            ],
            "Déjeuner (12h-13h30)": "Restaurant près du château",
            "Après-midi (13h30-17h)": {
                "Transport": "Métro vers Dobutsuen-mae",
                "Activités": [
                    "Shinsekai exploration",
                    "Tour Tsutenkaku (700¥)"
                ]
            },
            "Soir (17h-21h)": "Kushikatsu Daruma et exploration Shinsekai",
            "Quartier": "Osaka-jo (大阪城) → Shinsekai (新世界)",
            "Stations": [
                "Tanimachi 4-chome Station",
                "Dobutsuen-mae Station"
            ]
        },
        21: {
            "Transport": {
                "Options": [
                    "Train direct vers Nara (45min)",
                    "Kintetsu Line recommandée"
                ]
            },
            "Matin (9h-12h)": {
                "Transport": "Départ hôtel → Nara",
                "Activités": [
                    "Parc aux daims",
                    "Todai-ji (entrée 600¥)"
                ]
            },
            "Déjeuner (12h-13h30)": "Restaurant près du parc",
            "Après-midi (13h30-17h)": ["Kasuga Taisha", "Naramachi"],
            "Soir (17h-21h)": {
                "Transport": "Retour à Osaka",
                "Activités": "Dîner et shopping Shinsaibashi"
            },
            "Quartier": "Excursion Nara",
            "Stations": ["Kintetsu-Nara Station"]
        },
        22: {
            "Journée": "Journée libre à Osaka",
            "Suggestions": [
                "Musée Cup Noodles à Ikeda",
                "Den Den Town",
                "Shopping aux Outlets Rinku Premium"
            ],
            "Transport": {
                "Options": [
                    "Pass journée métro (800¥)",
                    "Pass Osaka Amazing (2800¥)",
                ],
                "Soir": "Shinkansen vers Tokyo"
            },
            "Quartier": "Au choix",
            "Stations": ["Selon activités choisies"]
        }
    }
},
tokyo2: {
    title: "Tokyo Retour",
    days: {
        23: {
            "Transport": {
                "Options": [
                    "Shinkansen depuis Osaka (JR Pass valide):",
                    "- Nozomi: 2h15 (non couvert par JR Pass, 14,450¥)",
                    "- Hikari: 2h45 (couvert par JR Pass)",
                    "- Kodama: 3h15 (couvert par JR Pass, plus d'arrêts)"
                ],
              
                "Notes": [
                    "Service Takkyubin pour envoi bagages à l'aéroport (1500-2000¥/bagage)",
                    "Délai 24h pour Narita, même jour possible pour Haneda",
                  "  Départ depuis Shin-Osaka Station, arrivée Tokyo Station ou Shinagawa Station"
                ]
            },
            "Matin (9h-12h)": {
                "9h00": "Départ de Shin-Osaka",
                "11h45": "Arrivée à Tokyo Station",
                "Notes": "Réservation de siège recommandée la veille"
            },
            "Déjeuner (12h-13h30)": {
                "Suggestions": [
                    "Tokyo Station Ramen Street (sous-sol)",
                    "Kitchen Street (étage -1)",
                    "GRANSTA (zone commerciale de la gare)",
                    "Budget: 1000-2000¥"
                ]
            },
            "Après-midi (13h30-18h)": {
                "Transport": {
                    "Options": [
                        "JR Yamanote Line pour accès zones shopping",
                        "Metro Tokyo pour zones spécifiques",
                        "Pass métro 24h disponible (800¥)"
                    ]
                },
                "Suggestions Shopping": {
                    "Électronique": [
                        "Akihabara - Yodobashi Camera, Bic Camera",
                        "Stations: Akihabara (JR/Metro)"
                    ],
                    "Mode": [
                        "Shibuya - Shibuya 109, PARCO",
                        "Shinjuku - Isetan, Lumine",
                        "Stations: Shibuya ou Shinjuku (JR/Metro)"
                    ],
                    "Souvenirs": [
                        "Tokyo Station - Character Street",
                        "Asakusa - Nakamise Shopping Street",
                        "Stations: Tokyo ou Asakusa (Metro)"
                    ],
                    "Tax-Free": [
                        "Don Quijote (nombreuses locations)",
                        "Bic Camera (électronique)",
                        "Uniqlo (vêtements)"
                    ]
                }
            },
            "Soir (18h-21h)": {
                "Activités": [
                    "Préparation bagages",
                    "Vérification documents de vol",
                    "Planification trajet aéroport"
                ],
                "Notes": "Préparer les achats tax-free pour le contrôle à l'aéroport"
            },
            "Quartier": "Selon choix shopping",
            "Stations": [
                "Tokyo Station (point central)",
                "Autres stations selon zones shopping choisies"
            ]
        },
        24: {
            "Transport": {
                "Options vers Narita": [
                    "Narita Express (environ 1h, 3000¥ ou JR Pass)",
                    "Limousine Bus (1h30, 3100¥)",
                    "Skyliner (41min, 2570¥ depuis Ueno)"
                ],
                "Options vers Haneda": [
                    "Tokyo Monorail (15min depuis Hamamatsucho, 500¥)",
                    "Keikyu Line (20min depuis Shinagawa, 300¥)"
                ],
              "Notes": [
                "Prévoir 3h avant le vol international",
                "Garder reçus Tax-Free accessibles dans bagage cabine",
                "Montant minimum Tax-Free: 5000¥ par magasin",
                "Passeport nécessaire pour achats Tax-Free"
              ] 
            },
            "Matin (9h-11h)": {
                "Suggestions Shopping": {
                    "Zones proches des lignes aéroport": [
                        "Tokyo Station - Character Street et GRANSTA",
                        "Ueno - Ameyoko Market (si vol depuis Narita)",
                        "Shinagawa - Wing Shopping (si vol depuis Haneda)"
                    ],
                    "Notes": [
                        "Vérifier limites bagages",
                        "Garder reçus tax-free accessibles"
                    ]
                }
            },
            "Midi (11h-12h)": {
                "11h00": "Départ vers aéroport selon option choisie",
                "Suggestions": [
                    "Bento à emporter pour le voyage (1000-1500¥)",
                    "Derniers achats aux boutiques d'aéroport"
                ]
            },
            "Quartier": "Selon aéroport de départ",
            "Stations": [
                "Pour Narita: Tokyo, Ueno, ou Nippori",
                "Pour Haneda: Hamamatsucho ou Shinagawa"
            ]
        }
    }
  }
};

  const practicalInfo = {
    budget: {
      title: "Budget & Paiement",
      items: [
        "Garder du cash (pays très cash)",
        "IC Card pour transports",
        "Budget quotidien conseillé :",
        "- Repas : 3000-5000¥",
        "- Transport local : 1000¥",
        "- Activités : 2000-4000¥"
      ]
    },
    accommodation: {
      title: "Hébergements recommandés",
      items: {
        "Tokyo": ["Près Yamanote Line :", "- Shinjuku", "- Shibuya", "- Ueno", "- Tokyo Station"],
        "Kyoto": ["Près stations principales :", "- Kyoto Station", "- Downtown (Karasuma)", "- Southern Higashiyama"],
        "Osaka": ["Zones recommandées :", "- Namba", "- Umeda", "- Shin-Osaka"]
      }
    },
    tips: {
      title: "Conseils pratiques",
      items: [
        "Wi-Fi pocket indispensable",
        "Adaptateur électrique",
        "Parapluie portable",
        "Chaussures confortables",
        "Convenience stores pour repas rapides",
        "Codes culturels :",
        "- Pas de pourboire",
        "- Silence transports",
        "- Retirer chaussures",
        "- Files d'attente ordonnées"
      ]
    },
    emergency: {
      title: "Urgences & Santé",
      items: [
        "Numéro urgence : 119",
        "Cliniques anglophones principales",
        "Pharmacies : Matsumoto Kiyoshi",
        "Assurance voyage vérifiée"
      ]
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Itinéraire Japon 21 jours</h1>
      
      <div className="flex flex-wrap gap-2 mb-6">
        <Tab
          isActive={activeTab === 'preparation'}
          onClick={() => setActiveTab('preparation')}
        >
          Préparation
        </Tab>
        <Tab
          isActive={activeTab === 'itinerary'}
          onClick={() => setActiveTab('itinerary')}
        >
          Itinéraire
        </Tab>
        <Tab
          isActive={activeTab === 'practical'}
          onClick={() => setActiveTab('practical')}
        >
          Infos Pratiques
        </Tab>
      </div>

      {activeTab === 'preparation' && (
        <div className="space-y-4">
          <Card title="Documents Essentiels">
            <ul className="list-disc ml-6">
              {preTrip.documents.map((doc, idx) => (
                <li key={idx} className="text-gray-700">{doc}</li>
              ))}
            </ul>
          </Card>

          <Card title="Applications à installer">
            <ul className="list-disc ml-6">
              {preTrip.apps.map((app, idx) => (
                <li key={idx} className="text-gray-700">{app}</li>
              ))}
            </ul>
          </Card>
        </div>
      )}

      {activeTab === 'itinerary' && <ItineraryView cityData={cityData} />}

      {activeTab === 'practical' && (
        <div className="space-y-4">
          {Object.entries(practicalInfo).map(([key, section]) => (
            <Card 
              key={key}
              title={section.title}
              icon={
                key === 'budget' ? <Wallet className="h-5 w-5" /> :
                key === 'accommodation' ? <MapPin className="h-5 w-5" /> :
                key === 'tips' ? <Info className="h-5 w-5" /> :
                <Phone className="h-5 w-5" />
              }
            >
              {Array.isArray(section.items) ? (
                <ul className="list-disc ml-6">
                  {section.items.map((item, idx) => (
                    <li key={idx} className="text-gray-700">{item}</li>
                  ))}
                </ul>
              ) : (
                <div className="space-y-4">
                  {Object.entries(section.items).map(([city, items], idx) => (
                    <div key={idx}>
                      <h4 className="font-semibold mb-2">{city}</h4>
                      <ul className="list-disc ml-6">
                        {items.map((item, i) => (
                          <li key={i} className="text-gray-700">{item}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default JapanItinerary;