class Staff::DashboardController < ApplicationController

  def index
    render json: {
      current_user: current_staff,
      #TODO query builder for clients and organization
      clients: Client.all,
      organizations: Organization.all
    }
  end
end
