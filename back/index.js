const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const bcrypt = require('bcrypt');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const Customer = require('./models/customer');
const Property = require('./models/property');
const Booking = require('./models/Booking');

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());
app.use(cors());

// Ensure that your .env file contains a valid MONGO_URL
const mongoURI = process.env.MONGO_URL;
if (!mongoURI) {
    console.error('MongoDB URI is not set in .env file');
    process.exit(1);
}

mongoose.connect(mongoURI)
    .then(() => console.log('Connected to MongoDB'))
    .catch((error) => console.error('MongoDB connection error:', error));

const saltrounds = 10;

app.post('/insert', async (req, res) => {
    try {
        console.log(req.body);
        const { username, email, phone_no, password, country, roles } = req.body;

        const existingCustomer = await Customer.findOne({ email });
        if (existingCustomer) {
            return res.status(409).json({ emailExists: true, message: 'Email Already Registered' });
        }

        const hashedPassword = await bcrypt.hash(password, saltrounds);

        const newCustomer = new Customer({
            username,
            email,
            phone_no,
            password: hashedPassword,
            country,
            roles,
            status: roles === 'agent' ? false : true
        });

        const savedCustomer = await newCustomer.save();
        res.status(201).json(savedCustomer);
    } catch (error) {
        console.error('Error in Agent registration:', error.message);
        res.status(500).json({ error: 'Server error' });
    }
});

app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const customer = await Customer.findOne({ email });

        if (!customer) {
            return res.status(401).json({ message: 'Invalid email or password', status: false });
        }

        const passwordMatch = await bcrypt.compare(password, customer.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid email or password', status: false });
        }

        res.status(200).json({ data: customer, status: true });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Internal server error', status: false });
    }
});

app.get('/users', async (req, res) => {
    try {
        const users = await Customer.find({ roles: 'customer' });
        res.status(200).json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/agent', async (req, res) => {
    try {
        const agent = await Customer.find({ roles: 'agent' });
        res.status(200).json(agent);
    } catch (error) {
        console.error('Error fetching agencies:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/agencyprofile/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const agent = await Customer.findById(id);
        if (!agent) {
            return res.status(404).json({ message: 'Agency not found' });
        }
        res.json(agent);
    } catch (error) {
        console.error('Error fetching agency:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

app.put('/agencyverification/:agentid', async (req, res) => {
    try {
        const agentid = req.params.agentid;
        const agent = await Customer.findByIdAndUpdate(agentid, { $set: { status: req.body.status } }, { new: true });
        res.json(agent);
    } catch (error) {
        console.error('Error verifying user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.put('/updateagencyprofile/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const { ...rest } = req.body;

        const updatedProfile = await Customer.findByIdAndUpdate(id, rest, { new: true });

        if (!updatedProfile) {
            return res.status(404).json({ message: 'Profile not found' });
        }

        res.json({ message: 'Profile updated successfully' });
    } catch (error) {
        console.error('Error updating profile:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage });

app.post('/addproperty', upload.single('image'), async (req, res) => {
    try {
        const { title, description, price, location, user } = req.body;
        const imagePath = req.file ? req.file.filename : '';
        const newProperty = new Property({
            title,
            description,
            price,
            location,
            image: imagePath,
            status: 'available',
            user
        });
        const savedProperty = await newProperty.save();
        res.json({ message: 'Property added successfully', property: savedProperty });
    } catch (error) {
        console.error('Error adding property:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.use('/uploads', express.static('uploads'));

app.get('/properties', async (req, res) => {
    try {
        let properties = await Property.find();
        if (properties.length > 0) {
            const formattedProperties = properties.map(property => {
                return {
                    _id: property._id,
                    title: property.title,
                    description: property.description,
                    image: property.image ? property.image : null,
                    user: property.user
                };
            });
            res.json(formattedProperties);
        } else {
            res.json({ result: 'No Properties Found' });
        }
    } catch (error) {
        console.error('Error retrieving properties:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.get('/customerprofile/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const customer = await Customer.findById(id);
        if (!customer) {
            return res.status(404).json({ message: 'Customer not found' });
        }
        res.json(customer);
    } catch (error) {
        console.error('Error fetching customer:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

app.put('/updatecustomerprofile/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const { password, ...rest } = req.body;

        if (password) {
            const hashedPassword = await bcrypt.hash(password, saltrounds);
            rest.password = hashedPassword;
        }

        const updatedProfile = await Customer.findByIdAndUpdate(id, rest, { new: true });

        if (!updatedProfile) {
            return res.status(404).json({ message: 'Profile not found' });
        }

        res.json({ message: 'Profile updated successfully' });
    } catch (error) {
        console.error('Error updating profile:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

app.use('/uploads', express.static('uploads'));

app.get('/details/:id', async (req, res) => {
    try {
        const details = await Property.findById(req.params.id);
        if (!details) {
            return res.status(404).json({ message: 'Property not found' });
        }
        res.json(details);
    } catch (error) {
        console.error('Error fetching property:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.delete('/details/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deletedProperty = await Property.findByIdAndDelete(id);
        if (!deletedProperty) {
            return res.status(404).json({ message: 'Property not found' });
        }
        await Booking.deleteMany({ propertyId: id });
        res.json({ message: 'Property and associated bookings deleted successfully' });
    } catch (error) {
        console.error('Error deleting property:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.get('/myproperties/:id', async (req, res) => {
    try {
        const properties = await Property.find({ user: req.params.id });
        if (!properties) {
            return res.status(404).json({ message: 'No properties found for this user' });
        }
        res.json(properties);
    } catch (error) {
        console.error('Error fetching properties:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.put('/editproperty/:id', async (req, res) => {
    try {
        const { title, description, price, location } = req.body;
        const property = await Property.findById(req.params.id);
        if (!property) {
            return res.status(404).json({ message: 'Property not found' });
        }

        property.title = title;
        property.description = description;
        property.price = price;
        property.location = location;

        await property.save();
        res.json({ message: 'Property updated successfully' });
    } catch (error) {
        console.error('Error updating property:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.post('/bookproperty', async (req, res) => {
    try {
        const { userId, propertyId, bookedByUserId } = req.body;
        const existingBooking = await Booking.findOne({ userId, propertyId });
        if (existingBooking) {
            return res.status(409).json({ message: 'Property already booked by this user' });
        }

        const booking = new Booking({ userId, propertyId, bookedByUserId });
        await booking.save();
        res.status(201).json({ message: 'Property booked successfully' });
    } catch (error) {
        console.error('Error booking property:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.get('/bookings', async (req, res) => {
    try {
        const bookings = await Booking.find().populate('userId').populate('propertyId');
        res.json(bookings);
    } catch (error) {
        console.error('Error fetching bookings:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.get('/users/agent', async (req, res) => {
    try {
        const agents = await Customer.find({ roles: 'agent' });
        res.status(200).json(agents);
    } catch (error) {
        console.error('Error fetching agents:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
