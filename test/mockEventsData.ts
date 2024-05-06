const mockEventsData = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      properties: {
        id: "EONET_6512",
        title: "Tropical Cyclone Hidaya",
        description: null,
        link: "https://eonet.gsfc.nasa.gov/api/v3/events/EONET_6512/geojson",
        closed: null,
        date: "2024-05-01T12:00:00Z",
        magnitudeValue: 35.0,
        magnitudeUnit: "kts",
        categories: [
          {
            id: "severeStorms",
            title: "Severe Storms",
          },
        ],
        sources: [
          {
            id: "JTWC",
            url: "https://www.metoc.navy.mil/jtwc/products/sh2324.tcw",
          },
        ],
      },
      geometry: {
        type: "Point",
        coordinates: [45.1, -8.6],
      },
    },
    {
      type: "Feature",
      properties: {
        id: "EONET_6512",
        title: "Tropical Cyclone Hidaya",
        description: null,
        link: "https://eonet.gsfc.nasa.gov/api/v3/events/EONET_6512/geojson",
        closed: null,
        date: "2024-05-01T18:00:00Z",
        magnitudeValue: 35.0,
        magnitudeUnit: "kts",
        categories: [
          {
            id: "severeStorms",
            title: "Severe Storms",
          },
        ],
        sources: [
          {
            id: "JTWC",
            url: "https://www.metoc.navy.mil/jtwc/products/sh2324.tcw",
          },
        ],
      },
      geometry: {
        type: "Point",
        coordinates: [44.9, -8.8],
      },
    },
  ],
};
export default mockEventsData;
