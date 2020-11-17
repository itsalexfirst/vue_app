class Client < ApplicationRecord
  include Authenticatable

  has_many :client_organizations, dependent: :destroy
  has_many :organizations, through: :client_organizations
end
