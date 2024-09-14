# app/controllers/auth_tokens_controller.rb
class AuthTokensController < ApplicationController
  skip_before_action :authenticate_user, only: [:create]

  def create
    user = User.find_by(email: params[:email])

    if user&.authenticate(params[:password])
      access_token = generate_jwt(user)

      render json: {
        access_token: access_token
      }, status: :created
    else
      render json: { error: 'Invalid email or password' }, status: :unauthorized
    end
  end

  private

  def generate_jwt(user)
    payload = {
      user: {
        id: user.id,
        email: user.email
      },
      exp: 24.hours.from_now.to_i
    } # Expiration dans 24h
    puts 'secret key base : ' + Rails.application.secret_key_base
    puts 'payload : ' + payload.to_s
    jwt = JWT.encode(payload, Rails.application.secret_key_base, 'HS256')
    puts 'encoded json : ' + jwt
    jwt
  end
end
