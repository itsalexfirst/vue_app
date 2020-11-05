module ApplicationHelper
  def dashboard
    if current_client
      'client'
    elsif current_staff
      'staff'
    else
      'application'
    end
  end
end
