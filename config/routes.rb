Rails.application.routes.draw do
  get 'movie/index'
  get 'movie/create'
  get 'movie/show'
  get 'movie/destroy'
  get 'movie/edit'

  root 'pages#index'
end
