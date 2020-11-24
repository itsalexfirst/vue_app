class EquipmentsSerializer < ActiveModel::Serializer
  attributes %i[id title category number created_at updated_at]
end
