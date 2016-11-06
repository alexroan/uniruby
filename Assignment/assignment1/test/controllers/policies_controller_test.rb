require 'test_helper'

class PoliciesControllerTest < ActionController::TestCase
  setup do
    @policy = policies(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:policies)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create policy" do
    assert_difference('Policy.count') do
      @policy.person_pk = 99
      post :create, policy: { breakdown_cover: @policy.breakdown_cover, excess: @policy.excess, person_pk: @policy.person_pk, windscreen_cover: @policy.windscreen_cover }
    end

    assert_redirected_to policy_path(assigns(:policy))
  end

  test "should show policy" do
    get :show, id: @policy
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @policy
    assert_response :success
  end

=begin
  test "should update policy" do
    patch :update, id: @policy, policy: { breakdown_cover: @policy.breakdown_cover, excess: @policy.excess, person_pk: @policy.person_pk, windscreen_cover: @policy.windscreen_cover }
    assert_redirected_to policy_path(assigns(:policy))
  end
=end

  test "should destroy policy" do
    assert_difference('Policy.count', -1) do
      delete :destroy, id: @policy
    end

    assert_redirected_to policies_path
  end
end
