class ClientSerializer < ActiveModel::Serializer
  attributes %i[id email fullname phone created_at updated_at]
  has_many :organizations
end

