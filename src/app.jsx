import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertCircle, Clock, Train, Hotel, Sun, Coffee } from 'lucide-react';

const JapanItinerary = () => {
  const cities = [
    {
      name: "Tokyo Arrivée",
      days: "Jours 1-5",
      routes: [
        {
          day: "Jour 1: Arrivée & Jetlag",
          spots: [
            "Arrivée Narita/Haneda",
            "Installation hôtel",
            "Balade quartier tranquille",
            "Conbini essentiels"
          ],
          time: "Journée calme",
          transport: "Narita Express ou Limousine Bus",
          tips: "Rester éveillé jusqu'à 21h, éviter sieste"
        },
        {
          day: "Jour 2: Shinjuku Doux",
          spots: [
            "Tokyo Metropolitan Building (vue gratuite)",
            "Shinjuku Gyoen",
            "Don Quijote",
            "Memory Lane (soir)"
          ],
          time: "4-5 heures",
          transport: "JR Yamanote Line",
          tips: "Parfait pour s'adapter au décalage"
        },
        {
          day: "Jour 3: Asakusa & Skytree",
          spots: [
            "Sensoji (6h-17h)",
            "Nakamise Shopping",
            "Taiyaki Hiiragi",
            "Asahi Building",
            "Skytree (soir)"
          ],
          time: "6-7 heures",
          transport: "Ligne Ginza → Asakusa"
        },
        {
          day: "Jour 4: Ueno & Akihabara",
          spots: [
            "Ueno Park",
            "Musée National",
            "Marché Ameyoko",
            "Kiyosumi Teien",
            "Akihabara Electric Town"
          ],
          time: "7-8 heures",
          transport: "JR Yamanote Line"
        },
        {
          day: "Jour 5: Repos & Flexible",
          spots: [
            "TeamLab Planets (option)",
            "Jardin Hamarikyu",
            "Croisière rivière Sumida",
            "Massage/Onsen"
          ],
          time: "Selon énergie",
          tips: "Jour parfait pour s'adapter à son rythme"
        }
      ]
    },
    {
      name: "Mont Fuji",
      days: "Jours 6-8",
      routes: [
        {
          day: "Jour 6: Route vers Fuji",
          spots: [
            "Départ Tokyo",
            "Chureito Pagoda",
            "Installation ryokan",
            "Onsen vue Fuji"
          ],
          time: "4-5 heures trajet inclus",
          transport: "Highway Bus depuis Tokyo Station"
        },
        {
          day: "Jour 7: Kawaguchiko",
          spots: [
            "Tour du lac",
            "Télécabine Mont Kachi Kachi",
            "Musée Kubota Itchiku"
          ],
          time: "6-7 heures",
          tips: "Meilleure vue du Fuji le matin"
        },
        {
          day: "Jour 8: Activités Fuji",
          spots: [
            "Grottes de lave Aokigahara",
            "Fuji Q Highland",
            "Randonnées faciles",
            "Villages traditionnels"
          ],
          time: "Selon activités choisies",
          tips: "Flexible selon météo"
        }
      ]
    },
    {
      name: "Kyoto",
      days: "Jours 9-13",
      routes: [
        {
          day: "Jour 9: Arrivée & Centre",
          spots: [
            "Transit vers Kyoto",
            "Nijo-jo",
            "Marché Nishiki",
            "Pontocho (soir)"
          ],
          time: "4-5 heures (après trajet)",
          transport: "Shinkansen depuis Mishima"
        },
        {
          day: "Jour 10: Nord Kyoto",
          spots: [
            "Kinkaku-ji",
            "Temple Ryoan-ji",
            "Arashiyama",
            "Forêt de bambous",
            "Gion (soir)"
          ],
          time: "7-8 heures",
          transport: "Bus Pass recommandé"
        },
        {
          day: "Jour 11: Est Kyoto",
          spots: [
            "Fushimi Inari (tôt)",
            "Ghibli shop",
            "Kiyomizu-dera",
            "Yasaka Shrine"
          ],
          time: "6-7 heures",
          tips: "Fushimi Inari avant 7h pour éviter foule"
        },
        {
          day: "Jour 12: Katsura & Gion",
          spots: [
            "Katsura Imperial Villa",
            "Philosopher's Path",
            "Nanzen-ji",
            "Dîner Gion"
          ],
          time: "6-7 heures",
          tips: "Réservation Katsura obligatoire"
        },
        {
          day: "Jour 13: Jour Flexible",
          spots: [
            "Eikan-do",
            "Tofuku-ji",
            "Vélo rivière",
            "Shopping final"
          ],
          time: "Selon choix",
          tips: "Parfait pour rattraper sites manqués"
        }
      ]
    },
    {
      name: "Osaka & Himeji",
      days: "Jours 14-17",
      routes: [
        {
          day: "Jour 14: Installation",
          spots: [
            "Transit installation",
            "Château d'Osaka",
            "Parc du château",
            "Shinsekai"
          ],
          time: "5-6 heures",
          transport: "Osaka Amazing Pass conseillé"
        },
        {
          day: "Jour 15: Sud Osaka",
          spots: [
            "Aquarium Kaiyukan",
            "Baie d'Osaka",
            "Kuromon Market",
            "Dotonbori"
          ],
          time: "6-7 heures",
          tips: "Kaiyukan: venir à l'ouverture"
        },
        {
          day: "Jour 16: Nord & Shopping",
          spots: [
            "Minoh Park",
            "Cascade",
            "Pokemon Café",
            "Shopping Umeda",
            "Okonomiyaki"
          ],
          time: "7-8 heures",
          tips: "Réserver Pokemon Café"
        },
        {
          day: "Jour 17: Himeji",
          spots: [
            "Château Himeji",
            "Jardins Koko-en",
            "Retour Osaka",
            "Kushikatsu"
          ],
          time: "8-9 heures avec trajet",
          transport: "JR Pass pour Himeji"
        }
      ]
    },
    {
      name: "Nara & Retour",
      days: "Jours 18-21",
      routes: [
        {
          day: "Jour 18: Nara Principale",
          spots: [
            "Parc aux daims",
            "Todai-ji",
            "Kasuga Taisha",
            "Naramachi"
          ],
          time: "6-7 heures",
          transport: "JR ou Kintetsu vers Nara"
        },
        {
          day: "Jour 19: Nara Extra",
          spots: [
            "Mont Yoshino",
            "Horyuji",
            "Yakushi-ji",
            "Musée National"
          ],
          time: "5-6 heures",
          tips: "Choix selon intérêts"
        },
        {
          day: "Jour 20: Retour Tokyo",
          spots: [
            "Shinkansen vers Tokyo",
            "Uniqlo Ginza",
            "Starbucks Reserve",
            "Shibuya Sky"
          ],
          time: "4-5 heures (après trajet)",
          transport: "Shinkansen avec JR Pass"
        },
        {
          day: "Jour 21: Départ",
          spots: [
            "Shopping dernière minute",
            "Départ aéroport"
          ],
          time: "Matinée libre",
          tips: "Prévoir 3h avant vol"
        }
      ]
    }
  ];

  return (
    <Card className="w-full max-w-4xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Train className="w-6 h-6" />
          Itinéraire Japon 21 Jours
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="Tokyo Arrivée">
          <TabsList className="grid w-full" style={{ gridTemplateColumns: 'repeat(5, 1fr)' }}>
            {cities.map((city) => (
              <TabsTrigger key={city.name} value={city.name}>
                {city.name}
                <span className="text-xs ml-1 opacity-75">{city.days}</span>
              </TabsTrigger>
            ))}
          </TabsList>
          
          {cities.map((city) => (
            <TabsContent key={city.name} value={city.name}>
              <div className="space-y-6">
                {city.routes.map((route, index) => (
                  <div key={index} className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                      <Sun className="w-5 h-5" />
                      {route.day}
                    </h3>
                    
                    <div className="mt-3 flex items-center gap-2 text-gray-600">
                      <Clock className="w-4 h-4" />
                      <span>{route.time}</span>
                    </div>
                    
                    {route.transport && (
                      <div className="mt-2 flex items-center gap-2 text-gray-600">
                        <Train className="w-4 h-4" />
                        <span>{route.transport}</span>
                      </div>
                    )}
                    
                    <ul className="list-disc pl-5 mt-3 space-y-1">
                      {route.spots.map((spot, i) => (
                        <li key={i}>{spot}</li>
                      ))}
                    </ul>
                    
                    {route.tips && (
                      <div className="mt-3 flex items-start gap-2 text-gray-600 bg-blue-50 p-2 rounded">
                        <AlertCircle className="w-4 h-4 mt-0.5" />
                        <span>{route.tips}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default JapanItinerary;