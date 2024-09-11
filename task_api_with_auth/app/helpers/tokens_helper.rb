module TokensHelper
  def self.generate_token
    SecureRandom.hex(32)
  end

  def self.generate_access_token
    {
      token: generate_token,
      expires_at: 10.seconds.from_now # Set access token expiration (e.g., 15 minutes)
    }
  end

  def self.generate_refresh_token
    {
      token: generate_token,
      expires_at: 7.days.from_now # Set refresh token expiration (e.g., 7 days)
    }
  end
end
