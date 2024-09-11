class ApplicationController < ActionController::API
  before_action :authenticate_user

  private

  def authenticate_user
    header = request.headers['Authorization']
    if header.present?
      token = header.split(' ').last
      auth_token = AuthToken.find_by(access_token: token)

      if auth_token && auth_token.access_token_expires_at > Time.current
        @current_user = auth_token.user
      else
        render json: { error: 'Invalid or expired access token' }, status: :unauthorized
      end
    else
      render json: { error: 'Missing token' }, status: :unauthorized
    end
  end

  def current_user
    @current_user
  end
end
