class AuthToken < ApplicationRecord
  belongs_to :user

  validates :access_token, :refresh_token, presence: true

  # Methods to generate tokens can be added here if needed
end
