require 'test_helper'

class PeopleControllerTest < ActionController::TestCase
  setup do
    @person = people(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:people)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create person" do
    assert_difference('Person.count') do
      @person.email = "alex@aber.ac.uk"
      post :create, person: { address1: @person.address1, address2: @person.address2, address3: @person.address3, dob: @person.dob, email: @person.email, forename: @person.forename, license_period: @person.license_period, license_type: @person.license_type, number_of_claims: @person.number_of_claims, occupation: @person.occupation, phone_number: @person.phone_number, postcode: @person.postcode, surname: @person.surname, title: @person.title }
    end

    assert_redirected_to person_path(assigns(:person))
  end

  test "should show person" do
    get :show, id: @person
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @person
    assert_response :success
  end

  test "should update person" do
    patch :update, id: @person, person: { address1: @person.address1, address2: @person.address2, address3: @person.address3, dob: @person.dob, email: @person.email, forename: @person.forename, license_period: @person.license_period, license_type: @person.license_type, number_of_claims: @person.number_of_claims, occupation: @person.occupation, phone_number: @person.phone_number, postcode: @person.postcode, surname: @person.surname, title: @person.title }
    assert_redirected_to person_path(assigns(:person))
  end

  test "should destroy person" do
    assert_difference('Person.count', -1) do
      delete :destroy, id: @person
    end

    assert_redirected_to people_path
  end
end
