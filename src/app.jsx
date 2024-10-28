import React, { useState } from 'react';
import { ChevronDown, MapPin, Calendar, Wallet, Phone, Info } from 'lucide-react';

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

  const cityData = {
    tokyo1: {
      title: "Tokyo Première Partie",
      days: {
        1: {
          "Matin/Après-midi": "Arrivée Narita/Haneda",
          "Transport": ["Narita Express (JR Pass)", "Limousine Bus (plus reposant)"],
          "Soir": ["Installation hôtel", "Balade dans le quartier", "Conbini pour essentiels", "Dîner léger local"]
        },
        2: {
          "Matin": ["Tokyo Metropolitan Building", "Shinjuku Gyoen"],
          "Après-midi": ["Découverte Shinjuku", "Don Quijote"],
          "Soir": "Memory Lane (Omoide Yokocho)"
        },
        3: {
          "Matin": ["Sanctuaire Sensoji", "Nakamise Shopping Street", "Taiyaki Hiiragi"],
          "Midi": "Onigiri Asakura Yadoroku",
          "Après-midi": ["Asahi Building", "Sumida Park", "Balade rivière"],
          "Soir": ["Skytree", "Solamachi mall"]
        },
        4: {
          "Matin": ["Ueno Park", "Musée National de Tokyo", "Marché Ameyoko"],
          "Après-midi": ["Kiyosumi Teien", "Akihabara Electric Town"],
          "Soir": ["Mandarake Complex", "@Home cafe", "Yodobashi Camera"]
        },
        5: {
          "Options": ["TeamLab Planets", "Jardin Hamarikyu", "Croisière Sumida", "Massage/Onsen"]
        }
      }
    },
    fuji: {
      title: "Mont Fuji & Kawaguchiko",
      days: {
        6: {
          "Matin": "Départ Tokyo",
          "Après-midi": ["Chureito Pagoda", "Installation ryokan"],
          "Soir": "Onsen avec vue Fuji"
        },
        7: {
          "Journée": ["Tour du lac", "Télécabine Mont Kachi Kachi", "Musée Kubota Itchiku"],
          "Options": ["Randonnée (si saison)", "Guides disponibles"]
        },
        8: {
          "Options": ["Grottes de lave Aokigahara", "Fuji Q Highland", "Randonnées faciles", "Villages traditionnels"]
        }
      }
    },
    kyoto: {
      title: "Kyoto",
      days: {
        9: {
          "Matin": "Transit vers Kyoto",
          "Après-midi": ["Nijo-jo", "Marché Nishiki"],
          "Soir": "Pontocho"
        },
        10: {
          "Journée": ["Kinkaku-ji", "Temple Ryoan-ji", "Arashiyama", "Forêt de bambous"],
          "Soir": "Gion exploration"
        },
        11: {
          "Matin": "Fushimi Inari",
          "Après-midi": ["Ghibli shop", "Kiyomizu-dera"],
          "Soir": ["Yasaka Shrine", "Maruhachi"]
        },
        12: {
          "Matin": "Katsura Imperial Villa",
          "Après-midi": ["Philosopher's Path", "Nanzen-ji"],
          "Soir": ["Issen Yoshoku", "Mososhin"]
        },
        13: {
          "Options": ["Eikan-do", "Tofuku-ji", "Sanjusangendo", "Vélo le long de la rivière"],
          "Soir": ["Breitz Cafe", "Shopping dernière chance"]
        }
      }
    },
    osaka: {
      title: "Osaka",
      days: {
        14: {
          "Matin": "Transit et installation",
          "Après-midi": ["Château d'Osaka", "Parc du château"],
          "Soir": "Shinsekai"
        },
        15: {
          "Journée": ["Aquarium Kaiyukan", "Baie d'Osaka", "Kuromon Market"],
          "Soir": "Dotonbori"
        },
        16: {
          "Matin": "Minoh Park + Cascade",
          "Après-midi": ["Pokemon Café", "Shopping Umeda"],
          "Soir": "Okonomiyaki"
        },
        17: {
          "Matin": "Château Himeji",
          "Après-midi": "Jardins Koko-en",
          "Soir": "Retour Osaka + Kushikatsu Daruma"
        }
      }
    },
    nara: {
      title: "Nara",
      days: {
        18: {
          "Journée": ["Parc aux daims", "Todai-ji", "Kasuga Taisha"],
          "Soir": "Quartier Naramachi"
        },
        19: {
          "Options": ["Mont Yoshino", "Horyuji", "Yakushi-ji", "Musée National"]
        }
      }
    },
    tokyo2: {
      title: "Tokyo Retour",
      days: {
        20: {
          "Matin": "Shinkansen vers Tokyo",
          "Après-midi": ["Uniqlo Ginza", "Starbucks Reserve Roastery"],
          "Soir": "Shibuya Sky"
        },
        21: {
          "Matin": "Shopping dernière minute",
          "Midi": "Départ vers aéroport"
        }
      }
    }
  };

  const practicalInfo = {
    budget: {
      title: "Budget & Paiement",
      items: [
        "Retrait 7-Eleven ou Post Office",
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

      {activeTab === 'itinerary' && (
        <div className="space-y-4">
          {Object.entries(cityData).map(([key, city]) => (
            <Accordion 
              key={key} 
              title={city.title}
              icon={<MapPin className="h-5 w-5" />}
            >
              <div className="space-y-4">
                {Object.entries(city.days).map(([day, content]) => (
                  <ItineraryDay key={day} day={day} content={content} />
                ))}
              </div>
            </Accordion>
          ))}
        </div>
      )}

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