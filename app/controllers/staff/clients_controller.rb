class Staff::ClientsController < ApplicationController
  before_action :find_client, only: %i[show destroy edit update]

  def index
    @clients = Client.all
    #TODO query builder
    render json: @clients
  end

  def show; end

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

  private

  def find_client
    @client = Client.find(params[:id])
  end

  def client_params
    params.require(:client).permit(:fullname, :phone, :email)
  end

  def default_password
    return 'password'
  end
end
