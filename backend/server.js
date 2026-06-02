const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS for frontend origin (Vite dev server)
app.use(cors({
  origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type']
}));

// Parse JSON request bodies
app.use(express.json());

// Mongoose Schema definition for Doorstep Pickup Registration
const registrationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 3
  },
  phone: {
    type: String,
    required: true,
    trim: true
  },
  address: {
    type: String,
    required: true,
    trim: true,
    minlength: 10
  },
  registeredAt: {
    type: Date,
    default: Date.now
  }
});

const Registration = mongoose.model('Registration', registrationSchema);

// Seeding function to insert standard Green Heroes mock records if collection is empty
const seedMockData = async () => {
  try {
    const count = await Registration.countDocuments();
    if (count === 0) {
      console.log("Database is empty. Seeding initial Green Heroes mock data...");
      const mockData = [
        {
          name: "Ramesh Patel",
          phone: "9876543210",
          address: "A-402, Shalin Heights, Sector 21, Gandhinagar",
          registeredAt: new Date(Date.now() - 4 * 3600000)
        },
        {
          name: "Dr. Ananya Sharma",
          phone: "9988776655",
          address: "Block C, Govt Officers Residential Qtrs, Sector 19, Gandhinagar",
          registeredAt: new Date(Date.now() - 10 * 3600000)
        },
        {
          name: "Jayesh Mehta",
          phone: "9123456789",
          address: "Flat 12, Sunrise Residency, Kudasan, Gandhinagar",
          registeredAt: new Date(Date.now() - 24 * 3600000)
        }
      ];
      await Registration.insertMany(mockData);
      console.log("Mock data seeded successfully.");
    }
  } catch (err) {
    console.error("Error seeding mock data:", err);
  }
};

// Establish MongoDB connection
const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/green_heroes';
mongoose.connect(mongoUri)
  .then(() => {
    console.log("Connected successfully to MongoDB Atlas database!");
    seedMockData();
  })
  .catch((err) => {
    console.error("CRITICAL: Failed to connect to MongoDB Atlas!", err.message);
    console.error("Please verify that your MONGO_URI and password are correct in backend/.env.");
  });

// Helper to validate phone number format (standard 10 digits optionally prefixed by country code)
const isValidPhone = (phone) => {
  const cleanPhone = phone.replace(/[\s-()]/g, '');
  return /^\+?[0-9]{10,12}$/.test(cleanPhone);
};

// GET /api/registrations - Return all submitted registrations
app.get('/api/registrations', async (req, res) => {
  try {
    // 1. Fetch all registrations sorted by registeredAt ascending to calculate stable sequential IDs
    const docs = await Registration.find({}).sort({ registeredAt: 1 });

    // 2. Map registrations to include the numerical "id" field based on their insertion order
    const mapped = docs.map((doc, idx) => ({
      id: idx + 1,
      _id: doc._id,
      name: doc.name,
      phone: doc.phone,
      address: doc.address,
      registeredAt: doc.registeredAt.toISOString()
    }));

    // 3. Sort by latest registration first (descending) as expected by the frontend
    const sorted = mapped.sort((a, b) => new Date(b.registeredAt) - new Date(a.registeredAt));

    res.status(200).json({
      success: true,
      count: sorted.length,
      data: sorted
    });
  } catch (error) {
    console.error("Error fetching registrations:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error occurred while retrieving registrations."
    });
  }
});

  
      

// POST /api/register - Validate and register a new Green Hero doorstep pickup
app.post('/api/register', async (req, res) => {
  try {
    const { name, phone, address } = req.body;

    // 1. Validate required fields presence
    if (!name || !phone || !address) {
      return res.status(400).json({
        success: false,
        message: "Registration failed. All fields (Full Name, Phone Number, and Address) are strictly required."
      });
    }

    // 2. Trim and sanitize inputs
    const trimmedName = name.trim();
    const trimmedPhone = phone.trim();
    const trimmedAddress = address.trim();

    // 3. Detailed validation
    if (trimmedName.length < 3) {
      return res.status(400).json({
        success: false,
        message: "Registration failed. Full Name must be at least 3 characters long."
      });
    }

    if (!isValidPhone(trimmedPhone)) {
      return res.status(400).json({
        success: false,
        message: "Registration failed. Please enter a valid 10-digit Indian phone number (e.g. 9876543210)."
      });
    }

    if (trimmedAddress.length < 10) {
      return res.status(400).json({
        success: false,
        message: "Registration failed. Please provide a complete doorstep pickup address (minimum 10 characters)."
      });
    }

    // 4. Check for duplicate registration by phone (avoid double pickups for same phone in same batch)
    const cleanPhone = trimmedPhone.replace(/[\s-()]/g, '');
    const allRegistrations = await Registration.find({});
    const isDuplicate = allRegistrations.some(r => r.phone.replace(/[\s-()]/g, '') === cleanPhone);

    if (isDuplicate) {
      return res.status(409).json({
        success: false,
        message: "This phone number is already registered for a doorstep pickup in this batch."
      });
    }

    // 5. Construct and store registration in MongoDB
    const newDoc = new Registration({
      name: trimmedName,
      phone: trimmedPhone,
      address: trimmedAddress,
      registeredAt: new Date()
    });

    await newDoc.save();

    // To return the same structure with a numerical ID, calculate the new serial number
    const totalCount = await Registration.countDocuments();

    const responseData = {
      id: totalCount,
      _id: newDoc._id,
      name: newDoc.name,
      phone: newDoc.phone,
      address: newDoc.address,
      registeredAt: newDoc.registeredAt.toISOString()
    };

    console.log(`[New Registration] Hero #${responseData.id} joined! Name: ${trimmedName}, Sector: ${trimmedAddress.substring(0, 30)}...`);

    res.status(201).json({
      success: true,
      message: "Congratulations! You are officially a Gandhinagar Green Hero. Your free doorstep pickup has been scheduled successfully.",
      data: responseData
    });

  } catch (error) {
    console.error("Error creating registration:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error occurred while scheduling your doorstep pickup."
    });
  }
});

// Root check endpoint
app.get('/', (req, res) => {
  res.status(200).send("Gandhinagar Green Heroes API Server is running. Base endpoints: /api/registrations, /api/register");
});

// Start the Express Server
app.listen(PORT, async () => {
  const docCount = await Registration.countDocuments().catch(() => 0);
  console.log(`=======================================================`);
  console.log(` GANDHINAGAR GREEN HEROES - EXPRESS SERVER RUNNING    `);
  console.log(` URL: http://localhost:${PORT}                          `);
  console.log(` In-memory db initialized with ${docCount} mock heroes.`);
  console.log(`=======================================================`);
});
