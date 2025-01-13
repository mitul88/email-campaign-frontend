import axios from "axios";

// Define the token types
interface TokenResponse {
  token: string;
}

class AuthService {
  private accessToken: string | null = null;

  getAccessToken(): string | null {
    return this.accessToken;
  }

  setAccessToken(token: string): void {
    this.accessToken = token;
  }

  // Fetch a new access token using the refresh token
  async refreshToken(): Promise<void> {
    try {
      const response = await axios.get<TokenResponse>("/auth/refresh", {
        withCredentials: true, // Include httpOnly cookies
      });
      this.setAccessToken(response.data.token);
    } catch (error) {
      console.error("Failed to refresh token:", error);
      throw error;
    }
  }
}

const authService = new AuthService();

export default authService;
