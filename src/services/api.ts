// API service for authentication
// Connects to the local Express backend

const API_URL = '/api';

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
      const response = await fetch(`${API_URL}/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Signup error:', error);
      return { success: false, error: 'Network error occurred' };
    }
  }

  async login(email: string, password: string): Promise<{ success: boolean; user?: User; error?: string }> {
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: 'Network error occurred' };
    }
  }

  async updateUser(userId: string, updates: Partial<User>): Promise<{ success: boolean; user?: User; error?: string }> {
    try {
      const response = await fetch(`${API_URL}/users/${userId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Update user error:', error);
      return { success: false, error: 'Network error occurred' };
    }
  }

  static async createBooking(bookingData: any) {
    const response = await fetch(`${API_URL}/bookings`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bookingData),
    });
    return await response.json();
  }

  static async getUserBookings(userId: string) {
    const response = await fetch(`${API_URL}/bookings/${userId}`);
    return await response.json();
  }

  async getUserByEmail(email: string): Promise<User | null> {
    try {
      const response = await fetch(`${API_URL}/users/email/${email}`);
      if (response.ok) {
        return await response.json();
      }
      return null;
    } catch (error) {
      console.error('Get user error:', error);
      return null;
    }
  }

  // --- Events API ---

  async getEvents(): Promise<any[]> {
    try {
      const response = await fetch(`${API_URL}/events`);
      if (response.ok) {
        return await response.json();
      }
      return [];
    } catch (error) {
      console.error('Get events error:', error);
      return [];
    }
  }

  async createEvent(eventData: any): Promise<any> {
    try {
      const response = await fetch(`${API_URL}/events`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(eventData),
      });
      return await response.json();
    } catch (error) {
      console.error('Create event error:', error);
      return { success: false, error: 'Network error' };
    }
  }

  async deleteEvent(eventId: string): Promise<any> {
    try {
      const response = await fetch(`${API_URL}/events/${eventId}`, {
        method: 'DELETE',
      });
      return await response.json();
    } catch (error) {
      console.error('Delete event error:', error);
      return { success: false, error: 'Network error' };
    }
  }
}

export const apiService = new ApiService();

