export function getReconPhoto(objectiveName) {
    const imagesMap = {
        "Abbeville Drucat Airfield": ["Abbeville Drucat Airfield.jpg"],
        "Rouen Rail Yards": [
            "Rouen Rail Yards - Zone 1.jpg",
            "Rouen Rail Yards - Zone 2.jpg",
            "Rouen Rail Yards - Zone 3.jpg"
        ],
        "Carpiquet": ["Carpiquet Airfield.jpg"],
        "La Vielle": ["La Vielle Airfield.jpg"],
        "Pontorson": ["Pontorson Airfield.jpg"],
        "Triqueville": ["Trequeville Airfield.jpg"],
        "Maupertus": ["Maupertus Airfield.jpg"],
        "Lonrai": ["Lonrai Airfield.jpg"],
        "Cretteville": ["Cretteville Airfield.jpg"],
        "Le Havre Octeville": ["Le Havre Octeville Airfield.jpg"],
        "Beaumont Le Roger": ["Beaumont le Roger Airfield.jpg"],
        "Saint-Valery-en-Caux Flak School": ["Saint Valery-en-Caux Flak.jpg"],
        "Bolbec Aviation Fuel Logistics": ["Bolbec Aviation Fuel Logistics.jpg"],
        "Arromanches Mulberry B": ["Arromanches Mulberry B.jpg"],
        "Cabourg Coastal Defences": ["Cabourg Coastal Defences.jpg"],
        "Lisieux Ball Bearing Factory": ["Lisieux Ball Bearing Factory.jpg"],
        "Coutances Road and Rail Junction": ["Coutances Road and Rail Junction.jpg"],
        "Villedieu Fuel Depot": ["Villedieu Fuel Depot.jpg"],
        "Vire Command And Logistics": ["Vire Command and Logistics.jpg"],
        "Conde sur Noireau Tank Repair Station": ["Conde Sur Noireau Tank Re-Enforcements.jpg"],
        "Falaise Encampment": ["Falaise Troop Encampment.jpg"],
        "Vimoutiers Sawmill and Logging Station": ["Vimoutiers Sawmill.jpg"],
        "L Aigle Supply Dump": ["LAigle supply Dump.jpg"],
        "Argentan Switching Yard": ["Argentan.jpg"],
        "Saint Hilaire River Crossing": ["Saint Hilaire River Crossing.jpg"],
        "La Ferte Mace Troop Encampment": ["Le Ferta Mace Troop Encampment.jpg"],
        "Domfront HFDF Site": ["Domfront HFDF Site.jpg"],
        "Perche HFDF Testing Facility": ["Perch HFDF Testing Facility.jpg"],
        // Add more airfields and their images as needed
    };

    return imagesMap[objectiveName] || [];
}