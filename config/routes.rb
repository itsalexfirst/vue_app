Rails.application.routes.draw do
  devise_for :clients
  devise_for :staffs

  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  root 'application#index'

  constraints ->(req) { req.format == :json } do
    namespace :staff do
      resources :dashboard, only: %i[index]
      resources :clients, shallow: true do
        member do
            post :add_organization
          end
      end
      resources :organizations, shallow: true
    end

    namespace :client do
      resources :dashboard, only: %i[index]
      resources :organizations, shallow: true, only: %i[index]
    end
  end

  get '/*slug', to: 'application#index'
end
