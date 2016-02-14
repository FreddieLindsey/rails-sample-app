class PagesController < ApplicationController
  def index
    render json: { hello: true },
           content_type: 'text/json'
  end
end
