class CreateOrganizations < ActiveRecord::Migration[6.0]
  def change
    create_table :organizations do |t|
      t.string :title
      t.string :category
      t.string :inn
      t.string :ogrn

      t.timestamps
    end
  end
end
