class Client < ApplicationRecord
  include Authenticatable

  has_many :clients_organizations
  has_many :organizations, through: :clients_organizations
end
