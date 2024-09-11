class AuthTokensController < ApplicationController
  skip_before_action :authenticate_user, only: [:create, :refresh]

  def create
    user = User.find_by(email: params[:email])

    if user&.authenticate(params[:password])
      access_token_data = TokensHelper.generate_access_token
      refresh_token_data = TokensHelper.generate_refresh_token

      auth_token = user.auth_tokens.create!(
        access_token: access_token_data[:token],
        access_token_expires_at: access_token_data[:expires_at],
        refresh_token: refresh_token_data[:token],
        refresh_token_expires_at: refresh_token_data[:expires_at]
      )

      render json: {
        access_token: auth_token.access_token,
        refresh_token: auth_token.refresh_token,
        access_token_expires_at: access_token_data[:expires_at]
      }, status: :created
    else
      render json: { error: 'Invalid email or password' }, status: :unauthorized
    end
  end

  def refresh
    auth_token = AuthToken.find_by(refresh_token: params[:refresh_token])

    if auth_token && auth_token.refresh_token_expires_at > Time.current
      access_token_data = TokensHelper.generate_access_token

      auth_token.update!(
        access_token: access_token_data[:token],
        access_token_expires_at: access_token_data[:expires_at]
      )

      render json: {
        access_token: auth_token.access_token,
        access_token_expires_at: access_token_data[:expires_at]
      }, status: :ok
    else
      render json: { error: 'Invalid or expired refresh token' }, status: :unauthorized
    end
  end
end
