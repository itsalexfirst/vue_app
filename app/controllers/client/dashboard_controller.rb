class Client::DashboardController < ApplicationController

  def index
    render json: {
      current_user: current_client,
      organizations: current_client.organizations.all
    }
  end
end
