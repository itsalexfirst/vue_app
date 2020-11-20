class OrganizationsSerializer < ActiveModel::Serializer
  attributes %i[id title category inn ogrn created_at updated_at]
end
