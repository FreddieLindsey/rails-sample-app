class MovieController < ApplicationController
  def index
    movies = Movie.all
    render json: movies,
           status: :ok,
           content_type: 'text/json'
  end

  def create
    m = Movie.create(
      imdb_id: 'tt1431045', title: 'Deadpool',
      watched: false)
    render json: m,
           status: :created,
           content_type: 'text/json'
  end

  def show
    m = Movie.find_by(id: params[:id].to_i)
    render json: m,
           status: :ok,
           content_type: 'text/json'
  end

  def destroy
    m = Movie.find_by(id: params[:id].to_i)
    if m.nil?
      render json: { params: params,
                     error: "No movie with id '#{params[:id].to_i}'"
                   },
             status: :bad_request,
             content_type: 'text/json'
    else
      @ok = m.destroy
      render json: { destroyed: @ok },
             status: :ok,
             content_type: 'text/json'
    end
  end

  def edit
    m = Movie.find_by(id: params[:id].to_i)
    if m.nil?
      render nothing: true, status: :bad_request
      return
    end
    m.title = params[:title] if params[:title]
    m.imdb_id = params[:imdb_id] if params[:imdb_id]
    m.poster_url = params[:poster_url] if params[:poster_url]
    m.watched = params[:watched] if params[:watched]
    m.released = params[:released] if params[:released]
    saved = m.save == true ? :ok : :bad_request
    render json: m,
           status: saved,
           content_type: 'text/json'
  end
end
