class Staff::OrganizationsController < ApplicationController
  before_action :find_organization, only: %i[show destroy edit update]

  rescue_from ActiveRecord::RecordNotFound, with: :record_not_found

  def index
    @organizations = Organization.all
    #TODO query builder
    render json: { organizations: @organizations }
  end

  def show
    render json: @organization, status: :ok
  end

  def new
    @organization = Organization.new
  end

  def create
    @organization = Organization.new(organization_params)

    if @organization.save
      render json: @organization, status: :created
    else
      render json: { errors: @organization.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def edit; end

  def update
    if @organization.update(organization_params)
      render json: @organization, status: :ok
    else
      render json: { errors: @organization.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    @organization.destroy
  end

  private

  def find_organization
    @organization = Organization.find(params[:id])
  end

  def organization_params
    params.require(:organization).permit(:title, :category, :inn, :ogrn)
  end
end
