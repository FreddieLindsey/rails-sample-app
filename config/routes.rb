Rails.application.routes.draw do
  get 'movies', to: 'movie#index'
  get 'movie/:id', to: 'movie#show'

  post 'movie/create'
  put 'movie/edit/:id', to: 'movie#edit'
  delete 'movie/destroy/:id', to: 'movie#destroy'
end
