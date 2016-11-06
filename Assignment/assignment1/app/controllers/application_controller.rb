class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :null_session
  before_filter :set_access_control_headers
  def set_access_control_headers
    headers['Access-Control-Allow-Origin']='*'
    headers['Access-Control-Request-Method']='*'
    headers['Access-Control-Allow-Headers']='*'
  end

  # Make is_admin? a helper method available to view templates
  helper_method :is_admin?

  protected

  def is_admin?
    true
  end
end

