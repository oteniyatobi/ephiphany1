const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3001;
const DB_FILE = path.join(__dirname, 'db.json');

app.use(cors());
app.use(bodyParser.json());

// Serve static files from the React app build directory
app.use(express.static(path.join(__dirname, '../dist')));

// Helper to read DB
const readDb = () => {
    try {
        const data = fs.readFileSync(DB_FILE, 'utf8');
        const parsed = JSON.parse(data);
        // Ensure essential fields exist
        return {
            bookings: parsed.bookings || [],
            users: parsed.users || [],
            credentials: parsed.credentials || [],
            events: parsed.events || []
        };
    } catch (err) {
        console.error('Error reading database file, returning defaults. Data may be lost!', err);
        return { bookings: [], users: [], credentials: [], events: [] };
    }
};

// Helper to write DB
const writeDb = (data) => {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
};

// Signup Endpoint
app.post('/api/auth/signup', (req, res) => {
    console.log('Signup request received:', req.body);
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        console.log('Signup failed: missing fields');
        return res.status(400).json({ success: false, error: 'All fields are required' });
    }

    const db = readDb();

    if (db.credentials.find(c => c.email === email)) {
        console.log('Signup failed: user already exists', email);
        return res.status(400).json({ success: false, error: 'User already exists' });
    }

    const newUser = {
        id: `user-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        name,
        email,
        phone: '',
        location: ''
    };

    db.users.push(newUser);
    db.credentials.push({ email, password });
    writeDb(db);

    res.json({ success: true, user: newUser });
});

// Login Endpoint
app.post('/api/auth/login', (req, res) => {
    console.log('Login request received:', req.body.email);
    const { email, password } = req.body;
    const db = readDb();

    const credential = db.credentials.find(c => c.email === email);

    if (!credential || credential.password !== password) {
        console.log('Login failed: invalid credentials', email);
        return res.status(401).json({ success: false, error: 'Invalid email or password' });
    }

    const user = db.users.find(u => u.email === email);
    console.log('Login successful:', email);

    if (!user) {
        console.log('Login failed: user record missing for', email);
        return res.status(404).json({ success: false, error: 'User record not found' });
    }

    res.json({ success: true, user });
});

// Update User Endpoint
app.put('/api/users/:id', (req, res) => {
    const { id } = req.params;
    const updates = req.body;
    const db = readDb();

    const userIndex = db.users.findIndex(u => u.id === id);

    if (userIndex === -1) {
        return res.status(404).json({ success: false, error: 'User not found' });
    }

    db.users[userIndex] = { ...db.users[userIndex], ...updates };
    writeDb(db);

    res.json({ success: true, user: db.users[userIndex] });
});

// Get User By Email Endpoint (Internal use mostly)
app.get('/api/users/email/:email', (req, res) => {
    const { email } = req.params;
    const db = readDb();
    const user = db.users.find(u => u.email === email);

    if (user) {
        res.json(user);
    } else {
        res.status(404).json(null);
    }
});

// Create a booking
app.post('/api/bookings', (req, res) => {
    const { userId, itemId, itemTitle, date, quantity, totalPrice, category } = req.body;
    const db = readDb();

    if (!db.bookings) {
        db.bookings = [];
    }

    const newBooking = {
        id: `book-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        userId,
        itemId,
        itemTitle,
        category, // 'Event' or 'Experience'
        date,
        quantity,
        totalPrice,
        status: 'confirmed',
        createdAt: new Date().toISOString()
    };

    db.bookings.push(newBooking);
    writeDb(db);

    res.status(201).json(newBooking);
});

// Get user bookings
app.get('/api/bookings/:userId', (req, res) => {
    const db = readDb();
    const bookings = db.bookings || [];
    const userBookings = bookings.filter(b => b.userId === req.params.userId);
    res.json(userBookings);
});

// --- Events API ---

// Get all events
app.get('/api/events', (req, res) => {
    const db = readDb();
    let events = db.events || [];

    // Filter out past events
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const upcomingEvents = events.filter(event => {
        try {
            const eventDate = new Date(event.date);
            return eventDate >= today;
        } catch (e) {
            return true; // Keep if date is unparseable for some reason
        }
    });

    res.json(upcomingEvents);
});

// Create a new event
app.post('/api/events', (req, res) => {
    const newEvent = req.body;
    const db = readDb();

    if (!db.events) db.events = [];

    // Simple validation
    if (!newEvent.title || !newEvent.date) {
        return res.status(400).json({ success: false, error: 'Title and date are required' });
    }

    const eventWithId = {
        id: `event-${Date.now()}`,
        ...newEvent
    };

    db.events.push(eventWithId);
    writeDb(db);

    res.status(201).json(eventWithId);
});

// Delete an event
app.delete('/api/events/:id', (req, res) => {
    const { id } = req.params;
    const db = readDb();

    if (!db.events) return res.status(404).json({ success: false, error: 'No events found' });

    const eventIndex = db.events.findIndex(e => e.id === id);
    if (eventIndex === -1) {
        return res.status(404).json({ success: false, error: 'Event not found' });
    }

    db.events.splice(eventIndex, 1);
    writeDb(db);

    res.json({ success: true, message: 'Event deleted' });
});

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
