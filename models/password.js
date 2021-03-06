/* Copyright (c) V4EX Inc. SPDX-License-Identifier: GPL-3.0-or-later */

// Purpose: Provide Password, PasswordSchema instances.


/**
 * @param {*} mongoose (optional)
 * @param {*} modelName (optional)
 * @param {*} env (optional)
 */
module.exports = ({ mongoose, modelName, env }) => {
  mongoose = mongoose || require('../mongoose')({ env })
  modelName = modelName || 'Password'

  let Password, PasswordSchema

  if (mongoose.modelNames().includes(modelName)) {
    Password = mongoose.model(modelName)
    PasswordSchema = Password.schema
  } else {
    const Schema = mongoose.Schema
    PasswordSchema = new Schema({
      hash: { type: String, required: true, immutable: true }
    })
    Password = mongoose.model(modelName, PasswordSchema)
  }


  return {
    Password,
    PasswordSchema
  }
}
