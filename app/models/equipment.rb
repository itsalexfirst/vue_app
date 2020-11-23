class Equipment < ApplicationRecord
  belongs_to :organization, optional: true
  accepts_nested_attributes_for :organization
end
