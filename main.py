import json
import random

property_types = ['House', 'Apartment', 'Condo', 'Residential', 'Cottage', 'Villa']
currencies = ['USD', 'EUR', 'GBP', 'AUD', 'CAD']

property_titles = [
    "Whispering Pines Estate", "Golden Meadow Retreat", "Silver Creek Haven", "Sunset Ridge Villa",
    "Ocean Breeze Cottage", "Maplewood Manor", "Hilltop Hideaway", "Crystal Lake Lodge",
    "Serenity Valley Ranch", "Mountain View Heights", "Blue Horizon Bungalow", "Riverstone Retreat",
    "Amberwood Acres", "Seaside Garden Villa", "The Ivy Cottage", "Lakeshore Retreat",
    "Oak Grove Manor", "Starlight Hill Villa", "Timberland Cabin", "Crescent Bay Estate",
    "Willow Creek House", "Meadowview Farm", "Pinecrest Hill Lodge", "Sunnybrook Estate",
    "Evergreen Valley Ranch", "Magnolia Grove Estate", "Windy Hill Cottage", "Wildflower Meadow",
    "Lush Valley Retreat", "Rocky Ridge Estate", "Grandview Manor", "Forest Glen Cottage",
    "Harborview Haven", "Tranquil Waters Lodge", "Elmwood Estate", "Goldenleaf Manor",
    "Silver Birch Villa", "Autumn Ridge Retreat", "Sunny Vale Estate", "Bayside Meadows",
    "Birchwood Cabin", "Cedar Grove Retreat", "Rolling Hills Estate", "Blue Mountain Lodge",
    "Riverbend Ranch", "Summit Peak Villa", "Meadowbrook Cottage", "Aspen Valley Lodge",
    "Horizon Ridge Estate", "Shady Pines Cabin"
]

def generate_property(id):
    return {
        "id": f"prop-{id:06}",
        "title": random.choice(property_titles),
        "price": random.randint(100000, 5000000),
        "currency": random.choice(currencies),
        "rooms": random.randint(1, 10),
        "bathrooms": random.randint(1, 10),
        "area": round(random.uniform(50.0, 500.0), 2),
        "type": random.choice(property_types),
        "_geo": {
            "lat":round(random.uniform(-90.0, 90.0), 6),
            "lng": round(random.uniform(-180.0, 180.0), 6)
        }
    }

data = [generate_property(i) for i in range(1, 1000001)]

file_path = 'properties.json'
with open(file_path, 'w') as f:
    json.dump(data, f, indent=2)

print(f"File saved at: {file_path}")
