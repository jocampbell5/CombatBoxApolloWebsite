export function getAircraftIcon(type) {
    // Define the icon map, ensuring the type matches filenames in your icon folder
    const iconMap = {
        "fw190a6": "fw 190 a-6.png",
        "fw190a8": "fw 190 a-8.png",
        "bf109g6late": "bf 109 g-6 late.png",
        "bf109g14": "bf 109 g-14.png",
        "bf110g2": "bf 110 g-2.png",
        "me410a1": "me 410 a-1.png",
        "bf109g6as": "bf 109 g-6as.png",
        "ju88a4": "ju 88 a-4.png",
        "ju88c6": "ju 88 c-6.png",
        "spitfiremkixc": "spitfire mk.ixc.png",
        "typhoonmkib": "typhoon mk.ib.png",
        "spitfiremkixe": "spitfire mk.ixe.png",
        "p51b5": "p-51b-5.png",
        "a20b": "a-20b.png",
        "mosquitofbmkvis2": "mosquito f.b. mk.vi ser.2.png",
        "c47a": "c-47a.png",
        "fw190a6": "fw 190 a-6.png",
        "fw190a8": "fw 190 a-8.png",
        "p47d22": "p-47d-22.png",
        "p47d28": "p-47d-28.png",
        "p38j25": "p-38j-25.png",
        "p51d15": "p-51d-15.png",
        "ju523mg4e": "ju 52 3mg4e.png"



        // Add other mappings as needed
    };

    // Return the mapped filename or a default icon if not found
    return iconMap[type] || "default-icon.png";
}