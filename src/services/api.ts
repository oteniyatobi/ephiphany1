import { supabase } from "@/lib/supabase";

interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  location?: string;
}

export class ApiService {

  async signup(id: string, name: string, email: string): Promise<{ success: boolean; user?: User; error?: string }> {
    try {
      // In Supabase, the Auth signUp handles the account creation. 
      // We use this method to sync the profile to our public.users table if needed.
      const { data, error } = await supabase
        .from('users')
        .upsert({ id, name, email })
        .select()
        .single();

      if (error) {
        console.warn('Profile sync to users table failed:', error.message);
        // We still return success: true because the Auth part (in AuthContext) succeeded
        return { success: true };
      }

      return { success: true, user: data as User };
    } catch (error) {
      console.error('Signup sync error:', error);
      return { success: false, error: 'Network error occurred' };
    }
  }

  async login(email: string, password: string): Promise<{ success: boolean; user?: User; error?: string }> {
    // Supabase Auth handles login. This method can optionally fetch the profile.
    try {
      const user = await this.getUserByEmail(email);
      return { success: true, user: user || undefined };
    } catch (error) {
      return { success: false, error: 'Failed to fetch user profile' };
    }
  }

  async updateUser(userId: string, updates: Partial<User>): Promise<{ success: boolean; user?: User; error?: string }> {
    const hasSupabase = import.meta.env.VITE_SUPABASE_URL && !import.meta.env.VITE_SUPABASE_URL.includes('your_');
    if (!hasSupabase) return { success: true }; // No-op in local mode

    try {
      const { data, error } = await supabase
        .from('users')
        .update(updates)
        .eq('id', userId)
        .select()
        .single();

      if (error) throw error;
      return { success: true, user: data as User };
    } catch (error: any) {
      console.error('Update user error:', error);
      return { success: false, error: error.message };
    }
  }

  static async createBooking(bookingData: { user_id: string, event_id: string, status?: string }) {
    const hasSupabase = import.meta.env.VITE_SUPABASE_URL && !import.meta.env.VITE_SUPABASE_URL.includes('your_');

    if (!hasSupabase) {
      const bookings = JSON.parse(localStorage.getItem('epiphany_bookings') || '[]');
      const newBooking = { ...bookingData, id: `book-${Date.now()}`, booking_date: new Date().toISOString() };
      bookings.push(newBooking);
      localStorage.setItem('epiphany_bookings', JSON.stringify(bookings));
      return newBooking;
    }

    const { data, error } = await supabase
      .from('bookings')
      .insert(bookingData)
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  static async getUserBookings(userId: string) {
    const hasSupabase = import.meta.env.VITE_SUPABASE_URL && !import.meta.env.VITE_SUPABASE_URL.includes('your_');

    if (!hasSupabase) {
      const bookings = JSON.parse(localStorage.getItem('epiphany_bookings') || '[]');
      return bookings.filter((b: any) => b.user_id === userId);
    }

    const { data, error } = await supabase
      .from('bookings')
      .select('*')
      .eq('user_id', userId);
    if (error) throw error;
    return data;
  }

  async getUserByEmail(email: string): Promise<User | null> {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('email', email)
        .single();

      if (error) return null;
      return data as User;
    } catch (error) {
      return null;
    }
  }

  // --- Events API ---

  async getEvents(): Promise<any[]> {
    const hasSupabase = import.meta.env.VITE_SUPABASE_URL && !import.meta.env.VITE_SUPABASE_URL.includes('your_');

    if (!hasSupabase) {
      // Return sample events if local storage is empty, or return what's in local storage
      const stored = localStorage.getItem('epiphany_events');
      if (stored) return JSON.parse(stored);

      // Return some dummy events if nothing stored
      return [
        { id: '1', title: 'Kigali Art Festival', date: '2024-08-15', location: 'Kigali Cultural Village', price: 'Free', image: 'https://images.unsplash.com/photo-1514525253440-b393452e8d26?w=800&auto=format&fit=crop&q=60' },
        { id: '2', title: 'Tech Mixer Rwanda', date: '2024-08-20', location: 'Norrsken House', price: 'RWF 5000', image: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?w=800&auto=format&fit=crop&q=60' }
      ];
    }

    try {
      const { data, error } = await supabase
        .from('events')
        .select('*');

      if (error || !data || data.length === 0) {
        console.warn('Supabase events table empty or unavailable, using fallback');
        return [];
      }
      return data;
    } catch (error) {
      return [];
    }
  }

  async createEvent(eventData: any): Promise<any> {
    try {
      const { data, error } = await supabase
        .from('events')
        .insert(eventData)
        .select()
        .single();

      if (error) throw error;
      return { success: true, data };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }

  async deleteEvent(eventId: string): Promise<any> {
    try {
      const { error } = await supabase
        .from('events')
        .delete()
        .eq('id', eventId);

      if (error) throw error;
      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }

  // --- Products API ---

  async getProducts(): Promise<any[]> {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*');

      if (error || !data || data.length === 0) {
        return [];
      }
      return data;
    } catch (error) {
      return [];
    }
  }

  // --- Experiences API ---

  async getExperiences(): Promise<any[]> {
    try {
      const { data, error } = await supabase
        .from('experiences')
        .select('*');

      if (error || !data || data.length === 0) {
        return [];
      }
      return data;
    } catch (error) {
      return [];
    }
  }
}

export const apiService = new ApiService();

