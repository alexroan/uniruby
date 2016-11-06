# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20131207092824) do

  create_table "claims", force: true do |t|
    t.date     "claim_date",  null: false
    t.integer  "value",       null: false
    t.string   "claim_type",  null: false
    t.string   "description"
    t.integer  "person_pk",   null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "people", force: true do |t|
    t.string   "title",            null: false
    t.string   "forename",         null: false
    t.string   "surname",          null: false
    t.string   "email",            null: false
    t.date     "dob",              null: false
    t.string   "phone_number"
    t.string   "address1",         null: false
    t.string   "address2"
    t.string   "address3"
    t.string   "postcode",         null: false
    t.string   "license_type",     null: false
    t.integer  "license_period",   null: false
    t.string   "occupation",       null: false
    t.integer  "number_of_claims", null: false
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "unique_string"
  end

  add_index "people", ["email"], name: "index_people_on_email"
  add_index "people", ["surname"], name: "index_people_on_surname"

  create_table "policies", force: true do |t|
    t.integer  "excess",           default: 1000, null: false
    t.string   "breakdown_cover",                 null: false
    t.boolean  "windscreen_cover",                null: false
    t.integer  "person_pk"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "vehicles", force: true do |t|
    t.string   "registration",      null: false
    t.integer  "annual_mileage",    null: false
    t.integer  "value",             null: false
    t.string   "parking_location",  null: false
    t.datetime "policy_start_date", null: false
    t.integer  "person_pk",         null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

end
