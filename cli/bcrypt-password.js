/* Copyright (c) V4EX Inc. SPDX-License-Identifier: GPL-3.0-or-later */

// Purpose: Provide CLI command bcrypt-password.


/**
 * @param {*} Password (optional)
 * @param {*} mongoose (optional)
 * @param {*} modelName (optional)
 * @param {*} env (optional)
 */
module.exports = ({ Password, mongoose, modelName, env }) => {
  Password = Password || require('../models/password')({ mongoose, modelName, env }).Password

  const {
    bcryptPassword
  } = require('../lib/bcrypt-password')({ env })

  const { program } = require('commander')
  const chalk = require('chalk')

  const done = () => {
    Password.base.connection.close()
  }

  program.command('bcrypt-password')
         .description('add new Password using bcrypt to database')
         .argument('<password>', 'Plain text password')
         .action((plainTextPassword) => {
           bcryptPassword(Password, plainTextPassword, (err, password) => {
             if (err) {
               console.error(chalk.red(err))
             } else {
              console.log(password)
              done()
             }
           })
         })

}
