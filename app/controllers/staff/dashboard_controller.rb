class Staff::DashboardController < ApplicationController

  def index
    render json: { current_user: current_staff }
  end
end
