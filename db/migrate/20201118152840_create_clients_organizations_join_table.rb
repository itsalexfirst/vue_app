class CreateClientsOrganizationsJoinTable < ActiveRecord::Migration[6.0]
  def change
    create_join_table :clients, :organizations do |t|
      t.index [:client_id, :organization_id], unique: true
    end
  end
end
