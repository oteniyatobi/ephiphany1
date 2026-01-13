import { supabase } from "@/lib/supabase";

interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  location?: string;
}

export class ApiService {

  async signup(name: string, email: string, password: string): Promise<{ success: boolean; user?: User; error?: string }> {
    try {
      // In Supabase, the Auth signUp handles the account creation. 
      // We use this method to sync the profile to our public.users table if needed.
      const { data, error } = await supabase
        .from('users')
        .upsert({ name, email })
        .select()
        .single();

      if (error) {
        console.warn('Profile sync to users table failed:', error.message);
        return { success: true }; // Still return true if auth succeeded but profile sync failed
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

  static async createBooking(bookingData: any) {
    const { data, error } = await supabase
      .from('bookings')
      .insert(bookingData)
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  static async getUserBookings(userId: string) {
    const { data, error } = await supabase
      .from('bookings')
      .select('*')
      .eq('userId', userId);
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

  async getUserProducts(userId: string): Promise<any[]> {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('vendor_id', userId);

      if (error) return [];
      return data;
    } catch (error) {
      return [];
    }
  }

  async createProduct(productData: any): Promise<any> {
    try {
      const { data, error } = await supabase
        .from('products')
        .insert(productData)
        .select()
        .single();

      if (error) throw error;
      return { success: true, data };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }

  async deleteProduct(productId: string): Promise<any> {
    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', productId);

      if (error) throw error;
      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message };
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

