class ApplicationController < ActionController::API
  include ActionController::Cookies
 
  before_action :authenticate_user

  private

  def authenticate_user
    token = fetch_token_from_header_or_cookie

    if token.present?
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

  def fetch_token_from_header_or_cookie
    # Check the Authorization header for the Bearer token
    if request.headers['Authorization'].present?
      return request.headers['Authorization'].split(' ').last
    end

    # Fallback: Check cookies for access_token
    request.cookies['accessToken']
  end

  def current_user
    @current_user
  end
end
