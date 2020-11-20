class Client::OrganizationsController < ApplicationController

  def index
    @organizations = current_client.organizations.all
    #TODO query builder
    render json: { organizations: @organizations }
  end
end
