class Staff::EquipmentsController < ApplicationController
  before_action :find_equipment, only: %i[show destroy edit update]

  rescue_from ActiveRecord::RecordNotFound, with: :record_not_found

  def index
    @equipments = Equipment.all
    #TODO query builder
    render json: { equipments: @equipments }
  end

  def show
    render json: @equipment, status: :ok
  end

  def new
    @equipment = Equipment.new
  end

  def create
    @equipment = Equipment.new(equipment_params)

    if @equipment.save
      render json: @equipment, status: :created
    else
      render json: { errors: @equipment.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def edit; end

  def update
    if @equipment.update(equipment_params)
      render json: @equipment, status: :ok
    else
      render json: { errors: @equipment.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    @equipment.destroy
  end

  private

  def find_equipment
    @equipment = Equipment.find(params[:id])
  end

  def equipment_params
    params.require(:equipment).permit(:title, :category, :number, :organization_id)
  end

  def record_not_found(error)
    render json: { errors: error.message }, status: :not_found
  end
end
