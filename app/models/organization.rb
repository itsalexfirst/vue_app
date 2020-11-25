class Organization < ApplicationRecord

  has_many :clients_organizations
  has_many :clients, through: :clients_organizations
  has_many :equipment

  after_save :broadcast

  def broadcast
    ActionCable.server.broadcast('organizations', { organization: self })
  end
end
