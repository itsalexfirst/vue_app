class CreateOrganizations < ActiveRecord::Migration[6.0]
  def change
    create_table :organizations do |t|
      t.string :title
      t.string :type
      t.integer :inn
      t.integer :ogrn

      t.timestamps
    end
  end
end
