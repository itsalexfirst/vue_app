class CreateEquipment < ActiveRecord::Migration[6.0]
  def change
    create_table :equipment do |t|
      t.string :title
      t.string :category
      t.string :number
      t.references :organization, null: true, foreign_key: true

      t.timestamps
    end
  end
end
