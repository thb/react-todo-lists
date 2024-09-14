# app/controllers/auth_tokens_controller.rb
class AuthTokensController < ApplicationController
  skip_before_action :authenticate_user, only: [:create]

  def create
    user = User.find_by(email: params[:email])

    if user&.authenticate(params[:password])
      access_token = generate_jwt(user.id)

      render json: {
        access_token: access_token
      }, status: :created
    else
      render json: { error: 'Invalid email or password' }, status: :unauthorized
    end
  end

  private

  def generate_jwt(user_id)
    payload = { user_id: user_id, exp: 24.hours.from_now.to_i } # Expiration dans 24h
    JWT.encode(payload, Rails.application.secrets.secret_key_base)
  end
end
