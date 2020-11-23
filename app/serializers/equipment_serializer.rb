class EquipmentSerializer < ActiveModel::Serializer
  attributes %i[id title category number created_at updated_at]
  belongs_to :organization, optional: true
end
