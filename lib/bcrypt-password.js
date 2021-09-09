/* Copyright (c) V4EX Inc. SPDX-License-Identifier: GPL-3.0-or-later */

// Purpose:
//   - Provide bcryptPassword() to add new Password using bcrypt to database.


/**
 * @param {*} env (optional)
 *   - PASSWORD_SALT_ROUNDS
 */
module.exports = ({ env }) => {
  if (env === undefined) {
    require('dotenv').config()
    env = process.env
  }

  const defaults = {
    saltRounds: parseInt(env.PASSWORD_SALT_ROUNDS || 10)
  }

  const bcrypt = require('bcrypt')

  const bcryptPassword = (Password, plainTextPassword, callback) => {
    bcrypt.hash(plainTextPassword, defaults.saltRounds, (err, hash) => {
      if (err) {
        console.error(`Error in bcrypt.hash()`, err)
        callback(err)
      } else {
        Password.create({
          hash
        }, function(err, password) {
          if (err) {
            console.error(`Error in creating new Password using bcrypt.`, err)
            callback(err)
          } else {
            callback(null, password)
          }
        })
      }
    })
  }

  return {
    bcryptPassword
  }

}
