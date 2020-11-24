class Staff::ClientsController < ApplicationController
  before_action :find_client, only: %i[show destroy edit update add_organization]
  before_action :find_organization, only: %i[add_organization]

  rescue_from ActiveRecord::RecordNotFound, with: :record_not_found

  def index
    @clients = Client.all
    #TODO query builder
    render json: @clients
  end

  def show
    render json: @client, status: :ok
  end

  def new
    @client = Client.new
  end

  def create
    @client = Client.new(client_params)
    @client.password = default_password

    if @client.save
      render json: @client, status: :created
    else
      render json: { errors: @client.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def edit; end

  def update
    if @client.update(client_params)
      render json: @client, status: :ok
    else
      render json: { errors: @client.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    @client.destroy
  end

  def add_organization
    @client.organizations << @organization
  end

  private

  def find_client
    @client = Client.find(params[:id])
  end

  def find_organization
    @organization = Organization.find(params[:organization][:id])
  end

  def client_params
    params.require(:client).permit(:fullname, :phone, :email)
  end

  def default_password
    return 'password'
  end

  def record_not_found(error)
      render json: { errors: error.message }, status: :not_found
    end
end
