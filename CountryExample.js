const { cleanCountriesFiltered } = require("./client/src/redux/actions")

flattenedArrayOfCountries = [
    //i
    { //country[1]
        "name": "Christmas Island",
        "id": "CXR",
        "capital": "Flying Fish Cove",
        "region": "Oceania",
        "subregion": "Australia and New Zealand",
        "area": 135.0,
        "population": 2072,
        "continents": "Asia",
        "flags": "https://flagcdn.com/cx.svg",
        "TouristicActivities": [
            //i 
            //country[1].TouristicActivities
            {           //i                    //j 
                //country[1].TouristicActivities[1]
                "id": 1,
                "name": "surf",
                "difficulty": 4,
                "duration": 30,
                "season": "Summer"
            },
            {           //i                    //j
                //country[1].TouristicActivities[2]
                "id": 2,
                "name": "ski",
                "difficulty": 4,
                "duration": 60,
                "season": "Winter"
            }
        ]
    },
    {//country[2]
        "name": "Peru",
        "id": "PER",
        "capital": "Lima",
        "region": "Americas",
        "subregion": "South America",
        "area": 1285216.0,
        "population": 32971846,
        "continents": "South America",
        "flags": "https://flagcdn.com/w320/pe.png",
        "TouristicActivities": [
            //i 
            //country[2].TouristicActivities
            {           //i                    //j 
                //country[2].TouristicActivities[1]
                "id": 1,
                "name": "surf",
                "difficulty": 4,
                "duration": 30,
                "season": "Summer"
            },
            {           //i                    //j 
                //country[2].TouristicActivities[2]
                "id": 3,
                "name": "sightseeing tour",
                "difficulty": 1,
                "duration": 120,
                "season": "Winter"
            }
        ]
    }
]

