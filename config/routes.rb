Rails.application.routes.draw do
  devise_for :clients
  devise_for :staffs

  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  root 'application#index'

  namespace :staff do
    resources :dashboard, only: %i[index]
    resources :clients, shallow: true
    resources :organizations, shallow: true
  end

  namespace :client do
    resources :organizations, only: %i[index]
  end
end
