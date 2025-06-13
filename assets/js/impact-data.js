// Impact Map Location Data
// Replace this with your actual location data

export const locations = [
    {
        name: "Delhi NCR",
        lat: 28.6139,
        lng: 77.2090,
        beneficiaries: "50,000+",
        budget: "₹2.5 Crores"
    },
    {
        name: "Mumbai",
        lat: 19.0760,
        lng: 72.8777,
        beneficiaries: "75,000+",
        budget: "₹3.8 Crores"
    },
    {
        name: "Bangalore",
        lat: 12.9716,
        lng: 77.5946,
        beneficiaries: "40,000+",
        budget: "₹2.1 Crores"
    },
    {
        name: "Chennai",
        lat: 13.0827,
        lng: 80.2707,
        beneficiaries: "35,000+",
        budget: "₹1.9 Crores"
    },
    {
        name: "Kolkata",
        lat: 22.5726,
        lng: 88.3639,
        beneficiaries: "45,000+",
        budget: "₹2.3 Crores"
    },
    {
        name: "Hyderabad",
        lat: 17.3850,
        lng: 78.4867,
        beneficiaries: "30,000+",
        budget: "₹1.6 Crores"
    },
    {
        name: "Pune",
        lat: 18.5204,
        lng: 73.8567,
        beneficiaries: "25,000+",
        budget: "₹1.4 Crores"
    },
    {
        name: "Ahmedabad",
        lat: 23.0225,
        lng: 72.5714,
        beneficiaries: "28,000+",
        budget: "₹1.5 Crores"
    },
    {
        name: "Jaipur",
        lat: 26.9124,
        lng: 75.7873,
        beneficiaries: "22,000+",
        budget: "₹1.2 Crores"
    },
    {
        name: "Lucknow",
        lat: 26.8467,
        lng: 80.9462,
        beneficiaries: "18,000+",
        budget: "₹1.0 Crores"
    },
    {
        name: "Bhopal",
        lat: 23.2599,
        lng: 77.4126,
        beneficiaries: "15,000+",
        budget: "₹0.8 Crores"
    },
    {
        name: "Patna",
        lat: 25.5941,
        lng: 85.1376,
        beneficiaries: "20,000+",
        budget: "₹1.1 Crores"
    }
];

// You can also add additional data structures for different types of impact
export const impactCategories = {
    education: {
        color: 0x4CAF50,
        name: "Education"
    },
    healthcare: {
        color: 0x2196F3,
        name: "Healthcare"
    },
    livelihood: {
        color: 0xFF9800,
        name: "Livelihood"
    },
    disaster_relief: {
        color: 0xF44336,
        name: "Disaster Relief"
    }
};

// Sample extended location data with categories
export const extendedLocations = [
    {
        name: "Delhi NCR",
        lat: 28.6139,
        lng: 77.2090,
        beneficiaries: "50,000+",
        budget: "₹2.5 Crores",
        category: "education",
        programs: ["Shiksha Na Ruke", "Mission Education", "Smile Twin e-Learning"]
    },
    {
        name: "Mumbai",
        lat: 19.0760,
        lng: 72.8777,
        beneficiaries: "75,000+",
        budget: "₹3.8 Crores",
        category: "healthcare",
        programs: ["Smile on Wheels", "Comprehensive Health Care", "Nutrition Support"]
    }
    // Add more locations as needed
];