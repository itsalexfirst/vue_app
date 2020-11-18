class ClientsSerializer < ActiveModel::Serializer
  attributes %i[id email fullname phone created_at updated_at]
end

