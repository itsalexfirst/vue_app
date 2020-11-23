class Equipment < ApplicationRecord
  belongs_to :organization, optional: true
end
