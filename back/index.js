const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config()
const bcrypt = require('bcrypt');
const cors = require('cors');
const jwt = require('jsonwebtoken')
const multer = require('multer')
const Customer = require('./models/customer'); 
const property = require('./models/property');
const Booking = require('./models/Booking');
const Property = require('./models/property');
const app = express();
const port = process.env.PORT;
require("dotenv").config

app.use(express.json()); 
app.use(cors());

//mongodb://127.0.0.1:27017/ProjectREM

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('Connected to MongoDB'))
    .catch((error) => console.error('MongoDB connection error:', error));

const saltrounds = 10;
// const secretKey = 'abc';


app.post('/insert', async (req, res) => {
    try {

    console.log(req.body);
        const { username, email, phone_no, password, country, roles } = req.body;

       
        const existingCustomer = await Customer.findOne({ email });
        if (existingCustomer) {
            return res.status(409).json({ emailExists: true, message: 'Email Already Registered' });
        }

        
        const hashedPassword = await bcrypt.hash(password, saltrounds);

        if(req.body.roles === 'agent'){
            const newCustomer = new Customer({
                username,
                email,
                phone_no,
                password: hashedPassword,
                country,
                roles,
                status:false,
                
            });

            const savedCustomer = await newCustomer.save();
            console.log('gfgffggf', savedCustomer);
    
            
            res.status(201).json(savedCustomer);
        }else{
            const newCustomer = new Customer({
                username,
                email,
                phone_no,
                password: hashedPassword,
                country,
                roles,
                status:true
            });
            const savedCustomer = await newCustomer.save();
            console.log('gfgffggf', savedCustomer);
    
            
            res.status(201).json(savedCustomer);
        }
       
      
    } catch (error) {
        
        console.error('Error in Agent registration:', error.message);
        res.status(500).json({ error: 'Server error' });
    }
});



app.post('/login', async (req, res) => {
    try {
      const { email, password } = req.body;
      const customer = await  Customer.findOne({ email });
  
      if (!customer) {
        return res.status(401).json({ message: 'Invalid email or password',status:false });
      }
  
      const passwordMatch = await bcrypt.compare(password, customer.password);
      if (!passwordMatch) {
        return res.status(401).json({ message: 'Invalid email or password',status:false});
      }
  
    //   const token = jwt.sign({ id: user._id, email: user.email }, secretKey);
    //   res.json({ user, token });
    res.status(200).json({data:customer,status:true})
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ message: 'Internal server error',status:false});
    }
  });
  
  
  // Add routes to fetch all users and agencies
app.get('/users', async (req, res) => {
    try {
        const users = await Customer.find({ roles: 'customer'});
        res.status(200).json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/agent', async (req, res) => {
    try {
        const agent = await Customer.find({roles: 'agent'});
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
      console.log(req.body.status)
      console.log(agentid,'--s');
      const agent = await Customer.findByIdAndUpdate(agentid, { $set:{status: req.body.status} },{new:true});
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
    // Extract data from request body
    const { title, description, price, location,user } = req.body;
    // Extract file path of uploaded image
    const imagePath = req.file ? req.file.filename : '';
    // Create a new Property instance
    const newProperty = new Property({
      title: title,
      description: description,
      price: price,
      location: location,
      image: imagePath,
      status: 'available',
      user:user
    });
    // Save the property to the database
    const savedProperty = await newProperty.save();
    // Send response with success message and saved property data
    res.json({ message: 'Property added successfully', property: savedProperty });
  } catch (error) {
    console.error('Error adding property:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

  app.use('/uploads', express.static('uploads'));
  
  app.get('/properties', async (req, res) => {
    try {
      let properties = await property.find();
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
        const details = await property.findById(req.params.id);
        if (!details) {
            return res.status(404).json({ message: 'Property not found' });
        }
        res.json(details);
    } catch (error) {
        console.error('Error fetching property:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});



app.get('/properties/:id', (req, res) => {
  const propertyId = req.params.id;
  const property = property.find(prop => prop.id === propertyId);
  if (property) {
    res.json(property);
  } else {
    res.status(404).json({ error: 'Property not found' });
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
      res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.get('/agencyprofile/:id', async (req, res) => {
  try {
      const user = req.params.id;
      const agency = await Property.findById(user);
      res.json(agency)
      if (!user) {
          return res.status(404).json({ message: 'Agency not found' });
      }
      res.json(user);
  } catch (error) {
      console.error('Error fetching agency:', error);
      res.status(500).json({ error: 'Server error' });
  }
});


app.post('/bookings', async (req, res) => {
  try {
    const {
      propertyId,
      propertyTitle,
      checkinDate,
      checkoutDate,
      guests,
      age,
      marriageStatus,
      adharNumber,
      state,
      address,
      user,
      status
    } = req.body;

    // Create a new booking record
    const newBooking = new Booking({
      propertyId,
      propertyTitle,
      checkinDate,
      checkoutDate,
      guests,
      age,
      marriageStatus,
      adharNumber,
      state,
      address,
      user,
      status
    });

    // Save the booking to the database
    const savedBooking = await newBooking.save();
    const updatedProperty = await Property.findByIdAndUpdate(propertyId, { status: 'rented' }, { new: true });
   
    res.json({ message: 'Booking successful', booking: savedBooking,updatedProperty });
} catch (error) {
    console.error('Error making booking:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


app.get('/agencyproperties/:id', async (req, res) => {
  try {
      const id = req.params.id;
      const properties = await property.find({ user: id });
      res.json(properties);
  } catch (error) {
      console.error('Error fetching agency properties:', error);
      res.status(500).json({ message: 'Internal server error' });
  }
});

app.get('/bookings/agent/:agencyId', async (req, res) => {
  try {
    const agencyId = req.params.agencyId;
    console.log(agencyId);

    const properties = await Property.find({ user: agencyId });
    console.log(properties);

    let responseData = [];

    for (const property of properties) {
      
      const bookings = await Booking.find({ propertyId: property._id });
      console.log(bookings);
      for (const booking of bookings) {
        
        const customer = await Customer.findById(booking.user);

        
        const bookingData = {
          booking: booking,
          customer: customer,
          property: property,
        };

        // Push the bookingData into responseData
        responseData.push(bookingData);
      }
    }

    // Send the responseData as JSON response
    res.json(responseData);
  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


app.get('/propertiessearch', async (req, res) => {
  try {
    const { location } = req.query; // Extract location query parameter
    
    // If location is provided, filter properties based on it; otherwise, fetch all properties
    const properties = location ? 
      await Property.find({ location: { $regex: new RegExp(location, "i") } }) :
      await Property.find();
    
    res.status(200).json(properties);
  } catch (error) {
    console.error('Error fetching properties:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});
