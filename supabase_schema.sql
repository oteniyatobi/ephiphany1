-- Clean slate: Drop existing tables if they exist
DROP TABLE IF EXISTS public.bookings CASCADE;
DROP TABLE IF EXISTS public.users CASCADE;
DROP TABLE IF EXISTS public.events CASCADE;
DROP TABLE IF EXISTS public.products CASCADE;
DROP TABLE IF EXISTS public.experiences CASCADE;
DROP TABLE IF EXISTS public.hotels CASCADE;

-- 1. Create Users Table (Extended Profile)
-- Note: 'id' should match the UUID from Supabase Auth
CREATE TABLE public.users (
    id UUID PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    phone TEXT,
    location TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Create Events Table
CREATE TABLE public.events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    category TEXT,
    date TEXT,
    time TEXT,
    venue TEXT,
    location TEXT,
    price TEXT,
    image TEXT,
    featured BOOLEAN DEFAULT false,
    tickets_left INTEGER DEFAULT 0,
    ticket_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Create Products Table (Marketplace - Curated)
CREATE TABLE public.products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    category TEXT,
    price TEXT,
    seller TEXT,
    image TEXT,
    description TEXT,
    purchase_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Create Experiences Table (Tourism)
CREATE TABLE public.experiences (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    category TEXT,
    duration TEXT,
    price TEXT,
    rating DECIMAL(2,1),
    reviews INTEGER,
    image TEXT,
    location TEXT,
    booking_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Create Hotels Table
CREATE TABLE public.hotels (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    rating DECIMAL(2,1),
    price TEXT,
    amenities TEXT,
    location TEXT,
    image TEXT,
    booking_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Create Bookings Table
CREATE TABLE public.bookings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.users(id), -- Changed to reference public.users
    event_id UUID REFERENCES public.events(id),
    booking_date TIMESTAMPTZ DEFAULT NOW(),
    status TEXT DEFAULT 'pending'
);

-- 7. Enable Row Level Security (RLS)
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.experiences ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.hotels ENABLE ROW LEVEL SECURITY;

-- 8. Policies
-- Public items are viewable by everyone
CREATE POLICY "Public items are viewable by everyone" ON public.products FOR SELECT USING (true);
CREATE POLICY "Public experiences are viewable by everyone" ON public.experiences FOR SELECT USING (true);
CREATE POLICY "Public events are viewable by everyone" ON public.events FOR SELECT USING (true);
CREATE POLICY "Public hotels are viewable by everyone" ON public.hotels FOR SELECT USING (true);

-- Users can manage their own profile
CREATE POLICY "Users can view own profile" ON public.users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.users FOR UPDATE USING (auth.uid() = id);

-- Insert initial sample data
INSERT INTO public.products (name, category, price, seller, image, description, purchase_url) VALUES 
('Hagari Rwanda Basket', 'Handcrafts', 'RWF 40,000', 'Hagari Rwanda', 'https://images.unsplash.com/photo-1544923246-77307dd654ca?w=800&auto=format&fit=crop&q=60', 'Beautiful handwoven traditional Rwandan basket made from natural fibers.', 'https://www.etsy.com/search?q=rwanda+peace+basket+agaseke'),
('Imigongo Art Piece', 'Art', 'RWF 65,000', 'Rwanda Heritage', 'https://images.unsplash.com/photo-1590483736622-39da8af75bba?w=800&auto=format&fit=crop&q=60', 'Authentic Imigongo art featuring traditional geometric patterns.', 'https://www.etsy.com/search?q=imigongo+art+rwanda');
