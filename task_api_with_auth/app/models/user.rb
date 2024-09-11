class User < ApplicationRecord
  has_secure_password

  has_many :auth_tokens, dependent: :destroy
  has_many :tasks, dependent: :destroy

  validates :email, presence: true, uniqueness: true
end
